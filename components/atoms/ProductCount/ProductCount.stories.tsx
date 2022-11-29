import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import ProductCount from './ProductCount';

export default {
  title: 'Atoms/ProductCount',
  component: ProductCount,
  argTypes: {
    count: { control: 'number' },
  },
} as ComponentMeta<typeof ProductCount>;

const Template: ComponentStory<typeof ProductCount> = (args) => (
  <ProductCount {...args} />
);

export const Default = Template.bind({});
Default.args = {
  count: 12,
};
