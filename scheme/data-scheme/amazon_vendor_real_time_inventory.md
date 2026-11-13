# Real-Time Inventory by ASIN & Hour

- BigQuery table name: `amazon_vendor_real_time_inventory`
- Available in: Vendor Central
- Data scheme index: ../data-scheme.md

Hourly highly available inventory per ASIN (GET_VENDOR_REAL_TIME_INVENTORY_REPORT). Units Amazon can still sell, not on-hand sellable inventory from the daily table.

- Source type: `VENDOR_CENTRAL`
- Source ID: `a56e22527075e070599d6d314d30eba4a0ad7474192df1b61ce74ba424d19b7f`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=VENDOR_CENTRAL&table=a56e22527075e070599d6d314d30eba4a0ad7474192df1b61ce74ba424d19b7f

## Fetch periods

- `INITIAL` (28 days, shifted by 4 days)
- `RECURRING_DAILY` (3 days, shifted by 4 days)
- `RECURRING_MONTHLY` (28 days, shifted by 4 days)

## Search aliases

- vendor inventory
- highly available

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
- `highly_available_inventory_units` (`NUMBER`, required) — Units available to sell: sellable units in Amazon fulfillment centers minus units in carts or otherwise bound (for example known Subscribe & Save). Not sellable_on_hand_inventory_units.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
