import {
  generateFontSizeVars,
  generateFontFamilyVars,
  generateFontWeightVars,
} from './fonts.mjs';

export function getVarsFromObject(
  object,
  label = '',
  transform = (value) => value,
) {
  const vars = [];
  const prefix = label ? `${label}-` : '';
  Object.entries(object).forEach(([key, value]) => {
    if (typeof value === 'object') {
      vars.push(...getVarsFromObject(value, `${prefix}${key}`, transform));
    } else {
      vars.push(`--${prefix}${key}: ${transform(value)};`);
    }
  });
  return vars;
}

export function generateCssVars(settings) {
  const fontSizeVars = generateFontSizeVars(settings.typography?.font_size);
  const fontFamilyVars = generateFontFamilyVars(
    settings.typography?.font_family,
  );
  const fontWeightVars = generateFontWeightVars(
    settings.typography?.font_family,
  );
  const colorVars = getVarsFromObject(settings.colors, 'colors');
  const borderVars = getVarsFromObject(
    settings.borders,
    'borders',
    (value) => `${value}px`,
  );

  const cssVars = [
    ...fontSizeVars,
    ...fontFamilyVars,
    ...fontWeightVars,
    ...colorVars,
    ...borderVars,
  ];

  return cssVars;
}
