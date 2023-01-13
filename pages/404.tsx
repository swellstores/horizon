import ErrorLayout from 'components/molecules/ErrorLayout';
import useI18n from 'hooks/useI18n';
import { withMainLayout } from 'lib/utils/fetch_decorators';
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { BUTTON_TYPE } from 'types/shared/button';

const propsCallback: GetStaticProps<Record<string, unknown>> = async (
  context,
) => {
  const { locale } = context;

  return {
    props: {
      ...(locale ? { locale } : {}),
    },
  };
};

export const getStaticProps = withMainLayout(propsCallback);

const FourOhFourPage: NextPage = () => {
  const i18n = useI18n();

  const title = i18n('errors.page_not_found.title');
  const message = i18n('errors.page_not_found.message');
  const returnHome = i18n('errors.page_not_found.return_home_link');

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
