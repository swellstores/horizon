import type { NextApiRequest, NextApiResponse } from 'next';
import getGQLClient from 'lib/graphql/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<undefined | string>,
) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const { password, key } = req.body;

  if (!password || !key) {
    return res.status(400).end('Bad Request');
  }

  try {
    const client = getGQLClient();
    const {
      data: { recoverAccount },
    } = await client.resetPassword({
      password,
      passwordResetKey: key,
    });

    if (!recoverAccount?.success) {
      return res.status(500).end('Internal Server Error');
    }

    return res.status(200).send(undefined);
  } catch (error) {
    return res.status(500).end('Internal Server Error');
  }
}
