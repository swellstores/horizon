import React from 'react';
import Plus from 'assets/icons/plus.svg';
import Minus from 'assets/icons/minus.svg';
import RichText from 'components/atoms/RichText';
import useClassNames from 'hooks/useClassNames';
import { Disclosure, Transition } from '@headlessui/react';

export interface InfoAccordionProps {
  label: string;
  content: string;
  accordionStyle?: 'default' | 'secondary';
  className?: string;
}

const InfoAccordion: React.FC<InfoAccordionProps> = ({
  label,
  content,
  accordionStyle = 'default',
  className,
}) => {
  const classNames = useClassNames(
    'flex flex-col overflow-hidden px-6 rounded-lg',
    'lg:px-8',
    {
      'bg-background-secondary': accordionStyle === 'default',
      'border border-primary': accordionStyle === 'secondary',
    },
  );

  return (
    <div className={className}>
      <Disclosure>
        {({ open }) => (
          <div className={classNames}>
            <Disclosure.Button className="flex w-full items-center justify-between py-4">
              <span className="text-sm font-semibold text-primary">
                {label}
              </span>
              {open ? (
                <Minus width={12} height={12} className="text-primary" />
              ) : (
                <Plus width={12} height={12} className="text-primary" />
              )}
            </Disclosure.Button>

            <Transition className="duration-400" unmount={false}>
              <Disclosure.Panel unmount={false}>
                <div
                  className="transition-[max-height] duration-400"
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
                  <RichText
                    className="pb-4 text-sm text-body"
                    content={content}
                  />
                </div>
              </Disclosure.Panel>
            </Transition>
          </div>
        )}
      </Disclosure>
    </div>
  );
};

export default InfoAccordion;
