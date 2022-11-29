import { API_ROUTES } from 'types/shared/api';

/**  
  This function checks if the site should be loaded in Preview Mode,
  and if it should but wasn't, then it calls the preview route to make the switch.
*/
export const setPreviewMode = (isPreviewModeActive: boolean) => {
  if (process.env.NEXT_PUBLIC_SWELL_EDITOR !== 'true' || isPreviewModeActive) {
    return;
  }
  try {
    fetch(API_ROUTES.PREVIEW);
  } catch (e) {
    console.error(e);
  }
};
