import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  test: /\.code\.ts$/,
  use: 'raw-loader'
}

export default nextConfig;
