import type { NextRouter } from 'next/router';
import { useCallback, useEffect, useRef } from 'react';

const RESULTS_PAGE_PATH = 'results_page.0';
const QUIZZES_MODEL = 'content/quizzes';

const useLiveEditorQuizResultsNavigation = (
  quizId: string,
  router: NextRouter,
) => {
  const mounted = useRef(false);

  const handler = useCallback(
    async (e: MessageEvent) => {
      const data = e.data as
        | {
            details?: {
              path?: string;
              model?: string;
            };
            id: number;
            type: string;
          }
        | undefined;

      if (!data) return;

      switch (data.type) {
        case 'collection_item.hide':
          if (
            data?.details?.path === RESULTS_PAGE_PATH &&
            data?.details?.model === QUIZZES_MODEL
          ) {
            router.push(`/quiz/${quizId}`);
          }
      }
    },
    [router, quizId],
  );

  const setUpListener = useCallback(
    async (handler: (e: MessageEvent) => void) => {
      if (mounted.current) {
        window.addEventListener('message', handler);
      }
    },
    [],
  );

  // Set up the message listener for live content updates in the editor (disabled in production)
  useEffect(() => {
    // Disable the listener in production for better performance
    if (process.env.NEXT_PUBLIC_SWELL_EDITOR !== 'true') return;

    mounted.current = true;

    setUpListener(handler);

    return () => {
      mounted.current = false;
      window.removeEventListener('message', handler);
    };
  }, [handler, setUpListener]);
};

export default useLiveEditorQuizResultsNavigation;
