import type {
  Maybe,
  SwellProductPurchaseOptionsSubscriptionPlanBillingSchedule,
  SwellSubscription,
  SwellSubscriptionBillingSchedule,
  SwellSubscriptionOrderSchedule,
} from 'lib/graphql/generated/sdk';
import { lang } from 'stores/settings';
import { INTERVAL } from 'types/shared/products';
import type { Schedule } from 'types/subscription';
import { parseTextWithVariables } from 'utils/text';

export const SHORTENED_MAP_FALLBACK = {
  [INTERVAL.Daily]: 'day',
  [INTERVAL.Weekly]: 'wk',
  [INTERVAL.Monthly]: 'mo',
  [INTERVAL.Yearly]: 'yr',
};

export const SINGULAR_MAP_FALLBACK = {
  [INTERVAL.Daily]: 'day',
  [INTERVAL.Weekly]: 'week',
  [INTERVAL.Monthly]: 'month',
  [INTERVAL.Yearly]: 'year',
};

export const PLURAL_MAP_FALLBACK = {
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
  const SINGULAR_MAP =
    lang()?.products?.interval?.singular || SINGULAR_MAP_FALLBACK;
  const PLURAL_MAP = lang()?.products?.interval?.plural || PLURAL_MAP_FALLBACK;

  return number > 1 ? PLURAL_MAP[interval] : SINGULAR_MAP[interval];
}

export function formatSubscriptionInterval(
  interval: INTERVAL,
  intervalCount: number,
  longForm = false,
) {
  const SHORTENED_MAP =
    lang()?.products?.interval?.short || SHORTENED_MAP_FALLBACK;

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

/**

*Generates a label for a given schedule.
*@param {string} text - The text to be displayed as the label. Can contain "{n}"(interval count) and "{interval}" variables.
*@param {Object} [schedule] - The schedule object containing the interval and interval count.
*@returns {string} - The label with variables replaced with values from the schedule object.
*/
export function getScheduleLabel(text: string, schedule?: Schedule) {
  if (!schedule?.interval || !schedule?.intervalCount) return '';
  const { interval, intervalCount } = schedule;

  // We need to cleanup the string of {n} variables if the count is not higher than 1
  const cleanString =
    intervalCount > 1
      ? text
      : text.replaceAll(' {n}', '').replaceAll('{n} ', '');

  return parseTextWithVariables(cleanString, {
    n: intervalCount.toString(),
    interval: getPluralizedInterval(interval as INTERVAL, intervalCount),
  });
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
