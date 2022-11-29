import React from 'react';
import CategoryPreviewCard from './CategoryPreviewCard';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { IMAGE_LAYOUT } from 'lib/globals/sizings';

export default {
  title: 'Atoms/CategoryPreviewCard',
  component: CategoryPreviewCard,
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    image: { control: 'object' },
    href: { control: 'text' },
    preserveScroll: { table: { disable: true } },
    imageLayout: { control: 'radio', options: Object.values(IMAGE_LAYOUT) },
  },
} as ComponentMeta<typeof CategoryPreviewCard>;

const Template: ComponentStory<typeof CategoryPreviewCard> = (args) => (
  <CategoryPreviewCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  image: {
    src: '/images/category-preview/skin.jpg',
    alt: 'Skin',
    height: 824,
    width: 625,
  },
  title: 'Skin',
  description: 'Everything you need to kick your health into place.',
  href: '/categories/skincare-essentials',
  imageLayout: IMAGE_LAYOUT.PORTRAIT,
};

export const NoDescription = Template.bind({});
NoDescription.args = {
  image: {
    src: '/images/category-preview/skin.jpg',
    alt: 'Skin',
    height: 824,
    width: 625,
  },
  title: 'Skin',
  description: 'Everything you need to kick your health into place.',
  showDescription: false,
  href: '/categories/skincare-essentials',
  imageLayout: IMAGE_LAYOUT.PORTRAIT,
};

export const SquareImage = Template.bind({});
SquareImage.args = {
  image: {
    src: '/images/category-preview/skin.jpg',
    alt: 'Skin',
    height: 824,
    width: 625,
  },
  title: 'Skin',
  description: 'Everything you need to kick your health into place.',
  showDescription: false,
  href: '/categories/skincare-essentials',
  imageLayout: IMAGE_LAYOUT.SQUARE,
};
