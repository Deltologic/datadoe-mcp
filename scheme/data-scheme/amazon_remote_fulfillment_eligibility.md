# Remote Fulfillment Eligibility

- BigQuery table name: `amazon_remote_fulfillment_eligibility`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

Remote Fulfillment eligibility for each product and destination country. Offer status and more details are the reported eligibility. A blank inclusion request is an empty seller input, not proof the product is unenrolled. The current state is the latest complete report for the source marketplace.

- Source type: `SELLER_CENTRAL`
- Source ID: `1d28c4f8606f6babd56ec9b1db2f2de874cfde04f54424cdae912e347ea98671`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=1d28c4f8606f6babd56ec9b1db2f2de874cfde04f54424cdae912e347ea98671

## Fetch periods

- `INITIAL` (1 days)
- `RECURRING_DAILY` (1 days)

## Data availability

- `INTRADAY` — DataDoe requests one report a day at 2am in the source marketplace time zone. Amazon can take up to 24 hours to generate it. Rows appear after Amazon generates the file and after DataDoe imports and exports it. This is not a same-day feed. Refresh: 2am.

## Search aliases

- remote fulfillment
- remote fulfilment
- eligibility
- offer status

## Columns (22)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `date` (`DATE`, required) — Snapshot date in the source marketplace time zone, from the time Amazon created the report.
- `snapshot_time` (`DATE`, required) — Time Amazon created the report. This is when DataDoe observed the file, not when eligibility changed.
- `report_id` (`TEXT`, required)
- `source_format` (`TEXT`, required) — XLSX for the Seller Central workbook, or TSV for the flat file.
- `source_sheet` (`TEXT`, nullable) — Workbook sheet name. Empty for a flat file.
- `sku` (`TEXT`, required)
- `child_asin` (`TEXT`, required)
- `product_name` (`TEXT`, nullable)
- `destination_country_label` (`TEXT`, nullable) — Destination label printed in the workbook. Empty when the report names no destination.
- `destination_marketplace_id` (`TEXT`, nullable) — Amazon marketplace ID for a destination named in the workbook. Empty when the report names no destination.
- `destination_country_code` (`TEXT`, nullable) — Country code for the destination marketplace. Empty when the report names no destination.
- `destination_country_name` (`TEXT`, nullable) — Country name for the destination marketplace. Empty when the report names no destination.
- `offer_status` (`TEXT`, nullable) — Amazon offer status for this destination. Known values include Enabled, Not eligible, Action required, Undetermined, and Not applicable. Other values are kept as reported.
- `more_details` (`TEXT`, nullable) — Amazon reason text for the offer status, including line breaks. A blank cell is empty.
- `inclusion_request` (`TEXT`, nullable) — Text from the Enable/disable cell. A blank cell is empty. DataDoe does not treat it as enrolment and does not send it to Amazon.
- `is_enabled` (`LOGIC`, nullable) — True only when offer status is Enabled. False only when offer status is Disabled. Every other status is empty. Use offer status for the reported eligibility.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
