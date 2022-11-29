import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from './Button';
import { BUTTON_STYLE, BUTTON_TYPE } from 'types/shared/button';

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    children: { control: { type: 'text' } },
    hasBorder: { control: 'boolean' },
    small: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
    elType: {
      options: Object.values(BUTTON_TYPE),
      control: { type: 'inline-radio' },
    },
    buttonStyle: {
      options: Object.values(BUTTON_STYLE),
      control: { type: 'inline-radio' },
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: 'Default Button',
  small: false,
  disabled: false,
  hasBorder: true,
  elType: BUTTON_TYPE.BUTTON,
};

export const Secondary = Template.bind({});
Secondary.args = {
  ...Default.args,
  children: 'Secondary Button',
  buttonStyle: BUTTON_STYLE.SECONDARY,
};

export const Small = Template.bind({});
Small.args = {
  ...Default.args,
  children: 'Small Button',
  small: true,
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  ...Default.args,
  children: 'Full Width Button',
  fullWidth: true,
};

export const Inactive = Template.bind({});
Inactive.args = {
  ...Default.args,
  children: 'Inactive Button',
  disabled: true,
};

export const Link = Template.bind({});
Link.args = {
  children: 'Link',
  elType: BUTTON_TYPE.LINK,
  href: 'https://www.google.com',
};
