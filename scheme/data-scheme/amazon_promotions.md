# Promotions

- BigQuery table name: `amazon_promotions`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

Promotion configuration per promotion, including schedule, benefit, budget, fees, and selection metadata. Complements amazon_promotion_performance, which contains historical performance metrics.

- Source type: `SELLER_CENTRAL`
- Source ID: `e6af85f774f72dc9bd7e23c3fbfd5b1f6c89a2e96622bbb4ca106572bebe46f3`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=e6af85f774f72dc9bd7e23c3fbfd5b1f6c89a2e96622bbb4ca106572bebe46f3

## Fetch periods

- `CONTINUOUS`

## Columns (46)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `promotion_id` (`TEXT`, required)
- `tracking_id` (`TEXT`, nullable)
- `promotion_title` (`TEXT`, nullable)
- `promotion_type` (`TEXT`, nullable)
- `coupon_type` (`TEXT`, nullable)
- `status` (`TEXT`, nullable)
- `start_date` (`DATE`, nullable)
- `end_date` (`DATE`, nullable)
- `event_id` (`TEXT`, nullable)
- `budget_type` (`TEXT`, nullable)
- `budget_value` (`NUMBER`, nullable)
- `budget_currency` (`TEXT`, nullable)
- `selection_id` (`TEXT`, nullable)
- `selection_revision_id` (`NUMBER`, nullable)
- `selection_type` (`TEXT`, nullable)
- `benefit_discount_type` (`TEXT`, nullable)
- `benefit_percent_off` (`NUMBER`, nullable) — Percent points off list price when the discount type is a percent. Not a 0–1 fraction. Unused when the discount is a currency amount.
- `benefit_amount_off` (`NUMBER`, nullable)
- `benefit_currency` (`TEXT`, nullable)
- `benefit_per_customer_uses` (`NUMBER`, nullable)
- `benefit_stacking` (`TEXT`, nullable)
- `benefit_quantity` (`NUMBER`, nullable)
- `purchase_req_quantity_type` (`TEXT`, nullable)
- `purchase_req_quantity` (`NUMBER`, nullable)
- `claim_code_type` (`TEXT`, nullable)
- `claim_code_value` (`TEXT`, nullable)
- `display_on_website` (`TEXT`, nullable)
- `upfront_fee_amount` (`NUMBER`, nullable)
- `upfront_fee_currency` (`TEXT`, nullable)
- `upfront_fee_frequency` (`TEXT`, nullable)
- `variable_fee_pct` (`NUMBER`, nullable)
- `variable_fee_cap_amount` (`NUMBER`, nullable)
- `variable_fee_cap_currency` (`TEXT`, nullable)
- `latest_revision_status` (`TEXT`, nullable)
- `created_date` (`DATE`, nullable)
- `last_updated_date` (`DATE`, nullable)
- `last_synced_at` (`DATE`, required)
- `issues` (`JSON`, nullable) — Same as JSON payload from Amazon SP-API.
- `customer_segments` (`JSON`, nullable) — Same as JSON payload from Amazon SP-API.
- `additional_tiers` (`JSON`, nullable) — Same as JSON payload from Amazon SP-API.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
