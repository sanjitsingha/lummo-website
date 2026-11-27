import type { NextConfig } from "next";

const mintlifyDocsUrl = process.env.MINTLIFY_DOCS_URL?.trim().replace(/\/+$/, "");

const nextConfig: NextConfig = {
  /* config options here */
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
  /** Proxy `/docs` and Mintlify assets to the Mintlify deployment once `MINTLIFY_DOCS_URL` is configured. */
  async rewrites() {
    if (!mintlifyDocsUrl) return [];

    return [
      {
        source: "/_mintlify/:path*",
        destination: `${mintlifyDocsUrl}/_mintlify/:path*`,
      },
      {
        source: "/api/request",
        destination: `${mintlifyDocsUrl}/_mintlify/api/request`,
      },
      {
        source: "/docs",
        destination: `${mintlifyDocsUrl}/docs`,
      },
      {
        source: "/docs/:match*",
        destination: `${mintlifyDocsUrl}/docs/:match*`,
      },
      {
        source: "/mintlify-assets/:path+",
        destination: `${mintlifyDocsUrl}/mintlify-assets/:path+`,
      },
    ];
  },
};

export default nextConfig;
