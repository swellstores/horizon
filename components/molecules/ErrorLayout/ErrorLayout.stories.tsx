import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import ErrorLayout from './ErrorLayout';
import { BUTTON_TYPE } from 'types/shared/button';

export default {
  title: 'molecules/ErrorLayout',
  component: ErrorLayout,
} as ComponentMeta<typeof ErrorLayout>;

const Template: ComponentStory<typeof ErrorLayout> = (args) => (
  <ErrorLayout {...args} />
);

export const PageNotFound = Template.bind({});
PageNotFound.args = {
  code: 404,
  title: 'Page not found',
  description:
    '<p>The page you were looking for is not available. Double check your URL or explore Horizon for new findings.</p>',
  primaryCTA: {
    href: '/',
    elType: BUTTON_TYPE.LINK,
    children: 'Back to home',
  },
  image: {
    src: 'images/errors/404.svg',
    alt: 'Panel image',
    width: 420,
    height: 420,
  },
};

export const ServerError = Template.bind({});
ServerError.args = {
  code: 404,
  title: 'Page unavailable',
  description:
    '<p>The page you were looking for is temporarily unavailable. Please try refreshing the page.</p>',
  primaryCTA: {
    href: '',
    children: 'Refresh page',
    elType: BUTTON_TYPE.LINK,
  },
  image: {
    src: 'images/errors/500.svg',
    alt: 'Panel image',
    width: 420,
    height: 420,
  },
  showBackToHome: true,
};
