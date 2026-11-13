# Ads Attribution Products

- BigQuery table name: `amazon_ads_attribution_products_by_date`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Amazon Attribution Products: off-Amazon traffic measured by Amazon Attribution tags (14-day last-click), not Sponsored Ads conversion windows. Top 100 products per campaign, always at ad-group grain. Use amazon_ads_attribution_performance_by_ad_group_by_date for totals and BRB. Rows with fewer than 10 lifetime clicks are masked (metrics 0). History is last 90 days.

- Source type: `AMAZON_ADS`
- Source ID: `a9d3ab27839f888bac306295dad8c65ea2c95491d72738a8d5e512e26a510b70`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=a9d3ab27839f888bac306295dad8c65ea2c95491d72738a8d5e512e26a510b70

## Fetch periods

- `INITIAL` (89 days)
- `RECURRING_DAILY` (30 days)

## Related actions

- `AMAZON_ADS_ATTRIBUTION_REPORTS_FIND` — live: reads a fresher live value. When a FIND Action's entity is in the DataDoe data scheme, use an Export or a BigQuery query. Use FIND only when you need live Amazon data that the warehouse does not have yet. One standard Export costs 2 AI Tokens. One integrated BigQuery query costs 0.2 AI Tokens. Compare the total cost of repeated FIND Actions with one Export or query.

actions_details_schema_get reports whether each Action type is enabled for the Organization. An Organization owner enables a type in the DataDoe app under Settings > Actions.

## Search aliases

- amazon attribution
- off-amazon
- external traffic
- publisher
- attribution tag

## Columns (38)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `date` (`DATE`, required) — Date the off-Amazon click or attributed on-Amazon event occurred. Attribution is 14-day last-click via Amazon Attribution tags, not a Sponsored Ads attribution window.
- `campaign_id` (`TEXT`, required)
- `ad_group_id` (`TEXT`, required)
- `publisher` (`TEXT`, required) — Off-Amazon publisher that served the tagged link.
- `advertiser_name` (`TEXT`, nullable)
- `brand_name` (`TEXT`, nullable)
- `marketplace` (`TEXT`, nullable)
- `product_asin` (`TEXT`, required)
- `product_name` (`TEXT`, nullable)
- `product_group` (`TEXT`, nullable)
- `product_category` (`TEXT`, nullable)
- `product_subcategory` (`TEXT`, nullable)
- `product_conversion_type` (`TEXT`, required) — Whether the conversion happened on a promoted or brand-halo ASIN.
- `attributed_detail_page_views_clicks_14d` (`NUMBER`, nullable)
- `attributed_add_to_cart_clicks_14d` (`NUMBER`, nullable)
- `attributed_purchases_14d` (`NUMBER`, nullable)
- `units_sold_14d` (`NUMBER`, nullable)
- `attributed_sales_14d` (`NUMBER`, nullable)
- `brand_halo_detail_page_views_clicks_14d` (`NUMBER`, nullable)
- `brand_halo_attributed_add_to_cart_clicks_14d` (`NUMBER`, nullable)
- `brand_halo_attributed_purchases_14d` (`NUMBER`, nullable)
- `brand_halo_units_sold_14d` (`NUMBER`, nullable)
- `brand_halo_attributed_sales_14d` (`NUMBER`, nullable)
- `attributed_new_to_brand_purchases_14d` (`NUMBER`, nullable)
- `attributed_new_to_brand_units_sold_14d` (`NUMBER`, nullable)
- `attributed_new_to_brand_sales_14d` (`NUMBER`, nullable)
- `brand_halo_new_to_brand_purchases_14d` (`NUMBER`, nullable)
- `brand_halo_new_to_brand_units_sold_14d` (`NUMBER`, nullable)
- `brand_halo_new_to_brand_sales_14d` (`NUMBER`, nullable)
- `kindle_edition_normalized_pages_read_14d` (`NUMBER`, nullable)
- `kindle_edition_normalized_pages_royalties_14d` (`NUMBER`, nullable)

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
