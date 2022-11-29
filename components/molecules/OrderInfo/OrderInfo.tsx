import React from 'react';
import OrderInfoCard from 'components/molecules/OrderInfoCard';
import type { OrderInfoCardProps } from 'components/molecules/OrderInfoCard';

export interface OrderInfoProps {
  title: string;
  infoCards: OrderInfoCardProps[];
  className?: string;
}

const OrderInfo: React.FC<OrderInfoProps> = ({
  title,
  infoCards,
  className,
}) => {
  return (
    <section
      className={[
        'flex flex-col space-y-10 pb-8 md:pb-10',
        className ?? '',
      ].join(' ')}>
      <h2 className="font-headings text-xl font-semibold text-primary">
        {title}
      </h2>
      <div className="flex flex-col space-y-6 md:grid md:grid-cols-[repeat(auto-fit,minmax(auto,230px))] md:gap-x-20 md:gap-y-10 md:space-y-0">
        {infoCards.map((infoCard, i) => (
          <OrderInfoCard key={`${infoCard.title}${i}`} {...infoCard} />
        ))}
      </div>
    </section>
  );
};

export default OrderInfo;
