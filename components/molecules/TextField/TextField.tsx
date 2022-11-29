import React from 'react';
import Input from 'components/atoms/Input';
import Label from 'components/atoms/Label';
import useClassNames from 'hooks/useClassNames';
import ValidationErrorText from 'components/atoms/ValidationErrorText';

export interface TextFieldInputConfigProps {
  placeholder?: string;
  id?: string;
  maxLength?: number;
}

export interface TextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    TextFieldInputConfigProps {
  label?: string;
  errorLabel?: string;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
}

const TextField: React.FC<TextFieldProps> = ({
  id,
  label,
  errorLabel,
  containerClassName,
  containerStyle,
  ...props
}) => {
  const inputClassNames = useClassNames(
    {
      'border-error-dark': !!errorLabel,
    },
    props.className,
  );

  return (
    <div
      className={['gap flex flex-col gap-1', containerClassName].join(' ')}
      style={containerStyle}>
      {label && <Label text={label} htmlFor={id} />}
      <Input
        aria-describedby={`${id}-error`}
        {...props}
        error={!!errorLabel}
        className={inputClassNames}
      />
      {errorLabel && (
        <ValidationErrorText id={`${id}-error`}>
          {errorLabel}
        </ValidationErrorText>
      )}
    </div>
  );
};

export default TextField;
