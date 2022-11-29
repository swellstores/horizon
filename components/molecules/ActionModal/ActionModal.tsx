import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import RichText from 'components/atoms/RichText';
import Close from 'assets/icons/close.svg';
import Button from 'components/atoms/Button';
import { BUTTON_STYLE, BUTTON_TYPE } from 'types/shared/button';

interface ActionButton {
  label: string;
  onClick: () => void;
  style?: BUTTON_STYLE;
}

export interface ActionModalProps {
  title: string;
  body: string;
  open: boolean;
  onClose: () => void;
  actionButtons: ActionButton[];
}

const ActionModal: React.FC<ActionModalProps> = ({
  title,
  body,
  open,
  onClose,
  actionButtons,
}) => {
  return (
    <Transition show={open}>
      <Dialog as="div" onClose={onClose}>
        <Transition.Child
          as={Dialog.Backdrop}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="fixed inset-0 z-backdrop bg-[rgba(0,0,0,0.3)]"
        />
        <Transition.Child
          as={Dialog.Panel}
          enter="duration-700 md:duration-400"
          enterFrom="translate-y-full md:-translate-y-1/2 md:opacity-0 md:scale-95"
          enterTo="translate-y-0 md:-translate-y-1/2 md:opacity-100 md:scale-100"
          leave="duration-500 md:duration-300"
          leaveFrom="translate-y-0 md:-translate-y-1/2 md:opacity-100 md:scale-100"
          leaveTo="translate-y-full md:-translate-y-1/2 md:opacity-0 md:scale-95"
          className="shadow-xl fixed bottom-0 left-0 z-modal flex h-fit w-full flex-col rounded-t-xl bg-background-primary p-6 text-left align-middle transition-[opacity,_transform] md:left-1/2 md:top-1/2 md:max-w-[463px] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-xl">
          <div className="flex items-center justify-between">
            <Dialog.Title
              as="h3"
              className="font-headings text-md font-semibold uppercase text-primary">
              {title}
            </Dialog.Title>
          </div>
          <Dialog.Description
            as={RichText}
            content={body}
            className="mt-8 text-xs text-body"
          />
          <div className="mt-8 flex flex-col space-y-2">
            {actionButtons.map(({ label, onClick, style }, i) => (
              <Button
                key={`${label}${i}`}
                elType={BUTTON_TYPE.BUTTON}
                buttonStyle={style}
                onClick={onClick}
                className="text-center"
                fullWidth
                tabIndex={0}>
                {label}
              </Button>
            ))}
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-[27.6px] right-6">
            <Close className="w-[16.6px]" />
          </button>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default ActionModal;
