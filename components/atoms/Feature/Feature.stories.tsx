import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import Feature, { FEATURE_IMAGE_SIZE } from './Feature';

export default {
  title: 'atoms/Feature',
  component: Feature,
  argTypes: {
    image: { control: { type: 'object' } },
    imageSize: {
      control: 'select',
      options: Object.values(FEATURE_IMAGE_SIZE),
    },
    title: { control: { type: 'text' } },
    description: { control: { type: 'text' } },
  },
} as ComponentMeta<typeof Feature>;

const Template: ComponentStory<typeof Feature> = (args) => (
  <Feature {...args} />
);

export const Default = Template.bind({});

Default.args = {
  image: {
    width: 80,
    height: 80,
    alt: '30 day return',
    src: '/images/features/returns.svg',
  },
  imageSize: FEATURE_IMAGE_SIZE.SMALL,
  title: '30 day return',
  description: 'If you’re not happy with your product, send it back to us',
};
