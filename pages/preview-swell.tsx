import PreviewPageSkeleton from 'components/organisms/PreviewPageSkeleton';
import { withMainLayout } from 'lib/utils/fetch_decorators';
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { isNextPublicSwellEditor } from 'utils/editor';

const propsCallback: GetStaticProps<Record<string, unknown>> = async () => {
  if (!isNextPublicSwellEditor) {
    return {
      notFound: true,
    };
  }

  return { props: {} };
};

export const getStaticProps = withMainLayout(propsCallback);

const PreviewSwell: NextPage = () => {
  return (
    <>
      <Head>
        <title>Page - Editor preview</title>
      </Head>
      <PreviewPageSkeleton />
    </>
  );
};

export default PreviewSwell;
