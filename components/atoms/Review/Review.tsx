import React, { useCallback, useState } from 'react';
import Star from './Star';

export type Rating = 1 | 2 | 3 | 4 | 5;

interface ReviewProps {
  initialRating?: Rating;
  value?: Rating;
  onChange?: (value: Rating) => void;
  disabled: boolean;
}

const Review: React.FC<ReviewProps> = ({
  initialRating = 3,
  value: controlledValue,
  onChange,
  disabled,
}) => {
  const [rating, setRating] = useState(initialRating);

  const changeValueHandler = useCallback(
    (newValue: Rating) => {
      onChange?.(newValue);
      setRating(newValue);
    },
    [onChange],
  );

  const currentRating = controlledValue ?? rating;

  return (
    // Where should the form be located?
    // Trust that the parent will always include one?
    <div className="flex gap-2">
      {[...Array(5).keys()].map((index) => {
        const value = (index + 1) as Rating;
        return (
          <Star
            key={value}
            value={value}
            checked={value === currentRating}
            filled={value <= currentRating}
            disabled={disabled}
            updateRating={changeValueHandler}
          />
        );
      })}
    </div>
  );
};

export default Review;
