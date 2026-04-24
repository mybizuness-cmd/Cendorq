import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  eslint: {
    ignoreDuringBuilds: false,
  },

  typescript: {
    ignoreBuildErrors: false,
  },

  compiler: isProduction
    ? {
      removeConsole: {
        exclude: ["error", "warn"],
      },
    }
    : undefined,

  images: {
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: false,
    contentDispositionType: "inline",
    contentSecurityPolicy:
      "default-src 'self'; script-src 'none'; sandbox;",
  },

  async redirects() {
    return [
      {
        source: "/how-it-works",
        destination: "/diagnosis",
        permanent: true,
      },
      {
        source: "/plans",
        destination: "/pricing",
        permanent: true,
      },
      {
        source: "/freecheck",
        destination: "/free-check",
        permanent: true,
      },
      {
        source: "/full-diagnosis",
        destination: "/pricing/full-diagnosis",
        permanent: true,
      },
      {
        source: "/optimization",
        destination: "/pricing/optimization",
        permanent: true,
      },
      {
        source: "/monthly-partner",
        destination: "/pricing/monthly-partner",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "off",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/intake-console",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive, nosnippet",
          },
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
        ],
      },
      {
        source: "/intake-console/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive, nosnippet",
          },
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store",
          },
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive, nosnippet",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
