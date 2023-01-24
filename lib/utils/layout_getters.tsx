import AccountLayout from 'page_layouts/AccountLayout';
import AuthLayout from 'page_layouts/AuthLayout';
import MainLayout from 'page_layouts/MainLayout';
import type { ReactElement } from 'react';

export const getMainLayout = (page: ReactElement) => {
  const { settings, currencies, locales } = page.props._layout ?? {};

  if (!settings || !currencies || !locales) return page;

  return <MainLayout {...page.props._layout}>{page}</MainLayout>;
};

export const getAccountLayout = (page: ReactElement) => {
  const { pageType } = page.props;
  const { settings } = page.props._layout ?? {};

  if (!settings || !pageType) return page;

  return (
    <AccountLayout {...page.props._layout} pageType={pageType}>
      {page}
    </AccountLayout>
  );
};

export const getAuthLayout = (page: ReactElement) => {
  const { settings } = page.props._layout ?? {};

  if (!settings) return page;

  return <AuthLayout {...page.props._layout}>{page}</AuthLayout>;
};
