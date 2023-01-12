import useI18n from 'hooks/useI18n';
import React, { useMemo } from 'react';
import type { Status } from 'types/global';
import type { ORDER_STATUS } from 'types/orders';
import type { STOCK_STATUS } from 'types/shared/products';
import type { SUBSCRIPTION_STATUS } from 'types/subscription';
import {
  orderStatusKey,
  STATUS_MAP,
  subscriptionStatusKey,
} from 'utils/status';

export interface StatusIndicatorProps {
  status: Status;
  type: 'order' | 'subscription' | 'stock';
  payload?: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  type,
  payload,
}) => {
  const i18n = useI18n();
  const statusKey =
    type === 'order'
      ? orderStatusKey(status as ORDER_STATUS)
      : type === 'subscription'
      ? subscriptionStatusKey(status as SUBSCRIPTION_STATUS)
      : (status as STOCK_STATUS);
  const template = useMemo(
    () => STATUS_MAP(i18n).get(statusKey),
    [statusKey, i18n],
  );

  return (
    <div className="inline-flex items-center gap-[6px] rounded-lg bg-background-secondary px-2 py-1">
      <div
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: template?.color }}></div>
      <span className="text-2xs font-medium text-primary">
        {template?.label}
        {!!template?.details && (
          <>
            <span className="mx-1">•</span>
            <span className="text-3xs font-normal">
              {template.details(payload)}
            </span>
          </>
        )}
      </span>
    </div>
  );
};

export default StatusIndicator;
