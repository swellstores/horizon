import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import ProductHeader from './ProductHeader';

export default {
  title: 'Molecules/ProductHeader',
  component: ProductHeader,
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    description: { control: 'text' },
    tag: { control: 'text' },
  },
} as ComponentMeta<typeof ProductHeader>;

const Template: ComponentStory<typeof ProductHeader> = (args) => (
  <ProductHeader {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: 'Foaming Cleanser',
  subtitle: 'Skin care essentials',
  tag: 'Available for subscription',
  description:
    'Non-offensive and suitable for all skin types. Moisturizes and soothes skinwhile romoving all traces of makeup and pollution. It’s gentle formula is humbly effective and loved by all.',
};

export const NoTag = Template.bind({});
NoTag.args = {
  title: 'Foaming Cleanser',
  subtitle: 'Skin care essentials',
  description:
    'Non-offensive and suitable for all skin types. Moisturizes and soothes skinwhile romoving all traces of makeup and pollution. It’s gentle formula is humbly effective and loved by all.',
};
