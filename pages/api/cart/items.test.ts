import { setupServer } from 'msw/node';
import { getIncompleteReq, mockNextApi } from 'utils/test/next-api';
import cartItems from 'pages/api/cart/items';
import type { SwellCartItemInput } from 'lib/graphql/generated/sdk';
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

const defaultUpdateCartItemData = { updateCartItem: defaultCartData };
const updateCartItemHandler = graphQLHandler(
  'updateCartItem',
  GRAPHQL_OPERATION.MUTATION,
  defaultUpdateCartItemData,
  'session-token',
);

const defaultDeleteCartItemData = { deleteCartItem: defaultCartData };
const deleteCartItemHandler = graphQLHandler(
  'deleteCartItem',
  GRAPHQL_OPERATION.MUTATION,
  defaultDeleteCartItemData,
  'session-token',
);

const handlers = [updateCartItemHandler(), deleteCartItemHandler()];

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

describe('cart items api handler', () => {
  const defaultUpdateBody: { itemId: string; input: SwellCartItemInput } = {
    itemId: 'test-item-3',
    input: {
      quantity: 4,
    },
  };

  const defaultDeleteBody: { itemId: string } = {
    itemId: 'test-item-3',
  };

  it('fails when using the wrong http method', async () => {
    const { req, res } = mockNextApi({ method: 'POST' });
    await cartItems(req, res);
    expect(res.statusCode).toBe(405);
  });

  it('rejects when missing required data on PUT request', async () => {
    Object.keys(defaultUpdateBody).forEach(async (field) => {
      const { req, res } = getIncompleteReq(
        { method: 'PUT', body: defaultUpdateBody },
        field,
      );
      await cartItems(req, res);
      expect(res.statusCode).toBe(400);
    });
  });

  it('rejects when missing required data on DELETE request', async () => {
    const { req, res } = mockNextApi({ method: 'DELETE', body: {} });
    await cartItems(req, res);
    expect(res.statusCode).toBe(400);
  });

  it('returns 403 and error message when PUT request returns invalid data', async () => {
    const { req, res } = mockNextApi({
      method: 'PUT',
      body: defaultUpdateBody,
    });

    server.use(updateCartItemHandler({}, true));

    await cartItems(req, res);
    expect(res.statusCode).toBe(403);
  });

  it('returns 403 and error message when DELETE request returns invalid data', async () => {
    const { req, res } = mockNextApi({
      method: 'DELETE',
      body: defaultDeleteBody,
    });

    server.use(deleteCartItemHandler({}, true));

    await cartItems(req, res);
    expect(res.statusCode).toBe(403);
  });

  it('returns 200, parsed cart data and a sessionToken cookie for valid PUT requests', async () => {
    const { req, res } = mockNextApi({
      method: 'PUT',
      body: defaultUpdateBody,
    });
    await cartItems(req, res);
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

  it('returns 200, parsed cart data and a sessionToken cookie for valid DELETE requests', async () => {
    const { req, res } = mockNextApi({
      method: 'DELETE',
      body: defaultDeleteBody,
    });
    await cartItems(req, res);
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
