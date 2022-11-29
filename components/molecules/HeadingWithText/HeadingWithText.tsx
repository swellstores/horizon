import React from 'react';
import Image from 'components/atoms/SafeImage';
import RichText from 'components/atoms/RichText';
import useClassNames from 'hooks/useClassNames';
import {
  BACKGROUND_POSITION_MAP,
  ALIGN_CLASS_MAP,
  TEXT_ALIGNMENT_MAP,
} from 'utils/classMappings';
import {
  HORIZONTAL_ALIGNMENT,
  VERTICAL_ALIGNMENT,
  TEXT_ALIGNMENT,
} from 'types/shared/alignment';
import {
  SECTION_PADDING_MAP,
  SECTION_VERTICAL_PADDING_MAP,
} from 'lib/globals/sizings';
import type { MandatoryImageProps } from 'types/global';
import { layoutFillConfig } from 'lib/utils/image';
import { BUTTON_STYLE, BUTTON_TYPE, CTAOptions } from 'types/shared/button';
import Button from 'components/atoms/Button';
import type {
  ContentBlockComponent,
  PageSectionSpacing,
} from 'types/shared/sections';
import AnchorButton from 'components/atoms/AnchorButton';

export enum TEXT_LAYOUT {
  SINGLE_COLUMN = 'single_column',
  DUAL_COLUMN = 'dual_column',
}

export interface HeadingWithTextProps extends PageSectionSpacing {
  image?: MandatoryImageProps;
  label?: string;
  title?: string;
  description?: string;
  text_color?: string;
  title_alignment?: TEXT_ALIGNMENT;
  text_alignment?: TEXT_ALIGNMENT;
  text_layout?: TEXT_LAYOUT;
  horizontal_alignment?: HORIZONTAL_ALIGNMENT;
  background_color?: string;
  background_image?: MandatoryImageProps;
  horizontal_background_position?: HORIZONTAL_ALIGNMENT;
  vertical_background_position?: VERTICAL_ALIGNMENT;
  overlay_opacity?: number;
  cta?: CTAOptions;
  className?: string;
  containerClassName?: string;
}

const HeadingWithText: ContentBlockComponent<HeadingWithTextProps> = ({
  image,
  label,
  title,
  description,
  text_color,
  title_alignment = TEXT_ALIGNMENT.LEFT,
  text_alignment = TEXT_ALIGNMENT.LEFT,
  text_layout = TEXT_LAYOUT.DUAL_COLUMN,
  horizontal_alignment = HORIZONTAL_ALIGNMENT.LEFT,
  background_color,
  background_image,
  horizontal_background_position = HORIZONTAL_ALIGNMENT.CENTER,
  vertical_background_position = VERTICAL_ALIGNMENT.CENTER,
  overlay_opacity = 50,
  cta,
  className,
  containerClassName,
  horizontal_spacing,
  vertical_spacing,
}) => {
  const backgroundPositionClass =
    BACKGROUND_POSITION_MAP[vertical_background_position][
      horizontal_background_position
    ];
  const horizontalAlignmentClass = ALIGN_CLASS_MAP[horizontal_alignment];
  const hasMultipleElements = !!(label || title || description) && !!cta;

  const contentClassNames = useClassNames(
    'relative flex flex-col text-5xl text-primary',
    {
      // TODO: Handle this better when we have
      // all possible content variations: text,button,action input
      'lg:items-center lg:flex-row lg:justify-between': hasMultipleElements,
    },
    horizontalAlignmentClass,
    SECTION_PADDING_MAP[horizontal_spacing],
    SECTION_VERTICAL_PADDING_MAP[vertical_spacing],
    className ?? '',
  );

  const textClassNames = useClassNames('relative flex flex-col gap-4', {
    'w-full': text_layout === TEXT_LAYOUT.DUAL_COLUMN,
    'w-full lg:w-1/2': text_layout === TEXT_LAYOUT.SINGLE_COLUMN,
  });

  return (
    <section className={containerClassName}>
      <div className={contentClassNames} style={{ color: text_color }}>
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
        <div className={textClassNames}>
          {image && <Image {...image} alt={image.alt} />}
          {label && (
            <RichText
              className={`text-sm ${TEXT_ALIGNMENT_MAP[title_alignment]}`}
              content={label}
            />
          )}
          {title && (
            <RichText
              className={`font-headings text-2xl lg:text-5xl ${TEXT_ALIGNMENT_MAP[title_alignment]}`}
              content={title}
            />
          )}
          {description && (
            <RichText
              content={description}
              className={`text-xl lg:text-2xl ${TEXT_ALIGNMENT_MAP[text_alignment]}`}
            />
          )}
        </div>
        <div className="relative">
          {cta &&
            (cta.style === BUTTON_STYLE.ANCHOR ? (
              <AnchorButton
                elType={BUTTON_TYPE.LINK}
                href={cta.link}
                label={cta.label}
                className="mt-8 w-full text-center lg:mt-0 lg:w-auto"
              />
            ) : (
              <Button
                elType={BUTTON_TYPE.LINK}
                href={cta.link}
                buttonStyle={BUTTON_STYLE.SECONDARY}
                className="mt-8 w-full text-center lg:mt-0 lg:w-auto">
                {cta.label}
              </Button>
            ))}
        </div>
      </div>
    </section>
  );
};

HeadingWithText.propMaps = {
  image: 'mapImage',
  background_image: 'mapImage',
};

export default HeadingWithText;
