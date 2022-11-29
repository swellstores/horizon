import { getVarsFromObject } from './styles.mjs';

export function generateFontSizes(baseFontSize, scaling) {
  const baseRem = 16; //Default px value for one rem

  /** Transforms input in pixels into rem
   * @param {number} number Number in pixels
   */
  const toRem = (number) => `${(number / baseRem).toFixed(3)}rem`;

  return {
    '8xl': toRem(baseFontSize * Math.pow(scaling, 9)),
    '7xl': toRem(baseFontSize * Math.pow(scaling, 8)),
    '6xl': toRem(baseFontSize * Math.pow(scaling, 7)),
    '5xl': toRem(baseFontSize * Math.pow(scaling, 6)),
    '4xl': toRem(baseFontSize * Math.pow(scaling, 5)),
    '3xl': toRem(baseFontSize * Math.pow(scaling, 4)),
    '2xl': toRem(baseFontSize * Math.pow(scaling, 3)),
    xl: toRem(baseFontSize * Math.pow(scaling, 2)),
    lg: toRem(baseFontSize * scaling),
    md: toRem(baseFontSize),
    sm: toRem(baseFontSize / scaling),
    xs: toRem(baseFontSize / Math.pow(scaling, 2)),
    '2xs': toRem(baseFontSize / Math.pow(scaling, 3)),
    '3xs': toRem(baseFontSize / Math.pow(scaling, 4)),
  };
}

export function generateFontSizeVars(fontSizesData) {
  const baseFontSize = fontSizesData?.base || 16;
  const scaling = fontSizesData?.scaling || 1.125;
  const fontSizes = generateFontSizes(baseFontSize, scaling);
  return getVarsFromObject(fontSizes, 'typography-font-size');
}

export function generateFontFamilyVars(fonts = {}) {
  const formattedFonts = {};
  Object.entries(fonts).forEach(([key, value]) => {
    formattedFonts[key] = value.name;
  });
  return getVarsFromObject(
    formattedFonts,
    'typography-font-family',
    (value) => `'${value}'`,
  );
}

export function generateFontWeightVars(fonts = {}) {
  const formattedFonts = {};
  Object.entries(fonts).forEach(([key, value]) => {
    formattedFonts[key] = value.weight;
  });
  return getVarsFromObject(formattedFonts, 'typography-font-weight');
}

export function generateFontLinks(fonts = {}) {
  return Object.values(fonts)
    .filter((font) => font.provider === 'Google')
    .map((font) => {
      const fontName = font.name?.replace(/\s/g, '+');
      const weights = font.weight ? `:wght@${font.weight}` : '';
      return `https://fonts.googleapis.com/css2?family=${fontName}${weights}&display=swap`;
    });
}
