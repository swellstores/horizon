import React from 'react';
import {
  withAccountLayout,
  withAuthentication,
} from 'lib/utils/fetch_decorators';
import { getAccountLayout } from 'lib/utils/layout_getters';
import type { GetServerSideProps } from 'next';
import type {
  AccountPageProps,
  NextPageWithLayout,
  PageProps,
} from 'types/shared/pages';
import OrderHeader from 'components/molecules/OrderHeader';
import OrderItemsTable from 'components/molecules/OrderItemsTable';
import OrderSummary from 'components/molecules/OrderSummary';
import OrderInfo from 'components/molecules/OrderInfo';
import { CARD_BRAND, PAYMENT_METHOD } from 'types/shared/payment';
import GhostButton from 'components/atoms/GhostButton';
import { BUTTON_TYPE } from 'types/shared/button';
import ArrowLeft from 'assets/icons/arrow-left.svg';
import { formatSubscriptionPrice } from 'lib/utils/subscription';
import { getMultilineAddress } from 'lib/utils/account';
import { formatPriceByCurrency } from 'lib/utils/price';
import type { ORDER_STATUS } from 'types/orders';
import { useRouter } from 'next/router';
import { formatDateToLocale } from 'lib/utils/date';
import { denullifyArray } from 'lib/utils/denullify';
import { getClientWithSessionToken } from 'lib/graphql/client';
import type { SwellOrder } from 'lib/graphql/generated/sdk';
import useI18n, { I18n } from 'hooks/useI18n';

interface OrderDetailPageProps extends PageProps, AccountPageProps {
  order: SwellOrder;
}

const orderDetailsText = (i18n: I18n) => ({
  backToOrdersLabel: i18n('account.orders.details.back_link'),
  orderLabel: i18n('account.orders.details.order_label'),
  createReturnLabel: i18n('account.orders.details.create_return_label'),
  returnDialogTitle: i18n('account.orders.details.return_dialog_title'),
  returnDialogBody: i18n('account.orders.details.return_dialog_body'),
  orderDateLabel: i18n('account.orders.details.order_date_label'),
  itemsLabel: i18n('account.orders.details.items_label'),
  totalLabel: i18n('account.orders.details.total_label'),
  quantityLabel: i18n('account.orders.details.quantity_label'),
  priceLabel: i18n('account.orders.details.price_label'),
  subtotalLabel: i18n('account.orders.details.subtotal_label'),
  discountsLabel: i18n('account.orders.details.discounts_label'),
  shippingLabel: i18n('account.orders.details.shipping_label'),
  taxLabel: i18n('account.orders.details.tax_label'),
  refundLabel: i18n('account.orders.details.refund_label'),
  deliveryInfoTitle: i18n('account.orders.details.delivery_info_title'),
  detailsLabel: i18n('account.orders.details.details_label'),
  phoneNumberLabel: i18n('account.orders.details.phone_number_label'),
  methodLabel: i18n('account.orders.details.method_label'),
  orderNotesLabel: i18n('account.orders.details.order_notes_label'),
  paymentInfoTitle: i18n('account.orders.details.payment_info_title'),
  paymentMethodLabel: i18n('account.orders.details.payment_method_label'),
  cardLabel: i18n('account.orders.details.card_label'),
  billingAddressLabel: i18n('account.orders.details.billing_address_label'),
});

