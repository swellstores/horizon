import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const page = req.body.page;

  if (typeof page !== 'string') {
    return res.status(400).end('Bad Request');
  }
  res.revalidate(page);
}
