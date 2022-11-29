import React from 'react';
import Image from 'components/atoms/SafeImage';
import Review from 'components/atoms/Review';
import type { MandatoryImageProps } from 'types/global';
import type { Rating } from 'components/atoms/Review';
import { HORIZONTAL_ALIGNMENT } from 'types/shared/alignment';
import useClassNames from 'hooks/useClassNames';
import { TEXT_ALIGNMENT_MAP } from 'utils/classMappings';
import RichText from 'components/atoms/RichText';

export interface ReviewCardProps extends React.HTMLAttributes<HTMLDivElement> {
  user_image?: MandatoryImageProps;
  user_name?: string;
  user_location?: string;
  rating?: Rating;
  comment?: string;
  date?: string;
  content_alignment?: HORIZONTAL_ALIGNMENT;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  user_image,
  user_location,
  user_name,
  rating,
  comment,
  date,
  content_alignment = HORIZONTAL_ALIGNMENT.LEFT,
  ...props
}) => {
  return (
    <div
      className={`flex w-3/4 min-w-[270px] max-w-sm flex-col overflow-hidden rounded-2xl bg-background-primary px-6 pt-6 pb-4 shadow-3xl lg:w-full 
      ${TEXT_ALIGNMENT_MAP[content_alignment]}
      ${props.className ?? ''}`}>
      <div
        className={useClassNames('flex gap-4', {
          'justify-center': content_alignment === HORIZONTAL_ALIGNMENT.CENTER,
          'flex-row-reverse': content_alignment === HORIZONTAL_ALIGNMENT.RIGHT,
        })}>
        {user_image && (
          <div className="grid h-[72px] w-[72px] shrink-0 place-items-center overflow-hidden rounded-[50%]">
            <Image {...user_image} alt={user_image?.alt} />
          </div>
        )}
        <div
          className={useClassNames({
            'text-left': content_alignment !== HORIZONTAL_ALIGNMENT.RIGHT,
            'text-right': content_alignment === HORIZONTAL_ALIGNMENT.RIGHT,
          })}>
          <div
            className={useClassNames('w-2/3', {
              'ml-auto': content_alignment === HORIZONTAL_ALIGNMENT.RIGHT,
            })}>
            <Review value={rating} disabled={true} />
          </div>
          <p className="mt-2 w-full text-md font-semibold uppercase text-primary">
            {user_name}
          </p>
          {user_location && (
            <p className="w-full text-xs text-body">{user_location}</p>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="mt-4 flex-1 text-sm text-body">
          <RichText content={comment ?? ''} />
        </div>
        {date && (
          <time className="mt-4 inline-block text-xs text-body">{date}</time>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
