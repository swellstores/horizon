import React from 'react';

const ValidationErrorText = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>((props, ref) => (
  <span
    role="alert"
    {...props}
    ref={ref}
    className={['text-2xs text-error-dark', props.className].join(' ')}>
    {props.children}
  </span>
));

ValidationErrorText.displayName = 'ValidationErrorText';

export default ValidationErrorText;
