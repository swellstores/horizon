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

interface SignUpProps extends PageProps {
  text: {
    signUpTitle: string;
    firstNameLabel: string;
    firstNameEmptyErrorText: string;
    firstNamePlaceholder?: string;
    lastNameLabel: string;
    lastNameEmptyErrorText: string;
    lastNamePlaceholder?: string;
    emailLabel: string;
    emailEmptyErrorText: string;
    emailInvalidErrorText: string;
    emailPlaceholder?: string;
    passwordLabel: string;
    passwordEmptyErrorText: string;
    passwordInvalidErrorText: string;
    passwordPlaceholder?: string;
    serverErrorText: string;
    emailTakenErrorText: string;
    passwordRequirementsText?: string;
    signUpButton: string;
    registeredUser?: string;
    loginLink: string;
  };
}

const propsCallback: GetServerSideProps<SignUpProps> = async () => {
  const storeName = 'Horizon';
  return {
    props: {
      storeName,
      title: `${storeName} | Create account`,
      text: {
        signUpTitle: 'Create account',
        firstNameLabel: 'First name',
        firstNameEmptyErrorText: 'First name is required',
        firstNamePlaceholder: 'Enter your first name',
        lastNameLabel: 'Last name',
        lastNameEmptyErrorText: 'Last name is required',
        lastNamePlaceholder: 'Enter your last name',
        emailLabel: 'Email',
        emailEmptyErrorText: 'Email is required',
        emailInvalidErrorText: 'Email format is invalid',
        emailPlaceholder: 'Enter your email',
        passwordLabel: 'Password',
        passwordEmptyErrorText: 'Password is required',
        passwordInvalidErrorText:
          'Your password needs to be at least 6 characters.',
        passwordPlaceholder: 'Enter your password',
        serverErrorText: 'Internal server error',
        emailTakenErrorText: 'There is already an account with this email',
        passwordRequirementsText: 'Must include a minimum of 6 characters.',
        signUpButton: 'Create account',
        registeredUser: 'Already have an account?',
        loginLink: 'Log in',
      },
    },
  };
};

export const getServerSideProps = withAuthLayout(propsCallback);

const SignUpPage: NextPageWithLayout<
  ServerSideProps<typeof getServerSideProps>
> = ({ text, title, metaTitle, metaDescription }) => {
  const router = useRouter();
  const fetchApi = useFetchApi();
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
          message: text.emailTakenErrorText,
        });
        return false;
      } else if (res.status !== 200) {
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
      [ACCOUNT_FIELD.FIRST_NAME]: {
        field: ACCOUNT_FIELD.FIRST_NAME,
        message: text.firstNameEmptyErrorText,
      },
      [ACCOUNT_FIELD.LAST_NAME]: {
        field: ACCOUNT_FIELD.LAST_NAME,
        message: text.lastNameEmptyErrorText,
      },
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
        message: text.passwordInvalidErrorText,
      });
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
  }, [email, password, firstName, lastName, text]);

  const completeCallback = useCallback(() => {
    setError(undefined);
    router.push('/account/orders');
  }, [router]);

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
                {text.signUpTitle}
              </h1>
            </legend>
            <div className="mt-8">
              <p>
                <label
                  className="text-xs font-semibold uppercase text-primary"
                  htmlFor="first-name">
                  {text.firstNameLabel}
                </label>
                <Input
                  id="first-name"
                  type="text"
                  aria-required
                  aria-invalid={firstNameError}
                  aria-errormessage={firstNameError ? error.message : undefined}
                  error={firstNameError}
                  placeholder={text.firstNamePlaceholder}
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
                  {text.lastNameLabel}
                </label>
                <Input
                  id="last-name"
                  type="text"
                  aria-required
                  aria-invalid={lastNameError}
                  aria-errormessage={lastNameError ? error.message : undefined}
                  error={lastNameError}
                  placeholder={text.lastNamePlaceholder}
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
                  minLength={6}
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
                {text.passwordRequirementsText && (
                  <p className="mt-2 text-2xs text-primary">
                    {text.passwordRequirementsText}
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
                {text.signUpButton}
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
