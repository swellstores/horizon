import React, { useMemo } from 'react';
import Link from 'next/link';
import PurchaseGroup from 'components/organisms/PurchaseGroup';
import Plus from 'assets/icons/plus.svg';
import { PURCHASE_TYPE } from 'types/purchase';
import type { GroupedOrders } from 'pages/account/orders';
import type { GroupedSubscriptions } from 'pages/account/subscriptions';

// TODO: i18n
const EMPTY_STATE_LABEL_MAP = {
  [PURCHASE_TYPE.ORDER]: "You haven't ordered anything yet.",
  [PURCHASE_TYPE.SUBSCRIPTION]: "You haven't subscribed to any products yet.",
};

export interface PurchaseListProps {
  title: string;
  groupedPurchases: GroupedSubscriptions | GroupedOrders;
  type: PURCHASE_TYPE;
}

const PurchaseList: React.FC<PurchaseListProps> = ({
  title,
  groupedPurchases,
  type,
}) => {
  const hasPurchases = useMemo(
    () => Object.entries(groupedPurchases).length > 0,
    [groupedPurchases],
  );
  const emptyStateLabel = useMemo(() => EMPTY_STATE_LABEL_MAP[type], [type]);
  return (
    <article className="">
      <h1 className="hidden font-headings text-2xl font-semibold text-primary lg:block">
        {title}
      </h1>
      {hasPurchases ? (
        <div className="space-y-12 md:mt-12">
          {Object.entries(groupedPurchases).map(([key, value]) => (
            <PurchaseGroup
              key={key}
              title={value.title}
              purchases={value.purchases}
            />
          ))}
        </div>
      ) : (
        <div>
          <p className="text-sm text-body md:mt-4">{emptyStateLabel}</p>
          <Link href="/products">
            <a className="mt-4 flex items-center space-x-2 text-primary">
              <Plus className="h-4 w-4" />
              {/* TODO: i18n */}
              <span className="text-sm font-semibold">Start shopping</span>
            </a>
          </Link>
        </div>
      )}
    </article>
  );
};

export default PurchaseList;
