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
