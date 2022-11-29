import React, { useState } from 'react';
import { INTERVAL } from 'types/shared/products';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import type {
  Maybe,
  SwellProductPurchaseOptionsSubscriptionPlan,
} from 'lib/graphql/generated/sdk';

import SubscriptionIntervalSelect from './SubscriptionIntervalSelect';

export default {
  title: 'atoms/SubscriptionIntervalSelect',
  component: SubscriptionIntervalSelect,
  argTypes: {
    value: { control: 'object' },
    onChange: { control: 'func' },
    plans: { control: 'array' },
  },
} as ComponentMeta<typeof SubscriptionIntervalSelect>;

const plans = [
  {
    id: '623d05bf19dea3013248a16b',
    price: 24,
    billingSchedule: {
      interval: INTERVAL.Monthly,
      intervalCount: 1,
    },
  },
  {
    id: '623d05bf19dea3013248a16c',
    price: 22,
    billingSchedule: {
      interval: INTERVAL.Weekly,
      intervalCount: 2,
    },
  },
];

const Template: ComponentStory<typeof SubscriptionIntervalSelect> = (args) => {
  const [value, setValue] = useState<
    Maybe<SwellProductPurchaseOptionsSubscriptionPlan>
  >(plans[0]);
  return (
    <SubscriptionIntervalSelect {...args} value={value} onChange={setValue} />
  );
};

export const Default = Template.bind({});
Default.args = {
  plans,
};

export const OneOption = Template.bind({});
OneOption.args = {
  plans: [plans[0]],
};
