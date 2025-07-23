import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // 빌드 시 ESLint 무시
  },
  typescript: {
    ignoreBuildErrors: true, // TypeScript 오류도 무시하려면
  },
  images: {
    remotePatterns: [{ hostname: "example.com" }],
  },
};

export default nextConfig;
