import React from 'react';
import useClassNames from 'hooks/useClassNames';
import { Icon } from '@iconify/react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  small?: boolean;
  icon?: string;
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ small, icon, error, ...props }, ref) => {
    const classNames = useClassNames(
      'peer w-full rounded-lg border px-4 text-md text-primary transition duration-300',
      'focus:text-primary focus:outline-none',
      'placeholder:text-input-standard',
      'disabled:border-disabled disabled:text-disabled',
      {
        'border-primary placeholder-shown:border-input-standard focus:border-primary':
          !error,
        'border-error-dark': !!error,
        'py-4': !small,
        'py-2': !!small,
        'pl-12': !!icon,
      },
    );

    const iconClassNames = useClassNames(
      'absolute top-1/2 left-4 -translate-y-1/2 text-primary transition duration-300 peer-focus:text-primary',
    );

    return (
      <span className={`relative ${props.className ?? ''}`}>
        <input
          {...props}
          placeholder={props.placeholder || ' '}
          ref={ref}
          className={classNames}
        />
        {icon && (
          // TODO: Revise size. Should be height 16 and width 16 but the icon paths were too small.
          <Icon icon={icon} height={22} width={22} className={iconClassNames} />
        )}
      </span>
    );
  },
);

Input.displayName = 'Input';

export default Input;
