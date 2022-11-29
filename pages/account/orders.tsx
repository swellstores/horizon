import React from 'react';
import { getClientWithSessionToken } from 'lib/graphql/client';
import PurchaseGroup from 'components/organisms/PurchaseGroup';
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

interface GroupedOrderValue {
  title: string;
  orders: OrderCardProps[];
}

type GroupedOrders = {
  [key in ORDER_STATUS]?: GroupedOrderValue;
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
        const firstEntry: GroupedOrderValue = {
          title: GROUP_TITLES[status],
          orders: [currentValue],
        };
        accumulator[status] = firstEntry;
      } else if (accumulator[status]) {
        accumulator[status]?.orders.push(currentValue);
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

const OrdersPage: NextPageWithLayout<OrdersPageProps> = ({ groupedOrders }) => {
  return (
    <article className="">
      <h1 className="hidden font-headings text-2xl font-semibold text-primary lg:block">
        Orders & Returns
      </h1>
      <div className="space-y-12 md:mt-12">
        {Object.entries(groupedOrders).map(([key, value]) => (
          <PurchaseGroup
            key={key}
            title={value.title}
            purchases={value.orders}
          />
        ))}
      </div>
    </article>
  );
};

OrdersPage.getLayout = getAccountLayout;

export default OrdersPage;
