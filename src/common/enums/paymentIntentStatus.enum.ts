export enum StripePaymentStatus {
    requires_payment_method = 'requires_payment_method',
    requires_confirmation = 'requires_confirmation',
    requires_action = 'requires_action',
    processing = 'processing',
    requires_capture = 'requires_capture',
    canceled = 'canceled',
    succeeded = 'succeeded',
    unknown = 'unknown', // this status is not stripe status
    amount_exceeded = 'amount_exceeded',
}
