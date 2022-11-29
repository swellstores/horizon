import { ReactNode, useMemo } from 'react';
import { getComponentFromType, PageSection } from 'lib/editor/sections';
import useLiveEditorUpdates from './useLiveEditorUpdates';

/**
 * Transforms the page sections array into a list of components
 * @param sections The array of page sections
 */
const usePageSections = (sections: PageSection[]): ReactNode[] => {
  const liveSections = useLiveEditorUpdates(sections);

  const pageSections = useMemo(
    () =>
      liveSections.map((section) => {
        const { type, id, ...props } = section;

        const SectionComponent = getComponentFromType(type);

        if (!SectionComponent) return null;

        return <SectionComponent key={id} {...props} />;
      }),
    [liveSections],
  );

  return pageSections;
};

export default usePageSections;
