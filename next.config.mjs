/** @type {import('next').NextConfig} */
const nextConfig = {
  // The Design and Build pages were folded into the Portfolio page.
  async redirects() {
    return [
      { source: '/design', destination: '/works', permanent: true },
      { source: '/build', destination: '/works', permanent: true },
    ];
  },
  images: {
    // 75 is Next's default; 90 and 95 are used by the hero and process images.
    qualities: [75, 90, 95],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
