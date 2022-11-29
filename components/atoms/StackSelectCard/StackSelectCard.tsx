import useClassNames from 'hooks/useClassNames';
import React from 'react';
import type { SelectOption } from 'types/shared/quiz';

export type StackSelectCardProps = React.InputHTMLAttributes<HTMLInputElement> &
  SelectOption;

const StackSelectCard: React.FC<StackSelectCardProps> = ({
  label,
  checked,
  id,
  onChange,
  ...props
}) => {
  return (
    <article
      className={useClassNames(
        'all-ease-in-out-400 relative h-14 w-full max-w-[342px] rounded-lg border bg-background-primary',
        'lg:w-[342px]',
        {
          'border-transparent shadow-3xl': !checked,
          'border-primary': !!checked,
        },
      )}>
      <label
        htmlFor={id}
        className="z-[2] flex h-full w-full cursor-pointer items-center gap-x-4 pl-6">
        <div
          className={useClassNames(
            'flex h-5 w-5 items-center justify-center rounded-md border',
            {
              'border-input-standard': !checked,
              'border-primary': !!checked,
            },
          )}>
          <span
            className={useClassNames('all-ease-in-out-400 h-3 w-3 rounded-sm', {
              'bg-primary': !!checked,
            })}></span>
        </div>
        <span>{label}</span>
        <input
          type="radio"
          {...props}
          id={id}
          name={id}
          onChange={onChange}
          checked={checked}
          className="absolute top-0 left-0 opacity-0"
        />
      </label>
    </article>
  );
};

export default StackSelectCard;
