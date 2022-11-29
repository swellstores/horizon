import React from 'react';
import PurchaseCard from 'components/molecules/PurchaseCard';
import type { PurchaseCardProps } from 'components/molecules/PurchaseCard';

export interface PurchaseGroupProps {
  title: string;
  purchases: PurchaseCardProps[];
}

const SubscriptionGroup: React.FC<PurchaseGroupProps> = ({
  title,
  purchases,
}) => (
  <section>
    <h2 className="font-headings text-md font-semibold uppercase text-body ">
      {title}
    </h2>
    <div className="mt-6 flex flex-col gap-6">
      {purchases.map((purchase, i) => (
        <PurchaseCard key={purchase.title + i} {...purchase} />
      ))}
    </div>
  </section>
);

export default SubscriptionGroup;
