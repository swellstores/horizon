import React from 'react';

import ChevronDown from 'assets/icons/chevron-down.svg';
import ChevronUp from 'assets/icons/chevron-up.svg';
import PerkItem from 'components/atoms/PerkItem';
import { Disclosure, Transition } from '@headlessui/react';

export interface InfoAccordionProps {
  revealLabel: string;
  hideLabel: string;
  perks: string[];
  containerClassName: string;
}

const InfoAccordion: React.FC<InfoAccordionProps> = ({
  revealLabel,
  hideLabel,
  perks,
  ...props
}) => (
  <div className={props.containerClassName}>
    <Disclosure>
      {({ open }) => (
        <div className="flex flex-col overflow-hidden rounded-lg">
          <Disclosure.Button className="flex w-full items-center justify-center gap-x-2.5 text-sm font-medium uppercase">
            {open ? (
              <>
                {hideLabel}
                <ChevronUp className="w-[11.5px]" />
              </>
            ) : (
              <>
                {revealLabel}
                <ChevronDown className="w-[11.5px]" />
              </>
            )}
          </Disclosure.Button>
          <Transition className="duration-400" unmount={false}>
            <Disclosure.Panel unmount={false}>
              <div
                className="transition-[max-height]"
                ref={(ref) => {
                  if (!ref) return;

                  setTimeout(() => {
                    if (open) {
                      ref.style.maxHeight = `${ref.scrollHeight}px`;
                    } else {
                      ref.style.maxHeight = `0px`;
                    }
                  }, 0);
                }}>
                <ul className="flex flex-col gap-y-2 pt-6">
                  {perks.map((perk) => (
                    <li key={perk}>
                      <PerkItem text={perk} />
                    </li>
                  ))}
                </ul>
              </div>
            </Disclosure.Panel>
          </Transition>
        </div>
      )}
    </Disclosure>
  </div>
);

export default InfoAccordion;
