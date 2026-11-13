# Remittances

- BigQuery table name: `amazon_remittances`
- Available in: Vendor Central
- Data scheme index: ../data-scheme.md

Vendor Central payments from Amazon, as in Vendor Central Payments > Remittance. One row per payment. Join amazon_remittance_items on unique_payment_id for the invoices, deductions, vendor returns, and advertising lines the payment covers. The sum of amazon_remittance_items.amount_paid over a payment equals payment_amount. Use amazon_invoices for per-invoice status and settlement totals, and this table for when and how Amazon paid. Chargeback reason codes, disputes, and co-op agreements are not included. date is the UTC day of payment_date.

- Source type: `VENDOR_CENTRAL`
- Source ID: `ab3e362adb3ce1a6e2db23ff506738f91e2cb8073e8298dba8e4007dbba821a7`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=VENDOR_CENTRAL&table=ab3e362adb3ce1a6e2db23ff506738f91e2cb8073e8298dba8e4007dbba821a7

## Fetch periods

- `INITIAL` (364 days)
- `RECURRING_DAILY` (30 days)

## Prerequisites

Vendor Central only. Amazon does not offer the Finance Remittance API to Seller Central accounts, so sellers get no rows. The API needs the Finance and Accounting role, the same role as the Invoices API. If your Vendor Central account was added to DataDoe before October 1, 2026, this table has no data until you re-authorize the connection on the Sellers & Vendors page.

## Search aliases

- remittance
- vendor payments
- payment

## Columns (23)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `date` (`DATE`, required) — UTC calendar day of the payment date. Use for date filtering.
- `unique_payment_id` (`TEXT`, required) — Unique payment identifier. Join amazon_remittance_items on this column. Differs from payment_number.
- `payment_number` (`TEXT`, nullable) — External payment reference, as shown on the bank statement and in Vendor Central. Not unique.
- `payment_date` (`DATE`, nullable) — Payment timestamp. date is the UTC calendar day of this value.
- `payment_amount` (`NUMBER`, nullable)
- `payment_currency` (`TEXT`, nullable) — ISO 4217 currency of payment_amount.
- `payment_amount_in_invoice_currency` (`NUMBER`, nullable) — Payment amount in the invoice currency, when it differs from payment_currency.
- `invoice_currency` (`TEXT`, nullable) — ISO 4217 currency of payment_amount_in_invoice_currency.
- `exchange_rate` (`NUMBER`, nullable) — Exchange rate applied to the payment.
- `payment_method` (`TEXT`, nullable) — Payment method, such as EFT.
- `remittance_status` (`TEXT`, nullable) — IN_PROGRESS, SUCCESSFUL, or FAILED.
- `line_item_count` (`NUMBER`, nullable) — Number of lines in amazon_remittance_items for this payment.
- `vendor_codes` (`JSON`, nullable) — JSON list of vendor codes the payment covers.
- `payee_codes` (`JSON`, nullable) — JSON list of payee codes the payment was made to.
- `related_identifiers` (`JSON`, nullable) — Raw JSON related business identifiers. relatedIdentifierName values: VENDOR_CODE, PAYEE_CODE.
- `country_code` (`TEXT`, nullable) — ISO 3166-1 alpha-2 country code of the remittance.
- `last_seen_at` (`DATE`, required) — Timestamp when DataDoe last received this row from the SP-API Finance Remittance API.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
