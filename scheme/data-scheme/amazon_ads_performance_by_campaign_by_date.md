# Ad Performance by Campaign & Date

- BigQuery table name: `amazon_ads_performance_by_campaign_by_date`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Ads performance per campaign and date for Sponsored Products, Sponsored Brands, Sponsored Display, and Sponsored Television. Use this table for total sponsored ads campaign spend and sales. ad_impressions and ad_clicks exclude invalid traffic; gross and invalid columns are the traffic-quality reconciliation. Amazon DSP is not included; use amazon_ads_dsp_performance_by_creative_by_date for Amazon DSP.

- Source type: `AMAZON_ADS`
- Source ID: `08cdc77d3dc24a7651553e2e926f598188c66172f64cd6512265900af6073a6c`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: yes
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=08cdc77d3dc24a7651553e2e926f598188c66172f64cd6512265900af6073a6c

## Fetch periods

- `INITIAL` (56 days)
- `RECURRING_DAILY` (21 days)
- `RECURRING_MONTHLY` (49 days)

## Data availability

- `INTRADAY` — Daily fetch starts at 2am and rereads 21 days. Intraday fetches start at 8am, 1pm and 4pm and reread 5 days. Times use the marketplace time zone. Data is available after processing and can change in later reports. Refresh: 2am, 8am, 1pm, 4pm.

## Related actions

- `AMAZON_ADS_CAMPAIGNS_ADD` — writes: writes rows to this table
- `AMAZON_ADS_CAMPAIGNS_UPDATE` — writes: writes rows to this table
- `AMAZON_ADS_CAMPAIGNS_REMOVE` — writes: writes rows to this table
- `AMAZON_ADS_CAMPAIGNS_FIND` — live: reads a fresher live value. When a FIND Action's entity is in the DataDoe data scheme, use an Export or a BigQuery query. Use FIND only when you need live Amazon data that the warehouse does not have yet. One standard Export costs 2 AI Tokens. One integrated BigQuery query costs 0.2 AI Tokens. Compare the total cost of repeated FIND Actions with one Export or query.

actions_details_schema_get reports whether each Action type is enabled for the Organization. An Organization owner enables a type in the DataDoe app under Settings > Actions.

## Search aliases

- ppc
- sponsored ads
- acos
- roas
- cpc
- cpm
- tacos
- ad spend

