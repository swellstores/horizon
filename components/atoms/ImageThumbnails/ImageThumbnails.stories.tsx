import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import ImageThumbnails from './ImageThumbnails';

export default {
  title: 'atoms/ImageThumbnails',
  component: ImageThumbnails,
  argTypes: {
    images: { control: { type: 'array' } },
    defaultValue: { control: { type: 'number' } },
    value: { control: { type: 'number' }, table: { disable: true } },
    onChange: { table: { disable: true } },
    disabled: { control: { type: 'boolean' } },
    imageSize: { control: { type: 'number' } },
  },
} as ComponentMeta<typeof ImageThumbnails>;

const Template: ComponentStory<typeof ImageThumbnails> = (args) => (
  <ImageThumbnails {...args} />
);

export const Default = Template.bind({});
Default.args = {
  defaultValue: 0,
  disabled: false,
  imageSize: 47,
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

export const Disabled = Template.bind({});
Disabled.args = {
  defaultValue: 2,
  disabled: true,
  imageSize: 47,
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
