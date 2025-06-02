// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode
  reactStrictMode: true,

  // ⚡ SWC minification (default: true)
  swcMinify: true,

  //  (Optional) Custom domains / redirects / rewrites
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "http://localhost:5000/api/:path*",
  //     },
  //   ];
  // },

  //  Configure images domains (if needed)
  // images: {
  //   domains: ["example.com"],
  // },

  // Output directory if using standalone build (e.g., for Docker)
  // output: "standalone",

  //  Enable experimental features if needed
  // experimental: {
  //   appDir: true, // e.g., if using /app directory
  // },

  // Custom headers (e.g., for CORS)
  // async headers() {
  //   return [
  //     {
  //       source: "/(.*)",
  //       headers: [
  //         {
  //           key: "Access-Control-Allow-Origin",
  //           value: "*",
  //         },
  //         {
  //           key: "Access-Control-Allow-Methods",
  //           value: "GET, POST, PUT, DELETE, OPTIONS",
  //         },
  //       ],
  //     },
  //   ];
  // },
};

export default nextConfig;
