import React from 'react';

import type { ComponentStory, ComponentMeta } from '@storybook/react';

import GridSelectCard from './GridSelectCard';

export default {
  title: 'Atoms/GridSelectCard',
  component: GridSelectCard,
  argTypes: {
    label: { control: 'text' },
    checked: { control: 'boolean' },
  },
} as ComponentMeta<typeof GridSelectCard>;

const Template: ComponentStory<typeof GridSelectCard> = (args) => (
  <GridSelectCard {...args} />
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
