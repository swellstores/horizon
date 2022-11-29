import { STOCK_STATUS } from 'types/shared/products';
import {
  getStockStatus,
  isStockLimited,
  StockStatusArgs,
  getActiveVariation,
} from './products';

describe('utils/products/getStockStatus', () => {
  let defaultArgs = {} as StockStatusArgs;

  beforeEach(() => {
    // Out of stock by default (1)
    defaultArgs = {
      stockTracking: true,
      stockPurchasable: false,
      stockLevel: 0,
      lowStockIndicator: null,
    };
  });

  // (1) Validate that the above statement is true
  it('should return OUT_OF_STOCK unless specified by stock level or status', () => {
    expect(getStockStatus(defaultArgs)).toEqual(STOCK_STATUS.OUT_OF_STOCK);
  });

  it('should return IN_STOCK when there is no stock tracking', () => {
    defaultArgs.stockTracking = false;
    expect(getStockStatus(defaultArgs)).toEqual(STOCK_STATUS.IN_STOCK);
  });

  it('should return IN_STOCK when purchases are allowed out of stock', () => {
    defaultArgs.stockPurchasable = true;
    expect(getStockStatus(defaultArgs)).toEqual(STOCK_STATUS.IN_STOCK);
  });

  it('should return IN_STOCK when the stockLevel is above 0', () => {
    defaultArgs.stockLevel = 1;
    expect(getStockStatus(defaultArgs)).toEqual(STOCK_STATUS.IN_STOCK);
  });

  it('should return LOW_STOCK when below the stock threshold', () => {
    defaultArgs.lowStockIndicator = 3;
    defaultArgs.stockLevel = 2;
    expect(getStockStatus(defaultArgs)).toEqual(STOCK_STATUS.LOW_STOCK);
  });
});

describe('utils/products/isStockLimited', () => {
  it('should return true when stock is tracked and not purchasable out of stock', () => {
    const stockTracking = true;
    const stockPurchasable = false;
    expect(isStockLimited(stockTracking, stockPurchasable)).toEqual(true);
  });

  it('should return false when stock is not tracked', () => {
    const stockTracking = false;
    expect(isStockLimited(stockTracking)).toEqual(false);
  });

  it('should return false when purchases are allowed out of stock', () => {
    const stockPurchasable = true;
    expect(isStockLimited(undefined, stockPurchasable)).toEqual(false);
  });
});

