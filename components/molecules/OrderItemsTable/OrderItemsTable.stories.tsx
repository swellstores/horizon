import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import OrderItemsTable from './OrderItemsTable';

export default {
  title: 'molecules/OrderItemsTable',
  component: OrderItemsTable,
  argTypes: {
    orders: { control: 'array' },
    quantityText: { control: 'text' },
    priceText: { control: 'text' },
    itemsText: { control: 'text' },
  },
} as ComponentMeta<typeof OrderItemsTable>;

const Template: ComponentStory<typeof OrderItemsTable> = (args) => (
  <OrderItemsTable {...args} />
);

export const Default = Template.bind({});
Default.args = {
  orderItems: [
    {
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
    },
    {
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
    },
    {
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
    },
  ],
  quantityText: 'Qty',
  priceText: 'Price',
  itemsText: 'Items',
};
