import type { NextApiRequest, NextApiResponse } from 'next';
import {
  Body,
  createMocks,
  MockRequest,
  MockResponse,
  RequestOptions,
} from 'node-mocks-http';

export const mockNextApi = (options?: RequestOptions) => {
  const {
    req,
    res,
  }: { req: MockRequest<NextApiRequest>; res: MockResponse<NextApiResponse> } =
    createMocks({ method: options?.method || 'GET', ...options });
  req.headers = {
    'Content-Type': 'application/json',
  };

  return { req, res };
};

/**
 * This function removes a specific field from the body of a request and returns a mock API object
 */
export const getIncompleteReq = (
  options: RequestOptions & { body: Body },
  missingField: string,
) => {
  const body = {
    ...options.body,
  };
  delete body[missingField];
  return mockNextApi({ ...options, body });
};
