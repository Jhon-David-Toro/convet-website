import type { NextConfig } from "next";
import path from "node:path";

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
  sassOptions: {
    loadPaths: [path.join(process.cwd(), "src/styles")],
  },
};

export default nextConfig;
