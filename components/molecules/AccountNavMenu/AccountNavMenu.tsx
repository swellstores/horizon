import React from 'react';
import NavLink from 'components/atoms/AccountNavLink';
import type { AccountNavLinkProps } from 'components/atoms/AccountNavLink';
import { useRouter } from 'next/router';

export interface AccountNavMenuProps {
  links: AccountNavLinkProps[];
}

const AccountNavMenu: React.FC<AccountNavMenuProps> = ({ links }) => {
  const router = useRouter();

  return (
    <nav>
      <ul className="flex flex-col gap-4">
        {links.map(({ link, label }) => (
          <li key={`${label}-${link}`}>
            <NavLink
              link={link}
              label={label}
              active={router.pathname.includes(link)}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AccountNavMenu;
