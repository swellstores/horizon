import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import PurchaseOptions from './PurchaseOptions';

export default {
  title: 'molecules/PurchaseOptions',
  component: PurchaseOptions,
  argTypes: {
    options: { control: { type: 'object' } },
  },
} as ComponentMeta<typeof PurchaseOptions>;

const Template: ComponentStory<typeof PurchaseOptions> = (args) => (
  <PurchaseOptions {...args} />
);

export const Default = Template.bind({});
Default.args = {
  options: {
    standard: {
      price: 28,
      sale: false,
      salePrice: null,
    },
    subscription: {
      plans: [
        {
          id: '623d05bf19dea3013248a16b',
          price: 24,
          billingSchedule: {
            interval: 'monthly',
            intervalCount: 1,
          },
        },
        {
          id: '623d05bf19dea3013248a16c',
          price: 22,
          billingSchedule: {
            interval: 'weekly',
            intervalCount: 2,
          },
        },
      ],
    },
  },
};

export const Subscription = Template.bind({});
Subscription.args = {
  options: {
    subscription: {
      plans: [
        {
          id: '623d05bf19dea3013248a16b',
          price: 24,
          billingSchedule: {
            interval: 'monthly',
            intervalCount: 1,
          },
        },
        {
          id: '623d05bf19dea3013248a16c',
          price: 22,
          billingSchedule: {
            interval: 'weekly',
            intervalCount: 2,
          },
        },
      ],
    },
  },
};

export const Standard = Template.bind({});
Standard.args = {
  options: {
    standard: {
      price: 28,
      sale: false,
      salePrice: null,
    },
  },
};
