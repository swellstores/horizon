import React from 'react';

export enum DIVIDER_HEIGHT {
  EXTRA_SMALL = 'extra_small',
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  EXTRA_LARGE = 'extra_large',
}

export const DIVIDER_HEIGHT_PADDING_MAP = {
  [DIVIDER_HEIGHT.EXTRA_SMALL]: 'py-5 lg:py-5',
  [DIVIDER_HEIGHT.SMALL]: 'py-10 lg:py-10',
  [DIVIDER_HEIGHT.MEDIUM]: 'py-20 lg:py-20',
  [DIVIDER_HEIGHT.LARGE]: 'py-30 lg:py-30',
  [DIVIDER_HEIGHT.EXTRA_LARGE]: 'py-40 lg:py-40',
};

export interface DividerProps {
  vertical_spacing?: DIVIDER_HEIGHT;
  background_color?: string;
}

const Divider: React.FC<DividerProps> = ({
  vertical_spacing = DIVIDER_HEIGHT.SMALL,
  background_color,
}) => (
  <hr
    style={{ backgroundColor: background_color }}
    className={`border-transparent ${DIVIDER_HEIGHT_PADDING_MAP[vertical_spacing]}`}
  />
);

export default Divider;
