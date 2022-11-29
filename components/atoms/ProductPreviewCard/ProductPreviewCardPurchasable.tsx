import React, { useMemo, useRef } from 'react';
import Image from 'components/atoms/SafeImage';
import Price from 'components/atoms/Price';
import Link from 'next/link';
import { layoutFillConfig } from 'lib/utils/image';
import type { PurchasableProductData } from 'types/shared/products';
import useProductSelection from 'hooks/useProductSelection';
import QuickAdd from './QuickAdd';

export interface ProductPreviewCardPurchasableProps
  extends React.HTMLAttributes<HTMLDivElement> {
  product: PurchasableProductData;
  fromPriceLabel?: string;
  show_product_price?: boolean;
  show_product_description?: boolean;
}
const ProductPreviewCardPurchasable: React.FC<
  ProductPreviewCardPurchasableProps
> = ({
  product,
  fromPriceLabel = '',
  show_product_price = true,
  show_product_description = true,
  ...props
}) => {
  const {
    description,
    image,
    price,
    origPrice,
    title,
    href,
    productOptions,
    productVariants,
    purchaseOptions,
    id: productId,
  } = product;

  const wrapperRef = useRef(null);
  const { state, dispatch, addToCart, activeVariation } = useProductSelection({
    productId,
    productOptions,
    purchaseOptions,
    productVariants,
    shouldPreselectOption: false,
  });

  const [activePrice, activeOrigPrice] = useMemo(() => {
    return [
      activeVariation?.price ?? price,
      activeVariation?.origPrice ?? origPrice,
    ];
  }, [activeVariation, origPrice, price]);

  const containerClassNames =
    'relative flex flex-col gap-4 overflow-visible text-primary lg:min-w-0';

  return (
    <div
      {...props}
      className={[containerClassNames, props.className].join(' ')}>
      <QuickAdd
        productOptions={productOptions}
        state={state}
        dispatch={dispatch}
        addToCart={addToCart}
        focusOnRef={wrapperRef}
        className="safe-aspect-square relative overflow-hidden lg:pb-[125%]"
        hoverableElement={(props) => (
          <Link href={href}>
            <a {...props}>
              <Image
                {...image}
                {...layoutFillConfig}
                alt={image.alt}
                className={`rounded-image ${image.className}`}
                objectFit="cover"
              />
            </a>
          </Link>
        )}
        addToBagLabel="Add to bag"
        addedToBagLabel="Added to bag"
        nextLabel="Next"
      />
      <div className="flex flex-col" ref={wrapperRef}>
        <Link href={href}>
          <a>
            <h4 className="font-headings text-md font-semibold line-clamp-2 lg:text-sm">
              {title}
            </h4>
          </a>
        </Link>
        {show_product_description && (
          <span
            className="text-sm text-body line-clamp-2"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
      </div>
      {show_product_price && (
        <div className="text-lg font-semibold lg:text-sm">
          {fromPriceLabel}
          <Price price={activePrice} origPrice={activeOrigPrice} />
        </div>
      )}
    </div>
  );
};

export default ProductPreviewCardPurchasable;
