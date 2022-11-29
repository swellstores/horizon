import { useCallback, useEffect, useRef, useState } from 'react';
import { setProperty } from 'lib/utils/shared_functions';
import type { QuizEditorProps } from 'types/shared/quiz';
import { mapQuizProps } from 'lib/editor/quiz';
import type { QuizPageProps } from 'pages/quiz/[id]';

const useLiveEditorQuizUpdates = (quiz: QuizPageProps) => {
  const [liveQuiz, setLiveQuiz] = useState(quiz);
  const mounted = useRef(false);

  const contentUpdatedHandler = useCallback(
    (path: string, value: Record<string, unknown>) => {
      // Get the original (not mapped) props
      const originalQuiz = liveQuiz.originalQuiz;

      const newQuiz = setProperty(
        originalQuiz,
        path,
        value,
      ) as unknown as QuizEditorProps;

      const mappedProps = mapQuizProps(newQuiz);

      if (!mounted.current) return;

      setLiveQuiz({ ...mappedProps });
    },
    [liveQuiz],
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
          if (data.details?.path && data.details.value) {
            contentUpdatedHandler(data.details.path, data.details?.value);
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

  return liveQuiz;
};

export default useLiveEditorQuizUpdates;
