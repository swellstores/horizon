import '../styles/globals.css';
import '../styles/theme.css';

const customViewports = {
  small: {
    name: 'Small',
    styles: {
      width: '390px',
      height: '690px',
    },
    type: 'mobile',
  },
  large: {
    name: 'Large',
    styles: {
      width: '1280px',
      height: '720px',
    },
    type: 'desktop',
  },
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: customViewports,
  },
  layout: 'fullscreen',
};
