import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import Figure from './Figure';

export default {
  title: 'atoms/Figure',
  component: Figure,
  argTypes: {
    label: { control: { type: 'text' } },
  },
} as ComponentMeta<typeof Figure>;

const Template: ComponentStory<typeof Figure> = (args) => <Figure {...args} />;

export const Default = Template.bind({});
Default.args = {
  caption: '“The hair” by Emma Thomson, 2020 ',
  image: {
    src: '/images/figure.jpg',
    alt: 'The hair by Emma Thomson',
    width: 1984,
    height: 1112,
  },
};

export const Rounded = Template.bind({});
Rounded.args = {
  caption: '“The hair” by Emma Thomson, 2020 ',
  image: {
    src: '/images/figure.jpg',
    alt: 'The hair by Emma Thomson',
    width: 1984,
    height: 1112,
  },
  rounded: true,
};
