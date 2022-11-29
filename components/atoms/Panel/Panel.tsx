import React from 'react';
import {
  HORIZONTAL_ALIGNMENT,
  OBJECT_FIT,
  VERTICAL_ALIGNMENT,
} from 'types/shared/alignment';
import { JUSTIFY_CLASS_MAP } from 'utils/classMappings';
import useClassNames from 'hooks/useClassNames';
import ImagePanel from './ImagePanel';
import TextPanel from './TextPanel';
import type { MandatoryImageProps } from 'types/global';
import type { EditorArray } from 'types/editor';
import type { CTAOptions } from 'types/shared/button';
import type { SPACING } from 'lib/globals/sizings';

export enum PANEL_TYPE {
  IMAGE = 'image',
  TEXT = 'text',
}

export enum FONT_SIZE {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

interface BaseProps {
  className?: string;
  type: PANEL_TYPE;
}

export interface PanelImageProps extends BaseProps {
  image: MandatoryImageProps;
  type: PANEL_TYPE.IMAGE;
}

export interface PanelTextProps extends BaseProps {
  title?: string;
  description?: string;
  links?: EditorArray<CTAOptions>;
  type: PANEL_TYPE.TEXT;
  background_color?: string;
  image_scaling?: OBJECT_FIT;
  background_image?: MandatoryImageProps;
  overlay_opacity?: number;
  horizontalAlignment?: HORIZONTAL_ALIGNMENT;
  verticalAlignment?: VERTICAL_ALIGNMENT;
  horizontal_background_alignment?: HORIZONTAL_ALIGNMENT;
  vertical_background_alignment?: VERTICAL_ALIGNMENT;
  horizontal_spacing?: SPACING;
  vertical_spacing?: SPACING;
  content_gap?: SPACING;
}

export type PanelProps = PanelTextProps | PanelImageProps;

const Panel: React.FC<PanelProps> = ({ ...props }) => {
  const verticalAlignmentClass =
    props.type === PANEL_TYPE.TEXT
      ? JUSTIFY_CLASS_MAP[props.verticalAlignment ?? VERTICAL_ALIGNMENT.CENTER]
      : '';

  const classNames = useClassNames(
    'flex w-full flex-col overflow-hidden',
    verticalAlignmentClass,
    props.className,
  );

  return (
    <section className={classNames}>
      {props.type === PANEL_TYPE.IMAGE ? (
        <ImagePanel {...props} />
      ) : (
        <TextPanel {...props} />
      )}
    </section>
  );
};

export default Panel;
