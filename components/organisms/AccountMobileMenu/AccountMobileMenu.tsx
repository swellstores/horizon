import React from 'react';
import Link from 'next/link';
import { Disclosure, Transition } from '@headlessui/react';
import ChevronDown from 'assets/icons/chevron-down.svg';
import type { AccountNavMenuProps } from 'components/molecules/AccountNavMenu';
import useLogout from 'hooks/useLogout';
import useI18n from 'hooks/useI18n';

export interface AccountMobileMenuProps extends AccountNavMenuProps {
  label: string;
}

const AccountMobileMenu: React.FC<AccountMobileMenuProps> = ({
  label,
  links,
}) => {
  const i18n = useI18n();
  const logoutLabel = i18n('account.logout.label');

  const logout = useLogout();

  return (
    <div className="font-body text-md text-primary md:hidden">
      <Disclosure>
        {({ open }) => (
          <div className="flex flex-col">
            <Disclosure.Button className="flex w-full items-center justify-between border-b border-dividers px-6 py-4">
              <span className="font-medium uppercase">{label}</span>
              <ChevronDown
                width={16}
                height={16}
                className={`text-primary transition-transform duration-400 ${
                  open ? 'rotate-180' : 'rotate-0'
                }`}
              />
            </Disclosure.Button>

            <Transition className="duration-400" unmount={false}>
              <Disclosure.Panel unmount={false}>
                {({ close }) => (
                  <div
                    className="overflow-hidden rounded-b-lg transition-[max-height] duration-400"
                    ref={(ref) => {
                      setTimeout(() => {
                        if (!ref) return;

                        if (open) {
                          ref.style.maxHeight = `${ref.scrollHeight}px`;
                        } else {
                          ref.style.maxHeight = `0px`;
                        }
                      }, 0);
                    }}>
                    <div className="p-6">
                      <nav>
                        <ul className="flex flex-col gap-4">
                          {links.map(({ link, label }) => (
                            <li key={`${label}-${link}`}>
                              <Link href={link} passHref>
                                <Disclosure.Button
                                  as="a"
                                  onClick={() => close()}>
                                  {label}
                                </Disclosure.Button>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </nav>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          logout();
                        }}
                        className="mt-8">
                        <button type="submit">{logoutLabel}</button>
                      </form>
                    </div>
                  </div>
                )}
              </Disclosure.Panel>
            </Transition>
          </div>
        )}
      </Disclosure>
    </div>
  );
};

export default AccountMobileMenu;
