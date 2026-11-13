# Keyword Targeting Performance

- BigQuery table name: `amazon_ads_targeting_by_campaign_by_date`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Target performance by target and date. Sponsored Products includes keywords and product targets. Sponsored Brands includes product targets and broad, phrase and exact keywords. Keyword rows appear after the keyword report is collected. The first keyword load covers the latest 30 completed days. Keyword refreshes run every two days and replace the latest 14 completed days. Keyword rows have no monthly refresh. The table refresh periods apply to the other campaign types. The keyword report does not cover every Sponsored Brands campaign. A global Ads account keeps keyword rows for the connection marketplace only. Campaign status and budget on keyword rows come from the Sponsored Brands campaign report for the same connection, date and campaign. Sponsored Display includes product, category, and remarketing targets such as views and purchases. Display ad_match_type is blank, Amazon audience segments are not included, and Display spend and impressions can be lower than the campaign table for the same campaign. Sponsored Television is included. ad_keyword is the target. The shopper query is amazon_ads_search_terms_by_campaign_by_date.ad_search_term. Do not sum this table into campaign totals.

- Source type: `AMAZON_ADS`
- Source ID: `bbba3d213ac78ccbaf22cfa68eecb3f475641f49da26d51d1ac36446310051e3`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=bbba3d213ac78ccbaf22cfa68eecb3f475641f49da26d51d1ac36446310051e3

## Fetch periods

- `INITIAL` (56 days)
- `RECURRING_DAILY` (21 days)
- `RECURRING_MONTHLY` (49 days)

## Data availability

- `INTRADAY` — Sponsored Products, Sponsored Brands product targets, and Sponsored Display refresh once a day at 2am in the marketplace time zone. Sponsored Brands keyword reports refresh every two days. Sponsored Television targeting also refreshes at 8am, 1pm, and 4pm. Data is available after processing and can change in a later report. Refresh: 2am.

## Related actions

- `AMAZON_ADS_TARGETS_ADD` — writes: writes rows to this table
- `AMAZON_ADS_TARGETS_UPDATE` — writes: writes rows to this table
- `AMAZON_ADS_TARGETS_REMOVE` — writes: writes rows to this table
- `AMAZON_ADS_TARGETS_FIND` — live: reads a fresher live value. When a FIND Action's entity is in the DataDoe data scheme, use an Export or a BigQuery query. Use FIND only when you need live Amazon data that the warehouse does not have yet. One standard Export costs 2 AI Tokens. One integrated BigQuery query costs 0.2 AI Tokens. Compare the total cost of repeated FIND Actions with one Export or query.

actions_details_schema_get reports whether each Action type is enabled for the Organization. An Organization owner enables a type in the DataDoe app under Settings > Actions.

## Search aliases

- keyword
- keywords
- product target
- match type

