import AccountHeader, {
  AccountHeaderProps,
} from 'components/templates/AccountHeader';
import { useEffect } from 'react';
import useSettingsStore, { Settings } from 'stores/settings';

export interface AuthLayoutProps {
  header: AccountHeaderProps;
  settings: Settings;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  header,
  settings,
}) => {
  const setSettings = useSettingsStore((state) => state.setSettings);

  // Stores settings retrieved server-side on the client-side store.
  useEffect(() => {
    if (settings) {
      setSettings(settings);
    }
  }, [setSettings, settings]);
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr]">
      <AccountHeader {...header} />
      <main className="mx-auto w-full max-w-screen-3xl">{children}</main>
    </div>
  );
};

export default AuthLayout;
