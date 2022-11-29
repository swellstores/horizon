import React from 'react';
import SyncIcon from 'assets/icons/sync.svg';
import ShippingIcon from 'assets/icons/shipping.svg';
import { getScheduleLabel } from 'lib/utils/subscription';
import type { Schedule } from 'types/subscription';

interface ScheduleLabelProps {
  type: 'billing' | 'order';
  base?: string;
  schedule?: Schedule;
  icon?: boolean;
  textClasses?: string;
  iconClasses?: string;
  className?: string;
}

export const ScheduleLabel: React.FC<ScheduleLabelProps> = ({
  type,
  // TODO: i18n
  base = type === 'billing' ? 'Pay every' : 'Receive it every',
  schedule,
  icon = false,
  textClasses,
  iconClasses,
  className,
}) => {
  if (!schedule) return null;
  const IconSvg = type === 'order' ? ShippingIcon : SyncIcon;

  const Label = () => (
    <span className={textClasses ?? ''}>
      {getScheduleLabel(base, schedule)}
    </span>
  );

  if (icon) {
    return (
      <div
        className={`flex items-center space-x-1 text-primary ${
          className ?? ''
        }`}>
        <IconSvg className={iconClasses ?? ''} />
        <Label />
      </div>
    );
  }

  return <Label />;
};

export default ScheduleLabel;
