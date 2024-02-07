import Head from 'next/head';
import type { GetServerSideProps } from 'next';
import { getAuthLayout } from 'lib/utils/layout_getters';
import { withAuthLayout } from 'lib/utils/fetch_decorators';
import type { NextPageWithLayout, PageProps } from 'types/shared/pages';
import { useRouter } from 'next/router';
import useI18n, { I18n } from 'hooks/useI18n';

const checkEmailText = (i18n: I18n) => ({
  pageTitle: i18n('account.password_recovery.check_email.page_title'),
  title: i18n('account.password_recovery.check_email.title'),
  message: i18n('account.password_recovery.check_email.message'),
  backToLoginLink: i18n(
    'account.password_recovery.check_email.back_to_login_link',
  ),
});

const propsCallback: GetServerSideProps<PageProps> = async (context) => {
  const { locale } = context;
  return {
    props: {
      ...(locale ? { locale } : {}),
    },
  };
};

export const getStaticProps = withAuthLayout(propsCallback);

const CheckEmailPage: NextPageWithLayout<PageProps> = ({
  metaTitle,
  metaDescription,
}) => {
  const router = useRouter();
  const i18n = useI18n();
  const text = checkEmailText(i18n);
  const loginLinkHref = `${
    router.locale !== router.defaultLocale ? `/${router.locale}` : ''
  }/account/login`;

  const backToLoginText = i18n(
    'account.password_recovery.check_email.back_to_login_text',
    {
      loginLink: `<a class="font-bold hover:underline" href='${loginLinkHref}'>${text.backToLoginLink}</a>`,
    },
  );

  return (
    <article className="mx-6 h-full pb-10 pt-12 md:pb-18 md:pt-16">
      <Head>
        <title>{text.pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="title" content={metaTitle} />
      </Head>

      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="w-full text-center md:max-w-[400px]">
          <h1 className="font-headings text-2xl font-semibold text-primary md:text-5xl">
            {text.title}
          </h1>
          {text.message && (
            <p className="mt-6 text-center text-sm text-body">{text.message}</p>
          )}
          <p
            className="mt-6 text-center text-sm text-primary md:mt-6"
            dangerouslySetInnerHTML={{ __html: backToLoginText }}
          />
        </div>
      </div>
    </article>
  );
};

CheckEmailPage.getLayout = getAuthLayout;

export default CheckEmailPage;
