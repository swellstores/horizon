import React, { useCallback, useState } from 'react';
import Input from 'components/atoms/Input';
import useClassNames from 'hooks/useClassNames';
import ValidationErrorText from 'components/atoms/ValidationErrorText';
import ArrowRight from 'assets/icons/arrow-right.svg';

export interface ActionInputProps extends React.AriaAttributes {
  id: string;
  onAction: (value: string) => void;
  small?: boolean;
  errorLabel?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  type?: 'text' | 'email' | 'password';
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
  onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>;
  noValidate?: boolean;
}

const ActionInput: React.FC<ActionInputProps> = ({
  id,
  errorLabel,
  onChange,
  onAction,
  value,
  defaultValue = '',
  noValidate,
  ...props
}) => {
  const inputClassNames = useClassNames({
    'border-error-dark': !!errorLabel,
  });

  const buttonClassNames = useClassNames(
    'absolute right-4 top-1/2 -translate-y-1/2',
    {
      'w-4': !props.small,
      'w-3': !!props.small,
    },
  );

  const [inputValue, setInputValue] = useState(defaultValue);

  const changeValueHandler = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (e) => {
      onChange?.(e);
      setInputValue(e.target.value);
    },
    [onChange],
  );

  const submitHandler = useCallback<React.FormEventHandler<HTMLFormElement>>(
    (e) => {
      e.preventDefault();
      onAction(value ?? inputValue);
    },
    [inputValue, onAction, value],
  );

  return (
    <form
      className="gap flex flex-col gap-1"
      onSubmit={submitHandler}
      noValidate={noValidate}>
      <div className="relative">
        <Input
          aria-describedby={`${id}-error`}
          className={inputClassNames}
          value={value ?? inputValue}
          onChange={changeValueHandler}
          error={!!errorLabel}
          {...props}
        />
        <button type="submit" className={buttonClassNames}>
          <ArrowRight />
        </button>
      </div>
      {errorLabel && (
        <ValidationErrorText id={`${id}-error`}>
          {errorLabel}
        </ValidationErrorText>
      )}
    </form>
  );
};

export default ActionInput;
