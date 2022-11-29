import PerksAccordion from 'components/molecules/PerksAccordion';
import Image from 'components/atoms/SafeImage';
import React from 'react';
import type { MandatoryImageProps } from 'types/global';
import Button from 'components/atoms/Button';
import { BUTTON_TYPE } from 'types/shared/button';
import PerkItem from 'components/atoms/PerkItem';
import useClassNames from 'hooks/useClassNames';
import { layoutFillConfig } from 'lib/utils/image';
import useCartStore from 'stores/cart';
import type { SwellProductPurchaseOptions } from 'lib/graphql/generated/sdk';
import { getPluralizedInterval } from 'lib/utils/subscription';
import { INTERVAL, PURCHASE_OPTION_TYPE } from 'types/shared/products';
import useCurrencyStore from 'stores/currency';
import RichText from '../RichText';

export interface MembershipCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  slug: string;
  productId: string;
  purchaseOptions: SwellProductPurchaseOptions;
  image: MandatoryImageProps;
  title: string;
  description: string;
  perks?: string[];
  highlight?: string;
  ctaLabel: string;
  viewPerksLabel: string;
  hidePerksLabel: string;
}

const MembershipCard: React.FC<MembershipCardProps> = ({
  productId,
  purchaseOptions,
  image,
  title,
  description,
  perks,
  highlight,
  ctaLabel,
  viewPerksLabel,
  hidePerksLabel,
  ...props
}) => {
  const subscriptionPlan = purchaseOptions?.subscription?.plans?.[0];
  const intervalLabel = getPluralizedInterval(
    subscriptionPlan?.billingSchedule?.interval as INTERVAL,
    subscriptionPlan?.billingSchedule?.intervalCount as number,
  );

  const currencySymbol = useCurrencyStore((state) => state.currency.symbol);

  const [addToCart, showCart] = useCartStore((store) => [
    store.addToCart,
    store.showCart,
  ]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    addToCart({
      productId,
      quantity: 1,
      purchaseOption: {
        type: PURCHASE_OPTION_TYPE.SUBSCRIPTION,
        planId: subscriptionPlan?.id,
      },
    }).then(() => showCart());
  }

  const className = useClassNames(
    'flex max-w-[342px] flex-col rounded-2xl',
    'lg:max-w-[368px]',
    {
      'border-primary border-2 bg-primary': !!highlight,
      'bg-background-primary shadow-3xl': !highlight,
    },
    props.className,
  );

  return (
    <form className={className} onSubmit={handleSubmit}>
      {!!highlight && (
        <p className="w-full py-2 text-center text-sm font-semibold uppercase text-background-primary lg:text-md lg:tracking-wide">
          {highlight}
        </p>
      )}
      <div className="z-10 flex grow flex-col items-center rounded-2xl bg-background-primary px-6 pt-14 pb-6">
        <header className="mb-4 flex flex-col items-center lg:mb-6">
          <div className="relative mb-8 h-20 w-20 lg:h-[100px] lg:w-[100px]">
            <Image {...image} {...layoutFillConfig} alt={image.alt} />
          </div>
          <h3 className="mb-1 text-center font-headings text-xl font-semibold text-primary lg:text-2xl">
            <RichText content={title} />
          </h3>
          <p className="text-center text-sm font-medium text-body lg:font-normal">
            <RichText content={description} />
          </p>
        </header>
        <main className="flex w-full grow flex-col">
          {subscriptionPlan && (
            <p className="mb-4 flex w-full items-start justify-center gap-x-0.5 text-primary">
              <span className="text-2xl leading-[2.167]">{currencySymbol}</span>
              <span className="text-7xl leading-[1.65] tracking-wide">
                {subscriptionPlan.price}
              </span>
              <span className="mt-auto mb-4 text-sm">{`/ ${
                (subscriptionPlan.billingSchedule?.intervalCount ?? 1) > 1
                  ? `${subscriptionPlan.billingSchedule?.intervalCount} `
                  : ''
              }${intervalLabel}`}</span>
            </p>
          )}
          {perks && (
            <>
              <PerksAccordion
                containerClassName="lg:hidden px-6 mb-8 w-full"
                perks={perks}
                revealLabel={viewPerksLabel}
                hideLabel={hidePerksLabel}
              />
              <ul className="hidden lg:mb-8 lg:flex lg:flex-col lg:gap-y-2 lg:px-[34px]">
                {perks.map((perk) => (
                  <li key={perk}>
                    <PerkItem text={perk} />
                  </li>
                ))}
              </ul>
            </>
          )}
          <Button
            type="submit"
            elType={BUTTON_TYPE.BUTTON}
            fullWidth
            className="mt-auto">
            {ctaLabel}
          </Button>
        </main>
      </div>
    </form>
  );
};

export default MembershipCard;
