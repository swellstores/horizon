import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import TextareaField from './TextareaField';

export default {
  title: 'Molecules/TextareaField',
  component: TextareaField,
  argTypes: {
    value: { control: 'text' },
    placeholder: { control: 'text' },
    errorLabel: { control: 'text' },
    label: { control: 'text' },
    containerClassName: { table: { disable: true }, defaultValue: 'w-96' },
    containerStyle: { table: { disable: true } },
  },
} as ComponentMeta<typeof TextareaField>;

const Template: ComponentStory<typeof TextareaField> = (args) => (
  <TextareaField {...args} />
);

export const Default = Template.bind({});
Default.args = {
  value: 'Tell us more about you',
  placeholder: 'Tell us more about you',
  id: 'tell-more',
  label: '',
  errorLabel: '',
  maxLength: 200,
};

export const Label = Template.bind({});
Label.args = {
  value: 'Tell us more about you',
  placeholder: 'Tell us more about you',
  label: 'Write something',
  id: 'tell-more',
  errorLabel: '',
  maxLength: 200,
};

export const Error = Template.bind({});
Error.args = {
  value: 'Tell us more about you',
  placeholder: 'Tell us more about you',
  errorLabel: 'Something went wrong here.',
  id: 'tell-more',
  label: '',
  maxLength: 200,
};

export const ErrorAndLabel = Template.bind({});
ErrorAndLabel.args = {
  value: 'Tell us more about you',
  placeholder: 'Tell us more about you',
  errorLabel: 'Something went wrong here.',
  label: 'Write something',
  id: 'tell-more',
  maxLength: 200,
};
