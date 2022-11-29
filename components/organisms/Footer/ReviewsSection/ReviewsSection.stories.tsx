import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import ReviewsSection from './ReviewsSection';
import { SPACING } from 'lib/globals/sizings';
import { HORIZONTAL_ALIGNMENT } from 'types/shared/alignment';

export default {
  title: 'Organisms/ReviewsSection',
  component: ReviewsSection,
  argTypes: {
    title: { control: 'string' },
    reviews: { control: 'array' },
    content_alignment: {
      control: 'select',
      options: Object.values(HORIZONTAL_ALIGNMENT),
    },
  },
} as ComponentMeta<typeof ReviewsSection>;

const Template: ComponentStory<typeof ReviewsSection> = (args) => (
  <ReviewsSection {...args} />
);

export const Default = Template.bind({});
Default.args = {
  content_alignment: HORIZONTAL_ALIGNMENT.LEFT,
  horizontal_spacing: SPACING.LARGE,
  title: 'Loved by them',
  reviews: [
    {
      id: '1',
      user_image: {
        src: '/images/review-photo.png',
        alt: 'Young woman holding her glasses, posing for a photo.',
        width: 72,
        height: 72,
      },
      user_name: 'Maria Watkins',
      user_location: 'San Francisco, CA',
      rating: 4,
      comment:
        'My friend recommended Horizon and I was not disappointed. My skin is glowing right now. I had so much energy.',
      date: '1 Week ago',
    },
    {
      id: '2',
      user_image: {
        src: '/images/review-photo-2.png',
        alt: 'Young woman holding her glasses, posing for a photo.',
        width: 72,
        height: 72,
      },
      user_name: 'Samantha Ross',
      user_location: 'Seattle, WA',
      rating: 4,
      comment:
        "My hair, and my skin have improved so much in 6 weeks. I'm never going back to the chemist vitamins.",
      date: '1 Month ago',
    },
    {
      id: '3',
      user_image: {
        src: '/images/review-photo-3.png',
        alt: 'Young woman holding her glasses, posing for a photo.',
        width: 72,
        height: 72,
      },
      user_name: 'Jessica Pontes',
      user_location: 'Lisbon, Portugal',
      rating: 5,
      comment:
        'Horizon changed my routine and my life in the best way possible. My holy grail products of skincare are all here.',
      date: '1 Month ago',
    },
  ],
};
