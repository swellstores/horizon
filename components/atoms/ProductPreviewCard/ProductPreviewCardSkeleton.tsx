import React from 'react';
import Skeleton from 'components/atoms/Skeleton';

const ProductPreviewCardSkeleton: React.FC = () => {
  return (
    <div className="flex w-full flex-col gap-4 overflow-visible text-primary lg:min-w-0">
      <Skeleton className="safe-aspect-square lg:pb-[125%]" rounded />
      <div className="flex flex-col">
        <Skeleton className="mt-1 w-auto max-w-[6rem] lg:h-5" rounded />
        <Skeleton className="mt-2 h-5 w-auto max-w-[13rem]" rounded />
      </div>
      <Skeleton className="h-6 w-auto max-w-[4rem] text-lg" rounded />
    </div>
  );
};

export default ProductPreviewCardSkeleton;
