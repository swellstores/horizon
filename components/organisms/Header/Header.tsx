import React, { useState, useEffect, useCallback } from 'react';
import { Root as NavigationMenuRoot } from '@radix-ui/react-navigation-menu';
import AnnouncementBar from 'components/atoms/AnnouncementBar';
import Navbar from 'components/molecules/Navbar';
import MobileMenu from 'components/molecules/MobileMenu';
import SearchMenu from 'components/molecules/SearchMenu';
import { MegaMenuPopup } from 'components/molecules/MegaMenu';
import useClassNames from 'hooks/useClassNames';
import { useRouter } from 'next/router';
import type { MandatoryImageProps } from 'types/global';
import type { RootNavItem } from 'types/nav';

export interface MenuItem {
  label: string;
  link: string;
}

export enum MENU_TYPE {
  MOBILE = 'mobile',
  SEARCH = 'search',
}

const MENU_ENTER_DELAY = {
  [MENU_TYPE.MOBILE]: 1000,
  [MENU_TYPE.SEARCH]: 700,
};

export interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  showAnnouncementBar: boolean | null;
  announcementText: string | null;
  storeName: string | null;
  menu: RootNavItem[] | null;
  hideOnScroll: boolean | null;
  logo:
    | (MandatoryImageProps & {
        contentType: string;
      })
    | null;
  logoHeight: {
    mobile: number;
    desktop: number;
  } | null;
}

const Header: React.FC<HeaderProps> = ({
  showAnnouncementBar,
  announcementText,
  menu,
  hideOnScroll,
  storeName,
  logo,
  logoHeight,
}) => {
  const [openMenu, setOpenMenu] = useState<MENU_TYPE>();
  const [shouldHide, setShouldHide] = useState(false);
  const [openMenuDelay, setOpenMenuDelay] = useState<number | undefined>();
  const router = useRouter();

  const onOpenMenuChange = useCallback(
    (menu: MENU_TYPE | undefined) => {
      const delay = openMenu ? MENU_ENTER_DELAY[openMenu] : undefined;
      setOpenMenuDelay(delay);
      setOpenMenu(menu);
    },
    [openMenu],
  );

  const classNames = useClassNames(
    'sticky top-0 left-0 z-header w-full font-headings transform transition-transform duration-500 ease-in-out',
    { '-translate-y-full': shouldHide && !openMenu },
  );

  useEffect(() => {
    const SCROLL_OFFSET = 200;
    let prevScrollY = 0;

    function handleScroll() {
      const { scrollY } = window;
      if (Math.abs(scrollY - prevScrollY) < SCROLL_OFFSET) return;
      window.requestAnimationFrame(() => {
        setShouldHide(scrollY > prevScrollY);
        prevScrollY = scrollY;
      });
    }

    if (hideOnScroll) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (hideOnScroll) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [hideOnScroll]);

  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      onOpenMenuChange(undefined);
    });
  }, [onOpenMenuChange, router]);

  return (
    <>
      <header className={classNames}>
        {showAnnouncementBar && !!announcementText && (
          <AnnouncementBar content={announcementText} />
        )}
        <MobileMenu
          items={menu}
          show={openMenu === MENU_TYPE.MOBILE}
          openDelay={openMenuDelay}
        />
        <NavigationMenuRoot>
          <Navbar
            menu={menu ?? []}
            openMenu={openMenu}
            setOpenMenu={onOpenMenuChange}
            storeName={storeName ?? ''}
            logo={logo}
            logoHeight={logoHeight}
          />
          <SearchMenu
            show={openMenu === MENU_TYPE.SEARCH}
            closeMenu={() => onOpenMenuChange(undefined)}
            openDelay={openMenuDelay}
          />
          <MegaMenuPopup />
        </NavigationMenuRoot>
      </header>
      {openMenu && (
        <button
          aria-label="Close"
          onClick={() => onOpenMenuChange(undefined)}
          className="fixed inset-0 z-50 opacity-0 outline-none focus:outline-none"
          style={{
            WebkitBackfaceVisibility: 'hidden',
            WebkitTapHighlightColor: 'transparent',
          }}
        />
      )}
    </>
  );
};

export default Header;
