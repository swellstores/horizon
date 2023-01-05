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

export const orderDetailsText = (lang: any) => ({
  backToOrdersLabel: fallbackString(
    lang?.account?.orders?.details?.backLink,
    'Back to orders',
  ),
  orderLabel: fallbackString(
    lang?.account?.orders?.details?.orderLabel,
    'Order',
  ),
  createReturnLabel: fallbackString(
    lang?.account?.orders?.details?.createReturnLabel,
    'Create return',
  ),
  returnDialogTitle: fallbackString(
    lang?.account?.orders?.details?.returnDialogTitle,
    'Returning an item',
  ),
  returnDialogBody: fallbackString(
    lang?.account?.orders?.details?.returnDialogBody,
    'To initiate a partial or complete return of an order, please contact us so we can start the return process. Don’t forget to include the order number and the reason for returning.',
  ),
  orderDateLabel: fallbackString(
    lang?.account?.orders?.details?.orderDateLabel,
    'Order date',
  ),
  itemsLabel: fallbackString(
    lang?.account?.orders?.details?.itemsLabel,
    'Items',
  ),
  totalLabel: fallbackString(
    lang?.account?.orders?.details?.totalLabel,
    'Total',
  ),
  quantityLabel: fallbackString(
    lang?.account?.orders?.details?.quantityLabel,
    'Qty',
  ),
  priceLabel: fallbackString(
    lang?.account?.orders?.details?.priceLabel,
    'Price',
  ),
  subtotalLabel: fallbackString(
    lang?.account?.orders?.details?.subtotalLabel,
    'Subtotal',
  ),
  discountsLabel: fallbackString(
    lang?.account?.orders?.details?.discountsLabel,
    'Discounts & Credits',
  ),
  shippingLabel: fallbackString(
    lang?.account?.orders?.details?.shippingLabel,
    'Shipping',
  ),
  taxLabel: fallbackString(lang?.account?.orders?.details?.taxLabel, 'VAT'),
  refundLabel: fallbackString(
    lang?.account?.orders?.details?.refundLabel,
    'Refund',
  ),
  deliveryInfoTitle: fallbackString(
    lang?.account?.orders?.details?.deliveryInfoTitle,
    'Delivery information',
  ),
  detailsLabel: fallbackString(
    lang?.account?.orders?.details?.detailsLabel,
    'Details',
  ),
  phoneNumberLabel: fallbackString(
    lang?.account?.orders?.details?.phoneNumberLabel,
    'Phone number',
  ),
  methodLabel: fallbackString(
    lang?.account?.orders?.details?.methodLabel,
    'Method',
  ),
  orderNotesLabel: fallbackString(
    lang?.account?.orders?.details?.orderNotesLabel,
    'Order notes',
  ),
  paymentInfoTitle: fallbackString(
    lang?.account?.orders?.details?.paymentInfoTitle,
    'Payment information',
  ),
  paymentMethodLabel: fallbackString(
    lang?.account?.orders?.details?.paymentMethodLabel,
    'Payment method',
  ),
  cardLabel: fallbackString(lang?.account?.orders?.details?.cardLabel, 'Card'),
  billingAddressLabel: fallbackString(
    lang?.account?.orders?.details?.billingAddressLabel,
    'Billing address',
  ),
});

export const signupText = (lang: any) => ({
  pageTitle: fallbackString(lang?.account?.signup?.pageTitle, 'Create account'),
  signupTitle: fallbackString(lang?.account?.signup?.title, 'Create account'),
  firstName: {
    label: fallbackString(
      lang?.account?.signup?.firstName?.label,
      'First name',
    ),
    emptyErrorText: fallbackString(
      lang?.account?.signup?.firstName?.emptyErrorText,
      'First name is required',
    ),
    placeholder: fallbackString(
      lang?.account?.signup?.firstName?.placeholder,
      'Enter your first name',
    ),
  },
  lastName: {
    label: fallbackString(lang?.account?.signup?.lastName?.label, 'Last name'),
    emptyErrorText: fallbackString(
      lang?.account?.signup?.lastName?.emptyErrorText,
      'Last name is required',
    ),
    placeholder: fallbackString(
      lang?.account?.signup?.lastName?.placeholder,
      'Enter your last name',
    ),
  },
  email: {
    label: fallbackString(lang?.account?.signup?.email?.label, 'Email'),
    emptyErrorText: fallbackString(
      lang?.account?.signup?.email?.emptyErrorText,
      'Email is required',
    ),
    invalidErrorText: fallbackString(
      lang?.account?.signup?.email?.invalidErrorText,
      'Email format is invalid',
    ),
    placeholder: fallbackString(
      lang?.account?.signup?.email?.placeholder,
      'Enter your email',
    ),
  },
  password: {
    label: fallbackString(lang?.account?.signup?.password?.label, 'Password'),
    emptyErrorText: fallbackString(
      lang?.account?.signup?.password?.emptyErrorText,
      'Password is required',
    ),
    invalidErrorText: fallbackString(
      lang?.account?.signup?.password?.invalidErrorText,
      'Your password needs to be at least 6 characters.',
    ),
    placeholder: fallbackString(
      lang?.account?.signup?.password?.placeholder,
      'Enter your password',
    ),
    requirementsText: fallbackString(
      lang?.account?.signup?.password?.requirementsText,
      'Must include a minimum of 6 characters.',
    ),
  },
  errors: {
    server: fallbackString(
      lang?.account?.signup?.errors?.serverErrorText,
      'Internal server error',
    ),
    emailTaken: fallbackString(
      lang?.account?.signup?.errors?.emailTaken,
      'There is already an account with this email',
    ),
  },
  signupButton: fallbackString(
    lang?.account?.signup?.signupButton,
    'Create account',
  ),
  registeredUser: fallbackString(
    lang?.account?.signup?.registeredUserLabel,
    'Already have an account?',
  ),
  loginLink: fallbackString(lang?.account?.signup?.loginLink, 'Log in'),
  successMessage: fallbackString(
    lang?.account?.signup?.successMessage,
    'Your account was successfully created',
  ),
});

