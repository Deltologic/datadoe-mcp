# AWD Replenishment Orders

- BigQuery table name: `amazon_awd_replenishment_orders`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

AWD replenishment orders by order id.

- Source type: `SELLER_CENTRAL`
- Source ID: `cedb25975382c4cbae7e2d8a5a58b19b12fa947bd64218476e2b6f4d530128d2`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=cedb25975382c4cbae7e2d8a5a58b19b12fa947bd64218476e2b6f4d530128d2

## Fetch periods

- `CONTINUOUS`

## Columns (15)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `awd_replenishment_order_id` (`TEXT`, required)
- `awd_replenishment_order_status` (`TEXT`, nullable)
- `confirmed_on` (`DATE`, nullable)
- `created_at` (`DATE`, nullable)
- `updated_at` (`DATE`, nullable)
- `distribution_ineligible_reasons` (`JSON`, nullable)
- `outbound_shipments` (`JSON`, nullable)
- `last_seen_at` (`DATE`, required)
- `date` (`DATE`, required) — Date the order was created.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
