import {
  VERTICAL_ALIGNMENT,
  HORIZONTAL_ALIGNMENT,
  TEXT_ALIGNMENT,
  OBJECT_FIT,
} from 'types/shared/alignment';

export const BACKGROUND_POSITION_MAP = {
  [VERTICAL_ALIGNMENT.TOP]: {
    [HORIZONTAL_ALIGNMENT.LEFT]: 'object-[top_left]',
    [HORIZONTAL_ALIGNMENT.RIGHT]: 'object-[top_right]',
    [HORIZONTAL_ALIGNMENT.CENTER]: 'object-[top_center]',
  },
  [VERTICAL_ALIGNMENT.BOTTOM]: {
    [HORIZONTAL_ALIGNMENT.LEFT]: 'object-[bottom_left]',
    [HORIZONTAL_ALIGNMENT.CENTER]: 'object-[bottom_center]',
    [HORIZONTAL_ALIGNMENT.RIGHT]: 'object-[bottom_right]',
  },
  [VERTICAL_ALIGNMENT.CENTER]: {
    [HORIZONTAL_ALIGNMENT.LEFT]: 'object-[center_left]',
    [HORIZONTAL_ALIGNMENT.RIGHT]: 'object-[center_right]',
    [HORIZONTAL_ALIGNMENT.CENTER]: 'object-[center_center]',
  },
};

export const TEXT_ALIGNMENT_MAP = {
  [TEXT_ALIGNMENT.LEFT]: 'text-left',
  [TEXT_ALIGNMENT.CENTER]: 'text-center',
  [TEXT_ALIGNMENT.RIGHT]: 'text-right',
  [TEXT_ALIGNMENT.JUSTIFY]: 'text-justify',
};

// TODO: These bindings assume that the flex direction is not reversed,
// which is a safe assumption for now but we might need to revisit this.

export const JUSTIFY_CLASS_MAP = {
  [VERTICAL_ALIGNMENT.TOP]: 'justify-start',
  [HORIZONTAL_ALIGNMENT.LEFT]: 'justify-start',
  [HORIZONTAL_ALIGNMENT.RIGHT]: 'justify-end',
  [VERTICAL_ALIGNMENT.BOTTOM]: 'justify-end',
  [HORIZONTAL_ALIGNMENT.CENTER]: 'justify-center',
};

export const ALIGN_CLASS_MAP = {
  [VERTICAL_ALIGNMENT.TOP]: 'items-start',
  [HORIZONTAL_ALIGNMENT.LEFT]: 'items-start',
  [HORIZONTAL_ALIGNMENT.RIGHT]: 'items-end',
  [VERTICAL_ALIGNMENT.BOTTOM]: 'items-end',
  [HORIZONTAL_ALIGNMENT.CENTER]: 'items-center',
};

export const OBJECT_FIT_CLASS_MAP = {
  [OBJECT_FIT.CONTAIN]: 'object-contain',
  [OBJECT_FIT.COVER]: 'object-cover',
  [OBJECT_FIT.FILL]: 'object-fill',
};
