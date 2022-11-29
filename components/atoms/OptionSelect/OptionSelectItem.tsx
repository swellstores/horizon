import React from 'react';
import useClassNames from 'hooks/useClassNames';

interface OptionSelectItemProps {
  name: string;
  label: string;
  value: string;
  active: boolean;
  disabled?: boolean;
  onChange: (value: string) => void;
  className?: string;
}

const OptionSelectItem: React.FC<OptionSelectItemProps> = ({
  name,
  label,
  value,
  active,
  disabled = false,
  onChange,
  className,
}) => {
  function onOptionChanged(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
  }

  const labelClassNames = useClassNames(
    'border rounded-lg p-[10px] text-sm transition duration-[250ms] cursor-pointer',
    'peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-1',
    {
      'border-primary bg-primary text-background-primary': active,
      'border-body bg-background-primary text-primary': !active,
      'border-disabled bg-background-primary text-disabled': disabled,
    },
    className,
  );

  return (
    <>
      <input
        id={value}
        name={name}
        value={value}
        onChange={onOptionChanged}
        disabled={disabled}
        className="peer sr-only"
        type="radio"
        checked={active}
      />
      <label htmlFor={value} className={labelClassNames}>
        {label}
      </label>
    </>
  );
};

export default OptionSelectItem;
