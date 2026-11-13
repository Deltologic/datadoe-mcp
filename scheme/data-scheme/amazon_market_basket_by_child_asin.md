# Market Basket Co-Purchase (Monthly)

- BigQuery table name: `amazon_market_basket_by_child_asin`
- Available in: Seller Central, Vendor Central
- Data scheme index: ../data-scheme.md

This table exists in 2 source types. Each section below describes one of them.

## Seller Central

Monthly Brand Analytics market basket report of products frequently bought together. One row per child ASIN and co-purchased ASIN. The co-purchased ASIN can belong to another brand. purchased_with_combination_score is a 0-1 share of multi-item orders.

- Source type: `SELLER_CENTRAL`
- Source ID: `21aa739348f0c2d2dcebd1215736d082e346ef9cdd69b6ef509464f1cd249b0b`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=21aa739348f0c2d2dcebd1215736d082e346ef9cdd69b6ef509464f1cd249b0b

### Fetch periods

- `INITIAL` (365 days)
- `RECURRING_WEEKLY` (90 days)

### Search aliases

- frequently bought together
- co-purchase
- market basket

### Columns (11)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `child_asin` (`TEXT`, required)
- `purchased_with_child_asin` (`TEXT`, required) — ASIN purchased in the same customer order as child_asin. It may be outside your catalog.
- `purchased_with_rank` (`NUMBER`, required) — How often this pair is bought together. 1 is the most common ASIN purchased with child_asin.
- `purchased_with_combination_score` (`NUMBER`, required) — Share of multi-item orders that contain both ASINs, between 0 and 1. The denominator is customer orders with at least two different items that include child_asin. Multiply by 100 for a percentage.
- `date` (`DATE`, required) — First day of the month the data refers to. This table stores the MONTH Brand Analytics period.

## Vendor Central

Monthly Brand Analytics market basket report of products frequently bought together. One row per child ASIN and co-purchased ASIN. The co-purchased ASIN can belong to another brand. purchased_with_combination_score is a 0-1 share of multi-item orders.

- Source type: `VENDOR_CENTRAL`
- Source ID: `21aa739348f0c2d2dcebd1215736d082e346ef9cdd69b6ef509464f1cd249b0b`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=VENDOR_CENTRAL&table=21aa739348f0c2d2dcebd1215736d082e346ef9cdd69b6ef509464f1cd249b0b

### Fetch periods

- `INITIAL` (365 days)
- `RECURRING_WEEKLY` (90 days)

### Search aliases

- frequently bought together
- co-purchase
- market basket

### Columns (11)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `child_asin` (`TEXT`, required)
- `purchased_with_child_asin` (`TEXT`, required) — ASIN purchased in the same customer order as child_asin. It may be outside your catalog.
- `purchased_with_rank` (`NUMBER`, required) — How often this pair is bought together. 1 is the most common ASIN purchased with child_asin.
- `purchased_with_combination_score` (`NUMBER`, required) — Share of multi-item orders that contain both ASINs, between 0 and 1. The denominator is customer orders with at least two different items that include child_asin. Multiply by 100 for a percentage.
- `date` (`DATE`, required) — First day of the month the data refers to. This table stores the MONTH Brand Analytics period.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
