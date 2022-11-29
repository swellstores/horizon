import React, { useState } from 'react';
import { useRouter } from 'next/router';
import type { GetStaticPaths, GetStaticProps } from 'next';
import useProductSelection, { ACTIONS } from 'hooks/useProductSelection';
import useProductStock from 'hooks/useProductStock';
import useClassNames from 'hooks/useClassNames';
import ProductBenefits from 'components/molecules/ProductBenefits';
import PurchaseOptionsRadio from 'components/atoms/PurchaseOptionsRadio';
import SubscriptionOptions from 'components/molecules/SubscriptionOptions';
import CounterInput from 'components/atoms/CounterInput/CounterInput';
import Button from 'components/atoms/Button';
import Price from 'components/atoms/Price';
import UpSell from 'components/molecules/UpSell';
import ImageGallery from 'components/molecules/ImageGallery';
import InfoAccordion from 'components/molecules/InfoAccordion';
import ProductHeader, {
  ProductHeaderProps,
} from 'components/molecules/ProductHeader';
import getGQLClient from 'lib/graphql/client';
import { getProductBySlug } from 'lib/shop/fetchingFunctions';
import type { MandatoryImageProps } from 'types/global';
import { BUTTON_TYPE } from 'types/shared/button';
import {
  ProductOption,
  PurchasableProductData,
  PURCHASE_OPTION_TYPE,
  STOCK_STATUS,
} from 'types/shared/products';
import type {
  SwellProduct,
  SwellProductContentExpandableDetail,
  SwellProductPurchaseOptions,
  SwellProductVariant,
} from 'lib/graphql/generated/sdk';
import type { ProductBenefitProps } from 'components/atoms/ProductBenefit';
import useCurrencySubscription from 'hooks/useCurrencySubscription';
import Head from 'next/head';
import ProductOptions from 'components/organisms/ProductOptions';
import useCurrency from 'stores/currency';
import { withMainLayout } from 'lib/utils/fetch_decorators';
import type { ParsedUrlQuery } from 'querystring';
import StatusIndicator from 'components/atoms/StatusIndicator';
import { useEffect } from 'react';

export enum LAYOUT_ALIGNMENT {
  STANDARD = 'standard',
  LEFT_ALIGNED = 'left_aligned',
}

interface ProductSettings {
  calloutTitle: string | null;
  calloutDescription: string | null;
  showStockLevels: boolean;
  layoutOptions: LAYOUT_ALIGNMENT;
  enableProductCounter: boolean;
  lowStockIndicator: number | null;
}

export interface ProductsPageProps {
  slug: string;
  productId: string;
  isGiftCard: boolean;
  currency: string;
  images: MandatoryImageProps[];
  details: ProductHeaderProps;
  productOptions: ProductOption[];
  productBenefits: ProductBenefitProps[];
  expandableDetails: SwellProductContentExpandableDetail[];
  purchaseOptions: SwellProductPurchaseOptions;
  productVariants: SwellProductVariant[];
  upSells: PurchasableProductData[];
  stockLevel: SwellProduct['stockLevel'];
  stockPurchasable: SwellProduct['stockPurchasable'];
  stockTracking: SwellProduct['stockTracking'];
  settings: ProductSettings;
  meta: {
    title: string;
    description: string;
  };
}

