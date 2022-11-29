import { generateId } from 'lib/utils/shared_functions';
import type { SwellProductOption } from 'lib/graphql/generated/sdk';
import { denullifyArray } from 'lib/utils/denullify';
import { getFilters } from './filters';
import getGQLClient from 'lib/graphql/client';
import type { CategoryPreviewCardProps } from 'components/atoms/CategoryPreviewCard';
import type {
  ProductsLayoutProps,
  ProductsLayoutSettings,
  ProductsPerRow,
} from 'components/layouts/ProductsLayout';
import type {
  CategoryData,
  PurchasableProductData,
} from 'types/shared/products';
import type { ProductHeaderProps } from 'components/molecules/ProductHeader';
import { LAYOUT_ALIGNMENT, ProductsPageProps } from 'pages/products/[slug]';
import type { CurrencyPrice } from 'types/shared/currency';
import type { QuizResultsProducts } from 'components/molecules/QuizResults';
import { hasQuickAdd, mapProducts } from 'lib/utils/products';
import { formatStoreSettings } from 'utils/settings';
import { formatProductImages } from 'lib/utils/products';

const client = getGQLClient();

export const getCategories = async (currentSlug?: string) => {
  const { categories: categoriesResponse } = await client
    .getCategories()
    .then((response) => response.data);

  const categoriesList = denullifyArray(categoriesResponse?.results);

  const featuredCategoriesList = denullifyArray(
    categoriesList[0]?.content?.featuredCategories?.map(
      (featured) => featured?.category,
    ),
  );

  const featuredCategoriesData = featuredCategoriesList.map<
    (CategoryPreviewCardProps & { id: string }) | null
  >((featuredCategory) => {
    return {
      id: generateId(),
      href: `/categories/${featuredCategory.slug ?? ''}`,
      title: featuredCategory.name ?? '',
      image: {
        alt: featuredCategory.images?.[0]?.caption ?? '',
        src: featuredCategory.images?.[0]?.file?.url ?? '',
        height: featuredCategory.images?.[0]?.file?.height ?? 0,
        width: featuredCategory.images?.[0]?.file?.width ?? 0,
      },
      preserveScroll: true,
      scaleOnHover: true,
      isActive: currentSlug === featuredCategory?.slug,
    };
  });

  const categoriesData = categoriesList.map<CategoryData>((category) => {
    const categoryData = {
      slug: category?.slug ?? '',
      name: category?.name ?? '',
    };

    return categoryData;
  });

  const settings: ProductsLayoutSettings = {
    featuredCategories: denullifyArray(featuredCategoriesData),
    productsPerRow:
      (categoriesList[0]?.content?.productsPerRow as ProductsPerRow) ?? 3,
    enableQuickAdd: categoriesList[0]?.content?.enableQuickAdd ?? false,
    showFeaturedCategories:
      categoriesList[0]?.content?.showFeaturedCategories ?? false,
    showProductsDescription:
      categoriesList[0]?.content?.showProductsDescription ?? false,
    showProductsPrice: categoriesList[0]?.content?.showProductsPrice ?? false,
  };

  return {
    categories: categoriesData,
    settings,
  };
};

export const getProductsList = async (
  categorySlug?: string,
  currency?: string,
) => {
  // Get the products list
  const { products } = await client
    .getAllProducts({ currency })
    .then((response) => response.data);

  const productResults = denullifyArray(products?.results).filter((product) => {
    // If the category slug is defined, check if the product is in the category
    if (categorySlug) {
      return !!product.categories?.some(
        (category) => category?.slug === categorySlug,
      );
    }

    return true;
  });

  return productResults;
};

export const getProductListingData = async (
  categorySlug?: string,
): Promise<ProductsLayoutProps> => {
  // Get the products list
  const productsPromise = getProductsList(categorySlug);

  // Get featured categories
  const categoriesPromise = getCategories();

  const [{ categories, settings }, productResults] = await Promise.all([
    categoriesPromise,
    productsPromise,
  ]);

  const attributeFilters = getFilters(productResults);

  return {
    categories,
    settings,
    attributeFilters,
  };
};

