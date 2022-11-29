import React from 'react';
import BagEmptyIcon from 'assets/icons/bag-empty.svg';

export interface ShoppingBagProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  itemQuantity: number;
}

const ShoppingBag = React.forwardRef<HTMLButtonElement, ShoppingBagProps>(
  ({ itemQuantity, ...props }, ref) => (
    <button
      {...props}
      ref={ref}
      className={['relative', props.className].join(' ')}>
      {!!itemQuantity && (
        <div
          className="absolute -right-1 -top-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-primary text-2xs text-background-primary"
          style={{
            width: `calc(min(${
              itemQuantity.toString().length
            }ch, 4ch) + 0.5rem)`,
          }}>
          {itemQuantity < 1000 ? itemQuantity : '999+'}
        </div>
      )}
      <BagEmptyIcon className="h-5 w-5 text-primary" />
    </button>
  ),
);

ShoppingBag.displayName = 'ShoppingBag';

export default ShoppingBag;
