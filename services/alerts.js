import { createTransporter } from "./email.js";

export async function runAlerts(db) {
  const transporter = createTransporter();
  if (!transporter) return;

  const users = await db.all(`SELECT * FROM users WHERE verified=1`);

  for (const u of users) {
    const subs = await db.all(`SELECT * FROM subscriptions WHERE user_id=?`, [u.id]);

    for (const s of subs) {
      const rows = await db.all(
        `SELECT * FROM articles
         WHERE (category = ? OR vendor = ?)
         ORDER BY published_at DESC LIMIT 5`,
        [s.category, s.vendor]
      );

      for (const a of rows) {
        const exists = await db.get(
          `SELECT 1 FROM notifications_sent WHERE user_id=? AND article_id=?`,
          [u.id, a.id]
        );

        if (!exists) {
          await transporter.sendMail({
            from: process.env.SMTP_FROM || "alerts@freeintelhub.local",
            to: u.email,
            subject: `New ${a.category} update ${a.vendor ? "(" + a.vendor + ")" : ""}`,
            html: `
              <h3>${a.title}</h3>
              <p>${a.summary}</p>
              <a href="${a.link}">Read original</a>
              <p><small>Free Intel Hub</small></p>
            `
          });

          await db.run(
            `INSERT INTO notifications_sent (user_id, article_id) VALUES (?, ?)`,
            [u.id, a.id]
          );
        }
      }
    }
  }
}
