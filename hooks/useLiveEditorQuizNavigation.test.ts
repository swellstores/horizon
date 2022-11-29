import { renderHook } from '@testing-library/react-hooks';
import { fireEvent } from '@testing-library/react';
import useLiveEditorQuizNavigation from './useLiveEditorQuizNavigation';
import { enableEditor } from 'utils/test/editor';
import { useMockRouter } from 'utils/test/next-router';
import { setupServer } from 'msw/lib/node';
import { graphQLHandler, GRAPHQL_OPERATION } from 'utils/test/handler';

const initHook = () => {
  const onIndexChange = jest.fn();
  const quizId = 'test';
  const routerHook = renderHook(() => useMockRouter());
  renderHook(() =>
    useLiveEditorQuizNavigation(
      onIndexChange,
      quizId,
      routerHook.result.current,
    ),
  );

  return { routerHook, onIndexChange };
};

const defaultHandlerData = {
  products: {
    results: [
      {
        slug: 'test-product-1',
      },
      {
        slug: 'test-product-2',
      },
      {
        slug: 'test-product-3',
      },
    ],
  },
};
const handler = graphQLHandler(
  'getFilteredSortedProducts',
  GRAPHQL_OPERATION.QUERY,
  defaultHandlerData,
);

const server = setupServer(handler());

describe('useLiveEditorQuizNavigation', () => {
  beforeAll(() => {
    server.listen();
  });
  afterAll(() => {
    server.close();
  });

  enableEditor();

  it('calls onIndexChange function with the correct argument when a question is selected in the editor', () => {
    const { onIndexChange } = initHook();

    fireEvent(
      window,
      new MessageEvent('message', {
        data: {
          details: {
            path: 'questions.3.answers.0',
          },
          id: 1,
          type: 'content.selected',
        },
      }),
    );

    // On content.selected it should pick the index of the question
    // from details.path and call the callback function with that index
    expect(onIndexChange).toHaveBeenCalledWith(3);
  });

  it('redirects to quiz results page when results page is selected in the editor', async () => {
    const { routerHook } = initHook();

    fireEvent(
      window,
      new MessageEvent('message', {
        data: {
          details: {
            path: 'results_page.0',
          },
          id: 1,
          type: 'content.selected',
        },
      }),
    );

    await routerHook.waitFor(() => {
      expect(routerHook.result.current.asPath).toBe(
        '/quiz/test/results?name=Emily&products=test-product-1,test-product-2,test-product-3',
      );
    });
  });
});
