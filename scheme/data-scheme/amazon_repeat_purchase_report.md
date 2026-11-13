# Repeat Purchase Performance

- BigQuery table name: `amazon_repeat_purchase_report`
- Available in: Seller Central, Vendor Central
- Data scheme index: ../data-scheme.md

This table exists in 2 source types. Each section below describes one of them.

## Seller Central

Monthly Brand Analytics repeat purchase report per child ASIN for Brand Registry sellers and vendors. One row per child ASIN and month. repeat_customers_score_total and repeat_purchase_revenue_score_total are 0-1 rates. Repeat revenue is ordered revenue and excludes returns.

- Source type: `SELLER_CENTRAL`
- Source ID: `8723a9f82b37438b5224867ac182d2e773bea12532b9f5ad2930811a6f219f90`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=8723a9f82b37438b5224867ac182d2e773bea12532b9f5ad2930811a6f219f90

### Fetch periods

- `INITIAL` (365 days)
- `RECURRING_WEEKLY` (90 days)

### Search aliases

- repeat customers
- customer retention
- brand analytics

### Columns (14)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `child_asin` (`TEXT`, required)
- `number_of_orders` (`NUMBER`, required) — Orders that contained the child ASIN in the month. An order can include multiple units, so this is not ordered units.
- `number_of_unique_customers` (`NUMBER`, required) — Unique customers who placed an order containing the child ASIN in the month.
- `repeat_customers_score_total` (`NUMBER`, required) — Fraction of unique customers that are repeat customers in the month, between 0 and 1. A value of 1.00 is common on low-volume ASINs; filter by number_of_orders or number_of_unique_customers before ranking.
- `repeat_purchase_revenue_amount` (`NUMBER`, required) — Ordered revenue from repeat customers in the month. Returns are excluded.
- `repeat_purchase_revenue_currency` (`TEXT`, required) — ISO 4217 currency of repeat_purchase_revenue_amount.
- `repeat_purchase_revenue_score_total` (`NUMBER`, required) — Fraction of repeat-purchase revenue versus total revenue for the child ASIN in the month, between 0 and 1.
- `date` (`DATE`, required) — First day of the month the data refers to. This table stores the MONTH Brand Analytics period.

## Vendor Central

Monthly Brand Analytics repeat purchase report per child ASIN for Brand Registry sellers and vendors. One row per child ASIN and month. repeat_customers_score_total and repeat_purchase_revenue_score_total are 0-1 rates. Repeat revenue is ordered revenue and excludes returns.

- Source type: `VENDOR_CENTRAL`
- Source ID: `8723a9f82b37438b5224867ac182d2e773bea12532b9f5ad2930811a6f219f90`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=VENDOR_CENTRAL&table=8723a9f82b37438b5224867ac182d2e773bea12532b9f5ad2930811a6f219f90

### Fetch periods

- `INITIAL` (365 days)
- `RECURRING_WEEKLY` (90 days)

### Search aliases

- repeat customers
- customer retention
- brand analytics

### Columns (14)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `child_asin` (`TEXT`, required)
- `number_of_orders` (`NUMBER`, required) — Orders that contained the child ASIN in the month. An order can include multiple units, so this is not ordered units.
- `number_of_unique_customers` (`NUMBER`, required) — Unique customers who placed an order containing the child ASIN in the month.
- `repeat_customers_score_total` (`NUMBER`, required) — Fraction of unique customers that are repeat customers in the month, between 0 and 1. A value of 1.00 is common on low-volume ASINs; filter by number_of_orders or number_of_unique_customers before ranking.
- `repeat_purchase_revenue_amount` (`NUMBER`, required) — Ordered revenue from repeat customers in the month. Returns are excluded.
- `repeat_purchase_revenue_currency` (`TEXT`, required) — ISO 4217 currency of repeat_purchase_revenue_amount.
- `repeat_purchase_revenue_score_total` (`NUMBER`, required) — Fraction of repeat-purchase revenue versus total revenue for the child ASIN in the month, between 0 and 1.
- `date` (`DATE`, required) — First day of the month the data refers to. This table stores the MONTH Brand Analytics period.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
