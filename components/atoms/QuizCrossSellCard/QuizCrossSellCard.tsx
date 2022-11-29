import React, { useMemo } from 'react';
import Image from 'components/atoms/SafeImage';
import Link from 'next/link';
import RichText from 'components/atoms/RichText';
import Button from 'components/atoms/Button';
import Price from 'components/atoms/Price';
import ArrowRight from 'assets/icons/arrow-right.svg';

import type { ProductData } from 'types/shared/products';
import { BUTTON_STYLE, BUTTON_TYPE } from 'types/shared/button';
import type { SwellProductPurchaseOptions } from 'lib/graphql/generated/sdk';
import useCartStore from 'stores/cart';
import { layoutFillConfig } from 'lib/utils/image';

export type QuizCrossSellCardProps = React.HTMLAttributes<HTMLDivElement> &
  Omit<ProductData, 'price' | 'originalPrice'> & {
    productId: string;
    /**
     * Purchase options
     */
    purchaseOptions: SwellProductPurchaseOptions;
    /**
     * Short description
     */
    catchphrase: string;
    /**
     * Text for cta link to product's page
     */
    hrefCta: string;
    /**
     * Text for cta button to add to cart
     */
    addToCartCta: string;
  };

const QuizCrossSellCard: React.FC<QuizCrossSellCardProps> = ({
  productId,
  purchaseOptions,
  image,
  title,
  description,
  catchphrase,
  href,
  hrefCta,
  addToCartCta,
  ...props
}) => {
  const addToCart = useCartStore((store) => store.addToCart);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    addToCart({
      productId,
      quantity: 1,
    });
  }

  const priceData = useMemo(
    () => purchaseOptions?.standard,
    [purchaseOptions?.standard],
  );

  return (
    <article className={['lg:max-w-[556px]', props.className ?? ''].join(' ')}>
      <form
        className="grid h-full grid-cols-[89px_auto] grid-rows-[89px_63px_56px] gap-x-4 gap-y-6 rounded-2xl bg-background-primary p-6 shadow-3xl lg:grid-cols-[200px_auto] lg:grid-rows-[auto_68px_auto_56px] lg:gap-x-6 lg:gap-y-0"
        onSubmit={handleSubmit}>
        <Link href={href}>
          <a className="relative col-span-1 row-span-1 lg:row-span-4">
            <Image
              {...image}
              {...layoutFillConfig}
              alt={image.alt}
              className="rounded-xl object-cover object-center lg:rounded-2xl"
            />
          </a>
        </Link>
        <header className="col-span-1 row-span-1 flex flex-col font-semibold lg:mb-[6px]">
          <Link href={href}>
            <a>
              <h4 className="mb-1 font-headings text-lg text-primary lg:mb-2 lg:text-xl">
                {title}
              </h4>
            </a>
          </Link>
          <p className="text-sm text-body lg:text-md">{catchphrase}</p>
          <div className="mt-auto text-sm tracking-wide text-primary lg:hidden">
            <Link href={href}>
              <a className="flex items-center gap-x-2">
                <span>{hrefCta}</span>
                <ArrowRight className="w-[13.33px]" />
              </a>
            </Link>
          </div>
        </header>
        <RichText
          content={description}
          className="col-span-2 text-2xs text-body line-clamp-3 lg:col-[2/3] lg:line-clamp-4"
        />
        <div className="hidden text-sm font-semibold tracking-wide text-primary lg:col-[2/3] lg:my-[19px] lg:block">
          <Link href={href}>
            <a className="flex h-fit items-center gap-x-2">
              <span>{hrefCta}</span>
              <ArrowRight className="w-[13.33px]" />
            </a>
          </Link>
        </div>
        <Button
          className="col-span-2 align-middle lg:col-[2/3]"
          buttonStyle={BUTTON_STYLE.SECONDARY}
          elType={BUTTON_TYPE.BUTTON}
          type="submit"
          fullWidth>
          <Price
            price={priceData?.price ?? 0}
            origPrice={priceData?.origPrice}
          />
          │ {addToCartCta}
        </Button>
      </form>
    </article>
  );
};

export default QuizCrossSellCard;
