import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import CategoryDisplay from './CategoryDisplay';

export default {
  title: 'atoms/CategoryDisplay',
  component: CategoryDisplay,
} as ComponentMeta<typeof CategoryDisplay>;

const Template: ComponentStory<typeof CategoryDisplay> = (args) => (
  <CategoryDisplay {...args} />
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
};
