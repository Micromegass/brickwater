import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    loader: "custom",
    loaderFile: "./lib/images/loader.ts",
    deviceSizes: [640, 1024, 1600, 2400],
    imageSizes: [320],
    qualities: [75],
  },
  agentRules: false,
  experimental: {
    globalNotFound: true,
  },
};

export default withNextIntl(nextConfig);
