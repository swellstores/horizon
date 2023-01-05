import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import AddMoreProductsCard from './AddMoreProductsCard';

export default {
  title: 'molecules/AddMoreProductsCard',
  component: AddMoreProductsCard,
  argTypes: {
    empty: { control: 'boolean' },
  },
} as ComponentMeta<typeof AddMoreProductsCard>;

const Template: ComponentStory<typeof AddMoreProductsCard> = (args) => (
  <AddMoreProductsCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  empty: true,
};
