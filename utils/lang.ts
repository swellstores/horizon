import type { AccountNavLinkProps } from 'components/atoms/AccountNavLink';
import type { I18n } from 'hooks/useI18n';

export const subscriptionDetailsText = (i18n: I18n) => ({
  backToSubscriptionsLabel: i18n('account.subscriptions.details.back_link'),
  createdLabel: i18n('account.subscriptions.details.created_label'),
  nextBillingLabel: i18n('account.subscriptions.details.next_billing_label'),
  itemsLabel: i18n('account.subscriptions.details.items_label'),
  totalLabel: i18n('account.subscriptions.details.total_label'),
  quantityLabel: i18n('account.subscriptions.details.quantity_label'),
  priceLabel: i18n('account.subscriptions.details.price_label'),
  subtotalLabel: i18n('account.subscriptions.details.subtotal_label'),
  discountsLabel: i18n('account.subscriptions.details.discounts_label'),
  shippingLabel: i18n('account.subscriptions.details.shipping_label'),
  taxLabel: i18n('account.subscriptions.details.tax_label'),
  refundLabel: i18n('account.subscriptions.details.refund_label'),
  deliveryInfoTitle: i18n('account.subscriptions.details.delivery_info_title'),
  detailsLabel: i18n('account.subscriptions.details.details_label'),
  phoneNumberLabel: i18n('account.subscriptions.details.phone_number_label'),
  methodLabel: i18n('account.subscriptions.details.method_label'),
  orderNotesLabel: i18n('account.subscriptions.details.order_notes_label'),
  paymentInfoTitle: i18n('account.subscriptions.details.payment_info_title'),
  paymentMethodLabel: i18n(
    'account.subscriptions.details.payment_method_label',
  ),
  cardLabel: i18n('account.subscriptions.details.card_label'),
  billingAddressLabel: i18n(
    'account.subscriptions.details.billing_address_label',
  ),
  cancel: {
    message: i18n('account.subscriptions.details.cancel.message'),
    label: i18n('account.subscriptions.details.cancel.label'),
    dialogTitle: i18n('account.subscriptions.details.cancel.dialog_title'),
    dialogBody: i18n('account.subscriptions.details.cancel.dialog_body'),
    buttonLabel: i18n(
      'account.subscriptions.details.cancel.cancel_button_label',
    ),
    subscriptionButtonLabel: i18n(
      'account.subscriptions.details.cancel.cancel_subscription_button_label',
    ),
    successMessage: i18n(
      'account.subscriptions.details.cancel.success_message',
    ),
    errorMessage: i18n('account.subscriptions.details.cancel.error_message'),
  },
  trialEndMessage: i18n('account.subscriptions.details.trial_end_message'),
  headerBillingMessage: i18n(
    'account.subscriptions.details.header_billing_message',
  ),
  renewalLimitLabel: i18n('account.subscriptions.details.renewal_limit_label'),
  shipmentLimitLabel: i18n(
    'account.subscriptions.details.shipment_limit_label',
  ),
  renewalSingularLabel: i18n(
    'account.subscriptions.details.renewal_singular_label',
  ),
  renewalPluralLabel: i18n(
    'account.subscriptions.details.renewal_plural_label',
  ),
  shipmentSingularLabel: i18n(
    'account.subscriptions.details.shipment_singular_label',
  ),
  shipmentPluralLabel: i18n(
    'account.subscriptions.details.shipment_plural_label',
  ),
});

export const pageTitleMap = (i18n: I18n) => ({
  subscriptions: i18n('account.subscriptions.title'),
  orders: i18n('account.orders.title'),
});

export const accountLinks = (i18n: I18n): AccountNavLinkProps[] => [
  {
    label: i18n('account.subscriptions.navigation_title'),
    link: '/account/subscriptions',
  },
  {
    label: i18n('account.orders.navigation_title'),
    link: '/account/orders',
  },
];

