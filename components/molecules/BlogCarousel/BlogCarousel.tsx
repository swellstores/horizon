import React from 'react';
import BlogPreviewCard from 'components/molecules/BlogPreviewCard';

import type { BlogPreviewCardProps } from 'components/molecules/BlogPreviewCard';
import { BLOCK_PREVIEW_CARD_SIZE } from 'components/molecules/BlogPreviewCard';
import type { PageSectionSpacing } from 'types/shared/sections';
import useClassNames from 'hooks/useClassNames';
import { BUTTON_TYPE, CTAOptions } from 'types/shared/button';
import Button from 'components/atoms/Button';
import { PADDING } from 'lib/globals/sizings';

export interface BlogCarouselProps extends PageSectionSpacing {
  title: string;
  blogCollection: Array<BlogPreviewCardProps>;
  cardSize?: BLOCK_PREVIEW_CARD_SIZE.SMALL | BLOCK_PREVIEW_CARD_SIZE.MEDIUM;
  backgroundColor?: string;
  cta?: CTAOptions;
  verticalPadding?: PADDING;
}

const verticalPaddingMap = {
  [PADDING.NONE]: '',
  [PADDING.SMALL]: 'py-8 lg:py-10',
  [PADDING.MEDIUM]: 'py-14 lg:py-18',
  [PADDING.LARGE]: 'py-16 lg:py-20',
};

const BlogCarousel: React.FC<BlogCarouselProps> = ({
  title,
  blogCollection,
  cardSize = BLOCK_PREVIEW_CARD_SIZE.SMALL,
  backgroundColor,
  cta,
  verticalPadding,
}) => {
  const verticalPaddingClass = verticalPadding
    ? verticalPaddingMap[verticalPadding]
    : '';

  return (
    <section
      style={{
        ...(backgroundColor && { backgroundColor }),
      }}
      className={[
        'flex flex-col lg:mx-auto lg:items-center',
        verticalPaddingClass,
      ].join(' ')}>
      <h2 className="px-6 text-center font-headings text-5xl font-semibold text-primary lg:px-0">
        {title}
      </h2>
      <div
        className={useClassNames(
          'scrollbar-hidden mt-8 flex snap-x scroll-px-6 gap-6 overflow-x-auto px-6 lg:mt-14 lg:box-content lg:grid lg:grid-cols-4 lg:gap-8 lg:overflow-visible',
          {
            'lg:max-w-[912px] lg:px-0':
              cardSize === BLOCK_PREVIEW_CARD_SIZE.SMALL,
            'lg:max-w-[1168px] lg:px-14':
              cardSize === BLOCK_PREVIEW_CARD_SIZE.MEDIUM,
          },
        )}>
        {blogCollection.map((blog, i) => (
          <BlogPreviewCard
            {...{
              ...blog,
              size: cardSize,
            }}
            key={`${blog.title}${i}`}
            className="w-[71%] shrink-0 snap-start lg:w-full"
          />
        ))}
      </div>
      <div className="mx-6 mt-8 lg:mt-[84px]">
        {cta && (
          <Button
            elType={BUTTON_TYPE.LINK}
            href={cta.link}
            className="w-full text-center lg:w-auto">
            {cta.label}
          </Button>
        )}
      </div>
    </section>
  );
};

export default BlogCarousel;
