import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import GhostButton from './GhostButton';
import { BUTTON_TYPE } from 'types/shared/button';

export default {
  title: 'Atoms/GhostButton',
  component: GhostButton,
  argTypes: {
    children: { control: { type: 'text' } },
    secondary: { control: 'boolean' },
    hasBorder: { control: 'boolean' },
    small: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
    elType: {
      options: Object.values(BUTTON_TYPE),
      control: { type: 'inline-radio' },
    },
  },
} as ComponentMeta<typeof GhostButton>;

const Template: ComponentStory<typeof GhostButton> = (args) => (
  <GhostButton {...args} />
);

export const Default = Template.bind({});

Default.args = {
  children: 'Back to subscriptions',
  small: false,
  disabled: false,
  elType: BUTTON_TYPE.LINK,
  href: '#',
};
