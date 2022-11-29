import React from 'react';
import useCurrencyStore from 'stores/currency';
import Button from 'components/atoms/Button';
import Tag from 'components/atoms/Tag';

import { BUTTON_TYPE } from 'types/shared/button';
import useClassNames from 'hooks/useClassNames';
import { joinClasses } from 'utils/className';

export interface QuizCheckoutProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Title of the section
   */
  title: string;
  /**
   * Title of the section
   */
  description: string;
  subtotalText: string;
  subtotal: number;
  shippingText: string;
  shipping: string;
  checkoutLabel: string;
  paymentText: string;
  productsCount: number;
  productsLabel: string;
  showTag: boolean;
}

const QuizCheckout = React.forwardRef<HTMLDivElement, QuizCheckoutProps>(
  (
    {
      title,
      description,
      subtotalText,
      subtotal,
      shippingText,
      shipping,
      checkoutLabel,
      paymentText,
      productsCount,
      productsLabel,
      showTag = false,
      ...props
    },
    ref,
  ) => {
    const row = (texts: string[]) => (
      <p className="flex justify-between" key={texts.join()}>
        {texts.map((text) => (
          <span key={text}>{text}</span>
        ))}
      </p>
    );

    const formatPrice = useCurrencyStore((state) => state.formatPrice);
    const rows = [
      [subtotalText, formatPrice(subtotal)],
      [shippingText, shipping],
    ];

    const tagClasses = useClassNames(
      'transition-opacity duration-300',
      'lg:text-md',
      {
        'opacity-0': !showTag,
        'opacity-1': showTag,
      },
    );

    const headingClasses = useClassNames(
      'inline-flex w-full justify-between text-xl font-headings font-semibold text-primary',
      'lg:mb-4 lg:text-2xl',
      {
        'mb-6 items-center': showTag,
        'mb-[18px] items-start': !showTag,
      },
    );

    return (
      <aside
        className={joinClasses(
          'flex flex-col gap-y-8 bg-background-primary p-6',
          'lg:max-w-[528px] lg:gap-y-10 lg:bg-transparent lg:px-12 lg:py-0',
          props.className ?? '',
        )}
        ref={ref}>
        <header>
          <h3 className={headingClasses}>
            <span>{title}</span>
            <Tag className={tagClasses}>
              {productsCount} {productsLabel}
            </Tag>
          </h3>
          <p className="text-md text-body">{description}</p>
        </header>
        <div className="flex flex-col gap-y-6 text-lg font-semibold text-primary">
          {rows.map(row)}
        </div>
        <div className="flex flex-col gap-y-4">
          <Button
            fullWidth
            elType={BUTTON_TYPE.BUTTON}
            onClick={() => console.log('checkout')}>
            {checkoutLabel}
          </Button>
          <p className="px-8 text-center text-sm font-medium text-primary">
            {paymentText}
          </p>
        </div>
      </aside>
    );
  },
);

QuizCheckout.displayName = 'QuizCheckout';

export default QuizCheckout;
