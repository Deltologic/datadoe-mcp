# FBA Inbound Performance

- BigQuery table name: `amazon_fba_inbound_performance`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

FBA shipment problems from Amazon's FBA Inbound Performance report. Each row is one problem on one collected report. DataDoe requests the report at 2am and 1pm in the marketplace time zone. Each request asks for problems reported in the previous 120 days. Amazon may return the same file, because it generates this report at most every 4 hours. Rows appear after Amazon generates the file and after DataDoe imports and exports it. Each collected file is kept. History starts with the first collected file. Use is_latest_daily_snapshot for the latest file of a local day, and is_latest_snapshot for the current file. A missing row is not a resolved problem.

- Source type: `SELLER_CENTRAL`
- Source ID: `a08d1aa0e826749de9ac5abc59f37eb368924aa2e279520a938216b406726240`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=a08d1aa0e826749de9ac5abc59f37eb368924aa2e279520a938216b406726240

## Fetch periods

- `INITIAL` (120 days)
- `RECURRING_DAILY` (120 days)

## Data availability

- `INTRADAY` — DataDoe requests this report at 2am and 1pm in the source marketplace time zone. Each request asks for problems reported in the previous 120 days. Amazon may return the same file, because it generates this report at most every 4 hours. Rows appear after Amazon generates the file and after DataDoe imports and exports it. Each collected file is kept. History starts with the first collected file. Refresh: 2am, 1pm.

## Search aliases

- shipment problems
- inbound performance
- fba inbound
- inbound noncompliance

## Columns (42)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `regional_account_id` (`TEXT`, nullable) — Amazon seller account of the row: <organization_id>:<seller_id>:<region> (NA, EU or FE). Null when the connection has no seller ID.
- `attribution_method` (`TEXT`, required) — How the row is tied to a marketplace. connection: the row belongs to the marketplace connection that supplied the report.
- `source_connection_id` (`TEXT`, required) — Connection that supplied the report.
- `warehouse_country` (`TEXT`, nullable) — Empty. DataDoe does not infer a country from a fulfillment center code.
- `date` (`DATE`, required) — Snapshot calendar date from the time Amazon created the report, in the source marketplace time zone. It is not the issue date or the import date.
- `snapshot_time` (`DATE`, required) — Time Amazon created the report. Retries of the same report keep this time.
- `report_id` (`TEXT`, required) — Amazon report identifier.
- `report_processing_end_time` (`DATE`, nullable) — Time Amazon finished the report. Empty when Amazon did not return it.
- `data_start_time` (`DATE`, required) — Start of the issue window Amazon used for this report.
- `data_end_time` (`DATE`, required) — End of the issue window Amazon used for this report.
- `source_row_number` (`NUMBER`, required) — 1-based row number in the Amazon file. Rows that share a problem key stay separate.
- `problem_key` (`TEXT`, required) — Stable hash of the seller, marketplace, issue time, shipment, carton, fulfillment center, SKU, FNSKU, ASIN, problem type, problem level and measurement unit. It is not an Amazon problem ID. Alert status, coaching, quantities, fees and product text are not part of it.
- `is_latest_daily_snapshot` (`LOGIC`, required) — True for every row of the latest complete report for this connection and marketplace on this snapshot date.
- `is_latest_snapshot` (`LOGIC`, required) — True for every row of the latest complete report for this connection and marketplace.
- `dt_created` (`DATE`, required) — Time DataDoe exported the row.
- `dt_updated` (`DATE`, required) — Time DataDoe last exported the row.
- `issue_reported_date` (`DATE`, required) — Time Amazon reported the problem, stored in UTC.
- `shipment_creation_date` (`DATE`, nullable) — Time Amazon recorded for shipment creation, stored in UTC. Empty when Amazon leaves the cell blank.
- `shipment_confirmation_id` (`TEXT`, nullable) — FBA shipment confirmation ID. Join amazon_fba_inbound_shipments on this value, not the v2024 internal shipment ID.
- `fba_carton_id` (`TEXT`, nullable)
- `fulfillment_center_id` (`TEXT`, nullable)
- `seller_sku` (`TEXT`, nullable) — Seller SKU from the report. Empty when Amazon leaves the cell blank. DataDoe does not fill it from another table.
- `fnsku` (`TEXT`, nullable)
- `child_asin` (`TEXT`, nullable)
- `product_name` (`TEXT`, nullable)
- `problem_type` (`TEXT`, nullable) — Problem type as Amazon reported it, including values DataDoe has not seen before.
- `problem_quantity` (`NUMBER`, nullable)
- `expected_quantity` (`NUMBER`, nullable)
- `received_quantity` (`NUMBER`, nullable) — Quantity Amazon received. Zero stays zero. A blank cell is empty.
- `performance_measurement_unit` (`TEXT`, nullable)
- `coaching_level` (`TEXT`, nullable)
- `fee_type` (`TEXT`, nullable)
- `currency` (`TEXT`, nullable) — Currency Amazon reported for the fee. A blank amount does not add a currency.
- `fee_total` (`NUMBER`, nullable) — Fee amount as Amazon reported it. A blank cell is empty, not zero.
- `problem_level` (`TEXT`, nullable)
- `alert_status` (`TEXT`, nullable) — Alert status as Amazon reported it, including NONE, ACKNOWLEDGED and later values. A blank cell is empty.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
