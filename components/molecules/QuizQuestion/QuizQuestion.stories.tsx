import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import QuizQuestion from './QuizQuestion';

import { Default as TextFieldTemplate } from 'components/molecules/TextField/TextField.stories';
import { Default as TextareaFieldTemplate } from 'components/molecules/TextareaField/TextareaField.stories';
import {
  SingleImageSelectGroup,
  MultipleImageSelectGroup,
} from 'components/molecules/ImageSelectGroup/ImageSelectGroup.stories';
import {
  SingleGridSelectGroup,
  MultipleGridSelectGroup,
} from 'components/molecules/GridSelectGroup/GridSelectGroup.stories';
import {
  SingleStackSelectGroup,
  MultipleStackSelectGroup,
} from 'components/molecules/StackSelectGroup/StackSelectGroup.stories';
import { Default as LevelSlider } from 'components/atoms/LevelSlider/LevelSlider.stories';

import type { TextareaFieldProps } from 'components/molecules/TextareaField';
import type { TextFieldProps } from 'components/molecules/TextField';
import type { ImageSelectGroupProps } from 'components/molecules/ImageSelectGroup';
import type { GridSelectGroupProps } from 'components/molecules/GridSelectGroup';
import type { LevelSliderProps } from 'components/atoms/LevelSlider';
import type { StackSelectGroupProps } from 'components/molecules/StackSelectGroup';
import {
  ANSWER_TYPE,
  QUIZ_QUESTION_SELECT_TYPE,
  QUIZ_QUESTION_TYPE,
} from 'types/shared/quiz';

export default {
  title: 'Molecules/QuizQuestion',
  component: QuizQuestion,
  argTypes: {
    questions: {
      control: {
        type: 'number',
        min: 1,
        step: 1,
      },
    },
    currentQuestion: {
      control: {
        type: 'number',
        min: 1,
        step: 1,
      },
    },
    question: { control: 'text' },
    inputInfo: { control: 'text' },
    nextButtonLabel: { control: 'text' },
    seeResultsLabel: { control: 'text' },
    errorLabel: { control: 'text' },
    questionType: {
      control: { type: 'select', options: Object.values(QUIZ_QUESTION_TYPE) },
    },
    questionLayoutType: {
      control: {
        type: 'select',
        options: Object.values(QUIZ_QUESTION_SELECT_TYPE),
      },
    },
    inputConfig: { control: 'object' },
  },
} as ComponentMeta<typeof QuizQuestion>;

const Template: ComponentStory<typeof QuizQuestion> = (args) => (
  <QuizQuestion {...args} />
);

const baseArgs = {
  totalQuestions: 1,
  currentQuestion: 1,
  nextButtonLabel: 'Next',
  seeResultsLabel: 'See results',
};

export const TextField = Template.bind({});
TextField.args = {
  ...baseArgs,
  question: "What's your name?",
  inputInfo: '',
  questionType: QUIZ_QUESTION_TYPE.TEXT,
  inputConfig: { ...(TextFieldTemplate.args as TextFieldProps) },
};

export const EmailField = Template.bind({});
EmailField.args = {
  ...baseArgs,
  question: "What's your email address?",
  inputInfo: '',
  questionType: QUIZ_QUESTION_TYPE.EMAIL,
  inputConfig: {
    ...(TextFieldTemplate.args as TextFieldProps),
    placeholder: 'Email',
  },
};

export const TextareaField = Template.bind({});
TextareaField.args = {
  ...baseArgs,
  question: 'Do you have anything you want to share?',
  inputInfo: '',
  questionType: QUIZ_QUESTION_TYPE.TEXTAREA,
  inputConfig: { ...(TextareaFieldTemplate.args as TextareaFieldProps) },
};

export const SingleImageSelect = Template.bind({});
SingleImageSelect.args = {
  ...baseArgs,
  question: 'Where do you live?',
  inputInfo: 'Pick one from the options',
  questionType: QUIZ_QUESTION_TYPE.SINGLE_SELECT,
  questionLayoutType: QUIZ_QUESTION_SELECT_TYPE.CARD,
  answerType: ANSWER_TYPE.STRING,
  inputConfig: {
    ...(SingleImageSelectGroup.args as ImageSelectGroupProps),
  },
};

