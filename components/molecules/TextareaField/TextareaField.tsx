import React from 'react';
import useClassNames from 'hooks/useClassNames';

import Textarea from 'components/atoms/Textarea';
import Label from 'components/atoms/Label';
import ValidationErrorText from 'components/atoms/ValidationErrorText';

export interface TextareaFieldInputConfigProps {
  placeholder?: string;
  id?: string;
  maxLength?: number;
}

export interface TextareaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    TextareaFieldInputConfigProps {
  /**
   * Input label
   */
  label?: string;
  /**
   * Label for error message
   */
  errorLabel?: string;
  /**
   * Additional classes to be added to the container
   */
  containerClassName?: string;
  /**
   * Additional inline CSS to be added to the container
   */
  containerStyle?: React.CSSProperties;
}

const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  errorLabel,
  containerClassName,
  containerStyle,
  ...props
}) => {
  const textareaClassNames = useClassNames(
    {
      'border-error-dark': !!errorLabel,
    },
    props.className,
  );

  return (
    <div
      className={['gap flex flex-col gap-1', containerClassName].join(' ')}
      style={containerStyle}>
      {label && <Label text={label} htmlFor={props.id} />}
      <Textarea
        aria-describedby={`${props.id}-error`}
        {...props}
        error={!!errorLabel}
        className={textareaClassNames}
      />
      {errorLabel && (
        <ValidationErrorText id={`${props.id}-error`}>
          {errorLabel}
        </ValidationErrorText>
      )}
    </div>
  );
};

export default TextareaField;
