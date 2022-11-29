import { setupServer } from 'msw/node';
import { getIncompleteReq, mockNextApi } from 'utils/test/next-api';
import signup from 'pages/api/sign-up';
import { graphQLHandler, GRAPHQL_OPERATION } from 'utils/test/handler';

const defaultSignupData = {
  signup: {
    email: 'test@swell.is',
  },
};
const signupHandler = graphQLHandler(
  'signup',
  GRAPHQL_OPERATION.MUTATION,
  defaultSignupData,
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

const handlers = [signupHandler(), checkTokenValidityHandler()];

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

describe('signup api handler', () => {
  const defaultBody = {
    email: 'test@swell.is',
    password: 'password',
    firstName: 'John',
    lastName: 'Doe',
  };

  it('fails when using the wrong http method', async () => {
    const { req, res } = mockNextApi({ method: 'GET' });
    await signup(req, res);
    expect(res.statusCode).toBe(405);
  });

  it('rejects when missing required data', async () => {
    Object.keys(defaultBody).forEach(async (field) => {
      const { req, res } = getIncompleteReq(
        { method: 'POST', body: defaultBody },
        field,
      );
      await signup(req, res);
      expect(res.statusCode).toBe(400);
    });
  });

  it('rejects on short password', async () => {
    const { req, res } = mockNextApi({
      method: 'POST',
      body: {
        ...defaultBody,
        password: 'short',
      },
    });
    await signup(req, res);
    expect(res.statusCode).toBe(400);
  });

  it('returns 200 and a sessionToken cookie for valid requests', async () => {
    const { req, res } = mockNextApi({
      method: 'POST',
      body: defaultBody,
    });
    await signup(req, res);
    expect(res.statusCode).toBe(200);
    expect(res.getHeader('Set-Cookie')).toBeTruthy();
  });
});
