import { isSessionTokenValid } from './authentication';
import type { GetServerSidePropsContext, Redirect } from 'next';
import type { AuthLayoutProps } from 'page_layouts/AuthLayout';
import type { MainLayoutProps } from 'page_layouts/MainLayout';
import { getClientWithSessionToken, getRawClient } from 'lib/graphql/client';
import { getStoreSettings } from 'lib/shop/fetchingFunctions';

type GetPropsResult<P> =
  | { props: P | Promise<P> }
  | { redirect: Redirect }
  | { notFound: true };

type GetProps<P> = (
  context: never,
) => GetPropsResult<P> | Promise<GetPropsResult<P>>;

type GetPropsType<T> = T extends GetProps<infer P> ? P : never;

type DecoratorFunctionReturn<T, P extends GetProps<unknown>> = Promise<
  GetPropsResult<T & GetPropsType<P>>
>;

export function withMainLayout<C extends GetProps<unknown>>(callback: C) {
  return async (
    context: Record<string, unknown>,
  ): DecoratorFunctionReturn<{ _layout: MainLayoutProps }, C> => {
    const result = (await callback(context as never)) as any;

    if (!result.props) {
      return result;
    }

    const settings = await getStoreSettings();

    return {
      ...result,
      props: {
        ...result.props,
        _layout: {
          settings,
        },
      },
    };
  };
}

export function withAuthLayout<C extends GetProps<unknown>>(callback: C) {
  return async (
    context: Record<string, unknown>,
  ): DecoratorFunctionReturn<{ _layout: AuthLayoutProps }, C> => {
    const result = (await callback(context as never)) as any;

    if (!result.props) {
      return result;
    }

    const editorData = await import('mock/editor.json');

    return {
      ...result,
      props: {
        ...result.props,
        _layout: {
          header: editorData.account_header,
        },
      },
    };
  };
}

export function withAuthentication<C extends GetProps<unknown>>(callback: C) {
  return async (
    context: GetServerSidePropsContext,
  ): Promise<GetPropsResult<C>> => {
    const { sessionToken } = context.req.cookies;
    const rawClient = getRawClient();
    if (
      !sessionToken ||
      !(await isSessionTokenValid(sessionToken, rawClient))
    ) {
      return {
        redirect: {
          destination: '/account/login',
          permanent: false,
        },
      };
    }

    return (await callback(context as never)) as GetPropsResult<C>;
  };
}

export function withAccountLayout<C extends GetProps<unknown>>(callback: C) {
  return async (
    context: Record<string, unknown>,
  ): DecoratorFunctionReturn<{ _layout: MainLayoutProps }, C> => {
    const result = (await callback(context as never)) as any;
    const client = getClientWithSessionToken(
      (context?.req as GetServerSidePropsContext['req'])?.cookies,
    );

    const {
      data: { account },
    } = await client.getAccountDetails();

    if (!result.props) {
      return result;
    }

    const editorData = await import('mock/editor.json');

    const { pageTitle } = result.props;

    return {
      ...result,
      props: {
        ...result.props,
        _layout: {
          header: {
            ...editorData.account_header,
            pageTitle,
            accountDetails: account,
          },
        },
      },
    };
  };
}
