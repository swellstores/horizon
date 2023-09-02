import React from 'react';
import { Listbox } from '@headlessui/react';
import SyncIcon from 'assets/icons/sync.svg';
import ChevronIcon from 'assets/icons/chevron-down.svg';
import ScheduleLabel from 'components/atoms/ScheduleLabel';
import type {
  Maybe,
  SwellProductPurchaseOptionsSubscriptionPlan,
} from 'lib/graphql/generated/sdk';
import useI18n from 'hooks/useI18n';

export interface SubscriptionOptionsProps {
  value: Maybe<SwellProductPurchaseOptionsSubscriptionPlan>;
  onChange: (plan: Maybe<SwellProductPurchaseOptionsSubscriptionPlan>) => void;
  plans?: Maybe<Maybe<SwellProductPurchaseOptionsSubscriptionPlan>[]>;
  className?: string;
}

const SubscriptionOptions: React.FC<SubscriptionOptionsProps> = ({
  value,
  onChange,
  plans,
  className,
}) => {
  const i18n = useI18n();
  if (!plans?.length) return null;

  const title = i18n('products.subscription.options');
  const billingMessage = i18n('products.subscription.billing_message');
  const orderMessage = i18n('products.subscription.order_message');

  return (
    <div className={className ?? ''}>
      <h3 className="font-headings text-sm text-primary">{title}</h3>
      <Listbox value={value} onChange={onChange}>
        {({ open }) => (
          <div className="relative mt-2 text-primary">
            <Listbox.Button
              className={`flex w-full items-center justify-between rounded-lg border border-dividers px-6 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                open ? 'rounded-b-[0] bg-background-primary' : ''
              }`}>
              <span className="flex gap-2">
                <SyncIcon className="h-6 w-6 text-primary" />
                <span className="flex flex-col items-start justify-center">
                  <ScheduleLabel
                    type="billing"
                    base={billingMessage}
                    schedule={value?.billingSchedule}
                    textClasses="text-primary text-sm"
                  />
                  <ScheduleLabel
                    type="order"
                    base={orderMessage}
                    schedule={value?.orderSchedule}
                    textClasses="text-body text-xs"
                  />
                </span>
              </span>
              <ChevronIcon
                className={`h-[10px] w-5 transform text-primary transition duration-200 ease-out ${
                  open ? '-rotate-180' : 'rotate-0'
                }`}
              />
            </Listbox.Button>
            <Listbox.Options className="absolute z-20 flex w-full flex-col gap-2 rounded-b-lg border-x border-b border-dividers bg-background-primary px-2 py-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
              {plans.map((plan) => (
                <Listbox.Option key={plan?.id} value={plan}>
                  {({ active }) => (
                    <div
                      className={`flex cursor-pointer gap-2 rounded-lg px-4 py-3 text-primary ${
                        active ? 'bg-background-secondary text-body' : ''
                      }`}>
                      <SyncIcon className="h-6 w-6" />
                      <span className="flex flex-col items-start justify-center">
                        <ScheduleLabel
                          type="billing"
                          base={billingMessage}
                          schedule={plan?.billingSchedule}
                          textClasses="text-sm"
                        />
                        <ScheduleLabel
                          type="order"
                          base={orderMessage}
                          schedule={plan?.orderSchedule}
                          textClasses="text-xs"
                        />
                      </span>
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        )}
      </Listbox>
    </div>
  );
};

export default SubscriptionOptions;
