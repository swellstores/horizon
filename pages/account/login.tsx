import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import type { GetStaticProps } from 'next';
import Input from 'components/atoms/Input';
import Button from 'components/atoms/Button';
import ValidationErrorText from 'components/atoms/ValidationErrorText';
import PasswordInput from 'components/molecules/PasswordInput';
import { BUTTON_TYPE } from 'types/shared/button';
import type { NextPageWithLayout, PageProps } from 'types/shared/pages';
import BannerInfo, { BANNER_INFO_STYLE } from 'components/atoms/BannerInfo';
import { TEXT_ALIGNMENT } from 'types/shared/alignment';
import { getAuthLayout } from 'lib/utils/layout_getters';
import { withAuthLayout } from 'lib/utils/fetch_decorators';
import { API_ROUTES } from 'types/shared/api';

interface LoginProps extends PageProps {
  text: {
    logInTitle: string;
    emailLabel: string;
    emailEmptyErrorText: string;
    emailInvalidErrorText: string;
    emailPlaceholder?: string;
    passwordLabel: string;
    passwordEmptyErrorText: string;
    passwordInvalidErrorText: string;
    passwordPlaceholder?: string;
    passwordRecovery: string;
    invalidCredentialsErrorText: string;
    serverErrorText: string;
    logInButton: string;
    noAccount: string;
    signUp: string;
  };
}

const propsCallback: GetStaticProps<LoginProps> = async () => {
  const storeName = 'Horizon';
  return {
    props: {
      storeName,
      title: `${storeName} | Log in`,
      text: {
        logInTitle: 'Log in',
        emailLabel: 'Email',
        emailEmptyErrorText: 'Email is required',
        emailInvalidErrorText: 'Email format is invalid',
        emailPlaceholder: 'Enter your email',
        passwordLabel: 'Password',
        passwordEmptyErrorText: 'Password is required',
        passwordInvalidErrorText: 'Password is invalid',
        passwordPlaceholder: 'Enter your password',
        passwordRecovery: 'Forgot your password?',
        invalidCredentialsErrorText: 'Your email or password is incorrect.',
        serverErrorText: 'Internal server error',
        logInButton: 'Log in',
        noAccount: "Don't have an account?",
        signUp: 'Sign up',
      },
    },
  };
};

export const getStaticProps = withAuthLayout(propsCallback);

enum ERROR_FIELD {
  EMAIL = 'email',
  PASSWORD = 'password',
  OTHER = 'other',
}

const LoginPage: NextPageWithLayout<LoginProps> = ({
  text,
  title,
  metaTitle,
  metaDescription,
}) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
          if (password === '') {
            return setError({
              field: ERROR_FIELD.PASSWORD,
              message: text.passwordEmptyErrorText,
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

            const res = await fetch(API_ROUTES.LOGIN, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email,
                password,
              }),
            });

            fetching.current = false;

            if (res.status === 401 || res.status === 403) {
              return setError({
                field: ERROR_FIELD.OTHER,
                message: text.invalidCredentialsErrorText,
              });
            } else if (res.status === 500) {
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

          router.push('/account/orders');
        }}>
        <fieldset className="flex h-full w-full flex-1 flex-col justify-between">
          <div>
            <legend className="w-full text-center">
              <h1 className="font-headings text-2xl font-semibold text-primary md:text-5xl">
                {text.logInTitle}
              </h1>
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
              <p className="mt-4">
                <label
                  className="text-xs font-semibold uppercase text-primary"
                  htmlFor="password">
                  {text.passwordLabel}
                </label>
                <PasswordInput
                  id="password"
                  aria-required
                  aria-invalid={
                    error?.field === ERROR_FIELD.PASSWORD ||
                    error?.field === ERROR_FIELD.OTHER
                  }
                  aria-errormessage={
                    error?.field === ERROR_FIELD.PASSWORD ||
                    error?.field === ERROR_FIELD.OTHER
                      ? error.message
                      : undefined
                  }
                  error={error?.field === ERROR_FIELD.PASSWORD}
                  placeholder={text.passwordPlaceholder}
                  value={password}
                  onChange={(e) => {
                    setError(undefined);
                    setPassword(e.currentTarget.value);
                  }}
                />
                {error?.field === ERROR_FIELD.PASSWORD && (
                  <ValidationErrorText>{error.message}</ValidationErrorText>
                )}
              </p>
              <p className="mt-2">
                <Link href="/account/password-recovery">
                  <a className="text-xs text-body underline">
                    {text.passwordRecovery}
                  </a>
                </Link>
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
                {text.logInButton}
              </Button>

              <p className="mt-4 text-center text-sm text-primary md:mt-6">
                {text.noAccount}&nbsp;
                <Link href="/account/sign-up">
                  <a className="underline">{text.signUp}</a>
                </Link>
              </p>
            </div>
          </div>
        </fieldset>
      </form>
    </article>
  );
};

LoginPage.getLayout = getAuthLayout;

export default LoginPage;
