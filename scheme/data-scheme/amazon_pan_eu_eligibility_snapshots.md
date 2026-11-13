# Pan-European eligibility snapshots

- BigQuery table name: `amazon_pan_eu_eligibility_snapshots`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

One row for each accepted Pan-European report. row_count is the number of product rows. An empty valid file has row_count 0. A failed or unreadable file does not remove an earlier row.

- Source type: `SELLER_CENTRAL`
- Source ID: `4965ff92b8951d388c7d34436d53fe9376a6571da8d7b180c0cfe25b1e51d6ca`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=4965ff92b8951d388c7d34436d53fe9376a6571da8d7b180c0cfe25b1e51d6ca

## Fetch periods

- `INITIAL` (1 days)
- `RECURRING_DAILY` (1 days)

## Data availability

- `INTRADAY` — DataDoe requests one report a day at 2am in the source marketplace time zone. A request after 2am still covers that local day, and later days return to 2am. Amazon can take up to 24 hours to generate the file. Rows appear after Amazon generates the file and after DataDoe imports and exports it. History starts with the first collected report. A day with no report stays empty. Refresh: 2am.

## Columns (16)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `report_type` (`TEXT`, required)
- `report_id` (`TEXT`, required)
- `snapshot_date` (`DATE`, required)
- `checked_at` (`DATE`, required)
- `imported_at` (`DATE`, required)
- `row_count` (`NUMBER`, required)
- `duplicate_line_count` (`NUMBER`, required) — Product rows plus identical extra lines collapsed into those rows.
- `validation_status` (`TEXT`, required)
- `present_country_codes` (`TEXT`, required) — Destination country groups present in the accepted file.
- `unmapped_headers` (`TEXT`, required) — Header names Amazon added that DataDoe has not mapped yet. The original cells stay on each product row.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
