import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import AddMoreProductsCard from './AddMoreProductsCard';

export default {
  title: 'molecules/AddMoreProductsCard',
  component: AddMoreProductsCard,
  argTypes: {
    title: { control: { type: 'text' } },
    subtitle: { control: { type: 'text' } },
    href: { control: { type: 'text' } },
  },
} as ComponentMeta<typeof AddMoreProductsCard>;

const Template: ComponentStory<typeof AddMoreProductsCard> = (args) => (
  <AddMoreProductsCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: 'Add more products',
  subtitle: 'You’re $6.00 away from free shipping',
  href: '/products',
};
