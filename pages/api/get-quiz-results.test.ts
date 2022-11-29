import { setupServer } from 'msw/node';
import getQuizResults, {
  addCategoryPointsToProducts,
  addInitialPoints,
  cleanupCategoryRanking,
} from 'pages/api/get-quiz-results';
import { mockNextApi } from 'utils/test/next-api';
import type { Ranking, ResultsAnswer } from 'types/shared/quiz';
import { graphQLHandler, GRAPHQL_OPERATION } from 'utils/test/handler';

describe('POST /api/get-quiz-results', () => {
  const defaultProducts = [
    {
      slug: 'test-product-1',
    },
    {
      slug: 'test-product-2',
    },
    {
      slug: 'test-product-3',
    },
  ];
  const defaultGetCategoryData = {
    categoryBySlug: {
      slug: 'test-category-2',
      products: defaultProducts,
    },
  };
  const getCategoryHandler = graphQLHandler(
    'getCategoryWithProductSlugs',
    GRAPHQL_OPERATION.QUERY,
    defaultGetCategoryData,
  );

  const defaultGetFilteredSortedProductsData = {
    products: {
      results: defaultProducts,
    },
  };
  const getFilteredSortedProductsHandler = graphQLHandler(
    'getFilteredSortedProducts',
    GRAPHQL_OPERATION.QUERY,
    defaultGetFilteredSortedProductsData,
  );

  const gqlRequests = [
    getCategoryHandler(),
    getFilteredSortedProductsHandler(),
  ];

  const server = setupServer(...gqlRequests);

  beforeAll(() => {
    server.listen();
  });
  afterAll(() => {
    server.close();
  });

  it('returns status 405 if method is not POST', async () => {
    const { req, res } = mockNextApi({ method: 'GET' });

    await getQuizResults(req, res);

    expect(res.statusCode).toBe(405);
  });

  it('returns status 200 and array of most popular products in response when no answers', async () => {
    const { req, res } = mockNextApi({
      method: 'POST',
      body: {
        answers: [],
      },
    });

    await getQuizResults(req, res);
    const { data } = res._getJSONData();

    expect(res.statusCode).toBe(200);
    expect(data.results).toStrictEqual([
      'test-product-1',
      'test-product-2',
      'test-product-3',
    ]);
  });

  it('returns status 200 and array of highest ranking products', async () => {
    const { req, res } = mockNextApi({
      method: 'POST',
      body: {
        answers: [
          {
            selection: [
              {
                points: 100,
                productSelection: [
                  {
                    slug: 'test-product-4',
                    model: 'products',
                  },
                  {
                    slug: 'test-product-5',
                    model: 'products',
                  },
                  {
                    slug: 'test-product-6',
                    model: 'products',
                  },
                  {
                    slug: 'test-category-1',
                    model: 'categories',
                  },
                ],
              },
              {
                points: 10,
                productSelection: [
                  {
                    slug: 'test-product-1',
                    model: 'products',
                  },
                  {
                    slug: 'test-product-2',
                    model: 'products',
                  },
                  {
                    slug: 'test-product-3',
                    model: 'products',
                  },
                  {
                    slug: 'test-category-2',
                    model: 'categories',
                  },
                ],
              },
            ],
          },
          {
            selection: [
              {
                points: 15,
                productSelection: [
                  {
                    slug: 'test-product-4',
                    model: 'products',
                  },
                  {
                    slug: 'test-product-5',
                    model: 'products',
                  },
                  {
                    slug: 'test-category-1',
                    model: 'categories',
                  },
                ],
              },
              {
                points: 10,
                productSelection: [
                  {
                    slug: 'test-product-1',
                    model: 'products',
                  },
                  {
                    slug: 'test-product-2',
                    model: 'products',
                  },
                  {
                    slug: 'test-product-3',
                    model: 'products',
                  },
                  {
                    slug: 'test-category-2',
                    model: 'categories',
                  },
                ],
              },
            ],
          },
        ],
      },
    });

    await getQuizResults(req, res);
    const { data } = res._getJSONData();

    expect(res.statusCode).toBe(200);
    expect(data.results).toStrictEqual([
      'test-product-4',
      'test-product-5',
      'test-product-6',
    ]);
  });

  it('returns status 200 and results sorted by popularity', async () => {
    const { req, res } = mockNextApi({
      method: 'POST',
      body: {
        answers: [
          {
            selection: [
              {
                points: 45,
                productSelection: [
                  {
                    slug: 'test-product-4',
                    model: 'products',
                  },
                  {
                    slug: 'test-product-5',
                    model: 'products',
                  },
                  {
                    slug: 'test-category-1',
                    model: 'categories',
                  },
                ],
              },
              {
                points: 10,
                productSelection: [
                  {
                    slug: 'test-product-1',
                    model: 'products',
                  },
                  {
                    slug: 'test-product-2',
                    model: 'products',
                  },
                  {
                    slug: 'test-product-3',
                    model: 'products',
                  },
                  {
                    slug: 'test-category-2',
                    model: 'categories',
                  },
                ],
              },
            ],
          },
          {
            selection: [
              {
                points: 45,
                productSelection: [
                  {
                    slug: 'test-product-4',
                    model: 'products',
                  },
                  {
                    slug: 'test-product-5',
                    model: 'products',
                  },
                  {
                    slug: 'test-category-1',
                    model: 'categories',
                  },
                ],
              },
              {
                points: 10,
                productSelection: [
                  {
                    slug: 'test-product-1',
                    model: 'products',
                  },
                  {
                    slug: 'test-product-2',
                    model: 'products',
                  },
                  {
                    slug: 'test-product-3',
                    model: 'products',
                  },
                  {
                    slug: 'test-category-2',
                    model: 'categories',
                  },
                ],
              },
            ],
          },
        ],
      },
    });

    await getQuizResults(req, res);
    const { data } = res._getJSONData();

    expect(res.statusCode).toBe(200);

    // After points distribution we have the following:
    // test-product-4:
    // On the last position we expect to receive test-product-1 as part of the sort-by-popularity
    // This is the case because test-product-1, test-product-2 and test-product-3 all have same
    // amount of points, but there's only one spot left in the final ranking (max length = 3)
    // Because of this, we sort these 3 products by popularity and we get back that test-product-1
    // is most popular of the 3, so we add it in the final available spot
    expect(data.results).toStrictEqual([
      'test-product-4',
      'test-product-5',
      'test-product-1',
    ]);
  });
});

