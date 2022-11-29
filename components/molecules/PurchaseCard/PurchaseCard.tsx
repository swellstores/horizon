import React from 'react';
import Image from 'components/atoms/SafeImage';
import StatusIndicator from 'components/atoms/StatusIndicator';
import Button from 'components/atoms/Button';
import { BUTTON_TYPE } from 'types/shared/button';
import type {
  BillingSchedule,
  OrderSchedule,
  SUBSCRIPTION_STATUS,
} from 'types/subscription';
import type { ORDER_STATUS } from 'types/orders';
import type { MandatoryImageProps } from 'types/global';
import { PURCHASE_TYPE } from 'types/purchase';
import { formatDateToLocale } from 'lib/utils/date';
import type { Maybe } from 'lib/graphql/generated/sdk';
import ScheduleLabel from 'components/atoms/ScheduleLabel';
import useCurrencyStore from 'stores/currency';

interface BaseProps {
  title: string;
  productsImages: MandatoryImageProps[];
  link: string;
  date: Date;
}

export type SubscriptionCardProps = BaseProps & {
  status: SUBSCRIPTION_STATUS;
  billingSchedule: Maybe<BillingSchedule>;
  orderSchedule: Maybe<OrderSchedule>;
  dateOrderPeriodEnd: Maybe<Date>;
  recurringTotal?: number;
  type: PURCHASE_TYPE.SUBSCRIPTION;
};

export type OrderCardProps = BaseProps & {
  status: ORDER_STATUS;
  itemsCount: number;
  total: number;
  type: PURCHASE_TYPE.ORDER;
};

export type PurchaseCardProps = SubscriptionCardProps | OrderCardProps;

const LABELS = {
  next_billing: 'Next billing',
  order_date: 'Order date',
  items: 'Items',
  manage: 'Manage',
  view_order: 'View Order',
};

const PurchaseCard: React.FC<PurchaseCardProps> = ({
  status,
  title,
  productsImages,
  date,
  link,
  ...props
}) => {
  const formatPrice = useCurrencyStore((state) => state.formatPrice);
  return (
    <div className="border-outline rounded-xl border bg-background-primary p-6">
      <div className="md:flex md:justify-between">
        <div className="md:flex-1">
          <StatusIndicator status={status} />
          <h3 className="mt-2 font-headings text-xl font-semibold text-primary">
            {title}
          </h3>

          <div className="mt-4">
            <div className="flex justify-start gap-2 text-sm">
              <span className="text-body">
                {
                  LABELS[
                    props.type === PURCHASE_TYPE.SUBSCRIPTION
                      ? 'next_billing'
                      : 'order_date'
                  ]
                }
              </span>
              <span className="font-semibold text-primary">
                {formatDateToLocale(date)}
              </span>
            </div>

            {props.type === PURCHASE_TYPE.ORDER && (
              <div className="mt-1 flex justify-start gap-2 text-sm">
                <span className="text-body">{LABELS['items']}</span>
                <span className="font-semibold text-primary">
                  {props.itemsCount}
                </span>
              </div>
            )}
          </div>
        </div>

        <div
          className="mt-6 grid grid-cols-3 gap-2 md:mt-0 md:flex-1"
          style={{ direction: 'rtl' }}>
          {productsImages.map((image, i) => (
            <div
              key={image.alt + i}
              className="relative aspect-square md:h-full md:w-auto">
              <Image
                {...image}
                layout="fill"
                alt={image.alt}
                className="rounded-lg"
                objectFit="cover"
                objectPosition="center"
              />
            </div>
          ))}
        </div>
      </div>

      <hr className="border-outline mt-6 border"></hr>

      <div className="mt-6 md:flex md:items-center md:justify-between">
        {props.type === 'subscription' ? (
          <div className="flex flex-col space-y-2">
            {props?.billingSchedule && (
              <div className="inline-flex items-center justify-start space-x-2 text-sm text-primary">
                <ScheduleLabel
                  type="billing"
                  base="Every"
                  schedule={props.billingSchedule}
                  textClasses="text-sm"
                  iconClasses="h-6"
                  icon
                />
                {props?.recurringTotal && (
                  <span className="font-semibold">
                    {formatPrice(props.recurringTotal)}
                  </span>
                )}
              </div>
            )}
            {props?.orderSchedule && (
              <div className="inline-flex items-center justify-start gap-2 text-sm text-primary">
                <ScheduleLabel
                  type="order"
                  base="Every"
                  schedule={props.orderSchedule}
                  textClasses="text-sm"
                  iconClasses="h-6"
                  icon
                />
                {props?.dateOrderPeriodEnd && (
                  <span className="font-semibold">
                    {formatDateToLocale(props.dateOrderPeriodEnd)}
                  </span>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="inline-flex items-center justify-start gap-2 text-sm text-primary">
            {/* TODO: Make dyunamic */}
            <span className="text-body">Total</span>
            {/*formatPrice()*/}
            <span className="font-semibold">${props.total.toFixed(2)}</span>
          </div>
        )}

        <Button
          elType={BUTTON_TYPE.LINK}
          href={link}
          fullWidth
          className="mt-6 md:hidden">
          {LABELS[props.type === 'subscription' ? 'manage' : 'view_order']}
        </Button>
        <Button
          elType={BUTTON_TYPE.LINK}
          href={link}
          small
          className="hidden md:block">
          {LABELS[props.type === 'subscription' ? 'manage' : 'view_order']}
        </Button>
      </div>
    </div>
  );
};

export default PurchaseCard;
