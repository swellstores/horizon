import React, { useState } from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import SubscriptionOptions from './SubscriptionOptions';
import type {
  Maybe,
  SwellProductPurchaseOptionsSubscriptionPlan,
} from 'lib/graphql/generated/sdk';

export default {
  title: 'molecules/SubscriptionOptions',
  component: SubscriptionOptions,
  argTypes: {
    value: { control: 'object' },
    onChange: { control: 'func' },
    plans: { control: 'array' },
  },
} as ComponentMeta<typeof SubscriptionOptions>;

const plans = [
  {
    id: '6357bc731cb09400138069e9',
    name: 'Weekly',
    price: 40,
    billingSchedule: { interval: 'weekly', intervalCount: 2, trialDays: 0 },
    orderSchedule: null,
  },
  {
    id: '6357bc731cb09400138069e9',
    name: 'Monthly',
    price: 35,
    billingSchedule: { interval: 'monthly', intervalCount: 1, trialDays: 5 },
    orderSchedule: { interval: 'weekly', intervalCount: 2 },
  },
  {
    id: '6357c0a44287930012c5c75b',
    name: 'Yearly',
    price: 30,
    billingSchedule: { interval: 'yearly', intervalCount: 1, trialDays: 0 },
    orderSchedule: { interval: 'monthly', intervalCount: 1 },
  },
];

const Template: ComponentStory<typeof SubscriptionOptions> = (args) => {
  const [value, setValue] = useState<
    Maybe<SwellProductPurchaseOptionsSubscriptionPlan>
  >(plans[0]);
  return (
    <div className="p-6">
      <SubscriptionOptions {...args} value={value} onChange={setValue} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  plans,
};

export const OnlyOne = Template.bind({});
OnlyOne.args = {
  plans: [plans[0]],
};