describe('addInitialPoints function', () => {
  it('updates the product/category rankings based on answers points', () => {
    const answers: Array<ResultsAnswer> = [
      {
        selection: [
          {
            points: 15,
            productSelection: [
              {
                slug: 'test-product-4',
                model: 'products',
              },
              {
                slug: 'test-category-1',
                model: 'categories',
              },
            ],
          },
          {
            points: 10,
            productSelection: [
              {
                slug: 'test-product-1',
                model: 'products',
              },
              {
                slug: 'test-category-2',
                model: 'categories',
              },
            ],
          },
        ],
      },
      {
        selection: [
          {
            points: 15,
            productSelection: [
              {
                slug: 'test-product-4',
                model: 'products',
              },
              {
                slug: 'test-category-1',
                model: 'categories',
              },
            ],
          },
          {
            points: 10,
            productSelection: [
              {
                slug: 'test-product-1',
                model: 'products',
              },
              {
                slug: 'test-category-2',
                model: 'categories',
              },
            ],
          },
        ],
      },
    ];

    const productRanking: Ranking = {};
    const categoryRanking: Ranking = {};

    addInitialPoints(answers, productRanking, categoryRanking);

    expect(productRanking['test-product-4']).toBe(30);
    expect(productRanking['test-product-1']).toBe(20);

    expect(categoryRanking['test-category-1']).toBe(30);
    expect(categoryRanking['test-category-2']).toBe(20);
  });
});

describe('cleanupCategoryRanking function', () => {
  it('removes the categories from categoryRanking that are not in the first {validCategoryCount} positions', () => {
    const categoryRanking = {
      'category-1': 30,
      'category-2': 20,
      'category-3': 15,
      'category-4': 20,
      'category-5': 15,
    };
    const validCategoryCount = 2;

    cleanupCategoryRanking(categoryRanking, validCategoryCount);

    expect(Object.keys(categoryRanking)).not.toContain('category-3');
    expect(Object.keys(categoryRanking)).not.toContain('category-5');

    expect(Object.keys(categoryRanking)).toContain('category-1');
    expect(Object.keys(categoryRanking)).toContain('category-2');
    expect(Object.keys(categoryRanking)).toContain('category-4');
  });
});

describe('addCategoryPointsToProducts function', () => {
  it('adds categories points to the already ranked products within those categories', () => {
    const productRanking = {
      'test-product-1': 20,
      'test-product-2': 10,
    };

    const categoryRanking = {
      'category-1': 25,
      'category-2': 15,
    };

    const categories = [
      {
        slug: 'category-1',
        products: [
          {
            slug: 'test-product-1',
          },
          {
            slug: 'test-product-2',
          },
          {
            slug: 'test-product-3',
          },
        ],
      },
      {
        slug: 'category-2',
        products: [
          {
            slug: 'test-product-4',
          },
          {
            slug: 'test-product-5',
          },
        ],
      },
    ];

    addCategoryPointsToProducts(categoryRanking, productRanking, categories);

    expect(productRanking['test-product-1']).toBe(45);
    expect(productRanking['test-product-2']).toBe(35);
  });
});
