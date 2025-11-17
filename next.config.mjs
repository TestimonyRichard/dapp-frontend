/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'glow.app',
      },
      {
        protocol: 'https',
        hostname: 'tor.us',
      },
      {
        protocol: 'https',
        hostname: 'explorer-api.walletconnect.com',
      },
    ],
  },
};

export default nextConfig;