export const MultipleImageSelect = Template.bind({});
MultipleImageSelect.args = {
  ...baseArgs,
  question: 'How would you define your lifestyle?',
  inputInfo: 'Select as many as you like',
  questionType: QUIZ_QUESTION_TYPE.MULTIPLE_SELECT,
  questionLayoutType: QUIZ_QUESTION_SELECT_TYPE.CARD,
  answerType: ANSWER_TYPE.ARRAY,
  inputConfig: {
    ...(MultipleImageSelectGroup.args as ImageSelectGroupProps),
  },
};

export const SingleGridSelect = Template.bind({});
SingleGridSelect.args = {
  ...baseArgs,
  question: "What's your age?",
  inputInfo: '',
  note: 'Our bodies change over time. This helps us assess your needs better.',
  questionType: QUIZ_QUESTION_TYPE.SINGLE_SELECT,
  questionLayoutType: QUIZ_QUESTION_SELECT_TYPE.GRID,
  answerType: ANSWER_TYPE.STRING,
  inputConfig: {
    ...(SingleGridSelectGroup.args as GridSelectGroupProps),
  },
};

export const MultipleGridSelect = Template.bind({});
MultipleGridSelect.args = {
  ...baseArgs,
  question: 'What’s your age?',
  inputInfo: '',
  questionType: QUIZ_QUESTION_TYPE.MULTIPLE_SELECT,
  questionLayoutType: QUIZ_QUESTION_SELECT_TYPE.GRID,
  answerType: ANSWER_TYPE.ARRAY,
  inputConfig: {
    ...(MultipleGridSelectGroup.args as GridSelectGroupProps),
  },
};

export const SingleStackSelect = Template.bind({});
SingleStackSelect.args = {
  ...baseArgs,
  question: 'What area do you want to improve?',
  inputInfo: 'Pick one from the options',
  questionType: QUIZ_QUESTION_TYPE.SINGLE_SELECT,
  questionLayoutType: QUIZ_QUESTION_SELECT_TYPE.STACK,
  answerType: ANSWER_TYPE.STRING,
  inputConfig: {
    ...(SingleStackSelectGroup.args as StackSelectGroupProps),
  },
};

export const MultipleStackSelect = Template.bind({});
MultipleStackSelect.args = {
  ...baseArgs,
  question: 'What areas do you want to improve?',
  inputInfo: 'Select as many as you like',
  questionType: QUIZ_QUESTION_TYPE.MULTIPLE_SELECT,
  questionLayoutType: QUIZ_QUESTION_SELECT_TYPE.STACK,
  answerType: ANSWER_TYPE.ARRAY,
  inputConfig: {
    ...(MultipleStackSelectGroup.args as StackSelectGroupProps),
  },
};

export const SingleLevelSlider = Template.bind({});
SingleLevelSlider.args = {
  ...baseArgs,
  question: 'How much stress do you experience on a regular basis?',
  inputInfo: 'Slide to select your answer',
  questionType: QUIZ_QUESTION_TYPE.SINGLE_SELECT,
  questionLayoutType: QUIZ_QUESTION_SELECT_TYPE.SLIDER,
  answerType: ANSWER_TYPE.STRING,
  inputConfig: { ...(LevelSlider.args as LevelSliderProps) },
};

export const DuplicateLabelSingleSelect = Template.bind({});
DuplicateLabelSingleSelect.args = {
  ...baseArgs,
  question: 'What area do you want to improve?',
  inputInfo: 'Pick one from the options',
  questionType: QUIZ_QUESTION_TYPE.SINGLE_SELECT,
  questionLayoutType: QUIZ_QUESTION_SELECT_TYPE.STACK,
  answerType: ANSWER_TYPE.STRING,
  inputConfig: {
    options: [
      { label: 'Face', id: '1' },
      { label: 'Body', id: '2' },
      { label: 'Body', id: '3' },
      { label: 'Gut', id: '4' },
    ],
  },
};

export const DuplicateLabelMultipleSelect = Template.bind({});
DuplicateLabelMultipleSelect.args = {
  ...baseArgs,
  question: 'What areas do you want to improve?',
  inputInfo: 'Select as many as you like',
  questionType: QUIZ_QUESTION_TYPE.MULTIPLE_SELECT,
  questionLayoutType: QUIZ_QUESTION_SELECT_TYPE.STACK,
  answerType: ANSWER_TYPE.ARRAY,
  inputConfig: {
    options: [
      { label: 'Face', id: '1' },
      { label: 'Body', id: '2' },
      { label: 'Body', id: '3' },
      { label: 'Gut', id: '4' },
    ],
  },
};
