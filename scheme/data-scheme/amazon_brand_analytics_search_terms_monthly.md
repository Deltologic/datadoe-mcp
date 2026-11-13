# Brand Analytics Search Terms (Monthly)

- BigQuery table name: `amazon_brand_analytics_search_terms_monthly`
- Available in: Seller Central, Vendor Central
- Data scheme index: ../data-scheme.md

This table exists in 2 source types. Each section below describes one of them.

## Seller Central

Monthly marketplace Brand Analytics search terms: top clicked ASINs by customer keyword and department, with search frequency rank, click share, and conversion share. Shares are 0-1 fractions. Marketplace-wide, so clicked ASINs are often competitors. For your own ASIN search query performance use amazon_child_product_organic_search_ranks_per_week or amazon_child_product_organic_search_ranks_per_month. Data can lag; use MAX(date).

- Source type: `SELLER_CENTRAL`
- Source ID: `ac6a07d258e44bd72f5ce8edc55d715650607617a4ed42b1459a416e6fb5e412`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: yes
- Rows count towards billing: no
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=ac6a07d258e44bd72f5ce8edc55d715650607617a4ed42b1459a416e6fb5e412

### Fetch periods

- `INITIAL` (365 days)
- `RECURRING_MONTHLY` (30 days, shifted by 30 days)

### Search aliases

- top search terms
- search frequency rank
- click share
- brand analytics

### Columns (14)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `date` (`DATE`, required) — First day of the month the data refers to. Represents an aggregated monthly snapshot. Data availability can lag, so use MAX(date) for the most recent month.
- `start_date` (`DATE`, nullable) — Brand Analytics report period start. May be null. Use date for filtering.
- `end_date` (`DATE`, nullable) — Brand Analytics report period end. May be null. Use date for filtering.
- `department_name` (`TEXT`, required) — Amazon search department the term was searched in, such as Amazon.com or Beauty. Rank and share metrics are scoped to this department.
- `search_term` (`TEXT`, required) — Customer search keyword.
- `search_frequency_rank` (`NUMBER`, nullable) — Rank of the search term by search frequency inside department_name. 1 is the most searched term in that department.
- `clicked_asin` (`TEXT`, required) — ASIN customers clicked after this search term. Any catalog ASIN, including products you do not sell. Amazon returns the top three clicked ASINs per term and department.
- `clicked_item_name` (`TEXT`, nullable) — Product title for clicked_asin from Amazon’s Search Terms report. Includes products outside your catalog. Null when the report does not provide a title or the row has not been reprocessed.
- `click_share_rank` (`NUMBER`, nullable) — Rank of clicked_asin by click share for this search term and department. 1 has the highest click share.
- `click_share` (`NUMBER`, nullable) — Fraction of clicks this ASIN received versus all clicks for the search term in the department, between 0 and 1. Multiply by 100 for a percentage.
- `conversion_share` (`NUMBER`, nullable) — Fraction of conversions this ASIN received versus all conversions from the search term in the department, between 0 and 1. Multiply by 100 for a percentage.

## Vendor Central

Monthly marketplace Brand Analytics search terms: top clicked ASINs by customer keyword and department, with search frequency rank, click share, and conversion share. Shares are 0-1 fractions. Marketplace-wide, so clicked ASINs are often competitors. For your own ASIN search query performance use amazon_child_product_organic_search_ranks_per_week or amazon_child_product_organic_search_ranks_per_month. Data can lag; use MAX(date).

- Source type: `VENDOR_CENTRAL`
- Source ID: `ac6a07d258e44bd72f5ce8edc55d715650607617a4ed42b1459a416e6fb5e412`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: yes
- Rows count towards billing: no
- Hub: https://www.datadoe.com/hub/data-scheme?source=VENDOR_CENTRAL&table=ac6a07d258e44bd72f5ce8edc55d715650607617a4ed42b1459a416e6fb5e412

### Fetch periods

- `INITIAL` (365 days)
- `RECURRING_MONTHLY` (30 days, shifted by 30 days)

### Search aliases

- top search terms
- search frequency rank
- click share
- brand analytics

### Columns (14)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `date` (`DATE`, required) — First day of the month the data refers to. Represents an aggregated monthly snapshot. Data availability can lag, so use MAX(date) for the most recent month.
- `start_date` (`DATE`, nullable) — Brand Analytics report period start. May be null. Use date for filtering.
- `end_date` (`DATE`, nullable) — Brand Analytics report period end. May be null. Use date for filtering.
- `department_name` (`TEXT`, required) — Amazon search department the term was searched in, such as Amazon.com or Beauty. Rank and share metrics are scoped to this department.
- `search_term` (`TEXT`, required) — Customer search keyword.
- `search_frequency_rank` (`NUMBER`, nullable) — Rank of the search term by search frequency inside department_name. 1 is the most searched term in that department.
- `clicked_asin` (`TEXT`, required) — ASIN customers clicked after this search term. Any catalog ASIN, including products you do not sell. Amazon returns the top three clicked ASINs per term and department.
- `clicked_item_name` (`TEXT`, nullable) — Product title for clicked_asin from Amazon’s Search Terms report. Includes products outside your catalog. Null when the report does not provide a title or the row has not been reprocessed.
- `click_share_rank` (`NUMBER`, nullable) — Rank of clicked_asin by click share for this search term and department. 1 has the highest click share.
- `click_share` (`NUMBER`, nullable) — Fraction of clicks this ASIN received versus all clicks for the search term in the department, between 0 and 1. Multiply by 100 for a percentage.
- `conversion_share` (`NUMBER`, nullable) — Fraction of conversions this ASIN received versus all conversions from the search term in the department, between 0 and 1. Multiply by 100 for a percentage.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
