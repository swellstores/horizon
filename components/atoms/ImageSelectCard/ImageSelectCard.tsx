import React from 'react';
import Image from 'components/atoms/SafeImage';
import useClassNames from 'hooks/useClassNames';
import type { MandatoryImageProps } from 'types/global';
import { layoutFillConfig } from 'lib/utils/image';
import type { SelectOption } from 'types/shared/quiz';

export interface ImageSelectCardProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    SelectOption {
  /**
   * Card image
   */
  image: MandatoryImageProps;
  id: string;
}

const ImageSelectCard: React.FC<ImageSelectCardProps> = ({
  image,
  label,
  checked,
  id,
  onChange,
  ...props
}) => {
  const cardClasses = useClassNames(
    'relative flex h-28 w-full max-w-[342px] cursor-pointer items-center gap-x-4 rounded-lg border py-4 px-6 all-ease-in-out-400 bg-background-primary',
    'lg:h-[220px] lg:w-[220px] lg:flex-col lg:justify-between lg:gap-x-0 lg:py-[35px]',
    {
      'border-transparent shadow-3xl': !checked,
      'border-primary': !!checked,
    },
  );

  return (
    <label htmlFor={id} className={cardClasses}>
      <div className="relative z-[2] h-[80px] w-[80px] items-center justify-center lg:h-[100px] lg:w-[100px]">
        {image && (
          <Image
            objectFit="contain"
            {...image}
            priority
            alt={label}
            {...layoutFillConfig}
          />
        )}
      </div>
      {label && <span className="z-[2]">{label}</span>}
      <input
        type="radio"
        {...props}
        id={id}
        name={id}
        onChange={onChange}
        checked={checked}
        className="absolute top-0 left-0 h-full w-full cursor-pointer opacity-0"
      />
    </label>
  );
};

export default ImageSelectCard;
