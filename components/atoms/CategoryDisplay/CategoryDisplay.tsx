import React from 'react';
import Image from 'components/atoms/SafeImage';
import Link from 'next/link';
import RichText from 'components/atoms/RichText';
import type { MandatoryImageProps } from 'types/global';
import { layoutFillConfig } from 'lib/utils/image';

export interface CategoryDisplayProps
  extends React.HTMLAttributes<HTMLDivElement> {
  image: MandatoryImageProps;
  title: string;
  description?: string;
  href: string;
}

const CategoryDisplay: React.FC<CategoryDisplayProps> = ({
  description,
  image,
  title,
  href,
  ...props
}) => (
  <div
    {...props}
    className={`flex flex-col space-y-4 overflow-visible ${props.className}`}>
    <Link href={href}>
      <a className="safe-aspect-4-3 relative overflow-hidden">
        <Image
          {...image}
          {...layoutFillConfig}
          alt={image.alt}
          className={`rounded-image ${image.className}`}
          objectFit="cover"
        />
      </a>
    </Link>
    <div className="flex flex-col space-y-1">
      <Link href={href}>
        <a>
          <h4 className="font-headings text-md font-semibold text-primary line-clamp-2">
            {title}
          </h4>
        </a>
      </Link>
      {description && (
        <RichText
          className="block text-sm text-body line-clamp-2"
          content={description}
        />
      )}
    </div>
  </div>
);

export default CategoryDisplay;
