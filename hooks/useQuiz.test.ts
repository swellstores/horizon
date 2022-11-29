import { renderHook, act } from '@testing-library/react-hooks';
import type { QuizPageProps } from 'pages/quiz/[id]';
import useQuiz, {
  getAnswersWithSelections,
  TRANSITION_DIRECTION,
} from './useQuiz';
import { useMockRouter } from 'utils/test/next-router';
import { mockFetchWithJson } from 'utils/test/fetch';

const quiz = {
  id: '630ddaa582a31b003ec13429',
  totalQuestions: 3,
  title: 'Quiz one',
  questions: [
    {
      id: 'question-1',
      nextButtonLabel: 'Next',
      seeResultsLabel: 'See results',
      isLastQuestion: false,
      type: 'quiz_question',
      question: "How's it going?",
      inputInfo: 'Choose one of them',
      note: 'Some note',
      questionType: 'single_select',
      questionLayoutType: 'grid',
      inputConfig: {
        options: [
          {
            label: 'Option 1',
            id: 'test-id-1',
            selection: [
              {
                id: '632841562c6153a573000004',
                points: 25,
                productSelection: [
                  {
                    slug: 'product-2',
                    model: 'products',
                  },
                  {
                    slug: 'product-3',
                    model: 'products',
                  },
                  {
                    slug: 'product-4',
                    model: 'products',
                  },
                  {
                    slug: 'category-2',
                    model: 'categories',
                  },
                ],
              },
              {
                id: '632841622c6153a573000005',
                points: 20,
                productSelection: [
                  {
                    slug: 'product-5',
                    model: 'products',
                  },
                  {
                    slug: 'product-6',
                    model: 'products',
                  },
                  {
                    slug: 'product-7',
                    model: 'products',
                  },
                ],
              },
            ],
          },
          {
            label: 'Option 2',
            id: 'test-id-2',
            selection: [
              {
                id: '63284e19b2d39be837000002',
                points: 23,
                productSelection: [
                  {
                    slug: 'product-8',
                    model: 'products',
                  },
                  {
                    slug: 'product-5',
                    model: 'products',
                  },
                ],
              },
            ],
          },
        ],
        columns: 3,
      },
      required: true,
      answerType: 'string',
    },
    {
      id: 'question-2',
      nextButtonLabel: 'Next',
      seeResultsLabel: 'See results',
      isLastQuestion: false,
      type: 'quiz_transition',
      image: {
        alt: '',
        height: 0,
        width: 0,
        src: '',
      },
      title: 'Beautiful',
      bodyText: 'This is a beautiful description',
      layoutOption: 'image_left_aligned',
    },
    {
      id: 'question-3',
      nextButtonLabel: 'Next',
      seeResultsLabel: 'See results',
      isLastQuestion: false,
      type: 'quiz_question',
      question: 'Choose your mood',
      inputInfo: '',
      note: '',
      questionType: 'single_select',
      questionLayoutType: 'card',
      inputConfig: {
        options: [
          {
            label: 'Mood one',
            id: 'test-id-3',
            image: {},
            selection: [
              {
                id: '6328189027e0769e7a000004',
                points: 35,
                productSelection: [
                  {
                    slug: 'product-3',
                    model: 'products',
                  },
                  {
                    slug: 'product-2',
                    model: 'products',
                  },
                  {
                    slug: 'product-1',
                    model: 'products',
                  },
                ],
              },
            ],
          },
          {
            label: 'Mood two',
            id: 'test-id-4',
            image: {},
            selection: [
              {
                id: '632818a627e0769e7a000006',
                points: 30,
                productSelection: [
                  {
                    slug: 'category-1',
                    model: 'categories',
                  },
                  {
                    slug: 'product-1',
                    model: 'products',
                  },
                ],
              },
            ],
          },
        ],
        columns: 3,
      },
      required: true,
      answerType: 'string',
      isCustomerName: false,
    },
    {
      id: 'question-4',
      nextButtonLabel: 'Next',
      seeResultsLabel: 'See results',
      isLastQuestion: true,
      type: 'quiz_question',
      question: "What's your name?",
      inputInfo: '',
      note: '',
      questionType: 'text',
      questionLayoutType: '',
      inputConfig: {
        placeholder: 'Name',
        id: 'test-id-5',
      },
      required: true,
      answerType: 'string',
      isCustomerName: true,
    },
  ],
  originalQuiz: {},
};

const initHook = () => {
  const routerHook = renderHook(() => useMockRouter());
  const quizHook = renderHook(() =>
    useQuiz(quiz as QuizPageProps, routerHook.result.current),
  );

  return { quizHook, routerHook };
};

