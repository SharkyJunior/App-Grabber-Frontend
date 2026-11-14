import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/favorites",
        destination: "/profile/favorites",
        permanent: true,
      },
      {
        source: "/history",
        destination: "/profile/history",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      new URL("https://play-lh.googleusercontent.com/**"),
      new URL("https://static.rustore.ru/**"),
    ],
  },
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
