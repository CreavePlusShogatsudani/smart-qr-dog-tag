import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
});

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client", "prisma"],
  // Turbopackのデフォルト有効化によるwebpackプラグイン（PWA）の競合を回避するため空設定を明示
  turbopack: {},
};

export default withPWA(nextConfig);
