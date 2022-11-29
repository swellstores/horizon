import type {
  Maybe,
  SwellProductPurchaseOptionsSubscriptionPlanBillingSchedule,
  SwellSubscription,
  SwellSubscriptionBillingSchedule,
  SwellSubscriptionOrderSchedule,
} from 'lib/graphql/generated/sdk';
import { INTERVAL } from 'types/shared/products';
import type { Schedule } from 'types/subscription';

export const SHORTENED_MAP = {
  [INTERVAL.Daily]: 'day',
  [INTERVAL.Weekly]: 'wk',
  [INTERVAL.Monthly]: 'mo',
  [INTERVAL.Yearly]: 'yr',
};

export const SINGULAR_MAP = {
  [INTERVAL.Daily]: 'day',
  [INTERVAL.Weekly]: 'week',
  [INTERVAL.Monthly]: 'month',
  [INTERVAL.Yearly]: 'year',
};

export const PLURAL_MAP = {
  [INTERVAL.Daily]: 'days',
  [INTERVAL.Weekly]: 'weeks',
  [INTERVAL.Monthly]: 'months',
  [INTERVAL.Yearly]: 'years',
};

export const ONE_DAY = 1000 * 60 * 60 * 24;

export function filterSingular(number: number) {
  return number > 1 ? `${number}` : '';
}

export function getPluralizedInterval(interval: INTERVAL, number: number) {
  return number > 1 ? PLURAL_MAP[interval] : SINGULAR_MAP[interval];
}

export function formatSubscriptionInterval(
  interval: INTERVAL,
  intervalCount: number,
  longForm = false,
) {
  return `${filterSingular(intervalCount)}${
    longForm
      ? `${intervalCount > 1 ? ' ' : ''}${getPluralizedInterval(
          interval,
          intervalCount,
        )}`
      : SHORTENED_MAP[interval]
  }`;
}

export function formatSubscriptionPrice(
  formattedPrice: string,
  {
    interval,
    intervalCount,
  }: SwellProductPurchaseOptionsSubscriptionPlanBillingSchedule,
) {
  if (!interval || !intervalCount) return formattedPrice;
  return `${formattedPrice}/${formatSubscriptionInterval(
    interval as INTERVAL,
    intervalCount,
  )}`;
}

export function getScheduleLabel(base: string, schedule?: Schedule) {
  if (!schedule?.interval || !schedule?.intervalCount) return '';

  const { interval, intervalCount } = schedule;
  return `${base} ${formatSubscriptionInterval(
    interval as INTERVAL,
    intervalCount,
    true,
  )}`;
}

export const formatLimitText = (
  schedule: Schedule | undefined,
  prefix: string,
  singular: string,
  plural: string,
) => {
  const limit = schedule?.limit;
  const limitCurrent = schedule?.limitCurrent;
  const remainingCycles = limit && limitCurrent ? limit - limitCurrent : 0;

  if (!limit || !limitCurrent || remainingCycles < 1) {
    return null;
  }

  return `${prefix} ${remainingCycles} ${
    remainingCycles > 1 ? plural : singular
  }`;
};

export const formatTrialText = (
  subscription: SwellSubscription,
  base: string,
  singular: string,
  plural: string,
) => {
  const trialLeft =
    new Date(subscription.dateTrialEnd).getTime() - new Date().getTime();

  if (!subscription?.trial || trialLeft < 0) {
    return null;
  }

  const trialEndDays = Math.round(trialLeft / ONE_DAY + 0.5);
  return `${base} ${trialEndDays} ${trialEndDays === 1 ? singular : plural}`;
};

export const isLastSubscriptionCycle = (
  schedule:
    | Maybe<SwellSubscriptionBillingSchedule | SwellSubscriptionOrderSchedule>
    | undefined,
) => {
  if (!schedule?.limit || !schedule.limitCurrent) {
    return false;
  }

  return schedule.limit - schedule.limitCurrent === 0;
};
