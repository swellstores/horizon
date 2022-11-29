import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import QuizResultsIntro from './QuizResultsIntro';

export default {
  title: 'Molecules/QuizResultsIntro',
  component: QuizResultsIntro,
  argTypes: {
    headingBasis: { control: 'text' },
    customerName: { control: 'text' },
    description: { control: 'text' },
    background: { control: 'object' },
  },
} as ComponentMeta<typeof QuizResultsIntro>;

const Template: ComponentStory<typeof QuizResultsIntro> = (args) => (
  <QuizResultsIntro {...args} />
);

export const Default = Template.bind({});

Default.args = {
  headingBasis: 'Just for you',
  customerName: 'Susana',
  description:
    'Based on your answers, we’ve indentified that your priorities are around skin improvement. We suggest starting with the skin starter pack.',
  background: {
    src: '/images/quiz-results-background.jpg',
    alt: 'Different coloured shapes on the left side of a grey background',
    width: 1280,
    height: 441,
  },
};
