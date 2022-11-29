import { API_ROUTES } from 'types/shared/api';
import { setPreviewMode } from './previewMode';

describe('utils/previewMode', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
    global.fetch = jest.fn();
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it("should not set preview mode when it's already enabled", async () => {
    process.env.NEXT_PUBLIC_SWELL_EDITOR = 'true';
    const isPreviewModeActive = true;
    setPreviewMode(isPreviewModeActive);
    expect(fetch).not.toHaveBeenCalled();
  });

  it('should not set preview mode outside the editor', async () => {
    process.env.NEXT_PUBLIC_SWELL_EDITOR = 'anythingButTrue';
    const isPreviewModeActive = false;
    setPreviewMode(isPreviewModeActive);
    expect(fetch).not.toHaveBeenCalled();
  });

  it('should set preview mode when not active and is inside editor', async () => {
    process.env.NEXT_PUBLIC_SWELL_EDITOR = 'true';
    const isPreviewModeActive = false;
    setPreviewMode(isPreviewModeActive);
    expect(fetch).toHaveBeenCalledWith(API_ROUTES.PREVIEW);
  });
});
