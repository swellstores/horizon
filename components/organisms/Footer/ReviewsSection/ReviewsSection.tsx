import React, { useState } from 'react';
import ReviewCard from 'components/molecules/ReviewCard';
import {
  SECTION_PADDING_MAP,
  SECTION_VERTICAL_PADDING_MAP,
  SPACING,
} from 'lib/globals/sizings';
import type { ReviewCardProps } from 'components/molecules/ReviewCard';
import type {
  ContentBlockComponent,
  PageSectionSpacing,
} from 'types/shared/sections';
import type { EditorArray } from 'types/editor';
import { HORIZONTAL_ALIGNMENT } from 'types/shared/alignment';
import HorizontalScroller from 'components/atoms/HorizontalScroller';

export interface ReviewsSectionProps extends Partial<PageSectionSpacing> {
  title?: string;
  reviews?: EditorArray<ReviewCardProps>;
  content_alignment?: HORIZONTAL_ALIGNMENT;
}

const ReviewsSection: ContentBlockComponent<ReviewsSectionProps> = ({
  title = '',
  reviews = [],
  content_alignment = HORIZONTAL_ALIGNMENT.LEFT,
  horizontal_spacing = SPACING.SMALL,
  vertical_spacing = SPACING.SMALL,
}) => {
  const [contentHeight, setContentHeight] = useState(0);

  return (
    <section
      className={`bg-background-secondary
      ${SECTION_PADDING_MAP[horizontal_spacing]} 
      ${SECTION_VERTICAL_PADDING_MAP[vertical_spacing]}
    `}>
      <h2 className="text-center font-headings text-5xl font-semibold text-primary lg:text-7xl">
        {title}
      </h2>

      <HorizontalScroller>
        <div
          ref={(ref) => {
            const height = ref?.clientHeight ?? 0;

            if (height !== contentHeight) {
              setContentHeight(height);
            }
          }}
          className="grid grid-flow-col place-items-center gap-6 lg:flex lg:min-w-max lg:justify-evenly lg:gap-8 lg:p-0">
          <div
            style={{ height: `${contentHeight}px` }}
            className="sticky left-0 z-10 -mr-6 h-full w-15 bg-gradient-to-l from-transparent to-background-secondary lg:-mr-8"
          />
          {reviews.map((review) => (
            <ReviewCard
              {...review}
              key={review.id}
              content_alignment={content_alignment}
              className="my-8 w-full shrink-0 snap-start lg:shrink"
            />
          ))}
          <div
            style={{ height: `${contentHeight}px` }}
            className="sticky right-0 z-10 -ml-6 h-full w-15 bg-gradient-to-r from-transparent to-background-secondary lg:-ml-8"
          />
        </div>
      </HorizontalScroller>
    </section>
  );
};

ReviewsSection.propMaps = {
  reviews: 'reviews_section_mapReviews',
};

export default ReviewsSection;
