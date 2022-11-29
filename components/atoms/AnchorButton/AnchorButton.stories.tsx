import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import AnchorButton from './AnchorButton';
import { BUTTON_TYPE } from 'types/shared/button';

export default {
  title: 'Atoms/AnchorButton',
  component: AnchorButton,
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
  },
} as ComponentMeta<typeof AnchorButton>;

const Template: ComponentStory<typeof AnchorButton> = (args) => (
  <AnchorButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: 'Anchor Button',
  elType: BUTTON_TYPE.BUTTON,
  disabled: false,
};

export const Inactive = Template.bind({});
Inactive.args = {
  ...Default.args,
  label: 'Inactive Button',
  disabled: true,
};

export const Link = Template.bind({});
Link.args = {
  label: 'Link Button',
  elType: BUTTON_TYPE.LINK,
  href: 'https://www.google.com',
};