## Columns (37)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `date` (`DATE`, required)
- `ad_campaign_type` (`TEXT`, required) — SPONSORED_DISPLAY / SPONSORED_PRODUCTS / SPONSORED_BRANDS / SPONSORED_TELEVISION.
- `ad_clicks` (`NUMBER`, required) — Clicks after Amazon removed invalid traffic. Gross clicks, including invalid traffic, are ad_gross_click_throughs.
- `ad_sales` (`NUMBER`, required) — Attributed ad sales (14d for SPONSORED_BRANDS and SPONSORED_DISPLAY, 7d for SPONSORED_PRODUCTS). — definition: `amazon_ads_performance_by_campaign_by_date.ad_campaign_type === 'SPONSORED_PRODUCTS' ? raw_ads_api_report_campaign_sp.sales7d : amazon_ads_performance_by_campaign_by_date.ad_campaign_type === 'SPONSORED_DISPLAY' ? raw_ads_api_report_campaign_sd.sales : amazon_ads_performance_by_campaign_by_date.ad_campaign_type === 'SPONSORED_TELEVISION' ? raw_ads_api_report_campaign_st.sales : raw_ads_api_report_legacy_campaign_sb_all.attributedSales14d`
- `ad_impressions` (`NUMBER`, required) — Times the ad was displayed after Amazon removed invalid traffic. Gross impressions, including invalid traffic, are ad_gross_impressions.
- `ad_spend` (`NUMBER`, required) — Ad spend.
- `ad_units_sold` (`NUMBER`, required) — Attributed ad units sold (14d for SPONSORED_BRANDS and SPONSORED_DISPLAY, 7d for SPONSORED_PRODUCTS). — definition: `amazon_ads_performance_by_campaign_by_date.ad_campaign_type === 'SPONSORED_PRODUCTS' ? raw_ads_api_report_campaign_sp.unitsSoldClicks7d : amazon_ads_performance_by_campaign_by_date.ad_campaign_type === 'SPONSORED_DISPLAY' ? raw_ads_api_report_campaign_sd.unitsSoldClicks : amazon_ads_performance_by_campaign_by_date.ad_campaign_type === 'SPONSORED_TELEVISION' ? raw_ads_api_report_campaign_st.unitsSold : Math.max((raw_ads_api_report_legacy_campaign_sb_all.attributedConversions14d ?? 0), Math.round(((raw_ads_api_report_legacy_campaign_sb_all.attributedUnitsOrderedNewToBrand14d ?? 0) / (raw_ads_api_report_legacy_campaign_sb_all.attributedUnitsOrderedNewToBrandPercentage14d || 100)) * 100))`
- `ad_orders` (`NUMBER`, required) — Attributed ad orders (14d for SPONSORED_BRANDS and SPONSORED_DISPLAY, 7d for SPONSORED_PRODUCTS). — definition: `amazon_ads_performance_by_campaign_by_date.ad_campaign_type === 'SPONSORED_PRODUCTS' ? raw_ads_api_report_campaign_sp.purchases7d : amazon_ads_performance_by_campaign_by_date.ad_campaign_type === 'SPONSORED_DISPLAY' ? raw_ads_api_report_campaign_sd.purchases : amazon_ads_performance_by_campaign_by_date.ad_campaign_type === 'SPONSORED_TELEVISION' ? raw_ads_api_report_campaign_st.purchases : raw_ads_api_report_legacy_campaign_sb_all.attributedConversions14d`
- `ad_campaign_id` (`TEXT`, required) — Campaign identifier.
- `ad_campaign_name` (`TEXT`, required) — Campaign name.
- `ad_campaign_status` (`TEXT`, nullable) — Campaign status.
- `ad_campaign_budget_amount` (`NUMBER`, required) — Campaign budget repeated on every row of the campaign. Do not sum it across ASINs, keywords, placements, or dates. ad_campaign_budget_type is DAILY_BUDGET or LIFETIME_BUDGET.
- `ad_campaign_budget_type` (`TEXT`, nullable) — DAILY_BUDGET / LIFETIME_BUDGET or NULL.
- `ad_campaign_budget_currency` (`TEXT`, required)
- `ad_campaign_rule_based_budget_amount` (`NUMBER`, nullable) — Rule-based campaign budget reported for this date for Sponsored Products, in ad_campaign_budget_currency. Repeated across placements; do not sum across placements or dates. Null when Amazon omits it and for other campaign types. — definition: `campaignRuleBasedBudgetAmount from the Sponsored Products report`
- `ad_campaign_applicable_budget_rule_id` (`TEXT`, nullable) — Identifier of the budget rule Amazon reports as applicable to the Sponsored Products campaign on this date. Null when Amazon omits it and for other campaign types. The rule definition is budget_rule_id on amazon_ads_budget_rules. Amazon does not provide execution history. — definition: `campaignApplicableBudgetRuleId from the Sponsored Products report`
- `ad_campaign_applicable_budget_rule_name` (`TEXT`, nullable) — Name of the budget rule Amazon reports as applicable to the Sponsored Products campaign on this date. Null when Amazon omits it and for other campaign types. The definition is on amazon_ads_budget_rules. This report value is read-only and does not change the rule. — definition: `campaignApplicableBudgetRuleName from the Sponsored Products report`
- `ad_gross_impressions` (`NUMBER`, required) — Times the ad was displayed, including invalid traffic (fraudulent, non-human, and other illegitimate impressions). ad_impressions excludes that traffic.
- `ad_invalid_impressions` (`NUMBER`, required) — Impressions removed by the traffic quality filter. Not included in ad_impressions.
- `ad_invalid_impression_rate` (`NUMBER`, nullable) — Invalid impressions divided by gross impressions. A rate, not an impression count.
- `ad_gross_click_throughs` (`NUMBER`, required) — Times the ad was clicked, including invalid traffic. ad_clicks excludes that traffic.
- `ad_invalid_click_throughs` (`NUMBER`, required) — Clicks removed by the traffic quality filter. Not included in ad_clicks.
- `ad_invalid_click_through_rate` (`NUMBER`, nullable) — Invalid clicks divided by gross clicks. A rate, not a click count.
- `kindle_edition_normalized_pages_read_14d` (`NUMBER`, nullable) — Kindle Edition Normalized Pages (KENP) read by Kindle Unlimited readers within 14 days of an ad click. A page count, not money. Sponsored Products only; null for other campaign types and for books outside Kindle Unlimited.
- `kindle_edition_normalized_pages_royalties_14d` (`NUMBER`, nullable) — Amazon estimate of the royalties for kindle_edition_normalized_pages_read_14d, in the Ads profile currency. Money, not pages. Sponsored Products only; null for other campaign types and for books outside Kindle Unlimited.
- `kenp_per_click_14d` (`NUMBER`, nullable) — KENP read per ad click. Null when clicks are zero or unknown. — definition: `kindle_edition_normalized_pages_read_14d / ad_clicks`
- `estimated_kenp_royalty_per_click_14d` (`NUMBER`, nullable) — Estimated KENP royalties per ad click. Null when clicks are zero or unknown. — definition: `kindle_edition_normalized_pages_royalties_14d / ad_clicks`
- `ku_qualified_borrows` (`NUMBER`, nullable) — Kindle Unlimited borrows Amazon counts as qualified, attributed to the ad. A count, not money. Sponsored Products only; null for other campaign types.
- `estimated_ku_borrow_royalties` (`NUMBER`, nullable) — Amazon estimate of the royalties of ku_qualified_borrows. Money, not a count. Sponsored Products only; null for other campaign types.
- `ad_add_to_list` (`NUMBER`, nullable) — Times shoppers added the advertised product to a list, attributed to the ad. Sponsored Products only; null for other campaign types.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
