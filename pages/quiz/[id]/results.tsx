import React from 'react';
import Head from 'next/head';
import QuizResultsCart from 'components/molecules/QuizResultsCart';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { NextPage } from 'next';
import { withMainLayout } from 'lib/utils/fetch_decorators';
import { useRouter } from 'next/router';
import useQuizResults from 'hooks/useQuizResults';
import type { QuizEditorProps, QuizEditorResultsPage } from 'types/shared/quiz';
import { mapQuizResultsProps } from 'lib/editor/quiz';
import type { PageSection } from 'lib/editor/sections';
import useQuizHeadingSection from 'hooks/useQuizHeadingSection';
import useLiveEditorQuizResultsUpdates from 'hooks/useLiveEditorQuizResultsUpdates';
import type { ServerSideProps } from 'types/shared/pages';
import useLiveEditorQuizResultsNavigation from 'hooks/useLiveEditorQuizResultsNavigation';
import { fetchQuizData } from 'lib/rest/fetchStoreData';
import getGQLClient from 'lib/graphql/client';

export interface QuizResultsPageProps {
  id: string;
  title: string;
  headingSection: PageSection | null;
  resultsTitle?: string;
  originalQuizResults: QuizEditorResultsPage;
  quizId: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const propsCallback: GetStaticProps<QuizResultsPageProps> = async (
  context,
) => {
  if (!context.params?.id || typeof context.params?.id !== 'string') {
    return {
      notFound: true,
    };
  }

  const {
    params: { id },
  } = context;

  const client = getGQLClient();
  const {
    data: { storeSettings },
  } = await client.getStoreSettings();

  const defaultLocale = storeSettings?.store?.locale;

  const locale = context.locale ?? defaultLocale ?? '';

  const quizData = (await fetchQuizData(id, locale)) as QuizEditorProps;

  if (!quizData || !quizData?.id) {
    return {
      notFound: true,
    };
  }

  const mappedProps = await mapQuizResultsProps(quizData.results_page?.[0]);

  return {
    props: { ...mappedProps, quizId: id },
  };
};

export const getStaticProps = withMainLayout(propsCallback);

const QuizResults: NextPage<ServerSideProps<typeof getStaticProps>> = (
  props,
) => {
  const router = useRouter();

  const { quizId, ...quizResultsProps } = props;
  const liveQuizResultsPage = useLiveEditorQuizResultsUpdates(quizResultsProps);

  useLiveEditorQuizResultsNavigation(quizId, router);

  const { customerName, results, selectedProducts } = useQuizResults(
    router.query,
  );

  // The quiz variables can be added by merchants in the text content of the heading section
  // We replace the variable identifier (ex: {variable}) with the actual value
  // Currently we only support customerName, but this approach leaves room for extending it to other quiz variables
  const quizVariables = {
    customerName,
  };
  const headingSection = useQuizHeadingSection(
    liveQuizResultsPage.headingSection,
    quizVariables,
  );

  return (
    <>
      <Head>
        <title>{liveQuizResultsPage.title}</title>
      </Head>
      {headingSection}
      <QuizResultsCart
        resultsGroups={[
          {
            title: liveQuizResultsPage?.resultsTitle ?? '',
            products: results,
          },
        ]}
        selectedProducts={selectedProducts}
      />
    </>
  );
};

export default QuizResults;
