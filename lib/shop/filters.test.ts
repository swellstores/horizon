import { applyFilters, PRODUCT_ATTRIBUTE_TYPE } from 'lib/shop/filters';
import { results as products } from 'mock/products.json';
import {
  getFilters,
  getPriceRangeFromProducts,
  getPriceRangeFromQuery,
} from './filters';
import type { SwellProduct } from 'lib/graphql/generated/sdk';

const sizeOptions = [
  { label: '6', value: '6' },
  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
  { label: '10', value: '10' },
  { label: '11', value: '11' },
  { label: '12', value: '12' },
  { label: 'XS', value: 'XS' },
  { label: 'S', value: 'S' },
  { label: 'M', value: 'M' },
  { label: 'L', value: 'L' },
  { label: 'XL', value: 'XL' },
  { label: 'XXL', value: 'XXL' },
  { label: 'Small', value: 'Small' },
  { label: 'Large', value: 'Large' },
];

const colorOptions = [
  { label: 'Red', value: 'Red' },
  { label: 'Gray', value: 'Gray' },
  { label: 'Blue', value: 'Blue' },
  { label: 'Black', value: 'Black' },
  { label: 'White', value: 'White' },
];

const colorFilter = {
  id: 'color',
  name: 'color',
  type: PRODUCT_ATTRIBUTE_TYPE.SELECT,
  values: colorOptions,
};
const sizeFilter = {
  id: 'size',
  name: 'size',
  type: PRODUCT_ATTRIBUTE_TYPE.RADIO,
  values: sizeOptions,
};

const MIN_PRICE = 25;
const MAX_PRICE = 30;

