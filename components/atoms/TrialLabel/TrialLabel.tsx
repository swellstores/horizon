import React from 'react';
import type { Maybe } from 'lib/graphql/generated/sdk';
import useSettingsStore from 'stores/settings';
import useCurrencyStore from 'stores/currency';
import { fallbackString, parseTextWithVariables } from 'utils/text';

interface TrialLabelProps {
  trialDays?: Maybe<number>;
  price?: number;
}

const TrialLabel: React.FC<TrialLabelProps> = ({ trialDays, price }) => {
  const lang = useSettingsStore((state) => state.settings?.lang);
  const formatPrice = useCurrencyStore((state) => state.formatPrice);
  if (!trialDays || trialDays === 0) return null;

  const trialMessage = fallbackString(
    lang?.products?.trialMessage,
    '{n} days free trial, then {price}',
  );
  const parsedMessage = parseTextWithVariables(trialMessage, {
    n: trialDays.toString(),
    price: formatPrice(price ?? 0),
  });

  return <span className="text-2xs text-body">{parsedMessage}</span>;
};

export default TrialLabel;
