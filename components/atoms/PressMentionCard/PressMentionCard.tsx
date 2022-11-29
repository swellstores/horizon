import React from 'react';
import Image from 'components/atoms/SafeImage';

import type { MandatoryImageProps } from 'types/global';

export interface PressMentionCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  image: MandatoryImageProps;
  quote: string;
}

const PressMentionCard = React.forwardRef<
  HTMLDivElement,
  PressMentionCardProps
>(({ image, quote, ...props }, ref) => {
  return (
    <article
      {...props}
      className={[
        'flex max-w-[263px] flex-col items-center gap-y-6',
        props.className,
      ].join(' ')}
      ref={ref}>
      <Image {...image} layout="fixed" alt={image.alt} />
      <q className="straight-quotation text-center text-lg text-body">
        {quote}
      </q>
    </article>
  );
});

PressMentionCard.displayName = 'PressMentionCard';

export default PressMentionCard;
