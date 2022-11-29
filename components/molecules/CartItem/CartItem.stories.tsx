import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import CartItem from './CartItem';

export default {
  title: 'molecules/CartItem',
  component: CartItem,
  argTypes: {
    id: { table: { disable: true } },
  },
} as ComponentMeta<typeof CartItem>;

const Template: ComponentStory<typeof CartItem> = (args) => (
  <CartItem {...args} />
);

export const Default = Template.bind({});
Default.args = {
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
};
