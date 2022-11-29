import { setupServer } from 'msw/node';
import { getIncompleteReq, mockNextApi } from 'utils/test/next-api';
import cart from 'pages/api/cart';
import type { CartItemInput } from 'types/shared/cart';
import { getCartItems } from 'lib/utils/cart';
import { graphQLHandler, GRAPHQL_OPERATION } from 'utils/test/handler';

const defaultCartData = {
  grandTotal: 100,
  checkoutUrl: 'https://test.swell.store/checkout',
  items: [
    {
      id: 'test-item-1',
    },
    {
      id: 'test-item-2',
    },
  ],
};

const defaultAddToCartData = { addCartItem: defaultCartData };
const addToCartHandler = graphQLHandler(
  'addToCart',
  GRAPHQL_OPERATION.MUTATION,
  defaultAddToCartData,
  'session-token',
);

const defaultGetCartData = { cart: defaultCartData };
const getCartHandler = graphQLHandler(
  'getCart',
  GRAPHQL_OPERATION.QUERY,
  defaultGetCartData,
  'session-token',
);

const handlers = [addToCartHandler(), getCartHandler()];

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

describe('cart api handler', () => {
  const defaultBody: CartItemInput = {
    productId: 'test-item-3',
    quantity: 1,
  };

  it('fails when using the wrong http method', async () => {
    const { req, res } = mockNextApi({ method: 'POST' });
    await cart(req, res);
    expect(res.statusCode).toBe(405);
  });

  it('rejects when missing required data on PUT request', async () => {
    Object.keys(defaultBody).forEach(async (field) => {
      const { req, res } = getIncompleteReq(
        { method: 'PUT', body: defaultBody },
        field,
      );
      await cart(req, res);
      expect(res.statusCode).toBe(400);
    });
  });

  it('returns 403 and error message when PUT request returns invalid data', async () => {
    const { req, res } = mockNextApi({
      method: 'PUT',
      body: defaultBody,
    });

    server.use(addToCartHandler({}, true));

    await cart(req, res);
    expect(res.statusCode).toBe(403);
  });

  it('returns 403 and error message when GET request returns invalid data', async () => {
    const { req, res } = mockNextApi({
      method: 'GET',
      body: defaultBody,
    });

    server.use(getCartHandler({}, true));

    await cart(req, res);
    expect(res.statusCode).toBe(403);
  });

  it('returns 200, parsed cart data and a sessionToken cookie for valid PUT requests', async () => {
    const { req, res } = mockNextApi({
      method: 'PUT',
      body: defaultBody,
    });
    await cart(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual({
      data: {
        total: 100,
        checkoutUrl: 'https://test.swell.store/checkout',
        items: getCartItems(defaultCartData),
      },
    });
    expect(res.getHeader('Set-Cookie')).toBeTruthy();
  });

  it('returns 200, parsed cart data and a sessionToken cookie for valid GET requests', async () => {
    const { req, res } = mockNextApi({
      method: 'PUT',
      body: defaultBody,
    });
    await cart(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual({
      data: {
        total: 100,
        checkoutUrl: 'https://test.swell.store/checkout',
        items: getCartItems(defaultCartData),
      },
    });
    expect(res.getHeader('Set-Cookie')).toBeTruthy();
  });
});
