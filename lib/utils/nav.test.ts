import {
  NavItem,
  NAV_CONTENT_MODEL,
  NAV_ITEM_TYPE,
  URL_TARGET,
} from 'types/nav';
import { QuizEditorLayoutType } from 'types/shared/quiz';
import { getHref, getTarget } from './nav';

describe('getHref', () => {
  describe('when item is a category', () => {
    it('should return a category url if the slug is present', () => {
      const item: NavItem = {
        type: NAV_ITEM_TYPE.CATEGORY,
        name: 'Test category',
        value: {
          slug: 'test-category',
        },
      };
      expect(getHref(item)).toBe('/categories/test-category');
    });

    it('should return a url to all products if no slug is present', () => {
      const item: NavItem = {
        type: NAV_ITEM_TYPE.CATEGORY,
        name: 'Test category',
        value: {},
      };
      expect(getHref(item)).toBe('/products');
    });

    it('should return a url to all products if no value is present', () => {
      const item: NavItem = {
        type: NAV_ITEM_TYPE.CATEGORY,
        name: 'Test category',
      };

      expect(getHref(item)).toBe('/products');
    });
  });

  describe('when item is a product', () => {
    it('should return a product url if the slug is present', () => {
      const item: NavItem = {
        type: NAV_ITEM_TYPE.PRODUCT,
        name: 'Test product',
        value: {
          slug: 'test-product',
        },
      };
      expect(getHref(item)).toBe('/products/test-product');
    });

    it('should return a url to all products if no slug is present', () => {
      const item: NavItem = {
        type: NAV_ITEM_TYPE.PRODUCT,
        name: 'Test product',
        value: {},
      };
      expect(getHref(item)).toBe('/products/');
    });

    it('should return a url to all products if no value is present', () => {
      const item: NavItem = {
        type: NAV_ITEM_TYPE.PRODUCT,
        name: 'Test product',
      };

      expect(getHref(item)).toBe('/products/');
    });
  });

  describe('when item is of type content', () => {
    it('should return a url to a page if the slug is present', () => {
      const item: NavItem = {
        type: NAV_ITEM_TYPE.CONTENT,
        name: 'Test page',
        model: NAV_CONTENT_MODEL.PAGES,
        value: {
          slug: 'test-page',
        },
      };
      expect(getHref(item)).toBe('/test-page');
    });

    it('should return a url to a quiz if the id is present', () => {
      const item: NavItem = {
        type: NAV_ITEM_TYPE.CONTENT,
        name: 'Test quiz',
        model: NAV_CONTENT_MODEL.QUIZZES,
        value: {
          id: 'test-quiz',
          layout: QuizEditorLayoutType.MULTIPLE_PAGE,
          results_page: [],
        },
      };
      expect(getHref(item)).toBe('/quiz/test-quiz');
    });
  });

  it("should return the value if it's of url type", () => {
    const item: NavItem = {
      type: NAV_ITEM_TYPE.URL,
      name: 'Test url',
      value: 'https://swell.is/',
    };
    expect(getHref(item)).toBe('https://swell.is/');
  });

  it("should return an empty url if it's a heading", () => {
    const item: NavItem = {
      type: NAV_ITEM_TYPE.HEADING,
      name: 'Test heading',
    };
    expect(getHref(item)).toBe('#');
  });

  it("should link to the homepage if it's of home type", () => {
    const item: NavItem = {
      type: NAV_ITEM_TYPE.HOME,
      name: 'Home',
    };
    expect(getHref(item)).toBe('/');
  });

  it("should return an empty url if it's an unknown or unsupported type", () => {
    const item: NavItem = {
      type: 'anything-else' as any,
      name: 'Test item',
    };
    expect(getHref(item)).toBe('#');
  });
});

describe('getTarget', () => {
  it('should return "_blank" as a target if it\'s specified on the options', () => {
    const item: NavItem = {
      type: NAV_ITEM_TYPE.URL,
      name: 'Test url',
      options: {
        target: URL_TARGET.BLANK,
      },
    };
    expect(getTarget(item)).toBe('_blank');
  });

  it('should return a none target', () => {
    const item: NavItem = {
      type: NAV_ITEM_TYPE.CATEGORY,
      name: 'Test category',
      value: {
        slug: 'test-category',
      },
    };
    const item2: NavItem = {
      type: NAV_ITEM_TYPE.URL,
      name: 'Test url',
    };

    expect(getTarget(item)).toBe('');
    expect(getTarget(item2)).toBe('');
  });
});
