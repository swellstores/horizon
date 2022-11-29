import React, { useState, useCallback } from 'react';
import { Listbox } from '@headlessui/react';
import ChevronIcon from 'assets/icons/chevron-down.svg';
import SyncIcon from 'assets/icons/sync.svg';
import type {
  Maybe,
  SwellProductPurchaseOptionsSubscriptionPlan,
  SwellProductPurchaseOptionsSubscriptionPlanBillingSchedule,
} from 'lib/graphql/generated/sdk';
import {
  PLURAL_MAP,
  SINGULAR_MAP,
  SHORTENED_MAP,
} from 'lib/utils/subscription';
import type { INTERVAL } from 'types/shared/products';

interface PlanSelectProps {
  value?: Maybe<SwellProductPurchaseOptionsSubscriptionPlan>;
  onChange?: React.Dispatch<
    React.SetStateAction<Maybe<SwellProductPurchaseOptionsSubscriptionPlan>>
  >;
  quantity?: number;
  plans: Maybe<SwellProductPurchaseOptionsSubscriptionPlan>[];
}

const PlanSelect: React.FC<PlanSelectProps> = ({
  value,
  onChange,
  quantity = 1,
  plans,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<
    Maybe<SwellProductPurchaseOptionsSubscriptionPlan>
  >(value ?? plans[0]);

  function filterSingular(number: number) {
    return number > 1 ? `${number}` : '';
  }

  function getPluralizedInterval(interval: INTERVAL, number: number) {
    return number > 1 ? PLURAL_MAP[interval] : SINGULAR_MAP[interval];
  }

  function getDisplayInterval(
    quantity: number,
    billingSchedule?: Maybe<SwellProductPurchaseOptionsSubscriptionPlanBillingSchedule>,
  ) {
    // TODO: Provide a better fallback when there's missing data.
    if (!billingSchedule?.interval || !billingSchedule?.intervalCount)
      return '';
    const { interval, intervalCount } = billingSchedule;
    // TODO: i18n
    return `${filterSingular(quantity)} every ${filterSingular(
      intervalCount,
    )} ${getPluralizedInterval(interval as INTERVAL, intervalCount)}`;
  }

  function formatPrice(price?: Maybe<number>, interval?: Maybe<INTERVAL>) {
    // TODO: Provide a better fallback.
    if (!price || !interval) return '';
    return `$${price.toFixed(2)}/${SHORTENED_MAP[interval]}`;
  }

  const planChangeHandler = useCallback(
    (plan: SwellProductPurchaseOptionsSubscriptionPlan) => {
      onChange?.(plan);
      setSelectedPlan(plan);
    },
    [onChange],
  );

  return (
    <Listbox value={value ?? selectedPlan} onChange={planChangeHandler}>
      {({ open }) => (
        <>
          <Listbox.Button
            className={`flex w-full items-center justify-between border border-primary px-6 py-4 text-sm text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 ${
              open ? 'rounded-t-lg border-b-transparent' : 'rounded-lg'
            }`}>
            <span className="flex items-center gap-2">
              <SyncIcon className="w-6" />
              <span>
                {getDisplayInterval(quantity, selectedPlan?.billingSchedule)}
              </span>
              {/* <span className="font-semibold uppercase">{discount}</span> */}
            </span>

            <span className="flex items-center gap-[10px]">
              <span className="font-semibold">
                {formatPrice(
                  selectedPlan?.price,
                  selectedPlan?.billingSchedule?.interval as
                    | Maybe<INTERVAL>
                    | undefined,
                )}
              </span>
              <ChevronIcon
                className={`h-[10px] w-5 transform transition ${
                  open ? 'rotate-180' : 'rotate-0'
                }`}
              />
            </span>
          </Listbox.Button>

          <Listbox.Options className="w-full rounded-b-lg border border-t-0 border-primary bg-background-primary px-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1">
            <hr className="border-t border-dividers" />
            <div className="pt-3 pb-4">
              {plans.map((plan) => (
                <Listbox.Option key={plan?.id} value={plan}>
                  {({ active }) => (
                    <div
                      className={`flex cursor-pointer justify-between rounded-lg px-2 py-3 text-sm text-primary ${
                        active ? 'bg-background-secondary' : ''
                      }`}>
                      <span className="flex gap-2">
                        <SyncIcon className="w-6" />
                        <span>
                          {getDisplayInterval(quantity, plan?.billingSchedule)}
                        </span>
                        {/* discount here */}
                      </span>
                      <span className="font-semibold">
                        {formatPrice(
                          plan?.price,
                          plan?.billingSchedule?.interval as
                            | Maybe<INTERVAL>
                            | undefined,
                        )}
                      </span>
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </div>
          </Listbox.Options>
        </>
      )}
    </Listbox>
  );
};

export default PlanSelect;
