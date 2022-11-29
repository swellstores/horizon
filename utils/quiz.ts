import type { InputConfig } from 'components/molecules/QuizQuestion';
import type { QuizItemStaticProps } from 'components/organisms/QuizItem';
import { mapImage } from 'lib/editor/prop_mappers';
import { denullifyArray } from 'lib/utils/denullify';
import { generateId } from 'lib/utils/shared_functions';
import type { QuizPageProps } from 'pages/quiz/[id]';
import type { EditorImage } from 'types/editor';
import {
  Answer,
  ANSWER_TYPE,
  EditorAnswerSelection,
  QuizEditorAnswer,
  QuizEditorQuestionPageProps,
  QUIZ_ITEM_TYPE,
  QUIZ_QUESTION_SELECT_TYPE,
  QUIZ_QUESTION_TYPE,
} from 'types/shared/quiz';
import { isNextPublicSwellEditor } from 'utils/editor';

export const isChecked = (value: Answer, option: string) => {
  if (Array.isArray(value)) {
    return value?.includes(option);
  }
  return option === value;
};

export const TEXT_FIELD_PATTERN = '^[a-zA-Z0-9\\s]*$';

export const getAnswerType = (type?: QUIZ_QUESTION_TYPE): ANSWER_TYPE => {
  if (type === QUIZ_QUESTION_TYPE.MULTIPLE_SELECT) {
    return ANSWER_TYPE.ARRAY;
  }

  return ANSWER_TYPE.STRING;
};

export const mapSelection = (
  selection: EditorAnswerSelection[] | undefined | null,
) =>
  denullifyArray(
    selection?.map(({ product_selection, points }) => {
      const productSelection = denullifyArray(product_selection);
      if (!points || !productSelection.length) {
        return null;
      }

      return {
        points,
        productSelection: productSelection.map((item) => ({
          slug: item.slug,
          model: item._model,
        })),
      };
    }),
  );

const mapBaseSelectOptions = (answers?: QuizEditorAnswer[]) =>
  answers?.map((answer) => ({
    label: answer?.option ?? '',
    id: generateId(),
    selection: mapSelection(answer?.selection),
  })) ?? [];

const mapCardSelectOptions = (
  answers?: (QuizEditorAnswer & { image: EditorImage })[],
) =>
  answers?.map((answer) => ({
    label: answer?.option ?? '',
    id: generateId(),
    image: mapImage(answer?.image),
    selection: mapSelection(answer?.selection),
  })) ?? [];

export const getInputConfig = (
  questionPage: QuizEditorQuestionPageProps,
): InputConfig => {
  if (!questionPage?.question_type) {
    return {};
  }

  if (
    [
      QUIZ_QUESTION_TYPE.TEXT,
      QUIZ_QUESTION_TYPE.TEXTAREA,
      QUIZ_QUESTION_TYPE.EMAIL,
    ].includes(questionPage.question_type)
  ) {
    return {
      placeholder: questionPage?.placeholder ?? '',
      id: generateId(),
      ...(questionPage?.max_chars && { maxLength: questionPage.max_chars }),
    };
  }

  if (
    [
      QUIZ_QUESTION_TYPE.SINGLE_SELECT,
      QUIZ_QUESTION_TYPE.MULTIPLE_SELECT,
    ].includes(questionPage.question_type)
  ) {
    const layoutType = getQuestionLayoutType(questionPage);
    const hasColumns = [
      QUIZ_QUESTION_SELECT_TYPE.CARD,
      QUIZ_QUESTION_SELECT_TYPE.GRID,
    ].includes(layoutType as QUIZ_QUESTION_SELECT_TYPE);

    return {
      options:
        layoutType === QUIZ_QUESTION_SELECT_TYPE.CARD
          ? mapCardSelectOptions(questionPage?.answers_card)
          : mapBaseSelectOptions(questionPage?.answers),
      ...(hasColumns && { columns: questionPage?.columns ?? 3 }),
    };
  }

  return {};
};

export const getQuestionLayoutType = (
  question: QuizEditorQuestionPageProps,
) => {
  if (question.question_type === QUIZ_QUESTION_TYPE.SINGLE_SELECT) {
    return question?.layout_type_single_select ?? '';
  } else if (question.question_type === QUIZ_QUESTION_TYPE.MULTIPLE_SELECT) {
    return question?.layout_type_multiple_select ?? '';
  }
  return '';
};

export const showQuizSkeleton = (quiz: QuizPageProps) =>
  isNextPublicSwellEditor && !quiz.questions.length ? true : false;

export const showQuizQuestionSkeleton = (question: QuizItemStaticProps) => {
  if (isNextPublicSwellEditor) {
    const questionType = question?.type;

    if (!questionType) {
      return true;
    }

    switch (question.type) {
      case QUIZ_ITEM_TYPE.QUESTION:
        return !question?.questionType;
      case QUIZ_ITEM_TYPE.TRANSITION:
        return !question?.layoutOption;
      default:
        return false;
    }
  }
  return false;
};
