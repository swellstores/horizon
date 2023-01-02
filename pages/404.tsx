import ErrorLayout from 'components/molecules/ErrorLayout';
import { withMainLayout } from 'lib/utils/fetch_decorators';
import type { NextPage } from 'next';
import Head from 'next/head';
import useSettingsStore from 'stores/settings';
import { BUTTON_TYPE } from 'types/shared/button';
import { fallbackString } from 'utils/text';

export const getStaticProps = withMainLayout(() => ({ props: {} }));

const FourOhFourPage: NextPage = () => {
  const lang = useSettingsStore((state) => state.settings?.lang);

  const title = fallbackString(
    lang?.errors?.pageNotFound?.title,
    'Page not found',
  );
  const message = fallbackString(
    lang?.errors?.pageNotFound?.message,
    'The page you were looking for is not available. Double check your URL or explore Horizon for new findings.',
  );
  const returnHome = fallbackString(
    lang?.errors?.pageNotFound?.returnHomeLink,
    'Back to home',
  );

  return (
    <article className="min-h-screen">
      <Head>
        <title>{title}</title>
      </Head>

      <ErrorLayout
        code={404}
        title={title}
        description={message}
        primaryCTA={{
          href: '/',
          elType: BUTTON_TYPE.LINK,
          children: returnHome,
        }}
        image={{
          src: '/images/errors/404.svg',
          alt: 'Panel image',
          width: 420,
          height: 420,
        }}
      />
    </article>
  );
};

export default FourOhFourPage;
