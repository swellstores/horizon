import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import OrderInfo from './OrderInfo';

export default {
  title: 'molecules/OrderInfo',
  component: OrderInfo,
  argTypes: {
    title: { control: 'text' },
  },
} as ComponentMeta<typeof OrderInfo>;

const Template: ComponentStory<typeof OrderInfo> = (args) => (
  <OrderInfo {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: 'Delivery information',
  infoCards: [
    {
      title: 'Details',
      body: '<p>Bonnie Sue Skyes <br>47 Anyville Rd, Anytown AZ 01234 United States</p>',
    },
    {
      title: 'Phone number',
      body: '<p>(+1) 541 754 3010</p>',
    },
    {
      title: 'Method',
      body: '<p>Express Shipping</p>',
    },
    {
      title: 'Order notes',
      body: '<p>If possible send me a gift bag with the order.</p>',
    },
  ],
};
