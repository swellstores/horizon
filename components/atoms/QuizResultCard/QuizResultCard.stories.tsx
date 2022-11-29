import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import QuizResultCard from './QuizResultCard';

export default {
  title: 'Atoms/QuizResultCard',
  component: QuizResultCard,
  argTypes: {
    image: {
      control: 'object',
    },
    title: { control: 'text' },
    description: { control: 'text' },
    variantTitle: { control: 'text' },
    price: { control: 'number' },
    href: { control: 'text' },
    hrefCta: { control: 'text' },
    addLabel: { control: 'text' },
    addedLabel: { control: 'text' },
    added: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div className="p-6">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof QuizResultCard>;

const Template: ComponentStory<typeof QuizResultCard> = (args) => (
  <QuizResultCard {...args} />
);

export const Default = Template.bind({});

Default.args = {
  image: {
    src: '/images/foaming-cleanser-thumbnail.jpg',
    alt: 'Foaming cleanser flacon',
    width: 200,
    height: 200,
  },
  title: 'Foaming cleanser',
  description:
    'Use our foaming cleanser to clean away all the pollution and makeup from the day.',
  purchaseOptions: {
    standard: {
      price: 24,
      sale: false,
      salePrice: null,
    },
    subscription: {
      plans: [
        {
          id: '623adce7e75dd3013d4b3215',
          name: 'Monthly',
          price: 19.2,
          billingSchedule: {
            interval: 'monthly',
            intervalCount: 2,
            trialDays: 3,
          },
        },
        {
          id: '624777425dc3440132421f30',
          name: 'Daily',
          price: 15.5,
          billingSchedule: {
            interval: 'daily',
            intervalCount: 1,
          },
        },
      ],
    },
  },
  href: '',
  hrefCta: 'See product details',
  addLabel: 'Add to bag',
  addedLabel: 'Added',
  subscriptionOnlyText: 'This is a subscription product',
  productId: '123455678',
  productOptions: [
    {
      id: '623ad76e6724f9528a9c5b00',
      attributeId: 'size',
      name: 'Size',
      inputType: 'select',
      active: true,
      required: true,
      values: [
        {
          id: '623adce66724f9528a9c5b04',
          name: '120ml',
        },
        {
          id: '624c47ecd38e68cff130abe8',
          name: '360ml',
        },
      ],
    },
    {
      id: '624cb3c5fc6e8fa8467bfe05',
      attributeId: 'type',
      name: 'Type',
      inputType: 'select',
      active: true,
      required: true,
      values: [
        {
          id: '624cb413d18b4c5e76b30649',
          name: 'Hydrating',
        },
        {
          id: '624cb413d18b4c5e76b3064a',
          name: 'Sensitive',
        },
        {
          id: '624cb413d18b4c5e76b3064b',
          name: 'SPF',
        },
      ],
    },
  ],
  productVariants: [
    {
      name: '360ml',
      price: 33,
      prices: null,
      images: null,
      optionValueIds: ['624c47ecd38e68cff130abe8', '624cb413d18b4c5e76b3064b'],
      purchaseOptions: null,
      stockLevel: null,
      currency: 'USD',
    },
    {
      name: '360ml',
      price: 32,
      prices: null,
      images: null,
      optionValueIds: ['624c47ecd38e68cff130abe8', '624cb413d18b4c5e76b3064a'],
      purchaseOptions: null,
      stockLevel: null,
      currency: 'USD',
    },
    {
      name: '360ml, Hydrating',
      price: 32,
      prices: null,
      images: null,
      optionValueIds: ['624c47ecd38e68cff130abe8', '624cb413d18b4c5e76b30649'],
      purchaseOptions: {
        standard: {
          price: 32,
          sale: false,
          salePrice: null,
          prices: null,
        },
      },
      stockLevel: null,
      currency: 'USD',
    },
    {
      name: '120ml, SPF',
      price: 27,
      prices: null,
      images: null,
      optionValueIds: ['623adce66724f9528a9c5b04', '624cb413d18b4c5e76b3064b'],
      purchaseOptions: {
        standard: {
          price: 27,
          sale: true,
          salePrice: 27,
          prices: null,
        },
      },
      stockLevel: null,
      currency: 'USD',
    },
    {
      name: '120ml, Sensitive',
      price: 27,
      prices: null,
      images: null,
      optionValueIds: ['623adce66724f9528a9c5b04', '624cb413d18b4c5e76b3064a'],
      purchaseOptions: null,
      stockLevel: null,
      currency: 'USD',
    },
    {
      name: '120ml, Hydrating',
      price: 28,
      prices: null,
      images: null,
      optionValueIds: ['623adce66724f9528a9c5b04', '624cb413d18b4c5e76b30649'],
      purchaseOptions: {
        standard: {
          price: 28,
          sale: false,
          salePrice: null,
          prices: null,
        },
      },
      stockLevel: null,
      currency: 'USD',
    },
  ],
};
