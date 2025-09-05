import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    // This is to allow cross-origin requests in development.
    allowedDevOrigins: ["*.cloudworkstations.dev"],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      //
      // Fixes `async_hooks` not found error in the browser.
      //
      // This is a workaround for a bug in Next.js where it doesn't correctly
      // externalize server-only modules when they are used in a package that
      // is imported by a client-side component.
      //
      config.resolve.fallback = {
        ...config.resolve.fallback,
        async_hooks: false,
      };
    }

    return config;
  }
};

export default nextConfig;
