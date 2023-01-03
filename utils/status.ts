import { ORDER_STATUS } from 'types/orders';
import { STOCK_STATUS } from 'types/shared/products';
import { SUBSCRIPTION_STATUS } from 'types/subscription';
import { fallbackString } from './text';

interface StatusTemplate {
  color: string;
  label: string;
  details?: (payload?: string) => string;
}

const ORDER_PREFIX = 'order_' as const;
type ORDER_PREFIX = typeof ORDER_PREFIX;
const SUBSCRIPTION_PREFIX = 'subscription_' as const;
type SUBSCRIPTION_PREFIX = typeof SUBSCRIPTION_PREFIX;

const withPrefix =
  <P extends ORDER_PREFIX | SUBSCRIPTION_PREFIX>(prefix: P) =>
  (
    text: P extends ORDER_PREFIX ? ORDER_STATUS : SUBSCRIPTION_STATUS,
  ): `${P}${P extends ORDER_PREFIX ? ORDER_STATUS : SUBSCRIPTION_STATUS}` =>
    `${prefix}${text}`;

export const orderStatusKey = withPrefix(ORDER_PREFIX);
export const subscriptionStatusKey = withPrefix(SUBSCRIPTION_PREFIX);

type StatusKey =
  | ReturnType<typeof orderStatusKey>
  | ReturnType<typeof subscriptionStatusKey>
  | STOCK_STATUS;

export const STATUS_MAP = (lang: any) =>
  new Map<StatusKey, StatusTemplate>([
    [
      orderStatusKey(ORDER_STATUS.CANCELED),
      {
        color: '#FF766D',
        label: fallbackString(
          lang?.account?.orders?.status?.canceled,
          'Canceled',
        ),
      },
    ],
    [
      orderStatusKey(ORDER_STATUS.COMPLETE),
      {
        color: '#00BA99',
        label: fallbackString(
          lang?.account?.orders?.status?.complete,
          'Complete',
        ),
      },
    ],
    [
      orderStatusKey(ORDER_STATUS.DELIVERY_PENDING),
      {
        color: '#BDB9C6',
        label: fallbackString(
          lang?.account?.orders?.status?.deliveryPending,
          'Delivery pending',
        ),
      },
    ],
    [
      orderStatusKey(ORDER_STATUS.HOLD),
      {
        color: '#F4A732',
        label: fallbackString(lang?.account?.orders?.status?.hold, 'Hold'),
      },
    ],
    [
      orderStatusKey(ORDER_STATUS.PAYMENT_PENDING),
      {
        color: '#F4A732',
        label: fallbackString(
          lang?.account?.orders?.status?.paymentPending,
          'Payment Pending',
        ),
      },
    ],
    [
      orderStatusKey(ORDER_STATUS.PENDING),
      {
        color: '#F4A732',
        label: fallbackString(
          lang?.account?.orders?.status?.pending,
          'Pending',
        ),
      },
    ],
    [
      orderStatusKey(ORDER_STATUS.DRAFT),
      {
        color: '#F4A732',
        label: fallbackString(lang?.account?.orders?.status?.draft, 'Draft'),
      },
    ],
    [
      subscriptionStatusKey(SUBSCRIPTION_STATUS.ACTIVE),
      {
        color: '#00BA99',
        label: fallbackString(
          lang?.account?.subscriptions?.status?.active,
          'Active',
        ),
      },
    ],
    [
      subscriptionStatusKey(SUBSCRIPTION_STATUS.CANCELED),
      {
        color: '#FF766D',
        label: fallbackString(
          lang?.account?.subscriptions?.status?.canceled,
          'Canceled',
        ),
      },
    ],
    [
      subscriptionStatusKey(SUBSCRIPTION_STATUS.PAID),
      {
        color: '#00BA99',
        label: fallbackString(
          lang?.account?.subscriptions?.status?.paid,
          'Paid',
        ),
      },
    ],
    [
      subscriptionStatusKey(SUBSCRIPTION_STATUS.TRIAL),
      {
        color: '#00BA99',
        label: fallbackString(
          lang?.account?.subscriptions?.status?.trial,
          'Trial',
        ),
      },
    ],
    [
      subscriptionStatusKey(SUBSCRIPTION_STATUS.PAUSED),
      {
        color: '#BDB9C6',
        label: fallbackString(
          lang?.account?.subscriptions?.status?.paused,
          'Paused',
        ),
      },
    ],
    [
      subscriptionStatusKey(SUBSCRIPTION_STATUS.PASTDUE),
      {
        color: '#F4A732',
        label: fallbackString(
          lang?.account?.subscriptions?.status?.pastdue,
          'Past Due',
        ),
      },
    ],
    [
      subscriptionStatusKey(SUBSCRIPTION_STATUS.UNPAID),
      {
        color: '#FF766D',
        label: fallbackString(
          lang?.account?.subscriptions?.status?.unpaid,
          'Unpaid',
        ),
      },
    ],
    [
      subscriptionStatusKey(SUBSCRIPTION_STATUS.COMPLETE),
      {
        color: '#00BA99',
        label: fallbackString(
          lang?.account?.subscriptions?.status?.complete,
          'Complete',
        ),
      },
    ],
    [
      subscriptionStatusKey(SUBSCRIPTION_STATUS.PENDING),
      {
        color: '#F4A732',
        label: fallbackString(
          lang?.account?.subscriptions?.status?.pending,
          'Pending',
        ),
      },
    ],
    [
      subscriptionStatusKey(SUBSCRIPTION_STATUS.DRAFT),
      {
        color: '#BDB9C6',
        label: fallbackString(
          lang?.account?.subscriptions?.status?.draft,
          'Draft',
        ),
      },
    ],
    [
      STOCK_STATUS.IN_STOCK,
      {
        color: '#00BA99',
        label: fallbackString(
          lang?.products?.stock_status?.inStock,
          'In Stock',
        ),
      },
    ],
    [
      STOCK_STATUS.LOW_STOCK,
      {
        color: '#F4A732',
        label: fallbackString(
          lang?.products?.stock_status?.lowStock,
          'Low Stock',
        ),
        details: (payload = 'few') => `${payload} remaining`,
      },
    ],
    [
      STOCK_STATUS.OUT_OF_STOCK,
      {
        color: '#FF766D',
        label: fallbackString(
          lang?.products?.stock_status?.outOfStock,
          'Out of Stock',
        ),
      },
    ],
  ]);
