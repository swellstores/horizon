import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import ProductBenefit from './ProductBenefit';

export default {
  title: 'atoms/ProductBenefit',
  component: ProductBenefit,
  argTypes: {
    icon: { control: { type: 'text' } },
    label: { control: { type: 'text' } },
  },
} as ComponentMeta<typeof ProductBenefit>;

const Template: ComponentStory<typeof ProductBenefit> = (args) => (
  <ProductBenefit {...args} />
);

export const Default = Template.bind({});
Default.args = {
  icon: 'carbon:rain-drop',
  label: 'KEEPS MOISTURE',
};
