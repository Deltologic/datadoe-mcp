# Real-Time Traffic by ASIN & Hour

- BigQuery table name: `amazon_vendor_real_time_traffic`
- Available in: Vendor Central
- Data scheme index: ../data-scheme.md

Hourly detail-page views per ASIN (GET_VENDOR_REAL_TIME_TRAFFIC_REPORT). All customer views of the detail page, not the daily glance_views column (Featured Offer wins only).

- Source type: `VENDOR_CENTRAL`
- Source ID: `25b8d04247fe4b4c096d3f58bbb577fd41c23c4c9da93bd232134a468c2fde9d`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=VENDOR_CENTRAL&table=25b8d04247fe4b4c096d3f58bbb577fd41c23c4c9da93bd232134a468c2fde9d

## Fetch periods

- `INITIAL` (28 days, shifted by 4 days)
- `RECURRING_DAILY` (3 days, shifted by 4 days)
- `RECURRING_MONTHLY` (28 days, shifted by 4 days)

## Search aliases

- glance views
- hourly traffic

## Columns (12)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `asin` (`TEXT`, required)
- `vendor_code` (`TEXT`, nullable) — Vendor code uploaded for this Vendor connection. ASIN-based tables prefer an ASIN upload. A SKU-only upload can match through Vendor Listings when the SKU maps to one ASIN and the inferred codes for that ASIN agree. Ambiguous matches stay null. Uploads label existing rows and do not identify stock location. To list ASINs sold in the last 30 days without a vendor code, use GET /api/v1/vendor-codes/missing or the MCP tool vendor_codes_missing_list.
- `start_time` (`DATE`, required) — Start of the hourly reporting window.
- `end_time` (`DATE`, required) — End of the hourly reporting window.
- `date` (`DATE`, required) — UTC calendar day of start_time. Use for date filtering.
- `glance_views` (`NUMBER`, required) — Customer views of the ASIN detail page in this hour. Not daily glance_views, which count only Featured Offer (Buy Box) wins.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
