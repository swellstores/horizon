import { useCallback, useEffect, useRef, useState } from 'react';
import { setProperty } from 'lib/utils/shared_functions';
import type { QuizEditorResultsPage } from 'types/shared/quiz';
import { mapQuizResultsProps } from 'lib/editor/quiz';
import type { QuizResultsPageProps } from 'pages/quiz/[id]/results';

const QUIZ_RESULTS_PAGE_PATH = 'results_page.0';

const useLiveEditorQuizResultsUpdates = (
  quiz: Omit<QuizResultsPageProps, 'quizId'>,
) => {
  const [liveQuizResultsPage, setLiveQuizResultsPage] = useState(quiz);
  const mounted = useRef(false);

  const contentUpdatedHandler = useCallback(
    async (path: string, value: Record<string, unknown>) => {
      if (!mounted.current) return;

      if (!path.length) {
        const mappedProps = await mapQuizResultsProps(
          value as unknown as QuizEditorResultsPage,
        );

        setLiveQuizResultsPage({ ...mappedProps });

        return;
      }
      // Get the original (not mapped) props
      const originalQuizResults = liveQuizResultsPage.originalQuizResults;

      const newQuizResults = setProperty(
        originalQuizResults,
        path,
        value,
      ) as unknown as QuizEditorResultsPage;

      const mappedProps = await mapQuizResultsProps(newQuizResults);

      setLiveQuizResultsPage({ ...mappedProps });
    },
    [liveQuizResultsPage],
  );

  const handler = useCallback(
    async (e: MessageEvent) => {
      const data = e.data as
        | {
            details?: {
              id?: string;
              model?: string;
              path?: string;
              value?: Record<string, unknown>;
            };
            id: number;
            type: string;
          }
        | undefined;

      if (!data) return;

      switch (data.type) {
        case 'content.updated':
          if (
            data.details?.path &&
            data.details.value &&
            data.details.path.startsWith(QUIZ_RESULTS_PAGE_PATH)
          ) {
            let parsedPath = data.details.path.replace(
              QUIZ_RESULTS_PAGE_PATH,
              '',
            );

            if (parsedPath.startsWith('.')) {
              parsedPath = parsedPath.substring(1);
            }

            contentUpdatedHandler(parsedPath, data.details?.value);
          }
      }
    },
    [contentUpdatedHandler],
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

  return liveQuizResultsPage;
};

export default useLiveEditorQuizResultsUpdates;
