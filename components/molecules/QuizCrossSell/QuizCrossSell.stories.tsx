import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import QuizCrossSell from './QuizCrossSell';

export default {
  title: 'Molecules/QuizCrossSell',
  component: QuizCrossSell,
  argTypes: {
    title: { control: 'text' },
    products: {
      control: 'array',
    },
  },
} as ComponentMeta<typeof QuizCrossSell>;

const Template: ComponentStory<typeof QuizCrossSell> = (args) => (
  <QuizCrossSell {...args} />
);

export const Default = Template.bind({});

Default.args = {
  title: 'Also for you...',
  products: [
    {
      productId: '',
      purchaseOptions: {
        standard: {
          price: 24,
          sale: false,
          salePrice: null,
        },
      },
      id: 'hair-booster-kit',
      image: {
        src: '/images/hair-booster-kit-thumbnail.jpg',
        alt: 'Bottles of hair shampoo and conditioner',
        width: 200,
        height: 264,
      },
      title: 'Hair booster kit',
      description:
        'Our hair booster kit has the essential combo of shampoo & conditioner for an hydrated healthy looking hair.',
      catchphrase: 'To protect and nurture',
      href: '',
      hrefCta: 'See product details',
      addToCartCta: 'Add to bag',
    },
    {
      productId: '',
      purchaseOptions: {
        standard: {
          price: 24,
          sale: false,
          salePrice: null,
        },
      },
      id: 'argan-oil',
      image: {
        src: '/images/argan-oil-thumbnail.jpg',
        alt: 'Bottle of argan oil',
        width: 200,
        height: 264,
      },
      title: 'Argan oil',
      description:
        'Our argan oil will be you ally for an healthy and faster hair growth while taking care of your scalp.',
      catchphrase: 'To promote hair growth',
      href: '',
      hrefCta: 'See product details',
      addToCartCta: 'Add to bag',
    },
  ],
};