export const fetchProductBySlug = async (slug: string) => ({
  ...((await client.getProduct({ slug }).then((response) => response.data))
    ?.productBySlug ?? {}),
  slug,
});

// Remove?
export const getAllProducts = async (): Promise<{
  products: PurchasableProductData[];
  count: number;
}> => {
  const { data: storeData } = await client.getStoreSettings();
  const currencies = storeData.storeSettings?.store?.currencies;

  const allPricesByProduct: Map<string, CurrencyPrice[]> = new Map();

  const currenciesPromises = currencies?.map((currency) => {
    if (currency?.code) {
      return client
        .getProductsPricesInCurrency({ currency: currency.code })
        .then((res) => {
          res.data.products?.results?.forEach((product) => {
            if (product?.id && product?.price && product?.currency) {
              const newPrices = allPricesByProduct.get(product.id) ?? [];
              newPrices.push({
                price: product.price,
                currency: product.currency,
              });
              allPricesByProduct.set(product.id, newPrices);
            }
          });
        });
    }
  });

  if (currenciesPromises?.length) {
    await Promise.all(currenciesPromises);
  }

  const response = await client.getAllProducts();
  const { products: productsResult } = response.data;

  const productsList = productsResult?.results ?? [];

  const products = mapProducts(denullifyArray(productsList));
  return {
    products: denullifyArray(products),
    count: productsResult?.count ?? 0,
  };
};

export async function getProductBySlug(
  slug: string,
  options?: { currency?: string; locale?: string },
): Promise<ProductsPageProps> {
  const { currency, locale } = options ?? {};
  const response = await client.getProduct({
    slug,
    currency,
    locale,
  });
  const { productBySlug: product } = response.data;

  const details: ProductHeaderProps = {
    title: product?.name ?? '',
    subtitle: product?.categories?.[0]?.name ?? '',
    description: product?.description ?? '',
  };

  const upSells: (PurchasableProductData | null)[] =
    product?.upSells?.map((upSell) =>
      upSell?.product
        ? {
            id: upSell?.product?.id ?? '',
            title: upSell?.product?.name ?? '',
            description: upSell?.product?.description ?? '',
            price: upSell?.product?.price ?? 0,
            origPrice: upSell?.product?.origPrice ?? null,
            href: `/products/${upSell?.product?.slug ?? ''}`,
            image: {
              alt: upSell?.product?.images?.[0]?.caption ?? '',
              src: upSell?.product?.images?.[0]?.file?.url ?? '',
              width: upSell?.product?.images?.[0]?.file?.width ?? 0,
              height: upSell?.product?.images?.[0]?.file?.height ?? 0,
            },
            productOptions: denullifyArray(upSell?.product?.options)?.map(
              (option: SwellProductOption) => {
                return {
                  id: option.id ?? '',
                  attributeId: option.attributeId ?? '',
                  name: option.name ?? '',
                  inputType: option.inputType ?? '',
                  active: option.active ?? true,
                  required: option.required ?? false,
                  values: denullifyArray(option.values)?.map((value) => {
                    return {
                      id: value.id ?? '',
                      name: value.name ?? '',
                      price: value.price ?? 0,
                    };
                  }),
                };
              },
            ),
            purchaseOptions: upSell?.product?.purchaseOptions ?? {},
            productVariants: denullifyArray(upSell?.product?.variants?.results),
            hasQuickAdd: hasQuickAdd(upSell.product),
          }
        : null,
    ) ?? [];

  return {
    slug,
    productId: product?.id ?? '',
    isGiftCard:
      product?.categories?.some(
        (category) => category?.slug === 'gifts-sets',
      ) ?? false,
    currency: product?.currency ?? 'USD',
    details,
    productBenefits: denullifyArray(
      product?.content?.productHighlights ?? [],
    ).map((benefit) => {
      return {
        id: benefit.id ?? '',
        icon: benefit.icon ?? '',
        label: benefit.label ?? '',
        customIcon: benefit.customIcon ?? {
          url: '',
          width: 0,
          height: 0,
        },
      };
    }),
    expandableDetails: denullifyArray(
      product?.content?.expandableDetails ?? [],
    ),
    images: formatProductImages(product?.images),
    productOptions: denullifyArray(product?.options)?.map(
      (option: SwellProductOption) => {
        return {
          id: option.id ?? '',
          attributeId: option.attributeId ?? '',
          name: option.name ?? '',
          description: option.description ?? '',
          inputType: option.inputType ?? '',
          active: option.active ?? true,
          required: option.required ?? false,
          parentId: option.parentId ?? null,
          parentValueIds: denullifyArray(option.parentValueIds),
          placeholder: option.inputHint ?? '',
          values: denullifyArray(option.values)?.map((value) => {
            return {
              id: value.id ?? '',
              name: value.name ?? '',
              price: value.price ?? 0,
            };
          }),
        };
      },
    ),
    purchaseOptions: product?.purchaseOptions ?? {},
    productVariants: denullifyArray(product?.variants?.results),
    upSells: denullifyArray(upSells),
    stockLevel: product?.stockLevel,
    stockPurchasable: product?.stockPurchasable,
    stockTracking: product?.stockTracking,
    meta: {
      title: product?.metaTitle ?? '',
      description: product?.metaDescription ?? '',
    },
    settings: {
      layoutOptions: (product?.content?.layoutOptions ??
        LAYOUT_ALIGNMENT.STANDARD) as LAYOUT_ALIGNMENT,
      calloutTitle: product?.content?.calloutTitle ?? null,
      calloutDescription: product?.content?.calloutDescription ?? null,
      showStockLevels: product?.content?.showStockLevels ?? true,
      enableProductCounter: product?.content?.enableProductCounter ?? true,
      lowStockIndicator: product?.content?.lowStockIndicator ?? null,
    },
  };
}

