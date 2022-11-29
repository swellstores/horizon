import Button from 'components/atoms/Button';
import Tag from 'components/atoms/Tag';
import { layoutFillConfig } from 'lib/utils/image';
import Image from 'components/atoms/SafeImage';
import Link from 'next/link';
import React from 'react';
import useCurrencyStore from 'stores/currency';
import { BUTTON_STYLE, BUTTON_TYPE } from 'types/shared/button';
import type { ProductData } from 'types/shared/products';

export interface CrossSellProps {
  item: Omit<ProductData, 'description'>;
  buttonText?: {
    desktop: string;
    mobile: string;
  };
  showPrices?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

const CrossSell: React.FC<CrossSellProps> = ({
  item,
  buttonText = { desktop: 'Add to bag', mobile: 'Add' },
  showPrices = true,
  disabled,
  onClick,
  className,
}) => {
  const formatPrice = useCurrencyStore((state) => state.formatPrice);
  const { price, originalPrice } = item;

  let tag: string | undefined;

  if (price && originalPrice && originalPrice > price) {
    // TODO: i18n
    tag = `Save ${formatPrice(originalPrice - price)}`;
  }

  return (
    <div
      className={[
        'flex flex-col gap-6 lg:grid lg:grid-cols-[1fr_2fr]',
        className,
      ].join(' ')}>
      <Link href={item.href}>
        <a className="safe-aspect-square relative lg:min-w-[10rem]">
          <Image
            {...item.image}
            {...layoutFillConfig}
            className={['rounded-xl object-cover', item.image.className].join(
              ' ',
            )}
            alt={item.image.alt}
          />
          {tag && <Tag className="absolute right-0 top-0">{tag}</Tag>}
        </a>
      </Link>
      <div className="flex h-full flex-col gap-4 lg:gap-6">
        <Link href={item.href}>
          <a className="text-md font-semibold uppercase text-primary">
            {item.title}
          </a>
        </Link>
        <Button
          elType={BUTTON_TYPE.BUTTON}
          buttonStyle={BUTTON_STYLE.SECONDARY}
          fullWidth
          disabled={disabled}
          className="mt-auto uppercase lg:mt-0"
          onClick={onClick}>
          <span className="lg:hidden">{buttonText.mobile}</span>
          <span className="hidden lg:inline">{buttonText.desktop}</span>
          {showPrices && (
            <span>
              {' '}
              - {formatPrice(item.price ?? 0)}
              {item.originalPrice && (
                <span className="ml-3 font-normal line-through lg:ml-4">
                  {formatPrice(item.originalPrice)}
                </span>
              )}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default CrossSell;
