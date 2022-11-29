import {
  generateFontLinks,
  generateFontSizes,
  generateFontFamilyVars,
  generateFontWeightVars,
  generateFontSizeVars,
} from './fonts.mjs';

interface Font {
  provider: string;
  name: string;
  weight: number;
  fallback: string;
}

export interface Fonts {
  [name: string]: Font;
}

const fonts: Fonts = {
  body: {
    provider: 'Google',
    name: 'Lato',
    fallback:
      '-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif',
    weight: 400,
  },
  button: {
    provider: 'system',
    name: 'Gill Sans',
    fallback:
      '-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif',
    weight: 600,
  },
  headings: {
    provider: 'Google',
    name: 'Roboto',
    weight: 500,
    fallback:
      '-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif',
  },
};

describe('fonts build utils', () => {
  describe('#generateFontSizes', () => {
    it('correctly generates all sizes based on the base font size and the scaling', () => {
      const testCases = [
        {
          baseFontSize: 16,
          scaling: 1.125,
          fontSizes: {
            '8xl': '2.887rem',
            '7xl': '2.566rem',
            '6xl': '2.281rem',
            '5xl': '2.027rem',
            '4xl': '1.802rem',
            '3xl': '1.602rem',
            '2xl': '1.424rem',
            xl: '1.266rem',
            lg: '1.125rem',
            md: '1.000rem',
            sm: '0.889rem',
            xs: '0.790rem',
            '2xs': '0.702rem',
            '3xs': '0.624rem',
          },
        },
        {
          baseFontSize: 14,
          scaling: 1.2,
          fontSizes: {
            '8xl': '4.515rem',
            '7xl': '3.762rem',
            '6xl': '3.135rem',
            '5xl': '2.613rem',
            '4xl': '2.177rem',
            '3xl': '1.814rem',
            '2xl': '1.512rem',
            xl: '1.260rem',
            lg: '1.050rem',
            md: '0.875rem',
            sm: '0.729rem',
            xs: '0.608rem',
            '2xs': '0.506rem',
            '3xs': '0.422rem',
          },
        },
      ];
      testCases.forEach(({ baseFontSize, scaling, fontSizes }) => {
        expect(generateFontSizes(baseFontSize, scaling)).toEqual(fontSizes);
      });
    });
  });

  describe('#generateFontSizeVars', () => {
    it('correctly generates all font size vars based on the base font size and the scaling', () => {
      const fontSizeData = {
        base: 16,
        scaling: 1.125,
      };
      const expectedFontSizes = [
        '--typography-font-size-8xl: 2.887rem;',
        '--typography-font-size-7xl: 2.566rem;',
        '--typography-font-size-6xl: 2.281rem;',
        '--typography-font-size-5xl: 2.027rem;',
        '--typography-font-size-4xl: 1.802rem;',
        '--typography-font-size-3xl: 1.602rem;',
        '--typography-font-size-2xl: 1.424rem;',
        '--typography-font-size-xl: 1.266rem;',
        '--typography-font-size-lg: 1.125rem;',
        '--typography-font-size-md: 1.000rem;',
        '--typography-font-size-sm: 0.889rem;',
        '--typography-font-size-xs: 0.790rem;',
        '--typography-font-size-2xs: 0.702rem;',
        '--typography-font-size-3xs: 0.624rem;',
      ];
      expect(generateFontSizeVars(fontSizeData)).toEqual(expectedFontSizes);
    });
  });

  describe('#generateFontFamilyVars', () => {
    it('should generate a font family css var for each valid font', () => {
      const expectedVars = [
        `--typography-font-family-body: 'Lato';`,
        `--typography-font-family-button: 'Gill Sans';`,
        `--typography-font-family-headings: 'Roboto';`,
      ];
      const generatedVars = generateFontFamilyVars(fonts);
      expect(generatedVars).toEqual(expectedVars);
    });
  });

  describe('#generateFontWeightVars', () => {
    it('should generate a font weight css var for each valid font', () => {
      const expectedVars = [
        `--typography-font-weight-body: 400;`,
        `--typography-font-weight-button: 600;`,
        `--typography-font-weight-headings: 500;`,
      ];
      const generatedVars = generateFontWeightVars(fonts);
      expect(generatedVars).toEqual(expectedVars);
    });
  });

  describe('#generateFontLinks', () => {
    it('should generate font links for each Google source', () => {
      const expectedLinks = [
        'https://fonts.googleapis.com/css2?family=Lato:wght@400&display=swap',
        'https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap',
      ];
      const generatedLinks = generateFontLinks(fonts);
      expect(generatedLinks).toEqual(expectedLinks);
    });

    it('should return an empty array when fonts is undefined', () => {
      const expectedLinks: string[] = [];
      const generatedLinks = generateFontLinks();
      expect(generatedLinks).toEqual(expectedLinks);
    });
  });
});
