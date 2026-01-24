import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'digitaljesse.com',
        pathname: '/cdn/**',
      },
    ],
  },
};

export default nextConfig;
