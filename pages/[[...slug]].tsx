import Head from 'next/head';
import getGQLClient from 'lib/graphql/client';
import usePageSections from 'hooks/usePageSections';
import { withMainLayout } from 'lib/utils/fetch_decorators';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import type { PageProps, ServerSideProps } from 'types/shared/pages';
import type { EditorPageOutput } from 'types/editor';
import { denullifyArray } from 'lib/utils/denullify';
import { mapSectionProps, PageSection } from 'lib/editor/sections';
import { fetchPageData } from 'lib/rest/fetchStoreData';

interface StaticPageProps extends PageProps {
  sections: PageSection[];
}

export const getStaticPaths: GetStaticPaths = async ({
  locales,
  defaultLocale,
}) => {
  const client = getGQLClient();
  const {
    data: { storeSettings },
  } = await client.getStoreSettings();

  const homePageKey = storeSettings?.store?.homePage ?? 'home';

  const {
    data: { contentPages },
  } = await client.getContentPages();

  const pages = (contentPages?.results?.filter(
    (page) => page?.published && page.slug,
  ) ?? []) as { slug: string; published: boolean }[];

  const paths: { params: ParsedUrlQuery; locale?: string }[] = [];

  const getPath = (slug: string, locale?: string) => ({
    params: {
      slug: slug === homePageKey ? [''] : [slug],
    },
    locale,
  });

  pages.forEach((staticPage) => {
    if (!staticPage) return;

    const { slug, published } = staticPage;

    if (!slug || !published) return;

    const localesArray = locales?.length ? locales : [defaultLocale];

    const localePaths = localesArray.map((locale) => getPath(slug, locale));

    paths.push(...localePaths);
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

const propsCallback: GetStaticProps<StaticPageProps> = async (context) => {
  const client = getGQLClient();
  const {
    data: { storeSettings },
  } = await client.getStoreSettings();

  const homePageKey = storeSettings?.store?.homePage ?? 'home';

  const defaultLocale = storeSettings?.store?.locale;

  const slug = context.params?.slug ?? homePageKey;

  const locale = context.locale ?? defaultLocale ?? '';

  // TODO: Replace this REST call with GraphQL
  const editorData = (await fetchPageData(
    slug as string,
    locale,
  )) as EditorPageOutput;

  // Show 404 if page is not found or not published.
  // If the NEXT_PUBLIC_SWELL_EDITOR is true, show the page even if it is not published.
  if (
    !editorData ||
    (process.env.NEXT_PUBLIC_SWELL_EDITOR !== 'true' && !editorData.published)
  ) {
    return {
      notFound: true,
    };
  }

  const mappedSections = await mapSectionProps(
    denullifyArray(editorData.sections),
  );

  const props: StaticPageProps = {
    title: editorData.name ?? '',
    metaTitle: editorData.meta_title ?? '',
    metaDescription: editorData.meta_description ?? '',
    sections: mappedSections,
  };

  return {
    props: props,
  };
};

export const getStaticProps = withMainLayout(propsCallback);

const Page: NextPage<ServerSideProps<typeof getStaticProps>> = ({
  sections,
  title,
}) => {
  const pageSections = usePageSections(sections);

  return (
    <article>
      <Head>
        <title>{title}</title>
      </Head>

      {pageSections}
    </article>
  );
};

export default Page;
