import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import Cart from './Cart';

export default {
  title: 'organisms/Cart',
  component: Cart,
  argTypes: {
    headerLabel: { control: { type: 'text' } },
    items: { control: { type: 'array' } },
  },
} as ComponentMeta<typeof Cart>;

const Template: ComponentStory<typeof Cart> = (args) => <Cart {...args} />;

export const Default = Template.bind({});
Default.args = {
  visible: true,
  headerLabel: 'Your bag',
  cartEmptyMessage: 'Your bag is empty.',
  addMoreProducts: {
    title: 'Add more products',
    subtitle: 'You’re $6.00 away from free shipping',
    href: '/products',
  },
  total: 80,
  items: [
    {
      id: '1',
      title: 'Vitamin D',
      href: '/products/vitamin-d',
      price: 10,
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
