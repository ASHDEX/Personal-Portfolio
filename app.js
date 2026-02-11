const express = require("express");
const path = require("path");
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const cron = require("node-cron");
const Parser = require("rss-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Ensure DB folder exists
const dbDir = path.join(__dirname, "db");
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, "freeintel.db");
const db = new sqlite3.Database(dbPath);

// Init DB
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS feeds (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      link TEXT,
      vendor TEXT,
      published TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      topic TEXT
    )
  `);
});

// RSS Fetcher
const parser = new Parser();

const RSS_FEEDS = [
  { name: "Cisco", url: "https://blog.talosintelligence.com/rss/" },
  { name: "Microsoft", url: "https://www.microsoft.com/security/blog/feed/" },
  { name: "CrowdStrike", url: "https://www.crowdstrike.com/blog/feed/" },
  { name: "Palo Alto", url: "https://www.paloaltonetworks.com/blog/feed/" }
];

async function fetchFeeds() {
  for (const feed of RSS_FEEDS) {
    try {
      const parsed = await parser.parseURL(feed.url);

      parsed.items.slice(0, 10).forEach(item => {
        db.run(
          `INSERT OR IGNORE INTO feeds (title, link, vendor, published)
           VALUES (?, ?, ?, ?)`,
          [item.title, item.link, feed.name, item.pubDate || ""]
        );
      });
    } catch (err) {
      console.error(`RSS error for ${feed.name}`, err.message);
    }
  }
}

// Run every 1 hour
cron.schedule("0 * * * *", fetchFeeds);

// Routes
app.get("/", (req, res) => {
  res.render("index", { tagline: "Your daily dose of cyber 🛡️" });
});

app.get("/vendor/:name", (req, res) => {
  const vendor = req.params.name;

  db.all(
    `SELECT * FROM feeds WHERE vendor = ? ORDER BY published DESC LIMIT 50`,
    [vendor],
    (err, rows) => {
      if (err) return res.status(500).send("DB Error");
      res.render("vendor", { vendor, feeds: rows });
    }
  );
});

app.get("/search", (req, res) => {
  const q = `%${req.query.q || ""}%`;

  db.all(
    `SELECT * FROM feeds WHERE title LIKE ? ORDER BY published DESC LIMIT 50`,
    [q],
    (err, rows) => {
      if (err) return res.status(500).send("DB Error");
      res.render("search", { feeds: rows });
    }
  );
});

app.post("/subscribe", (req, res) => {
  const { email, topic } = req.body;

  db.run(
    `INSERT OR IGNORE INTO subscribers (email, topic) VALUES (?, ?)`,
    [email, topic],
    () => res.redirect("/")
  );
});

app.listen(PORT, () => {
  console.log(`FreeIntel Hub running on port ${PORT}`);
});
