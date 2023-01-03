import React from 'react';
import PurchaseList from 'components/templates/PurchaseList';
import { getClientWithSessionToken } from 'lib/graphql/client';
import {
  withAccountLayout,
  withAuthentication,
} from 'lib/utils/fetch_decorators';
import { getAccountLayout } from 'lib/utils/layout_getters';
import { formatProductImages } from 'lib/utils/products';
import type { SUBSCRIPTION_STATUS } from 'types/subscription';
import type { GetServerSideProps } from 'next';
import type { NextPageWithLayout, PageProps } from 'types/shared/pages';
import type { SubscriptionCardProps } from 'components/molecules/PurchaseCard/PurchaseCard';
import { PURCHASE_TYPE } from 'types/purchase';
import { grouppedPurchases } from 'utils/purchases';
import useSettingsStore from 'stores/settings';

interface SubscriptionsPageProps extends PageProps {
  subscriptions: SubscriptionCardProps[];
  pageTitle: string;
}

export const propsCallback: GetServerSideProps<SubscriptionsPageProps> = async (
  ctx,
) => {
  const client = getClientWithSessionToken(ctx.req.cookies);

  const {
    data: { subscriptions },
  } = await client.getSubscriptions();

  const formattedSubscriptions: SubscriptionCardProps[] = (
    subscriptions?.results ?? []
  ).map((subscription) => {
    return {
      title: subscription?.product?.name ?? '',
      productsImages: formatProductImages(subscription?.product?.images),
      status: (subscription?.status ?? '') as SUBSCRIPTION_STATUS,
      date: subscription?.datePeriodEnd ?? '',
      billingSchedule: subscription?.billingSchedule ?? null,
      orderSchedule: subscription?.orderSchedule ?? null,
      dateOrderPeriodEnd: subscription?.dateOrderPeriodEnd ?? null,
      recurringTotal: subscription?.recurringTotal ?? 0,
      link: subscription?.id
        ? `/account/subscriptions/${subscription.id}`
        : '#',
      type: PURCHASE_TYPE.SUBSCRIPTION,
    };
  });

  return {
    props: {
      subscriptions: formattedSubscriptions,
      pageTitle: 'Subscriptions',
    },
  };
};

export const getServerSideProps = withAccountLayout(
  withAuthentication(propsCallback),
);

const SubscriptionsPage: NextPageWithLayout<SubscriptionsPageProps> = ({
  pageTitle,
  subscriptions,
}) => {
  const lang = useSettingsStore((state) => state.settings?.lang);
  const groupedSubscriptions = grouppedPurchases(subscriptions, lang);
  return (
    <PurchaseList
      title={pageTitle}
      groupedPurchases={groupedSubscriptions}
      type={PURCHASE_TYPE.SUBSCRIPTION}
    />
  );
};

SubscriptionsPage.getLayout = getAccountLayout;

export default SubscriptionsPage;
