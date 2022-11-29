import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import OrderInfoCard from './OrderInfoCard';
import { CARD_BRAND, PAYMENT_METHOD } from 'types/shared/payment';

export default {
  title: 'molecules/OrderInfoCard',
  component: OrderInfoCard,
  argTypes: {
    title: { control: 'text' },
    body: { control: 'text' },
    payment: { control: 'object' },
  },
} as ComponentMeta<typeof OrderInfoCard>;

const Template: ComponentStory<typeof OrderInfoCard> = (args) => (
  <OrderInfoCard {...args} />
);

export const Text = Template.bind({});
Text.args = {
  title: 'Billing address',
  body: '<p>Bonnie Sue Skyes</p><p>47 Anyville Rd, Anytown AZ 01234 United States</p>',
};

export const PaymentMethod = Template.bind({});
PaymentMethod.args = {
  title: 'Payment method',
  payment: {
    method: PAYMENT_METHOD.CARD,
    card: {
      name: 'Bonnie Skyes',
      brand: CARD_BRAND.MASTERCARD,
      label: 'Card',
      last4: '4565',
      expiredDate: '01/24',
    },
  },
};
