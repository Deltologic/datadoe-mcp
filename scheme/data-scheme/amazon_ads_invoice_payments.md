# Ads Invoice Payments

- BigQuery table name: `amazon_ads_invoice_payments`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Amazon Ads invoice payments. One row per invoice and payment. date is the invoice date. invoice_status is the invoice and payment_status is the payment. payment_method keeps Amazon values such as DEDUCT_FROM_PAYMENT. Amounts keep Amazon's sign, and each amount keeps its own currency. A missing payment list produces no rows.

- Source type: `AMAZON_ADS`
- Source ID: `ba5bebe5f401eb22a5fc0d8abf86832289e9f7cc476b96aed896d7dc1fd8d1a1`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=ba5bebe5f401eb22a5fc0d8abf86832289e9f7cc476b96aed896d7dc1fd8d1a1

## Fetch periods

- `CONTINUOUS`

## Search aliases

- ads payment
- invoice payment
- deduct from payment

## Columns (24)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `date` (`DATE`, required) — Invoice date, not the payment date.
- `invoice_id` (`TEXT`, required)
- `invoice_number` (`TEXT`, nullable)
- `invoice_status` (`TEXT`, required) — Amazon invoice status. This is not the payment status.
- `invoice_country_code` (`TEXT`, nullable) — Country on the invoice. Marketplace country comes from the Ads connection.
- `payment_id` (`TEXT`, required) — Amazon payment id, kept as text.
- `payment_status` (`TEXT`, required) — Amazon payment status, such as PROCESSING, SUCCEEDED, FAILED, VERIFICATION_REQUIRED, REFUNDED or VOIDED.
- `payment_method` (`TEXT`, nullable) — Amazon payment method, including DEDUCT_FROM_PAYMENT.
- `amount` (`NUMBER`, nullable)
- `currency_code` (`TEXT`, nullable)
- `refunded_amount` (`NUMBER`, nullable)
- `refunded_currency_code` (`TEXT`, nullable)
- `reason` (`TEXT`, nullable) — Payment reason from Amazon.
- `current_payment_attempt_date_raw` (`TEXT`, nullable) — Current payment attempt date as Amazon sent it.
- `last_payment_attempt_date_raw` (`TEXT`, nullable) — Last payment attempt date as Amazon sent it.
- `next_payment_attempt_date_raw` (`TEXT`, nullable) — Next payment attempt date as Amazon sent it.
- `observed_at_utc` (`DATE`, required) — When DataDoe last stored this invoice.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
