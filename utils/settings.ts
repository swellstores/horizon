import { isNotNull } from 'lib/utils/denullify';
import type { HeaderProps, MenuItem } from 'components/organisms/Header/Header';
import type { Maybe, SwellSettingsMenus } from 'lib/graphql/generated/sdk';
import type { Colors, Typography, Settings, Borders } from 'stores/settings';
import type { Column, FooterProps } from 'components/organisms/Footer/Footer';
import type { EditorArray } from 'types/editor';
import { generateId } from 'lib/utils/shared_functions';

function getMenu(menuId: string, menuSettings?: Maybe<SwellSettingsMenus>) {
  return menuSettings?.sections?.find((section) => section?.id === menuId);
}

function formatMenuItems(items: any): EditorArray<MenuItem> {
  return items
    ?.map((item: any) => {
      switch (item.type) {
        case 'product': {
          const link = `/products/${item.value?.slug ?? ''}`;
          return { id: generateId(), label: item.name, link };
        }
        case 'content': {
          if (!item.value) return null;

          const label = item.name;
          const link = `/${item.value.slug ?? ''}`;
          return { id: generateId(), label, link };
        }
        case 'category': {
          if (!item.value) return null;

          const label = item.name;
          const link = `/categories/${item.value.slug ?? ''}`;
          return { id: generateId(), label, link };
        }
      }

      return null;
    })
    .filter(isNotNull);
}

function formatColumns(items: any): Column[] {
  const columns: Column[] = [];
  items.forEach((item: any) => {
    if (item.type === 'column') {
      const foundHeading = item.items.find(
        (i: { name: string; type: string }) => i.type === 'heading',
      );
      const heading = foundHeading?.name ?? null;
      const items = formatMenuItems(item.items);
      columns.push({ heading, items });
    }
  });
  return columns;
}

export function formatStoreSettings(
  storeName: string,
  settings: any,
  menuSettings?: Maybe<SwellSettingsMenus>,
): Settings {
  const header = settings.header;
  const headerMenu = getMenu(header.menu, menuSettings);

  const footer = settings.footer;
  const footerMenu = getMenu(footer.menu, menuSettings);
  const secondaryFooterMenu = getMenu(footer.secondaryMenu, menuSettings);

  const formattedFooterMenu: Column[] = formatColumns(footerMenu?.items ?? []);

  const formattedSecondaryFooterMenu = formatMenuItems(
    secondaryFooterMenu?.items ?? [],
  );

  const formattedHeader: HeaderProps = {
    storeName,
    announcementText: header.announcementText ?? null,
    menu: headerMenu?.items ?? null,
    hideOnScroll: header.hideOnScroll ?? null,
    showAnnouncementBar: header.showAnnouncementBar ?? null,
    logo: header?.logo?.file
      ? {
          src: header.logo.file.url ?? '',
          alt: storeName ?? 'Logo',
          width: header.logo.file.width ?? 0,
          height: header.logo.file.height ?? 0,
          contentType: header.logo.file.contentType ?? '',
        }
      : null,
    logoHeight:
      header?.logoHeight?.desktop && header.logoHeight.mobile
        ? {
            desktop: header.logoHeight.desktop ?? 30,
            mobile: header.logoHeight.mobile ?? 20,
          }
        : null,
  };

  const formattedFooter: FooterProps = {
    menu: formattedFooterMenu,
    secondaryMenu: formattedSecondaryFooterMenu,
    showSocials: footer.showSocials ?? null,
    showPayments: footer.showPayments ?? null,
    copyrightText: footer.copyrightText ?? null,
    showNewsletter: footer.showNewsletter ?? null,
    newsletterTitle: footer.newsletterTitle ?? null,
    newsletterPlaceholder: footer.newsletterPlaceholder ?? null,
    horizontalPadding: footer.horizontalPadding ?? null,
  };

  return {
    colors: settings?.colors ?? ({} as Colors),
    typography:
      settings?.typography ??
      ({
        fontSize: {
          base: 16,
          scaling: 1.125,
        },
      } as Typography),
    borders:
      settings?.borders ??
      ({
        image: {
          radius: 20,
        },
      } as Borders),
    header: formattedHeader,
    footer: formattedFooter,
    socialLinks: settings.socialLinks ?? [],
  };
}
