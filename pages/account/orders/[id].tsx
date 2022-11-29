import React from 'react';
import {
  withAccountLayout,
  withAuthentication,
} from 'lib/utils/fetch_decorators';
import { getAccountLayout } from 'lib/utils/layout_getters';
import type { GetServerSideProps } from 'next';
import type { NextPageWithLayout, PageProps } from 'types/shared/pages';
import OrderHeader from 'components/molecules/OrderHeader';
import OrderItemsTable, {
  OrderItem,
} from 'components/molecules/OrderItemsTable';
import OrderSummary, { SummaryRow } from 'components/molecules/OrderSummary';
import OrderInfo from 'components/molecules/OrderInfo';
import { CARD_BRAND, PAYMENT_METHOD } from 'types/shared/payment';
import GhostButton from 'components/atoms/GhostButton';
import { BUTTON_TYPE } from 'types/shared/button';
import ArrowLeft from 'assets/icons/arrow-left.svg';
import { formatSubscriptionPrice } from 'lib/utils/subscription';
import { getMultilineAddress } from 'lib/utils/account';
import { formatPriceByCurrency } from 'lib/utils/price';
import type { OrderInfoCardProps } from 'components/molecules/OrderInfoCard';
import type { ORDER_STATUS } from 'types/orders';
import { useRouter } from 'next/router';
import { formatDateToLocale } from 'lib/utils/date';
import { denullifyArray } from 'lib/utils/denullify';
import { getClientWithSessionToken } from 'lib/graphql/client';

interface OrderData {
  name: string;
  status: ORDER_STATUS;
  dateCreated: Date;
  quantity: number;
  grandTotal: string;
  orderItems: OrderItem[];
  summaryRows: SummaryRow[];
  totalRow: SummaryRow;
  shippingInfo: OrderInfoCardProps[];
  billingInfo: OrderInfoCardProps[];
}

interface OrderDetailPageProps extends PageProps {
  order: OrderData;
  text: {
    backToOrdersLabel: string;
    orderLabel: string;
    createReturnLabel: string;
    returnDialogTitle: string;
    returnDialogBody: string;
    orderDateLabel: string;
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
  };
}

export const propsCallback: GetServerSideProps<OrderDetailPageProps> = async (
  context,
) => {
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

  // TODO: Fetch from the editor
  const text = {
    backToOrdersLabel: 'Back to orders',
    orderLabel: 'Order',
    createReturnLabel: 'Create return',
    returnDialogTitle: 'Returning an item',
    returnDialogBody:
      'To initiate a partial or complete return of an order, please contact us so we can start the return process. Don’t forget to include the order number and the reason for returning.',
    orderDateLabel: 'Order date',
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
  };

  return {
    props: {
      pageTitle: 'Orders and Returns',
      order: {
        // Header
        name: `${text.orderLabel} #${order.number}`,
        status: order?.status as ORDER_STATUS,
        dateCreated: order.dateCreated,
        quantity: order?.itemQuantity ?? 0,
        grandTotal: formatPriceByCurrency(order?.currency)(
          order?.grandTotal ?? 0,
        ),
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
                intervalCount:
                  item?.purchaseOption?.billingSchedule?.intervalCount,
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
            value: formatPriceByCurrency(order?.currency)(
              order?.discountTotal ?? 0,
            ),
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
                          order.billing.card?.expMonth &&
                          order.billing.card?.expYear
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
      },
      text,
    },
  };
};

export const getServerSideProps = withAccountLayout(
  withAuthentication(propsCallback),
);

const OrderDetailPage: NextPageWithLayout<OrderDetailPageProps> = ({
  order,
  text,
}) => {
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
