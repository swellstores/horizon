import { INTERVAL } from 'types/shared/products';
import {
  formatLimitText,
  formatSubscriptionPrice,
  formatTrialText,
  getScheduleLabel,
  isLastSubscriptionCycle,
  ONE_DAY,
} from './subscription';

describe('subscription utils', () => {
  describe('#formatSubscriptionPrice', () => {
    it('returns the price formatted correctly', () => {
      expect(
        formatSubscriptionPrice('$10.00', {
          interval: INTERVAL.Daily,
          intervalCount: 1,
        }),
      ).toBe('$10.00/day');
      expect(
        formatSubscriptionPrice('€10.00', {
          interval: INTERVAL.Daily,
          intervalCount: 3,
        }),
      ).toBe('€10.00/3day');
      expect(
        formatSubscriptionPrice('£10.00', {
          interval: INTERVAL.Weekly,
          intervalCount: 1,
        }),
      ).toBe('£10.00/wk');
      expect(
        formatSubscriptionPrice('¥1,000', {
          interval: INTERVAL.Weekly,
          intervalCount: 2,
        }),
      ).toBe('¥1,000/2wk');
      expect(
        formatSubscriptionPrice('¥10.00', {
          interval: INTERVAL.Monthly,
          intervalCount: 1,
        }),
      ).toBe('¥10.00/mo');
      expect(
        formatSubscriptionPrice('₽10.00', {
          interval: INTERVAL.Monthly,
          intervalCount: 6,
        }),
      ).toBe('₽10.00/6mo');
      expect(
        formatSubscriptionPrice('₩10,000', {
          interval: INTERVAL.Yearly,
          intervalCount: 1,
        }),
      ).toBe('₩10,000/yr');
      expect(
        formatSubscriptionPrice('₹100.00', {
          interval: INTERVAL.Yearly,
          intervalCount: 5,
        }),
      ).toBe('₹100.00/5yr');
    });
  });

  describe('#getScheduleLabel', () => {
    it('formats schedules correctly', () => {
      expect(
        getScheduleLabel('Pay every', {
          interval: INTERVAL.Daily,
          intervalCount: 1,
        }),
      ).toBe('Pay every day');

      expect(
        getScheduleLabel('Receive it every', {
          interval: INTERVAL.Weekly,
          intervalCount: 3,
        }),
      ).toBe('Receive it every 3 weeks');
    });

    it('returns empty string when no schedule, interval or intervalCount', () => {
      expect(getScheduleLabel('Pay every', null)).toBe('');
      expect(getScheduleLabel('Pay every', { interval: null })).toBe('');
      expect(getScheduleLabel('Pay every', { intervalCount: null })).toBe('');
    });
  });

  describe('#formatLimitText', () => {
    it('formats limit text correctly', () => {
      expect(
        formatLimitText(
          { limit: 10, limitCurrent: 6 },
          'Limited to',
          'shipment',
          'shipments',
        ),
      ).toBe('Limited to 4 shipments');
      expect(
        formatLimitText(
          { limit: 10, limitCurrent: 9 },
          'Limited to',
          'shipment',
          'shipments',
        ),
      ).toBe('Limited to 1 shipment');
    });

    it('returns null when no limit, limitCurrent or limit - limitCurrent = 0', () => {
      expect(formatLimitText({}, 'Limited to', 'shipment', 'shipments')).toBe(
        null,
      );
      expect(
        formatLimitText(
          { limit: null, limitCurrent: null },
          'Limited to',
          'shipment',
          'shipments',
        ),
      ).toBe(null);
      expect(
        formatLimitText(
          { limit: 5, limitCurrent: 5 },
          'Limited to',
          'shipment',
          'shipments',
        ),
      ).toBe(null);
    });
  });

  describe('#formatTrialText', () => {
    it('formats trial text correctly', () => {
      expect(
        formatTrialText(
          {
            trial: true,
            dateTrialEnd: new Date(new Date().getTime() + 5 * ONE_DAY),
          },
          'Your trial period will end in',
          'day',
          'days',
        ),
      ).toBe('Your trial period will end in 6 days');

      expect(
        formatTrialText(
          {
            trial: true,
            dateTrialEnd: new Date(new Date().getTime() + 0.5 * ONE_DAY),
          },
          'Your trial period will end in',
          'day',
          'days',
        ),
      ).toBe('Your trial period will end in 1 day');
    });

    it('returns null when there is no trial', () => {
      expect(
        formatTrialText(
          {
            trial: false,
          },
          'Your trial period will end in',
          'day',
          'days',
        ),
      ).toBe(null);
    });
  });

  describe('#isLastSubscriptionCycle', () => {
    it('returns true when it is the last cycle', () => {
      expect(isLastSubscriptionCycle({ limit: 6, limitCurrent: 6 })).toBe(true);
    });

    it('returns false when it is not the last cycle', () => {
      expect(isLastSubscriptionCycle({ limit: 6, limitCurrent: 4 })).toBe(
        false,
      );
    });

    it('returns false when there is no limit/limitCurrent in the schedule', () => {
      expect(isLastSubscriptionCycle({ limit: null, limitCurrent: null })).toBe(
        false,
      );
    });
  });
});
