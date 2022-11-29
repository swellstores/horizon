import React from 'react';
import BlogListing from './BlogListing';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { BLOCK_PREVIEW_CARD_SIZE } from 'components/molecules/BlogPreviewCard';
import { SPACING } from 'lib/globals/sizings';

export default {
  title: 'Molecules/BlogListing',
  component: BlogListing,
  argTypes: {
    blogCollection: { control: 'array' },
  },
} as ComponentMeta<typeof BlogListing>;

const Template: ComponentStory<typeof BlogListing> = (args) => (
  <BlogListing {...args} />
);

export const Default = Template.bind({});

Default.args = {
  horizontal_spacing: SPACING.NONE,
  blogCollection: [
    {
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
      date: new Date('March, 2021'),
      href: '#',
      size: BLOCK_PREVIEW_CARD_SIZE.EXTRA_LARGE,
    },
    {
      image: {
        alt: 'Woman with frizzy hair',
        src: '/images/blog-preview/blog-frizzy-hair.jpg',
        height: 213,
        width: 282,
      },
      title: 'Frizzy hair, do we care?',
      description: 'Frizzy hair is often portrayed as damaged hair. But is it?',
      tag: 'hair',
      date: new Date('March, 2022'),
      href: '#',
      size: BLOCK_PREVIEW_CARD_SIZE.EXTRA_SMALL,
    },
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
      size: BLOCK_PREVIEW_CARD_SIZE.EXTRA_SMALL,
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
      size: BLOCK_PREVIEW_CARD_SIZE.EXTRA_SMALL,
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
      size: BLOCK_PREVIEW_CARD_SIZE.EXTRA_SMALL,
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
      size: BLOCK_PREVIEW_CARD_SIZE.EXTRA_SMALL,
    },
    {
      image: {
        alt: 'Man wearing a mask and looking in the mirror',
        src: '/images/blog-preview/blog-dealing-with-masks.jpg',
        height: 213,
        width: 282,
      },
      title: 'Are you dealing with masks?',
      description: 'Masks are a part of our new routine. Keep your skin safe.',
      tag: 'hair',
      date: new Date('October, 2022'),
      href: '#',
      size: BLOCK_PREVIEW_CARD_SIZE.EXTRA_SMALL,
    },
  ],
};
