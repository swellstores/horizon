import React from 'react';

import type { ComponentStory, ComponentMeta } from '@storybook/react';

import ImageSelectCard from './ImageSelectCard';

export default {
  title: 'Atoms/ImageSelectCard',
  component: ImageSelectCard,
  argTypes: {
    imageSrc: { control: 'object' },
    label: { control: 'text' },
    checked: { control: 'boolean' },
  },
} as ComponentMeta<typeof ImageSelectCard>;

const Template: ComponentStory<typeof ImageSelectCard> = (args) => (
  <ImageSelectCard {...args} />
);

export const Default = Template.bind({});

Default.args = {
  image: {
    src: '/images/city.png',
    alt: 'Illustration of tall buildings in a city',
    width: 100,
    height: 100,
  },
  label: 'Default card',
  checked: false,
};

export const Checked = Template.bind({});

Checked.args = {
  ...Default.args,
  checked: true,
};
