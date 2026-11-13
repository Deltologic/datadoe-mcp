# Ad Group Performance

- BigQuery table name: `amazon_ads_by_ad_group_by_date`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Performance for ad groups in SPONSORED_PRODUCTS, SPONSORED_BRANDS and SPONSORED_DISPLAY campaigns. Attribution windows differ by campaign type: Sponsored Products ad_sales, ad_orders and ad_units_sold use 7-day click attribution, Sponsored Brands 14 days and Sponsored Display its default window. Sponsored Products rows have null budget, new-to-brand, video, viewability, detail-page-view and branded-search columns.

- Source type: `AMAZON_ADS`
- Source ID: `7c1ba29e52b0e7b23d559d1e4647e65a05147374fe70d27b32dcc88177593b66`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=7c1ba29e52b0e7b23d559d1e4647e65a05147374fe70d27b32dcc88177593b66

## Fetch periods

- `INITIAL` (56 days)
- `RECURRING_DAILY` (21 days)
- `RECURRING_MONTHLY` (49 days)

## Related actions

- `AMAZON_ADS_AD_GROUPS_ADD` — writes: writes rows to this table
- `AMAZON_ADS_AD_GROUPS_UPDATE` — writes: writes rows to this table
- `AMAZON_ADS_AD_GROUPS_REMOVE` — writes: writes rows to this table
- `AMAZON_ADS_AD_GROUPS_FIND` — live: reads a fresher live value. When a FIND Action's entity is in the DataDoe data scheme, use an Export or a BigQuery query. Use FIND only when you need live Amazon data that the warehouse does not have yet. One standard Export costs 2 AI Tokens. One integrated BigQuery query costs 0.2 AI Tokens. Compare the total cost of repeated FIND Actions with one Export or query.

actions_details_schema_get reports whether each Action type is enabled for the Organization. An Organization owner enables a type in the DataDoe app under Settings > Actions.

## Columns (50)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `date` (`DATE`, required)
- `ad_group_id` (`TEXT`, required)
- `ad_group_name` (`TEXT`, required)
- `ad_campaign_id` (`TEXT`, required)
- `ad_campaign_name` (`TEXT`, required)
- `ad_add_to_lists_clicks_only` (`NUMBER`, required) — Add-to-list actions attributed to a click. Excludes view-through.
- `ad_branded_searches_clicks_only` (`NUMBER`, required) — Branded searches attributed to a click. Excludes view-through.
- `ad_campaign_budget_amount` (`NUMBER`, required)
- `ad_campaign_budget_type` (`TEXT`, nullable)
- `ad_campaign_budget_currency` (`TEXT`, required)
- `ad_clicks` (`NUMBER`, required)
- `ad_spend` (`NUMBER`, required)
- `ad_impressions` (`NUMBER`, required)
- `ad_detail_page_views_clicks_only` (`NUMBER`, required) — Detail-page views attributed to a click. Excludes view-through.
- `ad_orders` (`NUMBER`, required) — Attributed ad orders (14d for SPONSORED_BRANDS and SPONSORED_DISPLAY, 7d for SPONSORED_PRODUCTS).
- `ad_orders_new_to_brand_14d` (`NUMBER`, required) — First-time orders of the brand in a 12-month lookback, within 14 days of an ad click or view. A count, not a rate. Not available for book vendors.
- `ad_orders_new_to_brand_14d_clicks_only` (`NUMBER`, required) — New-to-brand orders attributed to a click only. Excludes view-through.
- `ad_units_sold` (`NUMBER`, required) — Attributed ad units sold (14d for SPONSORED_BRANDS and SPONSORED_DISPLAY, 7d for SPONSORED_PRODUCTS).
- `ad_units_sold_new_to_brand_14d` (`NUMBER`, required)
- `ad_video_five_second_view_rate` (`NUMBER`, required)
- `ad_video_five_second_views` (`NUMBER`, required)
- `ad_video_complete_views` (`NUMBER`, required)
- `ad_video_first_quartile_views` (`NUMBER`, required)
- `ad_video_midpoint_views` (`NUMBER`, required)
- `ad_video_third_quartile_views` (`NUMBER`, required)
- `ad_video_unmutes` (`NUMBER`, required)
- `ad_viewability_rate` (`NUMBER`, required)
- `ad_campaign_type` (`TEXT`, required)
- `ad_sales` (`NUMBER`, required) — Attributed ad sales (14d for SPONSORED_BRANDS and SPONSORED_DISPLAY, 7d for SPONSORED_PRODUCTS).
- `ad_sales_new_to_brand_14d` (`NUMBER`, required)
- `kindle_edition_normalized_pages_read_14d` (`NUMBER`, nullable) — Kindle Edition Normalized Pages (KENP) read by Kindle Unlimited readers within 14 days of an ad click. A page count, not money. Sponsored Products only; null for other campaign types and for books outside Kindle Unlimited.
- `kindle_edition_normalized_pages_royalties_14d` (`NUMBER`, nullable) — Amazon estimate of the royalties for kindle_edition_normalized_pages_read_14d, in the Ads profile currency. Money, not pages. Sponsored Products only; null for other campaign types and for books outside Kindle Unlimited.
- `kenp_per_click_14d` (`NUMBER`, nullable) — KENP read per ad click. Null when clicks are zero or unknown. — definition: `kindle_edition_normalized_pages_read_14d / ad_clicks`
- `estimated_kenp_royalty_per_click_14d` (`NUMBER`, nullable) — Estimated KENP royalties per ad click. Null when clicks are zero or unknown. — definition: `kindle_edition_normalized_pages_royalties_14d / ad_clicks`
- `ku_qualified_borrows` (`NUMBER`, nullable) — Kindle Unlimited borrows Amazon counts as qualified, attributed to the ad. A count, not money. Sponsored Products and Sponsored Display; null for Sponsored Brands.
- `estimated_ku_borrow_royalties` (`NUMBER`, nullable) — Amazon estimate of the royalties of ku_qualified_borrows. Money, not a count. Sponsored Products and Sponsored Display; null for Sponsored Brands.
- `ad_add_to_list` (`NUMBER`, nullable) — Times shoppers added the advertised product to a list, attributed to the ad. Sponsored Products and Sponsored Display; null for Sponsored Brands.
- `ku_qualified_borrows_from_clicks` (`NUMBER`, nullable) — Part of ku_qualified_borrows attributed to ad clicks. Sponsored Display only; Amazon reports no click/view split for Sponsored Products.
- `ku_qualified_borrows_from_views` (`NUMBER`, nullable) — Part of ku_qualified_borrows attributed to ad views. Sponsored Display only; Amazon reports no click/view split for Sponsored Products.
- `estimated_ku_borrow_royalties_from_clicks` (`NUMBER`, nullable) — Part of estimated_ku_borrow_royalties attributed to ad clicks. Sponsored Display only; Amazon reports no click/view split for Sponsored Products.
- `estimated_ku_borrow_royalties_from_views` (`NUMBER`, nullable) — Part of estimated_ku_borrow_royalties attributed to ad views. Sponsored Display only; Amazon reports no click/view split for Sponsored Products.
- `ad_add_to_list_from_clicks` (`NUMBER`, nullable) — Part of ad_add_to_list attributed to ad clicks. Sponsored Display only; Amazon reports no click/view split for Sponsored Products.
- `ad_add_to_list_from_views` (`NUMBER`, nullable) — Part of ad_add_to_list attributed to ad views. Sponsored Display only; Amazon reports no click/view split for Sponsored Products.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
