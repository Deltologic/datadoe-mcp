# Real-Time Sales by ASIN & Hour

- BigQuery table name: `amazon_vendor_real_time_sales`
- Available in: Vendor Central
- Data scheme index: ../data-scheme.md

Hourly units and revenue ordered by Amazon customers per ASIN (GET_VENDOR_REAL_TIME_SALES_REPORT). Not Amazon-to-vendor purchase-order quantity. Not the daily manufacturing_retail_ordered_units series.

- Source type: `VENDOR_CENTRAL`
- Source ID: `6deb661209df982eaba69d8624bbd9b31d112a67163fc45f02bb3bc1958a9ca7`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=VENDOR_CENTRAL&table=6deb661209df982eaba69d8624bbd9b31d112a67163fc45f02bb3bc1958a9ca7

## Fetch periods

- `INITIAL` (28 days, shifted by 4 days)
- `RECURRING_DAILY` (3 days, shifted by 4 days)
- `RECURRING_MONTHLY` (28 days, shifted by 4 days)

## Search aliases

- pos
- vendor sales
- hourly sales

## Columns (14)

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
- `ordered_units` (`NUMBER`, required) — Units ordered by Amazon customers in this hour. Not Amazon-to-vendor purchase-order quantity.
- `ordered_revenue` (`NUMBER`, required) — Revenue from units ordered by Amazon customers in this hour. Not purchase-order value.
- `ordered_revenue_currency` (`TEXT`, required)

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
