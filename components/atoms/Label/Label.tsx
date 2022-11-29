import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  text: string;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ text, ...props }, ref) => {
    return (
      <label
        {...props}
        ref={ref}
        className={['text-sm font-semibold text-body', props.className].join(
          ' ',
        )}>
        {text.toUpperCase()}
      </label>
    );
  },
);

Label.displayName = 'Label';

export default Label;