describe('Product filters logic', () => {
  describe('getFilters', () => {
    it('gets the available filters from the list of products', () => {
      const filters = getFilters(products as SwellProduct[]);
      const filtersWithoutSize = getFilters(
        (products as SwellProduct[]).filter(
          (product) => !Object.hasOwn(product.attributes, 'size'),
        ),
      );

      expect(filters).toStrictEqual([
        {
          id: 'size',
          name: 'Size',
          type: 'checkbox',
          values: sizeOptions,
        },
        {
          id: 'color',
          name: 'Color',
          type: 'checkbox',
          values: colorOptions,
        },
      ]);
      expect(filtersWithoutSize).toStrictEqual([
        {
          id: 'color',
          name: 'Color',
          type: 'checkbox',
          values: [{ label: 'White', value: 'White' }],
        },
      ]);
    });
  });

  describe('getPriceRangeFromProducts', () => {
    it('returns 0 as the minimum and maximum if the list of products is empty', () => {
      const priceRange = getPriceRangeFromProducts([]);

      expect(priceRange).toStrictEqual([0, 0]);
    });

    it('returns the range correctly', () => {
      const priceRange = getPriceRangeFromProducts(products);

      expect(priceRange).toStrictEqual([24.95, 29.95]);
    });
  });

  describe('getPriceRangeFromQuery', () => {
    it('returns undefined if the query has no price', () => {
      const priceRange = getPriceRangeFromQuery({ size: '3' });

      expect(priceRange).toBe(undefined);
    });

    it('returns undefined if the format is not correct', () => {
      const priceRange = getPriceRangeFromQuery({ price: '2' });
      const arrayWithOneItem = getPriceRangeFromQuery({ price: ['2'] });
      const arrayWithMoreThanTwoItems = getPriceRangeFromQuery({
        price: ['1', '2', '2'],
      });

      expect(priceRange).toBe(undefined);
      expect(arrayWithOneItem).toBe(undefined);
      expect(arrayWithMoreThanTwoItems).toBe(undefined);
    });

    it('returns undefined if the query has only one value for the range', () => {
      const priceRange = getPriceRangeFromQuery({ price: ['2'] });

      expect(priceRange).toBe(undefined);
    });

    it('returns undefined if the query has more than two values for the range', () => {
      const priceRange = getPriceRangeFromQuery({ price: ['2', '3', '4'] });

      expect(priceRange).toBe(undefined);
    });

    it('returns undefined if at least the one of the values in the query are not numbers', () => {
      const case1 = getPriceRangeFromQuery({ price: ['a', 'b'] });
      const case2 = getPriceRangeFromQuery({ price: ['1', 'a'] });
      const case3 = getPriceRangeFromQuery({ price: ['a', '1'] });

      expect(case1).toBe(undefined);
      expect(case2).toBe(undefined);
      expect(case3).toBe(undefined);
    });

    it('returns undefined if the first number is smaller than the second number', () => {
      const priceRange = getPriceRangeFromQuery({ price: ['10', '1'] });

      expect(priceRange).toBe(undefined);
    });

    it('returns the price range correctly if the query has more than one filter', () => {
      const case1 = getPriceRangeFromQuery({ price: ['1', '10'], size: '3' });
      const case2 = getPriceRangeFromQuery({
        price: ['1', '10'],
        color: 'red',
      });
      const case3 = getPriceRangeFromQuery({
        price: ['1', '10'],
        size: '3',
        color: 'red',
      });

      expect(case1).toStrictEqual([1, 10]);
      expect(case2).toStrictEqual([1, 10]);
      expect(case3).toStrictEqual([1, 10]);
    });

    it('returns the price range correctly', () => {
      const case1 = getPriceRangeFromQuery({ price: ['1', '10'] });
      const case2 = getPriceRangeFromQuery({ price: ['1.5', '10'] });
      const case3 = getPriceRangeFromQuery({ price: ['1', '10.5'] });
      const case4 = getPriceRangeFromQuery({ price: ['1.5', '10.5'] });

      expect(case1).toStrictEqual([1, 10]);
      expect(case2).toStrictEqual([1.5, 10]);
      expect(case3).toStrictEqual([1, 10.5]);
      expect(case4).toStrictEqual([1.5, 10.5]);
    });
  });

  describe('applyFilters', () => {
    it('returns the full list of products if the query is empty', () => {
      const filteredProducts = applyFilters([], products as SwellProduct[], {});

      expect(filteredProducts).toStrictEqual(products);
    });

    it('returns the full list of products if the query is empty', () => {
      const filteredProducts = applyFilters(
        [
          {
            id: 'color',
            name: 'color',
            type: PRODUCT_ATTRIBUTE_TYPE.SELECT,
            values: colorOptions,
          },
        ],
        products as SwellProduct[],
        {},
      );

      expect(filteredProducts).toStrictEqual(products);
    });

    it('returns the full list of products if the query has a filter that does not exist', () => {
      const filteredProducts = applyFilters(
        [
          {
            id: 'color',
            name: 'color',
            type: PRODUCT_ATTRIBUTE_TYPE.SELECT,
            values: colorOptions,
          },
        ],
        products as SwellProduct[],
        {
          brand: 'Horizon',
        },
      );

      expect(filteredProducts).toStrictEqual(products);
    });

    it('filters the products by attributes correctly', () => {
      const oneFilter = applyFilters(
        [colorFilter],
        products as SwellProduct[],
        {
          color: 'White',
        },
      );

      const multipleFilters = applyFilters(
        [colorFilter, sizeFilter],
        products as SwellProduct[],
        {
          color: 'Red',
          size: 'Large',
        },
      );

      const multipleFiltersWithPrice = applyFilters(
        [colorFilter, sizeFilter],
        products as SwellProduct[],
        {
          color: 'Red',
          size: 'Large',
          price: [`${MIN_PRICE}`, `${MAX_PRICE}`],
        },
      );

      expect(
        oneFilter.some((product) =>
          Array.isArray(product.attributes?.color?.value)
            ? !product.attributes.color.value.includes('White')
            : product.attributes?.color?.value !== 'White',
        ),
      ).toBe(false);

      expect(
        multipleFilters.some((product) =>
          Array.isArray(product.attributes?.color?.value)
            ? !product.attributes.color.value.includes('Red') ||
              !product.attributes?.size?.value.includes('Large')
            : false,
        ),
      ).toBe(false);

      expect(
        multipleFiltersWithPrice.some((product) =>
          Array.isArray(product.attributes?.color?.value)
            ? !product.attributes.color.value.includes('Red') ||
              !product.attributes?.size?.value.includes('Large') ||
              product.price < 25 ||
              product.price > 30
            : false,
        ),
      ).toBe(false);
    });

    it('filters the products by price correctly', () => {
      const filteredProducts = applyFilters([], products as SwellProduct[], {
        price: [`${MIN_PRICE}`, `${MAX_PRICE}`],
      });

      expect(
        filteredProducts.some(
          (product) => product.price < 25 || product.price > 30,
        ),
      ).toBe(false);
    });

    it('filters the products by price and attributes correctly', () => {
      const filteredProducts = applyFilters(
        [colorFilter, sizeFilter],
        products as SwellProduct[],
        {
          color: 'Red',
          size: 'Large',
          price: [`${MIN_PRICE}`, `${MAX_PRICE}`],
        },
      );

      expect(
        filteredProducts.some((product) =>
          Array.isArray(product.attributes?.color?.value)
            ? !product.attributes.color.value.includes('Red') ||
              !product.attributes?.size?.value.includes('Large') ||
              product.price < 25 ||
              product.price > 30
            : false,
        ),
      ).toBe(false);
    });
  });
});
