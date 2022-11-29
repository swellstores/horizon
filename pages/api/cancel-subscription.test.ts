import { setupServer } from 'msw/node';
import { graphql } from 'msw';
import { mockNextApi } from 'utils/test/next-api';
import cancelSubscription from 'pages/api/cancel-subscription';

const handler = (
  data: Record<string, unknown> = { canceled: true },
  once?: boolean,
) => {
  return graphql.mutation('cancelSubscription', (_, res, ctx) => {
    if (once) {
      return res.once(
        ctx.data({
          updateSubscription: {
            ...data,
          },
        }),
        ctx.set('x-session', 'session-token'),
      );
    }
    return res(
      ctx.data({
        updateSubscription: {
          ...data,
        },
      }),
      ctx.set('x-session', 'session-token'),
    );
  });
};

const server = setupServer(handler());

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

describe('cancel-subscription api handler', () => {
  const defaultBody = {
    id: 'sub-id-1',
  };

  it('fails when using the wrong http method', async () => {
    const { req, res } = mockNextApi({ method: 'GET' });
    await cancelSubscription(req, res);
    expect(res.statusCode).toBe(405);
  });

  it('rejects when missing subscription id', async () => {
    const { req, res } = mockNextApi({ method: 'POST', body: {} });
    await cancelSubscription(req, res);
    expect(res.statusCode).toBe(400);
  });

  it('rejects when returned canceled value is not true', async () => {
    const { req, res } = mockNextApi({
      method: 'POST',
      body: {
        ...defaultBody,
      },
    });

    server.use(handler({ canceled: null }, true));
    await cancelSubscription(req, res);
    expect(res.statusCode).toBe(500);

    server.use(handler({ canceled: false }, true));
    await cancelSubscription(req, res);
    expect(res.statusCode).toBe(500);
  });

  it('returns 200 and canceled = true for valid requests', async () => {
    const { req, res } = mockNextApi({
      method: 'POST',
      body: defaultBody,
    });
    await cancelSubscription(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual({
      canceled: true,
    });
  });
});
