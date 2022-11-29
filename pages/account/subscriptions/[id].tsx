import React, { useCallback, useState } from 'react';
import {
  withAccountLayout,
  withAuthentication,
} from 'lib/utils/fetch_decorators';
import { getAccountLayout } from 'lib/utils/layout_getters';
import type { GetServerSideProps } from 'next';
import type { NextPageWithLayout, PageProps } from 'types/shared/pages';
import type { Maybe } from 'lib/graphql/generated/sdk';
import OrderHeader from 'components/molecules/OrderHeader';
import OrderItemsTable, {
  OrderItem,
} from 'components/molecules/OrderItemsTable';
import OrderSummary, { SummaryRow } from 'components/molecules/OrderSummary';
import OrderInfo from 'components/molecules/OrderInfo';
import { CARD_BRAND, PAYMENT_METHOD } from 'types/shared/payment';
import GhostButton from 'components/atoms/GhostButton';
import { BUTTON_STYLE, BUTTON_TYPE } from 'types/shared/button';
import ArrowLeft from 'assets/icons/arrow-left.svg';
import { SubscriptionSchedule, SUBSCRIPTION_STATUS } from 'types/subscription';
import Button from 'components/atoms/Button';
import ActionModal from 'components/molecules/ActionModal';
import BannerInfo from 'components/atoms/BannerInfo';
import { TEXT_ALIGNMENT } from 'types/shared/alignment';
import {
  formatLimitText,
  formatSubscriptionInterval,
  formatSubscriptionPrice,
  formatTrialText,
  isLastSubscriptionCycle,
} from 'lib/utils/subscription';
import { getClientWithSessionToken } from 'lib/graphql/client';
import { getMultilineAddress } from 'lib/utils/account';
import { formatPriceByCurrency } from 'lib/utils/price';
import type { OrderInfoCardProps } from 'components/molecules/OrderInfoCard';
import useNotificationStore from 'stores/notification';
import { NOTIFICATION_TYPE } from 'types/shared/notification';
import type { INTERVAL } from 'types/shared/products';
import { formatDateToLocale } from 'lib/utils/date';
import { useRouter } from 'next/router';
import { denullifyArray } from 'lib/utils/denullify';
import useFetchApi from 'hooks/useFetchApi';
import { API_ROUTES } from 'types/shared/api';

interface SubscriptionData {
  id: string;
  name: string;
  status: SUBSCRIPTION_STATUS;
  dateCreated: Date | null;
  datePeriodEnd: Date | null;
  dateOrderPeriodEnd: Date | null;
  quantity: number;
  grandTotal: string;
  billingScheduleText: string;
  billingLimitText: string | null;
  orderLimitText: string | null;
  notificationText: Maybe<string>;
  orderItems: OrderItem[];
  summaryRows: SummaryRow[];
  totalRow: SummaryRow;
  subscriptionSchedule: SubscriptionSchedule;
  shippingInfo: OrderInfoCardProps[];
  billingInfo: OrderInfoCardProps[];
}

interface SubscriptionDetailPageProps extends PageProps {
  subscription: SubscriptionData;
  text: {
    backToSubscriptionsLabel: string;
    createdLabel: string;
    nextBillingLabel: string;
    itemsLabel: string;
    totalLabel: string;
    quantityLabel: string;
    priceLabel: string;
    subtotalLabel: string;
    discountsLabel: string;
    shippingLabel: string;
    taxLabel: string;
    refundLabel: string;
    deliveryInfoTitle: string;
    detailsLabel: string;
    phoneNumberLabel: string;
    methodLabel: string;
    orderNotesLabel: string;
    paymentInfoTitle: string;
    paymentMethodLabel: string;
    cardLabel: string;
    billingAddressLabel: string;
    cancelSubscriptionBody: string;
    cancelSubscriptionLabel: string;
    cancelDialogTitle: string;
    cancelDialogBody: string;
    cancelButtonLabel: string;
    cancelSubscriptionButtonLabel: string;
    trialPeriodEndBody: string;
    dayLabel: string;
    daysLabel: string;
    billingSchedulePrefix: string;
    limitPrefix: string;
    renewalLabel: string;
    renewalsLabel: string;
    shipmentLabel: string;
    shipmentsLabel: string;
    cancelSubscriptionSuccessMessage: string;
    cancelSubscriptionErrorMessage: string;
  };
}

export const propsCallback: GetServerSideProps<
  SubscriptionDetailPageProps
