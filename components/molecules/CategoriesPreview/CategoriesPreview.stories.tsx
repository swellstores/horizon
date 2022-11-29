import React from 'react';
import CategoriesPreview from './CategoriesPreview';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { IMAGE_LAYOUT, SPACING } from 'lib/globals/sizings';

export default {
  title: 'Molecules/CategoriesPreview',
  component: CategoriesPreview,
  argTypes: {
    items: { control: 'array' },
    columns: { control: 'select', options: [2, 3, 4] },
    show_category_description: { control: 'boolean' },
    image_layout: { control: 'radio', options: Object.values(IMAGE_LAYOUT) },
    background_color: { control: 'color' },
    horizontal_spacing: { control: 'select', options: Object.values(SPACING) },
    vertical_spacing: { control: 'select', options: Object.values(SPACING) },
  },
} as ComponentMeta<typeof CategoriesPreview>;

const Template: ComponentStory<typeof CategoriesPreview> = (args) => (
  <CategoriesPreview {...args} />
);

const items = [
  {
    id: 'supplements',
    title: 'Supplements',
    description: 'Everything you need to kick your health into place.',
    image: {
      alt: 'supplements',
      height: 824,
      width: 625,
      src: '/images/category-preview/supplements.jpg',
    },
    href: 'supplements',
  },
  {
    id: 'skin',
    title: 'Skin',
    description: 'Everything you need to kick your health into place.',
    image: {
      alt: 'skin',
      height: 824,
      width: 625,
      src: '/images/category-preview/skin.jpg',
    },
    href: 'skin',
  },
  {
    id: 'hair',
    title: 'Hair',
    description: 'Everything you need to kick your health into place.',
    image: {
      alt: 'hair',
      height: 824,
      width: 625,
      src: '/images/category-preview/hair.jpg',
    },
    href: 'hair',
  },
  {
    id: 'supplements',
    title: 'Supplements',
    description: 'Everything you need to kick your health into place.',
    image: {
      alt: 'supplements',
      height: 824,
      width: 625,
      src: '/images/category-preview/supplements.jpg',
    },
    href: 'supplements',
  },
];

export const Default = Template.bind({});
Default.args = {
  items,
  columns: 3,
  show_category_description: true,
  image_layout: IMAGE_LAYOUT.PORTRAIT,
};

export const NoDescription = Template.bind({});
NoDescription.args = {
  items,
  columns: 3,
  show_category_description: false,
  image_layout: IMAGE_LAYOUT.PORTRAIT,
};

export const FourColumns = Template.bind({});
FourColumns.args = {
  items,
  columns: 4,
  show_category_description: true,
  image_layout: IMAGE_LAYOUT.PORTRAIT,
};

export const TwoColumns = Template.bind({});
TwoColumns.args = {
  items,
  columns: 2,
  show_category_description: true,
  image_layout: IMAGE_LAYOUT.PORTRAIT,
};

export const SquareImage = Template.bind({});
SquareImage.args = {
  items,
  columns: 3,
  show_category_description: true,
  image_layout: IMAGE_LAYOUT.SQUARE,
};
