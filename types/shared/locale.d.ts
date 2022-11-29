export interface Locale {
  name: string;
  code: string;
  fallback?: string | null;
  defaultCurrency?: string;
}
