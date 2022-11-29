import useClassNames from 'hooks/useClassNames';
import React from 'react';

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: boolean }
>((props, ref) => {
  const classNames = useClassNames(
    'w-full max-w-[444px] rounded-lg border border-primary text-md text-body p-4 h-[140px] resize-none all-ease-in-out-400 appearance-none shadow-none',
    'focus:border-primary focus:outline-0 focus:placeholder:text-transparent',
    'disabled:border-disabled disabled:text-disabled',
    'placeholder-shown:border-input-standard placeholder:text-input-standard',
    'lg:w-[444px]',
    { 'border-error-dark': !!props.error },
    props.className,
  );

  return <textarea {...props} ref={ref} className={classNames} />;
});

Textarea.displayName = 'Textarea';

export default Textarea;
