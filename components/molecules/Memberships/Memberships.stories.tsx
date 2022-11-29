import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import Memberships from './Memberships';

export default {
  title: 'Molecules/SubscriptionComparison',
  component: Memberships,
  argTypes: {
    title: { control: 'text' },
    memberships: { control: 'array' },
  },
} as ComponentMeta<typeof Memberships>;

const Template: ComponentStory<typeof Memberships> = (args) => (
  <Memberships {...args} />
);

export const Default = Template.bind({});

Default.args = {
  title: 'Choose the way that best suits you',
  memberships: [
    {
      id: '1',
      slug: 'vip-membership',
      productId: '624e0ba2c752bf0132e9be71',
      purchaseOptions: {
        standard: null,
        subscription: {
          plans: [
            {
              id: '624e0ba2c752bf0132e9be75',
              name: 'Yearly',
              price: 99,
              billingSchedule: {
                interval: 'yearly',
                intervalCount: 1,
                trialDays: 30,
              },
            },
          ],
        },
      },
      image: {
        src: '/images/plant-base.svg',
        alt: 'Illustration of a plant',
        width: 80,
        height: 80,
      },
      title: 'VIP membership',
      description: 'Trial for 30 days',
      perks: [
        'Trial for 30 days',
        'Discounts on delivery',
        'Samples with every purchase',
      ],
      highlight: '',
      ctaLabel: 'Get now',
      viewPerksLabel: 'View details',
      hidePerksLabel: 'Hide details',
    },
    {
      id: '2',
      slug: 'premium-membership',
      productId: '624e0be1b79e6e013dd55a87',
      purchaseOptions: {
        standard: null,
        subscription: {
          plans: [
            {
              id: '624e0be1b79e6e013dd55a8b',
              name: 'Yearly',
              price: 199,
              billingSchedule: {
                interval: 'yearly',
                intervalCount: 1,
                trialDays: 30,
              },
            },
          ],
        },
      },
      image: {
        src: '/images/leaf.svg',
        alt: 'Illustration of a branches with leaves',
        width: 80,
        height: 80,
      },
      title: 'Premium membership',
      description: 'Full perks & customer loyalty',
      perks: [
        'Trial for 30 days',
        'Discounts on delivery',
        'Gives a magazine',
        'Try products before launch',
        'Monthly mystery box',
      ],
      highlight: '',
      ctaLabel: 'Get now',
      viewPerksLabel: 'View details',
      hidePerksLabel: 'Hide details',
    },
  ],
};

export const Highlight = Template.bind({});

Highlight.args = {
  title: 'Choose the way that best suits you',
  memberships: [
    {
      id: '1',
      slug: 'vip-membership',
      productId: '624e0ba2c752bf0132e9be71',
      purchaseOptions: {
        standard: null,
        subscription: {
          plans: [
            {
              id: '624e0ba2c752bf0132e9be75',
              name: 'Yearly',
              price: 99,
              billingSchedule: {
                interval: 'yearly',
                intervalCount: 1,
                trialDays: 30,
              },
            },
          ],
        },
      },
      image: {
        src: '/images/plant-base.svg',
        alt: 'Illustration of a plant',
        width: 80,
        height: 80,
      },
      title: 'VIP membership',
      description: 'Trial for 30 days',
      perks: [
        'Trial for 30 days',
        'Discounts on delivery',
        'Samples with every purchase',
      ],
      highlight: '',
      ctaLabel: 'Get now',
      viewPerksLabel: 'View details',
      hidePerksLabel: 'Hide details',
    },
    {
      id: '2',
      slug: 'premium-membership',
      productId: '624e0be1b79e6e013dd55a87',
      purchaseOptions: {
        standard: null,
        subscription: {
          plans: [
            {
              id: '624e0be1b79e6e013dd55a8b',
              name: 'Yearly',
              price: 199,
              billingSchedule: {
                interval: 'yearly',
                intervalCount: 1,
                trialDays: 30,
              },
            },
          ],
        },
      },
      image: {
        src: '/images/leaf.svg',
        alt: 'Illustration of a branches with leaves',
        width: 80,
        height: 80,
      },
      title: 'Premium membership',
      description: 'Full perks & customer loyalty',
      perks: [
        'Trial for 30 days',
        'Discounts on delivery',
        'Gives a magazine',
        'Try products before launch',
        'Monthly mystery box',
      ],
      highlight: 'Most popular',
      ctaLabel: 'Get now',
      viewPerksLabel: 'View details',
      hidePerksLabel: 'Hide details',
    },
  ],
};
