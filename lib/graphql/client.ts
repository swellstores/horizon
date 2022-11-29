import { GraphQLClient } from 'graphql-request';
import { getSdk } from 'lib/graphql/generated/sdk'; // THIS FILE IS THE GENERATED FILE

const storeUrl = process.env.NEXT_PUBLIC_SWELL_STORE_URL;
const graphqlEndpoint = `${storeUrl}/graphql`;
const graphqlKey = process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY;

if (!storeUrl)
  throw new Error(
    `Missing NEXT_PUBLIC_SWELL_STORE_URL variable in the .env file`,
  );

if (!graphqlKey)
  throw new Error(
    'Missing NEXT_PUBLIC_SWELL_PUBLIC_KEY variable in the .env file',
  );

const endpoint = graphqlEndpoint;

const headers = {
  Authorization: graphqlKey,
  'Cache-Control': 'no-cache',
};

export const getRawClient = () =>
  new GraphQLClient(endpoint, {
    headers:
      // This needs to be destructured to avoid making changes to the original "headers" object that persist with new requests
      { ...headers },
  });

export const getClientWithSessionToken = (
  cookies: Record<string, string | undefined>,
) => {
  const sessionToken = cookies.sessionToken;
  const rawClient = getRawClient();
  if (sessionToken) {
    rawClient.setHeader('X-Session', sessionToken);
  }
  return getGQLClient(rawClient);
};

const getGQLClient = (rawClient?: GraphQLClient) =>
  getSdk(rawClient ?? getRawClient());

export default getGQLClient;