describe('utils/products/getActiveVariation', () => {
  const defaultData = {
    selectedOptions: [
      {
        id: '5f6227db47f619f41ab4458a',
        valueId: '5f6227f747f619f41ab4458d',
      },
    ],
    selectedPlan: {
      id: '6218af61b2ff800132e212c7',
      name: 'Monthly',
      price: 27.95,
      billingSchedule: {
        interval: 'monthly',
        intervalCount: 2,
        trialDays: null,
      },
    },
    productOptions: [
      {
        id: '5f6227db47f619f41ab4458a',
        attributeId: 'size',
        name: 'Size',
        description: '',
        inputType: 'select',
        active: true,
        required: true,
        parentId: null,
        parentValueIds: [],
        placeholder: '',
        values: [
          {
            id: '5f6227f747f619f41ab4458b',
            name: 'XS',
            price: 0,
          },
          {
            id: '5f6227f747f619f41ab4458c',
            name: 'S',
            price: 0,
          },
          {
            id: '5f6227f747f619f41ab4458d',
            name: 'M',
            price: 0,
          },
          {
            id: '5f6227f747f619f41ab4458e',
            name: 'L',
            price: 0,
          },
          {
            id: '5f6227f747f619f41ab4458f',
            name: 'XL',
            price: 0,
          },
          {
            id: '5f6227f747f619f41ab44590',
            name: 'XXL',
            price: 0,
          },
        ],
      },
    ],
    productPurchaseOptions: {
      standard: {
        price: 27.95,
        sale: false,
        salePrice: null,
        origPrice: null,
      },
      subscription: {
        plans: [
          {
            id: '6218af61b2ff800132e212c7',
            name: 'Monthly',
            price: 27.95,
            billingSchedule: {
              interval: 'monthly',
              intervalCount: 2,
              trialDays: null,
            },
          },
        ],
      },
    },
    productVariants: [
      {
        name: 'L',
        price: 31.15,
        origPrice: null,
        images: null,
        prices: null,
        optionValueIds: ['5f6227f747f619f41ab4458e'],
        purchaseOptions: null,
        stockLevel: null,
        currency: 'USD',
      },
      {
        name: 'M',
        price: 27.95,
        origPrice: null,
        images: null,
        prices: null,
        optionValueIds: ['5f6227f747f619f41ab4458d'],
        purchaseOptions: null,
        stockLevel: null,
        currency: 'USD',
      },
      {
        name: 'S',
        price: 23.0,
        origPrice: null,
        images: null,
        prices: null,
        optionValueIds: ['5f6227f747f619f41ab4458c'],
        purchaseOptions: null,
        stockLevel: null,
        currency: 'USD',
      },
    ],
    stockLevel: 3,
  };

  it('should return the correct variant data when there is a selected option', () => {
    const expectedVariation = {
      name: 'M',
      price: 27.95,
      origPrice: null,
      prices: null,
      images: null,
      optionValueIds: ['5f6227f747f619f41ab4458d'],
      purchaseOptions: null,
      stockLevel: null,
      currency: 'USD',
      standardPrice: { price: 27.95, origPrice: null },
      subscriptionPrice: {
        id: '6218af61b2ff800132e212c7',
        name: 'Monthly',
        price: 27.95,
        billingSchedule: {
          interval: 'monthly',
          intervalCount: 2,
          trialDays: null,
        },
      },
    };
    expect(
      getActiveVariation(
        defaultData.selectedOptions,
        defaultData.selectedPlan,
        defaultData.productOptions,
        defaultData.productPurchaseOptions,
        defaultData.productVariants,
        defaultData.stockLevel,
      ),
    ).toEqual(expectedVariation);
  });

  it('should adjust the subscription price data when trial is active', () => {
    const trialPurchaseOptions = {
      standard: {
        price: 27.95,
        sale: false,
        salePrice: null,
        origPrice: null,
      },
      subscription: {
        plans: [
          {
            id: '6218af61b2ff800132e212c7',
            name: 'Monthly',
            price: 27.95,
            billingSchedule: {
              interval: 'monthly',
              intervalCount: 2,
              trialDays: 3,
            },
          },
        ],
      },
    };
    const expectedVariation = {
      name: 'M',
      price: 27.95,
      origPrice: null,
      prices: null,
      images: null,
      optionValueIds: ['5f6227f747f619f41ab4458d'],
      purchaseOptions: null,
      stockLevel: null,
      currency: 'USD',
      standardPrice: { price: 27.95, origPrice: null },
      subscriptionPrice: {
        id: '6218af61b2ff800132e212c7',
        name: 'Monthly',
        price: 0,
        billingSchedule: {
          interval: 'monthly',
          intervalCount: 2,
          trialDays: 3,
        },
        origPrice: 27.95,
      },
    };
    expect(
      getActiveVariation(
        defaultData.selectedOptions,
        defaultData.selectedPlan,
        defaultData.productOptions,
        trialPurchaseOptions,
        defaultData.productVariants,
        defaultData.stockLevel,
      ),
    ).toEqual(expectedVariation);
  });

  it('should return the correct default data when there are no variants', () => {
    const expectedVariation = {
      standardPrice: {
        price: 27.95,
        origPrice: null,
        sale: false,
        salePrice: null,
      },
      subscriptionPrice: {
        id: '6218af61b2ff800132e212c7',
        name: 'Monthly',
        price: 27.95,
        billingSchedule: {
          interval: 'monthly',
          intervalCount: 2,
          trialDays: null,
        },
      },
      stockLevel: null,
    };
    expect(
      getActiveVariation(
        null,
        defaultData.selectedPlan,
        [],
        defaultData.productPurchaseOptions,
        [],
        null,
      ),
    ).toEqual(expectedVariation);
  });

  it('should adjust the default data when there are no variants and trial is active', () => {
    const planWithTrial = {
      id: '6218af61b2ff800132e212c7',
      name: 'Monthly',
      price: 27.95,
      billingSchedule: {
        interval: 'monthly',
        intervalCount: 2,
        trialDays: 3,
      },
    };
    const trialPurchaseOptions = {
      standard: {
        price: 27.95,
        sale: false,
        salePrice: null,
        origPrice: null,
      },
      subscription: {
        plans: [
          {
            id: '6218af61b2ff800132e212c7',
            name: 'Monthly',
            price: 27.95,
            billingSchedule: {
              interval: 'monthly',
              intervalCount: 2,
              trialDays: 3,
            },
          },
        ],
      },
    };
    const expectedVariation = {
      stockLevel: null,
      standardPrice: {
        price: 27.95,
        origPrice: null,
        sale: false,
        salePrice: null,
      },
      subscriptionPrice: {
        id: '6218af61b2ff800132e212c7',
        name: 'Monthly',
        price: 0,
        origPrice: 27.95,
        billingSchedule: {
          interval: 'monthly',
          intervalCount: 2,
          trialDays: 3,
        },
      },
    };
    expect(
      getActiveVariation(
        null,
        planWithTrial,
        [],
        trialPurchaseOptions,
        [],
        null,
      ),
    ).toEqual(expectedVariation);
  });
});
