import React, { useCallback } from 'react';
import styles from './CounterInput.module.css';

export interface CounterInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'type' | 'onChange' | 'onBlur' | 'value' | 'defaultValue'
  > {
  defaultValue?: number;
  value: number;
  onChange?: (value: number) => void;
  onBlur?: (value: number) => void;
}

const CounterInput = React.forwardRef<HTMLDivElement, CounterInputProps>(
  ({ value, onChange, onBlur, ...props }, ref) => {
    const handleChange = useCallback<
      React.ChangeEventHandler<HTMLInputElement>
    >(
      (e) => {
        const newValue = e.currentTarget.valueAsNumber;

        if (props.max && newValue > Number(props.max))
          onChange?.(Number(props.max));
        else if (props.min && newValue < Number(props.min))
          onChange?.(Number(props.min));
        else onChange?.(newValue);
      },
      [onChange, props.max, props.min],
    );

    const handleBlur = useCallback<React.FocusEventHandler<HTMLInputElement>>(
      (e) => {
        if (isNaN(e.currentTarget.valueAsNumber)) {
          onChange?.(Number(props.min) ?? 0);
        }
      },
      [onChange, props.min],
    );

    const decrement = useCallback(() => {
      onChange?.(value - 1);
    }, [value, onChange]);

    const increment = useCallback(() => {
      onChange?.(value + 1);
    }, [value, onChange]);

    return (
      <div
        ref={ref}
        onBlur={() => onBlur?.(value)}
        className={[
          'inline-flex items-center rounded-lg border border-input-standard text-lg text-primary focus:outline-none focus-visible:ring focus-visible:ring-accent',
          props.className,
        ].join(' ')}>
        <button
          type="button"
          className="inline-flex items-center py-2 pl-3 pr-1 text-sm text-primary disabled:text-disabled"
          tabIndex={-1}
          disabled={props.min !== undefined && value <= Number(props.min)}
          onClick={decrement}>
          -
        </button>

        <input
          size={1}
          {...props}
          value={value.toString()}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`min-w-[2ch] appearance-none bg-background-primary py-2 text-center focus:outline-none ${styles.input}`}
          style={{
            width: `${(value || props.min || 0).toString().length}ch`,
            ...props.style,
          }}
          type="number"
        />

        <button
          type="button"
          className="inline-flex items-center py-2 pr-3 pl-1 text-sm text-primary disabled:text-disabled"
          tabIndex={-1}
          disabled={props.max !== undefined && value >= Number(props.max)}
          onClick={increment}>
          +
        </button>
      </div>
    );
  },
);

CounterInput.displayName = 'CounterInput';

export default CounterInput;
