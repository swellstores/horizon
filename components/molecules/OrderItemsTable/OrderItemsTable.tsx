import React from 'react';
import type { MandatoryImageProps } from 'types/global';
import OrderItemCard from '../OrderItemCard';

export interface OrderItem {
  title: string;
  href: string;
  image: MandatoryImageProps;
  options?: string[];
  quantity: number;
  price: string;
}

export interface OrderItemsTableProps {
  orderItems: OrderItem[];
  quantityText: string;
  priceText: string;
  itemsText: string;
  className: string;
}

const OrderItemsTable: React.FC<OrderItemsTableProps> = ({
  orderItems,
  quantityText,
  priceText,
  itemsText,
  className,
}) => {
  const tableHead = [itemsText, quantityText, priceText];

  return (
    <table className={['w-full', className ?? ''].join(' ')}>
      <thead className="border-outline hidden border-b text-sm font-semibold uppercase text-primary md:table-header-group">
        <tr>
          {tableHead.map((item, i) => (
            <th
              key={item}
              className={[
                'w-fit pb-3',
                i === 0 ? 'text-left' : 'text-right',
              ].join(' ')}>
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {orderItems.map((order, i) => (
          <tr
            key={`${order.title}${i}`}
            className="border-outline border-b align-top last:border-none">
            <td className="py-4">
              <OrderItemCard
                {...order}
                quantityText={quantityText}
                priceText={priceText}
              />
            </td>
            {[order.quantity, order.price].map((item, i) => (
              <td
                key={`${item}${i}`}
                className="hidden py-4 text-right text-md font-semibold text-primary md:table-cell">
                {item}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderItemsTable;
