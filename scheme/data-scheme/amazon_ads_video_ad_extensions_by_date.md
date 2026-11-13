# Video Ad Extension Performance

- BigQuery table name: `amazon_ads_video_ad_extensions_by_date`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Performance for Sponsored Products video ad extensions per extension, ad, and date. Grain is creativeExtensionId + adId. Do not sum these metrics with campaign, ASIN, or ad-level ads views (double-count). Canonical conversion metrics use 14-day attribution.

- Source type: `AMAZON_ADS`
- Source ID: `c1673079cde1e7c0ced22310f3b5c99c8c5c96953e71f6db06f41ac30259a786`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=c1673079cde1e7c0ced22310f3b5c99c8c5c96953e71f6db06f41ac30259a786

## Fetch periods

- `INITIAL` (56 days)
- `RECURRING_DAILY` (21 days)
- `RECURRING_MONTHLY` (49 days)

## Data availability

- `INTRADAY` — Intraday updates are available when source data changes during the day. Refresh: 10am, 1pm, 4pm.

## Related actions

- `AMAZON_ADS_AD_EXTENSIONS_ADD` — writes: writes rows to this table
- `AMAZON_ADS_AD_EXTENSIONS_UPDATE` — writes: writes rows to this table
- `AMAZON_ADS_AD_EXTENSIONS_FIND` — live: reads a fresher live value. When a FIND Action's entity is in the DataDoe data scheme, use an Export or a BigQuery query. Use FIND only when you need live Amazon data that the warehouse does not have yet. One standard Export costs 2 AI Tokens. One integrated BigQuery query costs 0.2 AI Tokens. Compare the total cost of repeated FIND Actions with one Export or query.

actions_details_schema_get reports whether each Action type is enabled for the Organization. An Organization owner enables a type in the DataDoe app under Settings > Actions.

## Columns (37)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `date` (`DATE`, required)
- `ad_campaign_id` (`TEXT`, required)
- `ad_campaign_name` (`TEXT`, required)
- `ad_group_id` (`TEXT`, required)
- `ad_group_name` (`TEXT`, nullable)
- `ad_id` (`TEXT`, required)
- `ad_creative_extension_id` (`TEXT`, required)
- `ad_creative_extension_type` (`TEXT`, nullable)
- `ad_video_type` (`TEXT`, nullable)
- `ad_advertised_asin` (`TEXT`, nullable)
- `ad_advertised_sku` (`TEXT`, nullable)
- `ad_portfolio_name` (`TEXT`, nullable)
- `currency_code` (`TEXT`, nullable)
- `ad_impressions` (`NUMBER`, required)
- `ad_clicks` (`NUMBER`, required)
- `ad_spend` (`NUMBER`, required)
- `ad_orders` (`NUMBER`, required) — Attributed ad orders (purchases14d).
- `ad_orders_same_sku` (`NUMBER`, required) — Attributed same-SKU ad orders (purchasesSameSku14d).
- `ad_sales` (`NUMBER`, required) — Attributed ad sales (sales14d).
- `ad_sales_same_sku` (`NUMBER`, required) — Attributed same-SKU ad sales (attributedSalesSameSku14d).
- `ad_units_sold` (`NUMBER`, required) — Attributed units sold (unitsSoldClicks14d).
- `ad_units_sold_same_sku` (`NUMBER`, required) — Attributed same-SKU units sold (unitsSoldSameSku14d).
- `ad_video5_second_views` (`NUMBER`, required) — Impressions where the shopper watched the complete video or 5 seconds, whichever is shorter.
- `ad_video_5_second_view_rate` (`NUMBER`, required) — Share of impressions where the shopper watched the complete video or 5 seconds, whichever is shorter. A rate, not a view count.
- `ad_video_first_quartile_views` (`NUMBER`, required) — 25% playback. Impressions that reached this video playback quartile. A view count, not a rate.
- `ad_video_midpoint_views` (`NUMBER`, required) — 50% playback. Impressions that reached this video playback quartile. A view count, not a rate.
- `ad_video_third_quartile_views` (`NUMBER`, required) — 75% playback. Impressions that reached this video playback quartile. A view count, not a rate.
- `ad_video_complete_views` (`NUMBER`, required) — Impressions where the shopper watched the video to completion.
- `ad_viewability_rate` (`NUMBER`, required) — Amazon viewabilityRate: views divided by impressions. A rate, not a view count.
- `ad_view_click_through_rate` (`NUMBER`, required) — Clicks divided by views. A rate, not a click count.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
