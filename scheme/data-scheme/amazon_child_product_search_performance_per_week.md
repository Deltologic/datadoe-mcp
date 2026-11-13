# Search Engagement by ASIN (Weekly)

- BigQuery table name: `amazon_child_product_search_performance_per_week`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

Weekly Search Catalog Performance per child ASIN (GET_BRAND_ANALYTICS_SEARCH_CATALOG_PERFORMANCE_REPORT, reportPeriod WEEK). Each row is one Sunday–Saturday week. Impressions, clicks, cart adds, and purchases from search results, including sponsored results. search_click_rate is clicks divided by impressions. search_conversion_rate is purchases divided by clicks. Both rates are 0-1 fractions (Amazon examples are 0.1 and 0.05). Not Search Query Performance; that is amazon_child_product_organic_search_ranks_per_week and amazon_child_product_organic_search_ranks_per_month. Monthly grain is amazon_child_product_search_performance_per_month.

- Source type: `SELLER_CENTRAL`
- Source ID: `02d9e9ab902f03151952fa2fcbb00b4afda58d5c8ff372fb7e6b30513650c2a3`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: yes
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=02d9e9ab902f03151952fa2fcbb00b4afda58d5c8ff372fb7e6b30513650c2a3

## Fetch periods

- `INITIAL` (91 days)
- `RECURRING_WEEKLY` (21 days)

## Search aliases

- search catalog
- search engagement
- weekly

## Columns (31)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `child_asin` (`TEXT`, required)
- `search_impression_count` (`NUMBER`, required) — Search-results impressions for this ASIN across queries, including sponsored results.
- `search_impression_median_price_value` (`NUMBER`, required)
- `search_impression_median_price_currency` (`TEXT`, required) — Currency code.
- `search_click_count` (`NUMBER`, required) — Clicks on this ASIN from search results.
- `search_click_rate` (`NUMBER`, required) — Clicks divided by impressions for this ASIN, between 0 and 1. Multiply by 100 for a percentage. A rate, not a click count.
- `search_clicked_median_price` (`NUMBER`, required)
- `search_cart_add_count` (`NUMBER`, required)
- `search_cart_added_median_price_value` (`NUMBER`, required)
- `search_cart_added_median_price_currency` (`TEXT`, required) — Currency code.
- `search_purchase_count` (`NUMBER`, required) — Purchases of this ASIN attributed to search results.
- `search_search_traffic_sales_value` (`NUMBER`, required)
- `search_search_traffic_sales_currency` (`TEXT`, required) — Currency code.
- `search_conversion_rate` (`NUMBER`, required) — Purchases divided by clicks for this ASIN, between 0 and 1. Multiply by 100 for a percentage. A rate, not an order count. Not units per session.
- `search_purchase_median_price_value` (`NUMBER`, required)
- `search_purchase_median_price_currency` (`TEXT`, required) — Currency code.
- `search_one_day_shipping_impression_count` (`NUMBER`, required)
- `search_two_day_shipping_impression_count` (`NUMBER`, required)
- `search_one_day_shipping_click_count` (`NUMBER`, required)
- `search_two_day_shipping_click_count` (`NUMBER`, required)
- `search_one_day_shipping_cart_add_count` (`NUMBER`, required)
- `search_two_day_shipping_cart_add_count` (`NUMBER`, required)
- `search_one_day_shipping_purchase_count` (`NUMBER`, required)
- `search_two_day_shipping_purchase_count` (`NUMBER`, required)
- `date` (`DATE`, required) — Sunday that starts the Sunday–Saturday week the data refers to. Represents an aggregated weekly snapshot. Data availability can lag, so use MAX(date) for the most recent published week.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
