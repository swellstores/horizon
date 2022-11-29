import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import ToggleSmall from './ToggleSmall';

export default {
  title: 'molecules/ToggleSmall',
  component: ToggleSmall,
  argTypes: {
    priceFormatter: { table: { disable: true } },
  },
} as ComponentMeta<typeof ToggleSmall>;

const Template: ComponentStory<typeof ToggleSmall> = (args) => (
  <ToggleSmall {...args} />
);

export const Default = Template.bind({});
Default.args = {
  name: 'This is a ToggleSmall option',
  priceDifference: 10,
};

export const NegativeDifference = Template.bind({});
NegativeDifference.args = {
  ...Default.args,
  priceDifference: -10,
};

export const NoDifference = Template.bind({});
NoDifference.args = {
  ...Default.args,
  priceDifference: 0,
};
