import React from 'react';
import Image from 'components/atoms/SafeImage';
import type { MandatoryImageProps } from 'types/global';
import { layoutFillConfig } from 'lib/utils/image';

export interface BlogDetailsHeaderProps {
  label: string;
  image: MandatoryImageProps;
}

const BlogDetailsHeader: React.FC<BlogDetailsHeaderProps> = ({
  label,
  image,
}) => (
  <div className="relative flex w-full justify-center py-56 lg:py-32">
    <Image
      className="absolute inset-0 object-cover object-center"
      {...layoutFillConfig}
      src={image.src}
      alt={image.alt}
    />
    <div className="z-10 mx-auto flex max-w-sm flex-col items-center gap-6 text-background-primary lg:gap-4">
      <h1 className="text-center font-headings text-5xl font-semibold">
        {label}
      </h1>
    </div>
  </div>
);

export default BlogDetailsHeader;
