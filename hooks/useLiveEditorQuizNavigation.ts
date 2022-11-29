import getGQLClient from 'lib/graphql/client';
import { denullifyArray } from 'lib/utils/denullify';
import type { NextRouter } from 'next/router';
import { useCallback, useEffect, useRef } from 'react';

const QUIZ_QUESTION_PATH = 'questions.';
const QUIZ_RESULTS_PATH = 'results_page.';

/**
 * This hook detects content.selected event in the quiz and navigates to the selected question based on that
 * @param onIndexChange - function that should manually change the active index
 * @param quizId - id of the quiz
 */
const useLiveEditorQuizNavigation = (
  onIndexChange: (index: number) => void,
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
            };
            id: number;
            type: string;
          }
        | undefined;

      if (!data) return;

      switch (data.type) {
        case 'content.selected':
          if (data.details?.path?.startsWith(QUIZ_QUESTION_PATH)) {
            const quizItemIndex = Number(
              data.details?.path?.replace(QUIZ_QUESTION_PATH, '')[0],
            );

            onIndexChange(quizItemIndex);
          }

          if (
            data.details?.path?.startsWith(QUIZ_RESULTS_PATH) &&
            !router.pathname.includes(`quiz/${quizId}/results`)
          ) {
            // We want to display some products in the quiz results page when editing the content
            // so we fetch 3 most popular products
            const client = getGQLClient();
            const { data } = await client.getFilteredSortedProducts({
              filter: {},
              sort: 'popularity desc',
              limit: 3,
            });

            const productsSlugs = denullifyArray(
              (data?.products?.results || []).map((product) => product?.slug),
            );

            router.push(
              `/quiz/${quizId}/results?name=Emily&products=${productsSlugs.join(
                ',',
              )}`,
            );
          }
      }
    },
    [onIndexChange, router, quizId],
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

export default useLiveEditorQuizNavigation;
