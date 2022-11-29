import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import Footer from './Footer';
import { SPACING } from 'lib/globals/sizings';

export default {
  title: 'Organisms/Footer',
  component: Footer,
  argTypes: {
    copyright: { control: 'text' },
    newsLetter: { control: 'object' },
    bottomLinks: { control: 'array' },
    columns: { control: 'array' },
    paymentMethods: { control: 'array' },
    socials: { control: 'array' },
  },
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = (args) => <Footer {...args} />;

export const Default = Template.bind({});
Default.args = {
  horizontalPadding: SPACING.LARGE,
  menu: [
    {
      heading: 'Shop',
      items: [
        {
          link: 'categories/skincare-essentials',
          label: 'Skin',
        },
        {
          link: 'categories/hair-essentials',
          label: 'Hair Essentials',
        },
        {
          link: 'categories/supplements',
          label: 'Supplements',
        },
      ],
    },
    {
      heading: 'Company',
      items: [
        {
          link: 'membership',
          label: 'Membership',
        },
      ],
    },
  ],
  secondaryMenu: [
    {
      id: '1',
      link: 'shipping-and-returns',
      label: 'Shipping & Returns',
    },
    {
      id: '2',
      link: 'privacy-policy',
      label: 'Privacy Policy',
    },
    {
      id: '3',
      label: 'Terms & Conditions',
      link: 'terms-and-conditions',
    },
  ],
  copyrightText: '©2022 Horizon.',
  showNewsletter: true,
  newsletterTitle: "Let's keep in touch.",
  newsletterPlaceholder: 'E-mail address',
  showPayments: true,
  showSocials: true,
  socialLinks: {
    facebook: {
      show: true,
      url: 'https://www.facebook.com/swell',
    },
    twitter: {
      show: true,
      url: 'https://twitter.com/swell',
    },
    instagram: {
      show: true,
      url: 'https://www.instagram.com/swell',
    },
    tiktok: {
      show: true,
      url: 'https://www.tiktok.com/swell',
    },
    pinterest: {
      show: true,
      url: 'https://www.pinterest.com/swell',
    },
    youtube: {
      show: true,
      url: 'https://www.youtube.com/swell',
    },
    vimeo: {
      show: true,
      url: 'https://vimeo.com/swell',
    },
    whatsapp: {
      show: true,
      url: 'https://wa.me/917-898-89898',
    },
  },
};
