import useClassNames from 'hooks/useClassNames';
import React from 'react';
import ScheduleLabel from 'components/atoms/ScheduleLabel';
import type { SubscriptionSchedule } from 'types/subscription';
import CalendarIcon from 'assets/icons/calendar.svg';
import { useRouter } from 'next/router';
import { formatDateToLocale } from 'lib/utils/date';

export interface SummaryRow {
  label: string;
  value: string;
  bold?: boolean;
}

export interface SummaryBilling {
  billingScheduleLabel: string;
  billingScheduleText: string;
  nextBillingDateText: string;
}
export interface OrderSummaryProps {
  caption?: string;
  rows: SummaryRow[];
  totalRow: SummaryRow;
  subscriptionSchedule?: SubscriptionSchedule;
  nextBillingDate?: Date | null;
  nextOrderDate?: Date | null;
  billingLimitText?: string | null;
  orderLimitText?: string | null;
  className: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  caption,
  rows,
  totalRow,
  subscriptionSchedule,
  nextBillingDate,
  nextOrderDate,
  billingLimitText,
  orderLimitText,
  className,
}) => {
  const { locale } = useRouter();

  return (
    <div
      className={[
        'w-full rounded-xl bg-background-secondary p-6',
        className ?? '',
      ].join(' ')}>
      <table className="w-full text-sm text-primary">
        {caption && (
          <caption className="mb-4 text-left text-2xl font-semibold text-primary">
            {caption}
          </caption>
        )}
        <tbody className="mb-2 table w-full">
          {rows.map((row) => (
            <tr key={`${row.label}${row.value}`}>
              <th
                className={[
                  'pb-2 text-left',
                  row?.bold ? 'font-semibold' : 'font-normal',
                ].join(' ')}>
                {row.label}
              </th>
              <td
                className={[
                  'pb-2 text-right',
                  row?.bold ? 'font-semibold' : '',
                ].join(' ')}>
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot
          className={useClassNames('border-outline table w-full', {
            'border-t': !subscriptionSchedule,
            'border-b': !!subscriptionSchedule,
          })}>
          <tr className="text-lg font-semibold">
            <th
              className={useClassNames('text-left', {
                'pt-4': !subscriptionSchedule,
                'pb-6': !!subscriptionSchedule,
              })}>
              {totalRow.label}
            </th>
            <td
              className={useClassNames('text-right', {
                'pt-4': !subscriptionSchedule,
                'pb-6': !!subscriptionSchedule,
              })}>
              {totalRow.value}
            </td>
          </tr>
        </tfoot>
      </table>
      {subscriptionSchedule && (
        <div className="flex-col space-y-2 pt-6 text-sm">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center space-x-4">
              <ScheduleLabel
                type="billing"
                schedule={subscriptionSchedule.billingSchedule}
                textClasses="text-sm font-semibold"
                iconClasses="w-5"
                icon
              />
              {nextBillingDate && (
                <span className="flex items-center space-x-1 text-body">
                  <CalendarIcon className="w-5" />
                  <span>{formatDateToLocale(nextBillingDate, locale)}</span>
                </span>
              )}
            </div>
            {billingLimitText && (
              <span className="text-2xs">{billingLimitText}</span>
            )}
          </div>
          {/* TODO: i18n */}
          {subscriptionSchedule?.orderSchedule && (
            <div className="flex flex-col space-y-1">
              <div className="flex items-center space-x-4">
                <ScheduleLabel
                  type="order"
                  base="Shipped every"
                  schedule={subscriptionSchedule?.orderSchedule}
                  className="mt-0.5"
                  textClasses="text-sm font-semibold"
                  iconClasses="w-5"
                  icon
                />
                {nextOrderDate && (
                  <span className="flex items-center space-x-1 text-body">
                    <CalendarIcon className="w-5" />
                    <span>{formatDateToLocale(nextOrderDate, locale)}</span>
                  </span>
                )}
              </div>
              {orderLimitText && (
                <span className="text-2xs">{orderLimitText}</span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
