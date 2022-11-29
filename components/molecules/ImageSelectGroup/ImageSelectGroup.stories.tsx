import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import ImageSelectGroup from './ImageSelectGroup';

export default {
  title: 'Molecules/ImageSelectGroup',
  component: ImageSelectGroup,
  argTypes: {
    options: { control: 'array' },
    columns: { control: { type: 'number', min: 2, max: 4, step: 1 } },
  },
  decorators: [
    (Story) => (
      <div className="lg:m-16">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof ImageSelectGroup>;

const Template: ComponentStory<typeof ImageSelectGroup> = (args) => (
  <ImageSelectGroup {...args} />
);

export const SingleImageSelectGroup = Template.bind({});

SingleImageSelectGroup.args = {
  options: [
    {
      label: 'Country',
      image: {
        src: '/images/country.png',
        alt: 'Illustration of a road up the hill',
        width: 100,
        height: 100,
      },
      id: '1',
    },
    {
      label: 'City',
      image: {
        src: '/images/city.png',
        alt: 'Illustration of tall buildings in a city',
        width: 100,
        height: 100,
      },
      id: '2',
    },
  ],
  columns: 3,
};

export const MultipleImageSelectGroup = Template.bind({});

MultipleImageSelectGroup.args = {
  options: [
    {
      label: 'Regular exercise',
      image: {
        src: '/images/regular-exercise.png',
        alt: 'Illustration of a sport shoe and a gym weight',
        width: 100,
        height: 100,
      },
      id: '1',
    },
    {
      label: 'Kids',
      image: {
        src: '/images/kids.png',
        alt: 'Illustration of a stroller',
        width: 100,
        height: 100,
      },
      id: '2',
    },
    {
      label: 'Balanced diet',
      image: {
        src: '/images/balanced-diet.png',
        alt: 'Illustration of foods such as fruits, vegetables and meats',
        width: 100,
        height: 100,
      },
      id: '3',
    },
    {
      label: 'Love for alcohol',
      image: {
        src: '/images/love-for-alcohol.png',
        alt: 'Illustration of two alcoholic drinks',
        width: 100,
        height: 100,
      },
      id: '4',
    },
  ],
  columns: 4,
};
