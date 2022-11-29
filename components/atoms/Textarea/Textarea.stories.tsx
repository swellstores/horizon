import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import Textarea from './Textarea';

export default {
  title: 'Atoms/Textarea',
  component: Textarea,
  argTypes: {
    value: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
} as ComponentMeta<typeof Textarea>;

const Template: ComponentStory<typeof Textarea> = (args) => (
  <Textarea {...args} />
);

export const Default = Template.bind({});
Default.args = {
  value: 'Tell us more about you',
  placeholder: 'Tell us more about you',
  disabled: false,
};

export const Placeholder = Template.bind({});
Placeholder.args = {
  value: '',
  placeholder: 'Tell us more about you',
  disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  value: 'Tell us more about you',
  placeholder: 'Tell us more about you',
  disabled: true,
};
