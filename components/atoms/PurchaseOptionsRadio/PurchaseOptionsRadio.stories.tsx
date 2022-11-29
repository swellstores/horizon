import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import PurchaseOptionsRadio from './PurchaseOptionsRadio';
import { PURCHASE_OPTION_TYPE } from 'types/shared/products';

export default {
  title: 'atoms/PurchaseOptionsRadio',
  component: PurchaseOptionsRadio,
  argTypes: {
    value: {
      options: Object.values(PURCHASE_OPTION_TYPE),
      control: { type: 'inline-radio' },
    },
    onChange: { control: { type: 'func' } },
    standardPrice: { control: { type: 'object' } },
    subscriptionPrice: { control: { type: 'object' } },
  },
} as ComponentMeta<typeof PurchaseOptionsRadio>;

const Template: ComponentStory<typeof PurchaseOptionsRadio> = (args) => {
  const [value, setValue] = React.useState<PURCHASE_OPTION_TYPE>(
    PURCHASE_OPTION_TYPE.STANDARD,
  );
  return <PurchaseOptionsRadio {...args} value={value} onChange={setValue} />;
};

export const Default = Template.bind({});
Default.args = {
  standardPrice: { price: 27.95, origPrice: null },
  subscriptionPrice: {
    id: '6218af61b2ff800132e212c7',
    name: 'Monthly',
    price: 25.45,
    billingSchedule: { interval: 'monthly', intervalCount: 2, trialDays: null },
  },
};

export const WithTrial = Template.bind({});
WithTrial.args = {
  standardPrice: { price: 27.95, origPrice: null },
  subscriptionPrice: {
    id: '6218af61b2ff800132e212c7',
    name: 'Monthly',
    price: 0,
    billingSchedule: { interval: 'monthly', intervalCount: 2, trialDays: 3 },
    origPrice: 27.95,
  },
};
