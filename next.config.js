const isDev = process.env.NODE_ENV === 'development';

/** @type {import('next').NextConfig} */
let nextConfig = {
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
  rewrites() {
    return [
      {
        destination: '/api/:slug*',
        source: '/horizon-api/:slug*',
      },
    ];
  },
};

module.exports = async () => {
  const storeUrl = process.env.NEXT_PUBLIC_SWELL_STORE_URL;
  const graphqlKey = process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY;
  const getLocales = async () => {
    const headers = {
      Authorization: graphqlKey,
    };
    const res = await fetch(`${storeUrl}/api/settings`, {
      headers,
    });
    const data = await res.json();

    return {
      locales: data.store.locales.map((locale) => locale.code),
      defaultLocale: data.store.locales.map((locale) => locale.code)[0],
    };
  };

  const i18n = await getLocales();

  nextConfig.i18n = i18n;

  return nextConfig;
};
