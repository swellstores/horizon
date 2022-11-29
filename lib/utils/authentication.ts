import type { GraphQLClient } from 'graphql-request';
import getGQLClient from 'lib/graphql/client';

export const isSessionTokenValid = async (
  sessionToken: string,
  rawClient: GraphQLClient,
): Promise<boolean> => {
  rawClient.setHeader('X-Session', sessionToken);
  const client = getGQLClient(rawClient);
  const response = await client.checkTokenValidity();
  return !!response.data.session?.accountId;
};
