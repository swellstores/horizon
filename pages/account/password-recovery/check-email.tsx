import Head from 'next/head';
import Link from 'next/link';
import type { GetStaticProps } from 'next';
import { getAuthLayout } from 'lib/utils/layout_getters';
import { withAuthLayout } from 'lib/utils/fetch_decorators';
import type { NextPageWithLayout, PageProps } from 'types/shared/pages';

interface CheckEmailProps extends PageProps {
  text: {
    title: string;
    message?: string;
    backToLoginText?: string;
    backToLoginLink: string;
  };
}

const propsCallback: GetStaticProps<CheckEmailProps> = async () => {
  const storeName = 'Horizon';
  return {
    props: {
      storeName,
      title: `${storeName} | Email sent`,
      text: {
        title: 'Check your email.',
        message:
          'If you have an account, you should receive an email shortly with a link to reset your password.',
        backToLoginText: 'Back to',
        backToLoginLink: 'login',
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
          <p className="mt-6 text-center text-sm text-primary md:mt-6">
            {text.backToLoginText && <>{text.backToLoginText}&nbsp;</>}
            <Link href="/account/login">
              <a className="underline">{text.backToLoginLink}</a>
            </Link>
          </p>
        </div>
      </div>
    </article>
  );
};

CheckEmailPage.getLayout = getAuthLayout;

export default CheckEmailPage;