export const loginText = (lang: any) => ({
  pageTitle: fallbackString(lang?.account?.login?.pageTitle, 'Log in'),
  title: fallbackString(lang?.account?.login?.title, 'Log in'),
  email: {
    label: fallbackString(lang?.account?.login?.email?.label, 'Email'),
    emptyErrorText: fallbackString(
      lang?.account?.login?.email?.emptyErrorText,
      'Email is required',
    ),
    invalidErrorText: fallbackString(
      lang?.account?.login?.email?.invalidErrorText,
      'Email format is invalid',
    ),
    placeholder: fallbackString(
      lang?.account?.login?.email?.placeholder,
      'Enter your email',
    ),
  },
  password: {
    label: fallbackString(lang?.account?.login?.password?.label, 'Password'),
    emptyErrorText: fallbackString(
      lang?.account?.login?.password?.emptyErrorText,
      'Password is required',
    ),
    invalidErrorText: fallbackString(
      lang?.account?.login?.password?.invalidErrorText,
      'Password is invalid',
    ),
    placeholder: fallbackString(
      lang?.account?.login?.password?.placeholder,
      'Enter your password',
    ),
  },
  passwordRecovery: fallbackString(
    lang?.account?.login?.passwordRecovery,
    'Forgot your password?',
  ),
  errors: {
    invalidCredentials: fallbackString(
      lang?.account?.login?.errors?.invalidCredentials,
      'Your email or password is incorrect.',
    ),
    server: fallbackString(
      lang?.account?.login?.errors?.server,
      'Internal server error',
    ),
  },
  loginButton: fallbackString(lang?.account?.login?.loginButton, 'Log in'),
  noAccount: fallbackString(
    lang?.account?.login?.noAccount,
    "Don't have an account?",
  ),
  signupLink: fallbackString(lang?.account?.login?.signupLink, 'Sign up'),
});

export const setNewPasswordText = (lang: any) => ({
  pageTitle: fallbackString(
    lang?.account?.setNewPassword?.pageTitle,
    'Set new password',
  ),
  title: fallbackString(
    lang?.account?.setNewPassword?.title,
    'Set new password',
  ),
  subtitle: fallbackString(
    lang?.account?.setNewPassword?.subtitle,
    'Please enter your new password.',
  ),
  confirmPassword: {
    emptyErrorText: fallbackString(
      lang?.account?.setNewPassword?.confirmPassword?.emptyErrorText,
      'Please fill out this field',
    ),
    label: fallbackString(
      lang?.account?.setNewPassword?.confirmPassword?.label,
      'Confirm password',
    ),
    placeholder: fallbackString(
      lang?.account?.setNewPassword?.confirmPassword?.placeholder,
      'Confirm your password',
    ),
  },
  password: {
    emptyErrorText: fallbackString(
      lang?.account?.setNewPassword?.password?.emptyErrorText,
      'Please fill out this field',
    ),
    label: fallbackString(
      lang?.account?.setNewPassword?.password?.label,
      'Password',
    ),
    placeholder: fallbackString(
      lang?.account?.setNewPassword?.password?.placeholder,
      'Enter your password',
    ),
    requirementsText: fallbackString(
      lang?.account?.setNewPassword?.password?.requirementsText,
      'Must include a minimum of 6 characters',
    ),
    invalidErrorText: fallbackString(
      lang?.account?.setNewPassword?.password?.invalidErrorText,
      'Your password must be at least 6 characters',
    ),
  },
  submitButtonLabel: fallbackString(
    lang?.account?.setNewPassword?.submitButtonLabel,
    'Set password',
  ),
  errors: {
    passwordMismatch: fallbackString(
      lang?.account?.setNewPassword?.errors?.passwordMismatch,
      'Passwords do not match',
    ),
    server: fallbackString(
      lang?.account?.setNewPassword?.errors?.server,
      'Something went wrong',
    ),
  },
  expired: {
    pageTitle: fallbackString(
      lang?.account?.setNewPassword?.expired?.pageTitle,
      'Link has expired',
    ),
    title: fallbackString(
      lang?.account?.setNewPassword?.expired?.title,
      'Link has expired',
    ),
    message: fallbackString(
      lang?.account?.setNewPassword?.expired?.message,
      'This password reset link has expired or is invalid. Your password was not changed.',
    ),
    resendEmail: fallbackString(
      lang?.account?.setNewPassword?.expired?.resendEmail,
      'Resend email',
    ),
  },
  success: {
    pageTitle: fallbackString(
      lang?.account?.setNewPassword?.success?.pageTitle,
      'Success',
    ),
    title: fallbackString(
      lang?.account?.setNewPassword?.success?.title,
      'Success',
    ),
    message: fallbackString(
      lang?.account?.setNewPassword?.success?.message,
      'You can now log into your account using your new password.',
    ),
    loginLink: fallbackString(
      lang?.account?.setNewPassword?.success?.loginLink,
      'Log in',
    ),
  },
});

