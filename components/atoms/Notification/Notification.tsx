import React, { useMemo } from 'react';
import { Root, Description } from '@radix-ui/react-toast';
import { Icon } from '@iconify/react';
import useClassNames from 'hooks/useClassNames';
import styles from './Notification.module.css';
import { NOTIFICATION_TYPE } from 'types/shared/notification';
import type { Notification as NotificationProps } from 'types/shared/notification';

const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  timeout,
}) => {
  const classes = useClassNames(
    'inline-flex items-center justify-between shadow-3xl rounded-lg py-[10px] px-4',
    {
      'text-success-dark bg-success-light': type === NOTIFICATION_TYPE.SUCCESS,
      'text-warning-dark bg-warning-light': type === NOTIFICATION_TYPE.WARNING,
      'text-error-dark bg-error-light': type === NOTIFICATION_TYPE.ERROR,
      'text-primary bg-background-primary': type === NOTIFICATION_TYPE.INFO,
    },
    styles.toast,
  );

  const icon = useMemo(() => {
    if (!type) return undefined;
    const ICON_MAPPINGS = {
      [NOTIFICATION_TYPE.SUCCESS]: 'mdi:check',
      [NOTIFICATION_TYPE.ERROR]: 'ic:round-close',
      [NOTIFICATION_TYPE.WARNING]: undefined,
      [NOTIFICATION_TYPE.INFO]: 'mdi:check',
    };
    return ICON_MAPPINGS[type];
  }, [type]);

  return (
    <Root duration={timeout} className={classes}>
      <Description className="text-sm">{message}</Description>
      {icon && <Icon icon={icon} className="ml-1" width={24} height={24} />}
    </Root>
  );
};

export default Notification;