> = async (context) => {
  const subscriptionId = context.params?.id;
  const sessionTokenCookie = context.req.cookies.sessionToken;
  if (
    !subscriptionId ||
    typeof subscriptionId !== 'string' ||
    !sessionTokenCookie
  ) {
    return {
      notFound: true,
    };
  }

  const client = getClientWithSessionToken(context.req.cookies);

  const subscription = (
    await client.getSubscriptionById({ id: subscriptionId })
  )?.data?.subscriptionById;

  if (!subscription) {
    return {
      notFound: true,
    };
  }

  // TODO: i18n
  const text = {
    backToSubscriptionsLabel: 'Back to subscriptions',
    createdLabel: 'Created',
    nextBillingLabel: 'Next billing',
    itemsLabel: 'Items',
    totalLabel: 'Total',
    quantityLabel: 'Qty',
    priceLabel: 'Price',
    subtotalLabel: 'Subtotal',
    discountsLabel: 'Discounts & Credits',
    shippingLabel: 'Shipping',
    taxLabel: 'VAT',
    refundLabel: 'Refund',
    deliveryInfoTitle: 'Delivery information',
    detailsLabel: 'Details',
    phoneNumberLabel: 'Phone number',
    methodLabel: 'Method',
    orderNotesLabel: 'Order notes',
    paymentInfoTitle: 'Payment information',
    paymentMethodLabel: 'Payment method',
    cardLabel: 'Card',
    billingAddressLabel: 'Billing address',
    cancelSubscriptionBody: 'You can cancel your subscription at anytime.',
    cancelSubscriptionLabel: 'Cancel subscription',
    cancelDialogTitle: 'Cancel subscription',
    cancelDialogBody:
      'Cancelling your subscription is permanent. Are you sure you want to proceed?',
    cancelButtonLabel: 'Cancel',
    cancelSubscriptionButtonLabel: 'Cancel subscription',
    trialPeriodEndBody: 'Your trial period will end in',
    dayLabel: 'day',
    daysLabel: 'days',
    billingSchedulePrefix: 'Every',
    limitPrefix: 'Limited to',
    renewalLabel: 'renewal',
    renewalsLabel: 'renewals',
    shipmentLabel: 'shipment',
    shipmentsLabel: 'shipments',
    cancelSubscriptionSuccessMessage: 'Your subscription is canceled',
    cancelSubscriptionErrorMessage:
      'Something went wrong, please try again later',
  };

  const billingScheduleText =
    subscription?.billingSchedule?.interval &&
    subscription?.billingSchedule?.intervalCount
      ? `${text.billingSchedulePrefix} ${formatSubscriptionInterval(
          subscription.billingSchedule.interval as INTERVAL,
          subscription.billingSchedule.intervalCount,
          true,
        )}`
      : '';

  return {
    props: {
      pageTitle: 'Subscriptions',
      subscription: {
        id: subscriptionId,
        // Header
        name: subscription?.product?.name ?? '',
        status: subscription?.status as SUBSCRIPTION_STATUS,
        dateCreated: subscription?.dateCreated ?? null,
        quantity: subscription?.quantity ?? 0,
        grandTotal: formatPriceByCurrency(subscription?.currency)(
          subscription?.grandTotal ?? 0,
        ),
        billingScheduleText,
        // Info banner
        notificationText: formatTrialText(
          subscription,
          text.trialPeriodEndBody,
          text.dayLabel,
          text.daysLabel,
        ),
        // Order items table
        orderItems: [
          {
            title: subscription?.product?.name ?? '',
            href: `/products/${subscription?.product?.slug}`,
            image: {
              alt: subscription?.product?.images?.[0]?.caption ?? '',
              src: subscription?.product?.images?.[0]?.file?.url ?? '',
              width: subscription?.product?.images?.[0]?.file?.width ?? 0,
              height: subscription?.product?.images?.[0]?.file?.height ?? 0,
            },
            options:
              subscription?.options?.map((option) => option?.value ?? '') ?? [],
            quantity: subscription?.quantity ?? 0,
            price: formatSubscriptionPrice(
              formatPriceByCurrency(subscription?.currency)(
                subscription.grandTotal ?? 0,
              ),
              {
                interval: subscription.billingSchedule?.interval,
                intervalCount: subscription.billingSchedule?.intervalCount,
              },
            ),
          },
        ],
        // Order summary table
        summaryRows: [
          {
            label: text.subtotalLabel,
            value: formatPriceByCurrency(subscription?.currency)(
              subscription?.subTotal ?? 0,
            ),
          },
          {
            label: text.discountsLabel,
            value: formatPriceByCurrency(subscription?.currency)(
              subscription?.discountTotal ?? 0,
            ),
          },
          {
            label: text.shippingLabel,
            value: formatPriceByCurrency(subscription?.currency)(
              subscription?.shipping?.price ?? 0,
            ),
          },
          {
            label: text.taxLabel,
            value: formatPriceByCurrency(subscription?.currency)(
              subscription?.taxTotal ?? 0,
            ),
          },
        ],
        totalRow: {
          label: text.totalLabel,
          value: formatPriceByCurrency(subscription?.currency)(
            subscription?.grandTotal ?? 0,
          ),
        },
        subscriptionSchedule: {
          billingSchedule: subscription?.billingSchedule ?? null,
          orderSchedule: subscription?.orderSchedule ?? null,
        },
        datePeriodEnd: !isLastSubscriptionCycle(subscription.billingSchedule)
          ? subscription.datePeriodEnd
          : null,
        dateOrderPeriodEnd: !isLastSubscriptionCycle(subscription.orderSchedule)
          ? subscription.dateOrderPeriodEnd
          : null,
        billingLimitText: formatLimitText(
          subscription?.billingSchedule,
          text.limitPrefix,
          text.renewalLabel,
          text.renewalsLabel,
        ),
        orderLimitText: formatLimitText(
          subscription?.orderSchedule,
          text.limitPrefix,
          text.shipmentLabel,
          text.shipmentsLabel,
        ),
        // Order info = shipping
        shippingInfo: [
          ...(subscription?.shipping &&
          getMultilineAddress(subscription.shipping)
            ? [
                {
                  title: text.detailsLabel,
                  body: getMultilineAddress(subscription.shipping) ?? '',
                },
              ]
            : []),
          ...(subscription?.shipping?.phone
            ? [
                {
                  title: text.phoneNumberLabel,
                  body: subscription.shipping.phone,
                },
              ]
            : []),
          ...(subscription?.shipping?.serviceName
            ? [
                {
                  title: text.methodLabel,
                  body: subscription.shipping.serviceName,
                },
              ]
            : []),
        ],
        // Order info = billing
        billingInfo: [
          ...(subscription?.billing?.method
            ? [
                {
                  title: text.paymentMethodLabel,
                  payment: {
                    method: subscription.billing.method as PAYMENT_METHOD,
                    ...(subscription?.billing?.method ===
                      PAYMENT_METHOD.CARD && {
                      card: {
                        name: subscription?.billing?.name ?? '',
                        brand: subscription.billing.card?.brand as CARD_BRAND,
                        label: text.cardLabel ?? '',
                        last4: subscription.billing.card?.last4 ?? '',
                        expiredDate:
                          subscription.billing.card?.expMonth &&
                          subscription.billing.card?.expYear
                            ? `${
                                subscription.billing.card.expMonth < 10
                                  ? `0${subscription.billing.card.expMonth}`
                                  : subscription.billing.card.expMonth
                              }/${subscription.billing.card.expYear}`
                            : '',
                      },
                    }),
                  },
                },
              ]
            : []),
          ...(subscription?.billing &&
          getMultilineAddress(subscription?.billing)
            ? [
                {
                  title: text.billingAddressLabel,
                  body: getMultilineAddress(subscription?.billing) ?? '',
                },
              ]
            : []),
        ],
      },
      text,
    },
  };
};

