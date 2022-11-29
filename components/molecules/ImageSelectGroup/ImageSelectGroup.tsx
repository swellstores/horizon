import React from 'react';
import useClassNames from 'hooks/useClassNames';
import { isChecked } from 'utils/quiz';
import CardCheckbox from 'components/atoms/ImageSelectCard';

import type { ImageSelectCardProps } from 'components/atoms/ImageSelectCard/ImageSelectCard';
import type { Answer } from 'types/shared/quiz';
import type { Maybe } from 'lib/graphql/generated/sdk';

export interface ImageSelectInputConfigProps {
  /**
   * Options for the card checkboxes
   */
  options?: Array<ImageSelectCardProps>;
  /**
   * Number of columns for desktop view (2-4)
   */
  columns?: Maybe<number>;
}

export interface ImageSelectGroupProps extends ImageSelectInputConfigProps {
  /**
   * Additional classes to be added to the container
   */
  containerClassName?: string;
  /**
   * Input value
   */
  value: Answer;
  /**
   * Is the select group a multiple choice one?
   */
  isMultipleChoice?: boolean;
  /**
   * Function that handles change of input
   */
  onChange: (newAnswer: string) => void;
}

const ImageSelectGroup: React.FC<ImageSelectGroupProps> = ({
  options,
  columns,
  containerClassName,
  value,
  isMultipleChoice,
  onChange,
}) => {
  const classes = useClassNames(
    'flex flex-col items-center justify-center gap-y-4',
    'lg:flex-row lg:flex-wrap lg:gap-6',
    containerClassName,
    {
      'lg:w-[calc(2*220px+1*24px)]': columns === 2,
      'lg:w-[calc(3*220px+2*24px)]': columns === 3,
      'lg:w-[calc(4*220px+3*24px)]': columns === 4,
    },
  );

  return (
    <div className={classes}>
      {options?.map((option) => (
        <CardCheckbox
          key={`${option.id}-component`}
          {...option}
          checked={isChecked(value, option.id)}
          onChange={() => onChange(option.id)}
          type={isMultipleChoice ? 'checkbox' : 'radio'}
        />
      ))}
    </div>
  );
};

export default ImageSelectGroup;
