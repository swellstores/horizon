import React, { useState } from 'react';

export interface SlideNavProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  quantity: number;
  defaultValue?: number;
  value?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
}

const SlideNav = React.forwardRef<HTMLDivElement, SlideNavProps>(
  (
    {
      quantity,
      value: controlledValue,
      onChange,
      defaultValue = 0,
      disabled,
      ...props
    },
    ref,
  ) => {
    const [current, setCurrent] = useState(defaultValue);

    const value = controlledValue ?? current;

    return (
      <div
        ref={ref}
        {...props}
        className={['flex items-center gap-4', props.className].join(' ')}>
        {[...Array(quantity).keys()].map((i) => (
          <div
            key={i}
            className="flex h-2 w-2 shrink-0 items-center justify-center">
            <button
              disabled={disabled}
              onClick={() => {
                onChange?.(i);
                setCurrent(i);
              }}
              className={`rounded-[50%] ${
                value === i
                  ? 'h-2 w-2 bg-primary'
                  : 'h-1.5 w-1.5 bg-input-standard'
              }`}
            />
          </div>
        ))}
      </div>
    );
  },
);

SlideNav.displayName = 'SlideNav';

export default SlideNav;
