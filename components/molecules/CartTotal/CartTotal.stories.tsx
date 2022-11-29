import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import CartTotal from './CartTotal';

export default {
  title: 'molecules/CartTotal',
  component: CartTotal,
  argTypes: {
    total: { control: { type: 'text' } },
  },
} as ComponentMeta<typeof CartTotal>;

const Template: ComponentStory<typeof CartTotal> = (args) => (
  <CartTotal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  total: 10,
};
