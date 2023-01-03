import type {
  OrderCardProps,
  SubscriptionCardProps,
} from 'components/molecules/PurchaseCard';
import type { ORDER_STATUS } from 'types/orders';
import { PURCHASE_TYPE } from 'types/purchase';
import type { SUBSCRIPTION_STATUS } from 'types/subscription';
import { orderStatusKey, STATUS_MAP, subscriptionStatusKey } from './status';

export type GrouppedPurchases = {
  [key in ORDER_STATUS | SUBSCRIPTION_STATUS]?: {
    title: string;
    purchases: (OrderCardProps | SubscriptionCardProps)[];
  };
};

export const grouppedPurchases = <
  P extends (OrderCardProps | SubscriptionCardProps)[],
  Acc extends GrouppedPurchases,
>(
  purchases: P,
  lang: any,
) =>
  purchases.reduce<Acc>((accumulator, currentValue) => {
    const { status } = currentValue;

    if (status && !accumulator[status]) {
      const title =
        STATUS_MAP(lang).get(
          currentValue.type === PURCHASE_TYPE.ORDER
            ? orderStatusKey(status as ORDER_STATUS)
            : subscriptionStatusKey(status as SUBSCRIPTION_STATUS),
        )?.label ?? '';
      accumulator[status] = {
        title,
        purchases: [currentValue],
      };
    } else if (accumulator[status]) {
      accumulator[status]?.purchases.push(currentValue);
    }

    return accumulator;
  }, {} as Acc);
