import ErrorLayout from 'components/molecules/ErrorLayout';
import { withMainLayout } from 'lib/utils/fetch_decorators';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSettingsStore from 'stores/settings';
import { BUTTON_TYPE } from 'types/shared/button';
import { fallbackString } from 'utils/text';

export const getStaticProps = withMainLayout(() => ({ props: {} }));

const FiveOhFivePage: NextPage = () => {
  const router = useRouter();
  const lang = useSettingsStore((state) => state?.settings?.lang);

  const title = fallbackString(
    lang?.errors?.internal?.title,
    'Page unavailable',
  );
  const message = fallbackString(
    lang?.errors?.internal?.message,
    'The page you were looking for is temporarily unavailable. Please try refreshing the page or contact us if the issue persists',
  );
  const reloadPage = fallbackString(
    lang?.errors?.internal?.reload,
    'Refresh page',
  );

  return (
    <article className="min-h-screen">
      <Head>
        <title>{title}</title>
      </Head>

      <ErrorLayout
        code={500}
        title={title}
        description={message}
        primaryCTA={{
          elType: BUTTON_TYPE.BUTTON,
          onClick: () => router.reload(),
          children: reloadPage,
        }}
        image={{
          src: '/images/errors/500.svg',
          alt: 'Panel image',
          width: 420,
          height: 420,
        }}
        showBackToHome
      />
    </article>
  );
};

export default FiveOhFivePage;
