import { setupServer } from 'msw/node';
import { mockNextApi } from 'utils/test/next-api';
import passwordRecovery from 'pages/api/password-recovery';
import { graphQLHandler, GRAPHQL_OPERATION } from 'utils/test/handler';

const defaultStoreSettingsData = {
  storeSettings: { store: { url: 'https://test.swell.store' } },
};
const storeSettingsHandler = graphQLHandler(
  'getStoreUrl',
  GRAPHQL_OPERATION.QUERY,
  defaultStoreSettingsData,
);

const defaultAccountRecoveryData = { sendAccountRecovery: { success: true } };
const accountRecoveryHandler = graphQLHandler(
  'sendResetPasswordMail',
  GRAPHQL_OPERATION.MUTATION,
  defaultAccountRecoveryData,
);

const handlers = [storeSettingsHandler(), accountRecoveryHandler()];

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

describe('password-recovery api handler', () => {
  const defaultBody = {
    email: 'test@swell.is',
  };

  it('fails when using the wrong http method', async () => {
    const { req, res } = mockNextApi({ method: 'GET' });

    await passwordRecovery(req, res);
    expect(res.statusCode).toBe(405);
  });

  it('rejects when missing email in body data', async () => {
    const { req, res } = mockNextApi({ method: 'POST', body: {} });

    await passwordRecovery(req, res);
    expect(res.statusCode).toBe(400);
  });

  it('rejects when url is missing in store settings', async () => {
    const { req, res } = mockNextApi({
      method: 'POST',
      body: defaultBody,
    });

    server.use(
      storeSettingsHandler(
        { storeSettingsHandler: { store: { url: null } } },
        true,
      ),
    );

    await passwordRecovery(req, res);
    expect(res.statusCode).toBe(500);
  });

  it('rejects when sending account recovery email is unsuccessful', async () => {
    const { req, res } = mockNextApi({
      method: 'POST',
      body: defaultBody,
    });

    server.use(
      accountRecoveryHandler({ sendAccountRecovery: { success: false } }, true),
    );

    await passwordRecovery(req, res);
    expect(res.statusCode).toBe(500);
  });

  it('returns 200 for valid requests', async () => {
    const { req, res } = mockNextApi({
      method: 'POST',
      body: defaultBody,
    });

    await passwordRecovery(req, res);
    expect(res.statusCode).toBe(200);
  });
});
