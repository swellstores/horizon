import type { Maybe } from 'lib/graphql/generated/sdk';

export const formatPriceByCurrency = (currency: Maybe<string> = 'USD') =>
  new Intl.NumberFormat(undefined, {
    currency: currency ?? 'USD',
    style: 'currency',
  }).format;
