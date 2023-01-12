import type {
  Maybe,
  SwellSubscriptionBillingSchedule,
  SwellSubscriptionOrderSchedule,
} from 'lib/graphql/generated/sdk';

export const SUBSCRIPTION_STATUS = {
  ACTIVE: 'active',
  CANCELED: 'canceled',
  COMPLETE: 'complete',
  TRIAL: 'trial',
  PAUSED: 'paused',
  PASTDUE: 'pastdue',
  PENDING: 'pending',
  UNPAID: 'unpaid',
  PAID: 'paid',
  DRAFT: 'draft',
} as const;
export type SUBSCRIPTION_STATUS =
  typeof SUBSCRIPTION_STATUS[keyof typeof SUBSCRIPTION_STATUS];

export type OrderSchedule = Pick<
  SwellSubscriptionOrderSchedule,
  'interval' | 'intervalCount' | 'limit' | 'limitCurrent'
>;

export type BillingSchedule = Pick<
  SwellSubscriptionBillingSchedule,
  'interval' | 'intervalCount' | 'limit' | 'limitCurrent' | 'trialDays'
>;

export type Schedule = Maybe<BillingSchedule | OrderSchedule>;

export interface SubscriptionSchedule {
  billingSchedule: Maybe<BillingSchedule>;
  orderSchedule?: Maybe<OrderSchedule>;
}
