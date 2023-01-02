import type { CookieSerializeOptions } from 'cookie';

export const isNextPublicSwellEditor =
  process.env.NEXT_PUBLIC_SWELL_EDITOR === 'true';

export const sendMessage = (msg: Record<string, unknown>) => {
  try {
    if (typeof window !== 'undefined' && window.parent) {
      const targetOrigin = '*';
      window.parent.postMessage(msg, targetOrigin);
    }
  } catch (err) {
    console.error(err);
  }
};

/**
 * An object containing options for serializing a cookie with `sameSite` and `secure` attributes.
 * If we're in editor mode, `sameSite` is set to 'none' and `secure` to true.
 */
export const sameSiteSettings: Pick<
  CookieSerializeOptions,
  'sameSite' | 'secure'
> = {
  sameSite: isNextPublicSwellEditor ? 'none' : 'strict',
  ...(isNextPublicSwellEditor ? { secure: true } : {}),
};
