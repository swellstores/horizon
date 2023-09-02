import Head from 'next/head';
import type { GetServerSideProps } from 'next';
import { getAuthLayout } from 'lib/utils/layout_getters';
import { withAuthLayout } from 'lib/utils/fetch_decorators';
import type { NextPageWithLayout, PageProps } from 'types/shared/pages';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import PasswordInput from 'components/molecules/PasswordInput';
import ValidationErrorText from 'components/atoms/ValidationErrorText';
import BannerInfo, { BANNER_INFO_STYLE } from 'components/atoms/BannerInfo';
import { TEXT_ALIGNMENT } from 'types/shared/alignment';
import { BUTTON_TYPE } from 'types/shared/button';
import Button from 'components/atoms/Button';
import { API_ROUTES } from 'types/shared/api';
import { ACCOUNT_FIELD } from 'types/account';
import { validateNonEmptyFields } from 'utils/validation';
import useFetchApi from 'hooks/useFetchApi';
import useI18n, { I18n } from 'hooks/useI18n';

const setNewPasswordText = (i18n: I18n) => ({
  pageTitle: i18n('account.set_new_password.page_title'),
  title: i18n('account.set_new_password.title'),
  subtitle: i18n('account.set_new_password.subtitle'),
  confirmPassword: {
    emptyErrorText: i18n(
      'account.set_new_password.confirm_password.empty_error_text',
    ),
    label: i18n('account.set_new_password.confirm_password.label'),
    placeholder: i18n('account.set_new_password.confirm_password.placeholder'),
  },
  password: {
    emptyErrorText: i18n('account.set_new_password.password.empty_error_text'),
    label: i18n('account.set_new_password.password.label'),
    placeholder: i18n('account.set_new_password.password.placeholder'),
    requirementsText: i18n(
      'account.set_new_password.password.requirements_text',
    ),
    invalidErrorText: i18n(
      'account.set_new_password.password.invalid_error_text',
    ),
  },
  submitButtonLabel: i18n('account.set_new_password.submit_button_label'),
  errors: {
    passwordMismatch: i18n('account.set_new_password.errors.password_mismatch'),
    server: i18n('account.set_new_password.errors.server'),
  },
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

const SetPasswordPage: NextPageWithLayout<PageProps> = ({
  metaTitle,
  metaDescription,
}) => {
  const i18n = useI18n();
  const text = setNewPasswordText(i18n);
  const router = useRouter();
  const fetchApi = useFetchApi();
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState<{
    field: ACCOUNT_FIELD;
    message: string;
  }>();
  const otherError = error?.field === ACCOUNT_FIELD.OTHER;
  const passwordError = error?.field === ACCOUNT_FIELD.PASSWORD || otherError;
  const confirmPasswordError =
    error?.field === ACCOUNT_FIELD.CONFIRM_PASSWORD || otherError;

  const responseCallback = useCallback(
    (res: Response) => {
      if (res.status === 401) {
        router.push('/account/set-password/expired');
        return false;
      } else if (res.status !== 200) {
        setError({
          field: ACCOUNT_FIELD.OTHER,
          message: text.errors.server,
        });
        return false;
      }
    },
    [text, router],
  );

  const errorCallback = useCallback(() => {
    setError({
      field: ACCOUNT_FIELD.OTHER,
      message: text.errors.server,
    });
  }, [text]);

  const validationCallback = useCallback(() => {
    const requiredErrorPayloads = {
      [ACCOUNT_FIELD.PASSWORD]: {
        field: ACCOUNT_FIELD.PASSWORD,
        message: text.password.emptyErrorText,
      },
      [ACCOUNT_FIELD.CONFIRM_PASSWORD]: {
        field: ACCOUNT_FIELD.CONFIRM_PASSWORD,
        message: text.confirmPassword.emptyErrorText,
      },
    };

    const requiredFields = {
      [ACCOUNT_FIELD.PASSWORD]: password,
      [ACCOUNT_FIELD.CONFIRM_PASSWORD]: passwordConfirmation,
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

    if (password !== passwordConfirmation) {
      setError({
        field: ACCOUNT_FIELD.CONFIRM_PASSWORD,
        message: text.errors.passwordMismatch,
      });
      return false;
    }
  }, [password, passwordConfirmation, text]);

  const completeCallback = useCallback(() => {
    setError(undefined);
    router.push('/account/set-password/success');
  }, [router]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      await fetchApi(
        {
          url: API_ROUTES.SET_PASSWORD,
          options: {
            method: 'POST',
            body: JSON.stringify({
              key: window.location.pathname.split('/').pop(),
              password: password,
            }),
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
                {error?.field === ACCOUNT_FIELD.PASSWORD ? (
                  <ValidationErrorText>{error.message}</ValidationErrorText>
                ) : (
                  <span className="mt-2 text-2xs text-body">
                    {text.password.requirementsText}
                  </span>
                )}
              </p>
              <p className="mt-4">
                <label
                  className="text-xs font-semibold uppercase text-primary"
                  htmlFor="confirm-password">
                  {text.confirmPassword.label}
                </label>
                <PasswordInput
                  id="confirm-password"
                  aria-required
                  aria-invalid={confirmPasswordError}
                  aria-errormessage={
                    confirmPasswordError ? error.message : undefined
                  }
                  error={confirmPasswordError}
                  placeholder={text.confirmPassword.placeholder}
                  value={passwordConfirmation}
                  onChange={(e) => {
                    setError(undefined);
                    setPasswordConfirmation(e.currentTarget.value);
                  }}
                />
                {error?.field === ACCOUNT_FIELD.CONFIRM_PASSWORD && (
                  <ValidationErrorText>{error.message}</ValidationErrorText>
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
                {text.submitButtonLabel}
              </Button>
            </div>
          </div>
        </fieldset>
      </form>
    </article>
  );
};

SetPasswordPage.getLayout = getAuthLayout;

export default SetPasswordPage;
