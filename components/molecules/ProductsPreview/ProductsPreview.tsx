import React, { useMemo } from 'react';
import ProductPreviewCard, {
  ProductPreviewCardProps,
} from 'components/atoms/ProductPreviewCard/ProductPreviewCard';
import useClassNames from 'hooks/useClassNames';
import type {
  ContentBlockComponent,
  PageSectionSpacing,
} from 'types/shared/sections';
import {
  SECTION_PADDING_MAP,
  SECTION_VERTICAL_PADDING_MAP,
  SPACING,
} from 'lib/globals/sizings';
import type { EditorArray } from 'types/editor';
import HorizontalScroller from 'components/atoms/HorizontalScroller';

interface ProductsPreviewProps extends Partial<PageSectionSpacing> {
  items?: EditorArray<NonNullable<ProductPreviewCardProps['product']>>;
  loading?: boolean;
  show_product_price?: boolean;
  show_product_description?: boolean;
  products_per_row?: `${2 | 3 | 4 | 5}`;
  className?: string;
}

export const ProductsPreview: ContentBlockComponent<ProductsPreviewProps> = ({
  items = [],
  loading = false,
  show_product_price = true,
  show_product_description = true,
  products_per_row = 3,
  className,
  horizontal_spacing = SPACING.SMALL,
  vertical_spacing = SPACING.SMALL,
}) => {
  const classNames = useClassNames(
    SECTION_PADDING_MAP[horizontal_spacing],
    SECTION_VERTICAL_PADDING_MAP[vertical_spacing],
    className,
  );

  const mappedItems = useMemo(
    () =>
      loading
        ? Array(products_per_row)
            .fill(0)
            .map((_, i) => (
              <li key={i}>
                <ProductPreviewCard loading />
              </li>
            ))
        : items.map((item) => (
            <li key={item.id}>
              <ProductPreviewCard
                className="w-[54vw] min-w-[200px] max-w-[350px] shrink-0 snap-start lg:w-full lg:max-w-full"
                product={item}
                show_product_price={show_product_price}
                show_product_description={show_product_description}
              />
            </li>
          )),
    [
      items,
      loading,
      products_per_row,
      show_product_description,
      show_product_price,
    ],
  );

  const style = useMemo(
    () => ({
      gridTemplateColumns: `repeat(${Math.min(
        items.length,
        Number(products_per_row),
      )}, 1fr)`,
    }),
    [items.length, products_per_row],
  );

  return (
    <>
      <HorizontalScroller className={`lg:hidden ${classNames}`}>
        <ul className="flex gap-6">{mappedItems}</ul>
      </HorizontalScroller>
      <ul
        className={`hidden list-none lg:grid lg:gap-8 ${classNames}`}
        style={style}>
        {mappedItems}
      </ul>
    </>
  );
};

ProductsPreview.propMaps = {
  items: {
    mapper: 'products_preview_mapItems',
    sourceKey: 'category_id',
  },
};

export default ProductsPreview;
