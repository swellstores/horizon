import ErrorLayout from 'components/molecules/ErrorLayout';
import { withMainLayout } from 'lib/utils/fetch_decorators';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { BUTTON_TYPE } from 'types/shared/button';

export const getStaticProps = withMainLayout(() => ({ props: {} }));

const FiveOhFivePage: NextPage = () => {
  const router = useRouter();

  return (
    <article className="min-h-screen">
      <Head>
        <title>Page unavailable - Horizon</title>
      </Head>

      <ErrorLayout
        code={500}
        title="Page unavailable"
        description="<p>The page you were looking for is temporarily unavailable. Please try refreshing the page or contact us if the issue persists.</p>"
        primaryCTA={{
          elType: BUTTON_TYPE.BUTTON,
          onClick: () => router.reload(),
          children: 'Refresh page',
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
