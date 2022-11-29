import React from 'react';

import type { ComponentStory, ComponentMeta } from '@storybook/react';

import QuizTransitionQuestion from './QuizTransitionQuestion';

export default {
  title: 'Molecules/QuizTransitionQuestion',
  component: QuizTransitionQuestion,
  argTypes: {
    imageSrc: { control: 'object' },
    title: { control: 'text' },
    bodyText: { control: 'text' },
    nextButtonLabel: { control: 'text' },
    seeResultsLabel: { control: 'text' },
  },
} as ComponentMeta<typeof QuizTransitionQuestion>;

const Template: ComponentStory<typeof QuizTransitionQuestion> = (args) => (
  <QuizTransitionQuestion {...args} />
);

export const Default = Template.bind({});

Default.args = {
  image: {
    src: '/images/non-alcoholic-drink.jpg',
    alt: 'A person holding a glass of non-alcoholic drink',
    width: 640,
    height: 720,
  },
  title: 'Let’s get to know each other',
  bodyText:
    '<p>To give you the best products especially made for you, we need to know more.</p><p>This will take around 5 minutes.</p>',
  nextButtonLabel: 'Next',
  seeResultsLabel: 'See results',
};
