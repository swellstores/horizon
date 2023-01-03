import React from 'react';
import NavMenu from 'components/molecules/AccountNavMenu';
import Button from 'components/atoms/Button';
import { BUTTON_STYLE, BUTTON_TYPE } from 'types/shared/button';
import type { AccountNavLinkProps } from 'components/atoms/AccountNavLink';
import useLogout from 'hooks/useLogout';
import AccountDetails, {
  AccountDetailsProps,
} from 'components/atoms/AccountDetails';
import { fallbackString } from 'utils/text';
import useSettingsStore from 'stores/settings';

export interface SidebarProps {
  links: AccountNavLinkProps[];
  accountDetails: AccountDetailsProps;
}

const TheSidebar: React.FC<SidebarProps> = ({ links, accountDetails }) => {
  const lang = useSettingsStore((state) => state.settings?.lang);
  const logoutLabel = fallbackString(lang?.account?.logout?.label, 'Log out');

  const logout = useLogout();

  return (
    <aside className="hidden h-full min-w-[275px] md:block">
      <div className="fixed flex h-full flex-col items-start overflow-auto">
        <div className="mb-10">
          <AccountDetails {...accountDetails} />
        </div>
        <NavMenu links={links} />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            logout();
          }}
          className="mt-20">
          <Button
            elType={BUTTON_TYPE.BUTTON}
            buttonStyle={BUTTON_STYLE.SECONDARY}
            type="submit"
            small>
            {logoutLabel}
          </Button>
        </form>
      </div>
    </aside>
  );
};

export default TheSidebar;
