# Ad Profit by Search Term and Date

- BigQuery table name: `amazon_ads_profit_by_search_term_and_date`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

One row per reported shopper search term, parent target and click date for Sponsored Products and Brands. The report identifies the query and parent keyword or target but not the ASIN purchased for that query. Sponsored Products profit estimates inherit the parent target product mix and cost per same- or other-SKU sale. Sponsored Brands keeps spend, sales and keyword identity with null profit. Recent estimates are provisional and all estimates exclude refunds. Search-term totals overlap target totals and are not account P&L.

- Source type: `AMAZON_ADS`
- Source ID: `68584bc4d0ab286c8125c768751f38c5e5e9e2692dd061e3d6d2d9ab7fb6a4e5`
- Requires a date period: yes
- Contains PII: no
- Premium table: yes
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=68584bc4d0ab286c8125c768751f38c5e5e9e2692dd061e3d6d2d9ab7fb6a4e5

## Fetch periods

- `CONTINUOUS`

## Related actions

- `AMAZON_ADS_TARGETS_FIND` — live: reads a fresher live value. When a FIND Action's entity is in the DataDoe data scheme, use an Export or a BigQuery query. Use FIND only when you need live Amazon data that the warehouse does not have yet. One standard Export costs 2 AI Tokens. One integrated BigQuery query costs 0.2 AI Tokens. Compare the total cost of repeated FIND Actions with one Export or query.
- `AMAZON_ADS_TARGETS_UPDATE` — writes: writes rows to this table

actions_details_schema_get reports whether each Action type is enabled for the Organization. An Organization owner enables a type in the DataDoe app under Settings > Actions.