export const orderDetailsText = (i18n: I18n) => ({
  backToOrdersLabel: i18n('account.orders.details.back_link'),
  orderLabel: i18n('account.orders.details.order_label'),
  createReturnLabel: i18n('account.orders.details.create_return_label'),
  returnDialogTitle: i18n('account.orders.details.return_dialog_title'),
  returnDialogBody: i18n('account.orders.details.return_dialog_body'),
  orderDateLabel: i18n('account.orders.details.order_date_label'),
  itemsLabel: i18n('account.orders.details.items_label'),
  totalLabel: i18n('account.orders.details.total_label'),
  quantityLabel: i18n('account.orders.details.quantity_label'),
  priceLabel: i18n('account.orders.details.price_label'),
  subtotalLabel: i18n('account.orders.details.subtotal_label'),
  discountsLabel: i18n('account.orders.details.discounts_label'),
  shippingLabel: i18n('account.orders.details.shipping_label'),
  taxLabel: i18n('account.orders.details.tax_label'),
  refundLabel: i18n('account.orders.details.refund_label'),
  deliveryInfoTitle: i18n('account.orders.details.delivery_info_title'),
  detailsLabel: i18n('account.orders.details.details_label'),
  phoneNumberLabel: i18n('account.orders.details.phone_number_label'),
  methodLabel: i18n('account.orders.details.method_label'),
  orderNotesLabel: i18n('account.orders.details.order_notes_label'),
  paymentInfoTitle: i18n('account.orders.details.payment_info_title'),
  paymentMethodLabel: i18n('account.orders.details.payment_method_label'),
  cardLabel: i18n('account.orders.details.card_label'),
  billingAddressLabel: i18n('account.orders.details.billing_address_label'),
});

export const signupText = (i18n: I18n) => ({
  pageTitle: i18n('account.signup.page_title'),
  signupTitle: i18n('account.signup.title'),
  firstName: {
    label: i18n('account.signup.first_name.label'),
    emptyErrorText: i18n('account.signup.first_name.empty_error_text'),
    placeholder: i18n('account.signup.first_name.placeholder'),
  },
  lastName: {
    label: i18n('account.signup.last_name.label'),
    emptyErrorText: i18n('account.signup.last_name.empty_error_text'),
    placeholder: i18n('account.signup.last_name.placeholder'),
  },
  email: {
    label: i18n('account.signup.email.label'),
    emptyErrorText: i18n('account.signup.email.empty_error_text'),
    invalidErrorText: i18n('account.signup.email.invalid_error_text'),
    placeholder: i18n('account.signup.email.placeholder'),
  },
  password: {
    label: i18n('account.signup.password.label'),
    emptyErrorText: i18n('account.signup.password.empty_error_text'),
    invalidErrorText: i18n('account.signup.password.invalid_error_text'),
    placeholder: i18n('account.signup.password.placeholder'),
    requirementsText: i18n('account.signup.password.requirements_text'),
  },
  errors: {
    server: i18n('account.signup.errors.server_error_text'),
    emailTaken: i18n('account.signup.errors.email_taken'),
  },
  signupButton: i18n('account.signup.signup_button'),
  registeredUser: i18n('account.signup.registered_user_label'),
  loginLink: i18n('account.signup.login_link'),
  successMessage: i18n('account.signup.success_message'),
});

export const loginText = (i18n: I18n) => ({
  pageTitle: i18n('account.login.page_title'),
  title: i18n('account.login.title'),
  email: {
    label: i18n('account.login.email.label'),
    emptyErrorText: i18n('account.login.email.empty_error_text'),
    invalidErrorText: i18n('account.login.email.invalid_error_text'),
    placeholder: i18n('account.login.email.placeholder'),
  },
  password: {
    label: i18n('account.login.password.label'),
    emptyErrorText: i18n('account.login.password.empty_error_text'),
    invalidErrorText: i18n('account.login.password.invalid_error_text'),
    placeholder: i18n('account.login.password.placeholder'),
  },
  passwordRecovery: i18n('account.login.password_recovery'),
  errors: {
    invalidCredentials: i18n('account.login.errors.invalid_credentials'),
    server: i18n('account.login.errors.server'),
  },
  loginButton: i18n('account.login.login_button'),
  noAccount: i18n('account.login.no_account'),
  signupLink: i18n('account.login.signup_link'),
});

