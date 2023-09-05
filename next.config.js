const isDev = process.env.NODE_ENV === 'development';
const storeUrl = process.env.NEXT_PUBLIC_SWELL_STORE_URL;
const graphqlKey = process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY;

/** @type {import('next').NextConfig} */
let nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'cdn.schema.io',
      'cdn.swell.store',
      ...(isDev ? ['cdn.swell.test'] : []),
    ],
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
  /**
   *
   * @returns @type {import('next').NextConfig['i18n']}
   */
  const getLocalesConfig = async () => {
    if (!storeUrl || !graphqlKey) return null;

    const res = await fetch(`${storeUrl}/api/settings`, {
      headers: {
        Authorization: graphqlKey,
      },
    });
    const data = await res.json();

    if (!data?.store?.locales?.length) return null;

    return {
      locales: data.store.locales.map((locale) => locale.code),
      defaultLocale: data.store.locales.map((locale) => locale.code)[0],
    };
  };

  const i18n = await getLocalesConfig();

  if (i18n) nextConfig.i18n = i18n;

  return nextConfig;
};
