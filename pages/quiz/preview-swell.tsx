import QuizNavbar from 'components/molecules/QuizNavbar';
import PreviewPageSkeleton from 'components/organisms/PreviewPageSkeleton';
import { withMainLayout } from 'lib/utils/fetch_decorators';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import useSettingsStore from 'stores/settings';
import type { NextPageWithLayout, ServerSideProps } from 'types/shared/pages';
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

const PreviewSwell: NextPageWithLayout<
  ServerSideProps<typeof getStaticProps>
> = ({ _layout: { settings } }) => {
  const [setSettings, headerSettings] = useSettingsStore((state) => [
    state.setSettings,
    state.settings?.header,
  ]);

  // Stores settings retrieved server-side on the client-side store.
  useEffect(() => {
    if (settings) {
      setSettings(settings);
    }
  }, [setSettings, settings]);
  return (
    <>
      <Head>
        <title>Quiz - Editor preview</title>
      </Head>
      <QuizNavbar
        logo={headerSettings ? headerSettings.logo : null}
        logoHeight={headerSettings ? headerSettings.logoHeight : null}
        storeName={headerSettings ? headerSettings.storeName : null}
        questions={1}
        currentQuestion={1}
        transparent={false}
        containerClassName="fixed top-0 left-0 w-full z-[10]"
        onClickPrevious={undefined}
      />
      <PreviewPageSkeleton />
    </>
  );
};

PreviewSwell.getLayout = (page) => <>{page}</>;

export default PreviewSwell;
