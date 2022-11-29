import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Tabs from 'components/atoms/Tabs';
import PlanSelect from 'components/atoms/PlanSelect';
import type {
  Maybe,
  SwellProductPurchaseOptions,
  SwellProductPurchaseOptionsSubscriptionPlan,
} from 'lib/graphql/generated/sdk';
import {
  PURCHASE_OPTION_TYPE,
  StandardPurchaseOption,
  PurchaseOption,
} from 'types/shared/products';

// maybe use SwellCartItemPurchaseOptionInput
export interface PurchaseOptionsProps {
  options: SwellProductPurchaseOptions;
  quantity?: number;
  value?: PurchaseOption;
  onChange?: (value: PurchaseOption) => void;
}

const LABEL_MAP = {
  [PURCHASE_OPTION_TYPE.STANDARD]: 'Standard',
  [PURCHASE_OPTION_TYPE.SUBSCRIPTION]: 'Subscription',
};

const PurchaseOptions: React.FC<PurchaseOptionsProps> = ({
  options,
  quantity,
  value,
  onChange,
}) => {
  const [selectedOption, setSelectedOption] = useState<PURCHASE_OPTION_TYPE>(
    value?.type || options.standard
      ? PURCHASE_OPTION_TYPE.STANDARD
      : PURCHASE_OPTION_TYPE.SUBSCRIPTION,
  );

  const [selectedSubscription, setSelectedSubscription] = useState<
    Maybe<SwellProductPurchaseOptionsSubscriptionPlan>
  >(options.subscription?.plans?.[0] ?? null);

  const selectedCombinedOption = useMemo(() => {
    if (selectedOption === PURCHASE_OPTION_TYPE.STANDARD) {
      return {
        type: PURCHASE_OPTION_TYPE.STANDARD,
      };
    }

    return {
      type: PURCHASE_OPTION_TYPE.SUBSCRIPTION,
      planId: selectedSubscription?.id,
    };
  }, [selectedOption, selectedSubscription]);

  useCallback(() => {
    if (selectedOption === PURCHASE_OPTION_TYPE.STANDARD) {
      onChange?.({
        type: PURCHASE_OPTION_TYPE.STANDARD,
      });
    } else {
      onChange?.({
        type: PURCHASE_OPTION_TYPE.SUBSCRIPTION,
        planId: selectedSubscription?.id ?? '',
      });
    }
  }, [onChange, selectedOption, selectedSubscription?.id]);

  useEffect(() => {
    if (onChange) {
      onChange(selectedCombinedOption as StandardPurchaseOption);
    }
  }, [selectedCombinedOption, onChange]);

  const realSelectedOption = useMemo(() => {
    if (value?.type) return value.type;
    return selectedOption;
  }, [selectedOption, value?.type]);

  const realSelectedSubscription = useMemo(() => {
    if (value?.type !== PURCHASE_OPTION_TYPE.SUBSCRIPTION) return null;

    if (value?.planId) {
      return options.subscription?.plans?.find(
        (plan) => plan?.id === value?.planId,
      );
    }
    return selectedSubscription;
  }, [options.subscription?.plans, selectedSubscription, value]);

  const hasBothOptions = options.standard && options.subscription;

  function onTabChange(option: string) {
    setSelectedOption(option as PURCHASE_OPTION_TYPE);
  }

  return (
    <div>
      {hasBothOptions ? (
        <Tabs
          tabs={[
            {
              label: LABEL_MAP[PURCHASE_OPTION_TYPE.STANDARD],
              value: PURCHASE_OPTION_TYPE.STANDARD,
              content: <></>,
            },
            {
              label: LABEL_MAP[PURCHASE_OPTION_TYPE.SUBSCRIPTION],
              value: PURCHASE_OPTION_TYPE.SUBSCRIPTION,
              content: (
                <PlanSelect
                  plans={options?.subscription?.plans || []}
                  quantity={quantity}
                  value={realSelectedSubscription}
                  onChange={setSelectedSubscription}
                />
              ),
            },
          ]}
          value={realSelectedOption}
          onChange={onTabChange}
        />
      ) : options.subscription ? (
        <PlanSelect
          plans={options?.subscription?.plans || []}
          quantity={quantity}
          value={realSelectedSubscription}
          onChange={setSelectedSubscription}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default PurchaseOptions;
