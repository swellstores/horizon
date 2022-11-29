import { applyQuizPropMappers } from 'lib/editor/quiz';
import { getComponentFromType, PageSection } from 'lib/editor/sections';
import React, { useMemo } from 'react';

const useQuizHeadingSection = (
  headingSection: PageSection | null,
  quizVariables: Record<string, string>,
) => {
  const section = useMemo(() => {
    if (!headingSection) {
      return null;
    }

    const { id, type, ...props } = headingSection;

    const Component = getComponentFromType(type);

    if (!Component) {
      return null;
    }

    const mappedProps = applyQuizPropMappers(Component, props, quizVariables);

    const newSectionProps = { id, type, ...props, ...mappedProps };

    return <Component {...newSectionProps} />;
  }, [headingSection, quizVariables]);

  return section;
};

export default useQuizHeadingSection;
