import React, { useCallback, useState } from 'react';
import {
  withAccountLayout,
  withAuthentication,
} from 'lib/utils/fetch_decorators';
import { getAccountLayout } from 'lib/utils/layout_getters';
import type { GetServerSideProps } from 'next';
import type { NextPageWithLayout, PageProps } from 'types/shared/pages';
import type { SwellSubscription } from 'lib/graphql/generated/sdk';
import OrderHeader from 'components/molecules/OrderHeader';
import OrderItemsTable from 'components/molecules/OrderItemsTable';
import OrderSummary from 'components/molecules/OrderSummary';
import OrderInfo from 'components/molecules/OrderInfo';
import { CARD_BRAND, PAYMENT_METHOD } from 'types/shared/payment';
import GhostButton from 'components/atoms/GhostButton';
import { BUTTON_STYLE, BUTTON_TYPE } from 'types/shared/button';
import ArrowLeft from 'assets/icons/arrow-left.svg';
import { SUBSCRIPTION_STATUS } from 'types/subscription';
import Button from 'components/atoms/Button';
import ActionModal from 'components/molecules/ActionModal';
import BannerInfo from 'components/atoms/BannerInfo';
import { TEXT_ALIGNMENT } from 'types/shared/alignment';
import {
  formatLimitText,
  formatScheduleLabel,
  formatSubscriptionPrice,
  formatTrialText,
  isLastSubscriptionCycle,
} from 'lib/utils/subscription';
import { getClientWithSessionToken } from 'lib/graphql/client';
import { getMultilineAddress } from 'lib/utils/account';
import { formatPriceByCurrency } from 'lib/utils/price';
import useNotificationStore from 'stores/notification';
import { NOTIFICATION_TYPE } from 'types/shared/notification';
import { formatDateToLocale } from 'lib/utils/date';
import { useRouter } from 'next/router';
import { denullifyArray } from 'lib/utils/denullify';
import useFetchApi from 'hooks/useFetchApi';
import { API_ROUTES } from 'types/shared/api';
import useI18n, { I18n } from 'hooks/useI18n';

interface SubscriptionDetailPageProps extends PageProps {
  subscription: SwellSubscription;
}

const subscriptionDetailsText = (i18n: I18n) => ({
  backToSubscriptionsLabel: i18n('account.subscriptions.details.back_link'),
  createdLabel: i18n('account.subscriptions.details.created_label'),
  nextBillingLabel: i18n('account.subscriptions.details.next_billing_label'),
  itemsLabel: i18n('account.subscriptions.details.items_label'),
  totalLabel: i18n('account.subscriptions.details.total_label'),
  quantityLabel: i18n('account.subscriptions.details.quantity_label'),
  priceLabel: i18n('account.subscriptions.details.price_label'),
  subtotalLabel: i18n('account.subscriptions.details.subtotal_label'),
  discountsLabel: i18n('account.subscriptions.details.discounts_label'),
  shippingLabel: i18n('account.subscriptions.details.shipping_label'),
  taxLabel: i18n('account.subscriptions.details.tax_label'),
  refundLabel: i18n('account.subscriptions.details.refund_label'),
  deliveryInfoTitle: i18n('account.subscriptions.details.delivery_info_title'),
  detailsLabel: i18n('account.subscriptions.details.details_label'),
  phoneNumberLabel: i18n('account.subscriptions.details.phone_number_label'),
  methodLabel: i18n('account.subscriptions.details.method_label'),
  orderNotesLabel: i18n('account.subscriptions.details.order_notes_label'),
  paymentInfoTitle: i18n('account.subscriptions.details.payment_info_title'),
  paymentMethodLabel: i18n(
    'account.subscriptions.details.payment_method_label',
  ),
  cardLabel: i18n('account.subscriptions.details.card_label'),
  billingAddressLabel: i18n(
    'account.subscriptions.details.billing_address_label',
  ),
  cancel: {
    message: i18n('account.subscriptions.details.cancel.message'),
    label: i18n('account.subscriptions.details.cancel.label'),
    dialogTitle: i18n('account.subscriptions.details.cancel.dialog_title'),
    dialogBody: i18n('account.subscriptions.details.cancel.dialog_body'),
    buttonLabel: i18n(
      'account.subscriptions.details.cancel.cancel_button_label',
    ),
    subscriptionButtonLabel: i18n(
      'account.subscriptions.details.cancel.cancel_subscription_button_label',
    ),
    successMessage: i18n(
      'account.subscriptions.details.cancel.success_message',
    ),
    errorMessage: i18n('account.subscriptions.details.cancel.error_message'),
  },
  trialEndMessage: i18n('account.subscriptions.details.trial_end_message'),
  headerBillingMessage: i18n(
    'account.subscriptions.details.header_billing_message',
  ),
  renewalLimitLabel: i18n('account.subscriptions.details.renewal_limit_label'),
  shipmentLimitLabel: i18n(
    'account.subscriptions.details.shipment_limit_label',
  ),
  renewalSingularLabel: i18n(
    'account.subscriptions.details.renewal_singular_label',
  ),
  renewalPluralLabel: i18n(
    'account.subscriptions.details.renewal_plural_label',
  ),
  shipmentSingularLabel: i18n(
    'account.subscriptions.details.shipment_singular_label',
  ),
  shipmentPluralLabel: i18n(
    'account.subscriptions.details.shipment_plural_label',
  ),
});

