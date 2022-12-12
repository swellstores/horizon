import type { SwellAccount } from 'lib/graphql/generated/sdk';
import React from 'react';

export type AccountDetailsProps = Pick<SwellAccount, 'name' | 'email'>;

const AccountDetails: React.FC<AccountDetailsProps> = ({ name, email }) => {
  return (
    <>
      {name && <p className="mb-1 text-md font-bold text-primary">{name}</p>}
      {email && <p className="text-xs text-primary">{email}</p>}
    </>
  );
};

export default AccountDetails;
