# Ad Placement Performance (Sponsored Brands and Sponsored Products)

- BigQuery table name: `amazon_ads_placement_by_campaign_by_date`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Placement performance for SPONSORED_BRANDS and SPONSORED_PRODUCTS campaigns, including Amazon Business placement breakdown for Sponsored Products.

- Source type: `AMAZON_ADS`
- Source ID: `3d720918e6b132db7d3b6edfb912428256b79d3cfba20f5bd2617037bf0cc5ef`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=3d720918e6b132db7d3b6edfb912428256b79d3cfba20f5bd2617037bf0cc5ef

## Fetch periods

- `INITIAL` (56 days)
- `RECURRING_DAILY` (28 days)
- `RECURRING_MONTHLY` (56 days)

## Data availability

- `INTRADAY` — Placement performance refreshes once a day at 2am in the marketplace time zone. Data is available after processing and can change in a later report. Refresh: 2am.

## Related actions

- `AMAZON_ADS_CAMPAIGNS_ADD` — writes: writes rows to this table
- `AMAZON_ADS_CAMPAIGNS_UPDATE` — writes: writes rows to this table
- `AMAZON_ADS_CAMPAIGNS_REMOVE` — writes: writes rows to this table
- `AMAZON_ADS_CAMPAIGNS_FIND` — live: reads a fresher live value. When a FIND Action's entity is in the DataDoe data scheme, use an Export or a BigQuery query. Use FIND only when you need live Amazon data that the warehouse does not have yet. One standard Export costs 2 AI Tokens. One integrated BigQuery query costs 0.2 AI Tokens. Compare the total cost of repeated FIND Actions with one Export or query.

actions_details_schema_get reports whether each Action type is enabled for the Organization. An Organization owner enables a type in the DataDoe app under Settings > Actions.

## Search aliases

- top of search
- placement

