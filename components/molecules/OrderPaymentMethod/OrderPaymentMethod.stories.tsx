import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import OrderPaymentMethod from './OrderPaymentMethod';
import { CARD_BRAND, PAYMENT_METHOD } from 'types/shared/payment';

export default {
  title: 'molecules/OrderPaymentMethod',
  component: OrderPaymentMethod,
  argTypes: {
    method: { control: 'select', options: Object.values(PAYMENT_METHOD) },
    name: { control: 'text' },
    card: { control: 'object' },
  },
} as ComponentMeta<typeof OrderPaymentMethod>;

const Template: ComponentStory<typeof OrderPaymentMethod> = (args) => (
  <OrderPaymentMethod {...args} />
);

export const Default = Template.bind({});
Default.args = {
  method: PAYMENT_METHOD.CARD,
  card: {
    name: 'Bonnie Skyes',
    brand: CARD_BRAND.MASTERCARD,
    label: 'Card',
    last4: '4565',
    expiredDate: '01/24',
  },
};

export const Apple = Template.bind({});
Apple.args = {
  method: PAYMENT_METHOD.APPLE,
};
