import React, { useCallback } from 'react';
import Image from 'components/atoms/SafeImage';
import RichText from 'components/atoms/RichText';
import Button from 'components/atoms/Button';
import AnchorButton from 'components/atoms/AnchorButton';
import { BUTTON_STYLE, BUTTON_TYPE, CTAOptions } from 'types/shared/button';
import {
  ALIGN_CLASS_MAP,
  BACKGROUND_POSITION_MAP,
  TEXT_ALIGNMENT_MAP,
} from 'utils/classMappings';
import {
  HORIZONTAL_ALIGNMENT,
  VERTICAL_ALIGNMENT,
} from 'types/shared/alignment';
import { SECTION_PADDING_MAP, SPACING } from 'lib/globals/sizings';
import type { MandatoryImageProps } from 'types/global';
import { layoutFillConfig } from 'lib/utils/image';
import type { ContentBlockComponent } from 'types/shared/sections';
import type { EditorArray } from 'types/editor';

export interface FullWidthMediaProps {
  title?: string;
  description?: string;
  links?: EditorArray<CTAOptions>;
  text_color?: string;
  horizontal_spacing?: SPACING;
  vertical_spacing?: SPACING;
  background_color?: string;
  background_image?: MandatoryImageProps;
  horizontal_background_alignment?: HORIZONTAL_ALIGNMENT;
  vertical_background_alignment?: VERTICAL_ALIGNMENT;
  horizontal_content_alignment?: HORIZONTAL_ALIGNMENT;
  vertical_content_alignment?: VERTICAL_ALIGNMENT;
  overlay_opacity?: number;
}

const contentHeightMap = {
  [SPACING.EXTRA_LARGE]: {
    [VERTICAL_ALIGNMENT.CENTER]: 'pt-50 pb-40',
    [VERTICAL_ALIGNMENT.BOTTOM]: 'pt-90 pb-0',
    [VERTICAL_ALIGNMENT.TOP]: 'pt-0 pb-90',
  },
  [SPACING.LARGE]: {
    [VERTICAL_ALIGNMENT.CENTER]: 'pt-40 pb-30',
    [VERTICAL_ALIGNMENT.BOTTOM]: 'pt-70 pb-0',
    [VERTICAL_ALIGNMENT.TOP]: 'pt-0 pb-70',
  },
  [SPACING.MEDIUM]: {
    [VERTICAL_ALIGNMENT.CENTER]: 'pt-30 pb-20',
    [VERTICAL_ALIGNMENT.BOTTOM]: 'pt-50 pb-0',
    [VERTICAL_ALIGNMENT.TOP]: 'pt-0 pb-50',
  },
  [SPACING.SMALL]: {
    [VERTICAL_ALIGNMENT.CENTER]: 'pt-12 pb-10',
    [VERTICAL_ALIGNMENT.BOTTOM]: 'pt-22 pb-0',
    [VERTICAL_ALIGNMENT.TOP]: 'pt-0 pb-22',
  },
  [SPACING.NONE]: {
    [VERTICAL_ALIGNMENT.CENTER]: '',
    [VERTICAL_ALIGNMENT.BOTTOM]: '',
    [VERTICAL_ALIGNMENT.TOP]: '',
  },
};

const FullWidthMedia: ContentBlockComponent<FullWidthMediaProps> = ({
  title = '',
  description = '',
  links = [],
  text_color,
  horizontal_spacing = SPACING.MEDIUM,
  vertical_spacing = SPACING.MEDIUM,
  background_color,
  background_image,
  horizontal_background_alignment = HORIZONTAL_ALIGNMENT.CENTER,
  vertical_background_alignment = VERTICAL_ALIGNMENT.CENTER,
  horizontal_content_alignment = HORIZONTAL_ALIGNMENT.CENTER,
  vertical_content_alignment = VERTICAL_ALIGNMENT.CENTER,
  overlay_opacity = 50,
}) => {
  const horizontalSpacingClass = SECTION_PADDING_MAP[horizontal_spacing];
  const verticalSpacingClass =
    contentHeightMap[vertical_spacing][vertical_content_alignment];
  const horizontalAlignmentClass =
    TEXT_ALIGNMENT_MAP[horizontal_content_alignment];

  const verticalAlignmentClass = ALIGN_CLASS_MAP[vertical_content_alignment];
  const backgroundPositionClass =
    BACKGROUND_POSITION_MAP[vertical_background_alignment][
      horizontal_background_alignment
    ];

  const classNames = [
    'flex relative w-full',
    horizontalAlignmentClass,
    verticalAlignmentClass,
    horizontalSpacingClass,
    verticalSpacingClass,
  ].join(' ');

  const renderButton = useCallback((cta: typeof links[number]) => {
    switch (cta.style) {
      case BUTTON_STYLE.SECONDARY:
        return (
          <Button
            className="mt-8"
            buttonStyle={BUTTON_STYLE.SECONDARY}
            elType={BUTTON_TYPE.LINK}
            href={cta.link}>
            {cta.label}
          </Button>
        );
      case BUTTON_STYLE.ANCHOR:
        return (
          <AnchorButton
            className="mt-8"
            elType={BUTTON_TYPE.LINK}
            label={cta.label}
            href={cta.link}
          />
        );
      default:
        return (
          <Button className="mt-8" elType={BUTTON_TYPE.LINK} href={cta.link}>
            {cta.label}
          </Button>
        );
    }
  }, []);

  return (
    <section className={classNames}>
      {background_image && (
        <Image
          className={`absolute inset-0 object-cover ${backgroundPositionClass}`}
          {...background_image}
          {...layoutFillConfig}
          alt={background_image.alt}
        />
      )}
      {background_color && (
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: background_color,
            opacity: `${overlay_opacity}%`,
          }}
        />
      )}
      <div className="relative w-full">
        {title && (
          <RichText
            className="w-full font-headings text-5xl font-semibold text-background-primary lg:text-7xl"
            style={text_color ? { color: text_color } : undefined}
            content={title}
          />
        )}
        {description && (
          <RichText
            className="mt-4 text-xl text-background-primary lg:text-2xl"
            style={text_color ? { color: text_color } : undefined}
            content={description}
          />
        )}
        {links.map((cta) => (
          <div key={cta.id}>{renderButton(cta)}</div>
        ))}
      </div>
    </section>
  );
};

FullWidthMedia.propMaps = {
  background_image: 'mapImage',
};

export default FullWidthMedia;
