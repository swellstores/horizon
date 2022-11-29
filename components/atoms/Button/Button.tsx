import React from 'react';
import Link from 'next/link';
import useClassNames from 'hooks/useClassNames';
import { joinClasses } from 'utils/className';
import { BUTTON_STYLE, BUTTON_TYPE } from 'types/shared/button';

interface BaseProps {
  /**
   * Does the button have a border?
   */
  hasBorder?: boolean;
  /**
   * Does the button have shadow?
   */
  hasShadow?: boolean;
  /**
   * Should the small variation of the button be used?
   */
  small?: boolean;
  /**
   * Should the full width variation of the button be used?
   */
  fullWidth?: boolean;
  /**
   * Is the button disabled?
   */
  disabled?: boolean;

  /**
   * Does the button function as a link?
   */
  elType: BUTTON_TYPE;
  /**
   * The style of the button
   */
  buttonStyle?: BUTTON_STYLE;
}

type ButtonTypeProps = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    elType: BUTTON_TYPE.BUTTON;
  };

type LinkTypeProps = BaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    elType: BUTTON_TYPE.LINK;
    href: string;
  };

export type ButtonProps = ButtonTypeProps | LinkTypeProps;

/**
 * Primary UI component for user interaction
 */
const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      children,
      hasBorder = true,
      hasShadow = false,
      small = false,
      fullWidth = false,
      disabled = false,
      elType = BUTTON_TYPE.BUTTON,
      buttonStyle = BUTTON_STYLE.PRIMARY,
      ...props
    },
    ref,
  ) => {
    const classNames = useClassNames(
      'inline-block rounded-lg border text-md text-center font-bold uppercase all-ease-in-out-400',
      'disabled:pointer-events-none disabled:select-none',
      {
        [joinClasses(
          'text-button-secondary bg-button-primary',
          'hover:bg-button-secondary hover:text-button-primary',
          'active:bg-button-secondary active:text-button-secondary',
          'disabled:bg-disabled disabled:border-disabled',
        )]: buttonStyle === BUTTON_STYLE.PRIMARY,
        [joinClasses(
          'text-button-primary bg-button-secondary',
          'hover:bg-button-primary hover:text-button-secondary',
          'active:bg-button-secondary active:text-button-secondary',
          'disabled:bg-button-secondary disabled:border-disabled disabled:text-disabled',
        )]: buttonStyle === BUTTON_STYLE.SECONDARY,
        [joinClasses(
          'text-button-secondary bg-error-dark',
          'hover:bg-transparent hover:text-error-dark',
          'active:bg-error-light hover:text-error-dark',
          'disabled:bg-disabled disabled:border-disabled',
        )]: buttonStyle === BUTTON_STYLE.DANGER,
        'py-4 px-16': !small,
        'py-2 px-10': small,
        'py-4 px-2 w-full': fullWidth,
        'border-button-primary':
          hasBorder &&
          (buttonStyle === BUTTON_STYLE.PRIMARY ||
            buttonStyle === BUTTON_STYLE.SECONDARY),
        'border-error-dark': hasBorder && buttonStyle === BUTTON_STYLE.DANGER,
        'border-transparent': !hasBorder,
        'shadow-2xl': hasShadow,
      },
      props.className,
    );

    return elType === BUTTON_TYPE.LINK && !disabled ? (
      <Link href={(props as LinkTypeProps).href ?? ''}>
        <a
          {...(props as LinkTypeProps)}
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
          className={classNames}>
          {children}
        </a>
      </Link>
    ) : (
      <button
        {...(props as ButtonTypeProps)}
        className={classNames}
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        disabled={disabled}>
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
