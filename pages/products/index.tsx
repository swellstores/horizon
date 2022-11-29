import Head from 'next/head';
import { getProductListingData } from 'lib/shop/fetchingFunctions';
import type { GetStaticProps, NextPage } from 'next';
import type { ProductsLayoutProps } from 'components/layouts/ProductsLayout';
import ProductsLayout from 'components/layouts/ProductsLayout';
import { withMainLayout } from 'lib/utils/fetch_decorators';

const propsCallback: GetStaticProps<
  Omit<ProductsLayoutProps, 'products' | 'productCount'>
> = async () => {
  const data = await getProductListingData();

  return {
    props: data,
  };
};

export const getStaticProps = withMainLayout(propsCallback);

const ProductsPage: NextPage<ProductsLayoutProps> = (props) => (
  <div>
    <Head>
      <title>All products - Horizon</title>
    </Head>

    <ProductsLayout {...props} breadcrumbText="All products" />
  </div>
);

export default ProductsPage;
