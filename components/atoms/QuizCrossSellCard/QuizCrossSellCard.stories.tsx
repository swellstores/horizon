import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import QuizCrossSellCard from './QuizCrossSellCard';

export default {
  title: 'Atoms/QuizCrossSellCard',
  component: QuizCrossSellCard,
  argTypes: {
    purchaseOptions: {
      control: 'object',
    },
    image: {
      control: 'object',
    },
    title: { control: 'text' },
    description: { control: 'text' },
    catchphrase: { control: 'text' },
    price: { control: 'number' },
    href: { control: 'text' },
    hrefCta: { control: 'text' },
    addToCartCta: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div className="p-6">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof QuizCrossSellCard>;

const Template: ComponentStory<typeof QuizCrossSellCard> = (args) => (
  <QuizCrossSellCard {...args} />
);

export const Default = Template.bind({});

Default.args = {
  productId: '',
  purchaseOptions: {
    standard: {
      price: 24,
      sale: false,
      salePrice: null,
    },
  },
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
};
