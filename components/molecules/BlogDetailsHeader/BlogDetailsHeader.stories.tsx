import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import BlogDetailsHeader from './BlogDetailsHeader';

export default {
  title: 'molecules/BlogDetailsHeader',
  component: BlogDetailsHeader,
} as ComponentMeta<typeof BlogDetailsHeader>;

const Template: ComponentStory<typeof BlogDetailsHeader> = (args) => (
  <BlogDetailsHeader {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: 'To shave or not to shave',
  image: {
    alt: 'Woman shaving face',
    src: '/images/woman-shaving-face.jpg',
    width: 428,
    height: 323,
  },
};
