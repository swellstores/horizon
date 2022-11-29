import React from 'react';
import { Listbox } from '@headlessui/react';
import ChevronSmallIcon from 'assets/icons/chevron-down-sm.svg';
import { getPluralizedInterval } from 'lib/utils/subscription';
import type {
  Maybe,
  SwellProductPurchaseOptionsSubscriptionPlan,
  SwellProductPurchaseOptionsSubscriptionPlanBillingSchedule,
} from 'lib/graphql/generated/sdk';
import type { INTERVAL } from 'types/shared/products';

export interface SubscriptionIntervalSelectProps {
  value: Maybe<SwellProductPurchaseOptionsSubscriptionPlan>;
  onChange: (plan: Maybe<SwellProductPurchaseOptionsSubscriptionPlan>) => void;
  plans?: Maybe<Maybe<SwellProductPurchaseOptionsSubscriptionPlan>[]>;
  className?: string;
}

// TODO: i18n & dynamic
const INTERVAL_LABEL = 'Deliver every: ';

const SubscriptionIntervalSelect: React.FC<SubscriptionIntervalSelectProps> = ({
  value,
  onChange,
  plans,
  className,
}) => {
  function formatLabel(
    billingSchedule?: Maybe<SwellProductPurchaseOptionsSubscriptionPlanBillingSchedule>,
  ) {
    if (!billingSchedule?.interval || !billingSchedule?.intervalCount)
      return '';
    const { interval, intervalCount } = billingSchedule;
    return `${intervalCount} ${getPluralizedInterval(
      interval as INTERVAL,
      intervalCount,
    )}`;
  }

  if (!plans?.length) return null;

  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ''}`}>
      <span className="text-sm">{INTERVAL_LABEL}</span>
      {plans.length > 1 ? (
        <Listbox value={value} onChange={onChange}>
          {({ open }) => (
            <div className="relative inline-block text-sm text-primary">
              <Listbox.Button
                className={`inline-flex items-center gap-2 rounded-lg border border-dividers px-4 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  open ? 'rounded-b-[0] bg-background-primary' : ''
                }`}>
                {formatLabel(value?.billingSchedule)}
                <ChevronSmallIcon
                  className={`w-[12px] transform transition ${
                    open ? '-rotate-180' : 'rotate-0'
                  }`}
                />
              </Listbox.Button>
              <Listbox.Options className="absolute flex w-full flex-col gap-2 rounded-b-lg border-x border-b border-dividers bg-background-primary px-2 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                {plans.map((plan) => (
                  <Listbox.Option key={plan?.id} value={plan}>
                    {({ active }) => (
                      <span
                        className={`block cursor-pointer rounded-lg px-2 py-1 ${
                          active ? 'bg-background-secondary' : ''
                        }`}>
                        {formatLabel(plan?.billingSchedule)}
                      </span>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          )}
        </Listbox>
      ) : (
        <span className="text-sm text-primary">
          {formatLabel(value?.billingSchedule)}
        </span>
      )}
    </span>
  );
};

export default SubscriptionIntervalSelect;
