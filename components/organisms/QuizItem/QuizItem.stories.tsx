import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import QuizItem from './QuizItem';
import { Default as TextFieldTemplate } from 'components/molecules/TextField/TextField.stories';
import type { TextFieldProps } from 'components/molecules/TextField';
import { QUIZ_QUESTION_TYPE, QUIZ_ITEM_TYPE } from 'types/shared/quiz';

export default {
  title: 'Organisms/QuizItem',
  component: QuizItem,
  argTypes: {},
} as ComponentMeta<typeof QuizItem>;

const Template: ComponentStory<typeof QuizItem> = (args) => (
  <QuizItem {...args} />
);

export const Default = Template.bind({});
Default.args = {
  type: QUIZ_ITEM_TYPE.QUESTION,
  id: '1',
  totalQuestions: 1,
  activeQuestionIndex: 0,
  nextButtonLabel: 'Next',
  seeResultsLabel: 'See results',
  question: "What's your name?",
  inputInfo: '',
  questionType: QUIZ_QUESTION_TYPE.TEXT,
  inputConfig: { ...(TextFieldTemplate.args as TextFieldProps) },
};
