import { getProperty } from 'lib/utils/shared_functions';
import useSettingsStore from 'stores/settings';
import { fallbackString, parseTextWithVariables } from 'utils/text';
import defaults from 'config/defaults.json';
import camelCase from 'lodash.camelcase';
import type { NestedPaths } from 'types/utils';

export type I18n = (
  path: NestedPaths<typeof defaults.lang>,
  variables?: Record<string, string>,
) => string;

export const getI18n: (lang: any) => I18n = (lang) => (path, variables) => {
  const defaultValue = getProperty(defaults.lang, path) as string | undefined;
  if (!lang) return defaultValue as string;
  const camelCasePath = path.split('.').map(camelCase).join('.');
  const value = getProperty(lang, camelCasePath) as string | null | undefined;

  let text = fallbackString(value, defaultValue);

  if (variables) {
    text = parseTextWithVariables(text, variables);
  }

  return text;
};

const useI18n = () => {
  const lang = useSettingsStore((state) => state.settings?.lang);

  return getI18n(lang);
};

export default useI18n;
