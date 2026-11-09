import type { NextConfig } from "next";
import path from "node:path";

import { PRIVATE_CACHE_HEADER, PRIVATE_PATHS, securityHeaders } from "./src/lib/site/securityHeaders";

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

const nextConfig: NextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  // Hides the Next "N" button in development.
  devIndicators: false,
  // Cloudinary photos: only the configured account is accepted
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: cloudName ? [new URL(`https://res.cloudinary.com/${cloudName}/**`)] : [],
  },
  // Hardening headers on every response; the signed-in areas and the API are also kept out of shared caches.
  async headers() {
    const options = { development: process.env.NODE_ENV === "development", imageHosts: cloudName ? ["https://res.cloudinary.com"] : [] };
    return [
      { source: "/:path*", headers: securityHeaders(options) },
      ...PRIVATE_PATHS.map((source) => ({ source, headers: [PRIVATE_CACHE_HEADER] })),
    ];
  },
  sassOptions: {
    loadPaths: [path.join(process.cwd(), "src/styles")],
  },
};

export default nextConfig;
