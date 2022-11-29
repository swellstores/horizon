import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import PressMentionCard from './PressMentionCard';

export default {
  title: 'Atoms/PressMentionCard',
  component: PressMentionCard,
  argTypes: {
    image: {
      control: 'object',
    },
    quote: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div className="p-6">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof PressMentionCard>;

const Template: ComponentStory<typeof PressMentionCard> = (args) => (
  <PressMentionCard {...args} />
);

export const Default = Template.bind({});

Default.args = {
  image: {
    src: '/images/vogue-logo.svg',
    alt: 'Vogue brand logo',
    width: 144,
    height: 35,
  },
  quote: "The products you didn't know you need it.",
};
