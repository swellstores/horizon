import type { CartItemProps } from 'components/molecules/CartItem';
import type { SwellCart } from 'lib/graphql/generated/sdk';

export const getCartItems = (cart: SwellCart) =>
  cart.items?.map<CartItemProps | null>((item) =>
    item
      ? {
          id: item.id ?? '',
          title: item.product?.name ?? '',
          price: item.price ?? 0,
          quantity: item.quantity ?? 1,
          minQuantity: 1,
          href: `/products/${item.product?.slug}`,
          image: {
            alt: item.variant?.images?.[0]?.caption ?? '',
            height: item.product?.images?.[0]?.file?.height ?? 0,
            width: item.product?.images?.[0]?.file?.width ?? 0,
            src: item.product?.images?.[0]?.file?.url ?? '',
          },
          purchaseOption: item.purchaseOption ?? {},
          productId: item.productId ?? '',
          productOptions: item.options ?? [],
          stockTracking: item.product?.stockTracking ?? null,
          stockPurchasable: item.product?.stockPurchasable ?? null,
          stockLevel:
            item.variant?.stockLevel ?? item.product?.stockLevel ?? null,
          variantName: item.variant?.name ?? '',
        }
      : null,
  ) ?? [];
