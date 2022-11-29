import { renderHook, act } from '@testing-library/react-hooks';
import useProductSelection, { ACTIONS } from './useProductSelection';
import { OPTION_INPUT_TYPE, PURCHASE_OPTION_TYPE } from 'types/shared/products';
import type { ActiveVariation } from 'lib/utils/products';
import type { SwellProductVariant } from 'lib/graphql/generated/sdk';

const productId = '123';
const legendText = 'Legend Text';
const attachmentText = 'Attachment Text';

const productOptions = [
  {
    id: 'color',
    inputType: OPTION_INPUT_TYPE.SELECT,
    name: 'Color',
    active: true,
    attributeId: 'color',
    required: true,
    values: [
      {
        id: 'red',
        name: 'Red',
        price: 10,
      },
      {
        id: 'blue',
        name: 'Blue',
        price: 20,
      },
    ],
  },
  {
    id: 'extra_toppings',
    inputType: OPTION_INPUT_TYPE.TOGGLE,
    name: 'Extra toppings',
    active: true,
    attributeId: 'extra_toppings',
    required: false,
    values: [
      {
        id: 'selected',
        name: 'Extra toppings',
        price: 10,
      },
    ],
  },
  {
    id: 'legend',
    inputType: OPTION_INPUT_TYPE.SHORT_TEXT,
    name: 'Legend',
    active: true,
    attributeId: 'legend',
    required: false,
  },
  {
    id: 'attached_letter',
    inputType: OPTION_INPUT_TYPE.LONG_TEXT,
    name: 'Attached letter',
    active: true,
    attributeId: 'attached_letter',
    required: false,
  },
];

const purchaseOptions = {
  standard: {
    price: 100,
  },
  subscription: {
    plans: [
      {
        id: '1',
        name: 'Monthly',
        price: 100,
      },
      {
        id: '2',
        name: 'Yearly',
        price: 200,
      },
    ],
  },
};

const productVariants: SwellProductVariant[] = [
  {
    price: 100,
    origPrice: 150,
    optionValueIds: ['red'],
  },
  {
    price: 200,
    optionValueIds: ['blue'],
  },
  {
    price: 300,
    origPrice: 350,
    optionValueIds: ['red', 'selected'],
  },
  {
    price: 400,
    optionValueIds: ['blue', 'selected'],
  },
];

