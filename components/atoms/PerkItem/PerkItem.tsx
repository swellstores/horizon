import React from 'react';
import Tick from 'assets/icons/tick.svg';

interface PerkItemProps {
  text: string;
}

const PerkItem: React.FC<PerkItemProps> = ({ text }) => {
  return (
    <p className="flex items-center gap-x-2 text-sm font-medium text-body lg:font-normal">
      <Tick className="w-3.5" />
      {text}
    </p>
  );
};

export default PerkItem;
