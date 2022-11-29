import { hasSufficientStock } from './cart';
import type { CartItemProps } from 'components/molecules/CartItem';

const cartItems: CartItemProps[] = [
  {
    id: '123',
    productId: '123',
    title: 'product 1',
    href: '/products/product-1',
    image: {
      alt: 'product 1',
      height: 100,
      width: 100,
      src: 'https://placekitten.com/100/100',
    },
    price: 10,
    productOptions: [
      {
        id: 'abc',
        name: 'Size',
        price: 5,
        value: 'big',
        valueId: 'big123',
        variant: true,
      },
    ],
    purchaseOption: {
      type: 'standard',
    },
    stockTracking: true,
    stockPurchasable: false,
    stockLevel: 2,
    variantName: 'big',
    minQuantity: 1,
    quantity: 1,
  },
];

describe('cart store', () => {
  describe('hasSufficientStock', () => {
    it('returns true if the product is not in the cart', () => {
      expect(hasSufficientStock('456', 1, cartItems)).toBe(true);
    });

    it('returns true if the variant is not in the cart', () => {
      expect(hasSufficientStock('123', 1, cartItems, 'small')).toBe(true);
    });

    it("returns false if the product doesn't have enough stock", () => {
      expect(hasSufficientStock('123', 2, cartItems)).toBe(false);
    });

    it("returns false if the variant doesn't have enough stock", () => {
      expect(hasSufficientStock('123', 2, cartItems, 'big')).toBe(false);
    });

    it('returns true if there is enough stock', () => {
      expect(hasSufficientStock('123', 1, cartItems, 'big')).toBe(true);
    });
  });
});
