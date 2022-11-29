import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import LinksAccordion from './LinksAccordion';

export default {
  title: 'Atoms/LinksAccordion',
  component: LinksAccordion,
  argTypes: {
    title: { control: 'text' },
    items: { control: 'array' },
  },
} as ComponentMeta<typeof LinksAccordion>;

const Template: ComponentStory<typeof LinksAccordion> = (args) => (
  <LinksAccordion {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: 'Shop',
  items: [
    {
      href: 'categories/supplements',
      title: 'Supplements',
    },
    {
      href: 'categories/hair-essentials',
      title: 'Hair Essentials',
    },
    {
      href: 'categories/skincare-essentials',
      title: 'Skincare Essentials',
    },
  ],
};
