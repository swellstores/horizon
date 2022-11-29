import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import OrderSummary from './OrderSummary';

export default {
  title: 'molecules/OrderSummary',
  component: OrderSummary,
  argTypes: {
    caption: { control: 'text' },
    rows: { control: 'array' },
    totalText: { control: 'text' },
    total: { control: 'text' },
    subscriptionSchedule: { control: 'object' },
    nextBillingDate: { control: 'date' },
    nextOrderDate: { control: 'date' },
  },
} as ComponentMeta<typeof OrderSummary>;

const Template: ComponentStory<typeof OrderSummary> = (args) => (
  <OrderSummary {...args} />
);

export const Default = Template.bind({});
Default.args = {
  caption: 'Summary',
  rows: [
    {
      label: 'Subtotal',
      value: '$500.00',
    },
    {
      label: 'Discounts & Credits',
      value: '-$47.00',
    },
    {
      label: 'Shipping',
      value: '$7.00',
    },
    {
      label: 'VAT',
      value: '$36.00',
    },
    {
      label: 'Refunded',
      value: '-$600.00',
      bold: true,
    },
  ],
  totalRow: {
    label: 'Total',
    value: '$50.00',
  },
};

export const Subscription = Template.bind({});
Subscription.args = {
  caption: 'Summary',
  rows: [
    {
      label: 'Subtotal',
      value: '$500.00',
    },
    {
      label: 'Discounts & Credits',
      value: '-$47.00',
    },
    {
      label: 'Shipping',
      value: '$7.00',
    },
    {
      label: 'VAT',
      value: '$36.00',
    },
    {
      label: 'Refunded',
      value: '-$600.00',
      bold: true,
    },
  ],
  totalRow: {
    label: 'Total',
    value: '$50.00',
  },
  subscriptionSchedule: {
    billingSchedule: {
      interval: 'monthly',
      intervalCount: 3,
    },
    orderSchedule: {
      interval: 'monthly',
      intervalCount: 1,
    },
  },
  nextBillingDate: new Date(),
  nextOrderDate: new Date(),
  billingLimitText: 'Limited to 7 renewals',
  orderLimitText: 'Limited to 23 shipments',
};