## Columns (68)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `currency` (`TEXT`, required) — Reported currency, falling back to the marketplace currency when missing or blank. — definition: `resolveCurrency(search-term report ad_campaign_budget_currency, marketplace_id)`
- `date` (`DATE`, required) — Amazon Ads report click date in the marketplace timezone. — definition: `search-term report date`
- `ad_campaign_type` (`TEXT`, required) — SPONSORED_PRODUCTS or SPONSORED_BRANDS.
- `ad_campaign_id` (`TEXT`, required)
- `ad_campaign_name` (`TEXT`, required)
- `ad_group_id` (`TEXT`, required)
- `ad_group_name` (`TEXT`, required)
- `target_entity_type` (`TEXT`, required) — KEYWORD for Sponsored Brands, derived directly from its keyword search-term report. Sponsored Products inherits the matched parent type; null without a match. — definition: `Sponsored Brands: KEYWORD; otherwise parent amazon_ads_profit_by_target_and_date.target_entity_type`
- `ad_target_id` (`TEXT`, required) — Parent non-keyword target ID when the parent target can be matched. — definition: `parent amazon_ads_profit_by_target_and_date.ad_target_id`
- `ad_keyword_id` (`TEXT`, required) — Parent keyword ID from the Sponsored Brands search-term row or a matched Sponsored Products keyword. Use action_target_id for Actions. — definition: `search-term report keywordId for Sponsored Brands or matched Sponsored Products keyword targets`
- `ad_keyword` (`TEXT`, required) — Matched advertiser keyword or targeting expression, not the shopper query.
- `ad_targeting_text` (`TEXT`, required)
- `ad_match_type` (`TEXT`, required) — Keyword match type BROAD, PHRASE, or EXACT. Product targets use TARGETING_EXPRESSION or TARGETING_EXPRESSION_PREDEFINED.
- `action_target_id` (`TEXT`, required) — Keyword or target ID to pass as targetId to target Actions, with the Ads connection, campaign and ad group IDs. For search terms this is the parent entity ID, never the shopper query. — definition: `target report: coalesce(ad_targeting_id, ad_keyword_id); search-term report: ad_keyword_id`
- `ad_keyword_status` (`TEXT`, required) — Keyword or target status carried from the performance report, when available.
- `ad_campaign_status` (`TEXT`, required) — Campaign status carried from the performance report, when available.
- `ad_portfolio_id` (`TEXT`, required) — Portfolio ID carried from the performance report, when available.
- `ad_portfolio_name` (`TEXT`, required) — Portfolio name matched by Ads connection and portfolio ID, when available.
- `ad_keyword_bid` (`NUMBER`, required) — Bid recorded in the performance report. This historical value can differ from the latest target bid. — definition: `Sponsored Products targeting keywordBid, Sponsored Brands keyword report keywordBid, or search-term report ad_keyword_bid. Null when unavailable.`
- `ad_target_bid` (`NUMBER`, required) — Latest fetched target or keyword bid from the existing target export. Null when no matching exported target is available. Refresh with target Actions before changing a bid. — definition: `amazon_ads_targets_raw.ad_target_bid matched by Organization, Store, marketplace, Ads connection, campaign type, campaign, ad group and action_target_id`
- `ad_target_state` (`TEXT`, required) — Latest fetched target state from the target export; null when unavailable. — definition: `matched amazon_ads_targets_raw.ad_target_state`
- `ad_target_updated_at_utc` (`DATE`, required) — Amazon update time for the exported target whose bid and state are shown. — definition: `matched amazon_ads_targets_raw.ad_target_updated_at_utc`
- `attribution_window_days` (`NUMBER`, required) — Click attribution window: seven days for Sponsored Products, 14 for Sponsored Brands; null when unavailable. — definition: `ad_campaign_type === 'SPONSORED_PRODUCTS' ? 7 : ad_campaign_type === 'SPONSORED_BRANDS' ? 14 : null`
- `ad_spend` (`NUMBER`, required) — Spend reported for this target or search term on the click date. — definition: `source targeting or search-term report cost`
- `ad_sales` (`NUMBER`, required) — Sales attributed to clicks on this date within the report attribution window. This is not shipped-order revenue. — definition: `source targeting or search-term report attributed sales`
- `ad_orders` (`NUMBER`, required) — Purchases attributed to clicks within the report attribution window. — definition: `source targeting or search-term report purchases`
- `ad_units_sold` (`NUMBER`, required) — Units attributed to clicks, when the source report supplies them. — definition: `source targeting or search-term report units sold from clicks`
- `ad_impressions` (`NUMBER`, required) — Impressions reported for this target or search term. — definition: `source targeting or search-term report impressions`
- `ad_clicks` (`NUMBER`, required) — Clicks reported for this target or search term. — definition: `source targeting or search-term report clicks`
- `ad_sales_same_sku` (`NUMBER`, required) — Sponsored Products attributed sales of the advertised SKU within seven days. Null for other ad types. — definition: `raw Sponsored Products attributedSalesSameSku7d`
- `ad_sales_other_sku` (`NUMBER`, required) — Sponsored Products attributed sales of SKUs other than the advertised SKU within seven days. — definition: `raw Sponsored Products salesOtherSku7d`
- `ad_units_same_sku` (`NUMBER`, required) — Sponsored Products units of the advertised SKU attributed within seven days. — definition: `raw Sponsored Products unitsSoldSameSku7d`
- `ad_units_other_sku` (`NUMBER`, required) — Sponsored Products units of other SKUs attributed within seven days. — definition: `raw Sponsored Products unitsSoldOtherSku7d`
- `purchased_product_other_sku_sales` (`NUMBER`, required) — Target-level sum of seven-day other-SKU sales from the purchased-products report. Null for search terms and unsupported ad types. — definition: `sum(raw Sponsored Products purchased-products salesOtherSku7d) by target and date`
- `purchased_product_sales_delta` (`NUMBER`, required) — Target other-SKU sales minus purchased-product other-SKU sales. The difference remains visible even when it is within the accepted tolerance. — definition: `ad_sales_other_sku - coalesce(purchased_product_other_sku_sales, 0)`
- `estimated_cogs_same_sku` (`NUMBER`, required) — Estimated COGS for same-SKU sales. Target rows use ad-group advertised-product unit mix; search-term rows inherit the parent target cost per same-SKU sale. — definition: `same-SKU units times promoted-product unit COGS mix, or search-term same-SKU sales times parent same-SKU COGS divided by parent same-SKU sales`
- `estimated_cogs_other_sku` (`NUMBER`, required) — Estimated COGS for other-SKU sales. Target rows use purchased ASIN units and scale costs to reported other-SKU sales within the reconciliation tolerance. Search-term rows inherit the parent target cost per other-SKU sale. — definition: `target: sum(purchased ASIN units * estimated unit COGS) * ad_sales_other_sku / purchased_product_other_sku_sales; search term: other-SKU sales * parent other-SKU COGS / parent other-SKU sales`
- `estimated_variable_fees_same_sku` (`NUMBER`, required) — Estimated same-SKU order fees from the advertised-product mix and preceding 90 days of SKU ORDER settlements. Uses the account profit fee definition; excludes refunds. — definition: `same-SKU units times historical per-unit fee mix, or search-term same-SKU sales times parent fees divided by parent same-SKU sales`
- `estimated_variable_fees_other_sku` (`NUMBER`, required) — Estimated other-SKU order fees from purchased ASINs and preceding 90 days of SKU ORDER settlements, scaled within the reconciliation tolerance. Excludes refunds. — definition: `target: sum(purchased ASIN units * historical unit fees) * ad_sales_other_sku / purchased_product_other_sku_sales; search term: other-SKU sales * parent other-SKU fees / parent other-SKU sales`
- `estimated_cogs` (`NUMBER`, required) — Sum of estimated same- and other-SKU COGS. Null when either sold component cannot be costed. — definition: `estimated_cogs_same_sku + estimated_cogs_other_sku when all sold components are costed`
- `cogs_present` (`LOGIC`, nullable) — True when positive Sponsored Products sales match the same- and other-SKU split within 0.01 and every positive component has a COGS estimate. False if the split or an estimate is missing or the split does not match; null when reported sales are not positive or this campaign type does not support cost estimates.
- `estimated_variable_fees` (`NUMBER`, required) — Estimated order fees, net of order credits, using the same fee families as account profit: referral, closing, digital services, fulfillment (including handling, pick and pack, transportation and order-level return charges), technology and seller-funded promotions. Excludes refunds, advertising, seller-retained tax and posted-date fees such as storage, subscription, inbound and disposal. Null without sufficient history. — definition: `estimated_variable_fees_same_sku + estimated_variable_fees_other_sku; per-SKU unit fee = orderDateTotalFeesSum(ORDER settlements in preceding 90 days) / sum(order-SKU quantities counted once across split settlement rows), scoped to seller connection, marketplace and currency`
- `estimated_contribution_before_ads` (`NUMBER`, required) — Attributed sales less estimated COGS and variable fees, before ad spend. Null for incomplete costs. — definition: `ad_sales - estimated_cogs - estimated_variable_fees`
- `estimated_profit_after_ads` (`NUMBER`, required) — Attributed contribution less reported spend, excluding refunds. Recent rows are provisional until attribution matures and remain in daily profit summaries. This estimate must not be added to account P&L. — definition: `estimated_contribution_before_ads - coalesce(ad_spend, 0)`
- `estimated_break_even_acos` (`NUMBER`, required) — Maximum ad spend divided by attributed sales that leaves estimated contribution after ads at zero. Ratio, not percent; null with no sales or incomplete costs. — definition: `estimated_contribution_before_ads / ad_sales`
- `acos` (`NUMBER`, required) — Reported ad spend divided by attributed sales. Ratio, not percent; null with no sales. — definition: `ad_spend / ad_sales`
- `costed_sales` (`NUMBER`, required) — Attributed sales from rows with a non-null profit estimate, including provisional rows. — definition: `estimated_profit_after_ads is not null ? ad_sales : 0`
- `unsupported_sales` (`NUMBER`, required) — Attributed sales from ad types without product attribution for estimating profit. — definition: `ad_campaign_type !== 'SPONSORED_PRODUCTS' ? ad_sales : 0`
- `missing_cost_sales` (`NUMBER`, required) — Sponsored Products sales on rows without a profit estimate because costs, parent target data or reconciliation are incomplete. Includes the whole row, even if one sales component has costs. — definition: `ad_campaign_type === 'SPONSORED_PRODUCTS' && ad_sales > 0 && estimated_profit_after_ads is null ? ad_sales : 0`
- `cost_coverage_rate` (`NUMBER`, required) — Share of same- and other-SKU sales components with COGS and fee estimates. May include a component of a row whose total profit is null. Ratio, not percent. — definition: `sum(same- and other-SKU sales components with COGS and fee estimates) / ad_sales`
- `cost_assignment_method` (`TEXT`, required) — Method used to assign product costs. Target costs use promoted-product and purchased-ASIN mix; search terms inherit parent target mix. — definition: `target: 'AD_GROUP_PROMOTED_MIX_AND_TARGET_PURCHASED_ASIN'; search term: 'PARENT_TARGET_SALES_MIX'; otherwise 'UNAVAILABLE'`
- `profit_status` (`TEXT`, required) — PENDING_ATTRIBUTION while a known attribution window is still open. Otherwise ESTIMATED, SPEND_ONLY, ATTRIBUTION_UNAVAILABLE, SELLER_CENTRAL_CONNECTION_UNAVAILABLE, MISSING_PRODUCT_COST_OR_FEE, PARENT_TARGET_UNAVAILABLE or PRODUCT_ATTRIBUTION_UNAVAILABLE. Pending rows can have provisional profit values. — definition: `pending attribution takes precedence; then campaign type, reported sales availability, parent availability, Seller Central connection and missing costs determine status`
- `profitability_flag` (`TEXT`, required) — Business reading of this daily estimate: PROFITABLE (at or above break-even), BELOW_BREAK_EVEN, NO_SALES_MATURE or INSUFFICIENT_DATA. Pending attribution is insufficient for a final decision. A single no-sales day is not a recommendation to pause a target. — definition: `immature: INSUFFICIENT_DATA; mature with zero sales and positive spend: NO_SALES_MATURE; null profit: INSUFFICIENT_DATA; positive sales and profit >= 0: PROFITABLE; negative profit: BELOW_BREAK_EVEN; otherwise INSUFFICIENT_DATA`
- `excludes_refunds` (`LOGIC`, required) — Always true. Estimates exclude refund revenue reversals, refund fees and returned-product cost recovery. Break-even ACoS is before the cost of refunds. — definition: `true`
- `purchased_asin_cost_method` (`TEXT`, required) — How purchased-ASIN unit costs are assigned: SINGLE_SKU, SHARED_SKU_COST, RECENT_ORDER_UNIT_MIX or MIXED across purchased ASINs. Search terms inherit this from the parent. Null without a purchased mix. — definition: `Within the seller connection, marketplace and currency, use a common unit cost when all known SKUs agree; otherwise weight available SKU costs by order quantities from the preceding 90 days. Require costs for every SKU with positive order weight; no supported weights means null costs. The SKU set comes from effective COGS and recent ORDER settlements.`
- `is_attribution_mature` (`LOGIC`, required) — Whether the full report attribution window has elapsed since the click date in the marketplace timezone. — definition: `date <= marketplace current date - attribution_window_days`
- `mature_spend_without_sales` (`NUMBER`, required) — Reported spend with zero attributed sales after the attribution window has elapsed. Null otherwise. — definition: `is_attribution_mature && ad_sales === 0 ? ad_spend : null`
- `ad_search_term` (`TEXT`, required) — Shopper query or ASIN that matched the parent target. Not an Amazon Ads target entity ID. — definition: `search-term report searchTerm or query`
- `search_term_kind` (`TEXT`, required) — ASIN when the reported term has an ASIN-like shape; QUERY otherwise. This is a text classification. — definition: `ad_search_term matches /^B0[A-Z0-9]{8}$/i ? 'ASIN' : 'QUERY'`
- `parent_target_id` (`TEXT`, required) — Parent target or keyword ID for target Actions. Never use the shopper query itself as an entity ID. — definition: `coalesce(parent ad_target_id, search-term report keywordId)`
- `cost_estimation_method` (`TEXT`, required) — PARENT_TARGET_SAME_AND_OTHER_SKU_COST_PER_SALE for Sponsored Products; UNAVAILABLE otherwise. — definition: `campaign type determines whether parent target cost ratios can be used`

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
