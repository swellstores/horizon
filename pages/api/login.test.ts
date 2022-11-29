import { setupServer } from 'msw/node';
import { getIncompleteReq, mockNextApi } from 'utils/test/next-api';
import login from 'pages/api/login';
import { graphQLHandler, GRAPHQL_OPERATION } from 'utils/test/handler';

const defaultLoginData = {
  loginAccount: {
    __typename: 'test',
  },
};
const loginHandler = graphQLHandler(
  'login',
  GRAPHQL_OPERATION.MUTATION,
  defaultLoginData,
  'session-token',
);

const defaultCheckTokenValidityData = {
  session: {
    accountId: '123',
  },
};
const checkTokenValidityHandler = graphQLHandler(
  'checkTokenValidity',
  GRAPHQL_OPERATION.QUERY,
  defaultCheckTokenValidityData,
);

const handlers = [loginHandler(), checkTokenValidityHandler()];

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

describe('login api handler', () => {
  const defaultBody = {
    email: 'test@swell.is',
    password: 'password',
  };

  it('fails when using the wrong http method', async () => {
    const { req, res } = mockNextApi({ method: 'GET' });
    await login(req, res);
    expect(res.statusCode).toBe(405);
  });

  it('rejects when missing required data', async () => {
    Object.keys(defaultBody).forEach(async (field) => {
      const { req, res } = getIncompleteReq(
        { method: 'POST', body: defaultBody },
        field,
      );
      await login(req, res);
      expect(res.statusCode).toBe(400);
    });
  });

  it('returns 200 and a sessionToken cookie for valid requests', async () => {
    const { req, res } = mockNextApi({
      method: 'POST',
      body: defaultBody,
    });
    await login(req, res);
    expect(res.statusCode).toBe(200);
    expect(res.getHeader('Set-Cookie')).toBeTruthy();
  });
});
