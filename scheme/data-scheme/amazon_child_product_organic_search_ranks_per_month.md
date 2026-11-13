# Search Query Performance (SQP) by ASIN (Monthly)

- BigQuery table name: `amazon_child_product_organic_search_ranks_per_month`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

Monthly Search Query Performance (SQP) per child ASIN and search query (GET_BRAND_ANALYTICS_SEARCH_QUERY_PERFORMANCE_REPORT). child_asin_* columns are this ASIN. search_query_total_* and search_query_volume are the whole query and repeat on every ASIN row. Rates follow Amazon schema examples of 0–1. Only configured SQP ASINs are included. Not amazon_child_product_search_performance_per_month (catalog-level search engagement).

- Source type: `SELLER_CENTRAL`
- Source ID: `df4160ff8e1add239172a69ebd6c8abfec7116ee4a17720983757b1b55599830`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=df4160ff8e1add239172a69ebd6c8abfec7116ee4a17720983757b1b55599830

## Fetch periods

- `INITIAL` (60 days, shifted by 30 days)
- `RECURRING_MONTHLY` (30 days, shifted by 30 days)

## Known issues

- **SQP data is available only for selected ASINs** — DataDoe downloads SQP data only for ASINs you configure. Open your Sellers & Vendors list in the app, select a Seller in a supported marketplace, then choose SQP ASINs to add up to 252 ASINs per connection. SQP is not available for Vendor accounts or some Amazon stores. If the list is empty, no SQP data is downloaded for that Seller.
- **SQP is available only for Seller Central in supported Amazon stores** — Amazon Search Query Performance reports are available only for Seller Central accounts in North America (all stores), Far East (all stores), and these European stores: Spain, United Kingdom, France, Netherlands, Germany, Italy, Sweden, Turkey, Saudi Arabia, United Arab Emirates, and India. Vendor accounts and other stores cannot download SQP data.

## Prerequisites

DataDoe downloads SQP data only for ASINs you configure. Open your Sellers & Vendors list in the app, select a Seller in a supported Amazon store, then choose SQP ASINs to add up to 252 ASINs per connection. If the list is empty, no SQP data is downloaded for that Seller.

## Search aliases

- sqp
- search query performance

## Columns (44)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `date` (`DATE`, required) — First day of the month the data refers to. Represents an aggregated monthly snapshot. Data availability can lag, so use MAX(date) for the most recent month.
- `child_asin` (`TEXT`, required)
- `search_query` (`TEXT`, required)
- `search_query_volume` (`NUMBER`, required) — Total search volume for this search query across all ASINs. Each row for the same date and search query will have the same value. Do not sum it for the same date.
- `search_query_total_impression_count` (`NUMBER`, required) — Total impression count for this search query across all ASINs. Each row for the same date and search query will have the same value. Do not sum it for the same date.
- `child_asin_organic_search_rank` (`NUMBER`, required) — Deprecated name for child_asin_search_query_score. Contains the same Amazon Search Query Score, not the ASIN's position in Amazon search results. Retained for existing integrations. This name should not be used for new queries; use child_asin_search_query_score instead.
- `child_asin_impression_count` (`NUMBER`, required)
- `child_asin_click_count` (`NUMBER`, required)
- `child_asin_median_click_price_value` (`NUMBER`, required)
- `child_asin_median_click_price_currency` (`TEXT`, required)
- `child_asin_add_to_cart_count` (`NUMBER`, required)
- `child_asin_purchase_count` (`NUMBER`, required)
- `search_query_total_purchase_count` (`NUMBER`, required)
- `search_query_total_purchase_rate` (`NUMBER`, required) — Purchases of any ASIN divided by search query volume. Amazon schema examples are 0–1 fractions (0.1 means 10%). A published report mismatch has returned 0–100 instead; do not multiply by 100 when values are already below 1. Query-level value repeated on every ASIN row for the same date and search_query. Do not sum it across ASINs.
- `search_query_total_same_day_shipping_purchase_count` (`NUMBER`, required)
- `search_query_total_one_day_shipping_purchase_count` (`NUMBER`, required)
- `search_query_total_two_day_shipping_purchase_count` (`NUMBER`, required)
- `search_query_total_click_count` (`NUMBER`, required)
- `search_query_total_click_rate` (`NUMBER`, required) — Clicks on any ASIN divided by search query volume. Amazon schema examples are 0–1 fractions (0.1 means 10%). A published report mismatch has returned 0–100 instead; do not multiply by 100 when values are already below 1. Query-level value repeated on every ASIN row for the same date and search_query. Do not sum it across ASINs.
- `search_query_total_same_day_shipping_click_count` (`NUMBER`, required)
- `search_query_total_one_day_shipping_click_count` (`NUMBER`, required)
- `search_query_total_two_day_shipping_click_count` (`NUMBER`, required)
- `search_query_total_cart_add_count` (`NUMBER`, required)
- `search_query_total_cart_add_rate` (`NUMBER`, required) — Cart adds of any ASIN divided by search query volume. Amazon schema examples are 0–1 fractions (0.1 means 10%). A published report mismatch has returned 0–100 instead; do not multiply by 100 when values are already below 1. Query-level value repeated on every ASIN row for the same date and search_query. Do not sum it across ASINs.
- `search_query_total_same_day_shipping_cart_add_count` (`NUMBER`, required)
- `search_query_total_one_day_shipping_cart_add_count` (`NUMBER`, required)
- `search_query_total_two_day_shipping_cart_add_count` (`NUMBER`, required)
- `search_query_total_median_click_price_value` (`NUMBER`, nullable)
- `search_query_total_median_click_price_currency` (`TEXT`, nullable)
- `search_query_total_median_cart_add_price_value` (`NUMBER`, nullable)
- `search_query_total_median_cart_add_price_currency` (`TEXT`, nullable)
- `search_query_total_median_purchase_price_value` (`NUMBER`, nullable)
- `search_query_total_median_purchase_price_currency` (`TEXT`, nullable)
- `child_asin_median_cart_add_price_value` (`NUMBER`, nullable)
- `child_asin_median_cart_add_price_currency` (`TEXT`, nullable)
- `child_asin_median_purchase_price_value` (`NUMBER`, nullable)
- `child_asin_median_purchase_price_currency` (`TEXT`, nullable)
- `child_asin_search_query_score` (`NUMBER`, required) — Amazon Search Query Score (searchQueryScore) ranks this search query against other queries for the same child ASIN based on overall performance. A score of 1 is the highest-performing query for that ASIN. This is not the ASIN's position in Amazon search results.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
