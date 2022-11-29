import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import Tag from './Tag';

export default {
  title: 'Atoms/Tag',
  component: Tag,
  argTypes: {
    children: { control: 'text' },
  },
} as ComponentMeta<typeof Tag>;

const Template: ComponentStory<typeof Tag> = (args) => <Tag {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Available for subscription',
};

export const Secondary = Template.bind({});
Default.args = {
  children: 'Available for subscription',
  secondary: true,
};
