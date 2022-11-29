import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import Price from './Price';

export default {
  title: 'atoms/Price',
  component: Price,
  argTypes: {
    price: { control: { type: 'number' } },
    origPrice: { control: { type: 'number' } },
    billingSchedule: { control: { type: 'object' } },
  },
} as ComponentMeta<typeof Price>;

const Template: ComponentStory<typeof Price> = (args) => <Price {...args} />;

export const Default = Template.bind({});
Default.args = {
  price: 10,
  origPrice: 20,
};

export const Subscription = Template.bind({});
Subscription.args = {
  price: 10,
  origPrice: 20,
  billingSchedule: {
    interval: 'monthly',
    intervalCount: 1,
  },
};
