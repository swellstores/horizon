import { useRef, useState } from 'react';
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

enum ERROR_FIELD {
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  EMAIL = 'email',
  PASSWORD = 'password',
  OTHER = 'other',
}

const SignUpPage: NextPageWithLayout<
  ServerSideProps<typeof getServerSideProps>
> = ({ text, title, metaTitle, metaDescription }) => {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
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

          if (password.length < 6) {
            return setError({
              field: ERROR_FIELD.PASSWORD,
              message: text.passwordInvalidErrorText,
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

            const res = await fetch(API_ROUTES.SIGN_UP, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email,
                password,
                firstName,
                lastName,
              }),
            });

            fetching.current = false;

            if (res.status === 409) {
              return setError({
                field: ERROR_FIELD.OTHER,
                message: text.emailTakenErrorText,
              });
            } else if (res.status !== 200) {
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
                  aria-invalid={
                    error?.field === ERROR_FIELD.FIRST_NAME ||
                    error?.field === ERROR_FIELD.OTHER
                  }
                  aria-errormessage={
                    error?.field === ERROR_FIELD.FIRST_NAME ||
                    error?.field === ERROR_FIELD.OTHER
                      ? error.message
                      : undefined
                  }
                  error={error?.field === ERROR_FIELD.FIRST_NAME}
                  placeholder={text.firstNamePlaceholder}
                  value={firstName}
                  onChange={(e) => {
                    setError(undefined);
                    setFirstName(e.currentTarget.value);
                  }}
                />
                {error?.field === ERROR_FIELD.FIRST_NAME && (
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
                  aria-invalid={
                    error?.field === ERROR_FIELD.LAST_NAME ||
                    error?.field === ERROR_FIELD.OTHER
                  }
                  aria-errormessage={
                    error?.field === ERROR_FIELD.LAST_NAME ||
                    error?.field === ERROR_FIELD.OTHER
                      ? error.message
                      : undefined
                  }
                  error={error?.field === ERROR_FIELD.LAST_NAME}
                  placeholder={text.lastNamePlaceholder}
                  value={lastName}
                  onChange={(e) => {
                    setError(undefined);
                    setLastName(e.currentTarget.value);
                  }}
                />
                {error?.field === ERROR_FIELD.LAST_NAME && (
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
                  minLength={6}
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
                {text.passwordRequirementsText && (
                  <p className="mt-2 text-2xs text-primary">
                    {text.passwordRequirementsText}
                  </p>
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
                {text.signUpButton}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm text-primary">
              {text.registeredUser && <span>{text.registeredUser}&nbsp;</span>}

              <Link href="/account/login">
                <a className="underline">{text.loginLink}</a>
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
