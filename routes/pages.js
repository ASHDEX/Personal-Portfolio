import express from "express";
const r = express.Router();

// Homepage (Trending CVEs + Latest News + Pagination)
r.get("/", async (req, res) => {
  const page = parseInt(req.query.page || "1", 10);
  const limit = 12;
  const offset = (page - 1) * limit;

  const rows = await req.db.all(
    `SELECT * FROM articles
     ORDER BY published_at DESC
     LIMIT ? OFFSET ?`,
    [limit, offset]
  );

  const totalRow = await req.db.get(`SELECT COUNT(*) as count FROM articles`);
  const totalPages = Math.max(1, Math.ceil(totalRow.count / limit));

  const trending = await req.db.all(
    `SELECT * FROM articles
     WHERE category = 'CVE'
     ORDER BY published_at DESC
     LIMIT 6`
  );

  res.render("index", {
    rows,
    trending,
    page,
    totalPages,
    path: req.path
  });
});

// Category page
r.get("/category/:cat", async (req, res) => {
  const cat = req.params.cat;
  const rows = await req.db.all(
    `SELECT * FROM articles
     WHERE category = ?
     ORDER BY published_at DESC
     LIMIT 100`,
    [cat]
  );
  res.render("category", { cat, rows, path: req.path });
});

// Vendors list
r.get("/vendors", async (req, res) => {
  const vendors = await req.db.all(
    `SELECT vendor, COUNT(*) as count
     FROM articles
     GROUP BY vendor
     ORDER BY count DESC`
  );
  res.render("vendors", { vendors, path: req.path });
});

// Vendor page
r.get("/vendor/:vendor", async (req, res) => {
  const vendor = req.params.vendor.toLowerCase();
  const rows = await req.db.all(
    `SELECT * FROM articles
     WHERE vendor = ?
     ORDER BY published_at DESC
     LIMIT 100`,
    [vendor]
  );
  res.render("vendor", { vendor, rows, path: req.path });
});

// Filter by source
r.get("/source/:name", async (req, res) => {
  const source = decodeURIComponent(req.params.name);
  const rows = await req.db.all(
    `SELECT * FROM articles
     WHERE source = ?
     ORDER BY published_at DESC
     LIMIT 100`,
    [source]
  );
  res.render("source", { source, rows, path: req.path });
});

// Sources health page
r.get("/sources", async (req, res) => {
  const sources = await req.db.all(`
    SELECT
      fh.source,
      fh.url,
      fh.last_status,
      fh.last_checked_at,
      fh.success_count,
      fh.fail_count,
      COUNT(a.id) as total_items
    FROM feed_health fh
    LEFT JOIN articles a ON a.source = fh.source
    GROUP BY fh.source
    ORDER BY total_items DESC
  `);
  res.render("sources", { sources, path: req.path });
});

// Search
r.get("/search", async (req, res) => {
  const q = req.query.q || "";
  const source = req.query.source || "";

  const rows = q
    ? await req.db.all(
        `SELECT * FROM articles
         WHERE (title LIKE ? OR summary LIKE ?)
           AND (? = '' OR source = ?)
         ORDER BY published_at DESC
         LIMIT 100`,
        [`%${q}%`, `%${q}%`, source, source]
      )
    : [];

  res.render("search", { q, rows, path: req.path });
});

// About
r.get("/about", (req, res) => {
  res.render("about", { path: req.path });
});

// Subscribe
r.get("/subscribe", (req, res) => {
  res.render("subscribe", { path: req.path });
});

// Legal pages
r.get("/dmca", (req, res) => res.render("dmca", { path: req.path }));
r.get("/privacy", (req, res) => res.render("privacy", { path: req.path }));
r.get("/terms", (req, res) => res.render("terms", { path: req.path }));

export default r;
