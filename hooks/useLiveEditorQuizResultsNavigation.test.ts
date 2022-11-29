import { renderHook } from '@testing-library/react-hooks';
import { fireEvent } from '@testing-library/react';
import { enableEditor } from 'utils/test/editor';
import { useMockRouter } from 'utils/test/next-router';
import useLiveEditorQuizResultsNavigation from './useLiveEditorQuizResultsNavigation';

const initHook = () => {
  const onIndexChange = jest.fn();
  const quizId = 'test';
  const routerHook = renderHook(() => useMockRouter());
  renderHook(() =>
    useLiveEditorQuizResultsNavigation(quizId, routerHook.result.current),
  );

  return { routerHook, onIndexChange };
};

describe('useLiveEditorQuizNavigation', () => {
  enableEditor();

  it('redirects to quiz page when receiving a collection_item.hide', async () => {
    const { routerHook } = initHook();

    // This emulates the action of going back from results page collection item
    // to the main quiz page in the editor
    fireEvent(
      window,
      new MessageEvent('message', {
        data: {
          details: {
            path: 'results_page.0',
            model: 'content/quizzes',
          },
          id: 1,
          type: 'collection_item.hide',
        },
      }),
    );

    await routerHook.waitFor(() => {
      expect(routerHook.result.current.asPath).toBe('/quiz/test');
    });
  });
});
