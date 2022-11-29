import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import UpSell from './UpSell';

export default {
  title: 'molecules/UpSell',
  component: UpSell,
  argTypes: {
    items: { control: { type: 'array' } },
    className: { control: 'text', table: { disable: true } },
  },
} as ComponentMeta<typeof UpSell>;

const Template: ComponentStory<typeof UpSell> = (args) => <UpSell {...args} />;

export const Default = Template.bind({});
Default.args = {
  items: [
    {
      id: '1',
      image: {
        src: '/images/product-preview-card-1.webp',
        alt: 'Vitamin D',
        width: 268,
        height: 387,
      },
      title: 'Vitamin D',
      description: 'Supplement for a healthy life.',
      price: 28,
      href: 'vitamin-d',
      productOptions: [],
      productVariants: [],
      purchaseOptions: {
        standard: {
          price: 28,
          sale: false,
          salePrice: null,
        },
        subscription: {
          active: null,
        },
      },
      hasQuickAdd: true,
    },
    {
      id: '2',
      image: {
        src: '/images/product-preview-card-2.webp',
        alt: 'Moisturizer SPF 15',
        width: 268,
        height: 387,
      },
      title: 'Moisturizer SPF 15',
      description: 'Daily boost of hydration.',
      price: 45,
      href: 'spf-15',
      productOptions: [
        {
          id: '623ac0f1a8b2ba242cc95abe',
          attributeId: 'size',
          name: 'Size',
          inputType: 'select',
          active: true,
          required: true,
          values: [
            {
              id: '623ac0fca8b2ba242cc95abf',
              name: '30 ml / 1.0 fl. oz.',
            },
          ],
        },
      ],
      productVariants: [
        {
          name: '30 ml / 1.0 fl. oz.',
          price: 28,
          prices: null,
          images: null,
          optionValueIds: ['623ac0fca8b2ba242cc95abf'],
          purchaseOptions: null,
          stockLevel: null,
          currency: 'USD',
        },
      ],
      purchaseOptions: {
        standard: {
          price: 28,
          sale: false,
          salePrice: null,
        },
        subscription: {
          active: null,
        },
      },
      hasQuickAdd: true,
    },
    {
      id: '3',
      image: {
        src: '/images/product-preview-card-3.webp',
        alt: 'Liposomal serum',
        width: 268,
        height: 387,
      },
      title: 'Liposomal serum',
      description: 'Depigmenting acid booster.',
      price: 55,
      href: 'liposomal-serum',
      productOptions: [
        {
          id: '623ac0f1a8b2ba242cc95abe',
          attributeId: 'size',
          name: 'Size',
          inputType: 'select',
          active: true,
          required: true,
          values: [
            {
              id: '623ac0fca8b2ba242cc95abf',
              name: '30 ml / 1.0 fl. oz.',
            },
          ],
        },
      ],
      productVariants: [
        {
          name: '30 ml / 1.0 fl. oz.',
          price: 28,
          prices: null,
          images: null,
          optionValueIds: ['623ac0fca8b2ba242cc95abf'],
          purchaseOptions: null,
          stockLevel: null,
          currency: 'USD',
        },
      ],
      purchaseOptions: {
        standard: {
          price: 28,
          sale: false,
          salePrice: null,
        },
        subscription: {
          active: null,
        },
      },
      hasQuickAdd: true,
    },
    {
      id: '4',
      image: {
        src: '/images/product-preview-card-4.webp',
        alt: 'Foaming cleanser',
        width: 268,
        height: 387,
      },
      title: 'Foaming cleanser',
      description: 'Depigmenting acid booster.',
      price: 55,
      href: 'foaming-cleanser',
      productOptions: [
        {
          id: '623ac0f1a8b2ba242cc95abe',
          attributeId: 'size',
          name: 'Size',
          inputType: 'select',
          active: true,
          required: true,
          values: [
            {
              id: '623ac0fca8b2ba242cc95abf',
              name: '30 ml / 1.0 fl. oz.',
            },
          ],
        },
      ],
      productVariants: [
        {
          name: '30 ml / 1.0 fl. oz.',
          price: 28,
          prices: null,
          images: null,
          optionValueIds: ['623ac0fca8b2ba242cc95abf'],
          purchaseOptions: null,
          stockLevel: null,
          currency: 'USD',
        },
      ],
      purchaseOptions: {
        standard: {
          price: 28,
          sale: false,
          salePrice: null,
        },
        subscription: {
          active: null,
        },
      },
      hasQuickAdd: true,
    },
  ],
};
