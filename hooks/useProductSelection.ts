import { useReducer, useMemo, useEffect, useCallback } from 'react';
import useCartStore, { AddToCartConfig } from 'stores/cart';
import { getActiveVariation } from 'lib/utils/products';
import {
  OPTION_INPUT_TYPE,
  ProductOption,
  PurchaseOption,
  PURCHASE_OPTION_TYPE,
} from 'types/shared/products';
import type {
  Maybe,
  SwellProduct,
  SwellProductPurchaseOptions,
  SwellProductPurchaseOptionsSubscriptionPlan,
  SwellProductVariant,
} from 'lib/graphql/generated/sdk';
import type { CartItemInput } from 'types/shared/cart';

export enum ACTIONS {
  SET_SELECTED_PURCHASE_OPTION,
  SET_SELECTED_PLAN,
  SET_QUANTITY,
  SET_SELECTED_PRODUCT_OPTIONS,
  TOGGLE_PURCHASE_OPTION,
  SET_TEXT_PRODUCT_OPTION,
  RESET_STATE,
}

export type Action =
  | {
      type: ACTIONS.SET_SELECTED_PURCHASE_OPTION;
      payload: PURCHASE_OPTION_TYPE;
    }
  | {
      type: ACTIONS.SET_SELECTED_PLAN;
      payload: Maybe<SwellProductPurchaseOptionsSubscriptionPlan>;
    }
  | {
      type: ACTIONS.SET_QUANTITY;
      payload: number;
    }
  | {
      type: ACTIONS.SET_SELECTED_PRODUCT_OPTIONS;
      payload: { optionId: string; valueId: string };
    }
  | {
      type: ACTIONS.TOGGLE_PURCHASE_OPTION;
      payload: { optionId: string; valueId: string };
    }
  | {
      type: ACTIONS.SET_TEXT_PRODUCT_OPTION;
      payload: { optionId: string; value: string };
    }
  | {
      type: ACTIONS.RESET_STATE;
      payload: undefined;
    };

export interface ReducerState {
  selectedPurchaseOption: PURCHASE_OPTION_TYPE;
  selectedPlan: Maybe<SwellProductPurchaseOptionsSubscriptionPlan>;
  quantity: number;
  selectedProductOptions: Map<string, string>;
  textProductOptions: Map<string, string>;
}

interface UseProductSelectionArgs {
  productId: string;
  productOptions: ProductOption[];
  purchaseOptions: SwellProductPurchaseOptions;
  productVariants: SwellProductVariant[];
  stockLevel?: SwellProduct['stockLevel'];
  isGiftCard?: boolean;
  shouldPreselectOption?: boolean;
}

