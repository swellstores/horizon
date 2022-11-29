import useClassNames from 'hooks/useClassNames';
import React from 'react';
import { TEXT_ALIGNMENT } from 'types/shared/alignment';

export enum BANNER_INFO_STYLE {
  INFO = 'info',
  ERROR = 'error',
  SUCCESS = 'success',
  WARNING = 'warning',
}

export interface BannerInfoProps {
  bannerStyle?: BANNER_INFO_STYLE;
  textAlignment?: TEXT_ALIGNMENT;
  className?: string;
}

const BannerInfo: React.FC<BannerInfoProps> = ({
  children,
  bannerStyle = BANNER_INFO_STYLE.INFO,
  textAlignment = TEXT_ALIGNMENT.LEFT,
  className,
}) => (
  <div
    className={useClassNames(
      'rounded-lg px-4 py-2.5 text-xs',
      {
        'bg-background-secondary text-body':
          bannerStyle === BANNER_INFO_STYLE.INFO,
        'bg-error-light text-error-dark':
          bannerStyle === BANNER_INFO_STYLE.ERROR,
        'bg-success-light text-success-dark':
          bannerStyle === BANNER_INFO_STYLE.SUCCESS,
        'bg-warning-light text-warning-dark':
          bannerStyle === BANNER_INFO_STYLE.WARNING,
        'text-center': textAlignment === TEXT_ALIGNMENT.CENTER,
        'text-right': textAlignment === TEXT_ALIGNMENT.RIGHT,
        'text-left': textAlignment === TEXT_ALIGNMENT.LEFT,
        'text-justify': textAlignment === TEXT_ALIGNMENT.JUSTIFY,
      },
      className,
    )}>
    {children}
  </div>
);

export default BannerInfo;
