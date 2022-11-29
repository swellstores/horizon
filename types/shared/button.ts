export enum BUTTON_TYPE {
  BUTTON = 'button',
  LINK = 'link',
}

export enum BUTTON_STYLE {
  PRIMARY = 'button_primary',
  SECONDARY = 'button_secondary',
  ANCHOR = 'button_anchor',
  DANGER = 'danger',
}

/** Generic CTA Options */
export interface CTAOptions {
  label: string;
  link: string;
  style?: BUTTON_STYLE;
}
