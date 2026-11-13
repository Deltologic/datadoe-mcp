# Replenishment Offers

- BigQuery table name: `amazon_replenishment_offers`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

Current Amazon Subscribe & Save offer snapshot by SKU (eligibility, configuration, inventory, subscriptions). Not a sales time series; use the replenishment metrics tables for SnS revenue and shipped units.

- Source type: `SELLER_CENTRAL`
- Source ID: `7290b1c5846a68e57a8841eb300452dd1902c591770b99f8164af5de3fa70dfc`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=7290b1c5846a68e57a8841eb300452dd1902c591770b99f8164af5de3fa70dfc

## Fetch periods

- `CONTINUOUS`

## Columns (21)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `child_asin` (`TEXT`, required)
- `sku` (`TEXT`, required)
- `amazon_replenishment_program_type` (`TEXT`, required) — Always SUBSCRIBE_AND_SAVE.
- `amazon_replenishment_program_eligibility` (`TEXT`, required) — Whether the offer is eligible for Subscribe & Save.
- `amazon_replenishment_fulfillment_network_id_type` (`TEXT`, required) — Fulfillment network identifier for the Subscribe & Save offer.
- `price` (`NUMBER`, required)
- `price_currency_code` (`TEXT`, required)
- `inventory` (`JSON`, nullable)
- `subscriptions` (`JSON`, nullable)
- `stock_risk` (`TEXT`, nullable)
- `vendor_codes` (`JSON`, nullable)
- `offer_program_configuration` (`JSON`, nullable)
- `deliveries_conditions` (`JSON`, nullable)
- `forecast_deliveries` (`JSON`, nullable)
- `last_seen_at` (`DATE`, required)

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
