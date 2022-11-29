import React from 'react';
import Image from 'components/atoms/SafeImage';
import Link from 'next/link';
import RichText from '../RichText';
import type { MandatoryImageProps } from 'types/global';
import useClassNames from 'hooks/useClassNames';
import { IMAGE_LAYOUT } from 'lib/globals/sizings';
import { layoutFillConfig } from 'lib/utils/image';

export interface CategoryPreviewCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  image: MandatoryImageProps;
  title: string;
  description?: string;
  href: string;
  preserveScroll?: boolean;
  scaleOnHover?: boolean;
  isActive?: boolean;
  showDescription?: boolean;
  imageLayout?: IMAGE_LAYOUT;
}

const CategoryPreviewCard: React.FC<CategoryPreviewCardProps> = ({
  description,
  image,
  title,
  href,
  preserveScroll,
  scaleOnHover = false,
  isActive = false,
  showDescription = true,
  imageLayout = IMAGE_LAYOUT.PORTRAIT,
  ...props
}) => {
  const imageClassNames = useClassNames(
    'transition-transform duration-500',
    image.className,
    {
      'scale-110': isActive,
      'hover:scale-105': scaleOnHover && !isActive,
    },
  );

  const imageContainerClassNames = useClassNames(
    'overflow-hidden relative rounded-image',
    {
      'safe-aspect-square': imageLayout === IMAGE_LAYOUT.SQUARE,
      'safe-aspect-portrait': imageLayout === IMAGE_LAYOUT.PORTRAIT,
    },
  );

  return (
    <div
      {...props}
      className={[
        'flex min-w-[54vw] flex-col space-y-2 overflow-visible lg:min-w-0 lg:space-y-6',
        props.className,
      ].join(' ')}>
      <Link href={href} scroll={!preserveScroll}>
        <a className={imageContainerClassNames}>
          <Image
            {...image}
            {...layoutFillConfig}
            alt={image.alt}
            className={imageClassNames}
            objectFit="cover"
          />
        </a>
      </Link>
      <div className="flex flex-col lg:space-y-2">
        <Link href={href}>
          <a>
            <h4 className="font-headings text-lg font-semibold text-primary">
              {title}
            </h4>
          </a>
        </Link>
        {showDescription && description && (
          <RichText
            className="hidden lg:block lg:text-sm lg:text-body"
            content={description}
          />
        )}
      </div>
    </div>
  );
};

export default CategoryPreviewCard;
