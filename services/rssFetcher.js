import Parser from "rss-parser";

const parser = new Parser({
  timeout: 15000,
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122.0 Safari/537.36",
    Accept: "application/rss+xml, application/atom+xml, application/xml, text/xml"
  }
});

// ✅ Curated feeds that reliably work with rss-parser
export const FEEDS = [
  // General news
  { name: "The Hacker News", url: "https://feeds.feedburner.com/TheHackersNews" },
  { name: "BleepingComputer", url: "https://www.bleepingcomputer.com/feed/" },
  { name: "Security Affairs", url: "https://securityaffairs.com/feed" },
  { name: "Krebs on Security", url: "https://krebsonsecurity.com/feed/" },
  { name: "SecurityWeek", url: "https://www.securityweek.com/feed/" },
  { name: "Help Net Security", url: "https://helpnetsecurity.com/feed/" },
  { name: "GBHackers", url: "https://gbhackers.com/feed/" },
  { name: "HackRead", url: "https://hackread.com/feed/" },
  { name: "WeLiveSecurity (ESET)", url: "https://welivesecurity.com/en/feed/" },
  { name: "Information Security Buzz", url: "https://informationsecuritybuzz.com/feed/" },
  { name: "CSO Online", url: "https://csoonline.com/feed/" },

  // Research / threat intel
  { name: "SANS ISC", url: "https://isc.sans.edu/rssfeed_full.xml" },
  { name: "Graham Cluley", url: "https://grahamcluley.com/feed/" },
  { name: "Google Security Blog", url: "https://security.googleblog.com/feeds/posts/default" },

  // Vendors / advisories (these 2 are solid)
  { name: "Cisco Advisories", url: "https://sec.cloudapps.cisco.com/security/center/psirtrss20/CiscoSecurityAdvisory.xml" },
  { name: "Palo Alto Networks", url: "https://security.paloaltonetworks.com/rss.xml" }
];

export async function fetchFeeds(db) {
  for (const feed of FEEDS) {
    try {
      const data = await parser.parseURL(feed.url);
      console.log(`Fetched: ${feed.name}`);

      for (const item of data.items || []) {
        const title = item.title?.trim();
        const link = item.link || item.guid;
        const summary =
          item.contentSnippet ||
          item.summary ||
          (item.content ? item.content.replace(/<[^>]+>/g, "").slice(0, 400) : "");

        if (!title || !link) continue;

        await db.run(
          `
          INSERT OR IGNORE INTO articles
          (title, summary, link, source, category, vendor, published_at)
          VALUES (?, ?, ?, ?, ?, ?, ?)
          `,
          [
            title,
            summary || "",
            link,
            feed.name,
            "NEWS",
            "others",
            item.isoDate || item.pubDate || new Date().toISOString()
          ]
        );
      }
    } catch (err) {
      console.error(`Feed error (skipped): ${feed.name}`, err.message);
    }
  }
}
