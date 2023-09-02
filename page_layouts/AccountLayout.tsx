import React, { useEffect } from 'react';
import Sidebar from 'components/organisms/Sidebar';
import AccountHeader from 'components/templates/AccountHeader';
import { accountLinks } from 'utils/lang';
import type { Settings } from 'stores/settings';
import useSettingsStore from 'stores/settings';
import { pageTitleMap } from 'utils/lang';
import type { AccountPageProps } from 'types/shared/pages';
import useI18n from 'hooks/useI18n';
import { formatAccountHeaderSettings } from 'utils/settings';
import type { SwellAccount } from 'lib/graphql/generated/sdk';

export interface AccountLayoutProps extends Pick<AccountPageProps, 'pageType'> {
  settings: Settings;
  accountDetails: Pick<SwellAccount, 'name' | 'email'>;
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  children,
  settings,
  accountDetails,
  pageType,
}) => {
  const [storeSettings, setSettings] = useSettingsStore((state) => [
    state.settings,
    state.setSettings,
  ]);
  const i18n = useI18n();
  const links = accountLinks(i18n);
  const header = formatAccountHeaderSettings(storeSettings);

  // Stores settings retrieved server-side on the client-side store.
  useEffect(() => {
    if (settings) {
      setSettings(settings);
    }
  }, [setSettings, settings]);
  return (
    <div>
      {header && (
        <AccountHeader
          {...header}
          pageTitle={pageTitleMap(i18n)[pageType]}
          mobileMenuLinks={links}
        />
      )}
      <div className="p-6 md:flex md:gap-20 md:px-14 md:pb-12 md:pt-16">
        <Sidebar links={links} accountDetails={accountDetails} />
        <main className="flex-grow">{children}</main>
      </div>
    </div>
  );
};

export default AccountLayout;
