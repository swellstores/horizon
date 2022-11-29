import { Icon } from '@iconify/react';
import type { InputProps } from 'components/atoms/Input/Input';
import Input from 'components/atoms/Input/Input';
import React, { useState } from 'react';

export interface PasswordInputProps extends InputProps {
  closedIcon?: string;
  openIcon?: string;
  visible?: boolean;
  setVisible?: (visible: boolean) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  visible,
  setVisible,
  closedIcon = 'eva:eye-off-2-outline',
  openIcon = 'eva:eye-outline',
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(false);

  const value = visible ?? internalValue;
  const setValue = visible !== undefined ? setVisible : setInternalValue;

  return (
    <span className="relative">
      <Input {...props} type={value ? 'text' : 'password'} />
      <button
        type="button"
        onClick={() => setValue?.(!value)}
        className="absolute right-4 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md bg-background-secondary">
        <Icon
          width={16}
          height={16}
          icon={value ? openIcon : closedIcon}
          className="text-primary"
        />
      </button>
    </span>
  );
};

export default PasswordInput;
