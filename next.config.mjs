/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // experimental: {
  //   staleTimes: {
  //     dynamic: 5,
  //   },
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "search1.kakaocdn.net",
      },
      {
        protocol: "https",
        hostname: "search.daum.net",
      },
    ],
  },
};

export default nextConfig;
