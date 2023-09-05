import React, { useState, useEffect } from 'react';
import useClassNames from 'hooks/useClassNames';
import { useRouter } from 'next/router';
import ArrowLeft from 'assets/icons/arrow-left.svg';
import Link from 'next/link';
import AccountMobileMenu from 'components/organisms/AccountMobileMenu';
import type { AccountNavLinkProps } from 'components/atoms/AccountNavLink';
import AccountDetails, {
  AccountDetailsProps,
} from 'components/atoms/AccountDetails';
import useI18n from 'hooks/useI18n';
import Logo, { LogoProps } from 'components/atoms/Logo';

export interface AccountHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  hideOnScroll: boolean;
  logoSettings: LogoProps;
  mobileMenuLinks?: AccountNavLinkProps[];
  pageTitle?: string;
  accountDetails?: AccountDetailsProps;
}

const AccountHeader: React.FC<AccountHeaderProps> = ({
  hideOnScroll,
  logoSettings,
  pageTitle,
  mobileMenuLinks,
  accountDetails,
}) => {
  const [shouldHide, setShouldHide] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const router = useRouter();
  const i18n = useI18n();

  const backToShopLabel = i18n('navigation.account_return_home');

  const classNames = useClassNames(
    'sticky top-0 left-0 z-header w-full font-headings bg-background-primary transform transition-transform duration-500 ease-in-out',
    {
      '-translate-y-full': shouldHide && !showMobileMenu,
      'shadow-3xl md:shadow-none': !!(pageTitle && mobileMenuLinks),
    },
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
    const callback = () => {
      setShowMobileMenu(false);
    };
    router.events.on('routeChangeComplete', callback);

    return () => {
      router.events.off('routeChangeComplete', callback);
    };
  }, [router.events, setShowMobileMenu]);

  return (
    <>
      <header className={classNames}>
        <div className="grid grid-cols-3 items-center border-b border-dividers py-[1.125rem]">
          <div className="md:ml-6 lg:ml-14">
            <Link href="/">
              <a className="hidden items-center gap-2 md:flex">
                <ArrowLeft width={16} height={16} className="text-primary" />
                <span className="text-sm font-semibold text-primary">
                  {backToShopLabel}
                </span>
              </a>
            </Link>
          </div>
          <Link href="/">
            <a className="absolute left-1/2 -translate-x-1/2 transition-all duration-[400ms] ease-in-out lg:static lg:translate-x-0 lg:justify-self-center">
              <Logo {...logoSettings} />
            </a>
          </Link>
        </div>
        {accountDetails && (
          <div className="px-6 pb-6 pt-4 md:hidden">
            <AccountDetails {...accountDetails} />
          </div>
        )}
        {!!pageTitle && !!mobileMenuLinks && (
          // TODO: Make MobileMenu visibility be controlled by showMobileMenu state
          <AccountMobileMenu label={pageTitle} links={mobileMenuLinks} />
        )}
      </header>
    </>
  );
};

export default AccountHeader;
