import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import Toggle from './Toggle';

export default {
  title: 'molecules/Toggle',
  component: Toggle,
  argTypes: {
    priceFormatter: { table: { disable: true } },
  },
} as ComponentMeta<typeof Toggle>;

const Template: ComponentStory<typeof Toggle> = (args) => <Toggle {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'This is a toggle option',
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
