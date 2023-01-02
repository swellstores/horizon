import React, { useEffect } from 'react';
import Sidebar from 'components/organisms/Sidebar';
import AccountHeader, {
  AccountHeaderProps,
} from 'components/templates/AccountHeader';
import { links } from 'lib/utils/nav';
import type { Settings } from 'stores/settings';
import useSettingsStore from 'stores/settings';

export interface AccountLayoutProps {
  header: AccountHeaderProps;
  settings: Settings;
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
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
    <div>
      <AccountHeader {...header} mobileMenuLinks={links} />
      <div className="p-6 md:flex md:gap-20 md:px-14 md:pt-16 md:pb-12">
        <Sidebar links={links} accountDetails={header.accountDetails} />
        <main className="flex-grow">{children}</main>
      </div>
    </div>
  );
};

export default AccountLayout;
