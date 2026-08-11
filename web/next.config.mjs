/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  allowedDevOrigins: ["192.168.100.34"],

  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;