const useProductSelection = ({
  productId,
  productOptions,
  purchaseOptions,
  productVariants,
  stockLevel,
  isGiftCard = false,
  shouldPreselectOption = true,
}: UseProductSelectionArgs) => {
  const initialState = {
    selectedPurchaseOption: (() => {
      // TODO: Handle null option better here
      const { standard, subscription } = purchaseOptions;
      if (!standard && !subscription) return PURCHASE_OPTION_TYPE.NULL;

      if ((standard && subscription) || standard)
        return PURCHASE_OPTION_TYPE.STANDARD;
      return PURCHASE_OPTION_TYPE.SUBSCRIPTION;
    })(),
    selectedPlan: purchaseOptions.subscription?.plans?.[0] ?? null,
    quantity: 1,
    selectedProductOptions: (() => {
      const options = new Map<string, string>();
      // Provide a default value for options of type Select.
      if (shouldPreselectOption) {
        productOptions.forEach((option) => {
          if (
            (option.inputType === OPTION_INPUT_TYPE.SELECT || isGiftCard) &&
            option.values?.[0]?.id
          ) {
            options.set(option.id, option.values?.[0]?.id);
          }
        });
      }
      return options;
    })(),
    textProductOptions: new Map<string, string>(),
  };

  function reducer(state: ReducerState, action: Action): ReducerState {
    switch (action.type) {
      case ACTIONS.SET_SELECTED_PURCHASE_OPTION: {
        return {
          ...state,
          selectedPurchaseOption: action.payload,
        };
      }
      case ACTIONS.SET_SELECTED_PLAN: {
        return {
          ...state,
          selectedPlan: action.payload,
        };
      }
      case ACTIONS.SET_QUANTITY: {
        return {
          ...state,
          quantity: action.payload,
        };
      }
      case ACTIONS.SET_SELECTED_PRODUCT_OPTIONS: {
        if (action.payload.optionId && action.payload.valueId) {
          const newMap = new Map(state.selectedProductOptions);
          newMap.set(action.payload.optionId, action.payload.valueId);
          return {
            ...state,
            selectedProductOptions: newMap,
          };
        }
        return {
          ...state,
        };
      }
      case ACTIONS.TOGGLE_PURCHASE_OPTION: {
        const newMap = new Map(state.selectedProductOptions);
        const valueId = newMap.get(action.payload.optionId);
        if (valueId) {
          newMap.delete(action.payload.optionId);
        } else {
          newMap.set(action.payload.optionId, action.payload.valueId);
        }
        return {
          ...state,
          selectedProductOptions: newMap,
        };
      }
      case ACTIONS.SET_TEXT_PRODUCT_OPTION: {
        const newMap = new Map(state.textProductOptions);
        newMap.set(action.payload.optionId, action.payload.value);
        return {
          ...state,
          textProductOptions: newMap,
        };
      }
      case ACTIONS.RESET_STATE: {
        return initialState;
      }
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const cartItemInput: CartItemInput = useMemo(() => {
    const selectOptionsInput = Array.from(
      state.selectedProductOptions.entries(),
    ).map(([id, valueId]) => ({
      id,
      valueId,
    }));

    const textOptionsInput = Array.from(state.textProductOptions.entries()).map(
      ([id, value]) => ({
        id,
        value,
      }),
    );

    const purchaseOption: PurchaseOption | null = getPurchaseOption(
      state.selectedPurchaseOption,
      state.selectedPlan?.id,
    );

    const result: CartItemInput = {
      productId,
      quantity: state.quantity,
      options: [...selectOptionsInput, ...textOptionsInput],
    };

    if (purchaseOption) {
      result.purchaseOption = purchaseOption;
    }

    return result;
  }, [
    productId,
    state.quantity,
    state.selectedPlan?.id,
    state.selectedProductOptions,
    state.selectedPurchaseOption,
    state.textProductOptions,
  ]);

  const activeVariation = useMemo(
    () =>
      getActiveVariation(
        cartItemInput.options,
        state.selectedPlan,
        productOptions,
        purchaseOptions,
        productVariants,
        stockLevel,
      ),
    [
      cartItemInput.options,
      productOptions,
      productVariants,
      purchaseOptions,
      state.selectedPlan,
      stockLevel,
    ],
  );

  useEffect(
    () =>
      dispatch({
        type: ACTIONS.SET_QUANTITY,
        payload: 1,
      }),
    [state.selectedProductOptions],
  );

  const _addToCart = useCartStore((store) => store.addToCart);

  const addToCart = useCallback(
    async (config: AddToCartConfig = { showCartAfter: true }) => {
      const isVariant = state.selectedProductOptions.size > 0;
      if (isVariant && activeVariation?.name) {
        config.data = {
          variant: {
            name: activeVariation?.name,
          },
        };
      }
      try {
        await _addToCart(cartItemInput, config);
        // TODO: Standardize error data type to handle errors consistently.
      } catch (error) {
        console.error(error);
      }
    },
    [
      _addToCart,
      activeVariation?.name,
      cartItemInput,
      state.selectedProductOptions.size,
    ],
  );

  return {
    state,
    dispatch,
    addToCart,
    activeVariation,
    cartItemInput,
  };
};

export function getPurchaseOption(
  type: PURCHASE_OPTION_TYPE,
  planId?: Maybe<string>,
) {
  switch (type) {
    case PURCHASE_OPTION_TYPE.STANDARD: {
      return {
        type,
      };
    }
    case PURCHASE_OPTION_TYPE.SUBSCRIPTION: {
      if (!planId) return null;
      return {
        type,
        planId,
      };
    }
    default: {
      return null;
    }
  }
}

export default useProductSelection;
