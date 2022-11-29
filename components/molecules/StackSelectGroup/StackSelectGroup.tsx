import React from 'react';
import { isChecked } from 'utils/quiz';
import StackCheckbox from 'components/atoms/StackSelectCard';

import type { StackSelectCardProps } from 'components/atoms/StackSelectCard/StackSelectCard';
import type { Answer } from 'types/shared/quiz';

export interface StackSelectInputConfigProps {
  /**
   * Options for the stack checkboxes
   */
  options?: Array<StackSelectCardProps>;
}

export interface StackSelectGroupProps extends StackSelectInputConfigProps {
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

const StackSelectGroup: React.FC<StackSelectGroupProps> = ({
  options,
  containerClassName,
  value,
  isMultipleChoice,
  onChange,
}) => {
  return (
    <div
      className={[
        'flex flex-col items-center gap-y-6',
        containerClassName,
      ].join(' ')}>
      {options?.map((option) => (
        <StackCheckbox
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

export default StackSelectGroup;
