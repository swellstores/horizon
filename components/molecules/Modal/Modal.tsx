import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import RichText from 'components/atoms/RichText';
import Close from 'assets/icons/close.svg';

export interface ModalProps {
  title: string;
  body: string;
  open: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, body, open, onClose }) => {
  return (
    <Transition appear show={open} as={Fragment}>
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
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
          className="shadow-xl fixed top-1/2 left-1/2 z-modal flex w-full max-w-[342px] -translate-x-1/2 -translate-y-1/2 transform flex-col space-y-6 overflow-hidden rounded-xl bg-background-primary p-6 text-left align-middle transition-all md:max-w-[463px]">
          <div className="flex items-center justify-between">
            <Dialog.Title
              as="h3"
              className="font-headings text-md font-semibold uppercase text-primary">
              {title}
            </Dialog.Title>
            <button onClick={onClose} aria-label="Close">
              <Close className="w-[16.6px]" />
            </button>
          </div>
          <Dialog.Description
            as={RichText}
            content={body}
            className="text-xs text-body"
          />
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default Modal;
