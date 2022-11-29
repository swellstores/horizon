import { getVarsFromObject, generateCssVars } from './styles.mjs';

describe('styles build utils', () => {
  describe('#getVarsFromObject', () => {
    it('should transform properties into css vars', () => {
      const properties = {
        primary: '#1D0A43',
        body: '#585165',
        accent: '#F2DCA6',
        dividers: '#ECEAF0',
      };
      const expectedVars = [
        '--primary: #1D0A43;',
        '--body: #585165;',
        '--accent: #F2DCA6;',
        '--dividers: #ECEAF0;',
      ];
      expect(getVarsFromObject(properties)).toEqual(expectedVars);
    });

    it('should prefix the label into the css var name', () => {
      const properties = {
        primary: '#1D0A43',
        body: '#585165',
        accent: '#F2DCA6',
      };
      const label = 'colors';
      const expectedVars = [
        '--colors-primary: #1D0A43;',
        '--colors-body: #585165;',
        '--colors-accent: #F2DCA6;',
      ];
      expect(getVarsFromObject(properties, label)).toEqual(expectedVars);
    });

    it('should flatten nested objects', () => {
      const properties = {
        success: { dark: '#00BA99' },
        error: { dark: '#FF766D' },
        button: { primary: '#1D0A43', secondary: '#FFFFFF' },
        background: { primary: '#FFFFFF', secondary: '#F6F4EF' },
        input: { standard: '#BDB9C6' },
      };
      const label = 'colors';
      const expectedVars = [
        '--colors-success-dark: #00BA99;',
        '--colors-error-dark: #FF766D;',
        '--colors-button-primary: #1D0A43;',
        '--colors-button-secondary: #FFFFFF;',
        '--colors-background-primary: #FFFFFF;',
        '--colors-background-secondary: #F6F4EF;',
        '--colors-input-standard: #BDB9C6;',
      ];
      expect(getVarsFromObject(properties, label)).toEqual(expectedVars);
    });

    it('should apply formatting transforms', () => {
      const properties = { image: { radius: 20 } };
      const label = 'borders';
      const transform = (value: string) => `${value}px`;
      const expectedVars = ['--borders-image-radius: 20px;'];
      expect(getVarsFromObject(properties, label, transform)).toEqual(
        expectedVars,
      );
    });
  });

  describe('#generateCssVars', () => {
    it('should generate the relevant css vars from a settings object', () => {
      const settings = {
        colors: {
          primary: '#1D0A43',
          body: '#585165',
          accent: '#F2DCA6',
          success: { dark: '#00BA99' },
          error: { dark: '#FF766D' },
          button: { primary: '#1D0A43', secondary: '#FFFFFF' },
          background: { primary: '#FFFFFF', secondary: '#F6F4EF' },
          input: { standard: '#BDB9C6' },
          dividers: '#ECEAF0',
        },
        borders: { image: { radius: 20 } },
        typography: {
          font_size: { base: 16, scaling: 1.125 },
          font_family: {
            headings: {
              provider: 'Google',
              name: 'Roboto',
              fallback:
                '-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif',
              weight: 500,
            },
            body: {
              provider: 'Google',
              name: 'Lato',
              fallback:
                '-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif',
              weight: 600,
            },
          },
        },
      };

      const expectedVars = [
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
        "--typography-font-family-headings: 'Roboto';",
        "--typography-font-family-body: 'Lato';",
        '--typography-font-weight-headings: 500;',
        '--typography-font-weight-body: 600;',
        '--colors-primary: #1D0A43;',
        '--colors-body: #585165;',
        '--colors-accent: #F2DCA6;',
        '--colors-success-dark: #00BA99;',
        '--colors-error-dark: #FF766D;',
        '--colors-button-primary: #1D0A43;',
        '--colors-button-secondary: #FFFFFF;',
        '--colors-background-primary: #FFFFFF;',
        '--colors-background-secondary: #F6F4EF;',
        '--colors-input-standard: #BDB9C6;',
        '--colors-dividers: #ECEAF0;',
        '--borders-image-radius: 20px;',
      ];

      expect(generateCssVars(settings)).toEqual(expectedVars);
    });
  });
});
