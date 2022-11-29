import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import AccountNavMenu from './AccountNavMenu';

export default {
  title: 'molecules/AccountNavMenu',
  component: AccountNavMenu,
  argTypes: {
    links: { control: { type: 'array' } },
  },
} as ComponentMeta<typeof AccountNavMenu>;

const Template: ComponentStory<typeof AccountNavMenu> = (args) => (
  <AccountNavMenu {...args} />
);

export const Default = Template.bind({});
Default.args = {
  links: [
    {
      label: 'Orders & Returns',
      link: '#',
      active: false,
    },
    {
      label: 'Subscriptions',
      link: '#',
      active: true,
    },
    {
      label: 'Log out',
      link: '#',
      active: false,
    },
  ],
};
