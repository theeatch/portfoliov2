/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
    domains: [
      "api.microlink.io", // Microlink Image Preview
    ],
  },
};

export default nextConfig;
