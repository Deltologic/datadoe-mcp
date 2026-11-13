# Ads Billing Statement Rows

- BigQuery table name: `amazon_ads_billing_statement_rows`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Rows from an Amazon Ads billing statement. One row per statement and source row. Each statement covers the previous 30 complete UTC days, so later statements repeat invoices. Sum billed_amount only where is_current is true and is_provisional is false. That total counts each invoice once. Skip is_provisional rows because an amount that could not be read is missing. When the file uses the verified German column names, the invoice, amount, date and payment columns are filled. source_values keeps every cell as text, in the same order as source_headers on Ads Billing Statements. A file with other column names leaves the mapped columns empty. These rows do not identify a vendor remittance. The invoice id can match an Ads invoice.

- Source type: `AMAZON_ADS`
- Source ID: `553217419730fcbb2eba3adc64300ed34a0f3ce88a1c4c47e8c223ee33f763a5`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=553217419730fcbb2eba3adc64300ed34a0f3ce88a1c4c47e8c223ee33f763a5

## Fetch periods

- `CONTINUOUS`

## Search aliases

- billing statement rows
- ads statement invoice

## Columns (35)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `date` (`DATE`, required) — Day DataDoe requested the statement.
- `statement_request_id` (`TEXT`, required)
- `row_index` (`NUMBER`, required) — Zero-based position of the source row. The header is not a row.
- `invoice_id` (`TEXT`, nullable) — Amazon invoice id from the statement. It can match an Ads invoice. It is not a vendor remittance id.
- `invoice_issue_date` (`DATE`, nullable) — Invoice issue date from the statement.
- `due_date` (`DATE`, nullable) — Invoice due date from the statement.
- `invoice_status` (`TEXT`, nullable) — Invoice status text from the statement, such as Paid In Full. The invoice API uses a separate status code.
- `payment_method` (`TEXT`, nullable) — Payment method text from the statement. A deduction can show as Deduct From Payment. DataDoe keeps the statement text.
- `currency_code` (`TEXT`, nullable) — Currency of the unconverted amounts.
- `billed_amount` (`NUMBER`, nullable) — Billed amount in currency_code, before conversion. A dash in the file means there is no value.
- `tax_amount` (`NUMBER`, nullable) — Tax amount in currency_code, before conversion.
- `outstanding_amount` (`NUMBER`, nullable) — Outstanding amount in currency_code, before conversion.
- `paid_amount` (`NUMBER`, nullable) — Paid amount in currency_code, before conversion.
- `currency_service_fee` (`NUMBER`, nullable) — Currency service fee in currency_code. A dash in the file means there is no value.
- `exchange_rate` (`NUMBER`, nullable) — Exchange rate on the invoice date. This is a rate, not an amount.
- `country_name` (`TEXT`, nullable) — Country name from the statement. This is not the connection marketplace.
- `account_type` (`TEXT`, nullable) — Account type text from the statement.
- `account_name` (`TEXT`, nullable) — Account name from the statement.
- `account_identifier` (`TEXT`, nullable) — Account id text from the statement. This is not the Ads profile id.
- `company_name` (`TEXT`, nullable) — Company name from the statement.
- `account_label` (`TEXT`, nullable) — Account label from the statement.
- `order_name` (`TEXT`, nullable) — Order name from the statement. A dash in the file means there is no value.
- `order_number` (`TEXT`, nullable) — Order number from the statement. A dash in the file means there is no value.
- `purchase_order_number` (`TEXT`, nullable) — Purchase order number from the statement. A dash in the file means there is no value.
- `is_provisional` (`LOGIC`, required) — True when this row has a date or amount that could not be read, or when the file headers are not the verified German columns. Leave these rows out of totals.
- `is_current` (`LOGIC`, required) — True when this row belongs to the latest stored SUCCESS statement on this Ads connection. Sum billed_amount only on these rows, and skip rows where is_provisional is true.
- `source_values` (`JSON`, required) — Ordered CSV cells as text, in the same order as source_headers.
- `observed_at_utc` (`DATE`, required) — When DataDoe stored this statement file.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
