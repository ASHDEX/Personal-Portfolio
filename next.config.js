/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.credly.com",
      },
    ],
  },
  async headers() {
    return [
      {
        // Global security headers applied to all routes
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // CSP is handled dynamically in middleware.ts with per-request nonces
        ],
      },
      {
        // No caching for the contact API
        source: "/api/contact",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
    ];
  },
};

module.exports = nextConfig;
