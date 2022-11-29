import React from 'react';
import Link from 'next/link';
import useClassNames from 'hooks/useClassNames';

export interface AccountNavLinkProps {
  label: string;
  link: string;
  active?: boolean;
}

const AccountNavLink: React.FC<AccountNavLinkProps> = ({
  link,
  label,
  active,
}) => (
  <Link href={link}>
    <a
      className={useClassNames(
        'decoration-skip-ink-none text-md text-body hover:underline md:font-bold md:text-primary',
        {
          underline: !!active,
        },
      )}>
      {label}
    </a>
  </Link>
);

export default AccountNavLink;
