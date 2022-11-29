import getGQLClient from 'lib/graphql/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<undefined | string>,
) {
  const client = getGQLClient();

  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).end('Bad Request');
  }

  try {
    const {
      data: { storeSettings },
    } = await client.getStoreUrl();

    if (!storeSettings?.store?.url) {
      return res.status(500).end('Internal Server Error');
    }

    const {
      data: { sendAccountRecovery },
    } = await client.sendResetPasswordMail({
      email,
      passwordResetUrl: `${storeSettings.store.url}/account/set-password`,
    });

    if (!sendAccountRecovery?.success) {
      return res.status(500).end('Internal Server Error');
    }

    return res.status(200).send(undefined);
  } catch (error) {
    return res.status(500).end('Internal Server Error');
  }
}
