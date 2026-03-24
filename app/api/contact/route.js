import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

// ---------------------------------------------------------------------------
// Rate limiting
// ---------------------------------------------------------------------------
const WINDOW_MS = 60 * 1000;
const LIMIT_PER_WINDOW = 5;
const rateLimitStore = globalThis.__contactRateLimitStore ?? new Map();

if (!globalThis.__contactRateLimitStore) {
  globalThis.__contactRateLimitStore = rateLimitStore;
}

function getClientIp(request) {
  // Prefer X-Real-IP (set by most reverse proxies as a single, trusted value)
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    // Use the rightmost IP (appended by the proxy, not the client)
    const ips = forwardedFor.split(",").map((ip) => ip.trim()).filter(Boolean);
    return ips[ips.length - 1] ?? "unknown";
  }
  return "unknown";
}

function isRateLimited(ip) {
  const now = Date.now();

  // Clean up expired entries to prevent unbounded memory growth
  for (const [key, val] of rateLimitStore.entries()) {
    if (now > val.resetAt) rateLimitStore.delete(key);
  }

  const current = rateLimitStore.get(ip) ?? { count: 0, resetAt: now + WINDOW_MS };

  if (now > current.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (current.count >= LIMIT_PER_WINDOW) return true;

  current.count += 1;
  rateLimitStore.set(ip, current);
  return false;
}

// ---------------------------------------------------------------------------
// Input sanitisation helpers
// ---------------------------------------------------------------------------

/** Strip CRLF and null bytes from single-line fields (headers, subject). */
function stripControlChars(str) {
  return String(str).replace(/[\r\n\0]/g, "");
}

/** Escape HTML entities to prevent injection in email templates. */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Escape Slack mrkdwn special characters. */
function escapeSlack(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

const ALLOWED_SERVICES = [
  "Detection Engineering",
  "IR/DFIR",
  "SOC Automation",
  "CTI Automation",
  "Architecture",
];

const FIELD_LIMITS = {
  name: 200,
  company: 200,
  email: 320,
  service: 100,
  message: 5000,
};

function validatePayload(payload) {
  const required = ["name", "company", "email", "service", "message"];
  for (const key of required) {
    const val = String(payload?.[key] ?? "").trim();
    if (!val) return `${key} is required`;
    if (val.length > FIELD_LIMITS[key]) return `${key} exceeds maximum length`;
  }

  // RFC 5321 compliant email format check
  const emailOk =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
      payload.email,
    );
  if (!emailOk) return "Invalid email";

  // Whitelist service to prevent injection via this field
  if (!ALLOWED_SERVICES.includes(payload.service)) return "Invalid service selected";

  return null;
}

// ---------------------------------------------------------------------------
// Delivery integrations
// ---------------------------------------------------------------------------

async function sendSmtpEmail(payload) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, CONTACT_TO_EMAIL, SMTP_SECURE } =
    process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM || !CONTACT_TO_EMAIL) {
    return;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: String(SMTP_SECURE).toLowerCase() === "true",
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  // Escape all user-supplied values before embedding in HTML
  const safeName = escapeHtml(payload.name);
  const safeCompany = escapeHtml(payload.company);
  const safeEmail = escapeHtml(payload.email);
  const safeService = escapeHtml(payload.service);
  const safeMessage = escapeHtml(payload.message).replace(/\n/g, "<br/>");

  const html = `
    <h2>New Contact Submission</h2>
    <p><strong>Name:</strong> ${safeName}</p>
    <p><strong>Company:</strong> ${safeCompany}</p>
    <p><strong>Email:</strong> ${safeEmail}</p>
    <p><strong>Service:</strong> ${safeService}</p>
    <p><strong>Message:</strong><br/>${safeMessage}</p>
  `;

  const cleanName = stripControlChars(payload.name);
  const cleanCompany = stripControlChars(payload.company);
  const cleanEmail = stripControlChars(payload.email);
  const cleanService = stripControlChars(payload.service);

  await transporter.sendMail({
    from: SMTP_FROM,
    to: CONTACT_TO_EMAIL,
    subject: `Portfolio Contact: ${cleanService} (${cleanName})`,
    replyTo: cleanEmail,
    text: `Name: ${cleanName}\nCompany: ${cleanCompany}\nEmail: ${cleanEmail}\nService: ${cleanService}\n\n${payload.message}`,
    html,
  });
}

async function sendToNotion(payload) {
  const { NOTION_API_KEY, NOTION_DATABASE_ID } = process.env;
  if (!NOTION_API_KEY || !NOTION_DATABASE_ID) return;

  await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${NOTION_API_KEY}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    },
    body: JSON.stringify({
      parent: { database_id: NOTION_DATABASE_ID },
      properties: {
        Name: { title: [{ text: { content: payload.name } }] },
        Company: { rich_text: [{ text: { content: payload.company } }] },
        Email: { email: payload.email },
        Service: { rich_text: [{ text: { content: payload.service } }] },
        Message: { rich_text: [{ text: { content: payload.message.slice(0, 1900) } }] },
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
    cache: "no-store",
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
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: [
        "📥 New portfolio contact submission",
        `*Name:* ${escapeSlack(payload.name)}`,
        `*Email:* ${escapeSlack(payload.email)}`,
        `*Service:* ${escapeSlack(payload.service)}`,
        `*Message:* ${escapeSlack(preview)}`,
      ].join("\n"),
    }),
  });
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function POST(request) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return Response.json(
      { success: false, error: "Too many requests. Try again shortly." },
      { status: 429, headers: { "Cache-Control": "no-store" } },
    );
  }

  const payload = await request.json();

  if (payload?.company_website) {
    return Response.json({ success: true }, { headers: { "Cache-Control": "no-store" } });
  }

  const error = validatePayload(payload);
  if (error) {
    return Response.json({ success: false, error }, { status: 400, headers: { "Cache-Control": "no-store" } });
  }

  try {
    await Promise.allSettled([
      sendSmtpEmail(payload),
      sendToNotion(payload),
      sendToAirtable(payload),
      sendSlack(payload),
    ]);

    return Response.json({ success: true }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json(
      { success: false, error: "Failed to submit form" },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}
