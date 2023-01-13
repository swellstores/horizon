import type {
  OrderCardProps,
  SubscriptionCardProps,
} from 'components/molecules/PurchaseCard';
import type { I18n } from 'hooks/useI18n';
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

/**
 * Groups the purchases by the status in an object.
 *
 * @param purchases - array of purchases (orders or subscriptions)
 * @param i18n - internationalization function
 *@example
 * const purchases = [
 * { type: 'order', status: 'complete', title: 'Order #1' },
 * { type: 'order', status: 'complete', title: 'Order #2' },
 * { type: 'order', status: 'canceled', title: 'Order #3' },
 * ]
 * const i18n = ...
 * const groupped = grouppedPurchases(purchases, i18n)
 * console.log(groupped)
 * // {
 * //   complete: [
 * //     { type: 'order', status: 'complete', title: 'Order #1' },
 * //     { type: 'order', status: 'complete', title: 'Order #2' },
 * //   ],
 * //   canceled: [
 * //     { type: 'order', status: 'canceled', title: 'Order #3' },
 * //   ]
 * // }
 */
export const grouppedPurchases = <
  P extends (OrderCardProps | SubscriptionCardProps)[],
  Acc extends GrouppedPurchases,
>(
  purchases: P,
  i18n: I18n,
) =>
  purchases.reduce<Acc>((accumulator, currentValue) => {
    const { status } = currentValue;

    if (status && !accumulator[status]) {
      const title =
        STATUS_MAP(i18n).get(
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
