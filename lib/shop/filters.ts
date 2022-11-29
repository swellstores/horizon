import type { SwellProduct } from 'lib/graphql/generated/sdk';
import type { ParsedUrlQuery } from 'querystring';
import type {
  ProductAttribute,
  ProductFilterOption,
  ProductFilterOptionValue,
} from 'types/shared/products';

export enum PRODUCT_ATTRIBUTE_TYPE {
  TEXT = 'text',
  TEXT_AREA = 'textarea',
  SELECT = 'select',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  NUMBER = 'number',
  CURRENCY = 'currency',
}

export const getFilters = (products: SwellProduct[]) => {
  const attributeFilters: ProductFilterOption[] = [];
  let minimumPrice: number | undefined;
  let maximumPrice: number | undefined;

  for (const product of products) {
    // Calculate the price range
    const { price } = product;

    if (price) {
      if (minimumPrice === undefined || price < minimumPrice) {
        minimumPrice = price;
      }
      if (maximumPrice === undefined || price > maximumPrice) {
        maximumPrice = price;
      }
    }

    // Get the rest of the filters from the attributes array dynamically
    for (const attribute of Object.values<ProductAttribute>(
      product.attributes ?? {},
    )) {
      // Skip the attribute if the it lacks the required properties
      if (!attribute.id || !attribute.value) continue;

      // Check if the attribute is filterable and visible
      if (!attribute.filterable || !attribute.visible) continue;

      // Check if the attribute is already in the filters
      const filter = attributeFilters.find(
        (filter) => filter.id === attribute.id,
      );

      if (!filter) {
        const values: ProductFilterOptionValue[] = [];
        // If the attribute has an array of values, add them to the filter
        if (Array.isArray(attribute.value)) {
          for (const value of attribute.value) {
            values.push({
              label: value,
              value,
            });
          }
        } else {
          // If the value is a string, add it to the filter
          values.push({
            label: attribute.value,
            value: attribute.value,
          });
        }

        // Add the attribute to the filters array if not already present
        attributeFilters.push({
          id: attribute.id,
          name: attribute.name ?? '',
          type: attribute.type ?? PRODUCT_ATTRIBUTE_TYPE.CHECKBOX,
          values,
        });
      } else {
        // Check if the value is already in the values
        const value = filter.values.find(
          (value) => value.value === attribute.value,
        );

        // Add the value to the filter if not already present
        if (!value) {
          // If the value is an array, add all the new values to the filter
          if (Array.isArray(attribute.value)) {
            for (const attributeValue of attribute.value) {
              // Check if the value is already in the filter and skip if it is
              if (
                filter.values.some(
                  (filterValue) => filterValue.value === attributeValue,
                )
              )
                continue;

              filter.values.push({
                label: attributeValue,
                value: attributeValue,
              });
            }
          } else {
            // If the value is a string, add it to the filter
            filter.values.push({
              label: attribute.value,
              value: attribute.value,
            });
          }
        }
      }
    }
  }

  return attributeFilters;
};

export const applyFilters = (
  filterList: ProductFilterOption[],
  products: SwellProduct[],
  query: ParsedUrlQuery,
) => {
  const currentFilters = Object.entries(query).map(([key, value]) => ({
    label: key,
    value: Array.isArray(value) ? value : [value ?? ''],
  }));

  const priceRangeFilter = currentFilters.find(
    (filter) => filter.label === 'price',
  );

  // Ignore the query parameters that don't belong to the filters
  const attributeFilters = currentFilters.filter((attributeFilter) =>
    filterList.some((filter) => filter.id === attributeFilter.label),
  );

  return products.filter((product) => {
    // Check the price range
    const { price } = product;

    if (priceRangeFilter?.value) {
      // If the price range is defined, check if the product has a price
      if (!price) return false;

      const [min, max] = priceRangeFilter.value;

      if (price < Number(min) || price > Number(max)) return false;
    }

    // Check the rest of the filters against the product attributes
    for (const filter of attributeFilters) {
      // Check if the filter has a value
      if (!filter.value) continue;

      // Check if the product has attributes
      if (!product.attributes) return false;

      const key = Object.keys(product.attributes).find(
        (key) =>
          (product.attributes[key] as ProductAttribute).id === filter.label,
      );

      // If the product doesn't have the attribute, return false
      if (!key) return false;

      const values = filter.value;

      const attribute: ProductAttribute = product.attributes[key];

      if (!attribute.value) return false;

      // If the attribute has an array of values, check if the product has one of them
      if (Array.isArray(attribute.value)) {
        if (values.some((value) => attribute.value?.includes(value))) continue;
      }
      // If the attribute has a single value, check if it's part of the filter values
      else if (values.includes(attribute.value)) continue;

      return false;
    }

    return true;
  });
};

export const getPriceRangeFromProducts = (
  products: Pick<SwellProduct, 'price'>[],
): [number, number] => {
  if (products.length === 0) return [0, 0];

  return [
    Math.min(...products.map((product) => product.price ?? 0)),
    Math.max(...products.map((product) => product.price ?? 0)),
  ];
};

export const getPriceRangeFromQuery = (
  query: ParsedUrlQuery,
): [number, number] | undefined => {
  // Check if the price range is set in the query string
  if (query.price?.length && query.price?.length === 2) {
    const [newMin, newMax] = query.price;

    if (isNaN(Number(newMin)) || isNaN(Number(newMax))) return;

    if (Number(newMin) > Number(newMax)) return;

    return [Number(newMin), Number(newMax)];
  }
};
