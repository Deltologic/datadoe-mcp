# Remittance Items

- BigQuery table name: `amazon_remittance_items`
- Available in: Vendor Central
- Data scheme index: ../data-scheme.md

Invoice-level lines of Vendor Central payments. One row per line of a payment: invoice payments, deductions, vendor returns, and advertising. A deduction shows only through description, invoice_type, and a negative amount; there is no reason code, dispute, or purchase order field. One invoice can be paid across several payments, so amount_paid is the part paid by this payment. Join amazon_remittances on unique_payment_id and amazon_invoices on invoice_number. date is the UTC day of the parent payment date.

- Source type: `VENDOR_CENTRAL`
- Source ID: `702e2dbb8fe12141e41bd1be8f5d8864bddd149f743cbabc69f81df43a7a52d1`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=VENDOR_CENTRAL&table=702e2dbb8fe12141e41bd1be8f5d8864bddd149f743cbabc69f81df43a7a52d1

## Fetch periods

- `INITIAL` (364 days)
- `RECURRING_DAILY` (30 days)

## Prerequisites

Vendor Central only. Amazon does not offer the Finance Remittance API to Seller Central accounts, so sellers get no rows. The API needs the Finance and Accounting role, the same role as the Invoices API. If your Vendor Central account was added to DataDoe before October 1, 2026, this table has no data until you re-authorize the connection on the Sellers & Vendors page.

## Search aliases

- remittance lines
- deductions
- terms discount

## Columns (27)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `date` (`DATE`, required) — UTC calendar day of the parent payment date. Use for date filtering.
- `unique_payment_id` (`TEXT`, required) — Parent payment. Join amazon_remittances on this column.
- `line_number` (`NUMBER`, required) — Position of the line in the payment, starting at 1. Amazon gives lines no id, so unique_payment_id and line_number identify a line.
- `invoice_number` (`TEXT`, nullable) — Invoice number. Join amazon_invoices.invoice_number.
- `invoice_issue_date` (`DATE`, nullable)
- `invoice_type` (`TEXT`, nullable) — Invoice type as Amazon reports it, such as Standard.
- `description` (`TEXT`, nullable) — Line description, such as Payment for goods received.
- `payment_terms` (`TEXT`, nullable) — Payment terms, such as 1% 30, NET 60.
- `total_amount` (`NUMBER`, nullable) — Invoiced amount of the line: invoice_amount plus tax_amount.
- `currency` (`TEXT`, nullable) — ISO 4217 currency of the line amounts.
- `invoice_amount` (`NUMBER`, nullable) — InvoiceAmount part of total_amount.
- `tax_amount` (`NUMBER`, nullable) — TaxAmount part of total_amount.
- `net_amount_paid` (`NUMBER`, nullable) — Amount this payment settles for the line: amount_paid plus terms_discount_taken. Use amount_paid for the money transferred.
- `amount_paid` (`NUMBER`, nullable) — Money transferred for this line by this payment (AmountPaid part of net_amount_paid). Sums to amazon_remittances.payment_amount.
- `terms_discount_taken` (`NUMBER`, nullable) — Early-payment discount Amazon took under the payment terms (TermsDiscountTaken part of net_amount_paid).
- `withholding_amount` (`NUMBER`, nullable) — Amount withheld on the line.
- `vendor_code` (`TEXT`, nullable) — Vendor code of the line.
- `total_amount_breakdown` (`JSON`, nullable) — Raw JSON list of {breakdownType, breakdownAmount {currencyCode, currencyAmount}}. breakdownType values: InvoiceAmount, TaxAmount.
- `net_amount_paid_breakdown` (`JSON`, nullable) — Raw JSON list of {breakdownType, breakdownAmount {currencyCode, currencyAmount}}. breakdownType values: AmountPaid, TermsDiscountTaken.
- `related_item_identifiers` (`JSON`, nullable) — Raw JSON related identifiers of the line. relatedIdentifierName values: VENDOR_CODE.
- `last_seen_at` (`DATE`, required) — Timestamp when DataDoe last received this row from the SP-API Finance Remittance API.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
