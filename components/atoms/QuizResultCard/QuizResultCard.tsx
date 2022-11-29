import React from 'react';
import Image from 'components/atoms/SafeImage';
import Link from 'next/link';
import ArrowRight from 'assets/icons/arrow-right.svg';
import RichText from 'components/atoms/RichText';
import Button from 'components/atoms/Button';
import Price from 'components/atoms/Price';
import PurchaseOptionsRadio from 'components/atoms/PurchaseOptionsRadio';
import SubscriptionOptions from 'components/molecules/SubscriptionOptions';
import CounterInput from 'components/atoms/CounterInput';
import useCurrency from 'stores/currency';
import useProductSelection, { ACTIONS } from 'hooks/useProductSelection';
import { BUTTON_TYPE } from 'types/shared/button';
import {
  ProductData,
  ProductOption,
  PURCHASE_OPTION_TYPE,
} from 'types/shared/products';
import type {
  SwellProductPurchaseOptions,
  SwellProductVariant,
} from 'lib/graphql/generated/sdk';
import ProductOptions from 'components/organisms/ProductOptions';

export type QuizResultCardProps = Omit<
  ProductData,
  'price' | 'originalPrice' | 'id'
> & {
  productId: string;
  productOptions: ProductOption[];
  productVariants: SwellProductVariant[];
  /**
   * Purchase options
   */
  purchaseOptions: SwellProductPurchaseOptions;
  /**
   * Text for cta link to product's page
   */
  hrefCta: string;
  /**
   * Text to display in case the product is subscription only
   */
  subscriptionOnlyText?: string;
  /**
   * Text for cta button to add to bundle
   */
  addLabel: string;
  /**
   * Text for cta button when product is already added to bundle
   */
  addedLabel: string;
  /**
   * All the currently selected products
   */
  selectedProducts: Map<string, number>;
};

const PRICE_SEPARATOR = 'or';

const QuizResultCard: React.FC<QuizResultCardProps> = ({
  image,
  title,
  description,
  href,
  hrefCta,
  addLabel,
  // addedLabel,
  subscriptionOnlyText,
  purchaseOptions,
  productId,
  productOptions,
  productVariants,
}) => {
  const { state, dispatch, activeVariation, addToCart } = useProductSelection({
    productId,
    productOptions,
    purchaseOptions,
    productVariants,
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    addToCart();
  }

  const formatPrice = useCurrency((state) => state.formatPrice);

  const hasMultiplePurchaseOptions =
    !!purchaseOptions?.standard && !!purchaseOptions?.subscription;

  const isSubscriptionOnly =
    !purchaseOptions?.standard && !!purchaseOptions?.subscription;

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-5xl rounded-2xl p-6 shadow-3xl lg:flex lg:gap-8 lg:p-9">
      <div className="relative hidden h-[484px] w-[348px] shrink-0 lg:block">
        <Image
          {...image}
          layout="fill"
          alt={image.alt}
          objectFit="cover"
          className="rounded-2xl"
        />
      </div>
      <div className="lg:flex lg:flex-col lg:justify-between">
        <div>
          <header className="flex gap-4 font-semibold">
            <div className="relative h-[74px] w-[74px] shrink-0 lg:hidden">
              <Image
                {...image}
                layout="fill"
                alt={image.alt}
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <div className="text-primary">
              <h4 className="font-headings text-lg lg:text-xl">{title}</h4>
              <p className="mt-1 text-sm">
                {activeVariation?.standardPrice?.price && (
                  <Price
                    price={activeVariation?.standardPrice?.price}
                    origPrice={activeVariation?.standardPrice?.origPrice}
                  />
                )}
                {hasMultiplePurchaseOptions ? ` ${PRICE_SEPARATOR} ` : ''}
                {activeVariation?.subscriptionPrice?.price && (
                  <Price
                    price={activeVariation?.subscriptionPrice?.price}
                    billingSchedule={state.selectedPlan?.billingSchedule}
                  />
                )}
              </p>
              {isSubscriptionOnly && subscriptionOnlyText && (
                <p className="mt-1 text-sm italic text-body">
                  {subscriptionOnlyText}
                </p>
              )}
              <div className="mt-4 text-sm">
                <Link href={href}>
                  <a className="flex items-center gap-x-[10px]">
                    <span>{hrefCta}</span>
                    <ArrowRight className="w-[13px]" />
                  </a>
                </Link>
              </div>
            </div>
          </header>
          <div className="mt-6">
            <RichText
              content={description}
              className="text-ellipsis text-sm text-body line-clamp-3"
            />
            {!!productOptions.length && (
              <div className="mt-6 flex flex-col gap-4">
                <ProductOptions
                  options={productOptions}
                  selectedOptions={state.selectedProductOptions}
                  onChange={(payload) => dispatch(payload)}
                  priceFormatter={formatPrice}
                />
              </div>
            )}
            {hasMultiplePurchaseOptions && (
              <PurchaseOptionsRadio
                standardPrice={activeVariation?.standardPrice}
                subscriptionPrice={activeVariation?.subscriptionPrice}
                value={state.selectedPurchaseOption}
                onChange={(purchaseOption) =>
                  dispatch({
                    type: ACTIONS.SET_SELECTED_PURCHASE_OPTION,
                    payload: purchaseOption,
                  })
                }
                className="mt-6"
              />
            )}
            {state.selectedPurchaseOption ===
              PURCHASE_OPTION_TYPE.SUBSCRIPTION && (
              <SubscriptionOptions
                plans={purchaseOptions?.subscription?.plans}
                value={state.selectedPlan}
                onChange={(plan) =>
                  dispatch({ type: ACTIONS.SET_SELECTED_PLAN, payload: plan })
                }
                className="z-10 mt-4"
              />
            )}
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <CounterInput
            value={state.quantity}
            onChange={(quantity) =>
              dispatch({ type: ACTIONS.SET_QUANTITY, payload: quantity })
            }
            min={1}
            max={99}
          />
          <Button
            className="path-fill-primary hover:path-fill-background-primary"
            fullWidth
            elType={BUTTON_TYPE.BUTTON}
            type="submit">
            {addLabel}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default QuizResultCard;
