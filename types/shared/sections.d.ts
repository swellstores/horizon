import type { SPACING } from 'lib/globals/sizings';
import type * as PropMappers from 'lib/editor/prop_mappers';

export interface PageSectionSpacing {
  horizontal_spacing: SPACING;
  vertical_spacing: SPACING;
}

export type ContentBlockMapper<T extends object> = {
  [key in keyof T]?:
    | keyof typeof PropMappers
    | {
        mapper: keyof typeof PropMappers;
        /** Specify if the editor response has a different id for this field to map it correctly to the props */
        sourceKey?: string;
      };
};

export interface ContentBlockComponent<T extends object> extends React.FC<T> {
  propMaps?: ContentBlockMapper<T>;
  quizPropMaps?: ContentBlockMapper<T>;
}

export interface ContentBlockComponentWithRef<T extends object>
  extends React.ForwardRefExoticComponent<
    T & React.RefAttributes<HTMLElement>
  > {
  propMaps?: ContentBlockMapper<T>;
}
