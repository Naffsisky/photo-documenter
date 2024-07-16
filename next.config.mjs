/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qxs0erdoozcarxms.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
