# FBA Restock Recommendations

- BigQuery table name: `amazon_fba_restock_recommendations`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

FBA restock recommendations with inventory levels, sales velocity, and replenishment guidance stored as daily snapshots.

- Source type: `SELLER_CENTRAL`
- Source ID: `542b4c4b4e2d6a223d2af0ce839a7666a32fb3e5338a0731610ef9658cb7935c`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=542b4c4b4e2d6a223d2af0ce839a7666a32fb3e5338a0731610ef9658cb7935c

## Fetch periods

- `INITIAL` (1 days)
- `RECURRING_DAILY` (1 days)

## Data availability

- `INTRADAY` — Intraday updates are available when source data changes during the day. Refresh: 1pm.

## Columns (36)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `date` (`DATE`, required) — Snapshot date.
- `country` (`TEXT`, nullable)
- `product_name` (`TEXT`, required)
- `fnsku` (`TEXT`, required)
- `sku` (`TEXT`, required)
- `child_asin` (`TEXT`, required)
- `condition` (`TEXT`, nullable)
- `supplier` (`TEXT`, nullable)
- `supplier_part_no` (`TEXT`, nullable)
- `currency_code` (`TEXT`, nullable)
- `price` (`NUMBER`, nullable)
- `sales_last_30_days` (`NUMBER`, nullable)
- `units_sold_last_30_days` (`NUMBER`, nullable)
- `total_units` (`NUMBER`, nullable)
- `inbound` (`NUMBER`, nullable)
- `available` (`NUMBER`, nullable)
- `fc_transfer` (`NUMBER`, nullable)
- `fc_processing` (`NUMBER`, nullable)
- `customer_order` (`NUMBER`, nullable)
- `unfulfillable` (`NUMBER`, nullable)
- `working` (`NUMBER`, nullable)
- `shipped` (`NUMBER`, nullable)
- `receiving` (`NUMBER`, nullable)
- `fulfilled_by` (`TEXT`, nullable)
- `total_days_of_supply_including_units_from_open_shipments` (`NUMBER`, nullable)
- `days_of_supply_at_amazon_fulfillment_network` (`NUMBER`, nullable)
- `alert` (`TEXT`, nullable)
- `recommended_replenishment_qty` (`NUMBER`, nullable)
- `recommended_ship_date` (`DATE`, nullable)
- `unit_storage_size` (`TEXT`, nullable)

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
