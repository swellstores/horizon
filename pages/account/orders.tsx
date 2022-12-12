import React from 'react';
import PurchaseList from 'components/templates/PurchaseList';
import { getClientWithSessionToken } from 'lib/graphql/client';
import {
  withAccountLayout,
  withAuthentication,
} from 'lib/utils/fetch_decorators';
import { getAccountLayout } from 'lib/utils/layout_getters';
import { ORDER_STATUS } from 'types/orders';
import type { GetServerSideProps } from 'next';
import type { OrderCardProps } from 'components/molecules/PurchaseCard';
import type { NextPageWithLayout, PageProps } from 'types/shared/pages';
import { PURCHASE_TYPE } from 'types/purchase';
import { formatProductImages } from 'lib/utils/products';

interface GroupedOrder {
  title: string;
  purchases: OrderCardProps[];
}

// TODO: Move to purchase group? Reuse with subscriptions page.
export type GroupedOrders = {
  [key in ORDER_STATUS]?: GroupedOrder;
};

interface OrdersPageProps extends PageProps {
  groupedOrders: GroupedOrders;
  pageTitle: string;
}

const GROUP_TITLES = {
  [ORDER_STATUS.PENDING]: 'Pending',
  [ORDER_STATUS.CANCELED]: 'Canceled',
  [ORDER_STATUS.DRAFT]: 'Draft',
  [ORDER_STATUS.PAYMENT_PENDING]: 'Payment pending',
  [ORDER_STATUS.DELIVERY_PENDING]: 'Delivery pending',
  [ORDER_STATUS.HOLD]: 'Hold',
  [ORDER_STATUS.COMPLETE]: 'Complete',
};

export const propsCallback: GetServerSideProps<OrdersPageProps> = async (
  ctx,
) => {
  const client = getClientWithSessionToken(ctx.req.cookies);

  const {
    data: { orders },
  } = await client.getOrders();

  const formattedOrders: OrderCardProps[] = (orders?.results ?? []).map(
    (order) => {
      const images = order?.items?.map((item) =>
        item?.product?.images?.length ? item.product.images[0] : null,
      );
      return {
        title: `Order #${order?.number ?? 0}`,
        productsImages: formatProductImages(images),
        status: (order?.status ?? '') as ORDER_STATUS,
        date: order?.dateCreated ?? '',
        link: order?.number ? `/account/orders/${order?.id}` : '#',
        type: PURCHASE_TYPE.ORDER,
        itemsCount: order?.itemQuantity ?? 0,
        total: order?.subTotal ?? 0,
      };
    },
  );

  // TODO: Remove repetition with subscriptions
  const groupedOrders: GroupedOrders = formattedOrders.reduce(
    (accumulator, currentValue) => {
      const { status } = currentValue;
      if (status && !accumulator[status]) {
        const firstEntry: GroupedOrder = {
          title: GROUP_TITLES[status],
          purchases: [currentValue],
        };
        accumulator[status] = firstEntry;
      } else if (accumulator[status]) {
        accumulator[status]?.purchases.push(currentValue);
      }
      return accumulator;
    },
    {} as GroupedOrders,
  );

  return {
    props: {
      groupedOrders: groupedOrders ?? null,
      pageTitle: 'Orders and Returns',
    },
  };
};

export const getServerSideProps = withAccountLayout(
  withAuthentication(propsCallback),
);

const OrdersPage: NextPageWithLayout<OrdersPageProps> = ({
  pageTitle,
  groupedOrders,
}) => {
  return (
    <PurchaseList
      title={pageTitle}
      groupedPurchases={groupedOrders}
      type={PURCHASE_TYPE.ORDER}
    />
  );
};

OrdersPage.getLayout = getAccountLayout;

export default OrdersPage;
