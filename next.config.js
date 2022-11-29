const isDev = process.env.NODE_ENV === 'development';
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.schema.io', ...(isDev ? ['cdn.swell.test'] : [])],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  // TODO: Get from GraphQL
  i18n: {
    locales: ['en', 'es-ES'],
    defaultLocale: 'en',
  },
  rewrites() {
    return [
      {
        destination: '/api/:slug*',
        source: '/horizon-api/:slug*',
      },
    ];
  },
};

module.exports = nextConfig;
