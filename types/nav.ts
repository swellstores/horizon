import type { Maybe } from 'graphql/jsutils/Maybe';
import type { EditorImage, EditorPageOutput } from './editor';
import type { QuizEditorProps } from './shared/quiz';

export enum NAV_ITEM_TYPE {
  CATEGORY = 'category',
  PRODUCT = 'product',
  CONTENT = 'content',
  HEADING = 'heading',
  URL = 'url',
  HOME = 'home',
}

export enum NAV_CONTENT_MODEL {
  PAGES = 'content/pages',
  QUIZZES = 'content/quizzes',
}

export enum URL_TARGET {
  BLANK = '_blank',
  NONE = '',
}

export type NavColumn = {
  type: 'column';
  items?: Maybe<Maybe<NavItem>>[];
};

export type WithOptions<T extends Record<string, unknown>> =
  T['options'] extends undefined ? T & { options?: undefined } : T;

export type WithModel<T extends Record<string, unknown>> =
  T['model'] extends undefined ? T & { model?: undefined } : T;

export type WithValue<T extends Record<string, unknown>> =
  T['value'] extends undefined ? T & { value?: undefined } : T;

export type WithOptionalProperties<T extends Record<string, unknown>> =
  WithOptions<WithModel<WithValue<T>>>;

export type ProductItemValue = {
  id?: Maybe<string>;
  currency?: Maybe<string>;
  description?: Maybe<string>;
  images?: Maybe<EditorImage[]>;
  name?: Maybe<string>;
  price?: Maybe<number>;
  sale?: Maybe<boolean>;
  slug?: Maybe<string>;
  salePrice?: Maybe<number>;
};

export type CategoryItemValue = {
  id?: Maybe<string>;
  description?: Maybe<string>;
  images?: Maybe<EditorImage[]>;
  name?: Maybe<string>;
  slug?: Maybe<string>;
};

export type CategoryNavItem = {
  name: string;
  type: NAV_ITEM_TYPE.CATEGORY;
  preview?: boolean;
  value?: CategoryItemValue;
};

export type ProductNavItem = {
  name: string;
  type: NAV_ITEM_TYPE.PRODUCT;
  preview?: boolean;
  value?: ProductItemValue;
};

export type HeadingNavItem = {
  name: string;
  type: NAV_ITEM_TYPE.HEADING;
};

export type PageNavItem = {
  name: string;
  type: NAV_ITEM_TYPE.CONTENT;
  model?: NAV_CONTENT_MODEL.PAGES;
  value?: EditorPageOutput;
};

export type QuizNavItem = {
  name: string;
  type: NAV_ITEM_TYPE.CONTENT;
  model?: NAV_CONTENT_MODEL.QUIZZES;
  value?: QuizEditorProps;
};

export type UrlNavItem = {
  name: string;
  type: NAV_ITEM_TYPE.URL;
  options?: {
    target?: URL_TARGET;
  };
  value?: string;
};

export type HomeNavItem = {
  name: string;
  type: NAV_ITEM_TYPE.HOME;
};

export type NavItem = WithOptionalProperties<
  | CategoryNavItem
  | ProductNavItem
  | HeadingNavItem
  | PageNavItem
  | QuizNavItem
  | UrlNavItem
  | HomeNavItem
>;

export type RootNavItem = NavItem & {
  items?: Maybe<Maybe<NavColumn>[]>;
};
