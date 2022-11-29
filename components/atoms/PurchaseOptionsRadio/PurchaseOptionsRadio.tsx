import React from 'react';
import RadioItem from './RadioItem';
import RadioItemLabel from './RadioItemLabel';
import Price from 'components/atoms/Price';
import TrialLabel from 'components/atoms/TrialLabel';
import { generateId } from 'lib/utils/shared_functions';
import { PURCHASE_OPTION_TYPE } from 'types/shared/products';
import type { ActiveVariation } from 'lib/utils/products';

export interface PurchaseOptionsRadioProps {
  standardPrice?: ActiveVariation['standardPrice'];
  subscriptionPrice?: ActiveVariation['subscriptionPrice'];
  value: PURCHASE_OPTION_TYPE;
  onChange: (value: PURCHASE_OPTION_TYPE) => void;
  className?: string;
}

const LABEL_MAP = {
  [PURCHASE_OPTION_TYPE.STANDARD]: 'One time',
  [PURCHASE_OPTION_TYPE.SUBSCRIPTION]: 'Subscription',
};

const NAME = 'purchase_options';

const PurchaseOptionsRadio: React.FC<PurchaseOptionsRadioProps> = ({
  standardPrice,
  subscriptionPrice,
  value,
  onChange,
  className,
}) => {
  // TODO: Replace with useId after upgrading to react 18
  const generatedId = generateId();
  const trial = (
    <TrialLabel
      trialDays={subscriptionPrice?.billingSchedule?.trialDays}
      price={subscriptionPrice?.origPrice}
    />
  );

  return (
    <div className={className ?? ''}>
      <RadioItem
        id={`${NAME}_${PURCHASE_OPTION_TYPE.STANDARD}_${generatedId}`}
        name={NAME}
        value={PURCHASE_OPTION_TYPE.STANDARD}
        activeValue={value}
        onChange={onChange}>
        <RadioItemLabel name={LABEL_MAP[PURCHASE_OPTION_TYPE.STANDARD]}>
          <Price
            price={standardPrice?.price}
            origPrice={standardPrice?.origPrice}
          />
        </RadioItemLabel>
      </RadioItem>

      <RadioItem
        id={`${NAME}_${PURCHASE_OPTION_TYPE.SUBSCRIPTION}_${generatedId}`}
        name={NAME}
        value={PURCHASE_OPTION_TYPE.SUBSCRIPTION}
        activeValue={value}
        onChange={onChange}
        className="mt-2">
        <RadioItemLabel
          name={LABEL_MAP[PURCHASE_OPTION_TYPE.SUBSCRIPTION]}
          trial={trial}>
          <Price
            price={subscriptionPrice?.price}
            origPrice={subscriptionPrice?.origPrice}
          />
        </RadioItemLabel>
      </RadioItem>
    </div>
  );
};

export default PurchaseOptionsRadio;
