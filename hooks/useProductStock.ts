import { useMemo } from 'react';
import {
  getStockStatus,
  StockStatusArgs,
  isStockLimited,
} from 'lib/utils/products';
import type { STOCK_STATUS } from 'types/shared/products';
import type { ActiveVariation } from 'lib/utils/products';

interface UseProductStockArgs extends StockStatusArgs {
  activeVariation?: ActiveVariation | undefined;
}

type useProductStock = (args: UseProductStockArgs) => [STOCK_STATUS, number];

const useProductStock: useProductStock = ({
  stockLevel,
  stockPurchasable,
  stockTracking,
  lowStockIndicator,
}) => {
  const stockStatus = useMemo(
    () =>
      getStockStatus({
        stockTracking,
        stockPurchasable,
        lowStockIndicator,
        stockLevel,
      }),
    [stockLevel, lowStockIndicator, stockPurchasable, stockTracking],
  );

  const maxQuantity = useMemo(() => {
    if (isStockLimited(stockTracking, stockPurchasable)) {
      return stockLevel ?? 1;
    }
    return 99;
  }, [stockTracking, stockPurchasable, stockLevel]);

  return [stockStatus, maxQuantity];
};

export default useProductStock;
