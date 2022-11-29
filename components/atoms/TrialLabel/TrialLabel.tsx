import React from 'react';
import Price from 'components/atoms/Price';
import type { Maybe } from 'lib/graphql/generated/sdk';

interface TrialLabelProps {
  trialDays?: Maybe<number>;
  price?: number;
}

const TrialLabel: React.FC<TrialLabelProps> = ({ trialDays, price }) => {
  if (!trialDays || trialDays === 0) return null;
  return (
    <span className="text-2xs text-body">
      {/* TODO: i18n */}
      {trialDays} days free trial, then <Price price={price ?? 0} />
    </span>
  );
};

export default TrialLabel;
