import React, { useState } from 'react';
import Button from 'components/atoms/Button';
import { BUTTON_STYLE, BUTTON_TYPE } from 'types/shared/button';
import Modal from 'components/molecules/Modal';
import StatusIndicator from 'components/atoms/StatusIndicator';
import type { ORDER_STATUS } from 'types/orders';
import type { SUBSCRIPTION_STATUS } from 'types/subscription';
import Sync from 'assets/icons/sync.svg';

export interface OrderHeaderProps {
  title: string;
  status: ORDER_STATUS | SUBSCRIPTION_STATUS;
  totalText: string;
  total: string;
  returnLabel?: string;
  returnDialogTitle?: string;
  returnDialogBody?: string;
  isSubscription?: boolean;
  leftColumn: (string | number)[][];
  className: string;
}

const OrderHeader: React.FC<OrderHeaderProps> = ({
  title,
  status,
  totalText,
  total,
  returnLabel,
  returnDialogTitle,
  returnDialogBody,
  isSubscription = false,
  leftColumn,
  className,
}) => {
  const [returnOpen, setReturnOpen] = useState(false);

  const hasReturn = returnLabel && returnDialogTitle && returnDialogBody;

  return (
    <header className={['flex flex-col space-y-4', className ?? ''].join(' ')}>
      <div className="flex flex-col items-center md:flex-row md:justify-between">
        <div className="flex w-full items-center justify-between md:justify-start">
          <h1 className="font-headings text-2xl font-semibold text-primary md:mr-4">
            {title}
          </h1>
          <StatusIndicator status={status} />
        </div>
        {hasReturn && (
          <>
            <Button
              elType={BUTTON_TYPE.BUTTON}
              onClick={() => setReturnOpen(true)}
              buttonStyle={BUTTON_STYLE.SECONDARY}
              small
              className="mt-4 w-full whitespace-nowrap text-center md:mt-0 md:w-auto">
              {returnLabel}
            </Button>
            <Modal
              title={returnDialogTitle}
              body={returnDialogBody}
              open={returnOpen}
              onClose={() => setReturnOpen(false)}
            />
          </>
        )}
      </div>
      <div className="flex w-full flex-col items-start md:flex-row md:justify-between">
        <ul className="flex flex-col space-y-1">
          {leftColumn.map(([text, value]) => (
            <li key={`${text}${value}`} className="text-sm">
              <span className="text-body">{text}</span>
              <strong className="ml-2 text-primary">{value}</strong>
            </li>
          ))}
        </ul>
        <p className="mt-1 flex items-center space-x-2 text-sm md:mt-0">
          {isSubscription && <Sync className="w-[22px]" />}
          <span className="text-body">{totalText}</span>
          <strong className="text-primary">{total}</strong>
        </p>
      </div>
    </header>
  );
};

export default OrderHeader;
