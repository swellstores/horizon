import React from 'react';
import type { Maybe } from 'lib/graphql/generated/sdk';
import useCurrencyStore from 'stores/currency';
import useI18n from 'hooks/useI18n';

interface TrialLabelProps {
  trialDays?: Maybe<number>;
  price?: number;
}

const TrialLabel: React.FC<TrialLabelProps> = ({ trialDays, price }) => {
  const i18n = useI18n();
  const formatPrice = useCurrencyStore((state) => state.formatPrice);
  if (!trialDays || trialDays === 0) return null;

  const trialMessage = i18n('products.trial_message', {
    n: trialDays.toString(),
    price: formatPrice(price ?? 0),
  });

  return <span className="text-2xs text-body">{trialMessage}</span>;
};

export default TrialLabel;
