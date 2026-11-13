# Ad Purchased Products

- BigQuery table name: `amazon_ads_purchased_products`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

ASINs purchased after an ad click or view, including brand-halo ASINs that differ from the promoted ASIN. Sponsored Products, Sponsored Display, and Sponsored Brands. Not the advertised-product performance table (amazon_ads_performance_by_child_asin_and_date).

- Source type: `AMAZON_ADS`
- Source ID: `7dca257b8f728ceacaed3bb4d4830dd530858d073392455fb43a3ec579b0f947`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: yes
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=7dca257b8f728ceacaed3bb4d4830dd530858d073392455fb43a3ec579b0f947

## Fetch periods

- `INITIAL` (60 days)
- `RECURRING_DAILY` (21 days)
- `RECURRING_MONTHLY` (49 days)

## Data availability

- `INTRADAY` — Intraday updates are available when source data changes during the day. Refresh: 1pm.

## Related actions

- `AMAZON_ADS_ADS_ADD` — writes: writes rows to this table
- `AMAZON_ADS_ADS_UPDATE` — writes: writes rows to this table
- `AMAZON_ADS_ADS_REMOVE` — writes: writes rows to this table
- `AMAZON_ADS_ADS_FIND` — live: reads a fresher live value. When a FIND Action's entity is in the DataDoe data scheme, use an Export or a BigQuery query. Use FIND only when you need live Amazon data that the warehouse does not have yet. One standard Export costs 2 AI Tokens. One integrated BigQuery query costs 0.2 AI Tokens. Compare the total cost of repeated FIND Actions with one Export or query.

actions_details_schema_get reports whether each Action type is enabled for the Organization. An Organization owner enables a type in the DataDoe app under Settings > Actions.

## Search aliases

- brand halo
- purchased asin

## Columns (44)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `date` (`DATE`, required)
- `ad_campaign_type` (`TEXT`, required) — SPONSORED_DISPLAY / SPONSORED_PRODUCTS / SPONSORED_BRANDS
- `ad_campaign_id` (`TEXT`, required)
- `ad_campaign_name` (`TEXT`, required)
- `ad_group_id` (`TEXT`, required)
- `ad_group_name` (`TEXT`, required)
- `currency_code` (`TEXT`, nullable)
- `ad_purchased_asin` (`TEXT`, required) — ASIN the shopper bought. It can differ from ad_promoted_asin (brand halo).
- `ad_keyword_id` (`TEXT`, nullable) — Null for SPONSORED_DISPLAY and SPONSORED_BRANDS
- `ad_target_id` (`TEXT`, nullable) — Null for SPONSORED_DISPLAY and SPONSORED_BRANDS
- `ad_keyword` (`TEXT`, nullable) — Null for SPONSORED_DISPLAY and SPONSORED_BRANDS
- `ad_match_type` (`TEXT`, nullable) — Null for SPONSORED_DISPLAY and SPONSORED_BRANDS
- `ad_targeting_text` (`TEXT`, nullable) — Null for SPONSORED_DISPLAY and SPONSORED_BRANDS
- `ad_keyword_type` (`TEXT`, nullable) — Null for SPONSORED_DISPLAY and SPONSORED_BRANDS
- `ad_portfolio_id` (`TEXT`, nullable) — Null for SPONSORED_DISPLAY and SPONSORED_BRANDS
- `ad_targeting_expression` (`TEXT`, nullable) — Null for SPONSORED_DISPLAY and SPONSORED_BRANDS
- `ad_promoted_asin` (`TEXT`, nullable) — ASIN advertised in the campaign. Null for SPONSORED_BRANDS. The bought ASIN is ad_purchased_asin.
- `ad_promoted_sku` (`TEXT`, nullable) — Null for SPONSORED_BRANDS
- `product_attribution_type` (`TEXT`, nullable) — Whether the purchase was of the promoted product or brand halo, as Amazon reports it (for example Promoted / Brand Halo). SPONSORED_BRANDS only; null for SPONSORED_PRODUCTS and SPONSORED_DISPLAY.
- `ad_keyword_no` (`NUMBER`, nullable)
- `ad_orders` (`NUMBER`, nullable) — Attributed ad orders (14d for SPONSORED_PRODUCTS and SPONSORED_BRANDS; Null for SPONSORED_DISPLAY).
- `ad_orders_other_sku` (`NUMBER`, nullable) — Attributed ad orders where SKU is different from promoted one (14d for SPONSORED_PRODUCTS and SPONSORED_DISPLAY; Null for SPONSORED_BRANDS).
- `ad_sales` (`NUMBER`, nullable) — Attributed ad sales (14d for SPONSORED_PRODUCTS and SPONSORED_BRANDS; Null for SPONSORED_DISPLAY).
- `ad_sales_other_sku` (`NUMBER`, nullable) — Attributed ad sales where SKU is different from promoted one (14d for SPONSORED_PRODUCTS and SPONSORED_DISPLAY; Null for SPONSORED_BRANDS).
- `ad_units_sold` (`NUMBER`, nullable) — Attributed ad units sold (14d for SPONSORED_PRODUCTS and SPONSORED_BRANDS; Null for SPONSORED_DISPLAY).
- `ad_units_sold_other_sku` (`NUMBER`, nullable) — Attributed ad units sold where SKU is different from promoted one (14d for SPONSORED_PRODUCTS and SPONSORED_DISPLAY; Null for SPONSORED_BRANDS).
- `kindle_edition_normalized_pages_read_14d` (`NUMBER`, nullable) — Kindle Edition Normalized Pages (KENP) read by Kindle Unlimited readers within 14 days of an ad click. A page count, not money. Sponsored Products and Sponsored Brands; null for Sponsored Display.
- `kindle_edition_normalized_pages_royalties_14d` (`NUMBER`, nullable) — Amazon estimate of the royalties for kindle_edition_normalized_pages_read_14d, in the Ads profile currency. Money, not pages. Sponsored Products and Sponsored Brands; null for Sponsored Display.
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
