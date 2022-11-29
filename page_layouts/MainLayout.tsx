import { useEffect } from 'react';
import Cart from 'components/organisms/Cart';
import Footer from 'components/organisms/Footer';
import Header from 'components/organisms/Header';
import useCartStore from 'stores/cart';
import useSettingsStore, { Settings } from 'stores/settings';

export interface MainLayoutProps {
  settings: Settings;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, settings }) => {
  const cart = useCartStore((store) => store.cart);

  const [setSettings, headerSettings, footerSettings, socialLinks] =
    useSettingsStore((state) => [
      state.setSettings,
      state.settings?.header,
      state.settings?.footer,
      state.settings?.socialLinks,
    ]);

  // Stores settings retrieved server-side on the client-side store.
  useEffect(() => {
    if (settings) {
      setSettings(settings);
    }
  }, [setSettings, settings]);

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
