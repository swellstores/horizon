import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import PurchaseList from './PurchaseList';
import { PURCHASE_TYPE } from 'types/purchase';
import { INTERVAL } from 'types/shared/products';
import { SUBSCRIPTION_STATUS } from 'types/subscription';

export default {
  title: 'templates/PurchaseList',
  component: PurchaseList,
  argTypes: {
    title: { control: { type: 'text' } },
    type: {
      control: {
        options: Object.values(PURCHASE_TYPE),
        control: { type: 'inline-radio' },
      },
    },
    groupedPurchases: {
      control: { type: 'array' },
    },
  },
} as ComponentMeta<typeof PurchaseList>;

const Template: ComponentStory<typeof PurchaseList> = (args) => (
  <PurchaseList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: 'Subscriptions',
  type: PURCHASE_TYPE.SUBSCRIPTION,
  groupedPurchases: {
    active: {
      title: 'Active',
      purchases: [
        {
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
          orderSchedule: null,
          dateOrderPeriodEnd: null,
          recurringTotal: 36,
          link: '#',
          type: PURCHASE_TYPE.SUBSCRIPTION,
        },
        {
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
        },
      ],
    },
  },
};

export const Empty = Template.bind({});
Empty.args = {
  title: 'Subscriptions',
  type: PURCHASE_TYPE.SUBSCRIPTION,
  groupedPurchases: {},
};
