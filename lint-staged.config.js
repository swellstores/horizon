module.exports = {
  '*.{ts,tsx}': [() => 'tsc --skipLibCheck --noEmit', 'eslint --cache --fix'],
  '*.{js,jsx,ts,tsx}': 'eslint --cache --fix',
  '*.{js,jsx,ts,tsx,css,md}': 'prettier --write',
};
