# Ads Attribution Performance by Ad Group

- BigQuery table name: `amazon_ads_attribution_performance_by_ad_group_by_date`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Amazon Attribution Performance by Ad Group: off-Amazon traffic measured by Amazon Attribution tags (14-day last-click), not Sponsored Ads conversion windows. Use this table for ad-group or campaign totals and for Brand Referral Bonus (brb_bonus_amount). Do not sum amazon_ads_attribution_performance_by_creative_by_date to this grain. BRB is present only for enrolled sellers and only at ad-group level. Rows with fewer than 10 lifetime clicks are masked (metrics 0).

- Source type: `AMAZON_ADS`
- Source ID: `47e100b3b3342182eb17ce4cad2825200bb14d9bb5455de84b1a3f01ac189d88`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=47e100b3b3342182eb17ce4cad2825200bb14d9bb5455de84b1a3f01ac189d88

## Fetch periods

- `INITIAL` (395 days)
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
- brand referral bonus
- brb

## Columns (27)

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
- `click_throughs` (`NUMBER`, nullable) — Clicks on the Attribution tag. Rows with fewer than 10 lifetime clicks are masked (metrics 0).
- `attributed_detail_page_views_clicks_14d` (`NUMBER`, nullable)
- `attributed_add_to_cart_clicks_14d` (`NUMBER`, nullable)
- `attributed_purchases_14d` (`NUMBER`, nullable)
- `units_sold_14d` (`NUMBER`, nullable)
- `attributed_sales_14d` (`NUMBER`, nullable)
- `attributed_total_detail_page_views_clicks_14d` (`NUMBER`, nullable)
- `attributed_total_add_to_cart_clicks_14d` (`NUMBER`, nullable)
- `attributed_total_purchases_14d` (`NUMBER`, nullable)
- `total_units_sold_14d` (`NUMBER`, nullable)
- `total_attributed_sales_14d` (`NUMBER`, nullable)
- `brb_bonus_amount` (`NUMBER`, nullable) — Estimated ad-attributed Brand Referral Bonus credit in local currency. Only at ad-group level, only when the seller is enrolled in BRB; otherwise NULL.
- `kindle_edition_normalized_pages_read_14d` (`NUMBER`, nullable)
- `kindle_edition_normalized_pages_royalties_14d` (`NUMBER`, nullable)
- `estimated_kenp_royalty_per_external_click` (`NUMBER`, nullable) — Estimated 14-day KENP royalties per click on the off-Amazon tagged link. Not earnings per reader. Null when click_throughs are zero or unknown. — definition: `kindle_edition_normalized_pages_royalties_14d / click_throughs`

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
