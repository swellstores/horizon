import { mapProducts } from './../utils/products';
import getGQLClient from 'lib/graphql/client';
import type { MandatoryImageProps } from 'types/global';
import type {
  EditorArray,
  EditorCategoryList,
  EditorImage,
} from 'types/editor';
import type { CategoryPreviewCardProps } from 'components/atoms/CategoryPreviewCard';
import { denullifyArray } from 'lib/utils/denullify';
import type { Replace } from 'types/utils';
import type { FeatureProps } from 'components/atoms/Feature';
import {
  PanelImageProps,
  PanelProps,
  PanelTextProps,
  PANEL_TYPE,
} from 'components/atoms/Panel';
import type { ReviewCardProps } from 'components/molecules/ReviewCard';
import type { PurchasableProductData } from 'types/shared/products';
import type { MembershipCardProps } from 'components/atoms/MembershipCard';
import { generateId } from 'lib/utils/shared_functions';
import { parseTextWithVariables } from 'utils/text';

export const mapImage = (image: EditorImage): MandatoryImageProps => ({
  alt: '',
  height: image?.file?.height ?? 0,
  width: image?.file?.width ?? 0,
  src: image?.file?.url ?? '',
});

export const categories_preview_mapCategories = async (
  categories: EditorCategoryList,
): Promise<CategoryPreviewCardProps[]> => {
  const client = getGQLClient();

  const promises = categories.map((item) =>
    client
      .getCategoryPreviewData({ slug: item.category_id })
      .then((res) => res.data.categoryBySlug),
  );

  const categoryData = denullifyArray(await Promise.all(promises));

  const mappedCategories: CategoryPreviewCardProps[] = categoryData.map(
    (category) => ({
      href: `/categories/${category.slug}`,
      image: {
        src: category.images?.[0]?.file?.url ?? '',
        alt: category.images?.[0]?.caption ?? '',
        width: category.images?.[0]?.file?.width ?? 0,
        height: category.images?.[0]?.file?.height ?? 0,
      },
      title: category.name ?? '',
      description: category.description ?? '',
    }),
  );

  return mappedCategories;
};

export const multiple_features_mapFeatures = (
  features: Replace<FeatureProps, 'image', EditorImage>[] | null,
) => {
  if (!Array.isArray(features)) return [];

  return features.map((feature) => ({
    ...feature,
    image: mapImage(feature.image),
  }));
};

export const multiple_panels_mapPanels = (
  panels: EditorArray<
    | Replace<PanelImageProps, 'image', EditorImage>
    | Replace<PanelTextProps, 'background_image', EditorImage>
  >,
): EditorArray<PanelProps> => {
  if (!Array.isArray(panels)) return [];

  return panels.map((panel) => {
    if (panel.type === PANEL_TYPE.TEXT) {
      return {
        ...panel,
        background_image: mapImage(panel.background_image),
      };
    } else {
      return {
        ...panel,
        image: mapImage(panel.image),
      };
    }
  });
};

export const reviews_section_mapReviews = (
  reviews: EditorArray<
    Replace<ReviewCardProps, 'user_image', EditorImage | undefined>
  >,
): EditorArray<ReviewCardProps> => {
  if (!Array.isArray(reviews)) return [];

  return reviews.map((review) => {
    if (!review.user_image)
      return review as EditorArray<ReviewCardProps>[number];

    return {
      ...review,
      user_image: mapImage(review.user_image),
    };
  });
};

export const products_preview_mapItems = async (
  category_id: string,
): Promise<EditorArray<PurchasableProductData>> => {
  const client = getGQLClient();

  const {
    data: { categoryBySlug },
  } = await client.getCategory({ slug: category_id });

  return mapProducts(denullifyArray(categoryBySlug?.products));
};

export const memberships_mapMemberships = async (
  memberships: EditorArray<{ product_id?: string }>,
): Promise<EditorArray<MembershipCardProps>> => {
  const client = getGQLClient();

  const promises = memberships
    .filter((item) => !!item.product_id)
    .map((item) =>
      client
        .getProduct({ slug: item.product_id })
        .then((res) => res.data.productBySlug)
        .catch(() => null),
    );

  const productData = denullifyArray(await Promise.all(promises));

  const mappedProducts: EditorArray<MembershipCardProps> = productData.map(
    (product) => ({
      id: generateId(),
      title: product.name ?? '',
      description: product.description ?? '',
      image: {
        src: product.images?.[0]?.file?.url ?? '',
        alt: product.images?.[0]?.caption ?? '',
        width: product.images?.[0]?.file?.width ?? 0,
        height: product.images?.[0]?.file?.height ?? 0,
      },
      slug: product.slug ?? '',
      purchaseOptions: product.purchaseOptions ?? {},
      productId: product.id ?? '',
      viewPerksLabel: 'View details',
      hidePerksLabel: 'Hide details',
      ctaLabel: 'Get now',
      perks: [],
    }),
  );

  return mappedProducts;
};

export const quiz_multiple_panels_mapPanels = (
  panels: EditorArray<PanelImageProps | PanelTextProps>,
  quizVariables: Record<string, string>,
): EditorArray<PanelProps> => {
  if (!Array.isArray(panels)) return [];

  return panels.map((panel) => {
    if (panel.type === PANEL_TYPE.TEXT) {
      return {
        ...panel,
        title: panel?.title
          ? parseTextWithVariables(panel.title, quizVariables)
          : '',
      };
    }
    return panel;
  });
};
