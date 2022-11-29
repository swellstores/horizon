import React from 'react';
import useCurrencyStore from 'stores/currency';
import Button from 'components/atoms/Button';
import { BUTTON_TYPE } from 'types/shared/button';

export interface CartTotalProps {
  total: number;
  disabled?: boolean;
  className?: string;
  checkoutUrl: string;
}

const CartTotal: React.FC<CartTotalProps> = ({
  total,
  disabled = false,
  className,
  checkoutUrl,
}) => {
  const formatPrice = useCurrencyStore((state) => state.formatPrice);

  return (
    <div
      className={[
        'flex flex-col gap-6 bg-background-primary p-6 shadow-3xl',
        className,
      ].join(' ')}>
      <div className="flex justify-between text-sm font-semibold uppercase text-primary">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
      <Button
        elType={BUTTON_TYPE.LINK}
        className="text-center uppercase"
        href={checkoutUrl}
        disabled={disabled}
        fullWidth>
        Checkout
      </Button>
    </div>
  );
};

export default CartTotal;
