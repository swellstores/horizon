import type { InputSelectConfig } from 'components/molecules/QuizQuestion';
import { denullifyArray } from 'lib/utils/denullify';
import type { NextRouter } from 'next/router';
import type { QuizPageProps } from 'pages/quiz/[id]';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useQuizStore from 'stores/quiz';
import {
  Answer,
  AnswerSelection,
  QUIZ_ITEM_TYPE,
  QUIZ_QUESTION_TYPE,
} from 'types/shared/quiz';

export enum TRANSITION_DIRECTION {
  FORWARD = 'forward',
  BACKWARD = 'backward',
}

export const getAnswersWithSelections = (
  stateAnswers: Map<string, Answer>,
  quiz: QuizPageProps,
) => {
  const answers: { selection: AnswerSelection[] }[] = [];
  stateAnswers.forEach((value, key) => {
    const question = quiz.questions.find((question) => question.id === key);
    if (question?.type === QUIZ_ITEM_TYPE.QUESTION) {
      if (
        [
          QUIZ_QUESTION_TYPE.SINGLE_SELECT,
          QUIZ_QUESTION_TYPE.MULTIPLE_SELECT,
        ].includes(question.questionType)
      ) {
        let validSelections = [];

        if (typeof value === 'string') {
          validSelections =
            (question?.inputConfig as InputSelectConfig).options?.find(
              (option) => option.id === value,
            )?.selection ?? [];
        } else {
          validSelections =
            denullifyArray(
              (question?.inputConfig as InputSelectConfig).options
                ?.filter((option) => value.includes(option.id))
                ?.flatMap((item) => item.selection),
            ) ?? [];
        }

        answers.push({ selection: validSelections });
      }
    }
  });

  return answers;
};

const useQuiz = (quiz: QuizPageProps, router: NextRouter) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const transparent = useMemo(
    () => quiz.questions[activeIndex]?.type === QUIZ_ITEM_TYPE.TRANSITION,
    [activeIndex, quiz.questions],
  );
  const [transitionDirection, setTransitionDirection] = useState(
    TRANSITION_DIRECTION.FORWARD,
  );
  const [quizState, setQuiz, setStoreAnswer] = useQuizStore((state) => [
    state.quizzes.get(quiz.id),
    state.setQuiz,
    state.setAnswer,
  ]);

  // Initialize quiz
  useEffect(() => {
    if (!quizState) {
      setQuiz(quiz.id, { answers: new Map() });
    }
  }, [quizState, quiz.id, setQuiz]);

  /**
   * Function for handling one step forward in quiz
   */
  const onNext = useCallback(
    async (key?: string, answer?: Answer) => {
      if (key && answer) {
        setStoreAnswer(quiz.id, key, answer);
      }

      if (activeIndex + 1 === quiz.questions.length && quizState?.answers) {
        const nameAnswerId = quiz.questions.find(
          (question) =>
            question.type === QUIZ_ITEM_TYPE.QUESTION &&
            question.questionType === QUIZ_QUESTION_TYPE.TEXT &&
            question?.isCustomerName,
        )?.id;
        const name = nameAnswerId ? quizState.answers.get(nameAnswerId) : '';

        try {
          const resultsRes = await fetch('/api/get-quiz-results', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              answers: getAnswersWithSelections(quizState.answers, quiz),
            }),
          });

          const results = (await resultsRes.json()).data.results;

          if (results?.length) {
            router.push(
              `/quiz/${quiz.id}/results?name=${name}&products=${results.join(
                ',',
              )}`,
            );
          }
        } catch (error) {
          console.error(error);
        }

        return;
      }

      setTransitionDirection(TRANSITION_DIRECTION.FORWARD);

      if (quiz.questions[activeIndex + 1].type === QUIZ_ITEM_TYPE.QUESTION) {
        setActiveQuestionIndex((prevState) => prevState + 1);
      }

      setActiveIndex((prevState) => prevState + 1);
    },
    [
      activeIndex,
      quiz,
      setStoreAnswer,
      quizState,
      setActiveIndex,
      setActiveQuestionIndex,
      router,
    ],
  );

  /**
   * Function for handling one step backward in quiz
   */
  const onPrevious = useCallback(() => {
    if (activeIndex < 1) {
      return;
    }

    setTransitionDirection(TRANSITION_DIRECTION.BACKWARD);

    if (quiz.questions[activeIndex].type === QUIZ_ITEM_TYPE.QUESTION) {
      setActiveQuestionIndex((prevState) => prevState - 1);
    }

    setActiveIndex((prevState) => prevState - 1);
  }, [setActiveIndex, setActiveQuestionIndex, activeIndex, quiz.questions]);

  /**
   * Function for handling manual change of the current activeIndex/activeQuestionIndex
   */
  const onIndexChange = useCallback(
    (newIndex) => {
      setActiveIndex(newIndex);

      const questionType = quiz.questions[newIndex]?.type;

      if (!questionType) {
        return;
      }

      if (questionType === QUIZ_ITEM_TYPE.QUESTION) {
        const newIndexId = quiz.questions[newIndex]?.id;
        const newActiveQuestionIndex = quiz.questions
          .filter((item) => item.type === QUIZ_ITEM_TYPE.QUESTION)
          .findIndex((item) => item.id === newIndexId);

        setActiveQuestionIndex(newActiveQuestionIndex);
      } else {
        const arrayToIndex = quiz.questions.slice(0, newIndex + 1);
        const lastQuestionId = arrayToIndex
          ?.reverse()
          ?.find((item) => item.type === QUIZ_ITEM_TYPE.QUESTION)?.id;

        const newActiveQuestionIndex = quiz.questions
          .filter((item) => item.type === QUIZ_ITEM_TYPE.QUESTION)
          .findIndex((item) => item.id === lastQuestionId);

        setActiveQuestionIndex(newActiveQuestionIndex);
      }
    },
    [setActiveIndex, setActiveQuestionIndex, quiz.questions],
  );

  return {
    activeIndex,
    activeQuestionIndex,
    transparent,
    transitionDirection,
    answers: quizState?.answers,
    onNext,
    onPrevious,
    onIndexChange,
  };
};

export default useQuiz;
