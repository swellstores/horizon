import { renderHook } from '@testing-library/react-hooks';
import useQuizResults from './useQuizResults';
import { graphql } from 'msw';
import { setupServer } from 'msw/lib/node';
import { PURCHASE_OPTION_TYPE } from 'types/shared/products';

const mockProductResult = (slug: string) => ({
  productId: `${slug}-id`,
  description: `Test description ${slug}`,
  currency: 'USD',
  href: `/products/${slug}`,
  image: {
    alt: 'Test product image',
    height: 100,
    width: 50,
    src: 'https://test.image.cdn/image',
  },
  purchaseOptions: {
    standard: {
      price: 30,
      sale: true,
      salePrice: 30,
      origPrice: 45,
    },
  },
  title: `Test name ${slug}`,
  cross: [],
  productOptions: [
    {
      id: 'test-option-1',
      attributeId: 'size',
      name: 'Size',
      inputType: 'select',
      active: true,
      required: true,
      values: [
        {
          id: 'test-option-value-1',
          name: 'S',
        },
        {
          id: 'test-option-value-1',
          name: 'M',
        },
      ],
    },
  ],
  productVariants: [
    {
      name: 'S',
      price: 25,
      origPrice: 50,
      prices: null,
      images: null,
      optionValueIds: ['test-option-value-1'],
      purchaseOptions: {
        standard: {
          price: 25,
          sale: true,
          salePrice: 25,
          origPrice: 50,
          prices: null,
        },
      },
      stockLevel: 10,
      currency: 'USD',
    },
  ],
  hrefCta: 'See product details',
  addLabel: 'Add to Bag',
  addedLabel: 'Added',
});

const mockSelectedProduct = (slug: string) => ({
  productId: `${slug}-id`,
  options: [
    {
      id: 'test-option-1',
      valueId: 'test-option-value-1',
    },
  ],
  purchaseOption: {
    type: PURCHASE_OPTION_TYPE.STANDARD,
  },
});

const getProductQuery = graphql.query('getProduct', (req, res, ctx) => {
  const productSlug = req.variables.slug;
  return res(
    ctx.data({
      productBySlug: {
        id: `${productSlug}-id`,
        description: `Test description ${productSlug}`,
        currency: 'USD',
        slug: productSlug,
        name: `Test name ${productSlug}`,
        images: [
          {
            caption: 'Test product image',
            file: {
              height: 100,
              width: 50,
              url: 'https://test.image.cdn/image',
            },
          },
        ],
        purchaseOptions: {
          standard: {
            price: 30,
            sale: true,
            salePrice: 30,
            origPrice: 45,
          },
        },
        crossSells: [],
        options: [
          {
            id: 'test-option-1',
            attributeId: 'size',
            name: 'Size',
            inputType: 'select',
            active: true,
            required: true,
            values: [
              {
                id: 'test-option-value-1',
                name: 'S',
              },
              {
                id: 'test-option-value-1',
                name: 'M',
              },
            ],
          },
        ],
        variants: {
          results: [
            {
              name: 'S',
              price: 25,
              origPrice: 50,
              prices: null,
              images: null,
              optionValueIds: ['test-option-value-1'],
              purchaseOptions: {
                standard: {
                  price: 25,
                  sale: true,
                  salePrice: 25,
                  origPrice: 50,
                  prices: null,
                },
              },
              stockLevel: 10,
              currency: 'USD',
            },
          ],
        },
      },
    }),
  );
});

const gqlRequests = [getProductQuery];

const server = setupServer(...gqlRequests);

describe('useQuizResults', () => {
  beforeAll(() => {
    server.listen();
  });
  afterAll(() => {
    server.close();
  });

  it('returns correct initial state', async () => {
    const { result } = renderHook(() =>
      useQuizResults({
        name: 'Test',
        products: '',
      }),
    );

    expect(result.current.customerName).toBe('Test');
    expect(result.current.results).toStrictEqual([]);
    expect(result.current.selectedProducts).toStrictEqual(new Map());
  });

  it('returns correct state when query parameters are filled in', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useQuizResults({
        name: 'Test',
        products: 'test-product-1,test-product-2,test-product-3',
      }),
    );

    // Waiting for useEffect to fetch quiz product data based on query
    await waitForNextUpdate();

    expect(result.current.customerName).toBe('Test');
    expect(result.current.results).toStrictEqual([
      mockProductResult('test-product-1'),
      mockProductResult('test-product-2'),
      mockProductResult('test-product-3'),
    ]);
    expect(result.current.selectedProducts).toStrictEqual(
      new Map([
        [JSON.stringify(mockSelectedProduct('test-product-1')), 1],
        [JSON.stringify(mockSelectedProduct('test-product-2')), 1],
        [JSON.stringify(mockSelectedProduct('test-product-3')), 1],
      ]),
    );
  });
});
