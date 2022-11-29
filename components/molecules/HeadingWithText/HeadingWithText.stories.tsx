import React from 'react';
import { HORIZONTAL_ALIGNMENT, TEXT_ALIGNMENT } from 'types/shared/alignment';
import { PADDING, SPACING } from 'lib/globals/sizings';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import HeadingWithText from './HeadingWithText';

export default {
  title: 'Molecules/HeadingWithText',
  component: HeadingWithText,
  argTypes: {
    label: { control: 'text' },
    title: { control: 'text' },
    description: { control: 'text' },
    horizontal_alignment: {
      options: Object.values(HORIZONTAL_ALIGNMENT),
      control: { type: 'inline-radio' },
    },
    background_color: { control: 'text' },
    background_image: { control: 'object' },
    text_alignment: {
      options: Object.values(TEXT_ALIGNMENT),
      control: { type: 'inline-radio' },
    },
    padding: {
      options: Object.values(PADDING),
      control: {
        type: 'inline-radio',
      },
    },
    cta: { control: 'object' },
  },
} as ComponentMeta<typeof HeadingWithText>;

const Template: ComponentStory<typeof HeadingWithText> = (args) => (
  <HeadingWithText {...args} />
);

export const Default = Template.bind({});
Default.args = {
  description:
    '<p>Different bodies, different needs.</p><p><b>Find what yours needs.</b></p>',
  background_color: '#F6F4EF',
  text_alignment: TEXT_ALIGNMENT.CENTER,
};

export const TextAndButton = Template.bind({});
TextAndButton.args = {
  description:
    '<p>Different bodies, different needs.</p><p><b>Find what yours needs.</b></p>',
  background_color: '#F6F4EF',
  text_alignment: TEXT_ALIGNMENT.LEFT,
  cta: {
    link: '#',
    label: 'Take the quiz',
  },
  horizontal_spacing: SPACING.LARGE,
};
