import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import TextField from './TextField';

export default {
  title: 'Molecules/TextField',
  component: TextField,
  argTypes: {
    value: { control: 'text' },
    placeholder: { control: 'text' },
    errorLabel: { control: 'text' },
    label: { control: 'text' },
    containerClassName: { table: { disable: true }, defaultValue: 'w-96' },
    containerStyle: { table: { disable: true } },
  },
} as ComponentMeta<typeof TextField>;

const Template: ComponentStory<typeof TextField> = (args) => (
  <TextField {...args} />
);

export const Default = Template.bind({});
Default.args = {
  defaultValue: 'Your first name',
  placeholder: 'Your first name',
  id: 'first-name',
  label: '',
  errorLabel: '',
};

export const Label = Template.bind({});
Label.args = {
  defaultValue: 'Your first name',
  placeholder: 'Your first name',
  label: 'First name',
  id: 'first-name',
  errorLabel: '',
};

export const Error = Template.bind({});
Error.args = {
  defaultValue: 'Your first name',
  placeholder: 'Your first name',
  errorLabel: 'Something went wrong here.',
  id: 'first-name',
  label: 'First name',
};

export const ErrorAndLabel = Template.bind({});
ErrorAndLabel.args = {
  defaultValue: 'Your first name',
  placeholder: 'Your first name',
  errorLabel: 'Something went wrong here.',
  label: 'First name',
  id: 'first-name',
};
