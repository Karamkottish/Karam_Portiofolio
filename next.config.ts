import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",  // Enables static HTML export
  images: {
    unoptimized: true, // Required for GitHub Pages
  },
  basePath: "/Karam_Portiofolio", // Repository name
  assetPrefix: "/Karam_Portiofolio/", // Asset loading path
  env: {
    NEXT_PUBLIC_BASE_PATH: "/Karam_Portiofolio",
  },
};

export default nextConfig;