describe('useQuiz', () => {
  it('returns correct initial state', () => {
    const { quizHook } = initHook();

    expect(quizHook.result.current.activeIndex).toBe(0);
    expect(quizHook.result.current.activeQuestionIndex).toBe(0);
    expect(quizHook.result.current.transparent).toBe(false);
    expect(quizHook.result.current.transitionDirection).toBe(
      TRANSITION_DIRECTION.FORWARD,
    );
    expect(quizHook.result.current.answers).toStrictEqual(new Map());
  });

  it('returns correct state after one step forward', () => {
    const { quizHook } = initHook();

    act(() => {
      quizHook.result.current.onNext('question-1', 'test-id-1');
    });

    const newAnswers = new Map();
    newAnswers.set('question-1', 'test-id-1');

    expect(quizHook.result.current.activeIndex).toBe(1);
    expect(quizHook.result.current.activeQuestionIndex).toBe(0);
    expect(quizHook.result.current.transparent).toBe(true);
    expect(quizHook.result.current.transitionDirection).toBe(
      TRANSITION_DIRECTION.FORWARD,
    );
    expect(quizHook.result.current.answers).toStrictEqual(newAnswers);
  });

  it('returns correct state after one step backward', () => {
    const { quizHook } = initHook();

    act(() => {
      quizHook.result.current.onNext('question-1', 'test-id-1');
    });

    act(() => {
      quizHook.result.current.onNext();
    });

    act(() => {
      quizHook.result.current.onNext('question-3', 'test-id-3');
    });

    act(() => {
      quizHook.result.current.onPrevious();
    });

    const newAnswers = new Map();
    newAnswers.set('question-1', 'test-id-1');
    newAnswers.set('question-3', 'test-id-3');

    expect(quizHook.result.current.activeIndex).toBe(2);
    expect(quizHook.result.current.activeQuestionIndex).toBe(1);
    expect(quizHook.result.current.transparent).toBe(false);
    expect(quizHook.result.current.transitionDirection).toBe(
      TRANSITION_DIRECTION.BACKWARD,
    );
    expect(quizHook.result.current.answers).toStrictEqual(newAnswers);
  });

  it('returns correct state after changing index with onIndexChange', () => {
    const { quizHook } = initHook();

    act(() => {
      quizHook.result.current.onIndexChange(2);
    });

    expect(quizHook.result.current.activeIndex).toBe(2);
    expect(quizHook.result.current.activeQuestionIndex).toBe(1);
  });

  it('router asPath value is correct after quiz completion', async () => {
    mockFetchWithJson({
      data: {
        results: ['product-2', 'product-3', 'product-1'],
      },
    });

    const { quizHook, routerHook } = initHook();

    act(() => {
      quizHook.result.current.onNext('question-1', 'test-id-1');
    });

    act(() => {
      quizHook.result.current.onNext();
    });

    act(() => {
      quizHook.result.current.onNext('question-3', 'test-id-3');
    });

    act(() => {
      // This onNext call takes place in the last question so it
      // will trigger a request to /api/get-quiz-results for the quiz results
      quizHook.result.current.onNext('question-4', 'Dohn Joe');
    });

    await routerHook.waitFor(() => {
      // After we get back the quiz results, we expect the hook to navigate (router.push) to
      // the quiz results page containing customer's name (based on the field with isCustomerName = true)
      // and the list of products resulted from /api/get-quiz-results
      expect(routerHook.result.current.asPath).toBe(
        '/quiz/630ddaa582a31b003ec13429/results?name=Dohn Joe&products=product-2,product-3,product-1',
      );
    });
  });
});

describe('getAnswersWithSelections', () => {
  it('returns correct array of selections based on answers', () => {
    const stateAnswers = new Map();
    stateAnswers.set('question-1', 'test-id-1');
    stateAnswers.set('question-3', 'test-id-3');

    const expectedAnswersWithSelections = [
      {
        selection: [
          {
            id: '632841562c6153a573000004',
            points: 25,
            productSelection: [
              {
                slug: 'product-2',
                model: 'products',
              },
              {
                slug: 'product-3',
                model: 'products',
              },
              {
                slug: 'product-4',
                model: 'products',
              },
              {
                slug: 'category-2',
                model: 'categories',
              },
            ],
          },
          {
            id: '632841622c6153a573000005',
            points: 20,
            productSelection: [
              {
                slug: 'product-5',
                model: 'products',
              },
              {
                slug: 'product-6',
                model: 'products',
              },
              {
                slug: 'product-7',
                model: 'products',
              },
            ],
          },
        ],
      },
      {
        selection: [
          {
            id: '6328189027e0769e7a000004',
            points: 35,
            productSelection: [
              {
                slug: 'product-3',
                model: 'products',
              },
              {
                slug: 'product-2',
                model: 'products',
              },
              {
                slug: 'product-1',
                model: 'products',
              },
            ],
          },
        ],
      },
    ];

    const answersWithSelections = getAnswersWithSelections(
      stateAnswers,
      quiz as QuizPageProps,
    );

    expect(answersWithSelections).toStrictEqual(expectedAnswersWithSelections);
  });
});
