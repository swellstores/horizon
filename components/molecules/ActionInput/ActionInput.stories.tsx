import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import ActionInput from './ActionInput';

export default {
  title: 'Molecules/ActionInput',
  component: ActionInput,
  argTypes: {
    small: { control: 'boolean' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    errorLabel: { control: 'text' },
    disabled: { control: 'boolean' },
    name: { table: { disable: true } },
    onBlur: { table: { disable: true } },
    onChange: { table: { disable: true } },
    onFocus: { table: { disable: true } },
    onKeyDown: { table: { disable: true } },
    onKeyUp: { table: { disable: true } },
    onKeyPress: { table: { disable: true } },
    onAction: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
  },
} as ComponentMeta<typeof ActionInput>;

const Template: ComponentStory<typeof ActionInput> = (args) => (
  <ActionInput {...args} />
);

export const Default = Template.bind({});
Default.args = {
  value: 'Promo code',
  placeholder: 'Promo code',
  id: 'promo-code',
  errorLabel: '',
};

export const Small = Template.bind({});
Small.args = {
  value: 'Email',
  placeholder: 'Email',
  id: 'email',
  errorLabel: '',
  small: true,
};

export const Error = Template.bind({});
Error.args = {
  value: 'email@email.',
  placeholder: 'Email',
  errorLabel: 'Email address is invalid',
  id: 'email',
};
