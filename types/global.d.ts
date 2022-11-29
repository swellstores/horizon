import type { ImageProps } from 'next/image';

export interface MandatoryImageProps extends ImageProps {
  alt: string;
  width: string | number;
  height: string | number;
}

export interface ILink {
  label: string;
  link: string;
}
