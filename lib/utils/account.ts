import type { Maybe } from 'lib/graphql/generated/sdk';

interface Address {
  name?: Maybe<string>;
  address1?: Maybe<string>;
  address2?: Maybe<string>;
  city?: Maybe<string>;
  state?: Maybe<string>;
  zip?: Maybe<string>;
  country?: Maybe<string>;
}

export const getMultilineAddress = (addressObject: Address) =>
  addressObject?.address1 ||
  addressObject?.address2 ||
  addressObject?.city ||
  addressObject?.state ||
  addressObject?.zip ||
  addressObject?.country
    ? `${addressObject?.name ? `${addressObject.name}` : ''}${
        addressObject?.address1 ||
        addressObject?.address2 ||
        addressObject?.city ||
        addressObject?.state
          ? `<br>${addressObject.address1}${
              addressObject?.address2 ? `, ${addressObject.address2}` : ''
            }${
              addressObject?.city || addressObject?.state
                ? `, ${addressObject?.city ?? ''}${
                    addressObject?.state ? ` ${addressObject.state}` : ''
                  }`
                : ''
            }`
          : ''
      }${
        addressObject?.zip || addressObject?.country
          ? `<br>${addressObject?.zip ?? ''}${
              addressObject?.country ? ` ${addressObject.country}` : ''
            }`
          : ''
      }`
    : null;
