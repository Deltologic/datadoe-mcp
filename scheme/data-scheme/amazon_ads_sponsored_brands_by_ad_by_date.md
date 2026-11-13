# Sponsored Brands Ad Performance

- BigQuery table name: `amazon_ads_sponsored_brands_by_ad_by_date`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Sponsored Brands performance per ad and date. Attribution is 14 days. Same-SKU columns exclude brand halo. New-to-brand columns use a 12-month first-purchase lookback. Do not sum this table into campaign totals.

- Source type: `AMAZON_ADS`
- Source ID: `0dd6cbf08cefd9a67f6dd262de499b5cc512e1440da09091eaa47a07db879795`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=0dd6cbf08cefd9a67f6dd262de499b5cc512e1440da09091eaa47a07db879795

## Fetch periods

- `INITIAL` (56 days)
- `RECURRING_DAILY` (21 days)
- `RECURRING_MONTHLY` (49 days)

## Related actions

- `AMAZON_ADS_ADS_ADD` — writes: writes rows to this table
- `AMAZON_ADS_ADS_UPDATE` — writes: writes rows to this table
- `AMAZON_ADS_ADS_REMOVE` — writes: writes rows to this table
- `AMAZON_ADS_ADS_FIND` — live: reads a fresher live value. When a FIND Action's entity is in the DataDoe data scheme, use an Export or a BigQuery query. Use FIND only when you need live Amazon data that the warehouse does not have yet. One standard Export costs 2 AI Tokens. One integrated BigQuery query costs 0.2 AI Tokens. Compare the total cost of repeated FIND Actions with one Export or query.

actions_details_schema_get reports whether each Action type is enabled for the Organization. An Organization owner enables a type in the DataDoe app under Settings > Actions.

## Columns (44)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `date` (`DATE`, required)
- `ad_id` (`TEXT`, required)
- `ad_impressions` (`NUMBER`, required) — Times the ad was displayed after Amazon removed invalid traffic. Gross impressions, including invalid traffic, are ad_gross_impressions.
- `ad_spend` (`NUMBER`, required)
- `ad_sales` (`NUMBER`, required) — Attributed ad sales (14d for SPONSORED_BRANDS and SPONSORED_DISPLAY, 7d for SPONSORED_PRODUCTS).
- `ad_sales_same_sku` (`NUMBER`, required) — Attributed sales of the advertised SKU only (14d for SPONSORED_BRANDS and SPONSORED_DISPLAY, 7d for SPONSORED_PRODUCTS). Excludes brand-halo purchases of other SKUs. Not total ad sales; campaign totals are amazon_ads_performance_by_campaign_by_date.ad_sales.
- `ad_units_sold` (`NUMBER`, required) — Attributed ad units sold (14d for SPONSORED_BRANDS and SPONSORED_DISPLAY, 7d for SPONSORED_PRODUCTS).
- `ad_clicks` (`NUMBER`, required) — Clicks after Amazon removed invalid traffic. Gross clicks, including invalid traffic, are ad_gross_click_throughs.
- `ad_orders` (`NUMBER`, required) — Attributed ad orders (14d for SPONSORED_BRANDS and SPONSORED_DISPLAY, 7d for SPONSORED_PRODUCTS).
- `ad_orders_same_sku` (`NUMBER`, required) — Attributed orders of the advertised SKU only (14d for SPONSORED_BRANDS and SPONSORED_DISPLAY, 7d for SPONSORED_PRODUCTS). Excludes brand-halo orders of other SKUs.
- `ad_campaign_budget_amount` (`NUMBER`, required) — Campaign budget repeated on every row of the campaign. Do not sum it across ASINs, keywords, placements, or dates. ad_campaign_budget_type is DAILY_BUDGET or LIFETIME_BUDGET.
- `ad_campaign_budget_type` (`TEXT`, nullable)
- `ad_campaign_budget_currency` (`TEXT`, required)
- `ad_new_to_brand_sales_clicks` (`NUMBER`, required) — New-to-brand sales attributed to a click only. Excludes view-through. A currency amount.
- `ad_viewability_rate` (`NUMBER`, required) — Amazon viewabilityRate: views divided by impressions. A rate, not a view count.
- `ad_new_to_brand_sales_percentage` (`NUMBER`, required) — Share of the matching total that is new-to-brand. Amazon reports this as a percentage, not a unit count. Not available for book vendors.
- `ad_campaign_status` (`TEXT`, required)
- `ad_group_name` (`TEXT`, required)
- `ad_campaign_id` (`TEXT`, required)
- `ad_new_to_brand_purchases_percentage` (`NUMBER`, required) — Share of the matching total that is new-to-brand. Amazon reports this as a percentage, not a unit count. Not available for book vendors.
- `ad_video_complete_views` (`NUMBER`, required) — Impressions where the shopper watched the video to completion.
- `ad_video_first_quartile_views` (`NUMBER`, required) — 25% playback. Impressions that reached this video playback quartile. A view count, not a rate.
- `ad_new_to_brand_purchases_rate` (`NUMBER`, required) — Share of the matching total that is new-to-brand. Amazon reports this as a percentage, not a unit count. Not available for book vendors.
- `ad_video5_second_views` (`NUMBER`, required) — Impressions where the shopper watched the complete video or 5 seconds, whichever is shorter.
- `ad_new_to_brand_purchases` (`NUMBER`, required) — First-time orders of the brand in a 12-month lookback, within 14 days of an ad click or view. A count, not a rate. Not available for book vendors.
- `ad_branded_searches_clicks` (`NUMBER`, required) — Branded searches attributed to a click. Excludes view-through.
- `ad_group_id` (`TEXT`, required)
- `ad_new_to_brand_sales` (`NUMBER`, required) — Sales from first-time customers of the brand in a 12-month lookback, within 14 days of an ad click or view. A currency amount, not a rate. Not available for book vendors.
- `ad_video_unmutes` (`NUMBER`, required) — Times a shopper unmuted the video.
- `ad_video_third_quartile_views` (`NUMBER`, required) — 75% playback. Impressions that reached this video playback quartile. A view count, not a rate.
- `ad_new_to_brand_units_sold` (`NUMBER`, required) — Units in new-to-brand orders within 14 days of an ad click or view. A count, not a rate. Not available for book vendors.
- `ad_viewable_impressions` (`NUMBER`, required) — Impressions Amazon counted as viewable. A count, not a rate.
- `ad_detail_page_views_clicks` (`NUMBER`, required) — Detail-page views attributed to a click. Excludes view-through.
- `ad_video_midpoint_views` (`NUMBER`, required) — 50% playback. Impressions that reached this video playback quartile. A view count, not a rate.
- `ad_video_5_second_view_rate` (`NUMBER`, required) — Share of impressions where the shopper watched the complete video or 5 seconds, whichever is shorter. A rate, not a view count.
- `ad_new_to_brand_units_sold_percentage` (`NUMBER`, required) — Share of the matching total that is new-to-brand. Amazon reports this as a percentage, not a unit count. Not available for book vendors.
- `ad_campaign_name` (`TEXT`, required)

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
