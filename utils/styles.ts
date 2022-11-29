export const getLogoCssProperties = (
  logo: {
    width: string | number;
    height: string | number;
  } | null,
  logoHeight: {
    mobile: number;
    desktop: number;
  } | null,
) => {
  if (!logo || !logoHeight) return {};
  const aspectRatio = +logo.width / +logo.height || 1;
  const toPx = (value: number) => `${value}px`;
  return {
    '--logo-desktop-width': toPx(aspectRatio * logoHeight.desktop || 202),
    '--logo-desktop-height': toPx(logoHeight.desktop || 32),
    '--logo-mobile-width': toPx(aspectRatio * logoHeight.mobile || 130),
    '--logo-mobile-height': toPx(logoHeight.mobile || 20),
  };
};
