/** @type {import('next').NextConfig} */
const nextConfig = {
  // Conflict-resolution note: keep unoptimized enabled to avoid image proxy failures in restricted runtimes.
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.credly.com'
      }
    ]
  }
};

module.exports = nextConfig;
