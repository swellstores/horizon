import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import ReviewCard from './ReviewCard';

export default {
  title: 'Molecules/ReviewCard',
  component: ReviewCard,
  argTypes: {
    user: {
      control: 'object',
    },
    rating: { control: 'number' },
    comment: { control: 'text' },
    date: { control: 'string' },
  },
} as ComponentMeta<typeof ReviewCard>;

const Template: ComponentStory<typeof ReviewCard> = (args) => (
  <ReviewCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
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
};
