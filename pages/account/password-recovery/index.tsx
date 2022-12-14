import { useCallback, useRef, useState } from 'react';
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
import { ACCOUNT_FIELD } from 'types/account';
import { validateNonEmptyFields } from 'utils/validation';
import useFetchApi from 'hooks/useFetchApi';

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
        backToLoginLink: 'Log in',
        serverErrorText: 'Something went wrong',
      },
    },
  };
};

export const getStaticProps = withAuthLayout(propsCallback);

const PasswordRecoveryPage: NextPageWithLayout<PasswordRecoveryProps> = ({
  text,
  title,
  metaTitle,
  metaDescription,
}) => {
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

  const responseCallback = useCallback(
    (res: Response) => {
      if (res.status !== 200) {
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
        message: text.emailInvalidErrorText,
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

              <p className="mt-4 text-center text-sm text-primary md:mt-6">
                {text.backToLoginText && <>{text.backToLoginText}&nbsp;</>}
                <Link href="/account/login">
                  <a className="font-bold hover:underline">
                    {text.backToLoginLink}
                  </a>
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
