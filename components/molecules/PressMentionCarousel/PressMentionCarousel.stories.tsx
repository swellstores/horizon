import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import PressMentionCarousel from './PressMentionCarousel';
import { SPACING } from 'lib/globals/sizings';

export default {
  title: 'molecules/PressMentionCarousel',
  component: PressMentionCarousel,
  argTypes: {
    title: { control: 'text' },
    press_mentions: { control: 'array' },
  },
} as ComponentMeta<typeof PressMentionCarousel>;

const Template: ComponentStory<typeof PressMentionCarousel> = (args) => (
  <PressMentionCarousel {...args} />
);

export const Default = Template.bind({});
Default.args = {
  horizontal_spacing: SPACING.NONE,
  title: 'They are talking about us',
  press_mentions: [
    {
      image: {
        src: '/images/business-insider-logo.svg',
        alt: 'Business insider brand logo',
        width: 140,
        height: 43,
      },
      quote: 'You never have to go to the chemist again.',
    },
    {
      image: {
        src: '/images/vogue-logo.svg',
        alt: 'Vogue brand logo',
        width: 144,
        height: 35,
      },
      quote: "The products you didn't know you need it.",
    },
    {
      image: {
        src: '/images/refinery-29-logo.svg',
        alt: 'Refinery 29 brand logo',
        width: 220,
        height: 43,
      },
      quote: 'Simple, affordable, reliable. What else do you need?',
    },
  ],
};
