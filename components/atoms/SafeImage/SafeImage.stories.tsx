import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import SafeImage from './SafeImage';

export default {
  title: 'atoms/SafeImage',
  component: SafeImage,
  argTypes: {
    label: { control: { type: 'text' } },
  },
} as ComponentMeta<typeof SafeImage>;

const Template: ComponentStory<typeof SafeImage> = (args) => (
  <SafeImage {...args} />
);

export const Default = Template.bind({});
Default.args = {
  src: '/images/razor.jpg',
  width: 920,
  height: 1114,
};

export const WithoutSrc = Template.bind({});
WithoutSrc.args = {
  width: 920,
  height: 1114,
};
