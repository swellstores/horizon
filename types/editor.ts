import type { PageSection } from 'lib/editor/sections';
import type { Maybe } from 'lib/graphql/generated/sdk';

export type EditorPageOutput =
  | {
      published?: Maybe<boolean>;
      name?: Maybe<string>;
      slug?: Maybe<string>;
      sections?: Maybe<Maybe<PageSection>[]>;
      date_created?: Maybe<string>;
      date_updated?: Maybe<string>;
      meta_description?: Maybe<string>;
      meta_title?: Maybe<string>;
      id?: Maybe<string>;
    }
  | undefined;

export interface EditorImage {
  file: {
    id: string | null;
    date_uploaded: string | null;
    length: number | null;
    md5: string | null;
    filename: string | null;
    metadata: string | null;
    content_type: string | null;
    url: string | null;
    width: number | null;
    height: number | null;
  } | null;
}

export type EditorCategoryList = {
  id: string;
  category_id: string;
}[];

export enum EDITOR_MESSAGE_TYPE {
  SETTINGS_UPDATE = 'settings.updated',
}

export type EditorArray<T extends object> = Array<T & { id: string }>;
