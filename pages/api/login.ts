import cookie from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';
import { isSessionTokenValid } from 'lib/utils/authentication';
import getGQLClient, { getRawClient } from 'lib/graphql/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<undefined | string>,
) {
  const rawClient = getRawClient();
  const client = getGQLClient(rawClient);

  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).end('Bad Request');
  }

  try {
    const { headers } = await client.login({ email, password });

    const sessionToken = headers.get('x-session');

    if (!sessionToken) {
      return res.status(401).send('Unauthorized');
    }

    if (!(await isSessionTokenValid(sessionToken, rawClient))) {
      return res.status(401).send('Unauthorized');
    }

    res.setHeader(
      'Set-Cookie',
      cookie.serialize('sessionToken', sessionToken, {
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
        path: '/',
        sameSite: 'strict',
      }),
    );

    return res.status(200).send(undefined);
  } catch (error) {
    return res.status(500).end('Internal Server Error');
  }
}
