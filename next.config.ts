import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/seo-local-google-business-profile-optimisation",
        destination: "/seo-local-google-business-profile-ia",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
