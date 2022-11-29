import React, { useState } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { Icon } from '@iconify/react';
import { Transition } from '@headlessui/react';

export interface InfoTooltipProps {
  text: string;
  hideArrow?: boolean;
  customTrigger?: React.ReactNode;
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({
  text,
  hideArrow = false,
  customTrigger,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root
        open={open}
        onOpenChange={(value) => setOpen(value)}>
        <TooltipPrimitive.Trigger
          onClick={() => setOpen(true)}
          type="button"
          className="flex">
          {customTrigger ?? (
            <Icon
              icon="fluent:info-12-regular"
              className="text-input-standard"
              width={20}
              height={20}
            />
          )}
        </TooltipPrimitive.Trigger>
        <Transition.Root show={open}>
          <TooltipPrimitive.Content>
            <Transition.Child
              className="transition-opacity duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100">
              <div className="max-w-[10rem] rounded-lg bg-body px-2 py-1.5 text-sm text-background-primary">
                {!hideArrow && (
                  <TooltipPrimitive.Arrow
                    width={19}
                    height={9.5}
                    offset={6}
                    className="fill-body"
                  />
                )}
                {text}
              </div>
            </Transition.Child>
          </TooltipPrimitive.Content>
        </Transition.Root>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};

export default InfoTooltip;
