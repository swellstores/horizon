import React from 'react';
import BlogPreviewCard, { BLOCK_PREVIEW_CARD_SIZE } from './BlogPreviewCard';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Molecules/BlogPreviewCard',
  component: BlogPreviewCard,
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    image: { control: 'object' },
    date: { control: 'date' },
    tag: { control: 'string' },
    size: {
      control: 'select',
      options: Object.values(BLOCK_PREVIEW_CARD_SIZE),
    },
  },
  decorators: [
    (Story) => (
      <div className="px-6 lg:px-46">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof BlogPreviewCard>;

const Template: ComponentStory<typeof BlogPreviewCard> = (args) => (
  <BlogPreviewCard {...args} />
);

export const ExtraLarge = Template.bind({});

ExtraLarge.args = {
  image: {
    alt: 'Woman shaving face',
    src: '/images/blog-preview/blog-woman-shaving-face.jpg',
    height: 323,
    width: 428,
  },
  title: 'To shave or not to shave. This is totally up to you, honestly.',
  description:
    'Shaving is a personal choice. It all about you personal confort and not what other think. Here are some considerations on how it impacts your skin.',
  tag: 'social dilema',
  date: new Date(),
  href: '#',
  size: BLOCK_PREVIEW_CARD_SIZE.EXTRA_LARGE,
};
