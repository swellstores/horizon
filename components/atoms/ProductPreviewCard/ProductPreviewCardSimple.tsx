import React from 'react';
import Image from 'components/atoms/SafeImage';
import Price from 'components/atoms/Price';
import Link from 'next/link';
import { layoutFillConfig } from 'lib/utils/image';
import type { ProductData } from 'types/shared/products';

export interface ProductPreviewCardSimpleProps
  extends React.HTMLAttributes<HTMLDivElement> {
  product: ProductData;
  fromPriceLabel?: string;
  show_product_price?: boolean;
  show_product_description?: boolean;
}

const ProductPreviewCardSimple: React.FC<ProductPreviewCardSimpleProps> = ({
  product,
  fromPriceLabel = '',
  show_product_price = true,
  show_product_description = true,
  ...props
}) => {
  const { description, image, price, origPrice, title, href } = product;

  const containerClassNames =
    'relative flex flex-col gap-4 overflow-visible text-primary lg:min-w-0';

  return (
    <div
      {...props}
      className={[containerClassNames, props.className].join(' ')}>
      <Link href={href}>
        <a className="safe-aspect-square relative overflow-hidden lg:pb-[125%]">
          <Image
            {...image}
            {...layoutFillConfig}
            alt={image.alt}
            className={`rounded-image ${image.className}`}
            objectFit="cover"
          />
        </a>
      </Link>
      <div className="flex flex-col">
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
      {price && show_product_price && (
        <div className="text-lg font-semibold lg:text-sm">
          {fromPriceLabel}
          <Price price={price} origPrice={origPrice} />
        </div>
      )}
    </div>
  );
};

export default ProductPreviewCardSimple;
