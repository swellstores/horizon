import React from 'react';
import SyncIcon from 'assets/icons/sync.svg';
import ShippingIcon from 'assets/icons/shipping.svg';
import { getScheduleLabel } from 'lib/utils/subscription';
import type { Schedule } from 'types/subscription';
import { fallbackString } from 'utils/text';
import useSettingsStore from 'stores/settings';

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
  base,
  schedule,
  icon = false,
  textClasses,
  iconClasses,
  className,
}) => {
  const lang = useSettingsStore((state) => state.settings?.lang);

  if (!schedule) return null;

  const billingFallback = fallbackString(
    lang?.products?.subscription?.billingMessage,
    'Pay every {n} {interval}',
  );
  const orderFallback = fallbackString(
    lang?.products?.subscription?.orderMessage,
    'Receive it every {n} {interval}',
  );

  const IconSvg = type === 'order' ? ShippingIcon : SyncIcon;

  const label = (
    <span className={textClasses ?? ''}>
      {getScheduleLabel(
        fallbackString(
          base,
          type === 'billing' ? billingFallback : orderFallback,
        ),
        schedule,
      )}
    </span>
  );

  if (icon) {
    return (
      <div
        className={`flex items-center space-x-1 text-primary ${
          className ?? ''
        }`}>
        <IconSvg className={iconClasses ?? ''} />
        {label}
      </div>
    );
  }

  return label;
};

export default ScheduleLabel;
