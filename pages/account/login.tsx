import { useCallback, useRef, useState } from 'react';
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
import { validateNonEmptyFields } from 'utils/validation';
import { ACCOUNT_FIELD } from 'types/account';
import useFetchApi from 'hooks/useFetchApi';

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

const LoginPage: NextPageWithLayout<LoginProps> = ({
  text,
  title,
  metaTitle,
  metaDescription,
}) => {
  const router = useRouter();
  const fetchApi = useFetchApi();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<{
    field: ACCOUNT_FIELD;
    message: string;
  }>();
  const otherError = error?.field === ACCOUNT_FIELD.OTHER;
  const emailError = error?.field === ACCOUNT_FIELD.EMAIL || otherError;
  const passwordError = error?.field === ACCOUNT_FIELD.PASSWORD || otherError;
  const emailInputRef = useRef<HTMLInputElement>(null);

  const responseCallback = useCallback(
    (res: Response) => {
      if (res.status === 401 || res.status === 403) {
        setError({
          field: ACCOUNT_FIELD.OTHER,
          message: text.invalidCredentialsErrorText,
        });
        return false;
      } else if (res.status === 500) {
        setError({
          field: ACCOUNT_FIELD.OTHER,
          message: text.serverErrorText,
        });
        return false;
      }
    },
    [text],
  );

  const errorCallback = useCallback(() => {
    setError({
      field: ACCOUNT_FIELD.OTHER,
      message: text.serverErrorText,
    });
  }, [text]);

  const validationCallback = useCallback(() => {
    const requiredErrorPayloads = {
      [ACCOUNT_FIELD.EMAIL]: {
        field: ACCOUNT_FIELD.EMAIL,
        message: text.emailEmptyErrorText,
      },
      [ACCOUNT_FIELD.PASSWORD]: {
        field: ACCOUNT_FIELD.PASSWORD,
        message: text.passwordEmptyErrorText,
      },
    };

    const requiredFields = {
      [ACCOUNT_FIELD.EMAIL]: email,
      [ACCOUNT_FIELD.PASSWORD]: password,
    };
    const requiredError = validateNonEmptyFields(
      requiredFields,
      requiredErrorPayloads,
    );

    if (requiredError) {
      setError(requiredError);
      return false;
    }

    const emailValid = emailInputRef.current?.checkValidity();

    if (!emailValid) {
      setError({
        field: ACCOUNT_FIELD.EMAIL,
        message: text.emailInvalidErrorText,
      });
      return false;
    }
  }, [email, password, text]);

  const completeCallback = useCallback(() => {
    setError(undefined);
    router.push('/account/orders');
  }, [router]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      await fetchApi(
        {
          url: API_ROUTES.LOGIN,
          options: {
            method: 'POST',
            body: JSON.stringify({ email, password }),
          },
        },
        responseCallback,
        errorCallback,
        validationCallback,
        completeCallback,
      );
    },
    [
      responseCallback,
      errorCallback,
      validationCallback,
      completeCallback,
      fetchApi,
      email,
      password,
    ],
  );

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
        onSubmit={handleSubmit}>
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
                  aria-invalid={emailError}
                  aria-errormessage={emailError ? error.message : undefined}
                  error={emailError}
                  placeholder={text.emailPlaceholder}
                  value={email}
                  onChange={(e) => {
                    setError(undefined);
                    setEmail(e.currentTarget.value);
                  }}
                />
                {error?.field === ACCOUNT_FIELD.EMAIL && (
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
                  aria-invalid={passwordError}
                  aria-errormessage={passwordError ? error.message : undefined}
                  error={passwordError}
                  placeholder={text.passwordPlaceholder}
                  value={password}
                  onChange={(e) => {
                    setError(undefined);
                    setPassword(e.currentTarget.value);
                  }}
                />
                {error?.field === ACCOUNT_FIELD.PASSWORD && (
                  <ValidationErrorText>{error.message}</ValidationErrorText>
                )}
              </p>
              <p className="mt-2">
                <Link href="/account/password-recovery">
                  <a className="text-xs text-body hover:underline">
                    {text.passwordRecovery}
                  </a>
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            {otherError ? (
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
                  <a className="font-bold hover:underline">{text.signUp}</a>
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
