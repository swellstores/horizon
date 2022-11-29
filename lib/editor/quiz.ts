import type { InputConfig } from 'components/molecules/QuizQuestion';
import { denullifyArray } from 'lib/utils/denullify';
import {
  QuizEditorProps,
  QuizEditorQuestionPageProps,
  QuizEditorResultsPage,
  QUIZ_ITEM_TYPE,
  QUIZ_QUESTION_SELECT_TYPE,
  QUIZ_QUESTION_TYPE,
  QUIZ_TRANSITION_LAYOUT_OPTION,
} from 'types/shared/quiz';
import type { ContentBlockComponent } from 'types/shared/sections';
import {
  getAnswerType,
  getInputConfig,
  getQuestionLayoutType,
} from 'utils/quiz';
import { mapImage } from './prop_mappers';
import { mapSectionProps } from './sections';
import * as PropMappers from './prop_mappers';

export const mapQuizProps = (quiz: QuizEditorProps) => {
  const totalQuestions =
    quiz?.questions
      ?.filter(({ type }) => type === QUIZ_ITEM_TYPE.QUESTION)
      ?.map((question) => ({
        id: question.id,
      }))?.length ?? 0;

  const questions =
    quiz?.questions?.map((question, index, { length }) => {
      const baseProps = {
        id: question.id,
        nextButtonLabel: quiz?.next_button_label ?? '',
        seeResultsLabel: quiz?.see_results_label ?? '',
        isLastQuestion: index === length - 1,
      };

      switch (question.type) {
        case QUIZ_ITEM_TYPE.QUESTION:
          return {
            ...baseProps,
            type: question?.type ?? '',
            question: question?.question_prompt ?? '',
            inputInfo: question?.question_description ?? '',
            note: question?.question_note ?? '',
            questionType: (question?.question_type ?? '') as QUIZ_QUESTION_TYPE,
            questionLayoutType: getQuestionLayoutType(
              question,
            ) as QUIZ_QUESTION_SELECT_TYPE,
            inputConfig: getInputConfig(
              question as QuizEditorQuestionPageProps,
            ) as InputConfig,
            required: question?.required ?? false,
            answerType: getAnswerType(question?.question_type),
            isCustomerName: question?.is_customer_name ?? false,
          };

        case QUIZ_ITEM_TYPE.TRANSITION:
          return {
            ...baseProps,
            type: question?.type ?? '',
            image: mapImage(question.image),
            title: question?.title ?? '',
            bodyText: question?.description ?? '',
            layoutOption:
              (question?.layout_option as QUIZ_TRANSITION_LAYOUT_OPTION) ??
              null,
          };
        default:
          return null;
      }
    }) ?? [];

  return {
    id: quiz.id,
    totalQuestions,
    title: quiz?.name ?? 'Quiz',
    questions: denullifyArray(questions),
    originalQuiz: quiz,
  };
};

export const mapQuizResultsProps = async (
  quizResultsPage: QuizEditorResultsPage,
) => {
  const headingSection = quizResultsPage?.heading_section?.[0]
    ? (await mapSectionProps([quizResultsPage.heading_section[0]]))?.[0]
    : null;

  return {
    id: quizResultsPage?.id ?? null,
    title: quizResultsPage?.title ?? '',
    headingSection,
    resultsTitle: quizResultsPage?.results_title ?? '',
    originalQuizResults: quizResultsPage || null,
  };
};

export const applyQuizPropMappers = (
  component: ContentBlockComponent<{
    [key: string]: unknown;
  }>,
  props: Record<string, unknown>,
  quizVariables: Record<string, string>,
) => {
  if (!component.quizPropMaps) return props;

  const mappedProps: typeof props = {};

  // Modify the props using the prop mapper function and add them to the mappedProps object
  for (const [key, propMap] of Object.entries(component.quizPropMaps)) {
    if (!propMap) continue;

    let mappingFunction: (...props: unknown[]) => unknown | Promise<unknown>;
    let propKey: string;

    if (typeof propMap === 'string') {
      mappingFunction = PropMappers[propMap] as typeof mappingFunction;
      propKey = key;
    } else {
      const { mapper, sourceKey = key } = propMap;

      mappingFunction = PropMappers[mapper] as typeof mappingFunction;
      propKey = sourceKey;
    }

    if (!props[propKey] || !mappingFunction) continue;

    // Here we pass the quizVariables to the mapping function just in case it needs to make use of them
    mappedProps[key] = mappingFunction(props[propKey], quizVariables);
  }

  return mappedProps;
};
