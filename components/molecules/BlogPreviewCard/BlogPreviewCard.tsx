import Image from 'components/atoms/SafeImage';
import Link from 'next/link';
import React from 'react';
import { formatDateToMonthYear } from 'lib/utils/date';
import { layoutFillConfig } from 'lib/utils/image';
import RichText from 'components/atoms/RichText';
import Tag from 'components/atoms/Tag';

import type { MandatoryImageProps } from 'types/global';

export enum BLOCK_PREVIEW_CARD_SIZE {
  EXTRA_SMALL = 'extra_small',
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  EXTRA_LARGE = 'extra_large',
}

export interface BlogPreviewCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  image: MandatoryImageProps;
  title: string;
  description: string;
  tag: string;
  date: Date;
  href: string;
  size?: BLOCK_PREVIEW_CARD_SIZE;
}

const articleClasses = {
  [BLOCK_PREVIEW_CARD_SIZE.EXTRA_LARGE]:
    'flex-col w-full gap-y-6 sm:flex-row sm:gap-y-0 sm:gap-x-14 sm:items-start lg:items-center',
  [BLOCK_PREVIEW_CARD_SIZE.LARGE]:
    'flex-col w-full max-w-[342px] gap-y-6 lg:w-[282px]',
  [BLOCK_PREVIEW_CARD_SIZE.MEDIUM]:
    'flex-col gap-y-6 min-w-[270px] max-w-[400px] lg:min-w-[204px] lg:max-w-[268px] lg:gap-y-4',
  [BLOCK_PREVIEW_CARD_SIZE.SMALL]:
    'flex-col gap-y-6 min-w-[270px] max-w-[400px] lg:w-[204px] lg:min-w-[unset] lg:max-w-[unset] lg:gap-y-4',
  [BLOCK_PREVIEW_CARD_SIZE.EXTRA_SMALL]:
    'flex-row sm:flex-col w-full max-w-[342px] gap-x-4 sm:gap-y-6',
};

const imageContainerClasses = {
  [BLOCK_PREVIEW_CARD_SIZE.EXTRA_LARGE]:
    'pb-[75.5%] sm:flex-[0_0_47%] sm:pb-[35.5%]',
  [BLOCK_PREVIEW_CARD_SIZE.LARGE]: 'lg:h-[213px] h-[258px]',
  [BLOCK_PREVIEW_CARD_SIZE.MEDIUM]: 'pb-[78%] lg:pb-[57%]',
  [BLOCK_PREVIEW_CARD_SIZE.SMALL]: 'pb-[78%] lg:pb-[75%]',
  [BLOCK_PREVIEW_CARD_SIZE.EXTRA_SMALL]:
    'sm:flex-none flex-[0_0_20%] h-0 pb-[17.5%] sm:pb-[75.5%]',
};

const imageClasses = {
  [BLOCK_PREVIEW_CARD_SIZE.EXTRA_LARGE]: 'rounded-2xl',
  [BLOCK_PREVIEW_CARD_SIZE.LARGE]: 'rounded-2xl',
  [BLOCK_PREVIEW_CARD_SIZE.MEDIUM]: 'rounded-2xl',
  [BLOCK_PREVIEW_CARD_SIZE.SMALL]: 'rounded-2xl',
  [BLOCK_PREVIEW_CARD_SIZE.EXTRA_SMALL]: 'rounded-lg sm:rounded-2xl',
};

const bodyClasses = {
  [BLOCK_PREVIEW_CARD_SIZE.EXTRA_LARGE]: 'gap-y-2',
  [BLOCK_PREVIEW_CARD_SIZE.LARGE]: 'gap-y-2',
  [BLOCK_PREVIEW_CARD_SIZE.MEDIUM]: 'gap-y-2',
  [BLOCK_PREVIEW_CARD_SIZE.SMALL]: 'gap-y-2',
  [BLOCK_PREVIEW_CARD_SIZE.EXTRA_SMALL]: 'gap-y-1 sm:gap-y-2',
};

const dateClasses = {
  [BLOCK_PREVIEW_CARD_SIZE.EXTRA_LARGE]: ' text-sm lg:text-2xs',
  [BLOCK_PREVIEW_CARD_SIZE.LARGE]: 'text-sm lg:text-2xs',
  [BLOCK_PREVIEW_CARD_SIZE.MEDIUM]: 'text-sm lg:text-2xs',
  [BLOCK_PREVIEW_CARD_SIZE.SMALL]: 'text-sm lg:text-2xs',
  [BLOCK_PREVIEW_CARD_SIZE.EXTRA_SMALL]: 'text-2xs order-1 sm:order-none',
};

