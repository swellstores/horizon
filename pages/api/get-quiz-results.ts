import getGQLClient from 'lib/graphql/client';
import type { SwellCategory } from 'lib/graphql/generated/sdk';
import { denullifyArray } from 'lib/utils/denullify';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Ranking, ResultsAnswer } from 'types/shared/quiz';

// These constants are product requirements for the quiz results calculation logic

// Number of categories scores that can make it into the 'from category to products' points distribution
const VALID_CATEGORY_COUNT = 3;
// Number of already ranked products scores that are valid for 'from category to products' points distribution
const VALID_ALREADY_RANKED_COUNT = 2;
// Number of products that make it into the final ranking.
const VALID_FINAL_RANKING_COUNT = 3;

const PRODUCT_MODEL = 'products';
const CATEGORY_MODEL = 'categories';

export const addInitialPoints = (
  answers: Array<ResultsAnswer>,
  productRanking: Ranking,
  categoryRanking: Ranking,
) => {
  answers.forEach((answer) => {
    answer.selection.forEach((selection) => {
      selection.productSelection.forEach((item) => {
        if (item.model === PRODUCT_MODEL) {
          productRanking[item.slug] = productRanking[item.slug]
            ? productRanking[item.slug] + selection.points
            : selection.points;
        } else if (item.model === CATEGORY_MODEL) {
          categoryRanking[item.slug] = categoryRanking[item.slug]
            ? categoryRanking[item.slug] + selection.points
            : selection.points;
        }
      });
    });
  });
};

export const cleanupCategoryRanking = (
  categoryRanking: Ranking,
  validCategoryCount: number,
) => {
  const categoryPointsVariations = [
    ...new Set(Object.values(categoryRanking).sort()),
  ];

  if (categoryPointsVariations.length > validCategoryCount) {
    const lowestValidPoints =
      categoryPointsVariations[
        categoryPointsVariations.length - validCategoryCount
      ];

    Object.keys(categoryRanking).forEach((key) => {
      if (categoryRanking[key] < lowestValidPoints) {
        delete categoryRanking[key];
      }
    });
  }
};

export const addCategoryPointsToProducts = async (
  categoryRanking: Ranking,
  productRanking: Ranking,
  categories: (SwellCategory | undefined | null)[],
) => {
  // <---Start 'from category to products' points distribution--->
  // We need to distribute categories' points to the products
  // if the products within those categories are already ranked
  // in the initial points distribution
  if (categories?.length > 0) {
    categories.forEach((category) => {
      if (denullifyArray(category?.products).length === 0 || !category?.slug) {
        return;
      }

      const alreadyRankedProducts = Object.keys(productRanking).filter(
        (productSlug) =>
          category?.products?.some((product) => product?.slug === productSlug),
      );

      if (alreadyRankedProducts.length > 0) {
        const productPointsVariations = [
          ...new Set(
            alreadyRankedProducts.map((id) => productRanking[id]).sort(),
          ),
        ];

        if (productPointsVariations.length > VALID_ALREADY_RANKED_COUNT) {
          const lowestValidPoints = productPointsVariations.slice(
            productPointsVariations.length - VALID_CATEGORY_COUNT - 1,
            productPointsVariations.length - 1,
          )[0];

          alreadyRankedProducts.forEach((productId) => {
            if (productRanking[productId] >= lowestValidPoints) {
              productRanking[productId] +=
                categoryRanking[category.slug as string];
            }
          });
        } else {
          alreadyRankedProducts.forEach((productId) => {
            productRanking[productId] +=
              categoryRanking[category.slug as string];
          });
        }
      }
    });
  }
};

