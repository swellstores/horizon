import Image from 'components/atoms/SafeImage';
import React, { useState } from 'react';
import type { MandatoryImageProps } from 'types/global';

export interface ImageThumbnailsProps
  extends Omit<React.HTMLAttributes<HTMLUListElement>, 'onChange'> {
  images: MandatoryImageProps[];
  imageSize: number;
  defaultValue?: number;
  value?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
}

const ImageThumbnails = React.forwardRef<
  HTMLUListElement,
  ImageThumbnailsProps
>(
  (
    {
      images,
      value: controlledValue,
      onChange,
      defaultValue = 0,
      disabled,
      imageSize,
      ...props
    },
    ref,
  ) => {
    const [current, setCurrent] = useState(defaultValue);

    const value = controlledValue ?? current;

    return (
      <ul
        ref={ref}
        {...props}
        className={['flex flex-col items-center gap-1', props.className].join(
          ' ',
        )}>
        {images.map((image, i) => (
          <li key={image.src.toString()}>
            <button
              disabled={disabled}
              onClick={() => {
                onChange?.(i);
                setCurrent(i);
              }}
              className={`relative border border-background-primary transition-opacity hover:opacity-100 disabled:hover:opacity-50 ${
                value === i
                  ? 'opacity-100 disabled:hover:opacity-100'
                  : 'opacity-50'
              }`}>
              {value === i && <div className="sr-only">(Current item)</div>}
              <div className="flex w-full items-center justify-center overflow-hidden">
                <Image
                  {...image}
                  width={imageSize}
                  height={imageSize}
                  alt={image.alt}
                  className={['object-cover', image.className].join(' ')}
                  layout="intrinsic"
                />
              </div>
            </button>
          </li>
        ))}
      </ul>
    );
  },
);

ImageThumbnails.displayName = 'ImageThumbnails';

export default ImageThumbnails;
