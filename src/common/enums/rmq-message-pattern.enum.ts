export enum RMQ_MESSAGE_PATTERN_ENUM {
    GENERATE_SINGLE_INVOICE = 'generate_single_invoice',
    CREATE_CUSTOMER = 'create_customer',
    OLD_COMPANIES = 'handle_old_companies',
    INVOICE_TOTAL = 'accounting.rpc.invoiceTotal',
    JOURNAL_TOTAL = 'accounting.rpc.journalTotal',
    JOURNAL_TOTAL2 = 'accounting.rpc.journalTotal2',
    INVOICE_TOTAL2 = 'accounting.rpc.invoiceTotal2',
}
