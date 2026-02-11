/********************
 * Crash Guards
 ********************/
process.on('uncaughtException', err => {
  console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', err => {
  console.error('Unhandled Rejection:', err);
});

const express = require('express');
const Parser = require('rss-parser');
const path = require('path');
const NodeCache = require('node-cache');
const rateLimit = require('express-rate-limit');

const app = express();
const parser = new Parser({
  timeout: 10000,
  headers: { 'User-Agent': 'FreeIntelHub/1.0' }
});
const cache = new NodeCache({ stdTTL: 300 });

/********************
 * Load vendors.json safely
 ********************/
let vendors = {};
try {
  vendors = require('./vendors.json');
} catch (e) {
  console.error('vendors.json missing or invalid:', e.message);
  vendors = {};
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false
}));

let articles = [];
let cveTicker = [];

/********************
 * Vendor Alias Detection
 ********************/
function detectVendors(text) {
  if (!text) return [];
  const found = new Set();
  const content = text.toLowerCase();

  for (const [vendor, aliases] of Object.entries(vendors)) {
    for (const alias of aliases) {
      if (content.includes(String(alias).toLowerCase())) {
        found.add(vendor.toLowerCase());
        break;
      }
    }
  }
  return Array.from(found);
}

/********************
 * RSS Feeds
 ********************/
const FEEDS = [
  "https://www.bleepingcomputer.com/feed/",
  "https://feeds.feedburner.com/TheHackersNews",
  "https://www.darkreading.com/rss.xml",
  "https://www.securityweek.com/feed",
  "https://www.recordedfuture.com/rss",
  "https://www.cisa.gov/cybersecurity-advisories/all.xml"
];

/********************
 * Fetch RSS (Non-blocking, crash-safe)
 ********************/
async function fetchFeeds() {
  try {
    let all = [];

    for (const url of FEEDS) {
      try {
        const feed = await parser.parseURL(url);
        (feed.items || []).forEach(item => {
          const text = `${item.title || ''} ${item.contentSnippet || ''} ${item.content || ''}`;
          all.push({
            title: item.title || 'No title',
            link: item.link || '#',
            summary: item.contentSnippet || '',
            source: feed.title || url,
            published: item.pubDate || item.isoDate || new Date().toISOString(),
            vendors: detectVendors(text)
          });
        });
      } catch (e) {
        console.error('RSS failed:', url, e.message);
      }
    }

    articles = all.sort((a, b) => new Date(b.published) - new Date(a.published));
    cache.set('articles', articles);
    console.log(`[+] RSS updated: ${articles.length} articles`);
  } catch (err) {
    console.error('RSS fetch error:', err.message);
  }
}

/********************
 * Cache Wrapper
 ********************/
async function getArticlesCached() {
  const cached = cache.get('articles');
  if (cached && cached.length) return cached;
  await fetchFeeds();
  return articles;
}

/********************
 * Vendor Index for Homepage
 ********************/
function buildVendorIndex(list) {
  const map = {};
  (list || []).forEach(article => {
    (article.vendors || []).forEach(vendor => {
      if (!map[vendor]) {
        map[vendor] = { vendor, count: 0, latest: new Date(article.published || 0) };
      }
      map[vendor].count++;
      const published = new Date(article.published || 0);
      if (published > map[vendor].latest) map[vendor].latest = published;
    });
  });

  return Object.values(map).sort((a, b) => b.latest - a.latest);
}

/********************
 * Search (null-safe)
 ********************/
function searchArticles(query, list) {
  const q = (query || '').toLowerCase();

  return (list || [])
    .map(a => {
      let score = 0;
      if ((a.title || '').toLowerCase().includes(q)) score += 3;
      if ((a.vendors || []).includes(q)) score += 5;
      if ((a.summary || '').toLowerCase().includes(q)) score += 1;
      return { ...a, score };
    })
    .filter(a => a.score > 0)
    .sort((a, b) => b.score - a.score);
}

/********************
 * Routes
 ********************/
app.get('/health', (req, res) => res.send('OK'));

app.get('/', async (req, res) => {
  const list = await getArticlesCached();
  const vendorsIndex = buildVendorIndex(list);

  res.render('index', {
    news: list.slice(0, 30),
    vendors: vendorsIndex,
    cveTicker
  });
});

app.get('/vendor/:vendor', async (req, res) => {
  const vendor = (req.params.vendor || '').toLowerCase();
  const list = await getArticlesCached();
  const vendorNews = (list || []).filter(a => (a.vendors || []).includes(vendor));

  res.render('vendor', { vendor, news: vendorNews });
});

app.get('/search', async (req, res) => {
  const q = req.query.q || '';
  const list = await getArticlesCached();
  const results = q ? searchArticles(q, list) : [];

  res.render('search', { query: q, results });
});

/********************
 * CVE Ticker Stub
 ********************/
setInterval(() => {
  cveTicker = [];
}, 60 * 60 * 1000);

/********************
 * Start Server (Hostinger-safe)
 ********************/
const PORT = process.env.PORT;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🔥 FreeIntel Hub running on port ${PORT}`);
});

/********************
 * Start RSS after server is up
 ********************/
setTimeout(fetchFeeds, 2000);
setInterval(fetchFeeds, 15 * 60 * 1000);
