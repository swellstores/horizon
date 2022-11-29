import React from 'react';

export interface RadioItemLabelProps {
  name: string;
  trial?: JSX.Element;
}

const RadioItemLabel: React.FC<RadioItemLabelProps> = ({
  name,
  trial,
  children,
}) => {
  return (
    <span className="ml-1 flex w-full items-center justify-between gap-2 text-sm text-primary">
      <span className="flex flex-col">
        <span className="uppercase">{name}</span>
        <span>{trial}</span>
      </span>
      <span className="text-right font-semibold">{children}</span>
    </span>
  );
};

export default RadioItemLabel;
