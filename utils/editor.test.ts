import { sendMessage } from './editor';
import { enableEditor } from './test/editor';

const spyWindowParent = jest.spyOn(window.parent, 'postMessage');

describe('editor utils', () => {
  describe('#sendMessage', () => {
    it('sends the message to the parent window', () => {
      sendMessage({ test: 'something' });

      expect(spyWindowParent).toHaveBeenCalledWith({ test: 'something' }, '*');
    });
  });

  describe('#sameSiteSettings', () => {
    it('returns object with sameSite: strict when not in editor mode', async () => {
      process.env.NEXT_PUBLIC_SWELL_EDITOR = 'false';
      const { sameSiteSettings } = await import('./editor');

      expect(sameSiteSettings).toStrictEqual({
        sameSite: 'strict',
      });
    });

    enableEditor();
    it('returns object with sameSite: none, secure: true when in editor mode', async () => {
      const { sameSiteSettings } = await import('./editor');

      expect(sameSiteSettings).toStrictEqual({
        sameSite: 'none',
        secure: true,
      });
    });
  });
});
