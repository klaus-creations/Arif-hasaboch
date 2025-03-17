import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
      allowedOrigins: ["http://localhost:3000"],
    },
    mdxRs: true,
  },
  serverExternalPackages: ["mongoose"],
};

export default nextConfig;
