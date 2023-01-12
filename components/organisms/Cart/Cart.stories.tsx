import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import Cart from './Cart';

export default {
  title: 'organisms/Cart',
  component: Cart,
  argTypes: {
    empty: { control: 'boolean' },
    items: { control: { type: 'array' } },
  },
} as ComponentMeta<typeof Cart>;

const Template: ComponentStory<typeof Cart> = (args) => <Cart {...args} />;

export const Default = Template.bind({});
Default.args = {
  visible: true,
  empty: false,
  total: 80,
  items: [
    {
      id: '1',
      title: 'Vitamin D',
      href: '/products/vitamin-d',
      price: 10,
      priceTotal: 50,
      image: {
        src: '/images/product-preview-card-1.webp',
        width: 1072,
        height: 1548,
        alt: 'Vitamin D',
      },
      quantity: 5,
      minQuantity: 0,
      purchaseOption: null,
      productId: '',
      productOptions: [],
    },
    {
      id: '2',
      title: 'Vitamin D',
      href: '/products/vitamin-d',
      price: 20,
      priceTotal: 100,
      image: {
        src: '/images/product-preview-card-1.webp',
        width: 1072,
        height: 1548,
        alt: 'Vitamin D',
      },
      quantity: 5,
      minQuantity: 0,
      purchaseOption: null,
      productId: '',
      productOptions: [],
    },
    {
      id: '3',
      title: 'Vitamin D',
      href: '/products/vitamin-d',
      price: 10,
      priceTotal: 100,
      image: {
        src: '/images/product-preview-card-1.webp',
        width: 1072,
        height: 1548,
        alt: 'Vitamin D',
      },
      quantity: 10,
      minQuantity: 0,
      purchaseOption: null,
      productId: '',
      productOptions: [],
    },
    {
      id: '4',
      title: 'Vitamin D',
      href: '/products/vitamin-d',
      price: 20,
      priceTotal: 100,
      image: {
        src: '/images/product-preview-card-1.webp',
        width: 1072,
        height: 1548,
        alt: 'Vitamin D',
      },
      quantity: 5,
      minQuantity: 0,
      purchaseOption: null,
      productId: '',
      productOptions: [],
    },
    {
      id: '5',
      title: 'Vitamin D',
      href: '/products/vitamin-d',
      price: 10,
      priceTotal: 100,
      image: {
        src: '/images/product-preview-card-1.webp',
        width: 1072,
        height: 1548,
        alt: 'Vitamin D',
      },
      quantity: 10,
      minQuantity: 0,
      purchaseOption: null,
      productId: '',
      productOptions: [],
    },
    {
      id: '6',
      title: 'Vitamin D',
      href: '/products/vitamin-d',
      price: 20,
      priceTotal: 100,
      image: {
        src: '/images/product-preview-card-1.webp',
        width: 1072,
        height: 1548,
        alt: 'Vitamin D',
      },
      quantity: 5,
      minQuantity: 0,
      purchaseOption: null,
      productId: '',
      productOptions: [],
    },
  ],
};
