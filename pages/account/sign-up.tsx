import { useCallback, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import type { GetServerSideProps } from 'next';
import Input from 'components/atoms/Input';
import Button from 'components/atoms/Button';
import ValidationErrorText from 'components/atoms/ValidationErrorText';
import PasswordInput from 'components/molecules/PasswordInput';
import { BUTTON_TYPE } from 'types/shared/button';
import type {
  NextPageWithLayout,
  PageProps,
  ServerSideProps,
} from 'types/shared/pages';
import BannerInfo, { BANNER_INFO_STYLE } from 'components/atoms/BannerInfo';
import { TEXT_ALIGNMENT } from 'types/shared/alignment';
import { getAuthLayout } from 'lib/utils/layout_getters';
import { withAuthLayout } from 'lib/utils/fetch_decorators';
import Link from 'next/link';
import { API_ROUTES } from 'types/shared/api';
import { validateNonEmptyFields } from 'utils/validation';
import { ACCOUNT_FIELD } from 'types/account';
import useFetchApi from 'hooks/useFetchApi';
import useNotificationStore from 'stores/notification';
import { NOTIFICATION_TYPE } from 'types/shared/notification';
import useI18n, { I18n } from 'hooks/useI18n';

const signupText = (i18n: I18n) => ({
  pageTitle: i18n('account.signup.page_title'),
  signupTitle: i18n('account.signup.title'),
  firstName: {
    label: i18n('account.signup.first_name.label'),
    emptyErrorText: i18n('account.signup.first_name.empty_error_text'),
    placeholder: i18n('account.signup.first_name.placeholder'),
  },
  lastName: {
    label: i18n('account.signup.last_name.label'),
    emptyErrorText: i18n('account.signup.last_name.empty_error_text'),
    placeholder: i18n('account.signup.last_name.placeholder'),
  },
  email: {
    label: i18n('account.signup.email.label'),
    emptyErrorText: i18n('account.signup.email.empty_error_text'),
    invalidErrorText: i18n('account.signup.email.invalid_error_text'),
    placeholder: i18n('account.signup.email.placeholder'),
  },
  password: {
    label: i18n('account.signup.password.label'),
    emptyErrorText: i18n('account.signup.password.empty_error_text'),
    invalidErrorText: i18n('account.signup.password.invalid_error_text'),
    placeholder: i18n('account.signup.password.placeholder'),
    requirementsText: i18n('account.signup.password.requirements_text'),
  },
  errors: {
    server: i18n('account.signup.errors.server_error_text'),
    invalidEmail: i18n('account.signup.errors.invalid_email'),
  },
  signupButton: i18n('account.signup.signup_button'),
  registeredUser: i18n('account.signup.registered_user_label'),
  loginLink: i18n('account.signup.login_link'),
  successMessage: i18n('account.signup.success_message'),
});

const propsCallback: GetServerSideProps<PageProps> = async (context) => {
  const { locale } = context;
  return {
    props: {
      ...(locale ? { locale } : {}),
    },
  };
};

export const getServerSideProps = withAuthLayout(propsCallback);

const SignUpPage: NextPageWithLayout<
  ServerSideProps<typeof getServerSideProps>
> = ({ metaTitle, metaDescription }) => {
  const i18n = useI18n();
  const text = signupText(i18n);
  const router = useRouter();
  const fetchApi = useFetchApi();
  const send = useNotificationStore((store) => store.send);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<{
    field: ACCOUNT_FIELD;
    message: string;
  }>();
  const otherError = error?.field === ACCOUNT_FIELD.OTHER;
  const firstNameError =
    error?.field === ACCOUNT_FIELD.FIRST_NAME || otherError;
  const lastNameError = error?.field === ACCOUNT_FIELD.LAST_NAME || otherError;
  const emailError = error?.field === ACCOUNT_FIELD.EMAIL || otherError;
  const passwordError = error?.field === ACCOUNT_FIELD.PASSWORD || otherError;
  const emailInputRef = useRef<HTMLInputElement>(null);

  const responseCallback = useCallback(
    (res: Response) => {
      if (res.status === 409) {
        setError({
          field: ACCOUNT_FIELD.OTHER,
          message: text.errors.invalidEmail,
        });
        return false;
      } else if (res.status !== 200) {
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
      [ACCOUNT_FIELD.FIRST_NAME]: {
        field: ACCOUNT_FIELD.FIRST_NAME,
        message: text.firstName.emptyErrorText,
      },
      [ACCOUNT_FIELD.LAST_NAME]: {
        field: ACCOUNT_FIELD.LAST_NAME,
        message: text.lastName.emptyErrorText,
      },
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
      [ACCOUNT_FIELD.FIRST_NAME]: firstName,
      [ACCOUNT_FIELD.LAST_NAME]: lastName,
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

    if (password.length < 6) {
      setError({
        field: ACCOUNT_FIELD.PASSWORD,
        message: text.password.invalidErrorText,
      });
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
  }, [email, password, firstName, lastName, text]);

  const completeCallback = useCallback(() => {
    setError(undefined);
    send({
      message: text.successMessage,
      type: NOTIFICATION_TYPE.INFO,
    });
    router.push('/account/orders');
  }, [router, send, text]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      await fetchApi(
        {
          url: API_ROUTES.SIGN_UP,
          options: {
            method: 'POST',
            body: JSON.stringify({ email, password, firstName, lastName }),
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
      firstName,
      lastName,
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
                {text.signupTitle}
              </h1>
            </legend>
            <div className="mt-8">
              <p>
                <label
                  className="text-xs font-semibold uppercase text-primary"
                  htmlFor="first-name">
                  {text.firstName.label}
                </label>
                <Input
                  id="first-name"
                  type="text"
                  aria-required
                  aria-invalid={firstNameError}
                  aria-errormessage={firstNameError ? error.message : undefined}
                  error={firstNameError}
                  placeholder={text.firstName.placeholder}
                  value={firstName}
                  onChange={(e) => {
                    setError(undefined);
                    setFirstName(e.currentTarget.value);
                  }}
                />
                {error?.field === ACCOUNT_FIELD.FIRST_NAME && (
                  <ValidationErrorText id="first-name-error">
                    {error.message}
                  </ValidationErrorText>
                )}
              </p>
              <p className="mt-4">
                <label
                  className="text-xs font-semibold uppercase text-primary"
                  htmlFor="last-name">
                  {text.lastName.label}
                </label>
                <Input
                  id="last-name"
                  type="text"
                  aria-required
                  aria-invalid={lastNameError}
                  aria-errormessage={lastNameError ? error.message : undefined}
                  error={lastNameError}
                  placeholder={text.lastName.placeholder}
                  value={lastName}
                  onChange={(e) => {
                    setError(undefined);
                    setLastName(e.currentTarget.value);
                  }}
                />
                {error?.field === ACCOUNT_FIELD.LAST_NAME && (
                  <ValidationErrorText id="last-name-error">
                    {error.message}
                  </ValidationErrorText>
                )}
              </p>
              <p className="mt-4">
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
                  minLength={6}
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
                {text.password.requirementsText && (
                  <p className="mt-2 text-2xs text-primary">
                    {text.password.requirementsText}
                  </p>
                )}
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
                {text.signupButton}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm text-primary">
              {text.registeredUser && <span>{text.registeredUser}&nbsp;</span>}

              <Link href="/account/login">
                <a className="font-bold hover:underline">{text.loginLink}</a>
              </Link>
            </div>
          </div>
        </fieldset>
      </form>
    </article>
  );
};

SignUpPage.getLayout = getAuthLayout;

export default SignUpPage;