export const passwordRecoveryText = (lang: any) => ({
  pageTitle: fallbackString(
    lang?.account?.passwordRecovery?.pageTitle,
    'Forgot your password?',
  ),
  title: fallbackString(
    lang?.account?.passwordRecovery?.title,
    'Forgot your password?',
  ),
  subtitle: fallbackString(
    lang?.account?.passwordRecovery?.subtitle,
    'Enter your email to reset your password',
  ),
  email: {
    label: fallbackString(
      lang?.account?.passwordRecovery?.email?.label,
      'Email',
    ),
    emptyErrorText: fallbackString(
      lang?.account?.passwordRecovery?.email?.emptyErrorText,
      'Email is required',
    ),
    invalidErrorText: fallbackString(
      lang?.account?.passwordRecovery?.email?.invalidErrorText,
      'Email format is invalid',
    ),
    placeholder: fallbackString(
      lang?.account?.passwordRecovery?.email?.placeholder,
      'Enter your email',
    ),
  },
  submitButtonLabel: fallbackString(
    lang?.account?.passwordRecovery?.submitButtonLabel,
    'Send email',
  ),
  backToLoginText: fallbackString(
    lang?.account?.passwordRecovery?.backToLoginText,
    'Back to {loginLink}',
  ),
  backToLoginLink: fallbackString(
    lang?.account?.passwordRecovery?.backToLoginLink,
    'Log in',
  ),
  errors: {
    server: fallbackString(
      lang?.account?.passwordRecovery?.errors?.server,
      'Something went wrong',
    ),
  },
  checkEmail: {
    pageTitle: fallbackString(
      lang?.account?.passwordRecovery?.checkEmail?.pageTitle,
      'Check your email',
    ),
    title: fallbackString(
      lang?.account?.passwordRecovery?.checkEmail?.title,
      'Check your email.',
    ),
    message: fallbackString(
      lang?.account?.passwordRecovery?.checkEmail?.message,
      'If you have an account, you should receive an email shortly with a link to reset your password.',
    ),
    backToLoginText: fallbackString(
      lang?.account?.passwordRecovery?.checkEmail?.backToLoginText,
      'Back to {loginLink}',
    ),
    backToLoginLink: fallbackString(
      lang?.account?.passwordRecovery?.checkEmail?.backToLoginLink,
      'Log in',
    ),
  },
});

export const purchaseCardText = (lang: any) => ({
  billingMessage: fallbackString(
    lang?.account?.subscriptions?.billingMessage,
    'Every {n} {interval}',
  ),
  orderMessage: fallbackString(
    lang?.account?.subscriptions?.orderMessage,
    'Every {n} {interval}',
  ),
  nextBillingLabel: fallbackString(
    lang?.account?.subscriptions?.nextBilling,
    'Next billing',
  ),
  orderDateLabel: fallbackString(lang?.account?.orders?.date, 'Order date'),
  itemsLabel: fallbackString(lang?.account?.orders?.items, 'Items'),
  viewOrderLabel: fallbackString(
    lang?.account?.orders?.viewOrder,
    'View order',
  ),
  manageLabel: fallbackString(lang?.account?.subscriptions?.manage, 'Manage'),
  totalLabel: fallbackString(lang?.account?.orders?.total, 'Total'),
});
