import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import ShoppingBag from './ShoppingBag';

export default {
  title: 'atoms/ShoppingBag',
  component: ShoppingBag,
  argTypes: {
    itemQuantity: { control: { type: 'number' } },
  },
} as ComponentMeta<typeof ShoppingBag>;

const Template: ComponentStory<typeof ShoppingBag> = (args) => (
  <ShoppingBag {...args} />
);

export const Default = Template.bind({});
Default.args = {
  itemQuantity: 1,
};

export const NoQuantity = Template.bind({});
NoQuantity.args = {
  itemQuantity: 0,
};

export const ThousandPlus = Template.bind({});
ThousandPlus.args = {
  itemQuantity: 1000,
};
