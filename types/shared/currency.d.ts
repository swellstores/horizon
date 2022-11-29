export interface Currency {
  code: string;
  symbol: string;
  name?: string;
  rate?: number;
  decimals?: number;
  priced?: boolean;
  type?: string;
  // type?: 'base' | 'priced' | 'display';
}

export interface CurrencyPrice {
  price: number;
  currency: string;
}
