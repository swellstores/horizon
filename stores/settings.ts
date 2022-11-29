import create from 'zustand';
import type { HeaderProps } from 'components/organisms/Header';
import type { FooterProps } from 'components/organisms/Footer/Footer';
import type { SocialLinks } from 'types/shared/socials';
import type { Fonts } from 'build-utils/fonts.test';

export type Colors = { [key: string]: string | { [key: string]: string } };
export type Typography = {
  fontSize: { base: number; scaling: number };
  fontFamily: Fonts;
};
export type Borders = { image: { radius: number } };

export interface Settings {
  colors: Colors;
  typography: Typography;
  borders: Borders;
  header: HeaderProps;
  footer: FooterProps;
  socialLinks: SocialLinks;
}

interface SettingsState {
  settings: Settings | null;
  setSettings: (settings: Settings) => void;
  setSetting: (path: string, value: any) => void;
}

const useSettingsStore = create<SettingsState>((set) => ({
  settings: null,
  setSettings: (settings: Settings) => {
    set((state) => {
      if (state.settings) {
        return {
          settings: { ...state.settings, ...settings },
        };
      }
      return { settings };
    });
  },
  setSetting: async (path, value) => {
    const [setValue, toCamelCase] = await Promise.all([
      import('lodash.set').then((data) => data.default),
      import('lodash.camelcase').then((data) => data.default),
    ]);
    const newPath = path.split('.').map(toCamelCase).join('.');
    set((state) => {
      const settings = structuredClone(state.settings);
      if (!settings) return state;
      setValue(settings, newPath, value);
      return {
        settings,
      };
    });
  },
}));

export default useSettingsStore;
