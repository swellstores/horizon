import { setupServer } from 'msw/node';
import { getIncompleteReq, mockNextApi } from 'utils/test/next-api';
import setPassword from 'pages/api/set-password';
import { graphQLHandler, GRAPHQL_OPERATION } from 'utils/test/handler';

const defaultResetAccountData = { recoverAccount: { success: true } };
const handler = graphQLHandler(
  'resetPassword',
  GRAPHQL_OPERATION.MUTATION,
  defaultResetAccountData,
);

const server = setupServer(handler());

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

describe('set-password api handler', () => {
  const defaultBody = {
    password: 'password',
    key: 'test',
  };

  it('fails when using the wrong http method', async () => {
    const { req, res } = mockNextApi({ method: 'GET' });

    await setPassword(req, res);
    expect(res.statusCode).toBe(405);
  });

  it('rejects when missing required data', async () => {
    Object.keys(defaultBody).forEach(async (field) => {
      const { req, res } = getIncompleteReq(
        { method: 'POST', body: defaultBody },
        field,
      );
      await setPassword(req, res);
      expect(res.statusCode).toBe(400);
    });
  });

  it('rejects when reset password call is unsuccessful', async () => {
    const { req, res } = mockNextApi({
      method: 'POST',
      body: defaultBody,
    });

    server.use(handler({ recoverAccount: { success: false } }, true));

    await setPassword(req, res);
    expect(res.statusCode).toBe(500);
  });

  it('returns 200 for valid requests', async () => {
    const { req, res } = mockNextApi({
      method: 'POST',
      body: defaultBody,
    });

    await setPassword(req, res);
    expect(res.statusCode).toBe(200);
  });
});
