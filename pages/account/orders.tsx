import React from 'react';
import PurchaseList from 'components/templates/PurchaseList';
import { getClientWithSessionToken } from 'lib/graphql/client';
import {
  withAccountLayout,
  withAuthentication,
} from 'lib/utils/fetch_decorators';
import { getAccountLayout } from 'lib/utils/layout_getters';
import type { ORDER_STATUS } from 'types/orders';
import type { GetServerSideProps } from 'next';
import type { OrderCardProps } from 'components/molecules/PurchaseCard';
import type {
  AccountPageProps,
  NextPageWithLayout,
  PageProps,
} from 'types/shared/pages';
import { PURCHASE_TYPE } from 'types/purchase';
import { formatProductImages } from 'lib/utils/products';
import { grouppedPurchases } from 'utils/purchases';
import { pageTitleMap } from 'utils/lang';
import useI18n from 'hooks/useI18n';

interface OrdersPageProps extends PageProps, AccountPageProps {
  orders: OrderCardProps[];
}

export const propsCallback: GetServerSideProps<OrdersPageProps> = async (
  ctx,
) => {
  const { locale } = ctx;
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

  return {
    props: {
      orders: formattedOrders,
      pageType: 'orders',
      ...(locale ? { locale } : {}),
    },
  };
};

export const getServerSideProps = withAccountLayout(
  withAuthentication(propsCallback),
);

const OrdersPage: NextPageWithLayout<OrdersPageProps> = ({
  orders,
  pageType,
}) => {
  const i18n = useI18n();
  const groupedOrders = grouppedPurchases(orders, i18n);
  return (
    <PurchaseList
      title={pageTitleMap(i18n)[pageType]}
      groupedPurchases={groupedOrders}
      type={PURCHASE_TYPE.ORDER}
    />
  );
};

OrdersPage.getLayout = getAccountLayout;

export default OrdersPage;
