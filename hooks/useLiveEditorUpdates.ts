import { useCallback, useEffect, useRef, useState } from 'react';
import { setProperty } from 'lib/utils/shared_functions';
import { mapSectionProps, PageSection } from 'lib/editor/sections';
import getGQLClient from 'lib/graphql/client';

const useLiveEditorUpdates = (sections: PageSection[]) => {
  const [liveSections, setLiveSections] = useState(sections);
  const mounted = useRef(false);

  const contentUpdatedHandler = useCallback(
    async (path: string, value: Record<string, unknown>) => {
      // Get the original (not mapped) props
      const originalProps = liveSections.map((section) => ({
        id: section.id,
        type: section.type,
        ...section._originalProps,
      }));

      const newSections = setProperty({ sections: originalProps }, path, value)
        .sections as PageSection[];

      const mappedProps = await mapSectionProps(newSections);

      if (!mounted.current) return;

      setLiveSections([...mappedProps]);
    },
    [liveSections],
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
      let slug = window.location.pathname.split('/').pop();

      if (!slug) {
        const client = getGQLClient();
        const {
          data: { storeSettings },
        } = await client.getStoreSettings();

        slug = storeSettings?.store?.homePage ?? 'home';
      }

      if (mounted.current && slug) {
        window.addEventListener('message', handler);
      }
    },
    [],
  );

  // Update the state every time the sections parameter changes
  useEffect(() => {
    setLiveSections(sections);
  }, [sections]);

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

  return liveSections;
};

export default useLiveEditorUpdates;
