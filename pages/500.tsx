import ErrorLayout from 'components/molecules/ErrorLayout';
import useI18n from 'hooks/useI18n';
import { withMainLayout } from 'lib/utils/fetch_decorators';
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
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

const FiveOhFivePage: NextPage = () => {
  const router = useRouter();
  const i18n = useI18n();

  const title = i18n('errors.internal.title');
  const message = i18n('errors.internal.message');
  const reloadPage = i18n('errors.internal.reload');

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
