import * as PropMappers from './prop_mappers';
import CategoriesPreview from 'components/molecules/CategoriesPreview';
import ProductsPreview from 'components/molecules/ProductsPreview';
import FullWidthMedia from 'components/molecules/FullWidthMedia';
import HeadingWithText from 'components/molecules/HeadingWithText';
import MultiplePanels from 'components/molecules/MultiplePanels';
import ReviewsSection from 'components/organisms/Footer/ReviewsSection';
import Divider from 'components/atoms/Divider';
import TextSection from 'components/molecules/TextSection';
import ListSection from 'components/molecules/ListSection';
import BlogListing from 'components/molecules/BlogListing';
import BlockQuote from 'components/atoms/BlockQuote';
import Figure from 'components/atoms/Figure';
import TextImageBlock from 'components/molecules/TextImageBlock';
import MultipleFeatures from 'components/molecules/MultipleFeatures';
import Memberships from 'components/molecules/Memberships';
import PressMentionCarousel from 'components/molecules/PressMentionCarousel';
import BlogCarousel from 'components/molecules/BlogCarousel';
import type { ContentBlockComponent } from 'types/shared/sections';

export interface PageSection {
  /**
   * ID of the section
   */
  id: string;
  /**
   * Section component type
   */
  type: PAGE_SECTION_COMPONENT;
  /**
   * Props for the component. The validity of the types should be checked server-side
   */
  [key: string]: unknown;

  /**
   * Original props for the component before they are mapped.
   * Used in the editor to achieve live updates.
   */
  _originalProps?: {
    [key: string]: unknown;
  };
}

export enum PAGE_SECTION_COMPONENT {
  DIVIDER = 'divider',
  FULL_WIDTH_MEDIA = 'full_width_media',
  CATEGORIES_PREVIEW = 'categories_preview',
  HEADING_WITH_TEXT = 'heading_with_text',
  MULTIPLE_PANELS = 'multiple_panels',
  REVIEWS_SECTION = 'reviews',
  PRODUCTS_PREVIEW = 'products_preview',
  TEXT_SECTION = 'text',
  LIST_SECTION = 'list',
  BLOG_LISTING = 'blog_listing',
  BLOCK_QUOTE = 'block_quote',
  FIGURE = 'figure',
  TEXT_IMAGE_BLOCK = 'text_image_block',
  MULTIPLE_FEATURES = 'multiple_features',
  MEMBERSHIPS = 'memberships',
  PRESS_MENTION_CAROUSEL = 'press_mention_carousel',
  BLOG_CAROUSEL = 'blog_carousel',
}

export function getComponentFromType<T extends object = object>(
  type: PAGE_SECTION_COMPONENT,
) {
  let component: ContentBlockComponent<T> | null;

  switch (type) {
    case PAGE_SECTION_COMPONENT.DIVIDER:
      component = Divider as ContentBlockComponent<object>;
      break;
    case PAGE_SECTION_COMPONENT.FULL_WIDTH_MEDIA:
      component = FullWidthMedia as ContentBlockComponent<object>;
      break;
    case PAGE_SECTION_COMPONENT.CATEGORIES_PREVIEW:
      component = CategoriesPreview as ContentBlockComponent<object>;
      break;
    case PAGE_SECTION_COMPONENT.HEADING_WITH_TEXT:
      component = HeadingWithText as ContentBlockComponent<object>;
      break;
    case PAGE_SECTION_COMPONENT.MULTIPLE_PANELS:
      component = MultiplePanels as ContentBlockComponent<object>;
      break;
    case PAGE_SECTION_COMPONENT.REVIEWS_SECTION:
      component = ReviewsSection as ContentBlockComponent<object>;
      break;
    case PAGE_SECTION_COMPONENT.PRODUCTS_PREVIEW:
      component = ProductsPreview as ContentBlockComponent<object>;
      break;
    case PAGE_SECTION_COMPONENT.TEXT_SECTION:
      component = TextSection as ContentBlockComponent<object>;
      break;
    case PAGE_SECTION_COMPONENT.LIST_SECTION:
      component = ListSection as ContentBlockComponent<object>;
      break;
    case PAGE_SECTION_COMPONENT.BLOG_LISTING:
      component = BlogListing as ContentBlockComponent<object>;
      break;
    case PAGE_SECTION_COMPONENT.BLOCK_QUOTE:
      component = BlockQuote as ContentBlockComponent<object>;
      break;
    case PAGE_SECTION_COMPONENT.FIGURE:
      component = Figure as unknown as ContentBlockComponent<object>;
      break;
    case PAGE_SECTION_COMPONENT.TEXT_IMAGE_BLOCK:
      component = TextImageBlock as ContentBlockComponent<object>;
      break;
    case PAGE_SECTION_COMPONENT.MULTIPLE_FEATURES:
      component = MultipleFeatures as ContentBlockComponent<object>;
      break;
    case PAGE_SECTION_COMPONENT.MEMBERSHIPS:
      component = Memberships as ContentBlockComponent<object>;
      break;
    case PAGE_SECTION_COMPONENT.PRESS_MENTION_CAROUSEL:
      component = PressMentionCarousel as ContentBlockComponent<object>;
      break;
    case PAGE_SECTION_COMPONENT.BLOG_CAROUSEL:
      component = BlogCarousel as ContentBlockComponent<object>;
      break;
    default: {
      component = null;
    }
  }

  return component;
}

export const applyPropMappers = async (
  component: ContentBlockComponent<{
    [key: string]: unknown;
  }>,
  props: Record<string, unknown>,
) => {
  if (!component.propMaps) return props;

  const mappedProps: typeof props = {};

  // Modify the props using the prop mapper function and add them to the mappedProps object
  for (const [key, propMap] of Object.entries(component.propMaps)) {
    if (!propMap) continue;

    let mappingFunction: (...props: unknown[]) => unknown | Promise<unknown>;
    let propKey: string;

    if (typeof propMap === 'string') {
      mappingFunction = PropMappers[propMap] as typeof mappingFunction;
      propKey = key;
    } else {
      const { mapper, sourceKey = key } = propMap;

      mappingFunction = PropMappers[mapper] as typeof mappingFunction;
      propKey = sourceKey;
    }

    if (!props[propKey] || !mappingFunction) continue;

    mappedProps[key] = await mappingFunction(props[propKey]);
  }

  return mappedProps;
};

export const mapSectionProps = async (
  sections: unknown[],
): Promise<PageSection[]> => {
  if (!Array.isArray(sections)) return [];

  const mappedSections: PageSection[] = [];

  for (const section of sections as Partial<PageSection>[]) {
    if (!section || typeof section !== 'object') continue;

    // Get the data from the editor
    const { id, type, ...props } = section as PageSection;

    if (!id || !type) continue;

    // Get the component based on the type of the content block
    const component = getComponentFromType<typeof props>(type);

    // If the component does not specify propMaps, don't modify the section
    if (!component?.propMaps) {
      mappedSections.push({ id, type, ...props });
      continue;
    }

    // Modify the props using the prop mapper function and add them to the mappedProps object
    const mappedProps = await applyPropMappers(component, props);

    const newSection = { id, type, ...props, ...mappedProps };

    // Store the original props to be used in the editor for live editing
    if (process.env.NEXT_PUBLIC_SWELL_EDITOR === 'true') {
      newSection._originalProps = props;
    }

    // Finally, push the section replacing the original props with the mapped ones
    mappedSections.push(newSection);
  }

  return mappedSections;
};
