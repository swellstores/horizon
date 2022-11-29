import React from 'react';
import RadioIcon from 'assets/icons/radio.svg';
import useClassNames from 'hooks/useClassNames';
import type { PURCHASE_OPTION_TYPE } from 'types/shared/products';

interface RadioItemProps {
  id: string;
  name: string;
  value: PURCHASE_OPTION_TYPE;
  activeValue: PURCHASE_OPTION_TYPE;
  onChange: (value: PURCHASE_OPTION_TYPE) => void;
  className?: string;
  children?: React.ReactNode;
}

const RadioItem: React.FC<RadioItemProps> = ({
  id,
  name,
  value,
  activeValue,
  onChange,
  className,
  children,
}) => {
  function onOptionChanged(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value as PURCHASE_OPTION_TYPE);
  }

  const labelClassNames = useClassNames(
    'flex items-center cursor-pointer gap-2 rounded-lg border py-[10px] pl-4 pr-6 text-sm text-primary transition duration-[250ms]',
    'peer-focus-visible:border-primary',
    {
      'border-primary': activeValue === value,
      'border-input-standard': activeValue !== value,
    },
  );

  const iconClassNames = useClassNames(
    'w-4 h-4 transition-all duration-[250ms]',
    {
      'fill-background-primary stroke-input-standard': value !== activeValue,
      'fill-primary stroke-primary': value === activeValue,
    },
  );

  return (
    <div className={className ?? ''}>
      <input
        id={id}
        name={name}
        value={value}
        onChange={onOptionChanged}
        className="peer sr-only"
        type="radio"
        checked={activeValue === value}
      />
      <label htmlFor={id} className={labelClassNames}>
        <RadioIcon className={iconClassNames} />
        {children}
      </label>
    </div>
  );
};

export default RadioItem;
