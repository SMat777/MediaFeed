import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Tillader Guardian API-billeder via next/image (lazy loading + WebP-optimering)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.guim.co.uk',
      },
    ],
  },
};

export default nextConfig;
