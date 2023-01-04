import Head from 'next/head';
import type { GetStaticProps } from 'next';
import { getAuthLayout } from 'lib/utils/layout_getters';
import { withAuthLayout } from 'lib/utils/fetch_decorators';
import type { NextPageWithLayout, PageProps } from 'types/shared/pages';
import useSettingsStore from 'stores/settings';
import { passwordRecoveryText } from 'utils/lang';
import { useRouter } from 'next/router';
import { parseTextWithVariables } from 'utils/text';

const propsCallback: GetStaticProps<PageProps> = async () => {
  return {
    props: {},
  };
};

export const getStaticProps = withAuthLayout(propsCallback);

const CheckEmailPage: NextPageWithLayout<PageProps> = ({
  metaTitle,
  metaDescription,
}) => {
  const router = useRouter();
  const lang = useSettingsStore((state) => state.settings?.lang);
  const text = passwordRecoveryText(lang).checkEmail;
  const backToLoginText = parseTextWithVariables(text.backToLoginText, {
    loginLink: `<a class="font-bold hover:underline" href='/${
      router.locale !== router.defaultLocale ? `${router.locale}/` : ''
    }/account/login'>${text.backToLoginLink}</a>`,
  });

  return (
    <article className="mx-6 h-full pt-12 pb-10 md:pb-18 md:pt-16">
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
