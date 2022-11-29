import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import PurchaseCard from './PurchaseCard';
import { SUBSCRIPTION_STATUS } from 'types/subscription';
import { PURCHASE_TYPE } from 'types/purchase';
import { INTERVAL } from 'types/shared/products';

export default {
  title: 'molecules/PurchaseCard',
  component: PurchaseCard,
} as ComponentMeta<typeof PurchaseCard>;

const Template: ComponentStory<typeof PurchaseCard> = (args) => (
  <PurchaseCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: 'Foaming Cleanser Bundle',
  productsImages: [
    {
      height: 206,
      width: 206,
      src: 'images/placeholder/sample-product.jpg',
      alt: 'Serum',
    },
    {
      height: 206,
      width: 206,
      src: 'images/placeholder/sample-product.jpg',
      alt: 'Serum',
    },
    {
      height: 206,
      width: 206,
      src: 'images/placeholder/sample-product.jpg',
      alt: 'Serum',
    },
  ],
  status: SUBSCRIPTION_STATUS.ACTIVE,
  date: new Date(),
  billingSchedule: {
    interval: INTERVAL.Monthly,
    intervalCount: 1,
  },
  recurringTotal: 36,
  link: '#',
  type: PURCHASE_TYPE.SUBSCRIPTION,
};

export const SplitBillingFulfilment = Template.bind({});
SplitBillingFulfilment.args = {
  title: 'Foaming Cleanser Bundle',
  productsImages: [
    {
      height: 206,
      width: 206,
      src: 'images/placeholder/sample-product.jpg',
      alt: 'Serum',
    },
    {
      height: 206,
      width: 206,
      src: 'images/placeholder/sample-product.jpg',
      alt: 'Serum',
    },
    {
      height: 206,
      width: 206,
      src: 'images/placeholder/sample-product.jpg',
      alt: 'Serum',
    },
  ],
  status: SUBSCRIPTION_STATUS.ACTIVE,
  date: new Date(),
  billingSchedule: {
    interval: INTERVAL.Monthly,
    intervalCount: 1,
  },
  orderSchedule: {
    interval: INTERVAL.Weekly,
    intervalCount: 2,
  },
  dateOrderPeriodEnd: new Date(),
  recurringTotal: 36,
  link: '#',
  type: PURCHASE_TYPE.SUBSCRIPTION,
};
