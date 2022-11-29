import Image, { ImageProps } from 'next/image';
import React from 'react';

export type SafeImageProps = ImageProps;

const SafeImage: React.FC<SafeImageProps> = (props) => (
  <Image
    {...props}
    alt={props.alt ?? ''}
    src={props.src || '/images/image_placeholder.svg'}
    {...(props.layout !== 'fill'
      ? { width: props.width ?? 0, height: props.height ?? 0 }
      : {})}
  />
);

export default SafeImage;
