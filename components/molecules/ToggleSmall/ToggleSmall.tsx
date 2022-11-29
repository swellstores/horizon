import React, { useMemo } from 'react';
import Checkbox from 'components/atoms/Checkbox';
import { generateId } from 'lib/utils/shared_functions';

export interface ToggleSmallProps {
  name: string;
  priceDifference?: number;
  priceFormatter?: (price: number) => string;
  checked: boolean;
  onChange?: (value: boolean) => void;
}

const ToggleSmall: React.FC<ToggleSmallProps> = ({
  name,
  priceDifference,
  priceFormatter,
  checked,
  onChange,
}) => {
  const id = useMemo(() => generateId(), []);

  const priceString =
    priceFormatter?.(Math.abs(priceDifference ?? 0)) ??
    Math.abs(priceDifference ?? 0);

  return (
    <label
      htmlFor={id}
      tabIndex={0}
      role="checkbox"
      onKeyDown={(e) => {
        // Select if spacebar is pressed
        if (e.code === 'Space') {
          e.preventDefault();
          onChange?.(!checked);
        }
      }}
      aria-checked={checked}
      className="flex w-full cursor-pointer items-center justify-between gap-6 rounded-sm text-primary outline-offset-1 outline-accent focus-visible:outline">
      <div className="w-full text-left">
        <span className="text-xs font-semibold">{name}</span>
        {!!priceDifference && (
          <span className="ml-1 text-2xs">
            {priceDifference < 0 ? '-' : '+'} {priceString}
          </span>
        )}
      </div>
      <Checkbox
        id={id}
        role="none"
        tabIndex={-1}
        label={name}
        checked={checked}
        onChange={() => onChange?.(!checked)}
      />
    </label>
  );
};

export default ToggleSmall;
