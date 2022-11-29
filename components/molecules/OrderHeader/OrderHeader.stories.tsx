import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import OrderHeader from './OrderHeader';
import { ORDER_STATUS } from 'types/orders';
import { formatDateToLocale } from 'lib/utils/date';

export default {
  title: 'molecules/OrderHeader',
  component: OrderHeader,
  argTypes: {
    title: { control: 'text' },
    status: { control: 'select', options: Object.values(ORDER_STATUS) },
    totalText: { control: 'text' },
    total: { control: 'string' },
    leftColumn: { control: 'array' },
  },
} as ComponentMeta<typeof OrderHeader>;

const Template: ComponentStory<typeof OrderHeader> = (args) => (
  <OrderHeader {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: 'Order #31351',
  status: ORDER_STATUS.COMPLETE,
  totalText: 'Total',
  total: '$590.00',
  returnLabel: 'Create return',
  returnDialogTitle: 'Returning an item',
  returnDialogBody:
    'To initiate a partial or complete return of an order, please contact us at <a href="mailto:returns@horizon.com">returns@horizon.com</a> so we can start the return process. Don’t forget to include the order number and the reason for returning.',
  leftColumn: [
    ['Order date', formatDateToLocale(new Date())],
    ['Items', 5],
  ],
};
