import AccountHeader from 'components/templates/AccountHeader';
import { useEffect } from 'react';
import useSettingsStore, { Settings } from 'stores/settings';
import { formatAccountHeaderSettings } from 'utils/settings';

export interface AuthLayoutProps {
  settings: Settings;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, settings }) => {
  const [storeSettings, setSettings] = useSettingsStore((state) => [
    state.settings,
    state.setSettings,
  ]);
  const header = formatAccountHeaderSettings(storeSettings);

  // Stores settings retrieved server-side on the client-side store.
  useEffect(() => {
    if (settings) {
      setSettings(settings);
    }
  }, [setSettings, settings]);
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr]">
      {header && <AccountHeader {...header} />}
      <main className="mx-auto w-full max-w-screen-3xl">{children}</main>
    </div>
  );
};

export default AuthLayout;
