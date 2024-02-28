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
      {
        hostname: "res.cloudinary.com",
        protocol: "https",
        pathname: `/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/**`,
      },
    ],
  },
};

export default nextConfig;
