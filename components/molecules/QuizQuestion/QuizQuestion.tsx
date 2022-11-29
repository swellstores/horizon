import React, { useCallback, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import useClassNames from 'hooks/useClassNames';
import { TEXT_FIELD_PATTERN } from 'utils/quiz';
import Button from 'components/atoms/Button';
import Note from 'components/molecules/Note';

import type { TextFieldInputConfigProps } from 'components/molecules/TextField';
import type { TextareaFieldInputConfigProps } from 'components/molecules/TextareaField';
import type { ImageSelectInputConfigProps } from 'components/molecules/ImageSelectGroup';
import type { GridSelectInputConfigProps } from 'components/molecules/GridSelectGroup';
import type { StackSelectInputConfigProps } from 'components/molecules/StackSelectGroup';
import type { LevelSliderInputConfigProps } from 'components/atoms/LevelSlider/LevelSlider';
import { BUTTON_TYPE } from 'types/shared/button';
import {
  Answer,
  ANSWER_TYPE,
  QUIZ_ITEM_TYPE,
  QUIZ_QUESTION_SELECT_TYPE,
  QUIZ_QUESTION_TYPE,
} from 'types/shared/quiz';

const TextField = dynamic(() => import('components/molecules/TextField'));
const TextareaField = dynamic(
  () => import('components/molecules/TextareaField'),
);
const ImageSelectGroup = dynamic(
  () => import('components/molecules/ImageSelectGroup'),
);
const GridSelectGroup = dynamic(
  () => import('components/molecules/GridSelectGroup'),
);
const StackSelectGroup = dynamic(
  () => import('components/molecules/StackSelectGroup'),
);
const LevelSlider = dynamic(() => import('components/atoms/LevelSlider'));

export type InputSelectConfig =
  | ImageSelectInputConfigProps
  | GridSelectInputConfigProps
  | StackSelectInputConfigProps
  | LevelSliderInputConfigProps;

export type InputConfig =
  | TextFieldInputConfigProps
  | TextareaFieldInputConfigProps
  | InputSelectConfig;

export interface QuizQuestionStaticProps {
  type: QUIZ_ITEM_TYPE.QUESTION;
  /**
   * id of the question
   */
  id: string;
  /**
   * Question
   */
  question: string;
  /**
   * Additional information to be displayed about the input
   */
  inputInfo?: string;
  /**
   * Additional information about the question
   */
  note?: string;
  /**
   * Type of input
   */
  questionType: QUIZ_QUESTION_TYPE;
  /**
   *
   */
  questionLayoutType: QUIZ_QUESTION_SELECT_TYPE;
  /**
   * Configuration of the input
   */
  inputConfig: InputConfig;
  /**
   * Is the question required?
   */
  required: boolean;
  /**
   * Text of the button that triggers a step forward ('next' button)
   */
  nextButtonLabel: string;
  /**
   * Text of the button when is the last question
   */
  seeResultsLabel: string;
  /**
   * Is it the last question?
   */
  isLastQuestion: boolean;
  /**
   * Type of answer to be saved in internal state
   */
  answerType: ANSWER_TYPE;
  /**
   * Is the question representing the customer's name
   */
  isCustomerName?: boolean;
}
export interface QuizQuestionProps extends QuizQuestionStaticProps {
  /**
   * Total number of questions
   */
  totalQuestions: number;
  /**
   * Current question number
   */
  currentQuestion: number;
  /**
   * Answer provided by the user (coming from quiz state)
   */
  savedAnswer?: Answer;
  /**
   * Function that handles clicking on 'next' button
   */
  onNext: (key?: string, data?: Answer) => void;
}

const parseAnswer = (answer: Answer): boolean =>
  typeof answer === 'string' ? !!answer.trim().length : !!answer.length;

const getErrorLabel = (questionType: QUIZ_QUESTION_TYPE) => {
  if (questionType === QUIZ_QUESTION_TYPE.EMAIL) {
    return 'Please enter a valid email address';
  }

  return '';
};

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  id,
  totalQuestions = 1,
  currentQuestion = 1,
  question,
  inputInfo,
  note,
  questionType,
  questionLayoutType,
  inputConfig,
  required = false,
  nextButtonLabel,
  seeResultsLabel,
  isLastQuestion = false,
  answerType,
  savedAnswer = answerType === 'string' ? '' : [],
  onNext,
}) => {
  const [answer, setAnswer] = useState(savedAnswer);
  const [valid, setValid] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const errorLabel = getErrorLabel(questionType);

  /**
   * Function for handling change based on answer type: string | string[]
   * @param id  Id of the input field
   * @param newAnswer  The new answer to be added to state. In case of multiple choice input, it will add or remove the newAnswer from the answer array.
   */
  const onChange = useCallback(
    (newAnswer: string) => {
      if (answerType === 'string') {
        setAnswer(newAnswer);
      } else {
        setAnswer((prevState) => {
          const prevValue = prevState as string[];
          return prevValue.includes(newAnswer)
            ? prevValue.filter((answer) => answer !== newAnswer)
            : [...prevState, newAnswer];
        });
      }
    },
    [answerType],
  );

  const onTextFieldChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (e.target.validity.valid) {
        setError(undefined);
      }
      setValid(e.target.validity.valid);
      onChange(e.target.value);
    },
    [onChange],
  );

  const onTextFieldFocus = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void =>
      !e.target.validity.valid ? setError(errorLabel) : setError(undefined),
    [errorLabel],
  );

  const quizInput = useMemo(() => {
    if (
      [
        QUIZ_QUESTION_TYPE.SINGLE_SELECT,
        QUIZ_QUESTION_TYPE.MULTIPLE_SELECT,
      ].includes(questionType)
    ) {
      switch (questionLayoutType) {
        case QUIZ_QUESTION_SELECT_TYPE.CARD:
          return (
            <ImageSelectGroup
              {...(inputConfig as ImageSelectInputConfigProps)}
              containerClassName="mt-8 lg:mt-12 w-full"
              value={answer as string}
              onChange={onChange}
              isMultipleChoice={
                questionType === QUIZ_QUESTION_TYPE.MULTIPLE_SELECT
              }
            />
          );
        case QUIZ_QUESTION_SELECT_TYPE.GRID:
          return (
            <GridSelectGroup
              {...(inputConfig as GridSelectInputConfigProps)}
              containerClassName="mt-10 lg:mt-[62px] w-full lg:w-auto"
              value={answer as string}
              onChange={onChange}
              isMultipleChoice={
                questionType === QUIZ_QUESTION_TYPE.MULTIPLE_SELECT
              }
            />
          );
        case QUIZ_QUESTION_SELECT_TYPE.STACK:
          return (
            <StackSelectGroup
              {...(inputConfig as StackSelectInputConfigProps)}
              containerClassName="w-full max-w-[342px] lg:w-[342px] mt-6"
              value={answer as string}
              onChange={onChange}
              isMultipleChoice={
                questionType === QUIZ_QUESTION_TYPE.MULTIPLE_SELECT
              }
            />
          );
        case QUIZ_QUESTION_SELECT_TYPE.SLIDER:
          return (
            <LevelSlider
              {...(inputConfig as LevelSliderInputConfigProps)}
              name={question.toLocaleLowerCase().replace(/ /g, '')}
              containerClassName="mt-[170px] lg:mt-[60px]"
              value={answer as string}
              onChange={onChange}
              defaultOption={
                (inputConfig as LevelSliderInputConfigProps).options[0]
              }
            />
          );
        default:
          return null;
      }
    }

    switch (questionType) {
      case QUIZ_QUESTION_TYPE.TEXT:
        return (
          <TextField
            containerClassName="w-full max-w-[444px] lg:w-[444px] mt-10 lg:mt-[62px]"
            {...inputConfig}
            id={id}
            value={answer as string}
            onChange={onTextFieldChange}
            onBlur={onTextFieldFocus}
            onFocus={onTextFieldFocus}
            errorLabel={error}
            pattern={TEXT_FIELD_PATTERN}
          />
        );
      case QUIZ_QUESTION_TYPE.EMAIL:
        return (
          <TextField
            type="email"
            containerClassName="w-full max-w-[444px] lg:w-[444px] mt-10 lg:mt-[62px]"
            {...inputConfig}
            id={id}
            value={answer as string}
            onChange={onTextFieldChange}
            onBlur={onTextFieldFocus}
            onFocus={onTextFieldFocus}
            errorLabel={error}
          />
        );
      case QUIZ_QUESTION_TYPE.TEXTAREA:
        return (
          <TextareaField
            containerClassName="w-full max-w-[444px] lg:w-[444px] mt-10 lg:mt-[74px]"
            {...inputConfig}
            id={id}
            value={answer as string}
            onChange={(e) => onChange(e.target.value)}
          />
        );
      default:
        return null;
    }
  }, [
    questionType,
    questionLayoutType,
    inputConfig,
    answer,
    onChange,
    question,
    id,
    onTextFieldChange,
    onTextFieldFocus,
    error,
  ]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onNext(id, answer);
    },
    [id, answer, onNext],
  );

  const isSlider = questionType === QUIZ_QUESTION_TYPE.SINGLE_SELECT;
  const isButtonDisabled = (required && !parseAnswer(answer)) || !valid;

  const inputInfoClasses = useClassNames('mt-6 text-sm text-body', {
    'hidden lg:block': isSlider,
  });

  return (
    <form
      className={useClassNames(
        'flex h-full w-full flex-col items-center overflow-y-auto px-6 pt-[101px] pb-6 lg:pt-44 lg:pb-10',
      )}
      aria-describedby={`question-description-${currentQuestion}`}
      aria-labelledby={`question-text-${currentQuestion}`}
      onSubmit={handleSubmit}>
      <header className="flex flex-col items-center">
        <p
          role="status"
          title={`Question ${currentQuestion} out of ${totalQuestions}`}
          className="mb-6 text-xs font-semibold text-primary lg:mb-10 lg:text-sm">
          {currentQuestion} of {totalQuestions}
        </p>
        {question && (
          <legend
            className="text-center text-2xl font-semibold text-primary lg:max-w-[674px] lg:text-5xl"
            id={`question-text-${currentQuestion}`}>
            {question}
          </legend>
        )}
        {inputInfo && (
          <p
            className={inputInfoClasses}
            id={`question-description-${currentQuestion}`}>
            {inputInfo}
          </p>
        )}
      </header>
      <section className="mb-10 flex w-full flex-col items-center lg:mb-[50px]">
        {quizInput}
        {inputInfo && isSlider && (
          <p className="mt-11 text-sm text-body lg:hidden">{inputInfo}</p>
        )}
        {note && <Note text={note} containerClassName="mt-10 lg:mt-8" />}
      </section>
      <Button
        elType={BUTTON_TYPE.BUTTON}
        className="mt-auto w-full lg:w-auto"
        disabled={isButtonDisabled}
        id={`button-${id}`}
        type="submit">
        {!isLastQuestion ? nextButtonLabel : seeResultsLabel}
      </Button>
    </form>
  );
};

export default QuizQuestion;