const titleClasses = {
  [BLOCK_PREVIEW_CARD_SIZE.EXTRA_LARGE]: 'text-2xl lg:text-5xl',
  [BLOCK_PREVIEW_CARD_SIZE.LARGE]: 'text-xl lg:text-lg',
  [BLOCK_PREVIEW_CARD_SIZE.MEDIUM]: 'text-xl lg:text-md',
  [BLOCK_PREVIEW_CARD_SIZE.SMALL]: 'text-xl lg:text-lg',
  [BLOCK_PREVIEW_CARD_SIZE.EXTRA_SMALL]:
    'text-md sm:text-lg order-3 sm:order-none',
};

const descriptionClasses = {
  [BLOCK_PREVIEW_CARD_SIZE.EXTRA_LARGE]: 'text-lg lg:text-md lg:mt-2',
  [BLOCK_PREVIEW_CARD_SIZE.LARGE]: 'text-lg lg:text-md line-clamp-2',
  [BLOCK_PREVIEW_CARD_SIZE.MEDIUM]:
    'text-lg lg:text-sm line-clamp-2 lg:line-clamp-4',
  [BLOCK_PREVIEW_CARD_SIZE.SMALL]: 'text-md lg:text-sm line-clamp-4',
  [BLOCK_PREVIEW_CARD_SIZE.EXTRA_SMALL]:
    'text-2xs sm:text-md line-clamp-2 order-4 sm:order-none',
};

const tagClasses = {
  [BLOCK_PREVIEW_CARD_SIZE.EXTRA_LARGE]: 'mt-4',
  [BLOCK_PREVIEW_CARD_SIZE.LARGE]: 'mt-2 lg:mt-1',
  [BLOCK_PREVIEW_CARD_SIZE.MEDIUM]: 'mt-2 lg:mt-1',
  [BLOCK_PREVIEW_CARD_SIZE.SMALL]: 'mt-2 lg:mt-1',
  [BLOCK_PREVIEW_CARD_SIZE.EXTRA_SMALL]: 'lg:mt-1 sm:order-none order-2',
};

const tagPaddingYClasses = {
  [BLOCK_PREVIEW_CARD_SIZE.EXTRA_LARGE]: 'py-2',
  [BLOCK_PREVIEW_CARD_SIZE.LARGE]: '',
  [BLOCK_PREVIEW_CARD_SIZE.MEDIUM]: '',
  [BLOCK_PREVIEW_CARD_SIZE.SMALL]: '',
  [BLOCK_PREVIEW_CARD_SIZE.EXTRA_SMALL]: 'py-[1.8px] sm:py-[5.5px]',
};

const BlogPreviewCard: React.FC<BlogPreviewCardProps> = ({
  image,
  title,
  description,
  tag,
  date,
  href,
  size = BLOCK_PREVIEW_CARD_SIZE.LARGE,
  className,
}) => {
  const formattedDate = formatDateToMonthYear(date);

  return (
    <article
      className={['flex', articleClasses[size], className ?? ''].join(' ')}>
      <Link href={href}>
        <a
          className={['relative w-full', imageContainerClasses[size]].join(
            ' ',
          )}>
          <Image
            {...image}
            {...layoutFillConfig}
            objectFit="cover"
            alt={image.alt}
            className={imageClasses[size]}
          />
        </a>
      </Link>
      <div className={['flex flex-col', bodyClasses[size]].join(' ')}>
        <p className={['text-body', dateClasses[size]].join(' ')}>
          {formattedDate}
        </p>
        <h3
          className={[
            'font-headings font-semibold text-primary',
            titleClasses[size],
          ].join(' ')}>
          {title}
        </h3>
        <RichText
          content={description}
          className={['text-primary', descriptionClasses[size]].join(' ')}
        />
        <Tag
          className={['w-fit', tagClasses[size]].join(' ')}
          paddingYClasses={tagPaddingYClasses[size]}>
          {tag}
        </Tag>
      </div>
    </article>
  );
};

export default BlogPreviewCard;
