import Head from 'next/head';
import type { GetStaticProps } from 'next';
import { getAuthLayout } from 'lib/utils/layout_getters';
import { withAuthLayout } from 'lib/utils/fetch_decorators';
import type { NextPageWithLayout, PageProps } from 'types/shared/pages';
import Button from 'components/atoms/Button';
import { BUTTON_TYPE } from 'types/shared/button';

interface CheckEmailProps extends PageProps {
  text: {
    title: string;
    message?: string;
    loginLinkText: string;
  };
}

const propsCallback: GetStaticProps<CheckEmailProps> = async () => {
  const storeName = 'Horizon';
  return {
    props: {
      storeName,
      title: `${storeName} | Success`,
      text: {
        title: 'Success',
        message: 'You can now log into your account using your new password.',
        loginLinkText: 'Login',
      },
    },
  };
};

export const getStaticProps = withAuthLayout(propsCallback);

const CheckEmailPage: NextPageWithLayout<CheckEmailProps> = ({
  text,
  title,
  metaTitle,
  metaDescription,
}) => {
  return (
    <article className="mx-6 h-full pt-12 pb-10 md:pb-18 md:pt-16">
      <Head>
        <title>{title}</title>
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
          <p className="mt-16 w-full text-center text-sm text-primary">
            <Button fullWidth href="/account/login" elType={BUTTON_TYPE.LINK}>
              {text.loginLinkText}
            </Button>
          </p>
        </div>
      </div>
    </article>
  );
};

CheckEmailPage.getLayout = getAuthLayout;

export default CheckEmailPage;
