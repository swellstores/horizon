import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import QuizCheckout from './QuizCheckout';

export default {
  title: 'Molecules/QuizCheckout',
  component: QuizCheckout,
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    subtotalText: { control: 'text' },
    subtotal: { control: 'number' },
    shippingText: { control: 'text' },
    shipping: { control: 'text' },
    checkoutLabel: { control: 'text' },
    paymentText: { control: 'text' },
    productsCount: { control: 'number' },
    productsLabel: { control: 'text' },
    showTag: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div className="pt-6">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof QuizCheckout>;

const Template: ComponentStory<typeof QuizCheckout> = (args) => (
  <QuizCheckout {...args} />
);

export const Default = Template.bind({});

Default.args = {
  title: 'Summary',
  description:
    'The complete routine to target all of your skin concerns and needs. ',
  subtotalText: 'Subtotal',
  subtotal: 297,
  shippingText: 'Shipping',
  shipping: 'Calculated in checkout',
  checkoutLabel: 'Add to Bag',
  paymentText: 'Payment options available',
  productsCount: 3,
  productsLabel: 'Products',
  showTag: false,
};