const formatSubscription = (
  subscription: SwellSubscription,
  text: ReturnType<typeof subscriptionDetailsText>,
) => ({
  id: subscription.id,
  // Header
  name: subscription?.product?.name ?? '',
  status: subscription?.status as SUBSCRIPTION_STATUS,
  dateCreated: subscription?.dateCreated ?? null,
  quantity: subscription?.quantity ?? 0,
  grandTotal: formatPriceByCurrency(subscription?.currency)(
    subscription?.grandTotal ?? 0,
  ),
  billingScheduleText: formatScheduleLabel(
    text.headerBillingMessage,
    subscription.billingSchedule,
  ),
  // Info banner
  notificationText: formatTrialText(text.trialEndMessage, subscription),
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
    text.renewalLimitLabel,
    text.renewalSingularLabel,
    text.renewalPluralLabel,
    'renewal',
  ),
  orderLimitText: formatLimitText(
    subscription?.orderSchedule,
    text.shipmentLimitLabel,
    text.shipmentSingularLabel,
    text.shipmentPluralLabel,
    'shipment',
  ),
  // Order info = shipping
  shippingInfo: [
    ...(subscription?.shipping && getMultilineAddress(subscription.shipping)
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
              ...(subscription?.billing?.method === PAYMENT_METHOD.CARD && {
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
    ...(subscription?.billing && getMultilineAddress(subscription?.billing)
      ? [
          {
            title: text.billingAddressLabel,
            body: getMultilineAddress(subscription?.billing) ?? '',
          },
        ]
      : []),
  ],
});

export const propsCallback: GetServerSideProps<
  SubscriptionDetailPageProps
> = async (context) => {
  const { locale } = context;
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

  return {
    props: {
      pageType: 'subscriptions',
      subscription,
      ...(locale ? { locale } : {}),
    },
  };
};

export const getServerSideProps = withAccountLayout(
  withAuthentication(propsCallback),
);

const SubscriptionDetailPage: NextPageWithLayout<
  SubscriptionDetailPageProps
> = (props) => {
  const i18n = useI18n();
  const text = subscriptionDetailsText(i18n);
  const subscription = formatSubscription(props.subscription, text);

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
          message: text.cancel.successMessage,
          type: NOTIFICATION_TYPE.INFO,
        });

        setStatus(SUBSCRIPTION_STATUS.CANCELED);
      } else {
        send({
          message: text.cancel.errorMessage,
          type: NOTIFICATION_TYPE.ERROR,
        });
      }
    },
    [send, text],
  );

  const errorCallback = useCallback(() => {
    send({
      message: text.cancel.errorMessage,
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
          <p className="text-md text-body">{text.cancel.message}</p>
          <Button
            elType={BUTTON_TYPE.BUTTON}
            small
            className="w-full md:w-fit"
            onClick={() => setCancelSubscriptionOpen(true)}
            buttonStyle={BUTTON_STYLE.SECONDARY}>
            {text.cancel.label}
          </Button>
          <ActionModal
            title={text.cancel.dialogTitle}
            body={text.cancel.dialogBody}
            open={cancelSubscriptionOpen}
            onClose={() => setCancelSubscriptionOpen(false)}
            actionButtons={[
              {
                label: text.cancel.subscriptionButtonLabel,
                onClick: cancelSubscription,
                style: BUTTON_STYLE.DANGER,
              },
              {
                label: text.cancel.buttonLabel,
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
