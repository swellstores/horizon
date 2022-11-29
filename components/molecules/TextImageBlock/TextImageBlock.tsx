import RichText from 'components/atoms/RichText';
import useClassNames from 'hooks/useClassNames';
import { SECTION_MARGIN_MAP } from 'lib/globals/sizings';
import Image from 'components/atoms/SafeImage';
import React from 'react';
import type { MandatoryImageProps } from 'types/global';
import type {
  ContentBlockComponent,
  PageSectionSpacing,
} from 'types/shared/sections';

export enum DESKTOP_ALIGNMENT {
  IMAGE_LEFT = 'image_left',
  IMAGE_RIGHT = 'image_right',
}

interface TextImageBlockProps extends PageSectionSpacing {
  image: MandatoryImageProps;
  text: string;
  desktopAllignment: DESKTOP_ALIGNMENT;
}

const TextImageBlock: ContentBlockComponent<TextImageBlockProps> = ({
  image,
  text,
  desktopAllignment,
  horizontal_spacing: horizontalSpacing,
}) => {
  const classes = useClassNames(
    'flex flex-col gap-y-6',
    'lg:gap-x-18 lg:justify-center lg:items-center lg:flex-row',
    {
      'lg:flex-row': desktopAllignment === DESKTOP_ALIGNMENT.IMAGE_LEFT,
      'lg:flex-row-reverse':
        desktopAllignment === DESKTOP_ALIGNMENT.IMAGE_RIGHT,
    },
    SECTION_MARGIN_MAP[horizontalSpacing],
  );
  return (
    <section className={classes}>
      <div className="relative w-full lg:w-1/2 lg:max-w-[460px]">
        <Image
          {...image}
          layout="responsive"
          alt={image.alt}
          className="rounded-2xl"
        />
      </div>
      <RichText
        content={text}
        className="w-full text-5xl font-semibold text-primary lg:w-1/2 lg:max-w-[460px]"
      />
    </section>
  );
};

TextImageBlock.propMaps = {
  image: 'mapImage',
};

export default TextImageBlock;