// Algorithm to generate quiz results
// IN: We expect this handler to receive an array of ResultsAnswer
// OUT: We want to return an array of products slugs of the best ranking products (based on points)
//
// Steps:
// 1. In the edge-case where we don't have any product selections in the ResultsAnswers,
//    we just return the most popular products in the store
// 2. If we do have product selections, we start the process of ranking the products:
//    2.1. Add initial points to the products & categories within the product selections
//    2.3. If we have any categories in the categoryRanking after the initial points distribution,
//         we pick the first valid categories and we distribute their points to the products within
//         those categories that were already attributed some points in the initial points distribution
//    2.3 Lastly, we check if we have more than one product on the last available position: if that's
//        the case, then we sort all the products on the last position by popularity and only keep
//        the most popular ones to fill the spots up until VALID_FINAL_RANKING_COUNT limit. Now the products are ranked.
//    2.4 If we don't hit the edge-case above, then we just take the first VALID_FINAL_RANKING_COUNT products.
// 3. After we ranked the products, we return them as a list of slugs in the response

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const answers: Array<ResultsAnswer> = req.body.answers;

  const client = getGQLClient();

  // When there's no answers or no products selection
  // we need to break and redirect to /quiz/results with most popular products
  if (
    !answers?.length ||
    !answers?.flatMap((answer) => answer.selection).length
  ) {
    try {
      const { data } = await client.getFilteredSortedProducts({
        filter: {},
        sort: 'popularity desc',
        limit: VALID_FINAL_RANKING_COUNT,
      });

      let productsSlugs: string[] = [];

      if (data?.products?.results) {
        productsSlugs = data.products.results
          .filter((product) => !!product?.slug)
          .map((product) => product?.slug as string);
      }

      return res.status(200).json({
        data: {
          results: productsSlugs,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).end('Internal Server Error');
    }
  }

  const productRanking: Ranking = {};
  const categoryRanking: Ranking = {};

  // Start initial points distribution
  addInitialPoints(answers, productRanking, categoryRanking);

  if (Object.keys(categoryRanking).length > 0) {
    // If there's more than {VALID_CATEGORY_COUNT} points variations for categories
    // remove the categories that are not in the first {VALID_CATEGORY_COUNT} categories
    cleanupCategoryRanking(categoryRanking, VALID_CATEGORY_COUNT);

    try {
      // Get all products for each valid category
      const categoryPromises = Object.keys(categoryRanking).map(
        async (slug) => {
          const category = await client.getCategoryWithProductSlugs({ slug });

          return category.data.categoryBySlug;
        },
      );
      const categories = await Promise.all(categoryPromises);

      await addCategoryPointsToProducts(
        categoryRanking,
        productRanking,
        categories,
      );
    } catch (error) {
      console.error(error);
      return res.status(500).end('Internal Server Error');
    }
  }

  // We need to sort the ranking by points so we can find any products
  // that need to be further sorted by popularity
  const sortedRanking = Object.entries(productRanking).sort(
    (a, b) => b[1] - a[1],
  );

  if (sortedRanking.length > VALID_FINAL_RANKING_COUNT) {
    const lastProductPoints = sortedRanking[VALID_FINAL_RANKING_COUNT - 1][1];
    const firstAfterLastProductPoints =
      sortedRanking[VALID_FINAL_RANKING_COUNT][1];

    // <---Start 'sort by popularity' process for the products with same points in the last position(s)--->
    // We need to do this in order to fill the last spot(s) based on products popularity
    // if more than one product are in the last valid position indicated by {VALID_FINAL_RANKING_COUNT}
    // Example:
    // VALID_ALREADY_RANKED_COUNT = 3;
    // sortedRanking = [
    //  ['product-5', 30],✅
    //  ['product-2', 25],✅
    //  ['product-1', 20],❓
    //  ['product-6', 20],❓
    //  ['product-7', 20],❓
    //  ['product-8', 15],
    //  ['product-4', 15],
    // ];
    // We notice that the 3rd, 4th & 5th products end up with the same points
    // So, in order to validate if that's the case, we compare the points of the
    // products with index === VALID_FINAL_RANKING_COUNT - 1 and index === VALID_FINAL_RANKING_COUNT
    // if they're equal, that means we encountered this edge case and all the products with
    // points === lastProductPoints are subject to be sorted by popularity before being added
    // in the last spot available in the final ranking.
    if (firstAfterLastProductPoints === lastProductPoints) {
      const rankingAboveLast = sortedRanking.filter(
        (item) => item[1] > lastProductPoints,
      );
      const rankingLast = sortedRanking.filter(
        (item) => item[1] === lastProductPoints,
      );
      const spotsLeft = VALID_FINAL_RANKING_COUNT - rankingAboveLast.length;

      // The first {spotsLeft} products after they're sorted by popularity
      let validLastProducts: Array<string> = [];

      try {
        const { data } = await client.getFilteredSortedProducts({
          filter: { slug: { _in: rankingLast.map((item) => item[0]) } },
          sort: 'popularity desc',
          limit: rankingLast.length,
        });

        if (data?.products?.results) {
          validLastProducts = data.products.results
            .filter((product) => !!product?.slug)
            .map((product) => product?.slug as string)
            .slice(0, spotsLeft);
        }
      } catch (error) {
        console.error(error);
        return res.status(500).end('Internal Server Error');
      }

      const finalRanking = [
        ...rankingAboveLast.map((item) => item[0]),
        ...validLastProducts,
      ];

      return res.status(200).json({
        data: {
          results: finalRanking,
        },
      });
    }
  }

  const finalRanking = sortedRanking
    .map((item) => item[0])
    .slice(0, VALID_FINAL_RANKING_COUNT);

  return res.status(200).json({
    data: {
      results: finalRanking,
    },
  });
}
