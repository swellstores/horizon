import React from 'react';
import Feature, { FEATURE_IMAGE_SIZE } from 'components/atoms/Feature';
import type { FeatureProps } from 'components/atoms/Feature';
import type {
  ContentBlockComponent,
  PageSectionSpacing,
} from 'types/shared/sections';
import {
  SECTION_PADDING_MAP,
  SECTION_VERTICAL_PADDING_MAP,
  SPACING,
} from 'lib/globals/sizings';
import { BUTTON_STYLE, BUTTON_TYPE, CTAOptions } from 'types/shared/button';
import Button from 'components/atoms/Button';
import useClassNames from 'hooks/useClassNames';
import AnchorButton from 'components/atoms/AnchorButton';
import type { Namespaced } from 'types/utils';
import type { EditorArray } from 'types/editor';
import { HORIZONTAL_ALIGNMENT } from 'types/shared/alignment';
import RichText from 'components/atoms/RichText';

export interface MultipleFeaturesProps
  extends Partial<PageSectionSpacing>,
    Partial<Namespaced<CTAOptions, 'cta'>> {
  title?: string;
  description?: string;
  features?: EditorArray<FeatureProps>;
  horizontal_content_alignment?: HORIZONTAL_ALIGNMENT;
  background_color?: string;
  cardImageSize?: FEATURE_IMAGE_SIZE;
}

const MultipleFeatures: ContentBlockComponent<MultipleFeaturesProps> = ({
  title = '',
  description = '',
  features = [],
  cta_link = '#',
  cta_label,
  cta_style = BUTTON_STYLE.PRIMARY,
  horizontal_spacing = SPACING.NONE,
  vertical_spacing = SPACING.NONE,
  horizontal_content_alignment = HORIZONTAL_ALIGNMENT.CENTER,
  background_color,
  cardImageSize,
}) => (
  <section
    className={useClassNames(
      'flex flex-col items-center',
      SECTION_PADDING_MAP[horizontal_spacing],
      SECTION_VERTICAL_PADDING_MAP[vertical_spacing],
      {
        'text-left': horizontal_content_alignment === HORIZONTAL_ALIGNMENT.LEFT,
        'text-center':
          horizontal_content_alignment === HORIZONTAL_ALIGNMENT.CENTER,
        'text-right':
          horizontal_content_alignment === HORIZONTAL_ALIGNMENT.RIGHT,
      },
    )}
    style={
      background_color ? { backgroundColor: background_color } : undefined
    }>
    <h2 className="w-full font-headings text-5xl font-semibold text-primary">
      <RichText content={title} />
    </h2>

    {description && (
      <div className="mt-4 w-full text-2xl text-body">
        <RichText content={description} />
      </div>
    )}

    <ul
      className={useClassNames(
        'mt-12 grid gap-x-4 gap-y-10 lg:mt-14 lg:grid-cols-3 lg:gap-x-18 lg:gap-y-14',
        {
          'grid-cols-2': cardImageSize === FEATURE_IMAGE_SIZE.SMALL,
          'grid-cols-1': cardImageSize === FEATURE_IMAGE_SIZE.LARGE,
        },
      )}
      style={
        features.length < 3
          ? { gridTemplateColumns: `repeat(${features.length}, 1fr)` }
          : undefined
      }>
      {features.map((feature) => (
        <li key={feature.id}>
          <Feature {...feature} imageSize={cardImageSize} />
        </li>
      ))}
    </ul>

    {cta_label &&
      (cta_style === BUTTON_STYLE.ANCHOR ? (
        <AnchorButton
          elType={BUTTON_TYPE.LINK}
          href={cta_link ?? '#'}
          label={cta_label}
          className="mt-8 w-full text-center lg:mt-0 lg:w-auto"
        />
      ) : (
        <Button
          elType={BUTTON_TYPE.LINK}
          href={cta_link ?? '#'}
          buttonStyle={BUTTON_STYLE.SECONDARY}
          className="mt-8 w-full text-center lg:mt-0 lg:w-auto">
          {cta_label}
        </Button>
      ))}
  </section>
);

MultipleFeatures.propMaps = {
  features: 'multiple_features_mapFeatures',
};

export default MultipleFeatures;
