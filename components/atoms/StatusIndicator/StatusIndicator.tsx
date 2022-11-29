import React, { useMemo } from 'react';
import { SUBSCRIPTION_STATUS } from 'types/subscription';
import { ORDER_STATUS } from 'types/orders';
import { STOCK_STATUS } from 'types/shared/products';

type Status = SUBSCRIPTION_STATUS | ORDER_STATUS | STOCK_STATUS;

interface StatusTemplate {
  color: string;
  label: string;
  details?: (payload?: string) => string;
}

const STATUS_MAP = new Map<Status, StatusTemplate>([
  [ORDER_STATUS.CANCELED, { color: '#FF766D', label: 'Canceled' }],
  [ORDER_STATUS.COMPLETE, { color: '#00BA99', label: 'Complete' }],
  [
    ORDER_STATUS.DELIVERY_PENDING,
    { color: '#BDB9C6', label: 'Delivery pending' },
  ],
  [ORDER_STATUS.HOLD, { color: '#F4A732', label: 'Hold' }],
  [
    ORDER_STATUS.PAYMENT_PENDING,
    { color: '#F4A732', label: 'Payment Pending' },
  ],
  [ORDER_STATUS.PENDING, { color: '#F4A732', label: 'Pending' }],
  [ORDER_STATUS.DRAFT, { color: '#F4A732', label: 'Draft' }],
  [SUBSCRIPTION_STATUS.ACTIVE, { color: '#00BA99', label: 'Active' }],
  [SUBSCRIPTION_STATUS.CANCELED, { color: '#FF766D', label: 'Canceled' }],
  [SUBSCRIPTION_STATUS.PAID, { color: '#00BA99', label: 'Paid' }],
  [SUBSCRIPTION_STATUS.TRIAL, { color: '#00BA99', label: 'Trial' }],
  [SUBSCRIPTION_STATUS.PAUSED, { color: '#BDB9C6', label: 'Paused' }],
  [SUBSCRIPTION_STATUS.PASTDUE, { color: '#F4A732', label: 'Past Due' }],
  [SUBSCRIPTION_STATUS.UNPAID, { color: '#FF766D', label: 'Unpaid' }],
  [SUBSCRIPTION_STATUS.COMPLETE, { color: '#00BA99', label: 'Complete' }],
  [SUBSCRIPTION_STATUS.PENDING, { color: '#F4A732', label: 'Pending' }],
  [SUBSCRIPTION_STATUS.DRAFT, { color: '#BDB9C6', label: 'Draft' }],
  [STOCK_STATUS.IN_STOCK, { color: '#00BA99', label: 'In Stock' }],
  [
    STOCK_STATUS.LOW_STOCK,
    {
      color: '#F4A732',
      label: 'Low Stock',
      details: (payload = 'few') => `${payload} remaining`,
    },
  ],
  [STOCK_STATUS.OUT_OF_STOCK, { color: '#FF766D', label: 'Out of Stock' }],
]);
export interface StatusIndicatorProps {
  status: Status;
  payload?: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  payload,
}) => {
  const template = useMemo(() => STATUS_MAP.get(status), [status]);
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
