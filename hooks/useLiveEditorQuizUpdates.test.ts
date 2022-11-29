import { renderHook } from '@testing-library/react-hooks';
import type { QuizPageProps } from 'pages/quiz/[id]';
import useLiveEditorQuizUpdates from './useLiveEditorQuizUpdates';
import { fireEvent } from '@testing-library/react';
import { enableEditor } from 'utils/test/editor';

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
            id: '632c287177e00ae32e1387b9',
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
            id: '632c2871d83073dff18935b9',
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
            id: '632c2871b50145fbf8aeab95',
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
            id: '632c287182100d34fa92a1cb',
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
        id: '632c2871e720d27545cf6285',
      },
      required: true,
      answerType: 'string',
      isCustomerName: true,
    },
  ],
  originalQuiz: {
    id: '630ddaa582a31b003ec13429',
    name: 'Test',
    questions: [
      {
        id: 'test-question',
        type: 'quiz_question',
        question_prompt: 'What is your name?',
      },
    ],
  },
};

describe('useLiveEditorQuizUpdates', () => {
  enableEditor();
  it('returns correct initial state', () => {
    const { result } = renderHook(() =>
      useLiveEditorQuizUpdates(quiz as QuizPageProps),
    );

    expect(result.current).toStrictEqual(quiz);
  });

  it('returns correct data after a content.updated message event on specific path', () => {
    const { result } = renderHook(() =>
      useLiveEditorQuizUpdates(quiz as QuizPageProps),
    );

    fireEvent(
      window,
      new MessageEvent('message', {
        data: {
          details: {
            id: '630ddaa582a31b003ec13429',
            model: 'content/quizzes',
            path: 'questions.0',
            value: {
              id: 'test-question',
              type: 'quiz_question',
              question_prompt: 'How old are you?',
            },
          },
          id: 1,
          type: 'content.updated',
        },
      }),
    );

    expect(result.current).toStrictEqual({
      id: '630ddaa582a31b003ec13429',
      totalQuestions: 1,
      title: 'Test',
      questions: [
        {
          id: 'test-question',
          nextButtonLabel: '',
          seeResultsLabel: '',
          isLastQuestion: true,
          type: 'quiz_question',
          question: 'How old are you?',
          inputInfo: '',
          note: '',
          questionType: '',
          questionLayoutType: '',
          inputConfig: {},
          required: false,
          answerType: 'string',
          isCustomerName: false,
        },
      ],
      originalQuiz: {
        id: '630ddaa582a31b003ec13429',
        name: 'Test',
        questions: [
          {
            id: 'test-question',
            type: 'quiz_question',
            question_prompt: 'How old are you?',
          },
        ],
      },
    });
  });
});
