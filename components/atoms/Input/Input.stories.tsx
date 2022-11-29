import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import Input from './Input';

export default {
  title: 'Atoms/Input',
  component: Input,
  argTypes: {
    value: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    small: { control: 'boolean' },
    icon: { control: 'text' },
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

const defaultProps = {
  defaultValue: 'Your first name',
  placeholder: 'Your first name',
  disabled: false,
  small: false,
  icon: undefined,
};

export const Default = Template.bind({});
Default.args = defaultProps;

export const Small = Template.bind({});
Small.args = {
  ...defaultProps,
  small: true,
};

export const Placeholder = Template.bind({});
Placeholder.args = {
  ...defaultProps,
  defaultValue: '',
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...defaultProps,
  disabled: true,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  ...defaultProps,
  icon: 'material-symbols:search-rounded',
};
