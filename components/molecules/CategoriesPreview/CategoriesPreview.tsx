import React, { useMemo } from 'react';
import CategoryPreviewCard from 'components/atoms/CategoryPreviewCard';
import useClassNames from 'hooks/useClassNames';
import type { CategoryPreviewCardProps } from 'components/atoms/CategoryPreviewCard';
import type {
  ContentBlockComponent,
  PageSectionSpacing,
} from 'types/shared/sections';
import {
  IMAGE_LAYOUT,
  SECTION_PADDING_MAP,
  SECTION_VERTICAL_PADDING_MAP,
  SPACING,
} from 'lib/globals/sizings';
import HorizontalScroller from 'components/atoms/HorizontalScroller';

export interface CategoriesPreviewProps extends Partial<PageSectionSpacing> {
  items?: CategoryPreviewCardProps[];
  show_category_description?: boolean;
  columns?: 2 | 3 | 4;
  image_layout?: IMAGE_LAYOUT;
  background_color?: string;
  vertical_spacing?: SPACING;
  className?: string;
}

const CategoriesPreview: ContentBlockComponent<CategoriesPreviewProps> = ({
  items = [],
  show_category_description = true,
  columns = 3,
  image_layout = IMAGE_LAYOUT.PORTRAIT,
  background_color = 'transparent',
  vertical_spacing = SPACING.NONE,
  className,
  horizontal_spacing: horizontalSpacing = SPACING.NONE,
}) => {
  const classNames = useClassNames(
    SECTION_PADDING_MAP[horizontalSpacing],
    SECTION_VERTICAL_PADDING_MAP[vertical_spacing],
    className,
  );

  const mappedItems = useMemo(
    () =>
      items.map((item, index) => (
        <CategoryPreviewCard
          {...item}
          showDescription={show_category_description}
          key={index}
          className="w-1/2 shrink-0 snap-start lg:w-full"
          image={{ ...item.image, layout: 'responsive' }}
          imageLayout={image_layout}
        />
      )),
    [image_layout, items, show_category_description],
  );

  return (
    <>
      <HorizontalScroller
        className={`flex gap-6 lg:hidden ${classNames}`}
        style={{ backgroundColor: background_color }}>
        {mappedItems}
      </HorizontalScroller>
      <div
        className={`hidden gap-8 lg:grid ${classNames}`}
        style={{
          backgroundColor: background_color,
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
        }}>
        {mappedItems}
      </div>
    </>
  );
};

CategoriesPreview.propMaps = {
  items: {
    mapper: 'categories_preview_mapCategories',
    sourceKey: 'categories',
  },
};

export default CategoriesPreview;
