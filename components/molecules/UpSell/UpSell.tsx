import HorizontalScroller from 'components/atoms/HorizontalScroller';
import ProductPreviewCard from 'components/atoms/ProductPreviewCard';
import React from 'react';
import type { PurchasableProductData } from 'types/shared/products';

export interface UpSellProps extends React.HTMLAttributes<HTMLDivElement> {
  items: PurchasableProductData[];
}

const UpSell: React.FC<UpSellProps> = ({ items, className }) => {
  return (
    <HorizontalScroller
      className={`flex gap-6 px-6 lg:pl-0 ${className ?? ''}`}>
      {items.map((item) => (
        <ProductPreviewCard
          key={item.id}
          className="w-1/2 min-w-[54vw] shrink-0 snap-start lg:w-[322px]"
          product={{
            ...item,
            image: { ...item.image, layout: 'responsive' },
          }}
        />
      ))}
    </HorizontalScroller>
  );
};

export default UpSell;
