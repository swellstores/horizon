import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import type { GetStaticProps } from 'next';
import Input from 'components/atoms/Input';
import Button from 'components/atoms/Button';
import ValidationErrorText from 'components/atoms/ValidationErrorText';
import { BUTTON_TYPE } from 'types/shared/button';
import BannerInfo, { BANNER_INFO_STYLE } from 'components/atoms/BannerInfo';
import { TEXT_ALIGNMENT } from 'types/shared/alignment';
import { getAuthLayout } from 'lib/utils/layout_getters';
import { withAuthLayout } from 'lib/utils/fetch_decorators';
import type { NextPageWithLayout, PageProps } from 'types/shared/pages';
import { API_ROUTES } from 'types/shared/api';

interface PasswordRecoveryProps extends PageProps {
  text: {
    title: string;
    subtitle?: string;
    emailLabel: string;
    emailEmptyErrorText: string;
    emailInvalidErrorText: string;
    emailPlaceholder?: string;
    submitButtonLabel: string;
    backToLoginText?: string;
    backToLoginLink: string;
    serverErrorText: string;
  };
}

const propsCallback: GetStaticProps<PasswordRecoveryProps> = async () => {
  const storeName = 'Horizon';
  return {
    props: {
      storeName,
      title: `${storeName} | Password recovery`,
      text: {
        title: 'Forgot your password?',
        subtitle: 'Enter your email to reset your password',
        emailLabel: 'Email',
        emailEmptyErrorText: 'Email is required',
        emailInvalidErrorText: 'Email format is invalid',
        emailPlaceholder: 'Enter your email',
        submitButtonLabel: 'SEND EMAIL',
        backToLoginText: 'Back to',
        backToLoginLink: 'login',
        serverErrorText: 'Something went wrong',
      },
    },
  };
};

export const getStaticProps = withAuthLayout(propsCallback);

enum ERROR_FIELD {
  EMAIL = 'email',
  OTHER = 'other',
}

const PasswordRecoveryPage: NextPageWithLayout<PasswordRecoveryProps> = ({
  text,
  title,
  metaTitle,
  metaDescription,
}) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<{
    field: ERROR_FIELD;
    message: string;
  }>();

  const fetching = useRef(false);
  const emailInputRef = useRef<HTMLInputElement>(null);

  return (
    <article className="mx-6 h-full pt-12 pb-10 md:pb-18 md:pt-16">
      <Head>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
        <meta name="title" content={metaTitle} />
      </Head>

      <form
        noValidate
        className="mx-auto h-full w-full md:w-[400px]"
        onSubmit={async (e) => {
          e.preventDefault();

          if (fetching.current) return;

          if (email === '') {
            return setError({
              field: ERROR_FIELD.EMAIL,
              message: text.emailEmptyErrorText,
            });
          }

          const emailValid = emailInputRef.current?.checkValidity();

          if (!emailValid) {
            return setError({
              field: ERROR_FIELD.EMAIL,
              message: text.emailInvalidErrorText,
            });
          }

          try {
            fetching.current = true;

            const res = await fetch(API_ROUTES.PASSWORD_RECOVERY, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email,
              }),
            });

            fetching.current = false;

            if (res.status !== 200) {
              return setError({
                field: ERROR_FIELD.OTHER,
                message: text.serverErrorText,
              });
            }
          } catch (error) {
            fetching.current = false;
            return setError({
              field: ERROR_FIELD.OTHER,
              message: text.serverErrorText,
            });
          }

          setError(undefined);

          router.push('/account/password-recovery/check-email');
        }}>
        <fieldset className="flex h-full w-full flex-1 flex-col justify-between">
          <div>
            <legend className="w-full text-center">
              <h1 className="font-headings text-2xl font-semibold text-primary md:text-5xl">
                {text.title}
              </h1>
              {text.subtitle && (
                <p className="mt-6 text-center text-sm text-body">
                  {text.subtitle}
                </p>
              )}
            </legend>
            <div className="mt-8">
              <p>
                <label
                  className="text-xs font-semibold uppercase text-primary"
                  htmlFor="email">
                  {text.emailLabel}
                </label>
                <Input
                  id="email"
                  type="email"
                  ref={emailInputRef}
                  aria-required
                  aria-invalid={
                    error?.field === ERROR_FIELD.EMAIL ||
                    error?.field === ERROR_FIELD.OTHER
                  }
                  aria-errormessage={
                    error?.field === ERROR_FIELD.EMAIL ||
                    error?.field === ERROR_FIELD.OTHER
                      ? error.message
                      : undefined
                  }
                  error={error?.field === ERROR_FIELD.EMAIL}
                  placeholder={text.emailPlaceholder}
                  value={email}
                  onChange={(e) => {
                    setError(undefined);
                    setEmail(e.currentTarget.value);
                  }}
                />
                {error?.field === ERROR_FIELD.EMAIL && (
                  <ValidationErrorText id="email-error">
                    {error.message}
                  </ValidationErrorText>
                )}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            {error?.field === ERROR_FIELD.OTHER ? (
              <BannerInfo
                bannerStyle={BANNER_INFO_STYLE.ERROR}
                textAlignment={TEXT_ALIGNMENT.CENTER}>
                {error.message}
              </BannerInfo>
            ) : null}
            <div>
              <Button elType={BUTTON_TYPE.BUTTON} fullWidth type="submit">
                {text.submitButtonLabel}
              </Button>

              <p className="mt-4 text-center text-sm text-primary md:mt-6">
                {text.backToLoginText && <>{text.backToLoginText}&nbsp;</>}
                <Link href="/account/login">
                  <a className="underline">{text.backToLoginLink}</a>
                </Link>
              </p>
            </div>
          </div>
        </fieldset>
      </form>
    </article>
  );
};

PasswordRecoveryPage.getLayout = getAuthLayout;

export default PasswordRecoveryPage;
