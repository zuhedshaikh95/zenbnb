/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
        protocol: "https",
        pathname: "/u/**",
      },
      {
        hostname: "lh3.googleusercontent.com",
        protocol: "https",
        pathname: "/a/**",
      },
    ],
  },
};

export default nextConfig;
