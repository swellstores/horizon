import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import StatusIndicator from './StatusIndicator';
import { SUBSCRIPTION_STATUS } from 'types/subscription';
import { STOCK_STATUS } from 'types/shared/products';

export default {
  title: 'atoms/StatusIndicator',
  component: StatusIndicator,
  argTypes: {
    status: { control: { type: 'text' } },
  },
} as ComponentMeta<typeof StatusIndicator>;

const Template: ComponentStory<typeof StatusIndicator> = (args) => (
  <StatusIndicator {...args} />
);

export const Default = Template.bind({});
Default.args = {
  status: SUBSCRIPTION_STATUS.ACTIVE,
};

export const Cancelled = Template.bind({});
Cancelled.args = {
  status: SUBSCRIPTION_STATUS.CANCELED,
};

export const LowStock = Template.bind({});
LowStock.args = {
  status: STOCK_STATUS.LOW_STOCK,
  payload: '5',
};
