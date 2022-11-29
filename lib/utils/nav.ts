import type { AccountNavLinkProps } from 'components/atoms/AccountNavLink';
import {
  NavItem,
  NAV_CONTENT_MODEL,
  NAV_ITEM_TYPE,
  URL_TARGET,
} from 'types/nav';

export const links: AccountNavLinkProps[] = [
  {
    label: 'Orders & Returns',
    link: '/account/orders',
  },
  {
    label: 'Subscriptions',
    link: '/account/subscriptions',
  },
];

export function getHref(item: NavItem) {
  switch (item.type) {
    case NAV_ITEM_TYPE.CATEGORY:
      return item.value?.slug ? `/categories/${item.value?.slug}` : `/products`;
    case NAV_ITEM_TYPE.PRODUCT:
      return `/products/${item.value?.slug ?? ''}`;
    case NAV_ITEM_TYPE.CONTENT:
      switch (item.model) {
        case NAV_CONTENT_MODEL.PAGES:
          return `/${item.value?.slug ?? ''}`;
        case NAV_CONTENT_MODEL.QUIZZES:
          return `/quiz/${item.value?.id ?? ''}`;
        default:
          return '#';
      }
    case NAV_ITEM_TYPE.URL:
      return item.value ?? '#';
    case NAV_ITEM_TYPE.HEADING:
      return '#';
    case NAV_ITEM_TYPE.HOME:
      return '/';
    default:
      return '#';
  }
}

export function getTarget(item: NavItem) {
  switch (item.type) {
    case NAV_ITEM_TYPE.URL:
      return item.options?.target ?? URL_TARGET.NONE;
    default:
      return URL_TARGET.NONE;
  }
}
