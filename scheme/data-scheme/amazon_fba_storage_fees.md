# FBA Storage Fee Charges

- BigQuery table name: `amazon_fba_storage_fees`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

Daily FBA storage fee charges with historical data.

- Source type: `SELLER_CENTRAL`
- Source ID: `316ea56bca9b5c665b2aa835c861b634d7cada971aa3814abf8f872b7e3f469e`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=316ea56bca9b5c665b2aa835c861b634d7cada971aa3814abf8f872b7e3f469e

## Fetch periods

- `INITIAL` (-1 days)
- `RECURRING_DAILY` (1 days)

## Columns (37)

- `marketplace_id` (`TEXT`, nullable) — Amazon provided ID that represents a specific country where the Seller or Vendor operates. Null on regional rows (attribution_method = regional).
- `marketplace_country_code` (`TEXT`, nullable) — ISO country code for the Amazon marketplace. Null on regional rows (attribution_method = regional).
- `marketplace_country_name` (`TEXT`, nullable) — Human-readable country name for the marketplace (derived from marketplace_id). Null on regional rows (attribution_method = regional).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `regional_account_id` (`TEXT`, nullable) — Amazon seller account of the row: <organization_id>:<seller_id>:<region> (NA, EU or FE). One seller account serves all its marketplaces in an SP-API region. Null when the connection has no seller ID.
- `attribution_method` (`TEXT`, required) — How the row was tied to a marketplace. connection: the row belongs to its marketplace connection. order / sales_channel: tied to the marketplace from the order or sales channel. regional: the row belongs to the whole seller account (regional_account_id), not to one marketplace; it appears once per account in exports for any selected marketplace of that account, and marketplace columns are null. Summing separate per-marketplace exports counts regional rows once per export.
- `warehouse_country` (`TEXT`, nullable) — Warehouse or fulfillment center country (ISO code, GB for the United Kingdom) when the report has one. It is not the sales marketplace.
- `source_connection_id` (`TEXT`, required, BigQuery only) — Connection whose report copy holds the row. Every marketplace connection of a seller account downloads the same regional report; one copy is shown per account. — available in BigQuery only — cannot be requested in exports / MCP `exports_create`
- `child_asin` (`TEXT`, required)
- `fnsku` (`TEXT`, required)
- `product_name` (`TEXT`, required)
- `fulfillment_center` (`TEXT`, required)
- `country_code` (`TEXT`, required)
- `longest_side` (`NUMBER`, required)
- `median_side` (`NUMBER`, required)
- `shortest_side` (`NUMBER`, required)
- `measurement_units` (`TEXT`, required) — centimeters
- `weight` (`NUMBER`, required)
- `weight_units` (`TEXT`, required) — kilograms
- `item_volume` (`NUMBER`, required)
- `volume_units` (`TEXT`, required) — cubic feet / cubic meters
- `product_size_tier` (`TEXT`, required) — Oversize / Standard-Size
- `average_quantity_on_hand` (`NUMBER`, required)
- `average_quantity_pending_removal` (`NUMBER`, required)
- `estimated_total_item_volume` (`NUMBER`, required)
- `month_of_charge` (`DATE`, required) — First day of the month this charge refers to.
- `storage_rate` (`NUMBER`, required)
- `currency` (`TEXT`, required) — Currency code.
- `estimated_monthly_storage_fee` (`NUMBER`, required)
- `dangerous_goods_storage_type` (`TEXT`, required) — Dangerous goods storage type enum values.
- `eligible_for_inventory_discount` (`LOGIC`, required)
- `qualifies_for_inventory_discount` (`LOGIC`, required)
- `total_incentive_fee_amount` (`NUMBER`, required)
- `breakdown_incentive_fee_amount` (`NUMBER`, required)
- `average_quantity_customer_orders` (`NUMBER`, required)

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
