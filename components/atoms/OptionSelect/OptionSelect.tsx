import React from 'react';
import OptionSelectItem from './OptionSelectItem';

export interface OptionSelectProps {
  attributeId: string;
  name: string;
  active: boolean;
  values: { id: string; name: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  attributeId,
  name,
  active,
  values,
  value,
  onChange,
  className,
}) => {
  if (!active) return null;
  return (
    <div className={className ?? ''}>
      <h3 className="font-headings text-sm font-semibold uppercase text-primary">
        {name}
      </h3>
      <div className="mt-2 flex items-center justify-start gap-2">
        {values.map(({ id: valueId, name: valueName }) => (
          <OptionSelectItem
            name={name || attributeId}
            key={valueId}
            value={valueId}
            label={valueName}
            onChange={onChange}
            active={valueId === value}
          />
        ))}
      </div>
    </div>
  );
};

export default OptionSelect;
