# Geo Sales by ASIN & Date

- BigQuery table name: `amazon_vendor_geo_sales_by_asin_and_date`
- Available in: Vendor Central
- Data scheme index: ../data-scheme.md

Daily shipped sales by Vendor connection, view, child ASIN and customer country from Amazon Geo Sales. Shipped units are not ordered units. This dataset does not reproduce all-accounts, cross-marketplace Retail Analytics. Filter vendor_view to SOURCING or MANUFACTURING before summing. The views overlap and must not be added together. customer_country_code is the shipment destination. marketplace_country_code identifies the connection marketplace, not the customer or warehouse country. Use customer_country_code as a column filter for destination sales. Summing countries gives the same shipped sales already included in the equivalent connection totals, not additional sales. This table has no warehouse location, inventory or stock-by-store breakdown. Shipped revenue is Amazon customer revenue, not the vendor procurement price. Compare the same view, dates, metric and currency.

- Source type: `VENDOR_CENTRAL`
- Source ID: `ad00bc8aa232f64ebb758312067a28ea7343e51216b444af8be12d4553e2ffca`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=VENDOR_CENTRAL&table=ad00bc8aa232f64ebb758312067a28ea7343e51216b444af8be12d4553e2ffca

## Fetch periods

- `INITIAL` (720 days, shifted by 3 days)
- `RECURRING_DAILY` (7 days, shifted by 3 days)

## Search aliases

- geo sales
- customer country
- ship to country
- shipment destination
- cross-border sales

## Columns (14)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `date` (`DATE`, required) — Amazon reporting day for these shipped sales.
- `child_asin` (`TEXT`, required)
- `vendor_view` (`TEXT`, required) — SOURCING covers products sourced directly from this vendor. MANUFACTURING covers products manufactured by the vendor, regardless of who sourced them. Filter to one view before summing.
- `customer_country_code` (`TEXT`, nullable) — Customer shipment destination in ISO 3166-1 alpha-2 format from Amazon shipToCountryCode. Null when Amazon omits the country. Filter this column for customer-country sales. It is not the Amazon store or warehouse country.
- `vendor_code` (`TEXT`, nullable) — Vendor code uploaded for this Vendor connection. ASIN-based tables prefer an ASIN upload. A SKU-only upload can match through Vendor Listings when the SKU maps to one ASIN and the inferred codes for that ASIN agree. Ambiguous matches stay null. Uploads label existing rows and do not identify stock location. To list ASINs sold in the last 30 days without a vendor code, use GET /api/v1/vendor-codes/missing or the MCP tool vendor_codes_missing_list.
- `shipped_units` (`NUMBER`, nullable) — Units shipped to customers in this country for the selected Vendor view, ASIN and day. Shipped units are not ordered units. Included in the corresponding connection total.
- `shipped_revenue` (`NUMBER`, nullable) — Amazon customer revenue for shipped units in this country. Not the price Amazon paid the vendor. Sum only within the same currency and Vendor view.
- `currency` (`TEXT`, nullable) — ISO 4217 currency code for shipped_revenue.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
