import { generateId } from 'lib/utils/shared_functions';
import React, { useMemo } from 'react';

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, ...props }, ref) => {
    // TODO: Replace with useId after upgrading to react 18
    const id = useMemo(() => props.id ?? generateId(), [props.id]);

    return (
      <label htmlFor={id} className="relative inline-block cursor-pointer">
        <input
          {...props}
          ref={ref}
          id={id}
          type="checkbox"
          className="peer sr-only"
        />
        <div className="flex h-5 w-5 items-center justify-center rounded-md border border-input-standard transition-colors duration-400 ease-in-out peer-checked:border-primary" />
        <div className="absolute top-1 left-1 h-3 w-3 rounded-sm transition-colors duration-400 ease-in-out peer-checked:bg-primary" />
        <span className="sr-only">{label}</span>
      </label>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
