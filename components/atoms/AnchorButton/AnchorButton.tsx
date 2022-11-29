import React from 'react';
import Link from 'next/link';
import { BUTTON_TYPE } from 'types/shared/button';

type BaseProps = {
  /**
   * The anchor button's label
   */
  label: string;
  /**
   * Is the button disabled?
   */
  disabled?: boolean;
};

type ButtonProps = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    elType: BUTTON_TYPE.BUTTON;
  };

type LinkProps = BaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    elType: BUTTON_TYPE.LINK;
    href: string;
  };

export type AnchorButtonProps = ButtonProps | LinkProps;

const AnchorButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  AnchorButtonProps
>(({ label, disabled = false, elType = BUTTON_TYPE.BUTTON, ...props }, ref) => {
  const classNames = `inline-block border-b-4 border-button-primary pb-2 text-md font-semibold uppercase text-button-primary hover:border-body hover:text-body disabled:pointer-events-none disabled:select-none disabled:border-disabled disabled:text-disabled all-ease-in-out-400 
    ${props.className ?? ''}`;

  return elType === BUTTON_TYPE.LINK ? (
    <Link href={(props as LinkProps).href ?? ''}>
      <a
        {...(props as LinkProps)}
        ref={ref as React.ForwardedRef<HTMLAnchorElement>}
        className={classNames}
        dangerouslySetInnerHTML={{ __html: label }}></a>
    </Link>
  ) : (
    <button
      {...(props as ButtonProps)}
      ref={ref as React.ForwardedRef<HTMLButtonElement>}
      className={classNames}
      disabled={disabled}
      dangerouslySetInnerHTML={{ __html: label }}></button>
  );
});

AnchorButton.displayName = 'AnchorButton';

export default AnchorButton;
