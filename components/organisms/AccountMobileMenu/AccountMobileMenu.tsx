import React from 'react';
import Link from 'next/link';
import { Disclosure, Transition } from '@headlessui/react';
import ChevronDown from 'assets/icons/chevron-down.svg';
import type { AccountNavMenuProps } from 'components/molecules/AccountNavMenu';
import useLogout from 'hooks/useLogout';

export interface AccountMobileMenuProps extends AccountNavMenuProps {
  label: string;
}

const AccountMobileMenu: React.FC<AccountMobileMenuProps> = ({
  label,
  links,
}) => {
  const logout = useLogout();
  return (
    <div className="font-body text-md text-primary md:hidden">
      <Disclosure>
        {({ open }) => (
          <div className="flex flex-col">
            <Disclosure.Button className="flex w-full items-center justify-between border-b border-dividers py-4 px-6">
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
                              <Disclosure.Button as={Link} href={link}>
                                <a onClick={() => close()}>{label}</a>
                              </Disclosure.Button>
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
                        {/* TODO: i18n */}
                        <button type="submit">Log out</button>
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
