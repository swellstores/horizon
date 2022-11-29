import React, { useCallback, useMemo } from 'react';
import useCurrencyStore from 'stores/currency';
import { formatSubscriptionPrice } from 'lib/utils/subscription';
import type {
  Maybe,
  SwellProductPurchaseOptionsSubscriptionPlanBillingSchedule,
} from 'lib/graphql/generated/sdk';

export interface PriceProps {
  price: number;
  origPrice?: number;
  billingSchedule?: Maybe<SwellProductPurchaseOptionsSubscriptionPlanBillingSchedule>;
}

const Price: React.FC<PriceProps> = ({ price, origPrice, billingSchedule }) => {
  const formatPrice = useCurrencyStore((state) => state.formatPrice);

  const formatSchedule = useCallback(
    (price: number) =>
      billingSchedule && price > 0
        ? formatSubscriptionPrice(formatPrice(price), billingSchedule)
        : formatPrice(price),
    [billingSchedule, formatPrice],
  );

  const formattedPrice = useMemo(
    () => formatSchedule(price),
    [formatSchedule, price],
  );

  const formattedOrigPrice = useMemo(() => {
    if (!origPrice) return null;
    return formatSchedule(origPrice);
  }, [formatSchedule, origPrice]);

  return (
    <span>
      <span>{formattedPrice}</span>{' '}
      {formattedOrigPrice && (
        <span className="line-through">{formattedOrigPrice}</span>
      )}
    </span>
  );
};

export default Price;
