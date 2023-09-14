import { useEffect } from 'react';
import Cart from 'components/organisms/Cart';
import Footer from 'components/organisms/Footer';
import Header from 'components/organisms/Header';
import useCartStore from 'stores/cart';
import useSettingsStore, { Settings } from 'stores/settings';
import useLocaleStore from 'stores/locale';
import useCurrencyStore from 'stores/currency';
import type { Locale } from 'types/shared/locale';
import type { Currency } from 'types/shared/currency';

export interface MainLayoutProps {
  settings: Settings;
  locales: Locale[];
  currencies: Currency[];
  currency: Currency;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  settings,
  currencies,
  currency,
  locales,
}) => {
  const cart = useCartStore((store) => store.cart);

  const [setSettings, headerSettings, footerSettings, socialLinks] =
    useSettingsStore((state) => [
      state.setSettings,
      state.settings?.header,
      state.settings?.footer,
      state.settings?.socialLinks,
    ]);

  const setCurrency = useCurrencyStore((state) => state.setCurrency);
  const setCurrencies = useCurrencyStore((state) => state.setCurrencies);
  const setLocales = useLocaleStore((state) => state.setLocales);

  // Stores settings retrieved server-side on the client-side store.
  useEffect(() => {
    if (settings && currencies && locales) {
      setSettings(settings);
      setCurrencies(currencies);
      setCurrency(currency);
      setLocales(locales);
    }
  }, [
    setSettings,
    setCurrencies,
    setCurrency,
    setLocales,
    settings,
    currencies,
    currency,
    locales,
  ]);

  return (
    <div>
      <Cart {...cart} />
      <div className="grid min-h-screen grid-rows-[auto_1fr]">
        <Header {...(headerSettings ?? settings.header)} />
        <div className="overflow-hidden">
          <main className="mx-auto w-full max-w-screen-3xl ">{children}</main>
          <Footer
            {...(footerSettings ?? settings.footer)}
            socialLinks={socialLinks}
          />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
