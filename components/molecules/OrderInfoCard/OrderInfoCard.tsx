import RichText from 'components/atoms/RichText';
import React from 'react';
import type { OrderPaymentMethodProps } from 'components/molecules/OrderPaymentMethod';
import OrderPaymentMethod from 'components/molecules/OrderPaymentMethod';

export interface OrderInfoCardProps {
  title: string;
  body?: string;
  payment?: OrderPaymentMethodProps;
}

const OrderInfoCard: React.FC<OrderInfoCardProps> = ({
  title,
  body,
  payment,
}) => {
  return (
    <article className="flex flex-col space-y-4">
      <h3 className="font-headings text-md font-semibold text-primary">
        {title}
      </h3>
      {payment && <OrderPaymentMethod {...payment} />}
      {body && <RichText content={body} className="text-md text-body" />}
    </article>
  );
};

export default OrderInfoCard;
