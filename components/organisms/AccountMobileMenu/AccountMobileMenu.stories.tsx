import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import AccountMobileMenu from './AccountMobileMenu';

export default {
  title: 'organisms/AccountMobileMenu',
  component: AccountMobileMenu,
} as ComponentMeta<typeof AccountMobileMenu>;

const Template: ComponentStory<typeof AccountMobileMenu> = (args) => (
  <AccountMobileMenu {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: 'Orders and Returns',
  links: [
    {
      label: 'Orders & Returns',
      link: '#',
    },
    {
      label: 'Subscriptions',
      link: '#',
    },
    {
      label: 'Log out',
      link: '#',
    },
  ],
};
