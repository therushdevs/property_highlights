/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/notifications",
        destination: "http://localhost:5000/api/notifications",
      },
    ];
  },
};

export default nextConfig;
