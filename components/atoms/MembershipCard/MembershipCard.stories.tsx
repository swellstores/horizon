import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import MembershipCard from './MembershipCard';

export default {
  title: 'Atoms/MembershipCard',
  component: MembershipCard,
  argTypes: {
    slug: { control: 'text' },
    productId: { control: 'text' },
    purchaseOptions: { control: 'object' },
    image: {
      control: 'object',
    },
    title: { control: 'text' },
    description: { control: 'text' },
    perks: { control: 'array' },
    highlight: { control: 'text' },
    ctaLabel: { control: 'text' },
    viewPerksLabel: { control: 'text' },
    hidePerksLabel: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div className="p-6">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof MembershipCard>;

const Template: ComponentStory<typeof MembershipCard> = (args) => (
  <MembershipCard {...args} />
);

export const Default = Template.bind({});

Default.args = {
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
};

export const Highlight = Template.bind({});

Highlight.args = {
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
};
