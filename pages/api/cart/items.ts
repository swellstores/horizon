import cookie from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getClientWithSessionToken } from 'lib/graphql/client';
import { denullifyArray } from 'lib/utils/denullify';
import { getCartItems } from 'lib/utils/cart';
import type { CartData } from 'types/shared/cart';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CartData>,
) {
  if (req.method && !['PUT', 'DELETE'].includes(req.method)) {
    return res.status(405).end('Method Not Allowed');
  }

  const client = getClientWithSessionToken(req.cookies);

  if (req.method === 'PUT') {
    const { itemId, input } = req.body;

    if (!itemId || !input) {
      return res.status(400).end('Bad Request');
    }

    const response = await client.updateCartItem({ input, itemId });
    const { updateCartItem: cart } = response.data;

    if (!cart) {
      return res.status(403).end('Invalid payload');
    }

    const sessionToken = response.headers.get('X-Session');
    if (sessionToken) {
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('sessionToken', sessionToken, {
          maxAge: 60 * 60 * 24 * 7,
          httpOnly: true,
          path: '/',
          sameSite: 'strict',
        }),
      );
    }

    const cartItems = denullifyArray(getCartItems(cart));

    return res.status(200).json({
      data: {
        total: cart.grandTotal ?? 0,
        items: cartItems,
        checkoutUrl: cart.checkoutUrl ?? '#',
      },
    });
  } else if (req.method === 'DELETE') {
    const { itemId } = req.body;

    if (!itemId) {
      return res.status(400).end('Bad Request');
    }

    const response = await client.deleteCartItem({ itemId });
    const { deleteCartItem: cart } = response.data;

    if (!cart) {
      return res.status(403).end('Invalid payload');
    }

    const sessionToken = response.headers.get('X-Session');
    if (sessionToken) {
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('sessionToken', sessionToken, {
          maxAge: 60 * 60 * 24 * 7,
          httpOnly: true,
          path: '/',
          sameSite: 'strict',
        }),
      );
    }

    const cartItems = denullifyArray(getCartItems(cart));

    return res.status(200).json({
      data: {
        total: cart.grandTotal ?? 0,
        items: cartItems,
        checkoutUrl: cart.checkoutUrl ?? '#',
      },
    });
  }
}
