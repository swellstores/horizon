import React from 'react';
import OptionSelectItem from 'components/atoms/OptionSelect/OptionSelectItem';

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
      <h3 className="font-headings text-sm font-semibold text-primary">
        {name}
      </h3>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {values.map(({ id: valueId, name: valueName }) => (
          <OptionSelectItem
            name={name || attributeId}
            key={valueId}
            value={valueId}
            label={valueName}
            onChange={onChange}
            active={valueId === value}
            className={[
              'text-center',
              valueName.length <= 10 ? 'col-span-1' : 'col-span-2',
            ].join(' ')}
          />
        ))}
      </div>
    </div>
  );
};

export default OptionSelect;
