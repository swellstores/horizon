import React from 'react';
import Plus from 'assets/icons/plus.svg';

export type AddCircleProps = React.HTMLAttributes<HTMLDivElement>;

const AddCircle = React.forwardRef<HTMLDivElement, AddCircleProps>(
  (props, ref) => (
    <div
      {...props}
      className={[
        'flex h-8 w-8 shrink-0 flex-grow-0 items-center justify-center rounded-[50%] bg-accent text-primary',
        props.className,
      ].join(' ')}
      ref={ref}>
      <Plus width={12} height={12} />
    </div>
  ),
);

AddCircle.displayName = 'AddCircle';

export default AddCircle;
