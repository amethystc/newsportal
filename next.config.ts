import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**", // semua gambar sanity
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
