import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import PurchaseGroup from './PurchaseGroup';
import { SUBSCRIPTION_STATUS } from 'types/subscription';
import { PURCHASE_TYPE } from 'types/purchase';
import { INTERVAL } from 'types/shared/products';

export default {
  title: 'organisms/PurchaseGroup',
  component: PurchaseGroup,
} as ComponentMeta<typeof PurchaseGroup>;

const Template: ComponentStory<typeof PurchaseGroup> = (args) => (
  <PurchaseGroup {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: 'Purchase Group',
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
};