describe('useProductSelection', () => {
  it('returns the correct initial state', () => {
    const { result } = renderHook(() =>
      useProductSelection({
        productId,
        productOptions,
        purchaseOptions,
        productVariants,
      }),
    );
    expect(result.current.state).toStrictEqual({
      selectedPurchaseOption: PURCHASE_OPTION_TYPE.STANDARD,
      selectedPlan: purchaseOptions.subscription.plans[0],
      quantity: 1,
      selectedProductOptions: new Map([
        [productOptions[0].id, productOptions[0].values?.[0].id],
      ]),
      textProductOptions: new Map(),
    });
  });

  it('returns the current active variation', () => {
    const { result } = renderHook(() =>
      useProductSelection({
        productId,
        productOptions,
        purchaseOptions,
        productVariants,
      }),
    );

    const activeVariation: ActiveVariation = {
      ...productVariants[0],
      standardPrice: {
        price: productVariants[0].price,
        origPrice: productVariants[0].origPrice,
      },
      subscriptionPrice: {
        ...purchaseOptions.subscription.plans[0],
        price:
          purchaseOptions.subscription.plans[0].price +
          (productOptions[0].values?.[0].price ?? 0),
      },
    };
    expect(result.current.activeVariation).toStrictEqual(activeVariation);
  });

  it('returns the correct cart item input', () => {
    const { result } = renderHook(() =>
      useProductSelection({
        productId,
        productOptions,
        purchaseOptions,
        productVariants,
      }),
    );

    expect(result.current.cartItemInput).toStrictEqual({
      productId,
      quantity: 1,
      options: [
        {
          id: productOptions[0].id,
          valueId: productOptions[0].values?.[0].id,
        },
      ],
      purchaseOption: {
        type: PURCHASE_OPTION_TYPE.STANDARD,
      },
    });
  });

  it('updates the purchase option', () => {
    const { result } = renderHook(() =>
      useProductSelection({
        productId,
        productOptions,
        purchaseOptions,
        productVariants,
      }),
    );

    act(() => {
      result.current.dispatch({
        type: ACTIONS.SET_SELECTED_PURCHASE_OPTION,
        payload: PURCHASE_OPTION_TYPE.SUBSCRIPTION,
      });
    });

    expect(result.current.state).toStrictEqual({
      selectedPurchaseOption: PURCHASE_OPTION_TYPE.SUBSCRIPTION,
      selectedPlan: purchaseOptions.subscription.plans[0],
      quantity: 1,
      selectedProductOptions: new Map([
        [productOptions[0].id, productOptions[0].values?.[0].id],
      ]),
      textProductOptions: new Map(),
    });
  });

  it('updates the product options', () => {
    const { result } = renderHook(() =>
      useProductSelection({
        productId,
        productOptions,
        purchaseOptions,
        productVariants,
      }),
    );

    act(() => {
      result.current.dispatch({
        type: ACTIONS.SET_SELECTED_PRODUCT_OPTIONS,
        payload: {
          optionId: productOptions[0].id,
          valueId: productOptions[0].values?.[1].id ?? '',
        },
      });
    });

    expect(result.current.state).toStrictEqual({
      selectedPurchaseOption: PURCHASE_OPTION_TYPE.STANDARD,
      selectedPlan: purchaseOptions.subscription.plans[0],
      quantity: 1,
      selectedProductOptions: new Map([
        [productOptions[0].id, productOptions[0].values?.[1].id],
      ]),
      textProductOptions: new Map(),
    });

    act(() => {
      result.current.dispatch({
        type: ACTIONS.SET_SELECTED_PRODUCT_OPTIONS,
        payload: {
          optionId: productOptions[1].id,
          valueId: productOptions[1].values?.[0].id ?? '',
        },
      });
    });

    expect(result.current.state).toStrictEqual({
      selectedPurchaseOption: PURCHASE_OPTION_TYPE.STANDARD,
      selectedPlan: purchaseOptions.subscription.plans[0],
      quantity: 1,
      selectedProductOptions: new Map([
        [productOptions[0].id, productOptions[0].values?.[1].id],
        [productOptions[1].id, productOptions[1].values?.[0].id],
      ]),
      textProductOptions: new Map(),
    });

    act(() => {
      result.current.dispatch({
        type: ACTIONS.SET_TEXT_PRODUCT_OPTION,
        payload: {
          optionId: productOptions[2].id,
          value: legendText,
        },
      });
    });

    expect(result.current.state).toStrictEqual({
      selectedPurchaseOption: PURCHASE_OPTION_TYPE.STANDARD,
      selectedPlan: purchaseOptions.subscription.plans[0],
      quantity: 1,
      selectedProductOptions: new Map([
        [productOptions[0].id, productOptions[0].values?.[1].id],
        [productOptions[1].id, productOptions[1].values?.[0].id],
      ]),
      textProductOptions: new Map([[productOptions[2].id, legendText]]),
    });

    act(() => {
      result.current.dispatch({
        type: ACTIONS.SET_TEXT_PRODUCT_OPTION,
        payload: {
          optionId: productOptions[3].id,
          value: attachmentText,
        },
      });
    });

    expect(result.current.state).toStrictEqual({
      selectedPurchaseOption: PURCHASE_OPTION_TYPE.STANDARD,
      selectedPlan: purchaseOptions.subscription.plans[0],
      quantity: 1,
      selectedProductOptions: new Map([
        [productOptions[0].id, productOptions[0].values?.[1].id],
        [productOptions[1].id, productOptions[1].values?.[0].id],
      ]),
      textProductOptions: new Map([
        [productOptions[2].id, legendText],
        [productOptions[3].id, attachmentText],
      ]),
    });
  });

  it('updates the quantity', () => {
    const { result } = renderHook(() =>
      useProductSelection({
        productId,
        productOptions,
        purchaseOptions,
        productVariants,
      }),
    );

    act(() => {
      result.current.dispatch({
        type: ACTIONS.SET_QUANTITY,
        payload: 2,
      });
    });

    expect(result.current.state).toStrictEqual({
      selectedPurchaseOption: PURCHASE_OPTION_TYPE.STANDARD,
      selectedPlan: purchaseOptions.subscription.plans[0],
      quantity: 2,
      selectedProductOptions: new Map([
        [productOptions[0].id, productOptions[0].values?.[0].id],
      ]),
      textProductOptions: new Map(),
    });
  });

  it('updates the plan', () => {
    const { result } = renderHook(() =>
      useProductSelection({
        productId,
        productOptions,
        purchaseOptions,
        productVariants,
      }),
    );

    act(() => {
      result.current.dispatch({
        type: ACTIONS.SET_SELECTED_PURCHASE_OPTION,
        payload: PURCHASE_OPTION_TYPE.SUBSCRIPTION,
      });
      result.current.dispatch({
        type: ACTIONS.SET_SELECTED_PLAN,
        payload: purchaseOptions.subscription.plans[1],
      });
    });

    expect(result.current.state).toStrictEqual({
      selectedPurchaseOption: PURCHASE_OPTION_TYPE.SUBSCRIPTION,
      selectedPlan: purchaseOptions.subscription.plans[1],
      quantity: 1,
      selectedProductOptions: new Map([
        [productOptions[0].id, productOptions[0].values?.[0].id],
      ]),
      textProductOptions: new Map(),
    });
  });

  it('updates the cart item input', () => {
    const { result } = renderHook(() =>
      useProductSelection({
        productId,
        productOptions,
        purchaseOptions,
        productVariants,
      }),
    );

    act(() => {
      result.current.dispatch({
        type: ACTIONS.SET_SELECTED_PURCHASE_OPTION,
        payload: PURCHASE_OPTION_TYPE.SUBSCRIPTION,
      });
      result.current.dispatch({
        type: ACTIONS.SET_SELECTED_PLAN,
        payload: purchaseOptions.subscription.plans[1],
      });
      result.current.dispatch({
        type: ACTIONS.SET_SELECTED_PRODUCT_OPTIONS,
        payload: {
          optionId: productOptions[0].id,
          valueId: productOptions[0].values?.[1].id ?? '',
        },
      });
      result.current.dispatch({
        type: ACTIONS.SET_TEXT_PRODUCT_OPTION,
        payload: {
          optionId: productOptions[2].id,
          value: legendText,
        },
      });
    });

    act(() => {
      result.current.dispatch({
        type: ACTIONS.SET_QUANTITY,
        payload: 2,
      });
    });

    expect(result.current.cartItemInput).toStrictEqual({
      productId,
      quantity: 2,
      options: [
        {
          id: productOptions[0].id,
          valueId: productOptions[0].values?.[1].id,
        },
        {
          id: productOptions[2].id,
          value: legendText,
        },
      ],
      purchaseOption: {
        type: PURCHASE_OPTION_TYPE.SUBSCRIPTION,
        planId: purchaseOptions.subscription.plans[1].id,
      },
    });
  });

  it('updates the active variation', () => {
    const { result } = renderHook(() =>
      useProductSelection({
        productId,
        productOptions,
        purchaseOptions,
        productVariants,
      }),
    );

    act(() => {
      result.current.dispatch({
        type: ACTIONS.SET_SELECTED_PRODUCT_OPTIONS,
        payload: {
          optionId: productOptions[0].id,
          valueId: productOptions[0].values?.[1].id ?? '',
        },
      });
      result.current.dispatch({
        type: ACTIONS.SET_SELECTED_PRODUCT_OPTIONS,
        payload: {
          optionId: productOptions[1].id,
          valueId: productOptions[1].values?.[0].id ?? '',
        },
      });
    });

    const activeVariation: ActiveVariation = {
      ...productVariants[1],
      standardPrice: {
        price: productVariants[1].price,
        origPrice: productVariants[1].origPrice,
      },
      subscriptionPrice: {
        ...purchaseOptions.subscription.plans[0],
        price:
          purchaseOptions.subscription.plans[0].price +
          (productOptions[0].values?.[1].price ?? 0) +
          (productOptions[1].values?.[0].price ?? 0),
      },
    };

    expect(result.current.activeVariation).toStrictEqual(activeVariation);
  });
});
