module.exports = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeTitle: false,
          removeDesc: false,
          cleanupIDs: false,
        },
      },
    },
    'removeDimensions',
  ],
};
