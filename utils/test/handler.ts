import { graphql } from 'msw';

export enum GRAPHQL_OPERATION {
  QUERY = 'query',
  MUTATION = 'mutation',
}

/**
 * This helper initializes a graphQL handler with defaultData
 *
 * The default data can be overriden by calling it with `data` as argument,
 * optionally accompanied by `once` which indicates that the request should be overriden only once.
 */
export const graphQLHandler =
  (
    name: string,
    type: GRAPHQL_OPERATION,
    defaultData: Record<string, unknown>,
    sessionToken?: string,
  ) =>
  (data: typeof defaultData = defaultData, once?: boolean) =>
    graphql[type](name, (_, res, ctx) => {
      const resFunc = once ? res.once : res;
      return resFunc(
        ctx.data(data),
        ...(sessionToken ? [ctx.set('x-session', sessionToken)] : []),
      );
    });
