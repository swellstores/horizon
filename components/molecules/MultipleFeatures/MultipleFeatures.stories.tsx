import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import MultipleFeatures from './MultipleFeatures';
import { SPACING } from 'lib/globals/sizings';
import { FEATURE_IMAGE_SIZE } from 'components/atoms/Feature';

export default {
  title: 'molecules/MultipleFeatures',
  component: MultipleFeatures,
} as ComponentMeta<typeof MultipleFeatures>;

const Template: ComponentStory<typeof MultipleFeatures> = (args) => (
  <MultipleFeatures {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: 'What you’ll get',
  horizontal_spacing: SPACING.SMALL,
  features: [
    {
      id: '1',
      image: {
        width: 80,
        height: 80,
        alt: '30 day return',
        src: '/images/features/returns.svg',
      },
      title: '30 day return',
      description: 'If you’re not happy with your product, send it back to us',
    },
    {
      id: '2',
      image: {
        width: 80,
        height: 80,
        alt: 'Same day delivery',
        src: '/images/features/shipping.svg',
      },
      title: 'Same day delivery',
      description: 'Place your order online and receive it home that day',
    },
    {
      id: '3',
      image: {
        width: 80,
        height: 80,
        alt: 'exclusive products',
        src: '/images/features/face-wash.svg',
      },
      title: 'Try exclusive products',
      description: 'Get access to products especially designed for you',
    },
    {
      id: '4',
      image: {
        width: 80,
        height: 80,
        alt: 'free shipping',
        src: '/images/features/free-shipping.svg',
      },
      title: 'Free shipping',
      description: 'Don’t worry with shipping, this one is on us',
    },
    {
      id: '4',
      image: {
        width: 80,
        height: 80,
        alt: 'community',
        src: '/images/features/community.svg',
      },
      title: 'Community access',
      description: 'Connect to a community to share experiences and more',
    },
    {
      id: '5',
      image: {
        width: 80,
        height: 80,
        alt: 'discount',
        src: '/images/features/discount.svg',
      },
      title: 'Discounted products',
      description: 'Get access to exclusive discounts and promotions',
    },
  ],
};

export const WithCTA = Template.bind({});
WithCTA.args = {
  title: 'Backed up by science',
  horizontal_spacing: SPACING.SMALL,
  features: [
    {
      id: '1',
      image: {
        width: 80,
        height: 80,
        alt: 'Sheet of paper with checkboxes',
        src: '/images/about-us/quiz.svg',
      },
      title: 'Curated products',
      description: 'Our wellness quiz suggests products that are right for you',
    },
    {
      id: '2',
      image: {
        width: 80,
        height: 80,
        alt: 'Magnifier focused on a leaf',
        src: '/images/about-us/research.svg',
      },
      title: 'Scientifically proven',
      description:
        'Get access to products backed by the latest wellness research',
    },
    {
      id: '3',
      image: {
        width: 80,
        height: 80,
        alt: 'exclusive products',
        src: '/images/about-us/plant-base.svg',
      },
      title: 'Inspired by nature',
      description: 'All of our products are made from 100% natural ingredients',
    },
  ],
  cardImageSize: FEATURE_IMAGE_SIZE.LARGE,
  cta_label: 'Take our quiz',
  cta_link: '/quiz',
};
