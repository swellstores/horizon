import Image from 'components/atoms/SafeImage';
import Link from 'next/link';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Close from 'assets/icons/close.svg';
import type { MandatoryImageProps } from 'types/global';
import { PURCHASE_OPTION_TYPE } from 'types/shared/products';
import CounterInput from 'components/atoms/CounterInput';
import Price from 'components/atoms/Price';
import TrialLabel from 'components/atoms/TrialLabel';
import ScheduleLabel from 'components/atoms/ScheduleLabel';
import useCartStore from 'stores/cart';
import type {
  Maybe,
  SwellCartItemOption,
  SwellCartItemPurchaseOption,
  SwellProduct,
} from 'lib/graphql/generated/sdk';
import useClassNames from 'hooks/useClassNames';
import useProductStock from 'hooks/useProductStock';

export interface CartItemProps {
  id: string;
  image: MandatoryImageProps;
  title: string;
  price: number;
  quantity: number;
  minQuantity: number;
  purchaseOption: Maybe<SwellCartItemPurchaseOption>;
  href: string;
  productId: string;
  productOptions: Maybe<SwellCartItemOption>[];
  isMembership?: boolean;
  stockTracking?: SwellProduct['stockTracking'];
  stockPurchasable?: SwellProduct['stockPurchasable'];
  stockLevel?: SwellProduct['stockLevel'];
  variantName?: string;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  title,
  image,
  price,
  quantity,
  minQuantity = 1,
  purchaseOption,
  productOptions,
  href,
  isMembership,
  stockTracking,
  stockPurchasable,
  stockLevel,
}) => {
  const [removeItem, updateItem] = useCartStore((store) => [
    store.removeItem,
    store.updateItem,
  ]);

  const [, maxQuantity] = useProductStock({
    stockLevel,
    stockPurchasable,
    stockTracking,
  });

  const [quantityInputValue, setQuantityInputValue] = useState(quantity);
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | undefined>();

  useEffect(() => {
    // Ignore quantity changes if the user is changing the input value
    if (debounceTimeout.current) return;

    setQuantityInputValue(quantity);
  }, [quantity]);

  const hasTrial = useMemo(() => {
    const trialDays = purchaseOption?.billingSchedule?.trialDays;
    return trialDays && trialDays > 0;
  }, [purchaseOption?.billingSchedule?.trialDays]);

  const formatProductOptions = useCallback(() => {
    if (!productOptions?.length) return null;

    return productOptions.map((option) => {
      if (!option?.name || !option.value) return null;

      const { name, value } = option;

      return (
        <li
          className="overflow-hidden overflow-ellipsis text-2xs text-body"
          key={`${name}-${value}`}>
          {name}: {value}
        </li>
      );
    });
  }, [productOptions]);

  return (
    <li className="grid grid-cols-[3fr_7fr] gap-4 overflow-hidden border-t border-dividers py-6 first:pt-4">
      <Link href={href}>
        <a>
          <Image
            {...image}
            width={130}
            height={130}
            layout="fixed"
            className="rounded-xl object-cover"
            alt={image.alt}
          />
        </a>
      </Link>
      <div className="flex flex-col justify-between overflow-hidden">
        <div>
          <div className="flex justify-between">
            <Link href={href}>
              <a>
                <h5 className="font-headings text-sm font-semibold text-primary">
                  {title}
                </h5>
              </a>
            </Link>
            <button className="text-primary" onClick={() => removeItem(id)}>
              <Close className="mr-0.5 h-3 w-3" />
            </button>
          </div>
          <div className="mt-2">
            {purchaseOption?.type === PURCHASE_OPTION_TYPE.SUBSCRIPTION && (
              <>
                <ScheduleLabel
                  type="billing"
                  schedule={purchaseOption?.billingSchedule}
                  textClasses="text-2xs"
                  iconClasses="w-4"
                  icon
                />
                {purchaseOption?.orderSchedule && (
                  <ScheduleLabel
                    type="order"
                    schedule={purchaseOption?.orderSchedule}
                    className="mt-0.5"
                    textClasses="text-2xs"
                    iconClasses="w-4"
                    icon
                  />
                )}
              </>
            )}
            <ul
              className={useClassNames('flex flex-col text-2xs text-body', {
                'mt-0.5':
                  purchaseOption?.type === PURCHASE_OPTION_TYPE.SUBSCRIPTION,
              })}>
              {formatProductOptions()}
            </ul>
          </div>
        </div>
        <div className="mt-8 flex items-end justify-between">
          <span className="flex flex-col">
            {hasTrial ? (
              <>
                <span className="text-sm font-semibold text-primary">
                  <Price price={0} origPrice={price} />
                </span>
                <TrialLabel
                  trialDays={purchaseOption?.billingSchedule?.trialDays}
                  price={price}
                />
              </>
            ) : (
              <span className="text-sm font-semibold text-primary">
                <Price price={price} />
              </span>
            )}
          </span>
          {!isMembership && (
            <CounterInput
              value={quantityInputValue}
              min={minQuantity}
              max={maxQuantity}
              onChange={(value) => {
                // Debounce the update to avoid excessive requests
                if (debounceTimeout.current) {
                  clearTimeout(debounceTimeout.current);
                }

                debounceTimeout.current = setTimeout(() => {
                  updateItem(id, { quantity: value });
                }, 1000);

                setQuantityInputValue(value);
                if (isNaN(value) || value < minQuantity || value > maxQuantity)
                  return;
              }}
              onBlur={(value) => {
                if (debounceTimeout.current) {
                  clearTimeout(debounceTimeout.current);
                }

                updateItem(id, { quantity: value });
              }}
            />
          )}
        </div>
      </div>
    </li>
  );
};

export default CartItem;
