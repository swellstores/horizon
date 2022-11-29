import React from 'react';
import BlockPreviewCard from 'components/molecules/BlogPreviewCard';
import type { BlogPreviewCardProps } from 'components/molecules/BlogPreviewCard';
import { BLOCK_PREVIEW_CARD_SIZE } from '../BlogPreviewCard/BlogPreviewCard';
import type { PageSectionSpacing } from 'types/shared/sections';
import { SECTION_MARGIN_MAP } from 'lib/globals/sizings';

interface BlogListingProps extends PageSectionSpacing {
  blogCollection: Array<BlogPreviewCardProps>;
}

const cardClasses = {
  [BLOCK_PREVIEW_CARD_SIZE.EXTRA_LARGE]: 'mb-6 lg:mb-[40px] sm:col-span-full',
  [BLOCK_PREVIEW_CARD_SIZE.LARGE]: 'lg:mt-1 lg:col-span-1',
  [BLOCK_PREVIEW_CARD_SIZE.MEDIUM]: '',
  [BLOCK_PREVIEW_CARD_SIZE.SMALL]: '',
  [BLOCK_PREVIEW_CARD_SIZE.EXTRA_SMALL]: '',
};

const BlogListing: React.FC<BlogListingProps> = ({
  blogCollection,
  horizontal_spacing: horizontalSpacing,
}) => {
  return (
    <section
      className={`${SECTION_MARGIN_MAP[horizontalSpacing]} flex flex-col space-y-8 sm:grid sm:grid-cols-[repeat(auto-fit,minmax(282px,1fr))] sm:gap-8`}>
      {blogCollection.map((blog, i) => (
        <BlockPreviewCard
          key={`${blog.title}${i}`}
          {...blog}
          className={
            cardClasses[blog.size || BLOCK_PREVIEW_CARD_SIZE.EXTRA_SMALL]
          }
        />
      ))}
    </section>
  );
};

export default BlogListing;
