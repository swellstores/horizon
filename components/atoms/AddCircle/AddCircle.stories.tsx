import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import AddCircle from './AddCircle';

export default {
  title: 'atoms/AddCircle',
  component: AddCircle,
  argTypes: {},
} as ComponentMeta<typeof AddCircle>;

const Template: ComponentStory<typeof AddCircle> = (args) => (
  <AddCircle {...args} />
);

export const Default = Template.bind({});
Default.args = {};
