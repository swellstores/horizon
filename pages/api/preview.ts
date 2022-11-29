import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (process.env.NEXT_PUBLIC_SWELL_EDITOR !== 'true') {
    res.status(405).end('Not allowed');
  } else {
    res.setPreviewData(
      {},
      {
        maxAge: 60 * 60 * 24 * 30, // 30 days
      },
    );
    res.redirect('/');
  }
}
