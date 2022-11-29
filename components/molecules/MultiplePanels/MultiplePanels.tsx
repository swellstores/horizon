import React from 'react';
import Panel, { PANEL_TYPE } from 'components/atoms/Panel';
import type { PanelProps } from 'components/atoms/Panel';
import type {
  ContentBlockComponent,
  PageSectionSpacing,
} from 'types/shared/sections';
import {
  SECTION_PADDING_MAP,
  SECTION_VERTICAL_PADDING_MAP,
  SPACING,
} from 'lib/globals/sizings';
import { joinClasses } from 'utils/className';
import {
  HORIZONTAL_ALIGNMENT,
  VERTICAL_ALIGNMENT,
} from 'types/shared/alignment';
import type { EditorArray } from 'types/editor';

export interface MultiplePanelsProps extends Partial<PageSectionSpacing> {
  panels?: EditorArray<PanelProps>;
  background_color?: string;
  horizontal_content_alignment?: HORIZONTAL_ALIGNMENT;
  vertical_content_alignment?: VERTICAL_ALIGNMENT;
  className?: string;
}

const MultiplePanels: ContentBlockComponent<MultiplePanelsProps> = ({
  panels = [],
  background_color,
  horizontal_spacing = SPACING.NONE,
  vertical_spacing = SPACING.NONE,
  horizontal_content_alignment = HORIZONTAL_ALIGNMENT.CENTER,
  vertical_content_alignment = VERTICAL_ALIGNMENT.CENTER,
  className,
}) => {
  const classNames = joinClasses(
    'bg-white grid',
    'lg:grid-cols-2',
    SECTION_PADDING_MAP[horizontal_spacing],
    SECTION_VERTICAL_PADDING_MAP[vertical_spacing],
    className ?? '',
  );

  return (
    <section
      style={{ backgroundColor: background_color }}
      className={classNames}>
      {panels.map((panel) => {
        if (panel.type === PANEL_TYPE.TEXT) {
          panel.horizontalAlignment = horizontal_content_alignment;
          panel.verticalAlignment = vertical_content_alignment;
        }

        return <Panel key={panel.id} {...panel} />;
      })}
    </section>
  );
};

MultiplePanels.propMaps = {
  panels: 'multiple_panels_mapPanels',
};

MultiplePanels.quizPropMaps = {
  panels: 'quiz_multiple_panels_mapPanels',
};

export default MultiplePanels;