export async function getQuizProducts(
  productsSlugs: string[],
  currency?: string,
): Promise<{
  selection: QuizResultsProducts;
  currency: string;
}> {
  if (!productsSlugs.length) {
    return {
      selection: [],
      currency: currency ?? 'USD',
    };
  }

  // TODO: dictionary management & i18n
  const resultsDictionary = {
    hrefCta: 'See product details',
    addLabel: 'Add to Bag',
    addedLabel: 'Added',
  };

  const getProductsBySlugs = (slugs: string[]) =>
    slugs.map((slug) =>
      client
        .getProduct({ slug, currency })
        .then((response) => response.data.productBySlug),
    );

  const productsPromises = getProductsBySlugs(productsSlugs);

  const productsData = await Promise.all(productsPromises);

  const selection = denullifyArray(productsData).map((product) => ({
    productId: product.id ?? '',
    description: product.description ?? '',
    currency: product.currency ?? 'USD',
    href: `/products/${product.slug}`,
    image: {
      alt: product.images?.[0]?.caption ?? '',
      height: product.images?.[0]?.file?.height ?? 0,
      width: product.images?.[0]?.file?.width ?? 0,
      src: product.images?.[0]?.file?.url ?? '',
    },
    purchaseOptions: product.purchaseOptions ?? {},
    title: product.name ?? '',
    cross: product.crossSells,
    productOptions: denullifyArray(product?.options).map(
      (option: SwellProductOption) => {
        return {
          id: option.id ?? '',
          attributeId: option.attributeId ?? '',
          name: option.name ?? '',
          inputType: option.inputType ?? '',
          active: option.active ?? true,
          required: option.required ?? false,
          values: denullifyArray(option.values).map((value) => {
            return {
              id: value.id ?? '',
              name: value.name ?? '',
            };
          }),
        };
      },
    ),
    productVariants: denullifyArray(product?.variants?.results),
    ...resultsDictionary,
  }));

  return {
    selection: denullifyArray(selection),
    currency: currency ?? 'USD',
  };
}

export const getStoreSettings = async () => {
  const [storeData, menusData] = await Promise.all([
    client.getStoreSettings(),
    client.getMenus(),
  ]);

  return formatStoreSettings(
    storeData.data.storeSettings?.store?.name ?? 'Horizon',
    storeData.data.storeSettings?.values,
    menusData.data.menuSettings,
  );
};
