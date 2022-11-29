import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import AccountNavLink from './AccountNavLink';

export default {
  title: 'atoms/AccountNavLink',
  component: AccountNavLink,
  argTypes: {
    label: { control: { type: 'text' } },
    link: { control: { type: 'text' } },
  },
} as ComponentMeta<typeof AccountNavLink>;

const Template: ComponentStory<typeof AccountNavLink> = (args) => (
  <AccountNavLink {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: 'AccountNavLink',
  link: '#',
};

export const Active = Template.bind({});
Active.args = {
  label: 'AccountNavLink',
  link: '#',
  active: true,
};
