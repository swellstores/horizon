import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import OrderItemCard from './OrderItemCard';

export default {
  title: 'molecules/OrderItemCard',
  component: OrderItemCard,
  argTypes: {
    title: { control: 'text' },
    link: { control: 'text' },
    image: { control: 'object' },
    options: { control: 'array' },
    quantity: { control: 'number' },
    price: { control: 'text' },
    quantityText: { control: 'text' },
    priceText: { control: 'text' },
  },
} as ComponentMeta<typeof OrderItemCard>;

const Template: ComponentStory<typeof OrderItemCard> = (args) => (
  <OrderItemCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: 'Conditioner',
  href: '/products/conditioner',
  image: {
    height: 206,
    width: 206,
    src: 'images/sample-product.jpg',
    alt: 'Serum',
  },
  options: ['Powder', '35oz'],
  quantity: 1,
  price: '$35.00',
  quantityText: 'Qty',
  priceText: 'Price',
};
