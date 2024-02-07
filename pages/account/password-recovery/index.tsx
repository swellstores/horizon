import { useCallback, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import type { GetServerSideProps } from 'next';
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
import { ACCOUNT_FIELD } from 'types/account';
import { validateNonEmptyFields } from 'utils/validation';
import useFetchApi from 'hooks/useFetchApi';
import useI18n, { I18n } from 'hooks/useI18n';

const passwordRecoveryText = (i18n: I18n) => ({
  pageTitle: i18n('account.password_recovery.page_title'),
  title: i18n('account.password_recovery.title'),
  subtitle: i18n('account.password_recovery.subtitle'),
  email: {
    label: i18n('account.password_recovery.email.label'),
    emptyErrorText: i18n('account.password_recovery.email.empty_error_text'),
    invalidErrorText: i18n(
      'account.password_recovery.email.invalid_error_text',
    ),
    placeholder: i18n('account.password_recovery.email.placeholder'),
  },
  submitButtonLabel: i18n('account.password_recovery.submit_button_label'),
  backToLoginLink: i18n('account.password_recovery.back_to_login_link'),
  errors: {
    server: i18n('account.password_recovery.errors.server'),
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

export const getStaticProps = withAuthLayout(propsCallback);

const PasswordRecoveryPage: NextPageWithLayout<PageProps> = ({
  metaTitle,
  metaDescription,
}) => {
  const i18n = useI18n();
  const text = passwordRecoveryText(i18n);
  const router = useRouter();
  const fetchApi = useFetchApi();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<{
    field: ACCOUNT_FIELD;
    message: string;
  }>();
  const otherError = error?.field === ACCOUNT_FIELD.OTHER;
  const emailError = error?.field === ACCOUNT_FIELD.EMAIL || otherError;
  const emailInputRef = useRef<HTMLInputElement>(null);
  const loginLinkHref = `${
    router.locale !== router.defaultLocale ? `/${router.locale}` : ''
  }/account/login`;

  const backToLoginText = i18n('account.password_recovery.back_to_login_text', {
    loginLink: `<a class="font-bold hover:underline" href='${loginLinkHref}'>${text.backToLoginLink}</a>`,
  });
  const responseCallback = useCallback(
    (res: Response) => {
      if (res.status !== 200) {
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
    };

    const requiredFields = {
      [ACCOUNT_FIELD.EMAIL]: email,
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
  }, [email, text]);

  const completeCallback = useCallback(() => {
    setError(undefined);
    router.push('/account/password-recovery/check-email');
  }, [router]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      await fetchApi(
        {
          url: API_ROUTES.PASSWORD_RECOVERY,
          options: {
            method: 'POST',
            body: JSON.stringify({ email }),
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

              <p
                className="mt-4 text-center text-sm text-primary md:mt-6"
                dangerouslySetInnerHTML={{ __html: backToLoginText }}
              />
            </div>
          </div>
        </fieldset>
      </form>
    </article>
  );
};

PasswordRecoveryPage.getLayout = getAuthLayout;

export default PasswordRecoveryPage;
