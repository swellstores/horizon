import { getLogoCssProperties } from './styles';

describe('getLogoCssProperties', () => {
  it('returns empty object when arguments are null', () => {
    const logo = null;
    const logoHeight = null;
    const logoCssProperties = getLogoCssProperties(logo, logoHeight);

    expect(logoCssProperties).toStrictEqual({});
  });

  it('returns values with default aspectRatio = 1 when logo image has no width/height', () => {
    const logo = {
      width: 0,
      height: 0,
    };
    const logoHeight = {
      mobile: 30,
      desktop: 35,
    };
    const logoCssProperties = getLogoCssProperties(logo, logoHeight);

    expect(logoCssProperties).toStrictEqual({
      '--logo-desktop-width': '35px',
      '--logo-desktop-height': '35px',
      '--logo-mobile-width': '30px',
      '--logo-mobile-height': '30px',
    });
  });

  it('returns default values when logoHeight has no mobile/desktop', () => {
    const logo = {
      width: 30,
      height: 50,
    };
    const logoHeight = {
      mobile: 0,
      desktop: 0,
    };
    const logoCssProperties = getLogoCssProperties(logo, logoHeight);

    expect(logoCssProperties).toStrictEqual({
      '--logo-desktop-width': '202px',
      '--logo-desktop-height': '32px',
      '--logo-mobile-width': '130px',
      '--logo-mobile-height': '20px',
    });
  });

  it('returns correct values when provided with non-zero values', () => {
    const logo = {
      width: 60,
      height: 30,
    };
    const logoHeight = {
      mobile: 50,
      desktop: 100,
    };
    const logoCssProperties = getLogoCssProperties(logo, logoHeight);

    expect(logoCssProperties).toStrictEqual({
      '--logo-desktop-width': '200px',
      '--logo-desktop-height': '100px',
      '--logo-mobile-width': '100px',
      '--logo-mobile-height': '50px',
    });
  });
});
