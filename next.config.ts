import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: "image.tmdb.org",
      },
    ],
  },
};

export default nextConfig;
