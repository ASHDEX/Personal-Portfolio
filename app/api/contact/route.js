import nodemailer from "nodemailer";

const WINDOW_MS = 60 * 1000;
const LIMIT_PER_WINDOW = 5;
const rateLimitStore = globalThis.__contactRateLimitStore ?? new Map();

if (!globalThis.__contactRateLimitStore) {
  globalThis.__contactRateLimitStore = rateLimitStore;
}

function getClientIp(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return "unknown";
}

function isRateLimited(ip) {
  const now = Date.now();
  const current = rateLimitStore.get(ip) ?? { count: 0, resetAt: now + WINDOW_MS };

  if (now > current.resetAt) {
    const fresh = { count: 1, resetAt: now + WINDOW_MS };
    rateLimitStore.set(ip, fresh);
    return false;
  }

  if (current.count >= LIMIT_PER_WINDOW) {
    return true;
  }

  current.count += 1;
  rateLimitStore.set(ip, current);
  return false;
}

function validatePayload(payload) {
  const required = ["name", "company", "email", "service", "message"];
  for (const key of required) {
    if (!payload?.[key] || String(payload[key]).trim().length === 0) {
      return `${key} is required`;
    }
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email);
  if (!emailOk) return "Invalid email";

  return null;
}

async function sendSmtpEmail(payload) {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    SMTP_FROM,
    CONTACT_TO_EMAIL,
    SMTP_SECURE,
  } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM || !CONTACT_TO_EMAIL) {
    return;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: String(SMTP_SECURE).toLowerCase() === "true",
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  const html = `
    <h2>New Contact Submission</h2>
    <p><strong>Name:</strong> ${payload.name}</p>
    <p><strong>Company:</strong> ${payload.company}</p>
    <p><strong>Email:</strong> ${payload.email}</p>
    <p><strong>Service:</strong> ${payload.service}</p>
    <p><strong>Message:</strong><br/>${payload.message.replace(/\n/g, "<br/>")}</p>
  `;

  await transporter.sendMail({
    from: SMTP_FROM,
    to: CONTACT_TO_EMAIL,
    subject: `Portfolio Contact: ${payload.service} (${payload.name})`,
    replyTo: payload.email,
    text: `Name: ${payload.name}\nCompany: ${payload.company}\nEmail: ${payload.email}\nService: ${payload.service}\n\n${payload.message}`,
    html,
  });
}

async function sendToNotion(payload) {
  const { NOTION_API_KEY, NOTION_DATABASE_ID } = process.env;
  if (!NOTION_API_KEY || !NOTION_DATABASE_ID) return;

  await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${NOTION_API_KEY}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    },
    body: JSON.stringify({
      parent: { database_id: NOTION_DATABASE_ID },
      properties: {
        Name: {
          title: [{ text: { content: payload.name } }],
        },
        Company: {
          rich_text: [{ text: { content: payload.company } }],
        },
        Email: {
          email: payload.email,
        },
        Service: {
          rich_text: [{ text: { content: payload.service } }],
        },
        Message: {
          rich_text: [{ text: { content: payload.message.slice(0, 1900) } }],
        },
      },
    }),
  });
}

async function sendToAirtable(payload) {
  const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME } = process.env;
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_NAME) return;

  const endpoint = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`;

  await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      records: [
        {
          fields: {
            Name: payload.name,
            Company: payload.company,
            Email: payload.email,
            Service: payload.service,
            Message: payload.message,
          },
        },
      ],
    }),
  });
}

async function sendSlack(payload) {
  const { SLACK_WEBHOOK_URL } = process.env;
  if (!SLACK_WEBHOOK_URL) return;

  const preview = payload.message.length > 140 ? `${payload.message.slice(0, 140)}...` : payload.message;

  await fetch(SLACK_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: [
        "📥 New portfolio contact submission",
        `*Name:* ${payload.name}`,
        `*Email:* ${payload.email}`,
        `*Service:* ${payload.service}`,
        `*Message:* ${preview}`,
      ].join("\n"),
    }),
  });
}

export async function POST(request) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return Response.json({ success: false, error: "Too many requests. Try again shortly." }, { status: 429 });
  }

  const payload = await request.json();

  if (payload?.company_website) {
    return Response.json({ success: true });
  }

  const error = validatePayload(payload);
  if (error) {
    return Response.json({ success: false, error }, { status: 400 });
  }

  try {
    await Promise.allSettled([
      sendSmtpEmail(payload),
      sendToNotion(payload),
      sendToAirtable(payload),
      sendSlack(payload),
    ]);

    return Response.json({ success: true });
  } catch {
    return Response.json({ success: false, error: "Failed to submit form" }, { status: 500 });
  }
}