export const getServerSideProps = withAccountLayout(
  withAuthentication(propsCallback),
);

const SubscriptionDetailPage: NextPageWithLayout<
  SubscriptionDetailPageProps
> = ({ subscription, text }) => {
  const { locale } = useRouter();
  const [status, setStatus] = useState(subscription.status);
  const [cancelSubscriptionOpen, setCancelSubscriptionOpen] = useState(false);
  const send = useNotificationStore((store) => store.send);
  const fetchApi = useFetchApi();

  const dateCreatedRow = subscription?.dateCreated
    ? [text.createdLabel, formatDateToLocale(subscription.dateCreated, locale)]
    : null;
  const nextBillingRow = subscription.datePeriodEnd
    ? [
        text.nextBillingLabel,
        formatDateToLocale(subscription.datePeriodEnd, locale),
      ]
    : null;
  const itemsRow = [text.itemsLabel, subscription.quantity];
  const headerLeftColumn = denullifyArray([
    dateCreatedRow,
    nextBillingRow,
    itemsRow,
  ]);

  const responseCallback = useCallback(
    async (res: Response) => {
      const data = await res.json();

      setCancelSubscriptionOpen(false);

      if (res.status === 200 && !!data?.canceled) {
        send({
          message: text.cancelSubscriptionSuccessMessage,
          type: NOTIFICATION_TYPE.INFO,
        });

        setStatus(SUBSCRIPTION_STATUS.CANCELED);
      } else {
        send({
          message: text.cancelSubscriptionErrorMessage,
          type: NOTIFICATION_TYPE.ERROR,
        });
      }
    },
    [send, text],
  );

  const errorCallback = useCallback(() => {
    send({
      message: text.cancelSubscriptionErrorMessage,
      type: NOTIFICATION_TYPE.ERROR,
    });
  }, [send, text]);

  const cancelSubscription = useCallback(
    () =>
      fetchApi(
        {
          url: API_ROUTES.CANCEL_SUBSCRIPTION,
          options: {
            method: 'POST',
            body: JSON.stringify({ id: subscription.id }),
          },
        },
        responseCallback,
        errorCallback,
      ),
    [responseCallback, errorCallback, fetchApi, subscription.id],
  );

  return (
    <article className="max-w-5xl">
      <GhostButton
        elType={BUTTON_TYPE.LINK}
        href="/account/subscriptions"
        className="space-x-1.5">
        <ArrowLeft className="w-[16.6px]" />
        <span>{text.backToSubscriptionsLabel}</span>
      </GhostButton>
      <OrderHeader
        title={subscription.name}
        status={status}
        totalText={subscription?.billingScheduleText ?? ''}
        total={subscription.grandTotal}
        leftColumn={headerLeftColumn}
        isSubscription
        className="mt-10"
      />
      {subscription?.notificationText && (
        <BannerInfo textAlignment={TEXT_ALIGNMENT.CENTER} className="mt-6">
          {subscription.notificationText}
        </BannerInfo>
      )}
      <OrderItemsTable
        orderItems={subscription.orderItems}
        quantityText={text.quantityLabel}
        priceText={text.priceLabel}
        itemsText={text.itemsLabel}
        className="mt-8"
      />
      <OrderSummary
        rows={subscription.summaryRows}
        totalRow={subscription.totalRow}
        subscriptionSchedule={subscription.subscriptionSchedule}
        nextBillingDate={subscription.datePeriodEnd}
        nextOrderDate={subscription.dateOrderPeriodEnd}
        billingLimitText={subscription.billingLimitText}
        orderLimitText={subscription.orderLimitText}
        className="mt-8"
      />
      <OrderInfo
        title={text.deliveryInfoTitle}
        infoCards={subscription.shippingInfo}
        className="border-b-outline mt-10 border-b pb-10"
      />
      <OrderInfo
        title={text.paymentInfoTitle}
        infoCards={subscription.billingInfo}
        className="border-b-outline mt-10 border-b pb-10"
      />
      {status !== SUBSCRIPTION_STATUS.CANCELED && (
        <div className="mt-10 flex flex-col space-y-6">
          <p className="text-md text-body">{text.cancelSubscriptionBody}</p>
          <Button
            elType={BUTTON_TYPE.BUTTON}
            small
            className="w-full md:w-fit"
            onClick={() => setCancelSubscriptionOpen(true)}
            buttonStyle={BUTTON_STYLE.SECONDARY}>
            {text.cancelSubscriptionLabel}
          </Button>
          <ActionModal
            title={text.cancelDialogTitle}
            body={text.cancelDialogBody}
            open={cancelSubscriptionOpen}
            onClose={() => setCancelSubscriptionOpen(false)}
            actionButtons={[
              {
                label: text.cancelSubscriptionButtonLabel,
                onClick: cancelSubscription,
                style: BUTTON_STYLE.DANGER,
              },
              {
                label: text.cancelButtonLabel,
                onClick: () => setCancelSubscriptionOpen(false),
                style: BUTTON_STYLE.SECONDARY,
              },
            ]}
          />
        </div>
      )}
    </article>
  );
};

SubscriptionDetailPage.getLayout = getAccountLayout;

export default SubscriptionDetailPage;
