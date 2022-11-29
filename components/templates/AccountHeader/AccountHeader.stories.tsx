import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import AccountHeader from './AccountHeader';
import { links } from 'lib/utils/nav';

export default {
  title: 'templates/AccountHeader',
  component: AccountHeader,
} as ComponentMeta<typeof AccountHeader>;

const Template: ComponentStory<typeof AccountHeader> = (args) => (
  <AccountHeader {...args} />
);

export const Default = Template.bind({});
Default.args = {
  hideOnScroll: true,
  backToShopLabel: 'Back to shop',
  storeUrl: 'https://horizon-demo.swell.store/',
  logo: {
    src: '/images/placeholder/logo.svg',
    width: 132.3,
    height: 20,
    alt: 'Horizon logo',
  },
  mobileMenuLinks: links,
  pageTitle: 'Orders and Returns',
};

export const NoMobileMenu = Template.bind({});
NoMobileMenu.args = {
  hideOnScroll: true,
  backToShopLabel: 'Back to shop',
  storeUrl: 'https://horizon-demo.swell.store/',
  logo: {
    src: '/images/placeholder/logo.svg',
    width: 132.3,
    height: 20,
    alt: 'Horizon logo',
  },
};
