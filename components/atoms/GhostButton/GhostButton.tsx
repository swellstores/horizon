import React from 'react';
import Link from 'next/link';
import useClassNames from 'hooks/useClassNames';
import { BUTTON_TYPE } from 'types/shared/button';

interface BaseProps {
  /**
   * Should the small variation of the button be used?
   */
  small?: boolean;
  /**
   * Is the button disabled?
   */
  disabled?: boolean;
  /**
   * Does the button function as a link?
   */
  elType: BUTTON_TYPE;
}

type GhostButtonTypeProps = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    elType: BUTTON_TYPE.BUTTON;
  };

type GhostLinkTypeProps = BaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    elType: BUTTON_TYPE.LINK;
    href: string;
  };

export type GhostButtonProps = GhostButtonTypeProps | GhostLinkTypeProps;

/**
 * Primary UI component for user interaction
 */
const GhostButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  GhostButtonProps
>(
  (
    {
      children,
      small = false,
      disabled = false,
      elType = BUTTON_TYPE.BUTTON,
      ...props
    },
    ref,
  ) => {
    const classNames = useClassNames(
      'text-primary flex items-center font-semibold',
      props.className,
      {
        'text-xs': small,
        'text-sm': !small,
      },
    );

    return elType === BUTTON_TYPE.LINK ? (
      <Link href={(props as GhostLinkTypeProps).href ?? ''}>
        <a
          {...(props as GhostLinkTypeProps)}
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
          className={classNames}>
          {children}
        </a>
      </Link>
    ) : (
      <button
        {...(props as GhostButtonTypeProps)}
        className={classNames}
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        disabled={disabled}>
        {children}
      </button>
    );
  },
);

GhostButton.displayName = 'GhostButton';

export default GhostButton;
