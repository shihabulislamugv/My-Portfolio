import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    '/*': ['./prisma/**/*', './prisma/dev.db', './dev.db'],
    '/api/**/*': ['./prisma/**/*', './prisma/dev.db', './dev.db'],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/uploads/Md_Shihabul_Islam_Resume.pdf',
        headers: [
          {
            key: 'Content-Disposition',
            value: 'inline; filename="Md_Shihabul_Islam_Resume.pdf"',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
