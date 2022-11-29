import cookie from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';
import { isSessionTokenValid } from 'lib/utils/authentication';
import getGQLClient, { getRawClient } from 'lib/graphql/client';
import type { ClientError } from 'graphql-request';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<undefined | string>,
) {
  const rawClient = getRawClient();
  const client = getGQLClient(rawClient);

  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const { email, password, firstName, lastName } = req.body;

  if (!email || !password || !firstName || !lastName || password.length < 6) {
    return res.status(400).end('Bad Request');
  }

  try {
    const response = await client.signup({
      email,
      password,
      firstName,
      lastName,
    });

    const { headers } = response;

    const sessionToken = headers.get('x-session');

    if (!sessionToken) {
      return res.status(401).send('Unauthorized');
    }

    if (!(await isSessionTokenValid(sessionToken, rawClient))) {
      return res.status(401).send('Unauthorized');
    }

    const ONE_WEEK = 60 * 60 * 24 * 7;

    res.setHeader(
      'Set-Cookie',
      cookie.serialize('sessionToken', sessionToken, {
        maxAge: ONE_WEEK,
        httpOnly: true,
        path: '/',
        sameSite: 'strict',
      }),
    );

    return res.status(200).send(undefined);
  } catch (error) {
    if ((error as ClientError)?.message?.includes('code: "UNIQUE"')) {
      return res.status(409).end('Email taken');
    }
    return res.status(500).end('Internal Server Error');
  }
}
