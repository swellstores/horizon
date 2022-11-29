import React from 'react';
import BagEmpty from 'assets/icons/bag-empty.svg';
import Close from 'assets/icons/close.svg';

export interface CartHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  itemsQuantity?: number;
  onClose?: () => void;
}

const CartHeader = React.forwardRef<HTMLDivElement, CartHeaderProps>(
  ({ label, itemsQuantity, onClose, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      className={[
        'flex items-center justify-between text-primary',
        props.className,
      ].join(' ')}>
      <div className="flex gap-4">
        <BagEmpty width={20} height={20} />
        <span className="text-md font-semibold uppercase">
          {label} {`(${itemsQuantity ?? 0})`}
        </span>
      </div>
      <button onClick={onClose}>
        <Close width={20} height={20} />
      </button>
    </div>
  ),
);

CartHeader.displayName = 'CartHeader';

export default CartHeader;
