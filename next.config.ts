import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Un package-lock.json existe dans le dossier utilisateur parent ; on force
  // explicitement la racine du projet pour éviter que Next.js ne s'y méprenne.
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
