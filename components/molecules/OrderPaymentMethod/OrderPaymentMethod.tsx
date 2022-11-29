import React from 'react';
import Affirm from 'assets/icons/payment_affirm.svg';
import Amazon from 'assets/icons/payment_amazon.svg';
import AmericanExpress from 'assets/icons/payment_american_express.svg';
import Apple from 'assets/icons/payment_apple.svg';
import Google from 'assets/icons/payment_google.svg';
import Klarna from 'assets/icons/payment_klarna.svg';
import MasterCard from 'assets/icons/payment_mastercard.svg';
import PayPal from 'assets/icons/payment_paypal.svg';
import Resolve from 'assets/icons/payment_resolve.svg';
import Visa from 'assets/icons/payment_visa.svg';
import DinersClub from 'assets/icons/payment_diners_club.svg';
import JCB from 'assets/icons/payment_jcb.svg';
import UnionPay from 'assets/icons/payment_union_pay.svg';
import Unknown from 'assets/icons/payment_unknown.svg';
import Bancontact from 'assets/icons/payment_bancontact.svg';
import iDeal from 'assets/icons/payment_ideal.svg';
import Paysafecard from 'assets/icons/payment_paysafecard.svg';
import Manual from 'assets/icons/payment_manual.svg';

import { CARD_BRAND, PAYMENT_METHOD } from 'types/shared/payment';

const PAYMENT_LOGO_MAPPING = {
  [CARD_BRAND.VISA]: Visa,
  [CARD_BRAND.AMERICAN_EXPRESS]: AmericanExpress,
  [CARD_BRAND.DINERS_CLUB]: DinersClub,
  [CARD_BRAND.JCB]: JCB,
  [CARD_BRAND.MASTERCARD]: MasterCard,
  [CARD_BRAND.UNION_PAY]: UnionPay,
  [CARD_BRAND.UNKNOWN]: Unknown,
  [PAYMENT_METHOD.AFFIRM]: Affirm,
  [PAYMENT_METHOD.AMAZON]: Amazon,
  [PAYMENT_METHOD.APPLE]: Apple,
  [PAYMENT_METHOD.BANCONTACT]: Bancontact,
  [PAYMENT_METHOD.GOOGLE]: Google,
  [PAYMENT_METHOD.IDEAL]: iDeal,
  [PAYMENT_METHOD.KLARNA]: Klarna,
  [PAYMENT_METHOD.PAYPAL]: PayPal,
  [PAYMENT_METHOD.RESOLVE]: Resolve,
  [PAYMENT_METHOD.CARD]: () => <span />,
  [PAYMENT_METHOD.PAYSAFECARD]: Paysafecard,
  [PAYMENT_METHOD.MANUAL]: Manual,
};

const PAYMENT_NAME_MAPPING = {
  [PAYMENT_METHOD.AFFIRM]: 'Affirm',
  [PAYMENT_METHOD.AMAZON]: 'Amazon Pay',
  [PAYMENT_METHOD.APPLE]: 'Apple Pay',
  [PAYMENT_METHOD.BANCONTACT]: 'Bancontact',
  [PAYMENT_METHOD.GOOGLE]: 'Google Pay',
  [PAYMENT_METHOD.IDEAL]: 'iDeal',
  [PAYMENT_METHOD.KLARNA]: 'Klarna',
  [PAYMENT_METHOD.PAYPAL]: 'PayPal',
  [PAYMENT_METHOD.RESOLVE]: 'Resolve',
  [PAYMENT_METHOD.CARD]: null,
  [PAYMENT_METHOD.PAYSAFECARD]: 'Paysafecard',
  [PAYMENT_METHOD.MANUAL]: null,
};

export interface OrderPaymentMethodProps {
  method: PAYMENT_METHOD;
  card?: {
    name: string;
    brand: CARD_BRAND;
    label?: string;
    last4: string;
    expiredDate: string;
  };
}

const OrderPaymentMethod: React.FC<OrderPaymentMethodProps> = ({
  method,
  card,
}) => {
  const Logo = card?.brand
    ? PAYMENT_LOGO_MAPPING[card.brand]
    : method in PAYMENT_LOGO_MAPPING
    ? PAYMENT_LOGO_MAPPING[method]
    : PAYMENT_LOGO_MAPPING[PAYMENT_METHOD.MANUAL];

  const paymentName = card?.name ?? PAYMENT_NAME_MAPPING[method];

  return (
    <article className="flex flex-col space-y-0.5 text-md">
      <div className="flex items-center space-x-2">
        <Logo className="w-6" />
        {card && (
          <>
            <span className="font-semibold text-primary">
              {card.label} · {card.last4}
            </span>
            <span className="text-body">{card.expiredDate}</span>
          </>
        )}
      </div>
      {paymentName && <p className="text-body">{paymentName}</p>}
    </article>
  );
};

export default OrderPaymentMethod;