export const setNewPasswordText = (i18n: I18n) => ({
  pageTitle: i18n('account.set_new_password.page_title'),
  title: i18n('account.set_new_password.title'),
  subtitle: i18n('account.set_new_password.subtitle'),
  confirmPassword: {
    emptyErrorText: i18n(
      'account.set_new_password.confirm_password.empty_error_text',
    ),
    label: i18n('account.set_new_password.confirm_password.label'),
    placeholder: i18n('account.set_new_password.confirm_password.placeholder'),
  },
  password: {
    emptyErrorText: i18n('account.set_new_password.password.empty_error_text'),
    label: i18n('account.set_new_password.password.label'),
    placeholder: i18n('account.set_new_password.password.placeholder'),
    requirementsText: i18n(
      'account.set_new_password.password.requirements_text',
    ),
    invalidErrorText: i18n(
      'account.set_new_password.password.invalid_error_text',
    ),
  },
  submitButtonLabel: i18n('account.set_new_password.submit_button_label'),
  errors: {
    passwordMismatch: i18n('account.set_new_password.errors.password_mismatch'),
    server: i18n('account.set_new_password.errors.server'),
  },
  expired: {
    pageTitle: i18n('account.set_new_password.expired.page_title'),
    title: i18n('account.set_new_password.expired.title'),
    message: i18n('account.set_new_password.expired.message'),
    resendEmail: i18n('account.set_new_password.expired.resend_email'),
  },
  success: {
    pageTitle: i18n('account.set_new_password.success.page_title'),
    title: i18n('account.set_new_password.success.title'),
    message: i18n('account.set_new_password.success.message'),
    loginLink: i18n('account.set_new_password.success.login_link'),
  },
});

export const passwordRecoveryText = (i18n: I18n) => ({
  pageTitle: i18n('account.password_recovery.page_title'),
  title: i18n('account.password_recovery.title'),
  subtitle: i18n('account.password_recovery.subtitle'),
  email: {
    label: i18n('account.password_recovery.email.label'),
    emptyErrorText: i18n('account.password_recovery.email.empty_error_text'),
    invalidErrorText: i18n(
      'account.password_recovery.email.invalid_error_text',
    ),
    placeholder: i18n('account.password_recovery.email.placeholder'),
  },
  submitButtonLabel: i18n('account.password_recovery.submit_button_label'),
  backToLoginLink: i18n('account.password_recovery.back_to_login_link'),
  errors: {
    server: i18n('account.password_recovery.errors.server'),
  },
  checkEmail: {
    pageTitle: i18n('account.password_recovery.check_email.page_title'),
    title: i18n('account.password_recovery.check_email.title'),
    message: i18n('account.password_recovery.check_email.message'),
    backToLoginLink: i18n(
      'account.password_recovery.check_email.back_to_login_link',
    ),
  },
});

export const purchaseCardText = (i18n: I18n) => ({
  billingMessage: i18n('account.subscriptions.billing_message'),
  orderMessage: i18n('account.subscriptions.order_message'),
  nextBillingLabel: i18n('account.subscriptions.next_billing'),
  orderDateLabel: i18n('account.orders.order_date'),
  itemsLabel: i18n('account.orders.items'),
  viewOrderLabel: i18n('account.orders.view_order'),
  manageLabel: i18n('account.subscriptions.manage'),
  totalLabel: i18n('account.orders.total'),
});

export const categoryPageText = (i18n: I18n) => ({
  filtersLabel: i18n('categories.filters.title'),
  removeAllLabel: i18n('categories.filters.remove_all'),
  priceLabel: i18n('categories.filters.price'),
  seeResultsLabel: i18n('categories.filters.see_results'),
  allProductsLabel: i18n('categories.filters.all_products'),
  mobileButton: i18n('categories.filters.mobile_button'),
});
