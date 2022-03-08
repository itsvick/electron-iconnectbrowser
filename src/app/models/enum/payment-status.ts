
export enum PaymentStatus {
    /* Used to indicate that an initial checkout has been created */
    Checkout = 1,

    /* Used by the payment task runner to indicate that a payment will be requested */
    Scheduled = 2,

    /* Payment has been confirmed by the bank */
    Success = 3,

    /* Payment confirmation from bank is pending */
    Pending = 4,

    /* Payment has been rejected by the bank */
    Rejected = 5,

    /* A server or communication error caused the payment to fail */
    Error = 6,

    /* Indicates that a payment should no longer be processed */
    Expired = 7,
}

export enum EftPaymentStatus {
    /* Used to indicate that an initial checkout has been created */
    Checkout = PaymentStatus.Checkout,

    /* Payment has been confirmed  */
    Success = PaymentStatus.Success,

    /* Eft confirmation is pending */
    Pending = PaymentStatus.Pending,
}