## Columns (48)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `date` (`DATE`, required)
- `ad_targeting_text` (`TEXT`, required) — Targeting expression text. For keywords this matches ad_keyword. Not the customer search query.
- `ad_targeting_id` (`TEXT`, required)
- `ad_keyword_id` (`TEXT`, required)
- `ad_keyword` (`TEXT`, required) — Keyword text, or a representation of the product-target expression. Not the customer search query.
- `ad_keyword_expression` (`TEXT`, required) — Raw targeting expression when the target is not a plain keyword.
- `ad_keyword_status` (`TEXT`, required)
- `ad_match_type` (`TEXT`, required) — Keyword match type BROAD, PHRASE, or EXACT. Product targets use TARGETING_EXPRESSION or TARGETING_EXPRESSION_PREDEFINED.
- `ad_matched_target_asin` (`TEXT`, required) — ASIN of the product target that matched, when the target is a product. Null for keyword targets.
- `ad_campaign_id` (`TEXT`, required)
- `ad_campaign_name` (`TEXT`, required)
- `ad_campaign_type` (`TEXT`, required)
- `ad_portfolio_id` (`TEXT`, nullable) — Portfolio ID for SPONSORED_PRODUCTS and SPONSORED_TELEVISION campaigns. For SPONSORED_BRANDS and SPONSORED_DISPLAY this field is always NULL.
- `ad_portfolio_name` (`TEXT`, nullable) — Portfolio name for SPONSORED_PRODUCTS and SPONSORED_TELEVISION campaigns. For SPONSORED_BRANDS and SPONSORED_DISPLAY this field is always NULL.
- `ad_campaign_status` (`TEXT`, required)
- `ad_campaign_budget_amount` (`NUMBER`, required) — Campaign budget repeated on every row of the campaign. Do not sum it across ASINs, keywords, placements, or dates. ad_campaign_budget_type is DAILY_BUDGET or LIFETIME_BUDGET.
- `ad_campaign_budget_type` (`TEXT`, nullable)
- `ad_campaign_budget_currency` (`TEXT`, required)
- `ad_group_id` (`TEXT`, required)
- `ad_group_name` (`TEXT`, required)
- `ad_orders` (`NUMBER`, required) — Attributed ad orders (14d for SPONSORED_BRANDS and SPONSORED_DISPLAY, 7d for SPONSORED_PRODUCTS).
- `ad_orders_same_sku` (`NUMBER`, required) — Attributed orders of the advertised SKU only (14d for SPONSORED_BRANDS and SPONSORED_DISPLAY, 7d for SPONSORED_PRODUCTS). Excludes brand-halo orders of other SKUs.
- `ad_units_sold_click` (`NUMBER`, required) — Units sold attributed to a click. Excludes view-through units. Sponsored Brands uses 14 days.
- `ad_sales` (`NUMBER`, required) — Attributed ad sales (14d for SPONSORED_BRANDS and SPONSORED_DISPLAY, 7d for SPONSORED_PRODUCTS).
- `ad_spend` (`NUMBER`, required)
- `ad_impressions` (`NUMBER`, required) — Times the ad was displayed after Amazon removed invalid traffic. Gross impressions, including invalid traffic, are ad_gross_impressions.
- `ad_clicks` (`NUMBER`, required) — Clicks after Amazon removed invalid traffic. Gross clicks, including invalid traffic, are ad_gross_click_throughs.
- `ad_top_of_search_impression_share` (`NUMBER`, required) — Top-of-search impression share: top-of-search impressions earned divided by the top-of-search impressions the target was eligible for. A percentage, not an impression count. Sponsored Products and Sponsored Brands use a 90-day lookback.
- `kindle_edition_normalized_pages_read_14d` (`NUMBER`, nullable) — Kindle Edition Normalized Pages (KENP) read by Kindle Unlimited readers within 14 days of an ad click. A page count, not money. Sponsored Products only; null for other campaign types and for books outside Kindle Unlimited.
- `kindle_edition_normalized_pages_royalties_14d` (`NUMBER`, nullable) — Amazon estimate of the royalties for kindle_edition_normalized_pages_read_14d, in the Ads profile currency. Money, not pages. Sponsored Products only; null for other campaign types and for books outside Kindle Unlimited.
- `kenp_per_click_14d` (`NUMBER`, nullable) — KENP read per ad click. Null when clicks are zero or unknown. — definition: `kindle_edition_normalized_pages_read_14d / ad_clicks`
- `estimated_kenp_royalty_per_click_14d` (`NUMBER`, nullable) — Estimated KENP royalties per ad click. Null when clicks are zero or unknown. — definition: `kindle_edition_normalized_pages_royalties_14d / ad_clicks`
- `ku_qualified_borrows` (`NUMBER`, nullable) — Kindle Unlimited borrows Amazon counts as qualified, attributed to the ad. A count, not money. Sponsored Products and Sponsored Display; null for Sponsored Brands and Sponsored Television.
- `estimated_ku_borrow_royalties` (`NUMBER`, nullable) — Amazon estimate of the royalties of ku_qualified_borrows. Money, not a count. Sponsored Products and Sponsored Display; null for Sponsored Brands and Sponsored Television.
- `ad_add_to_list` (`NUMBER`, nullable) — Times shoppers added the advertised product to a list, attributed to the ad. Sponsored Products and Sponsored Display; null for Sponsored Brands and Sponsored Television.
- `ku_qualified_borrows_from_clicks` (`NUMBER`, nullable) — Part of ku_qualified_borrows attributed to ad clicks. Sponsored Display only; Amazon reports no click/view split for Sponsored Products.
- `ku_qualified_borrows_from_views` (`NUMBER`, nullable) — Part of ku_qualified_borrows attributed to ad views. Sponsored Display only; Amazon reports no click/view split for Sponsored Products.
- `estimated_ku_borrow_royalties_from_clicks` (`NUMBER`, nullable) — Part of estimated_ku_borrow_royalties attributed to ad clicks. Sponsored Display only; Amazon reports no click/view split for Sponsored Products.
- `estimated_ku_borrow_royalties_from_views` (`NUMBER`, nullable) — Part of estimated_ku_borrow_royalties attributed to ad views. Sponsored Display only; Amazon reports no click/view split for Sponsored Products.
- `ad_add_to_list_from_clicks` (`NUMBER`, nullable) — Part of ad_add_to_list attributed to ad clicks. Sponsored Display only; Amazon reports no click/view split for Sponsored Products.
- `ad_add_to_list_from_views` (`NUMBER`, nullable) — Part of ad_add_to_list attributed to ad views. Sponsored Display only; Amazon reports no click/view split for Sponsored Products.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
