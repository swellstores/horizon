import React, { useCallback } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import CategoryDisplay from 'components/atoms/CategoryDisplay';
import ProductDisplay from 'components/molecules/ProductDisplay';
import { getHref, getTarget } from 'lib/utils/nav';
import { NavItem, NAV_ITEM_TYPE, RootNavItem } from 'types/nav';

const defaultLinkClasses = 'font-medium uppercase text-primary';

export interface MegaMenuProps extends NavigationMenu.NavigationMenuListProps {
  items: RootNavItem[];
}

const MegaMenu: React.FC<MegaMenuProps> = ({ items, ...props }) => {
  const getNavItem = useCallback((item: RootNavItem, index: number) => {
    if (!item.items?.length) {
      return <MenuLink key={index} item={item} />;
    }

    return (
      <NavigationMenu.Trigger key={index} className={defaultLinkClasses}>
        {item.name}
      </NavigationMenu.Trigger>
    );
  }, []);

  const getExpandedMenuItem = useCallback((item: NavItem, index: number) => {
    const defaultLink = (
      <li>
        <MenuLink
          key={index}
          item={item}
          className="text-md font-normal text-primary"
        />
      </li>
    );

    switch (item.type) {
      case NAV_ITEM_TYPE.CATEGORY:
        if (!item.value?.slug) return defaultLink;

        return (
          <li>
            <CategoryDisplay
              key={index}
              href={`/categories/${item.value?.slug}`}
              image={{
                src: item.value?.images?.[0]?.file?.url ?? '',
                alt: item.value?.name ?? '',
                width: item.value?.images?.[0]?.file?.width ?? 0,
                height: item.value?.images?.[0]?.file?.height ?? 0,
              }}
              title={item.value?.name ?? ''}
              description={item.value?.description ?? undefined}
            />
          </li>
        );

      case NAV_ITEM_TYPE.PRODUCT:
        if (!item.value?.slug) return defaultLink;

        return (
          <li>
            <ProductDisplay
              key={index}
              product={{
                id: item.value.id ?? '',
                href: `/products/${item.value.slug}`,
                image: {
                  src: item.value.images?.[0]?.file?.url ?? '',
                  alt: item.value.name ?? '',
                  width: item.value.images?.[0]?.file?.width ?? 0,
                  height: item.value.images?.[0]?.file?.height ?? 0,
                },
                title: item.value.name ?? '',
                description: item.value.description ?? '',
                price: item.value.price ?? undefined,
              }}
            />
          </li>
        );

      case NAV_ITEM_TYPE.HEADING:
        return (
          <li
            key={index}
            className="font-headings text-md font-semibold uppercase text-primary">
            {item.name}
          </li>
        );

      default:
        return defaultLink;
    }
  }, []);

  return (
    <NavigationMenu.List
      {...props}
      className={`hidden flex-wrap items-center gap-x-10 gap-y-4 justify-self-start bg-background-primary text-md text-primary lg:flex ${
        props.className ?? ''
      }`}>
      {items.map((item, index) => (
        <NavigationMenu.Item key={index}>
          {/* Top-level navbar item */}
          {getNavItem(item, index)}
          {/* Popup content if the nav item is of type trigger */}
          <NavigationMenu.Content
            className={`
                  bg-background-primary py-8 px-14
                  radix-motion-from-end:animate-enter-from-right
                  radix-motion-from-start:animate-enter-from-left
                  radix-motion-to-end:animate-exit-to-right
                  radix-motion-to-start:animate-exit-to-left
          `}>
            {/* Popup columns */}
            <ul
              className="grid gap-x-12 gap-y-4"
              style={{
                gridTemplateColumns: `repeat(${
                  item?.items?.length ?? 4
                }, minmax(0, 1fr))`,
              }}>
              {/* In case the top-level nav item is both a trigger and a link, the link is duplicated
                  within the popup to both keep it and not break accessibility */}
              {getHref(item) !== '#' && (
                <li className="col-span-full">
                  <MenuLink item={item} />
                </li>
              )}
              {/* Column items */}
              {item.items?.map((column, index) => (
                <ul key={index} className="flex flex-col gap-2">
                  {column?.items?.map(
                    (item, index) => !!item && getExpandedMenuItem(item, index),
                  )}
                </ul>
              ))}
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      ))}
    </NavigationMenu.List>
  );
};

export default MegaMenu;

const MenuLink: React.FC<{ item: RootNavItem; className?: string }> = ({
  item,
  className,
}) => (
  <NavigationMenu.Link
    className={className ? className : defaultLinkClasses}
    href={getHref(item)}
    target={getTarget(item)}>
    {item.name}
  </NavigationMenu.Link>
);

/* Popup wrapper, exported to be placed in the intended
  position in the DOM 
*/
export const MegaMenuPopup: React.FC = () => (
  <NavigationMenu.Viewport
    className={`
      absolute max-h-[85vh] w-full origin-[top_center] 
      overflow-auto drop-shadow-xl 
      transition-[width_height] duration-300
      h-radix-navigation-menu-viewport 
      radix-state-closed:animate-scale-out-content radix-state-open:animate-scale-in-content
    `}
  />
);
