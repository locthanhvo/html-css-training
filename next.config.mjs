/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    deviceSizes: [440, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [14, 16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/users/user-list',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
