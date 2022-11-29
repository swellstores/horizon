import React from 'react';
import BlogCarousel from './BlogCarousel';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { BLOCK_PREVIEW_CARD_SIZE } from '../BlogPreviewCard';
import { PADDING, SPACING } from 'lib/globals/sizings';

export default {
  title: 'Molecules/BlogCarousel',
  component: BlogCarousel,
  argTypes: {
    title: { control: 'string' },
    blogCollection: { control: 'array' },
    cardSize: {
      control: 'select',
      options: [BLOCK_PREVIEW_CARD_SIZE.SMALL, BLOCK_PREVIEW_CARD_SIZE.MEDIUM],
    },
    backgroundColor: { control: 'string' },
    verticalPadding: { control: 'select', options: Object.values(PADDING) },
  },
} as ComponentMeta<typeof BlogCarousel>;

const Template: ComponentStory<typeof BlogCarousel> = (args) => (
  <BlogCarousel {...args} />
);

export const Default = Template.bind({});
Default.args = {
  horizontal_spacing: SPACING.LARGE,
  title: 'Other posts you might like',
  blogCollection: [
    {
      image: {
        alt: 'Woman looking in the mirror',
        src: '/images/blog-preview/blog-ingredient-layering.jpg',
        height: 213,
        width: 282,
      },
      title: 'Ingredient layering 101',
      description: 'Minimalist skincare is the new vibe, let’s get it right.',
      tag: 'hair',
      date: new Date('February, 2022'),
      href: '#',
    },
    {
      image: {
        alt: 'Person holding a bottle of retinol',
        src: '/images/blog-preview/blog-retinol.jpg',
        height: 213,
        width: 282,
      },
      title: 'Retinol: a love story',
      description: 'Retinol is one of our new favorites. What the heck is it?',
      tag: 'hair',
      date: new Date('January, 2022'),
      href: '#',
    },
    {
      image: {
        alt: 'Woman doing yoga',
        src: '/images/blog-preview/blog-wabi-sabi.jpg',
        height: 213,
        width: 282,
      },
      title: 'Wabi-sabi the body',
      description: 'Start embracing every part of yourself.',
      tag: 'hair',
      date: new Date('December, 2021'),
      href: '#',
    },
    {
      image: {
        alt: 'Woman with frizzy hair',
        src: '/images/blog-preview/blog-spf.jpg',
        height: 213,
        width: 282,
      },
      title: 'SPF will save your skin',
      description: 'Minimalist skincare is the new vibe, let’s get it right.',
      tag: 'hair',
      date: new Date('November, 2021'),
      href: '#',
    },
  ],
  cardSize: BLOCK_PREVIEW_CARD_SIZE.SMALL,
};

export const WithCTA = Template.bind({});
WithCTA.args = {
  horizontal_spacing: SPACING.LARGE,
  title: 'Other posts you might like',
  blogCollection: [
    {
      image: {
        alt: 'Woman looking in the mirror',
        src: '/images/blog-preview/blog-ingredient-layering.jpg',
        height: 213,
        width: 282,
      },
      title: 'Ingredient layering 101',
      description: 'Minimalist skincare is the new vibe, let’s get it right.',
      tag: 'hair',
      date: new Date('February, 2022'),
      href: '#',
    },
    {
      image: {
        alt: 'Person holding a bottle of retinol',
        src: '/images/blog-preview/blog-retinol.jpg',
        height: 213,
        width: 282,
      },
      title: 'Retinol: a love story',
      description: 'Retinol is one of our new favorites. What the heck is it?',
      tag: 'hair',
      date: new Date('January, 2022'),
      href: '#',
    },
    {
      image: {
        alt: 'Woman doing yoga',
        src: '/images/blog-preview/blog-wabi-sabi.jpg',
        height: 213,
        width: 282,
      },
      title: 'Wabi-sabi the body',
      description: 'Start embracing every part of yourself.',
      tag: 'hair',
      date: new Date('December, 2021'),
      href: '#',
    },
    {
      image: {
        alt: 'Woman with frizzy hair',
        src: '/images/blog-preview/blog-spf.jpg',
        height: 213,
        width: 282,
      },
      title: 'SPF will save your skin',
      description: 'Minimalist skincare is the new vibe, let’s get it right.',
      tag: 'hair',
      date: new Date('November, 2021'),
      href: '#',
    },
  ],
  cardSize: BLOCK_PREVIEW_CARD_SIZE.MEDIUM,
  backgroundColor: '#F9F7F5',
  cta: {
    label: 'See all posts',
    link: '#',
  },
  verticalPadding: PADDING.MEDIUM,
};
