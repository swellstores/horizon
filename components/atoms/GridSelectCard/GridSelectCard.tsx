import useClassNames from 'hooks/useClassNames';
import React from 'react';
import type { SelectOption } from 'types/shared/quiz';

export type GridSelectCardProps = React.InputHTMLAttributes<HTMLInputElement> &
  SelectOption;

const GridSelectCard: React.FC<GridSelectCardProps> = ({
  label,
  checked,
  id,
  onChange,
  ...props
}) => {
  const classNames = useClassNames(
    'all-ease-in-out-400 relative flex h-14 w-full max-w-[342px] items-center justify-center rounded-lg border bg-background-primary',
    'lg:w-[220px]',
    {
      'border-transparent shadow-3xl': !checked,
      'border-primary': !!checked,
    },
  );

  return (
    <article className={classNames}>
      <input
        type="radio"
        {...props}
        id={id}
        name={id}
        onChange={onChange}
        checked={checked}
        className="absolute top-0 left-0 z-[1] h-full w-full cursor-pointer opacity-0"
      />
      {label && (
        <label htmlFor={id} className="z-[2] cursor-pointer font-semibold">
          {label}
        </label>
      )}
    </article>
  );
};

export default GridSelectCard;
