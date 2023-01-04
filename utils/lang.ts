import type { AccountNavLinkProps } from 'components/atoms/AccountNavLink';
import { fallbackString } from './text';

export const subscriptionDetailsText = (lang: any) => ({
  backToSubscriptionsLabel: fallbackString(
    lang?.account?.subscriptions?.details?.backLink,
    'Back to subscriptions',
  ),
  createdLabel: fallbackString(
    lang?.account?.subscriptions?.details?.createdLabel,
    'Created',
  ),
  nextBillingLabel: fallbackString(
    lang?.account?.subscriptions?.details?.nextBillingLabel,
    'Next billing',
  ),
  itemsLabel: fallbackString(
    lang?.account?.subscriptions?.details?.itemsLabel,
    'Items',
  ),
  totalLabel: fallbackString(
    lang?.account?.subscriptions?.details?.totalLabel,
    'Total',
  ),
  quantityLabel: fallbackString(
    lang?.account?.subscriptions?.details?.quantityLabel,
    'Qty',
  ),
  priceLabel: fallbackString(
    lang?.account?.subscriptions?.details?.priceLabel,
    'Price',
  ),
  subtotalLabel: fallbackString(
    lang?.account?.subscriptions?.details?.subtotalLabel,
    'Subtotal',
  ),
  discountsLabel: fallbackString(
    lang?.account?.subscriptions?.details?.discountsLabel,
    'Discounts & Credits',
  ),
  shippingLabel: fallbackString(
    lang?.account?.subscriptions?.details?.shippingLabel,
    'Shipping',
  ),
  taxLabel: fallbackString(
    lang?.account?.subscriptions?.details?.taxLabel,
    'VAT',
  ),
  refundLabel: fallbackString(
    lang?.account?.subscriptions?.details?.refundLabel,
    'Refund',
  ),
  deliveryInfoTitle: fallbackString(
    lang?.account?.subscriptions?.details?.deliveryInfoTitle,
    'Delivery information',
  ),
  detailsLabel: fallbackString(
    lang?.account?.subscriptions?.details?.detailsLabel,
    'Details',
  ),
  phoneNumberLabel: fallbackString(
    lang?.account?.subscriptions?.details?.phoneNumberLabel,
    'Phone number',
  ),
  methodLabel: fallbackString(
    lang?.account?.subscriptions?.details?.methodLabel,
    'Method',
  ),
  orderNotesLabel: fallbackString(
    lang?.account?.subscriptions?.details?.orderNotesLabel,
    'Order notes',
  ),
  paymentInfoTitle: fallbackString(
    lang?.account?.subscriptions?.details?.paymentInfoTitle,
    'Payment information',
  ),
  paymentMethodLabel: fallbackString(
    lang?.account?.subscriptions?.details?.paymentMethodLabel,
    'Payment method',
  ),
  cardLabel: fallbackString(
    lang?.account?.subscriptions?.details?.cardLabel,
    'Card',
  ),
  billingAddressLabel: fallbackString(
    lang?.account?.subscriptions?.details?.billingAddressLabel,
    'Billing address',
  ),
  cancel: {
    message: fallbackString(
      lang?.account?.subscriptions?.details?.cancel?.message,
      'You can cancel your subscription at anytime.',
    ),
    label: fallbackString(
      lang?.account?.subscriptions?.details?.cancel?.label,
      'Cancel subscription',
    ),
    dialogTitle: fallbackString(
      lang?.account?.subscriptions?.details?.cancel?.dialogTitle,
      'Cancel subscription',
    ),
    dialogBody: fallbackString(
      lang?.account?.subscriptions?.details?.cancel?.dialogBody,
      'Cancelling your subscription is permanent. Are you sure you want to proceed?',
    ),
    buttonLabel: fallbackString(
      lang?.account?.subscriptions?.details?.cancel?.cancelButtonLabel,
      'Cancel',
    ),
    subscriptionButtonLabel: fallbackString(
      lang?.account?.subscriptions?.details?.cancel
        ?.cancelSubscriptionButtonLabel,
      'Cancel subscription',
    ),
    successMessage: fallbackString(
      lang?.account?.subscriptions?.details?.cancel?.successMessage,
      'Your subscription is canceled',
    ),
    errorMessage: fallbackString(
      lang?.account?.subscriptions?.details?.cancel?.errorMessage,
      'Something went wrong, please try again later',
    ),
  },
  trialEndMessage: fallbackString(
    lang?.account?.subscriptions?.details?.trialEndMessage,
    'Your trial period will end in {n} {interval}',
  ),
  headerBillingMessage: fallbackString(
    lang?.account?.subscriptions?.details?.headerBillingMessage,
    'Every {n} {interval}',
  ),
  renewalLimitLabel: fallbackString(
    lang?.account?.subscriptions?.details?.renewalLimitLabel,
    'Limited to {n} {renewal}',
  ),
  shipmentLimitLabel: fallbackString(
    lang?.account?.subscriptions?.details?.shipmentLimitLabel,
    'Limited to {n} {shipment}',
  ),
  renewalSingularLabel: fallbackString(
    lang?.account?.subscriptions?.details?.renewalSingularLabel,
    'renewal',
  ),
  renewalPluralLabel: fallbackString(
    lang?.account?.subscriptions?.details?.renewalPluralLabel,
    'renewals',
  ),
  shipmentSingularLabel: fallbackString(
    lang?.account?.subscriptions?.details?.shipmentSingularLabel,
    'shipment',
  ),
  shipmentPluralLabel: fallbackString(
    lang?.account?.subscriptions?.details?.shipmentPluralLabel,
    'shipments',
  ),
});

export const pageTitleMap = (lang: any) => ({
  subscriptions: fallbackString(
    lang?.account?.subscriptions?.title,
    'Subscriptions',
  ),
  orders: fallbackString(lang?.account?.orders?.title, 'Orders & Returns'),
});

export const accountLinks = (lang: any): AccountNavLinkProps[] => [
  {
    label: fallbackString(
      lang?.account?.subscriptions?.navigationTitle,
      'Subscriptions',
    ),
    link: '/account/subscriptions',
  },
  {
    label: fallbackString(
      lang?.account?.orders?.navigationTitle,
      'Orders & Returns',
    ),
    link: '/account/orders',
  },
];
