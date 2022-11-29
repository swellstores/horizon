import React from 'react';
import useClassNames from 'hooks/useClassNames';
import { isChecked } from 'utils/quiz';
import GridCheckbox from 'components/atoms/GridSelectCard';

import type { GridSelectCardProps } from 'components/atoms/GridSelectCard';
import type { Answer } from 'types/shared/quiz';
import type { Maybe } from 'lib/graphql/generated/sdk';

export interface GridSelectInputConfigProps {
  /**
   * Options for the grid checkboxes
   */
  options?: Array<GridSelectCardProps>;
  /**
   * Number of columns for desktop view (2-4)
   */
  columns?: Maybe<number>;
}

export interface GridSelectGroupProps extends GridSelectInputConfigProps {
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

const GridSelectGroup: React.FC<GridSelectGroupProps> = ({
  options,
  columns,
  containerClassName,
  value,
  isMultipleChoice,
  onChange,
}) => {
  const classes = useClassNames(
    'flex flex-col items-center gap-y-4',
    'lg:grid lg:gap-6',
    containerClassName,
    {
      'lg:grid-cols-[repeat(2,220px)]': columns === 2,
      'lg:grid-cols-[repeat(3,220px)]': columns === 3,
      'lg:grid-cols-[repeat(4,220px)]': columns === 4,
    },
  );

  return (
    <div className={classes}>
      {options?.map((option) => (
        <GridCheckbox
          key={`${option.id}-component`}
          onChange={() => onChange(option.id)}
          {...option}
          checked={isChecked(value, option.id)}
          type={isMultipleChoice ? 'checkbox' : 'radio'}
        />
      ))}
    </div>
  );
};

export default GridSelectGroup;
