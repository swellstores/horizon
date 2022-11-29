import React from 'react';
import { getClientWithSessionToken } from 'lib/graphql/client';
import PurchaseGroup from 'components/organisms/PurchaseGroup';
import {
  withAccountLayout,
  withAuthentication,
} from 'lib/utils/fetch_decorators';
import { getAccountLayout } from 'lib/utils/layout_getters';
import { formatProductImages } from 'lib/utils/products';
import { SUBSCRIPTION_STATUS } from 'types/subscription';
import type { GetServerSideProps } from 'next';
import type { NextPageWithLayout, PageProps } from 'types/shared/pages';
import type { SubscriptionCardProps } from 'components/molecules/PurchaseCard/PurchaseCard';
import { PURCHASE_TYPE } from 'types/purchase';

interface SubscriptionGroup {
  title: string;
  subscriptions: SubscriptionCardProps[];
}

type GroupedSubscriptions = {
  [key in SUBSCRIPTION_STATUS]?: SubscriptionGroup;
};

interface SubscriptionsPageProps extends PageProps {
  groupedSubscriptions: GroupedSubscriptions;
  pageTitle: string;
}

const GROUP_TITLES = {
  [SUBSCRIPTION_STATUS.ACTIVE]: 'Active',
  [SUBSCRIPTION_STATUS.CANCELED]: 'Canceled',
  [SUBSCRIPTION_STATUS.COMPLETE]: 'Complete',
  [SUBSCRIPTION_STATUS.DRAFT]: 'Draft',
  [SUBSCRIPTION_STATUS.PAID]: 'Paid',
  [SUBSCRIPTION_STATUS.PASTDUE]: 'Past Due',
  [SUBSCRIPTION_STATUS.PAUSED]: 'Paused',
  [SUBSCRIPTION_STATUS.PENDING]: 'Pending',
  [SUBSCRIPTION_STATUS.TRIAL]: 'Trial',
  [SUBSCRIPTION_STATUS.UNPAID]: 'Unpaid',
};

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

  const groupedSubscriptions: GroupedSubscriptions =
    formattedSubscriptions.reduce((accumulator, currentValue) => {
      const { status } = currentValue;
      if (status && !accumulator[status]) {
        const firstEntry: SubscriptionGroup = {
          title: GROUP_TITLES[status],
          subscriptions: [currentValue],
        };
        accumulator[status] = firstEntry;
      } else if (accumulator[status]) {
        accumulator[status]?.subscriptions.push(currentValue);
      }
      return accumulator;
    }, {} as GroupedSubscriptions);

  return {
    props: {
      groupedSubscriptions,
      pageTitle: 'Subscriptions',
    },
  };
};

export const getServerSideProps = withAccountLayout(
  withAuthentication(propsCallback),
);

const SubscriptionsPage: NextPageWithLayout<SubscriptionsPageProps> = ({
  groupedSubscriptions,
}) => {
  return (
    <article className="">
      <h1 className="hidden font-headings text-2xl font-semibold text-primary lg:block">
        Subscriptions
      </h1>
      <div className="space-y-12 md:mt-12">
        {Object.entries(groupedSubscriptions).map(([key, value]) => (
          <PurchaseGroup
            key={key}
            title={value.title}
            purchases={value.subscriptions}
          />
        ))}
      </div>
    </article>
  );
};

SubscriptionsPage.getLayout = getAccountLayout;

export default SubscriptionsPage;