## Columns (56)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `date` (`DATE`, required)
- `ad_campaign_type` (`TEXT`, required) — SPONSORED_BRANDS or SPONSORED_PRODUCTS
- `ad_campaign_id` (`TEXT`, required)
- `ad_campaign_name` (`TEXT`, required)
- `ad_campaign_status` (`TEXT`, required)
- `ad_placement_classification` (`TEXT`, required) — Page location where the ad appeared, such as Top of Search, Rest of Search, or Product pages.
- `ad_campaign_site` (`TEXT`, required) — ALL or AMAZON_BUSINESS. Sponsored Products rows are split by site; Sponsored Brands rows use ALL.
- `ad_impressions` (`NUMBER`, required) — Times the ad was displayed after Amazon removed invalid traffic. Gross impressions, including invalid traffic, are ad_gross_impressions.
- `ad_viewable_impressions` (`NUMBER`, required) — Impressions Amazon counted as viewable. A count, not a rate.
- `ad_clicks` (`NUMBER`, required) — Clicks after Amazon removed invalid traffic. Gross clicks, including invalid traffic, are ad_gross_click_throughs.
- `ad_spend` (`NUMBER`, required)
- `ad_sales` (`NUMBER`, required) — Attributed ad sales (14d for SPONSORED_BRANDS and SPONSORED_DISPLAY, 7d for SPONSORED_PRODUCTS).
- `ad_sales_same_sku` (`NUMBER`, required) — Attributed sales of the advertised SKU only (14d for SPONSORED_BRANDS and SPONSORED_DISPLAY, 7d for SPONSORED_PRODUCTS). Excludes brand-halo purchases of other SKUs. Not total ad sales; campaign totals are amazon_ads_performance_by_campaign_by_date.ad_sales.
- `ad_sales_new_to_brand_14d` (`NUMBER`, required) — Sales from first-time customers of the brand in a 12-month lookback, within 14 days of an ad click or view. A currency amount, not a rate. Not available for book vendors.
- `ad_sales_new_to_brand_14d_percentage` (`NUMBER`, required) — Share of the matching total that is new-to-brand. Amazon reports this as a percentage, not a unit count. Not available for book vendors.
- `ad_units_sold` (`NUMBER`, required) — Attributed ad units sold (14d for SPONSORED_BRANDS and SPONSORED_DISPLAY, 7d for SPONSORED_PRODUCTS).
- `ad_units_sold_new_to_brand_14d` (`NUMBER`, required) — Units in new-to-brand orders within 14 days of an ad click or view. A count, not a rate. Not available for book vendors.
- `ad_units_sold_new_to_brand_14d_percentage` (`NUMBER`, required) — Share of the matching total that is new-to-brand. Amazon reports this as a percentage, not a unit count. Not available for book vendors.
- `ad_campaign_budget_amount` (`NUMBER`, required)
- `ad_campaign_budget_type` (`TEXT`, nullable)
- `ad_campaign_budget_currency` (`TEXT`, required)
- `ad_campaign_rule_based_budget_amount` (`NUMBER`, nullable) — Rule-based campaign budget reported for this date for Sponsored Products, in ad_campaign_budget_currency. Repeated across placements; do not sum across placements or dates. Null when Amazon omits it and for other campaign types. — definition: `campaignRuleBasedBudgetAmount from the Sponsored Products report`
- `ad_campaign_applicable_budget_rule_id` (`TEXT`, nullable) — Identifier of the budget rule Amazon reports as applicable to the Sponsored Products campaign on this date. Null when Amazon omits it and for other campaign types. The rule definition is budget_rule_id on amazon_ads_budget_rules. Amazon does not provide execution history. — definition: `campaignApplicableBudgetRuleId from the Sponsored Products report`
- `ad_campaign_applicable_budget_rule_name` (`TEXT`, nullable) — Name of the budget rule Amazon reports as applicable to the Sponsored Products campaign on this date. Null when Amazon omits it and for other campaign types. The definition is on amazon_ads_budget_rules. This report value is read-only and does not change the rule. — definition: `campaignApplicableBudgetRuleName from the Sponsored Products report`
- `ad_orders` (`NUMBER`, required) — Attributed ad orders (14d for SPONSORED_BRANDS and SPONSORED_DISPLAY, 7d for SPONSORED_PRODUCTS).
- `ad_orders_clicks_only` (`NUMBER`, required) — Orders attributed to a click only. Excludes view-through orders. Not ad_orders when that column includes views.
- `ad_orders_same_sku` (`NUMBER`, required) — Attributed orders of the advertised SKU only (14d for SPONSORED_BRANDS and SPONSORED_DISPLAY, 7d for SPONSORED_PRODUCTS). Excludes brand-halo orders of other SKUs.
- `ad_orders_new_to_brand_14d` (`NUMBER`, required) — First-time orders of the brand in a 12-month lookback, within 14 days of an ad click or view. A count, not a rate. Not available for book vendors.
- `ad_orders_new_to_brand_14d_percentage` (`NUMBER`, required) — Share of the matching total that is new-to-brand. Amazon reports this as a percentage, not a unit count. Not available for book vendors.
- `ad_orders_new_to_brand_14d_rate` (`NUMBER`, required) — Share of the matching total that is new-to-brand. Amazon reports this as a percentage, not a unit count. Not available for book vendors.
- `ad_viewability_rate` (`NUMBER`, required) — Amazon viewabilityRate: views divided by impressions. A rate, not a view count.
- `ad_view_click_through_rate` (`NUMBER`, required) — Clicks divided by views. A rate, not a click count.
- `ad_video_complete_views` (`NUMBER`, required) — Impressions where the shopper watched the video to completion.
- `ad_video_first_quartile_views` (`NUMBER`, required) — 25% playback. Impressions that reached this video playback quartile. A view count, not a rate.
- `ad_branded_searches` (`NUMBER`, required) — Branded searches attributed to the ad. Not Brand Analytics search volume.
- `ad_video5_second_views` (`NUMBER`, required) — Impressions where the shopper watched the complete video or 5 seconds, whichever is shorter.
- `ad_branded_searches_clicks` (`NUMBER`, required) — Branded searches attributed to a click. Excludes view-through.
- `ad_video_unmutes` (`NUMBER`, required) — Times a shopper unmuted the video.
- `ad_video_third_quartile_views` (`NUMBER`, required) — 75% playback. Impressions that reached this video playback quartile. A view count, not a rate.
- `ad_detail_page_views_clicks` (`NUMBER`, required) — Detail-page views attributed to a click. Excludes view-through.
- `ad_video_midpoint_views` (`NUMBER`, required) — 50% playback. Impressions that reached this video playback quartile. A view count, not a rate.
- `ad_video_5_second_view_rate` (`NUMBER`, required) — Share of impressions where the shopper watched the complete video or 5 seconds, whichever is shorter. A rate, not a view count.
- `kindle_edition_normalized_pages_read_14d` (`NUMBER`, nullable) — Kindle Edition Normalized Pages (KENP) read by Kindle Unlimited readers within 14 days of an ad click. A page count, not money. Sponsored Products only; null for other campaign types and for books outside Kindle Unlimited.
- `kindle_edition_normalized_pages_royalties_14d` (`NUMBER`, nullable) — Amazon estimate of the royalties for kindle_edition_normalized_pages_read_14d, in the Ads profile currency. Money, not pages. Sponsored Products only; null for other campaign types and for books outside Kindle Unlimited.
- `kenp_per_click_14d` (`NUMBER`, nullable) — KENP read per ad click. Null when clicks are zero or unknown. — definition: `kindle_edition_normalized_pages_read_14d / ad_clicks`
- `estimated_kenp_royalty_per_click_14d` (`NUMBER`, nullable) — Estimated KENP royalties per ad click. Null when clicks are zero or unknown. — definition: `kindle_edition_normalized_pages_royalties_14d / ad_clicks`
- `ku_qualified_borrows` (`NUMBER`, nullable) — Kindle Unlimited borrows Amazon counts as qualified, attributed to the ad. A count, not money. Sponsored Products only; null for other campaign types.
- `estimated_ku_borrow_royalties` (`NUMBER`, nullable) — Amazon estimate of the royalties of ku_qualified_borrows. Money, not a count. Sponsored Products only; null for other campaign types.
- `ad_add_to_list` (`NUMBER`, nullable) — Times shoppers added the advertised product to a list, attributed to the ad. Sponsored Products only; null for other campaign types.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
