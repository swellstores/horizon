const MainLayout = dynamic(() => import('page_layouts/MainLayout'));
const AccountLayout = dynamic(() => import('page_layouts/AccountLayout'));
import dynamic from 'next/dynamic';
import AuthLayout from 'page_layouts/AuthLayout';
import type { ReactElement } from 'react';

export const getMainLayout = (page: ReactElement) => {
  const { settings } = page.props._layout ?? {};

  if (!settings) return page;

  return <MainLayout settings={settings}>{page}</MainLayout>;
};

export const getAccountLayout = (page: ReactElement) => {
  const { header } = page.props._layout ?? {};

  if (!header) return page;

  return <AccountLayout header={header}>{page}</AccountLayout>;
};

export const getAuthLayout = (page: ReactElement) => {
  const { header } = page.props._layout ?? {};

  if (!header) return page;

  return <AuthLayout header={header}>{page}</AuthLayout>;
};
