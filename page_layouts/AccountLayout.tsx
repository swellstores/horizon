import React from 'react';
import Sidebar from 'components/organisms/Sidebar';
import AccountHeader, {
  AccountHeaderProps,
} from 'components/templates/AccountHeader';
import { links } from 'lib/utils/nav';

export interface AccountLayoutProps {
  header: AccountHeaderProps;
}

const AccountLayout: React.FC<AccountLayoutProps> = ({ children, header }) => (
  <div>
    <AccountHeader {...header} mobileMenuLinks={links} />
    <div className="p-6 md:flex md:gap-20 md:px-14 md:pt-16 md:pb-12">
      {/* <MobileMenu className="block md:hidden" */}
      <Sidebar links={links} accountDetails={header.accountDetails} />
      <main className="flex-grow">{children}</main>
    </div>
  </div>
);

export default AccountLayout;
