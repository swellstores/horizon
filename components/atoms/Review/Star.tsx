import React from 'react';
import StarIcon from 'assets/icons/star.svg';
import type { Rating } from './Review';

interface StarProps {
  value: Rating;
  checked: boolean;
  filled: boolean;
  disabled: boolean;
  updateRating: (value: Rating) => void;
}

const Star: React.FC<StarProps> = ({
  value,
  checked,
  filled,
  disabled,
  updateRating,
}) => {
  const id = `star${value}`;
  const fillColor = filled ? 'text-primary' : 'text-disabled';

  return (
    <div className="relative">
      <input
        id={id}
        className="sr-only"
        type="radio"
        name="rating"
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={() => updateRating(value)}
      />
      <label
        htmlFor={id}
        className={disabled ? 'cursor-auto' : 'cursor-pointer'}>
        <span className="sr-only">{value} Stars</span>
        <StarIcon width={12} height={13} className={fillColor} />
      </label>
    </div>
  );
};

export default Star;
