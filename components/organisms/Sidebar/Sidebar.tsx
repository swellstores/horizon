import React from 'react';
import NavMenu from 'components/molecules/AccountNavMenu';
import Button from 'components/atoms/Button';
import { BUTTON_STYLE, BUTTON_TYPE } from 'types/shared/button';
import type { AccountNavLinkProps } from 'components/atoms/AccountNavLink';
import useLogout from 'hooks/useLogout';
import AccountDetails, {
  AccountDetailsProps,
} from 'components/atoms/AccountDetails';

export interface SidebarProps {
  links: AccountNavLinkProps[];
  accountDetails: AccountDetailsProps;
}

const TheSidebar: React.FC<SidebarProps> = ({ links, accountDetails }) => {
  const logout = useLogout();
  return (
    <aside className="hidden h-full min-w-[275px] md:block">
      <div
        className="fixed flex h-full flex-col items-start justify-between gap-4 overflow-auto"
        style={{ maxHeight: 'min(50vh, 520px)' }}>
        <div>
          <AccountDetails {...accountDetails} />
        </div>
        <NavMenu links={links} />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            logout();
          }}
          className="mt-auto">
          {/* TODO: i18n */}
          <Button
            elType={BUTTON_TYPE.BUTTON}
            buttonStyle={BUTTON_STYLE.SECONDARY}
            type="submit"
            small>
            Logout
          </Button>
        </form>
      </div>
    </aside>
  );
};

export default TheSidebar;