export const getStaticPaths: GetStaticPaths = async ({
  locales,
  defaultLocale,
}) => {
  const client = getGQLClient();
  const response = await client.getProductSlugs();
  const { products: productsQueryResults } = response.data;

  const paths: { params: ParsedUrlQuery; locale?: string }[] = [];

  productsQueryResults?.results?.forEach((product) => {
    if (product?.slug) {
      const localesArray = locales?.length ? locales : [defaultLocale];
      localesArray?.forEach((locale) => {
        paths.push({ params: { slug: product.slug as string }, locale });
      });
    }
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

const propsCallback: GetStaticProps<ProductsPageProps> = async (context) => {
  if (!context.params?.slug || typeof context.params?.slug !== 'string') {
    return {
      notFound: true,
    };
  }

  /* TODO: When locale is implemented
     1. Get locale from context (i.e. en-US)
     2. Get default currency for that locale
     3. Get product data in the locale and its default currency
     4. If no locale or currency, pass null to get the default data
     5. If the user switches locale, redirect to the same page but in
     the new locale
     6. On load, and if the currency changes, the active page needs
     to fetch the page data on the new currency and overwrite the 
     previous data. Check that product.currency !== activeCurrency
     so we don't fetch in vain.
     7. If a currency was manually setup, use that in the future
     for every page. If not, just use the locale's default
     currency and change the activeCurrency but with userSelected: false.
     if activeCurrency has userSelected: true then it overrides.
  */

  // TODO: Mocked default currency, replace with actual one when implemented.
  const defaultCurrencyMap = new Map<string | undefined, string>();
  defaultCurrencyMap.set('en', 'USD');
  defaultCurrencyMap.set('es-ES', 'EUR');

  const { locale } = context;
  const currency = defaultCurrencyMap.get(locale) || 'USD';

  const productData = await getProductBySlug(context.params.slug, {
    currency,
    locale,
  });

  return {
    props: productData,
  };
};

export const getStaticProps = withMainLayout(propsCallback);

const ProductsPage: React.FC<ProductsPageProps> = ({
  slug,
  productId,
  isGiftCard,
  images,
  currency: currencyProp,
  details,
  productBenefits,
  expandableDetails,
  productOptions: productOptionsProp,
  purchaseOptions: purchaseOptionsProp,
  productVariants: productVariantsProp,
  upSells: upSellsProp,
  stockLevel,
  stockPurchasable,
  stockTracking,
  settings,
  meta,
}) => {
  const { locale } = useRouter();

  const [liveSettings, setLiveSettings] = useState(settings);

  const { productOptions, purchaseOptions, productVariants, upSells } =
    useCurrencySubscription({
      defaultData: {
        currency: currencyProp,
        productOptions: productOptionsProp,
        purchaseOptions: purchaseOptionsProp,
        productVariants: productVariantsProp,
        upSells: upSellsProp,
      },
      callback: (newCurrency) =>
        getProductBySlug(slug, { currency: newCurrency, locale }),
      currencyGetter: (data) => data.currency,
    });
  const formatPrice = useCurrency((store) => store.formatPrice);

  const { state, dispatch, activeVariation, addToCart } = useProductSelection({
    productId,
    productOptions,
    purchaseOptions,
    productVariants,
    isGiftCard,
    stockLevel,
  });

  const [stockStatus, maxQuantity] = useProductStock({
    stockTracking,
    stockLevel: activeVariation?.stockLevel,
    stockPurchasable,
    lowStockIndicator: liveSettings.lowStockIndicator,
    activeVariation,
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    addToCart();
  }

  const imageSectionClasses = useClassNames({
    'lg:order-1': liveSettings.layoutOptions === LAYOUT_ALIGNMENT.LEFT_ALIGNED,
  });

  // Set up message listeners to update the settings when the user changes them from the editor
  useEffect(() => {
    // Only enable the live updates if the editor variable is set to true
    if (process.env.NEXT_PUBLIC_SWELL_EDITOR !== 'true') return;

    let toCamelCase: (string?: string | undefined) => string | undefined;

    import('lodash.camelcase').then((pkg) => {
      toCamelCase = pkg.default;
    });

    const handler = async (event: MessageEvent) => {
      const { type, details } = event.data;

      if (
        type !== 'content.updated' ||
        details?.model !== 'products' ||
        !details.value
      )
        return;

      const camelCasedSettings = Object.entries(details.value).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [toCamelCase(key) ?? '']: value,
        }),
        {},
      );

      setLiveSettings(camelCasedSettings as ProductSettings);
    };

    window.addEventListener('message', handler);

    return () => {
      window.removeEventListener('message', handler);
    };
  }, []);

  return (
    <div>
      <Head>
        <title>{meta.title} - Horizon</title>
        <meta name="description" content={meta.description} />
      </Head>
      <article className="flex flex-col lg:grid lg:grid-cols-2">
        <section className={imageSectionClasses}>
          <div className="top-0 lg:sticky">
            <ImageGallery images={images} aspectRatio="8/9" />
          </div>
        </section>
        <aside className="mt-10 lg:px-14">
          <div className="px-6">
            <ProductHeader {...details} />
            {!!productBenefits.length && (
              <ProductBenefits benefits={productBenefits} className="mt-10" />
            )}
            {liveSettings.calloutTitle || liveSettings.calloutDescription ? (
              <div className="mt-10">
                <div className="rounded-md bg-background-secondary py-4 px-8 text-center text-primary">
                  {liveSettings.calloutTitle ? (
                    <p
                      className="text-lg font-semibold"
                      dangerouslySetInnerHTML={{
                        __html: liveSettings.calloutTitle,
                      }}
                    />
                  ) : null}
                  {liveSettings.calloutDescription ? (
                    <p
                      className="mt-2 text-2xs"
                      dangerouslySetInnerHTML={{
                        __html: liveSettings.calloutDescription,
                      }}
                    />
                  ) : null}
                </div>
              </div>
            ) : null}
            <form onSubmit={handleSubmit} className="flex flex-col">
              {!!productOptions.length && (
                <ProductOptions
                  options={productOptions}
                  selectedOptions={state.selectedProductOptions}
                  onChange={(payload) => dispatch(payload)}
                  isGiftCard={isGiftCard}
                  priceFormatter={formatPrice}
                />
              )}
              {liveSettings.showStockLevels && !!stockStatus ? (
                <div className="mt-8 self-start">
                  <StatusIndicator
                    status={stockStatus}
                    payload={activeVariation?.stockLevel?.toString()}
                  />
                </div>
              ) : (
                <div className="mt-4" />
              )}

              {purchaseOptions?.standard && purchaseOptions?.subscription && (
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
                  className="mt-4"
                />
              )}
              {state.selectedPurchaseOption ===
                PURCHASE_OPTION_TYPE.SUBSCRIPTION && (
                <SubscriptionOptions
                  plans={purchaseOptions.subscription?.plans}
                  value={state.selectedPlan}
                  onChange={(plan) =>
                    dispatch({
                      type: ACTIONS.SET_SELECTED_PLAN,
                      payload: plan,
                    })
                  }
                  className="mt-4"
                />
              )}
              <div className="mt-4 flex gap-2">
                {liveSettings.enableProductCounter && (
                  <CounterInput
                    value={state.quantity}
                    onChange={(quantity) =>
                      dispatch({
                        type: ACTIONS.SET_QUANTITY,
                        payload: quantity,
                      })
                    }
                    min={1}
                    max={maxQuantity}
                  />
                )}
                <Button
                  elType={BUTTON_TYPE.BUTTON}
                  fullWidth
                  type="submit"
                  disabled={stockStatus === STOCK_STATUS.OUT_OF_STOCK}>
                  {/* TODO: i18n */}
                  ADD TO BAG -{' '}
                  {state.selectedPurchaseOption ===
                  PURCHASE_OPTION_TYPE.SUBSCRIPTION ? (
                    <Price
                      price={activeVariation?.subscriptionPrice?.price ?? 0}
                      origPrice={activeVariation?.subscriptionPrice?.origPrice}
                    />
                  ) : (
                    <Price
                      price={activeVariation?.standardPrice?.price ?? 0}
                      origPrice={activeVariation?.standardPrice?.origPrice}
                    />
                  )}
                </Button>
              </div>
            </form>
            {!!expandableDetails.length && (
              <div className="flex w-full flex-col gap-2 py-8">
                {expandableDetails.map((detail) => (
                  <InfoAccordion
                    className="w-full"
                    key={detail.id}
                    content={detail.details ?? ''}
                    label={detail.label ?? ''}
                    accordionStyle="default"
                  />
                ))}
              </div>
            )}
          </div>
        </aside>
      </article>
      {!!upSells?.length && (
        <div className="py-10 lg:pl-14">
          <h4 className="py-6 pl-6 font-headings text-2xl font-semibold text-primary lg:pl-0">
            You may also like
          </h4>

          <UpSell items={upSells} />
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
