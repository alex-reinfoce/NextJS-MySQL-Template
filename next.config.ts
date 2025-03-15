import type { NextConfig } from "next";
import path from "path";


const nextConfig: NextConfig = {
  reactStrictMode: false,
  serverExternalPackages: ["typeorm"],
  webpack:
    process.env.NODE_ENV === "production"
      ? (config, { isServer }) => {
        if (!isServer) {
          config.resolve.alias = {
            ...config.resolve.alias,
            typeorm: path.resolve(__dirname, './compatible/typeorm.ts'),
          };
        }
        return config;
      }
      : null,
};

export default nextConfig;
