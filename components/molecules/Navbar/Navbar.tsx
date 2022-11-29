import React from 'react';
import Link from 'next/link';
import ShoppingBag from 'components/atoms/ShoppingBag';
import CurrencySelect from 'components/atoms/CurrencySelect';
import LocaleSelect from 'components/atoms/LocaleSelect';
import { MENU_TYPE } from 'components/organisms/Header';
import BurgerIcon from 'assets/icons/burger.svg';
import CloseIcon from 'assets/icons/close.svg';
import AccountIcon from 'assets/icons/account.svg';
import SearchIcon from 'assets/icons/search.svg';
import useCartStore from 'stores/cart';
import Logo, { LogoProps } from 'components/atoms/Logo';
import useClassNames from 'hooks/useClassNames';
import type { RootNavItem } from 'types/nav';
import MegaMenu from 'components/molecules/MegaMenu';

export interface NavbarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<LogoProps, 'className' | 'wrapperElementTag' | 'href' | 'onClick'> {
  menu: RootNavItem[] | null;
  openMenu: MENU_TYPE | undefined;
  setOpenMenu: (OpenMenu: MENU_TYPE | undefined) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  menu = [],
  logo,
  logoHeight,
  openMenu,
  setOpenMenu,
  storeName = 'Horizon',
}) => {
  const [cartVisible, hideCart, showCart, itemsQuantity] = useCartStore(
    (store) => [
      store.cart.visible,
      store.hideCart,
      store.showCart,
      store.cart.items.reduce((acc, item) => acc + item.quantity, 0),
    ],
  );

  const logoClassNames = useClassNames(
    'absolute lg:static lg:translate-x-0 lg:justify-self-center transition-all duration-[400ms] ease-in-out',
    {
      'left-5': openMenu === MENU_TYPE.MOBILE,
      'left-1/2 -translate-x-1/2': openMenu !== MENU_TYPE.MOBILE,
    },
  );

  return (
    <div className="bg-background-primary">
      <div className="relative mx-auto grid max-w-screen-3xl grid-cols-3 items-center py-5 px-4 text-primary lg:px-10 lg:py-6">
        {/* Mobile burger icon */}
        <button
          className={`justify-self-start transition-opacity duration-300 ease-in-out lg:hidden ${
            openMenu === MENU_TYPE.MOBILE ? 'opacity-0' : 'opacity-100'
          }`}
          onClick={() => setOpenMenu(MENU_TYPE.MOBILE)}>
          <BurgerIcon className="h-4 w-5" />
        </button>

        {/* Desktop nav links */}
        <MegaMenu className="z-10" items={menu ?? []} />

        <Link href="/" passHref>
          <a className={logoClassNames}>
            <Logo logo={logo} logoHeight={logoHeight} storeName={storeName} />
          </a>
        </Link>

        {/* right-side icons */}
        <div
          className={`col-start-3 flex items-center justify-end gap-5 justify-self-end transition-transform duration-300 ease-in-out ${
            openMenu ? '-translate-x-10 lg:translate-x-0' : ''
          }`}>
          <LocaleSelect className="hidden lg:inline-block" />
          <CurrencySelect className="hidden lg:inline-block" />
          <Link href="/account/orders">
            <a className="hidden lg:inline-block">
              <AccountIcon className="w-5" />
            </a>
          </Link>
          <button
            onClick={() => setOpenMenu(MENU_TYPE.SEARCH)}
            className={`transition-opacity duration-300 ${
              openMenu === MENU_TYPE.SEARCH
                ? 'pointer-events-none opacity-0 lg:pointer-events-auto lg:opacity-100'
                : 'pointer-events-auto opacity-100'
            }`}>
            <SearchIcon className="h-5 w-5" />
          </button>
          <ShoppingBag
            itemQuantity={itemsQuantity}
            onClick={() => {
              if (cartVisible) {
                hideCart();
              } else {
                showCart();
              }
            }}
          />
        </div>

        {/* close button */}
        <button
          className={`absolute right-4 transition-opacity duration-300 lg:hidden ${
            openMenu
              ? 'pointer-events-auto opacity-100'
              : 'pointer-events-none opacity-0'
          }`}
          onClick={() => setOpenMenu(undefined)}>
          <CloseIcon className="h-5 w-5 text-primary" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
