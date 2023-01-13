import useI18n from 'hooks/useI18n';
import React from 'react';
import type { PurchasableProductData } from 'types/shared/products';
import ProductPreviewCardPurchasable from './ProductPreviewCardPurchasable';
import ProductPreviewCardSimple from './ProductPreviewCardSimple';
import ProductPreviewCardSkeleton from './ProductPreviewCardSkeleton';

export interface ProductPreviewCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  product?: PurchasableProductData;
  loading?: boolean;
  show_product_price?: boolean;
  show_product_description?: boolean;
}

const ProductPreviewCard: React.FC<ProductPreviewCardProps> = ({
  product,
  loading = false,
  show_product_price = true,
  show_product_description = true,
  ...props
}) => {
  const i18n = useI18n();
  const hasStandardPrice = !!product?.purchaseOptions?.standard?.price;
  const fromPriceLabel = !hasStandardPrice ? i18n('products.preview.from') : '';

  if (loading) return <ProductPreviewCardSkeleton />;

  if (product) {
    return product.hasQuickAdd ? (
      <ProductPreviewCardPurchasable
        {...props}
        show_product_price={show_product_price}
        show_product_description={show_product_description}
        product={product}
        fromPriceLabel={fromPriceLabel}
      />
    ) : (
      <ProductPreviewCardSimple
        {...props}
        show_product_price={show_product_price}
        show_product_description={show_product_description}
        product={product}
        fromPriceLabel={fromPriceLabel}
      />
    );
  }

  return null;
};

export default ProductPreviewCard;
