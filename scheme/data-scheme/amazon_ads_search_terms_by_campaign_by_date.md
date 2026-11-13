# Search Term Performance (Ads)

- BigQuery table name: `amazon_ads_search_terms_by_campaign_by_date`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Customer search queries that matched an advertised keyword or product target, for Sponsored Products and Sponsored Brands. ad_search_term is the shopper query; ad_keyword is the target it matched. Not Brand Analytics search terms and not Search Query Performance.

- Source type: `AMAZON_ADS`
- Source ID: `e94e9671989ce4aa2814ac729807c7ddcc1cc47a71ebcd75d9fe661ed80335be`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=e94e9671989ce4aa2814ac729807c7ddcc1cc47a71ebcd75d9fe661ed80335be

## Fetch periods

- `INITIAL` (60 days)
- `RECURRING_DAILY` (21 days)
- `RECURRING_MONTHLY` (49 days)

## Related actions

- `AMAZON_ADS_TARGETS_ADD` — writes: writes rows to this table
- `AMAZON_ADS_TARGETS_UPDATE` — writes: writes rows to this table
- `AMAZON_ADS_TARGETS_REMOVE` — writes: writes rows to this table
- `AMAZON_ADS_TARGETS_FIND` — live: reads a fresher live value. When a FIND Action's entity is in the DataDoe data scheme, use an Export or a BigQuery query. Use FIND only when you need live Amazon data that the warehouse does not have yet. One standard Export costs 2 AI Tokens. One integrated BigQuery query costs 0.2 AI Tokens. Compare the total cost of repeated FIND Actions with one Export or query.

actions_details_schema_get reports whether each Action type is enabled for the Organization. An Organization owner enables a type in the DataDoe app under Settings > Actions.

## Search aliases

- search term report
- customer query

## Columns (42)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `date` (`DATE`, required)
- `ad_targeting_text` (`TEXT`, required)
- `ad_keyword_id` (`TEXT`, required)
- `ad_keyword` (`TEXT`, required) — Keyword or product target the customer query matched. Not the query itself.
- `ad_keyword_status` (`TEXT`, required)
- `ad_search_term` (`TEXT`, required) — Search query the customer typed. Not the keyword or target.
- `ad_search_term_no` (`TEXT`, required) — Identifier for de-duplication of search terms.
- `ad_match_type` (`TEXT`, required) — Keyword match type BROAD, PHRASE, or EXACT. Product targets use TARGETING_EXPRESSION or TARGETING_EXPRESSION_PREDEFINED.
- `ad_campaign_id` (`TEXT`, required)
- `ad_campaign_name` (`TEXT`, required)
- `ad_campaign_type` (`TEXT`, required) — SPONSORED_BRANDS or SPONSORED_PRODUCTS.
- `ad_portfolio_id` (`TEXT`, nullable) — Portfolio ID for SPONSORED_PRODUCTS campaigns. For SPONSORED_BRANDS this field is always NULL.
- `ad_portfolio_name` (`TEXT`, nullable) — Portfolio name for SPONSORED_PRODUCTS campaigns. For SPONSORED_BRANDS this field is always NULL.
- `ad_campaign_status` (`TEXT`, required)
- `ad_campaign_budget_amount` (`NUMBER`, required)
- `ad_campaign_budget_type` (`TEXT`, nullable)
- `ad_campaign_budget_currency` (`TEXT`, required)
- `ad_group_id` (`TEXT`, required)
- `ad_group_name` (`TEXT`, required)
- `ad_units_sold_click` (`NUMBER`, required) — Units sold attributed to a click. Excludes view-through units. Sponsored Brands uses 14 days.
- `ad_sales` (`NUMBER`, required) — Attributed ad sales (14d for SPONSORED_BRANDS and SPONSORED_DISPLAY, 7d for SPONSORED_PRODUCTS).
- `ad_orders` (`NUMBER`, required) — Attributed ad orders (14d for SPONSORED_BRANDS and SPONSORED_DISPLAY, 7d for SPONSORED_PRODUCTS).
- `ad_orders_same_sku` (`NUMBER`, required) — Attributed orders of the advertised SKU only (14d for SPONSORED_BRANDS and SPONSORED_DISPLAY, 7d for SPONSORED_PRODUCTS). Excludes brand-halo orders of other SKUs.
- `ad_spend` (`NUMBER`, required)
- `ad_impressions` (`NUMBER`, required) — Times the ad was displayed after Amazon removed invalid traffic. Gross impressions, including invalid traffic, are ad_gross_impressions.
- `ad_clicks` (`NUMBER`, required) — Clicks after Amazon removed invalid traffic. Gross clicks, including invalid traffic, are ad_gross_click_throughs.
- `ad_click_through_rate` (`NUMBER`, required) — Clicks divided by impressions. A rate, not a click count.
- `ad_keyword_bid` (`NUMBER`, required) — Bid on the keyword or targeting expression. Not spend.
- `kindle_edition_normalized_pages_read_14d` (`NUMBER`, nullable) — Kindle Edition Normalized Pages (KENP) read by Kindle Unlimited readers within 14 days of an ad click. A page count, not money. Sponsored Products only; null for other campaign types and for books outside Kindle Unlimited.
- `kindle_edition_normalized_pages_royalties_14d` (`NUMBER`, nullable) — Amazon estimate of the royalties for kindle_edition_normalized_pages_read_14d, in the Ads profile currency. Money, not pages. Sponsored Products only; null for other campaign types and for books outside Kindle Unlimited.
- `kenp_per_click_14d` (`NUMBER`, nullable) — KENP read per ad click. Null when clicks are zero or unknown. — definition: `kindle_edition_normalized_pages_read_14d / ad_clicks`
- `estimated_kenp_royalty_per_click_14d` (`NUMBER`, nullable) — Estimated KENP royalties per ad click. Null when clicks are zero or unknown. — definition: `kindle_edition_normalized_pages_royalties_14d / ad_clicks`
- `ku_qualified_borrows` (`NUMBER`, nullable) — Kindle Unlimited borrows Amazon counts as qualified, attributed to the ad. A count, not money. Sponsored Products only; null for other campaign types.
- `estimated_ku_borrow_royalties` (`NUMBER`, nullable) — Amazon estimate of the royalties of ku_qualified_borrows. Money, not a count. Sponsored Products only; null for other campaign types.
- `ad_add_to_list` (`NUMBER`, nullable) — Times shoppers added the advertised product to a list, attributed to the ad. Sponsored Products only; null for other campaign types.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
