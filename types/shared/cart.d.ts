import type { CartItemProps } from 'components/molecules/CartItem';

export interface CartData {
  data: {
    total: number;
    items: CartItemProps[];
    checkoutUrl: string;
  };
}

export type CartItemInputOption =
  | {
      id: string;
      valueId: string;
    }
  | {
      id: string;
      value: string;
    };

export interface CartItemInput {
  productId: string;
  quantity: number;
  options?: CartItemInputOption[];
  purchaseOption?: PurchaseOption;
}
