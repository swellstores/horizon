import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import ProductOptionContainer from './ProductOptionContainer';

export default {
  title: 'molecules/ProductOptionContainer',
  component: ProductOptionContainer,
} as ComponentMeta<typeof ProductOptionContainer>;

const Template: ComponentStory<typeof ProductOptionContainer> = (args) => (
  <ProductOptionContainer {...args} />
);

export const Default = Template.bind({});
Default.args = {
  name: 'Color',
  description: 'Choose a color',
};
