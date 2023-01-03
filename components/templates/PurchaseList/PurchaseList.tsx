import React, { useMemo } from 'react';
import Link from 'next/link';
import PurchaseGroup from 'components/organisms/PurchaseGroup';
import Plus from 'assets/icons/plus.svg';
import { PURCHASE_TYPE } from 'types/purchase';
import type { GrouppedPurchases } from 'utils/purchases';
import useSettingsStore from 'stores/settings';
import { fallbackString } from 'utils/text';

export interface PurchaseListProps {
  title: string;
  groupedPurchases: GrouppedPurchases;
  type: PURCHASE_TYPE;
}

const PurchaseList: React.FC<PurchaseListProps> = ({
  title,
  groupedPurchases,
  type,
}) => {
  const lang = useSettingsStore((state) => state.settings?.lang);
  const hasPurchases = useMemo(
    () => Object.entries(groupedPurchases).length > 0,
    [groupedPurchases],
  );

  const EMPTY_STATE_LABEL_MAP = {
    [PURCHASE_TYPE.ORDER]: fallbackString(
      lang?.account?.orders?.empty?.label,
      "You haven't ordered anything yet.",
    ),
    [PURCHASE_TYPE.SUBSCRIPTION]: fallbackString(
      lang?.account?.subscriptions?.empty?.label,
      "You haven't subscribed to any products yet.",
    ),
  };
  const EMPTY_STATE_LINK_MAP = {
    [PURCHASE_TYPE.ORDER]: fallbackString(
      lang?.account?.orders?.empty?.link,
      "You haven't ordered anything yet.",
    ),
    [PURCHASE_TYPE.SUBSCRIPTION]: fallbackString(
      lang?.account?.subscriptions?.empty?.link,
      "You haven't subscribed to any products yet.",
    ),
  };
  const emptyStateLabel = EMPTY_STATE_LABEL_MAP[type];
  const emptyStateLink = EMPTY_STATE_LINK_MAP[type];

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
              <span className="text-sm font-semibold">{emptyStateLink}</span>
            </a>
          </Link>
        </div>
      )}
    </article>
  );
};

export default PurchaseList;
