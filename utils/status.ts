import type { I18n } from 'hooks/useI18n';
import { ORDER_STATUS } from 'types/orders';
import { STOCK_STATUS } from 'types/shared/products';
import { SUBSCRIPTION_STATUS } from 'types/subscription';

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

export const STATUS_MAP = (i18n: I18n) =>
  new Map<StatusKey, StatusTemplate>([
    [
      orderStatusKey(ORDER_STATUS.CANCELED),
      {
        color: '#FF766D',
        label: i18n('account.orders.status.canceled'),
      },
    ],
    [
      orderStatusKey(ORDER_STATUS.COMPLETE),
      {
        color: '#00BA99',
        label: i18n('account.orders.status.complete'),
      },
    ],
    [
      orderStatusKey(ORDER_STATUS.DELIVERY_PENDING),
      {
        color: '#BDB9C6',
        label: i18n('account.orders.status.delivery_pending'),
      },
    ],
    [
      orderStatusKey(ORDER_STATUS.HOLD),
      {
        color: '#F4A732',
        label: i18n('account.orders.status.hold'),
      },
    ],
    [
      orderStatusKey(ORDER_STATUS.PAYMENT_PENDING),
      {
        color: '#F4A732',
        label: i18n('account.orders.status.payment_pending'),
      },
    ],
    [
      orderStatusKey(ORDER_STATUS.PENDING),
      {
        color: '#F4A732',
        label: i18n('account.orders.status.pending'),
      },
    ],
    [
      orderStatusKey(ORDER_STATUS.DRAFT),
      {
        color: '#F4A732',
        label: i18n('account.orders.status.draft'),
      },
    ],
    [
      subscriptionStatusKey(SUBSCRIPTION_STATUS.ACTIVE),
      {
        color: '#00BA99',
        label: i18n('account.subscriptions.status.active'),
      },
    ],
    [
      subscriptionStatusKey(SUBSCRIPTION_STATUS.CANCELED),
      {
        color: '#FF766D',
        label: i18n('account.subscriptions.status.canceled'),
      },
    ],
    [
      subscriptionStatusKey(SUBSCRIPTION_STATUS.PAID),
      {
        color: '#00BA99',
        label: i18n('account.subscriptions.status.paid'),
      },
    ],
    [
      subscriptionStatusKey(SUBSCRIPTION_STATUS.TRIAL),
      {
        color: '#00BA99',
        label: i18n('account.subscriptions.status.trial'),
      },
    ],
    [
      subscriptionStatusKey(SUBSCRIPTION_STATUS.PAUSED),
      {
        color: '#BDB9C6',
        label: i18n('account.subscriptions.status.paused'),
      },
    ],
    [
      subscriptionStatusKey(SUBSCRIPTION_STATUS.PASTDUE),
      {
        color: '#F4A732',
        label: i18n('account.subscriptions.status.pastdue'),
      },
    ],
    [
      subscriptionStatusKey(SUBSCRIPTION_STATUS.UNPAID),
      {
        color: '#FF766D',
        label: i18n('account.subscriptions.status.unpaid'),
      },
    ],
    [
      subscriptionStatusKey(SUBSCRIPTION_STATUS.COMPLETE),
      {
        color: '#00BA99',
        label: i18n('account.subscriptions.status.complete'),
      },
    ],
    [
      subscriptionStatusKey(SUBSCRIPTION_STATUS.PENDING),
      {
        color: '#F4A732',
        label: i18n('account.subscriptions.status.pending'),
      },
    ],
    [
      subscriptionStatusKey(SUBSCRIPTION_STATUS.DRAFT),
      {
        color: '#BDB9C6',
        label: i18n('account.subscriptions.status.draft'),
      },
    ],
    [
      STOCK_STATUS.IN_STOCK,
      {
        color: '#00BA99',
        label: i18n('products.stock_status.in_stock'),
      },
    ],
    [
      STOCK_STATUS.LOW_STOCK,
      {
        color: '#F4A732',
        label: i18n('products.stock_status.low_stock'),
        details: (payload = 'few') => `${payload} remaining`,
      },
    ],
    [
      STOCK_STATUS.OUT_OF_STOCK,
      {
        color: '#FF766D',
        label: i18n('products.stock_status.out_of_stock'),
      },
    ],
  ]);
