# Promotion Items

- BigQuery table name: `amazon_promotion_items`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

Item-level promotion configuration for ITEMS selections, including per-ASIN/SKU benefits and budgets.

- Source type: `SELLER_CENTRAL`
- Source ID: `d16e37cdf85c425f65883fc9e1303d58bfc55d5a3708e04d680544f09a8a3c70`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=d16e37cdf85c425f65883fc9e1303d58bfc55d5a3708e04d680544f09a8a3c70

## Fetch periods

- `CONTINUOUS`

## Columns (22)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `promotion_id` (`TEXT`, required)
- `asin` (`TEXT`, required)
- `sku` (`TEXT`, required)
- `benefit_type` (`TEXT`, nullable)
- `benefit_discount_type` (`TEXT`, nullable)
- `benefit_percent_off` (`NUMBER`, nullable) — Percent points off list price when the discount type is a percent. Not a 0–1 fraction. Unused when the discount is a currency amount.
- `benefit_amount_off` (`NUMBER`, nullable)
- `benefit_discount_currency` (`TEXT`, nullable)
- `benefit_fixed_price` (`NUMBER`, nullable)
- `benefit_fixed_price_currency` (`TEXT`, nullable)
- `benefit_per_customer_uses` (`NUMBER`, nullable)
- `budget_type` (`TEXT`, nullable)
- `budget_value` (`NUMBER`, nullable)
- `budget_currency` (`TEXT`, nullable)
- `issues` (`JSON`, nullable) — Same as JSON payload from Amazon SP-API.
- `last_synced_at` (`DATE`, required)

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
