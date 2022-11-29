import React from 'react';

import type { ComponentStory, ComponentMeta } from '@storybook/react';

import StackSelectCard from './StackSelectCard';

export default {
  title: 'Atoms/StackSelectCard',
  component: StackSelectCard,
  argTypes: {
    label: { control: 'text' },
    checked: { control: 'boolean' },
  },
} as ComponentMeta<typeof StackSelectCard>;

const Template: ComponentStory<typeof StackSelectCard> = (args) => (
  <StackSelectCard {...args} />
);

export const Default = Template.bind({});

Default.args = {
  label: 'Default card',
  checked: false,
};

export const Checked = Template.bind({});

Checked.args = {
  ...Default.args,
  checked: true,
};
