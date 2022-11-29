import useClassNames from 'hooks/useClassNames';
import { layoutFillConfig } from 'lib/utils/image';
import Image from 'components/atoms/SafeImage';
import React from 'react';
import type { MandatoryImageProps } from 'types/global';
import { HORIZONTAL_ALIGNMENT } from 'types/shared/alignment';
import RichText from '../RichText';

export enum FEATURE_IMAGE_SIZE {
  SMALL = 'small',
  LARGE = 'large',
}

const FEATURE_IMAGE_CLASS_MAP = {
  [FEATURE_IMAGE_SIZE.SMALL]: 'w-15 h-15 lg:w-20 lg:h-20',
  [FEATURE_IMAGE_SIZE.LARGE]: 'w-30 h-30 lg:w-[180px] lg:h-[180px]',
};
export interface FeatureProps {
  image: MandatoryImageProps;
  imageSize?: FEATURE_IMAGE_SIZE;
  title: string;
  description?: string;
  content_alignment?: HORIZONTAL_ALIGNMENT;
}

const Feature: React.FC<FeatureProps> = ({
  image,
  imageSize = FEATURE_IMAGE_SIZE.SMALL,
  title,
  description,
  content_alignment = HORIZONTAL_ALIGNMENT.CENTER,
}) => (
  <div
    className={useClassNames('flex flex-col items-center', {
      'text-left': content_alignment === HORIZONTAL_ALIGNMENT.LEFT,
      'text-center': content_alignment === HORIZONTAL_ALIGNMENT.CENTER,
      'text-right': content_alignment === HORIZONTAL_ALIGNMENT.RIGHT,
    })}>
    <div className={['relative', FEATURE_IMAGE_CLASS_MAP[imageSize]].join(' ')}>
      <Image {...image} {...layoutFillConfig} alt={image.alt} />
    </div>
    <div className="mt-8 w-full font-headings text-xl text-primary lg:text-2xl">
      <RichText content={title} />
    </div>
    {description && (
      <div className="mt-4 w-full text-md text-body lg:text-xl">
        <RichText content={description} />
      </div>
    )}
  </div>
);

export default Feature;
