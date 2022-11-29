import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import CartHeader from './CartHeader';

export default {
  title: 'atoms/CartHeader',
  component: CartHeader,
  argTypes: {
    label: { control: { type: 'text' } },
    itemsQuantity: { control: { type: 'number' } },
  },
} as ComponentMeta<typeof CartHeader>;

const Template: ComponentStory<typeof CartHeader> = (args) => (
  <CartHeader {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: 'Your bag',
  itemsQuantity: 5,
};
export const NoItems = Template.bind({});
NoItems.args = {
  label: 'Your bag',
  itemsQuantity: 0,
};
