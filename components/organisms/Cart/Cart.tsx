import React, { Fragment, useCallback } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import CartItem from 'components/molecules/CartItem';
import CartHeader from 'components/atoms/CartHeader';
import CartTotal from 'components/molecules/CartTotal';
import AddMoreProductsCard, {
  AddMoreProductsCardProps,
} from 'components/molecules/AddMoreProductsCard';
import SadFaceIcon from 'assets/icons/sad-face.svg';
import type { CartItemProps } from 'components/molecules/CartItem';

export interface CartProps {
  visible: boolean;
  setVisible?: (visible: boolean) => void;
  headerLabel: string;
  cartEmptyMessage: string;
  total: number;
  items: CartItemProps[];
  addMoreProducts: AddMoreProductsCardProps;
  checkoutUrl: string;
}

const Cart: React.FC<CartProps> = ({
  visible,
  setVisible,
  headerLabel,
  cartEmptyMessage,
  items,
  total,
  checkoutUrl,
  addMoreProducts,
}) => {
  const closeCart = useCallback(() => {
    setVisible?.(false);
  }, [setVisible]);

  return (
    <Transition show={visible} as={Fragment}>
      <Dialog onClose={closeCart} className="fixed z-modal">
        <Transition.Child
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="fixed inset-0 -z-10 w-screen bg-[#0008] transition-opacity duration-400"
          as="button"
          onClick={closeCart}
        />
        <Transition.Child
          enterFrom="-translate-y-full lg:translate-y-0 lg:translate-x-full"
          enterTo="translate-y-0 lg:translate-x-0"
          leaveFrom="translate-y-0 lg:translate-x-0"
          leaveTo="-translate-y-full lg:translate-y-0 lg:translate-x-full"
          className="fixed left-0 top-0 flex h-screen w-screen flex-col bg-background-primary transition-transform duration-400 lg:left-auto lg:right-0 lg:w-112">
          <div className="flex-1 overflow-auto px-6 pb-4">
            <CartHeader
              label={headerLabel}
              className="my-6"
              itemsQuantity={items.reduce(
                (acc, item) => acc + item.quantity,
                0,
              )}
              onClose={closeCart}
            />
            <ul>
              {items.map((item) => (
                <CartItem key={item.id} {...item} />
              ))}
            </ul>
            {addMoreProducts && <AddMoreProductsCard {...addMoreProducts} />}
          </div>
          {items.length === 0 && (
            <div className="flex flex-1 flex-col items-center justify-start">
              <SadFaceIcon className="text-accent" width={40} height={40} />

              <p className="mt-5 text-center text-sm text-body">
                {cartEmptyMessage}
              </p>
            </div>
          )}
          <CartTotal
            className="sticky bottom-0"
            total={total}
            checkoutUrl={checkoutUrl ?? '#'}
            disabled={items.length === 0}
          />
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default Cart;
