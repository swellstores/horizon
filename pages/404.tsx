import ErrorLayout from 'components/molecules/ErrorLayout';
import { withMainLayout } from 'lib/utils/fetch_decorators';
import type { NextPage } from 'next';
import Head from 'next/head';
import { BUTTON_TYPE } from 'types/shared/button';

export const getStaticProps = withMainLayout(() => ({ props: {} }));

const FourOhFourPage: NextPage = () => {
  return (
    <article className="min-h-screen">
      <Head>
        <title>Page not found - Horizon</title>
      </Head>

      <ErrorLayout
        code={404}
        title="Page not found"
        description="<p>The page you were looking for is not available. Double check your URL or explore Horizon for new findings.</p>"
        primaryCTA={{
          href: '/',
          elType: BUTTON_TYPE.LINK,
          children: 'Back to home',
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
