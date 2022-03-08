
export enum PaymentDescription {
  /** Should never be used, indicates that the payment was for a unknown reason */
  _Unknown_ = 0,

  /** Indicates that the payment is for subscription renewals or recurring payments */
  Subscription = 1,

  /** Indicates that the payment is to change to a card payment method (Peach Payment Specific) */
  PaymentMethodChanged  = 3,

  /** Indicates that the payment is for a subscription upgrade */
  PackageUpgrade = 4,
}
