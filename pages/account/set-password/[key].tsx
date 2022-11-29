import Head from 'next/head';
import type { GetServerSideProps } from 'next';
import { getAuthLayout } from 'lib/utils/layout_getters';
import { withAuthLayout } from 'lib/utils/fetch_decorators';
import type { NextPageWithLayout, PageProps } from 'types/shared/pages';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import PasswordInput from 'components/molecules/PasswordInput';
import ValidationErrorText from 'components/atoms/ValidationErrorText';
import BannerInfo, { BANNER_INFO_STYLE } from 'components/atoms/BannerInfo';
import { TEXT_ALIGNMENT } from 'types/shared/alignment';
import { BUTTON_TYPE } from 'types/shared/button';
import Button from 'components/atoms/Button';
import { API_ROUTES } from 'types/shared/api';

interface SetPasswordProps extends PageProps {
  text: {
    title: string;
    subtitle?: string;
    passwordLabel: string;
    passwordEmptyErrorText: string;
    passwordPlaceholder?: string;
    passwordInvalidErrorText: string;
    confirmPasswordLabel: string;
    confirmPasswordEmptyErrorText: string;
    confirmPasswordPlaceholder?: string;
    submitButtonLabel: string;
    passwordRequirementsText: string;
    passwordMismatchErrorText: string;
    serverErrorText: string;
  };
}

const propsCallback: GetServerSideProps<SetPasswordProps> = async () => {
  const storeName = 'Horizon';
  return {
    props: {
      storeName,
      title: `${storeName} | Set new password`,
      text: {
        title: 'Set new password',
        subtitle: 'Please enter your new password.',
        confirmPasswordEmptyErrorText: 'Please fill out this field',
        confirmPasswordLabel: 'Confirm password',
        confirmPasswordPlaceholder: 'Confirm your password',
        passwordEmptyErrorText: 'Please fill out this field',
        passwordLabel: 'Password',
        passwordPlaceholder: 'Enter your password',
        passwordRequirementsText: 'Must include a minimum of 6 characters',
        passwordInvalidErrorText: 'Your password must be at least 6 characters',
        submitButtonLabel: 'Set password',
        passwordMismatchErrorText: 'Passwords do not match',
        serverErrorText: 'Something went wrong',
      },
    },
  };
};

export const getServerSideProps = withAuthLayout(propsCallback);

enum ERROR_FIELD {
  PASSWORD = 'password',
  CONFIRM_PASSWORD = 'confirm_password',
  OTHER = 'other',
}

const LoginPage: NextPageWithLayout<SetPasswordProps> = ({
  text,
  title,
  metaTitle,
  metaDescription,
}) => {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState<{
    field: ERROR_FIELD;
    message: string;
  }>();

  const fetching = useRef(false);

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

          if (passwordConfirmation === '') {
            return setError({
              field: ERROR_FIELD.CONFIRM_PASSWORD,
              message: text.confirmPasswordEmptyErrorText,
            });
          }

          if (password !== passwordConfirmation) {
            return setError({
              field: ERROR_FIELD.CONFIRM_PASSWORD,
              message: text.passwordMismatchErrorText,
            });
          }

          try {
            fetching.current = true;

            const res = await fetch(API_ROUTES.SET_PASSWORD, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                key: window.location.pathname.split('/').pop(),
                password: password,
              }),
            });

            fetching.current = false;

            if (res.status === 401) {
              return router.push('/account/set-password/expired');
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

          router.push('/account/set-password/success');
        }}>
        <fieldset className="flex h-full w-full flex-1 flex-col justify-between">
          <div>
            <legend className="w-full text-center">
              <h1 className="font-headings text-2xl font-semibold text-primary md:text-5xl">
                {text.title}
              </h1>
              {text.subtitle && (
                <p className="mt-6 text-center font-headings text-sm text-body">
                  {text.subtitle}
                </p>
              )}
            </legend>
            <div className="mt-8">
              <p>
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
                {error?.field === ERROR_FIELD.PASSWORD ? (
                  <ValidationErrorText>{error.message}</ValidationErrorText>
                ) : (
                  <span className="mt-2 text-2xs text-body">
                    {text.passwordRequirementsText}
                  </span>
                )}
              </p>
              <p className="mt-4">
                <label
                  className="text-xs font-semibold uppercase text-primary"
                  htmlFor="confirm-password">
                  {text.confirmPasswordLabel}
                </label>
                <PasswordInput
                  id="confirm-password"
                  aria-required
                  aria-invalid={
                    error?.field === ERROR_FIELD.CONFIRM_PASSWORD ||
                    error?.field === ERROR_FIELD.OTHER
                  }
                  aria-errormessage={
                    error?.field === ERROR_FIELD.CONFIRM_PASSWORD ||
                    error?.field === ERROR_FIELD.OTHER
                      ? error.message
                      : undefined
                  }
                  error={error?.field === ERROR_FIELD.CONFIRM_PASSWORD}
                  placeholder={text.confirmPasswordPlaceholder}
                  value={passwordConfirmation}
                  onChange={(e) => {
                    setError(undefined);
                    setPasswordConfirmation(e.currentTarget.value);
                  }}
                />
                {error?.field === ERROR_FIELD.CONFIRM_PASSWORD && (
                  <ValidationErrorText>{error.message}</ValidationErrorText>
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
            </div>
          </div>
        </fieldset>
      </form>
    </article>
  );
};

LoginPage.getLayout = getAuthLayout;

export default LoginPage;
