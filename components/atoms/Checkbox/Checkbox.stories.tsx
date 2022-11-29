import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import Checkbox from './Checkbox';

export default {
  title: 'atoms/Checkbox',
  component: Checkbox,
  argTypes: {
    label: { control: { type: 'text' } },
  },
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => (
  <Checkbox {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: 'Checkbox',
};
