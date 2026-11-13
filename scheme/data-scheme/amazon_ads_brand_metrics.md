# Ads Brand Metrics

- BigQuery table name: `amazon_ads_brand_metrics`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Amazon Ads Brand Metrics: brand-level awareness, consideration, and sales indices plus the shopping funnel (branded searches, detail-page views, add-to-carts, brand customers, high-value customers, return on engagement), by brand, category node, computation date, and lookback. Indices are percentiles versus peers, not 0–1 rates. This is all on-Amazon shopping, not ad-attributed performance. Sparse — most metric columns are NULL for a given row. Columns ending in _category_median are the peer median. Columns ending in _category_top_performers or _category_performers are the average of the 95th–99th percentile of peers. Columns ending in _return_on_engagement, or containing _roe_, are return on engagement (currency), not rates.

- Source type: `AMAZON_ADS`
- Source ID: `60fb0eb8c4c040e11ee7624db6165e0ff1c4435dee09dc7d64c74dd534e1270e`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=60fb0eb8c4c040e11ee7624db6165e0ff1c4435dee09dc7d64c74dd534e1270e

## Fetch periods

- `INITIAL` (95 days)
- `RECURRING_WEEKLY` (95 days)

## Search aliases

- awareness index
- consideration
- brand funnel

## Columns (67)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `brand_name` (`TEXT`, required)
- `brand_id` (`TEXT`, nullable) — Resolved at import time by joining brand_name against the report brandsInfo array; NULL if no match found.
- `category_node_tree_name` (`TEXT`, required) — Short catalog identifier, e.g. uk-hpc, uk-beauty.
- `category_node_name` (`TEXT`, required) — Slash-delimited category path, e.g. /Categories/Bath & Body.
- `date` (`DATE`, required) — Metrics computation date.
- `lookback_period` (`TEXT`, required) — Shopper window used to compute the metrics: 1w (one week), 1m (one month), or 1cm (one calendar month). Not an ads attribution window.
- `awareness_index` (`NUMBER`, nullable) — Awareness index. Percentile of this brand versus peers in the category. Not a 0–1 rate and not a shopper count. Brand Metrics covers all on-Amazon shopping, not only ad-attributed events.
- `consideration_index` (`NUMBER`, nullable) — Consideration index. Percentile of this brand versus peers in the category. Not a 0–1 rate and not a shopper count. Brand Metrics covers all on-Amazon shopping, not only ad-attributed events.
- `sales_index` (`NUMBER`, nullable) — Sales index. Percentile of this brand versus peers in the category. Not a 0–1 rate and not a shopper count. Brand Metrics covers all on-Amazon shopping, not only ad-attributed events.
- `add_to_carts` (`NUMBER`, nullable) — Shoppers who added this brand to cart in the category and lookback. A shopper count, not ad-attributed add-to-carts.
- `add_to_carts_category_median` (`NUMBER`, nullable)
- `add_to_carts_category_performers` (`NUMBER`, nullable)
- `add_to_carts_roe_category_median` (`NUMBER`, nullable)
- `add_to_carts_roe_category_top_performers` (`NUMBER`, nullable)
- `add_to_carts_return_on_engagement` (`NUMBER`, nullable) — Return on engagement: average sales over the following year from shoppers who were in this funnel state 12 months ago. A currency amount, not a rate, and not ad-attributed sales.
- `brand_customers` (`NUMBER`, nullable) — Shoppers who purchased and account for the bottom 90% of this brand’s sales in the category and lookback. High-value customers are the top 10%.
- `brand_customers_category_median` (`NUMBER`, nullable)
- `brand_customers_category_top_performers` (`NUMBER`, nullable)
- `brand_customers_roe_category_median` (`NUMBER`, nullable)
- `brand_customers_roe_category_top_performers` (`NUMBER`, nullable)
- `brand_customers_return_on_engagement` (`NUMBER`, nullable) — Return on engagement: average sales over the following year from shoppers who were in this funnel state 12 months ago. A currency amount, not a rate, and not ad-attributed sales.
- `branded_searches_and_detail_page_views` (`NUMBER`, nullable) — Shoppers who searched the brand and viewed a detail page in the category and lookback. A shopper count, not ad impressions.
- `branded_searches_and_detail_page_views_category_median` (`NUMBER`, nullable)
- `branded_searches_and_detail_page_views_category_top_performers` (`NUMBER`, nullable)
- `branded_searches_and_detail_page_views_roe_category_median` (`NUMBER`, nullable)
- `branded_searches_and_detail_page_views_roe_cat_top_performers` (`NUMBER`, nullable)
- `branded_searches_and_detail_page_views_return_on_engagement` (`NUMBER`, nullable) — Return on engagement: average sales over the following year from shoppers who were in this funnel state 12 months ago. A currency amount, not a rate, and not ad-attributed sales.
- `branded_searches_category_median` (`NUMBER`, nullable)
- `branded_searches_category_top_performers` (`NUMBER`, nullable)
- `branded_searches_only` (`NUMBER`, nullable) — Shoppers who searched the brand and did not engage further or purchase in the category and lookback.
- `customer_conversion_rate` (`NUMBER`, nullable) — Share of shoppers who moved from considering this brand to purchasing in the lookback. A percentage, not an order count.
- `customer_conversion_rate_category_median` (`NUMBER`, nullable)
- `customer_conversion_rate_category_top_performers` (`NUMBER`, nullable)
- `engaged_shopper_rate_category_median_lower_bound` (`NUMBER`, nullable)
- `engaged_shopper_rate_category_median_upper_bound` (`NUMBER`, nullable)
- `engaged_shopper_rate_category_top_performers_lower_bound` (`NUMBER`, nullable)
- `engaged_shopper_rate_category_top_performers_upper_bound` (`NUMBER`, nullable)
- `engaged_shopper_rate_lower_bound` (`NUMBER`, nullable) — Lower bound of engaged-shopper rate: unique shoppers this brand engaged or who purchased, divided by unique shoppers with at least one detail-page view in the category. A percentage bound, not a shopper count.
- `engaged_shopper_rate_upper_bound` (`NUMBER`, nullable) — Upper bound of the same engaged-shopper rate. Read with engaged_shopper_rate_lower_bound.
- `high_value_customers` (`NUMBER`, nullable) — Top 10% of shoppers by sales contribution for this brand in the category and lookback. brand_customers is the other 90%.
- `high_value_customers_category_median` (`NUMBER`, nullable)
- `high_value_customers_category_top_performers` (`NUMBER`, nullable)
- `high_value_customers_roe_category_median` (`NUMBER`, nullable)
- `high_value_customers_roe_category_top_performers` (`NUMBER`, nullable)
- `high_value_customers_return_on_engagement` (`NUMBER`, nullable) — Return on engagement: average sales over the following year from shoppers who were in this funnel state 12 months ago. A currency amount, not a rate, and not ad-attributed sales.
- `new_to_brand_customer_rate` (`NUMBER`, nullable) — Share of customers who had not purchased this brand in the prior 12 months and did purchase in the lookback. A percentage, not a customer count.
- `new_to_brand_customer_rate_category_median` (`NUMBER`, nullable)
- `new_to_brand_customer_rate_category_top_performers` (`NUMBER`, nullable)
- `new_to_brand_sns_customers_rate` (`NUMBER`, nullable) — Share of new-to-brand customers who are Subscribe & Save customers. A percentage, not a customer count.
- `new_to_brand_sns_customers_rate_category_median` (`NUMBER`, nullable)
- `new_to_brand_sns_customers_rate_category_top_performers` (`NUMBER`, nullable)
- `total_sns_customers` (`NUMBER`, nullable) — Subscribe & Save customers of this brand in the category and lookback. A customer count.
- `total_sns_customers_category_median` (`NUMBER`, nullable)
- `total_sns_customers_category_top_performers` (`NUMBER`, nullable)
- `viewed_detail_page_category_median` (`NUMBER`, nullable)
- `viewed_detail_page_category_top_performers` (`NUMBER`, nullable)
- `viewed_detail_page_only` (`NUMBER`, nullable) — Shoppers who viewed a detail page and did not engage further or purchase in the category and lookback.
- `viewed_detail_page_only_return_on_engagement` (`NUMBER`, nullable) — Return on engagement: average sales over the following year from shoppers who were in this funnel state 12 months ago. A currency amount, not a rate, and not ad-attributed sales.
- `viewed_detail_page_roe_category_median` (`NUMBER`, nullable)
- `viewed_detail_page_roe_category_top_performers` (`NUMBER`, nullable)

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
