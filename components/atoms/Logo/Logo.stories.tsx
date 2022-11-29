import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import Logo from './Logo';

export default {
  title: 'Atoms/Logo',
  component: Logo,
  argTypes: {
    storeName: { control: 'text' },
    logo: { control: 'object' },
    logoHeight: { control: 'object' },
  },
} as ComponentMeta<typeof Logo>;

const Template: ComponentStory<typeof Logo> = (args) => <Logo {...args} />;

export const Default = Template.bind({});
Default.args = {
  storeName: 'Horizon',
  logo: null,
  logoHeight: null,
};

export const WithImage = Template.bind({});
WithImage.args = {
  storeName: 'Store Name',
  logo: {
    src: '/images/logo.png',
    alt: 'Horizon logo',
    width: 209,
    height: 33,
    contentType: 'image/svg+xml',
  },
  logoHeight: {
    desktop: 31,
    mobile: 20,
  },
};
