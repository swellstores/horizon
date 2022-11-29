const path = require('path');

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const pathToInlineSvg = path.resolve(__dirname, '../assets/icons');

module.exports = {
  staticDirs: ['../public'],
  stories: ['../components/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-postcss',
    'storybook-addon-next',
  ],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
    disableTelemetry: true,
  },
  webpackFinal: async (config) => {
    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new TsconfigPathsPlugin({
        extensions: config.resolve.extensions,
      }),
    ];

    const fileLoaderRule = config.module.rules.find((rule) =>
      rule?.test?.test('.svg'),
    );

    fileLoaderRule.exclude = pathToInlineSvg;

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};
