import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gi.yatta.moe",
        port: "",
      },
    ],
  },
};

export default nextConfig;
