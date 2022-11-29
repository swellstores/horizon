import cookie from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getClientWithSessionToken } from 'lib/graphql/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<undefined | string>,
) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const client = getClientWithSessionToken(req.cookies);
    const {
      headers,
      data: { logoutAccount },
    } = await client.logout();

    const newSessionToken = headers.get('x-session');

    if (newSessionToken) {
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('sessionToken', newSessionToken, {
          maxAge: 60 * 60 * 24 * 7,
          httpOnly: true,
          path: '/',
          sameSite: 'strict',
        }),
      );
    }

    if (logoutAccount?.success) {
      return res.status(200).send(undefined);
    } else {
      return res.status(500).end('Internal Server Error');
    }
  } catch (error) {
    return res.status(500).end('Internal Server Error');
  }
}
