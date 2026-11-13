# Repeat Purchase Performance (Quarterly)

- BigQuery table name: `amazon_repeat_purchase_report_quarterly`
- Available in: Seller Central, Vendor Central
- Data scheme index: ../data-scheme.md

This table exists in 2 source types. Each section below describes one of them.

## Seller Central

Quarterly Brand Analytics repeat purchase report per child ASIN for Brand Registry sellers and vendors. One row per child ASIN, connection, marketplace and calendar quarter. repeat_customers_score_total and repeat_purchase_revenue_score_total are 0-1 rates calculated inside the quarter, not the sum or average of monthly rates. Repeat revenue is ordered revenue and excludes returns. Initial collection requests the last 4 complete calendar quarters. Weekly refresh requests the last 2 complete calendar quarters. The quarter in progress is excluded.

- Source type: `SELLER_CENTRAL`
- Source ID: `869faf9a6763b60ab8edc88216bd6fbc2b1414b9eb15e7420ee1de869f1f972e`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=869faf9a6763b60ab8edc88216bd6fbc2b1414b9eb15e7420ee1de869f1f972e

### Fetch periods

- `INITIAL` (456 days)
- `RECURRING_WEEKLY` (276 days)

### Search aliases

- quarterly repeat purchase
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
- `number_of_orders` (`NUMBER`, required) — Orders that contained the child ASIN in the quarter. An order can include multiple units, so this is not ordered units.
- `number_of_unique_customers` (`NUMBER`, required) — Unique customers who placed an order containing the child ASIN in the quarter.
- `repeat_customers_score_total` (`NUMBER`, required) — Fraction of unique customers that are repeat customers in the quarter, between 0 and 1. A value of 1.00 is common on low-volume ASINs; filter by number_of_orders or number_of_unique_customers before ranking.
- `repeat_purchase_revenue_amount` (`NUMBER`, required) — Ordered revenue from repeat customers in the quarter. Returns are excluded.
- `repeat_purchase_revenue_currency` (`TEXT`, required) — ISO 4217 currency of repeat_purchase_revenue_amount.
- `repeat_purchase_revenue_score_total` (`NUMBER`, required) — Fraction of repeat-purchase revenue versus total revenue for the child ASIN in the quarter, between 0 and 1.
- `date` (`DATE`, required) — First day of the calendar quarter the data refers to: 1 January, 1 April, 1 July or 1 October. One row covers that full quarter. This table stores the QUARTER Brand Analytics period.

## Vendor Central

Quarterly Brand Analytics repeat purchase report per child ASIN for Brand Registry sellers and vendors. One row per child ASIN, connection, marketplace and calendar quarter. repeat_customers_score_total and repeat_purchase_revenue_score_total are 0-1 rates calculated inside the quarter, not the sum or average of monthly rates. Repeat revenue is ordered revenue and excludes returns. Initial collection requests the last 4 complete calendar quarters. Weekly refresh requests the last 2 complete calendar quarters. The quarter in progress is excluded.

- Source type: `VENDOR_CENTRAL`
- Source ID: `869faf9a6763b60ab8edc88216bd6fbc2b1414b9eb15e7420ee1de869f1f972e`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=VENDOR_CENTRAL&table=869faf9a6763b60ab8edc88216bd6fbc2b1414b9eb15e7420ee1de869f1f972e

### Fetch periods

- `INITIAL` (456 days)
- `RECURRING_WEEKLY` (276 days)

### Search aliases

- quarterly repeat purchase
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
- `number_of_orders` (`NUMBER`, required) — Orders that contained the child ASIN in the quarter. An order can include multiple units, so this is not ordered units.
- `number_of_unique_customers` (`NUMBER`, required) — Unique customers who placed an order containing the child ASIN in the quarter.
- `repeat_customers_score_total` (`NUMBER`, required) — Fraction of unique customers that are repeat customers in the quarter, between 0 and 1. A value of 1.00 is common on low-volume ASINs; filter by number_of_orders or number_of_unique_customers before ranking.
- `repeat_purchase_revenue_amount` (`NUMBER`, required) — Ordered revenue from repeat customers in the quarter. Returns are excluded.
- `repeat_purchase_revenue_currency` (`TEXT`, required) — ISO 4217 currency of repeat_purchase_revenue_amount.
- `repeat_purchase_revenue_score_total` (`NUMBER`, required) — Fraction of repeat-purchase revenue versus total revenue for the child ASIN in the quarter, between 0 and 1.
- `date` (`DATE`, required) — First day of the calendar quarter the data refers to: 1 January, 1 April, 1 July or 1 October. One row covers that full quarter. This table stores the QUARTER Brand Analytics period.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
