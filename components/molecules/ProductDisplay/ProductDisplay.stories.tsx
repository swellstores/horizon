import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import ProductDisplay from './ProductDisplay';

export default {
  title: 'molecules/ProductDisplay',
  component: ProductDisplay,
} as ComponentMeta<typeof ProductDisplay>;

const Template: ComponentStory<typeof ProductDisplay> = (args) => (
  <ProductDisplay {...args} />
);

export const Default = Template.bind({});
Default.args = {
  product: {
    id: '1',
    image: {
      src: '/images/product-preview-card-1.webp',
      alt: 'Vitamin D',
      width: 268,
      height: 387,
    },
    title: 'Vitamin D',
    description: 'Supplement for a healthy life.',
    price: 28,
    href: 'vitamin-d',
  },
};
