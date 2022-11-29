import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import ImageGallery from './ImageGallery';

export default {
  title: 'molecules/ImageGallery',
  component: ImageGallery,
  argTypes: {
    images: { control: { type: 'array' } },
  },
} as ComponentMeta<typeof ImageGallery>;

const Template: ComponentStory<typeof ImageGallery> = (args) => (
  <ImageGallery {...args} />
);

export const Default = Template.bind({});
Default.args = {
  aspectRatio: '268/387',
  images: [
    {
      alt: 'vitamin-d',
      src: '/images/product-preview/vitamin-d.webp',
      height: 1548,
      width: 1072,
    },
    {
      alt: 'moisturizer-spf-15',
      src: '/images/product-preview/moisturizer-spf-15.webp',
      height: 1548,
      width: 1072,
    },
    {
      alt: 'liposomal-serum',
      src: '/images/product-preview/liposomal-serum.webp',
      height: 600,
      width: 700,
    },
    {
      alt: 'foaming-cleanser',
      src: '/images/product-preview/foaming-cleanser.webp',
      height: 1548,
      width: 1072,
    },
  ],
};
