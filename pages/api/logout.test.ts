import { setupServer } from 'msw/node';
import { mockNextApi } from 'utils/test/next-api';
import logout from 'pages/api/logout';
import { graphQLHandler, GRAPHQL_OPERATION } from 'utils/test/handler';

const defaultHandlerData = {
  logoutAccount: {
    success: true,
  },
};
const handler = graphQLHandler(
  'logout',
  GRAPHQL_OPERATION.MUTATION,
  defaultHandlerData,
  'session-token',
);

const server = setupServer(handler());

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

describe('logout api handler', () => {
  it('fails when using the wrong http method', async () => {
    const { req, res } = mockNextApi({ method: 'GET' });
    await logout(req, res);
    expect(res.statusCode).toBe(405);
  });

  it('rejects when logout is unsuccessful', async () => {
    const { req, res } = mockNextApi({
      method: 'POST',
    });

    server.use(handler({ logoutAccount: { success: false } }, true));

    await logout(req, res);
    expect(res.statusCode).toBe(500);
  });

  it('returns status 200 when successful', async () => {
    const { req, res } = mockNextApi({
      method: 'POST',
    });

    await logout(req, res);
    expect(res.statusCode).toBe(200);
  });
});
