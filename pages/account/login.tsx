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
import useI18n, { I18n } from 'hooks/useI18n';

const loginText = (i18n: I18n) => ({
  pageTitle: i18n('account.login.page_title'),
  title: i18n('account.login.title'),
  email: {
    label: i18n('account.login.email.label'),
    emptyErrorText: i18n('account.login.email.empty_error_text'),
    invalidErrorText: i18n('account.login.email.invalid_error_text'),
    placeholder: i18n('account.login.email.placeholder'),
  },
  password: {
    label: i18n('account.login.password.label'),
    emptyErrorText: i18n('account.login.password.empty_error_text'),
    invalidErrorText: i18n('account.login.password.invalid_error_text'),
    placeholder: i18n('account.login.password.placeholder'),
  },
  passwordRecovery: i18n('account.login.password_recovery'),
  errors: {
    invalidCredentials: i18n('account.login.errors.invalid_credentials'),
    server: i18n('account.login.errors.server'),
  },
  loginButton: i18n('account.login.login_button'),
  noAccount: i18n('account.login.no_account'),
  signupLink: i18n('account.login.signup_link'),
});

const propsCallback: GetStaticProps<PageProps> = async (context) => {
  const { locale } = context;

  return {
    props: {
      ...(locale ? { locale } : {}),
    },
  };
};

export const getStaticProps = withAuthLayout(propsCallback);

const LoginPage: NextPageWithLayout<PageProps> = ({
  metaTitle,
  metaDescription,
}) => {
  const i18n = useI18n();
  const text = loginText(i18n);
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
          message: text.errors.invalidCredentials,
        });
        return false;
      } else if (res.status === 500) {
        setError({
          field: ACCOUNT_FIELD.OTHER,
          message: text.errors.server,
        });
        return false;
      }
    },
    [text],
  );

  const errorCallback = useCallback(() => {
    setError({
      field: ACCOUNT_FIELD.OTHER,
      message: text.errors.server,
    });
  }, [text]);

  const validationCallback = useCallback(() => {
    const requiredErrorPayloads = {
      [ACCOUNT_FIELD.EMAIL]: {
        field: ACCOUNT_FIELD.EMAIL,
        message: text.email.emptyErrorText,
      },
      [ACCOUNT_FIELD.PASSWORD]: {
        field: ACCOUNT_FIELD.PASSWORD,
        message: text.password.emptyErrorText,
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
        message: text.email.invalidErrorText,
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
    <article className="mx-6 h-full pb-10 pt-12 md:pb-18 md:pt-16">
      <Head>
        <title>{text.pageTitle}</title>
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
                {text.title}
              </h1>
            </legend>
            <div className="mt-8">
              <p>
                <label
                  className="text-xs font-semibold uppercase text-primary"
                  htmlFor="email">
                  {text.email.label}
                </label>
                <Input
                  id="email"
                  type="email"
                  ref={emailInputRef}
                  aria-required
                  aria-invalid={emailError}
                  aria-errormessage={emailError ? error.message : undefined}
                  error={emailError}
                  placeholder={text.email.placeholder}
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
                  {text.password.label}
                </label>
                <PasswordInput
                  id="password"
                  aria-required
                  aria-invalid={passwordError}
                  aria-errormessage={passwordError ? error.message : undefined}
                  error={passwordError}
                  placeholder={text.password.placeholder}
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
                {text.loginButton}
              </Button>

              <p className="mt-4 text-center text-sm text-primary md:mt-6">
                {text.noAccount}&nbsp;
                <Link href="/account/sign-up">
                  <a className="font-bold hover:underline">{text.signupLink}</a>
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
