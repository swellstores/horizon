import type { GetServerSideProps, NextPage } from 'next';
import type { ReactElement } from 'react';

export interface PageProps {
  title?: string;
  metaTitle?: string;
  metaDescription?: string;
}

export type NextPageWithLayout<T = { children?: ReactElement }> =
  NextPage<T> & {
    getLayout?: (page: ReactElement) => ReactElement;
  };

export type ServerSideProps<T extends GetServerSideProps> =
  (T extends GetServerSideProps<infer Props>
    ? {
        props: Props;
      }
    : never)['props'];
