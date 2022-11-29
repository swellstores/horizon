export enum PADDING {
  NONE = 'none',
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export enum SPACING {
  /** Amounts to 0rem (0px) */
  NONE = 'none',
  /** Amounts to 3.5rem (56px) */
  SMALL = 'small',
  /** Amounts to 9rem (144px) */
  MEDIUM = 'medium',
  /** Amounts to 11.5rem (184px) */
  LARGE = 'large',
  /** Amounts to 17.5rem (280px) */
  EXTRA_LARGE = 'extra_large',
}

export const SECTION_MARGIN_MAP = {
  [SPACING.NONE]: 'mx-0 lg:mx-0',
  [SPACING.SMALL]: 'mx-6 lg:mx-14',
  [SPACING.MEDIUM]: 'mx-6 lg:mx-36',
  [SPACING.LARGE]: 'mx-6 lg:mx-46',
  [SPACING.EXTRA_LARGE]: 'mx-6 lg:mx-70',
};

export const SECTION_PADDING_MAP = {
  [SPACING.NONE]: 'px-0 lg:px-0',
  [SPACING.SMALL]: 'px-6 lg:px-14',
  [SPACING.MEDIUM]: 'px-6 lg:px-36',
  [SPACING.LARGE]: 'px-6 lg:px-46',
  [SPACING.EXTRA_LARGE]: 'px-6 lg:px-70',
};

export const SECTION_VERTICAL_PADDING_MAP = {
  [SPACING.NONE]: 'py-0 lg:py-0',
  [SPACING.SMALL]: 'py-10 lg:py-10',
  [SPACING.MEDIUM]: 'py-20 lg:py-20',
  [SPACING.LARGE]: 'py-30 lg:py-30',
  [SPACING.EXTRA_LARGE]: 'py-40 lg:py-40',
};

export enum IMAGE_LAYOUT {
  PORTRAIT = 'portrait',
  SQUARE = 'square',
}
