import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import ProductBenefits from './ProductBenefits';

export default {
  title: 'molecules/ProductBenefits',
  component: ProductBenefits,
  argTypes: {
    benefits: { control: { type: 'array' } },
  },
} as ComponentMeta<typeof ProductBenefits>;

const Template: ComponentStory<typeof ProductBenefits> = (args) => (
  <ProductBenefits {...args} />
);

export const Default = Template.bind({});
Default.args = {
  benefits: [
    {
      icon: 'carbon:rain-drop',
      label: 'KEEPS MOISTURE',
    },
    {
      icon: 'carbon:chart-bubble',
      label: ' removes bad oil',
    },
    {
      icon: 'carbon:soil-moisture',
      label: 'cleans deep pores',
    },
    {
      icon: 'carbon:soil-temperature',
      label: 'soothes skin',
    },
  ],
};
