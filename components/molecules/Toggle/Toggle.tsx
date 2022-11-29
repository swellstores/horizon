import React, { useMemo } from 'react';
import Checkbox from 'components/atoms/Checkbox';
import { generateId } from 'lib/utils/shared_functions';
import InfoTooltip from 'components/atoms/InfoTooltip';

export interface ToggleProps {
  name: string;
  description?: string;
  priceDifference?: number;
  priceFormatter?: (price: number) => string;
  checked: boolean;
  onChange?: (value: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({
  name,
  description,
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
      className="flex w-full cursor-pointer items-center justify-between gap-6 rounded-sm text-md text-primary outline-offset-1 outline-accent focus-visible:outline">
      <div className="flex w-full items-center gap-1 text-left">
        <span className="text-sm font-semibold uppercase">{name}</span>
        {!!priceDifference && (
          <span className="text-sm">
            {priceDifference < 0 ? '-' : '+'} {priceString}
          </span>
        )}
        {!!description && <InfoTooltip text={description} />}
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

export default Toggle;