const formatOrder = (
  order: SwellOrder,
  text: ReturnType<typeof orderDetailsText>,
) => ({
  // Header
  name: `${text.orderLabel} #${order.number}`,
  status: order?.status as ORDER_STATUS,
  dateCreated: order.dateCreated,
  quantity: order?.itemQuantity ?? 0,
  grandTotal: formatPriceByCurrency(order?.currency)(order?.grandTotal ?? 0),
  // Order items table
  orderItems:
    order?.items?.map((item) => ({
      title: item?.product?.name ?? '',
      href: `/products/${item?.product?.slug}`,
      image: {
        alt: item?.product?.images?.[0]?.caption ?? '',
        src: item?.product?.images?.[0]?.file?.url ?? '',
        width: item?.product?.images?.[0]?.file?.width ?? 0,
        height: item?.product?.images?.[0]?.file?.height ?? 0,
      },
      options: item?.options?.map((option) => option?.value ?? '') ?? [],
      quantity: item?.quantity ?? 0,
      price: formatSubscriptionPrice(
        formatPriceByCurrency(order?.currency)(item?.priceTotal ?? 0),
        {
          interval: item?.purchaseOption?.billingSchedule?.interval,
          intervalCount: item?.purchaseOption?.billingSchedule?.intervalCount,
        },
      ),
    })) ?? [],
  // Order summary table
  summaryRows: [
    {
      label: text.subtotalLabel,
      value: formatPriceByCurrency(order?.currency)(order?.subTotal ?? 0),
    },
    {
      label: text.discountsLabel,
      value: formatPriceByCurrency(order?.currency)(order?.discountTotal ?? 0),
    },
    {
      label: text.shippingLabel,
      value: formatPriceByCurrency(order?.currency)(
        order?.shipping?.price ?? 0,
      ),
    },
    {
      label: text.taxLabel,
      value: formatPriceByCurrency(order?.currency)(order?.taxTotal ?? 0),
    },
    ...(order?.refunds?.results?.length
      ? [
          {
            label: text.refundLabel,
            value: formatPriceByCurrency(order?.currency)(
              order.refunds?.results?.[0]?.amount ?? 0,
            ),
            bold: true,
          },
        ]
      : []),
  ],
  totalRow: {
    label: text.totalLabel,
    value: formatPriceByCurrency(order?.currency)(order?.grandTotal ?? 0),
  },
  // Order info = shipping
  shippingInfo: [
    ...(order?.shipping && getMultilineAddress(order.shipping)
      ? [
          {
            title: text.detailsLabel,
            body: getMultilineAddress(order.shipping) ?? '',
          },
        ]
      : []),
    ...(order?.shipping?.phone
      ? [
          {
            title: text.phoneNumberLabel,
            body: order.shipping.phone,
          },
        ]
      : []),
    ...(order?.shipping?.serviceName
      ? [
          {
            title: text.methodLabel,
            body: order.shipping.serviceName,
          },
        ]
      : []),
  ],
  // Order info = billing
  billingInfo: [
    ...(order?.billing?.method
      ? [
          {
            title: text.paymentMethodLabel,
            payment: {
              method: order.billing.method as PAYMENT_METHOD,
              ...(order?.billing?.method === PAYMENT_METHOD.CARD && {
                card: {
                  name: order?.billing?.name ?? '',
                  brand: order.billing.card?.brand as CARD_BRAND,
                  label: text.cardLabel ?? '',
                  last4: order.billing.card?.last4 ?? '',
                  expiredDate:
                    order.billing.card?.expMonth && order.billing.card?.expYear
                      ? `${
                          order.billing.card.expMonth < 10
                            ? `0${order.billing.card.expMonth}`
                            : order.billing.card.expMonth
                        }/${order.billing.card.expYear}`
                      : '',
                },
              }),
            },
          },
        ]
      : []),
    ...(order?.billing && getMultilineAddress(order?.billing)
      ? [
          {
            title: text.billingAddressLabel,
            body: getMultilineAddress(order?.billing) ?? '',
          },
        ]
      : []),
  ],
});

export const propsCallback: GetServerSideProps<OrderDetailPageProps> = async (
  context,
) => {
  const { locale } = context;
  const orderId = context.params?.id;
  const sessionTokenCookie = context.req.cookies.sessionToken;
  if (!orderId || typeof orderId !== 'string' || !sessionTokenCookie) {
    return {
      notFound: true,
    };
  }

  const client = getClientWithSessionToken(context.req.cookies);

  const order = (await client.getOrderById({ id: orderId }))?.data?.orderById;

  if (!order) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      pageType: 'orders',
      order,
      ...(locale ? { locale } : {}),
    },
  };
};

export const getServerSideProps = withAccountLayout(
  withAuthentication(propsCallback),
);

const OrderDetailPage: NextPageWithLayout<OrderDetailPageProps> = (props) => {
  const i18n = useI18n();
  const text = orderDetailsText(i18n);
  const order = formatOrder(props.order, text);

  const { locale } = useRouter();

  const dateCreatedRow = order?.dateCreated
    ? [text.orderDateLabel, formatDateToLocale(order.dateCreated, locale)]
    : null;
  const itemsRow = [text.itemsLabel, order.quantity];

  const headerLeftColumn = denullifyArray([dateCreatedRow, itemsRow]);

  return (
    <article className="max-w-5xl">
      <GhostButton
        elType={BUTTON_TYPE.LINK}
        href="/account/orders"
        className="space-x-1.5">
        <ArrowLeft className="w-[16.6px]" />
        <span>{text.backToOrdersLabel}</span>
      </GhostButton>
      <OrderHeader
        title={order.name}
        status={order.status}
        returnLabel={text.createReturnLabel}
        returnDialogTitle={text.returnDialogTitle}
        returnDialogBody={text.returnDialogBody}
        totalText={text.totalLabel}
        total={order.grandTotal}
        leftColumn={headerLeftColumn}
        className="mt-10"
      />
      <OrderItemsTable
        orderItems={order.orderItems}
        quantityText={text.quantityLabel}
        priceText={text.priceLabel}
        itemsText={text.itemsLabel}
        className="mt-8"
      />
      <OrderSummary
        rows={order.summaryRows}
        totalRow={order.totalRow}
        className="mt-8"
      />
      <OrderInfo
        title={text.deliveryInfoTitle}
        infoCards={order.shippingInfo}
        className="border-b-outline mt-10 border-b pb-10"
      />
      <OrderInfo
        title={text.paymentInfoTitle}
        infoCards={order.billingInfo}
        className="mt-10"
      />
    </article>
  );
};

OrderDetailPage.getLayout = getAccountLayout;

export default OrderDetailPage;
