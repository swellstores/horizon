import Image from 'components/atoms/SafeImage';
import useClassNames from 'hooks/useClassNames';
import React, { useMemo } from 'react';
import type { MandatoryImageProps } from 'types/global';
import { getLogoCssProperties } from 'utils/styles';

export interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  logo:
    | (MandatoryImageProps & {
        contentType: string;
      })
    | null;
  logoHeight: {
    mobile: number;
    desktop: number;
  } | null;
  storeName: string | null;
}

const Logo = React.forwardRef<HTMLDivElement, LogoProps>(
  ({ logo, logoHeight, storeName, className }, ref) => {
    const classNames = useClassNames('inline-flex', className);

    const logoCssProperties = useMemo(
      () => getLogoCssProperties(logo, logoHeight),
      [logo, logoHeight],
    );

    return (
      <div className={classNames} ref={ref}>
        {!!logo?.src && !!logoHeight ? (
          <span
            style={logoCssProperties as React.CSSProperties}
            className="h-[var(--logo-mobile-height)] w-[var(--logo-mobile-width)] lg:h-[var(--logo-desktop-height)] lg:w-[var(--logo-desktop-width)]">
            <Image
              alt="Logo"
              src={logo.src}
              layout="fill"
              height={logo.height}
              width={logo.width}
            />
          </span>
        ) : (
          <span className="text-3xl font-medium uppercase text-primary lg:text-5xl">
            {storeName}
          </span>
        )}
      </div>
    );
  },
);

Logo.displayName = 'Logo';

export default Logo;
