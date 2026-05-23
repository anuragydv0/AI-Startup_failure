const path = require("path")

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    // Set the turbopack root to this project to avoid lockfile root inference warnings
    root: path.resolve(__dirname),
  },
  // swcMinify was removed in Next.js 15 — minification is now always enabled
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
}

module.exports = nextConfig
