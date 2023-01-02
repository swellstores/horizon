import type { Status } from 'types/global';
import { ORDER_STATUS } from 'types/orders';
import { STOCK_STATUS } from 'types/shared/products';
import { SUBSCRIPTION_STATUS } from 'types/subscription';
import { fallbackString } from './text';

interface StatusTemplate {
  color: string;
  label: string;
  details?: (payload?: string) => string;
}

export const STATUS_MAP = (lang: any) =>
  new Map<Status, StatusTemplate>([
    [
      ORDER_STATUS.CANCELED,
      {
        color: '#FF766D',
        label: fallbackString(
          lang?.account?.orders?.status?.canceled,
          'Canceled',
        ),
      },
    ],
    [
      ORDER_STATUS.COMPLETE,
      {
        color: '#00BA99',
        label: fallbackString(
          lang?.account?.orders?.status?.complete,
          'Complete',
        ),
      },
    ],
    [
      ORDER_STATUS.DELIVERY_PENDING,
      {
        color: '#BDB9C6',
        label: fallbackString(
          lang?.account?.orders?.status?.delivery_pending,
          'Delivery pending',
        ),
      },
    ],
    [
      ORDER_STATUS.HOLD,
      {
        color: '#F4A732',
        label: fallbackString(lang?.account?.orders?.status?.hold, 'Hold'),
      },
    ],
    [
      ORDER_STATUS.PAYMENT_PENDING,
      {
        color: '#F4A732',
        label: fallbackString(
          lang?.account?.orders?.status?.payment_pending,
          'Payment Pending',
        ),
      },
    ],
    [
      ORDER_STATUS.PENDING,
      {
        color: '#F4A732',
        label: fallbackString(
          lang?.account?.orders?.status?.pending,
          'Pending',
        ),
      },
    ],
    [
      ORDER_STATUS.DRAFT,
      {
        color: '#F4A732',
        label: fallbackString(lang?.account?.orders?.status?.draft, 'Draft'),
      },
    ],
    [
      SUBSCRIPTION_STATUS.ACTIVE,
      {
        color: '#00BA99',
        label: fallbackString(
          lang?.account?.subscriptions?.status?.active,
          'Active',
        ),
      },
    ],
    [
      SUBSCRIPTION_STATUS.CANCELED,
      {
        color: '#FF766D',
        label: fallbackString(
          lang?.account?.subscriptions?.status?.canceled,
          'Canceled',
        ),
      },
    ],
    [
      SUBSCRIPTION_STATUS.PAID,
      {
        color: '#00BA99',
        label: fallbackString(
          lang?.account?.subscriptions?.status?.paid,
          'Paid',
        ),
      },
    ],
    [
      SUBSCRIPTION_STATUS.TRIAL,
      {
        color: '#00BA99',
        label: fallbackString(
          lang?.account?.subscriptions?.status?.trial,
          'Trial',
        ),
      },
    ],
    [
      SUBSCRIPTION_STATUS.PAUSED,
      {
        color: '#BDB9C6',
        label: fallbackString(
          lang?.account?.subscriptions?.status?.paused,
          'Paused',
        ),
      },
    ],
    [
      SUBSCRIPTION_STATUS.PASTDUE,
      {
        color: '#F4A732',
        label: fallbackString(
          lang?.account?.subscriptions?.status?.pastdue,
          'Past Due',
        ),
      },
    ],
    [
      SUBSCRIPTION_STATUS.UNPAID,
      {
        color: '#FF766D',
        label: fallbackString(
          lang?.account?.subscriptions?.status?.unpaid,
          'Unpaid',
        ),
      },
    ],
    [
      SUBSCRIPTION_STATUS.COMPLETE,
      {
        color: '#00BA99',
        label: fallbackString(
          lang?.account?.subscriptions?.status?.complete,
          'Complete',
        ),
      },
    ],
    [
      SUBSCRIPTION_STATUS.PENDING,
      {
        color: '#F4A732',
        label: fallbackString(
          lang?.account?.subscriptions?.status?.pending,
          'Pending',
        ),
      },
    ],
    [
      SUBSCRIPTION_STATUS.DRAFT,
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
          lang?.products?.stock_status?.in_stock,
          'In Stock',
        ),
      },
    ],
    [
      STOCK_STATUS.LOW_STOCK,
      {
        color: '#F4A732',
        label: fallbackString(
          lang?.products?.stock_status?.low_stock,
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
          lang?.products?.stock_status?.out_of_stock,
          'Out of Stock',
        ),
      },
    ],
  ]);
