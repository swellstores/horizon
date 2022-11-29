import Head from 'next/head';
import getGQLClient from 'lib/graphql/client';
import ProductsLayout, {
  ProductsLayoutProps,
} from 'components/layouts/ProductsLayout';
import { getProductListingData } from 'lib/shop/fetchingFunctions';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { denullifyArray } from 'lib/utils/denullify';
import { withMainLayout } from 'lib/utils/fetch_decorators';

interface CategoryPageProps extends ProductsLayoutProps {
  title: string;
  description: string;
  keywords: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const client = getGQLClient();

  const { data } = await client.getCategoryPaths();

  const paths = denullifyArray(
    data?.categories?.results?.map((category) =>
      category?.slug
        ? {
            params: {
              slug: category.slug,
            },
          }
        : null,
    ),
  );

  return {
    paths,
    fallback: 'blocking',
  };
};

const propsCallback: GetStaticProps<CategoryPageProps> = async (context) => {
  const client = getGQLClient();
  const slug = context.params?.slug;

  if (!slug) return { notFound: true };

  const dataPromise = getProductListingData(slug.toString());

  // Get the current category and its products
  const currentCategoryPromise = client
    .getCategory({
      slug: slug?.toString() ?? '',
    })
    .then((response) => response.data);

  const [data, currentCategory] = await Promise.all([
    dataPromise,
    currentCategoryPromise,
  ]);

  // If the category doesn't exist, return 404
  if (!currentCategory.categoryBySlug?.slug) {
    return { notFound: true };
  }

  return {
    props: {
      ...data,
      title: currentCategory.categoryBySlug.name ?? '',
      description:
        currentCategory.categoryBySlug.metaDescription ??
        currentCategory.categoryBySlug.description ??
        '',
      keywords: currentCategory.categoryBySlug.metaKeywords ?? '',
    },
  };
};

export const getStaticProps = withMainLayout(propsCallback);

const CategoryPage: NextPage<CategoryPageProps> = ({
  description,
  keywords,
  title,
  ...props
}) => (
  <div>
    <Head>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <title>{title} - Horizon</title>
    </Head>

    <ProductsLayout {...props} />
  </div>
);

export default CategoryPage;
