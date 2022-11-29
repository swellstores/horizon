import React from 'react';
import {
  HORIZONTAL_ALIGNMENT,
  VERTICAL_ALIGNMENT,
} from 'types/shared/alignment';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import FullWidthMedia from './FullWidthMedia';
import { BUTTON_STYLE } from 'types/shared/button';
import { SPACING } from 'lib/globals/sizings';

export default {
  title: 'Molecules/FullWidthMedia',
  component: FullWidthMedia,
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    links: { control: 'array' },
    text_color: { control: 'text' },
    horizontal_spacing: {
      options: Object.values(SPACING),
      control: {
        type: 'inline-radio',
      },
    },
    vertical_spacing: {
      options: Object.values(SPACING),
      control: {
        type: 'inline-radio',
      },
    },
    background_color: { control: 'text' },
    background_image: { control: 'object' },
    horizontal_background_alignment: {
      options: Object.values(HORIZONTAL_ALIGNMENT),
      control: { type: 'inline-radio' },
    },
    vertical_background_alignment: {
      options: Object.values(VERTICAL_ALIGNMENT),
      control: { type: 'inline-radio' },
    },
    horizontal_content_alignment: {
      options: Object.values(HORIZONTAL_ALIGNMENT),
      control: { type: 'inline-radio' },
    },
    vertical_content_alignment: {
      options: Object.values(VERTICAL_ALIGNMENT),
      control: { type: 'inline-radio' },
    },
    overlay_opacity: {
      control: 'number',
    },
  },
} as ComponentMeta<typeof FullWidthMedia>;

const Template: ComponentStory<typeof FullWidthMedia> = (args) => (
  <FullWidthMedia {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: '<h1>No body is the same.</h1>',
  description:
    '<p>Every body has its own needs. Take the quiz to find out how we can help you with yours.</p>',
  links: [
    {
      id: '1',
      style: BUTTON_STYLE.PRIMARY,
      label: 'Take the quiz',
      link: '/quiz',
    },
    {
      id: '2',
      style: BUTTON_STYLE.ANCHOR,
      label: 'Shop now',
      link: '/products',
    },
  ],
  horizontal_background_alignment: HORIZONTAL_ALIGNMENT.CENTER,
  vertical_background_alignment: VERTICAL_ALIGNMENT.CENTER,
  horizontal_content_alignment: HORIZONTAL_ALIGNMENT.CENTER,
  vertical_content_alignment: VERTICAL_ALIGNMENT.CENTER,
  horizontal_spacing: SPACING.MEDIUM,
  vertical_spacing: SPACING.MEDIUM,
  background_image: {
    src: '/images/full-width-media-bg.jpg',
    alt: "Close-up of a Woman's face, with the skin on focus",
    width: 1350,
    height: 900,
  },
  overlay_opacity: 50,
};

export const BackgroundColor = Template.bind({});
BackgroundColor.args = {
  ...Default.args,
  background_color: 'teal',
};
