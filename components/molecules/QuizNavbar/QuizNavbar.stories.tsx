import React from 'react';

import type { ComponentStory, ComponentMeta } from '@storybook/react';

import QuizNavbar from './QuizNavbar';

export default {
  title: 'Molecules/QuizNavbar',
  component: QuizNavbar,
  argTypes: {
    questions: { control: 'number', min: 1, step: 1 },
    currentQuestion: { control: 'number', min: 1, step: 1 },
    logoSrc: { control: 'object' },
    transparent: { control: 'boolean' },
  },
} as ComponentMeta<typeof QuizNavbar>;

const Template: ComponentStory<typeof QuizNavbar> = (args) => (
  <QuizNavbar {...args} />
);

export const Default = Template.bind({});

Default.args = {
  questions: 1,
  currentQuestion: 1,
  transparent: false,
};
