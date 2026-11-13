# Ad Campaigns (raw)

- BigQuery table name: `amazon_ads_campaigns_raw`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Snapshots of Amazon Ads campaign configuration and settings. Rows are identified by campaign and ad product within each Organization, Store, and Ads Connection. State changes update the existing row. Includes archived, enabled, and paused campaigns. Snapshots are refreshed every 48 hours. Live entity state can be obtained using Actions.

- Source type: `AMAZON_ADS`
- Source ID: `90b696e336f05b1a7f1684519cbaa63052a8e6452ede2d66aa41bfa92dfcfec3`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=90b696e336f05b1a7f1684519cbaa63052a8e6452ede2d66aa41bfa92dfcfec3

## Fetch periods

- `CONTINUOUS`

## Related actions

- `AMAZON_ADS_CAMPAIGNS_ADD` — writes: writes rows to this table
- `AMAZON_ADS_CAMPAIGNS_UPDATE` — writes: writes rows to this table
- `AMAZON_ADS_CAMPAIGNS_REMOVE` — writes: writes rows to this table
- `AMAZON_ADS_CAMPAIGNS_FIND` — live: reads a fresher live value. When a FIND Action's entity is in the DataDoe data scheme, use an Export or a BigQuery query. Use FIND only when you need live Amazon data that the warehouse does not have yet. One standard Export costs 2 AI Tokens. One integrated BigQuery query costs 0.2 AI Tokens. Compare the total cost of repeated FIND Actions with one Export or query.

actions_details_schema_get reports whether each Action type is enabled for the Organization. An Organization owner enables a type in the DataDoe app under Settings > Actions.

## Columns (28)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `ad_campaign_id` (`TEXT`, required)
- `ad_campaign_name` (`TEXT`, required)
- `ad_campaign_type` (`TEXT`, nullable) — SPONSORED_DISPLAY / SPONSORED_PRODUCTS / SPONSORED_BRANDS
- `ad_portfolio_id` (`TEXT`, nullable)
- `ad_portfolio_name` (`TEXT`, nullable)
- `ad_campaign_start_date` (`DATE`, nullable)
- `ad_campaign_end_date` (`DATE`, nullable)
- `ad_campaign_updated_at_utc` (`DATE`, required)
- `ad_campaign_created_at_utc` (`DATE`, required)
- `ad_campaign_state` (`TEXT`, required) — Entity state from Amazon Ads Universal Exports API. Enum values: ARCHIVED / ENABLED / PAUSED.
- `ad_campaign_delivery_status` (`TEXT`, required) — Whether Amazon is delivering the campaign, such as DELIVERING or NOT_DELIVERING. Not ad_campaign_state (ENABLED, PAUSED, ARCHIVED).
- `ad_campaign_delivery_reasons` (`JSON`, nullable) — Same as JSON payload from Amazon Ads API.
- `ad_campaign_brand_entity_id` (`TEXT`, nullable)
- `ad_campaign_optimization_bid_strategy` (`TEXT`, nullable) — Sponsored Products bid strategy: LEGACY_FOR_SALES (down only), AUTO_FOR_SALES (up and down), MANUAL, or RULE_BASED.
- `ad_campaign_optimization_placement_bid_adjustments` (`JSON`, nullable) — Placement bid adjustments from campaign optimization settings. Same as JSON payload from Amazon Ads API.
- `ad_campaign_optimization_shopper_segment_bid_adjustment` (`JSON`, nullable) — Shopper segment bid adjustment from campaign optimization settings. Same as JSON payload from Amazon Ads API.
- `ad_campaign_optimization_shopper_cohort_bid_adjustment` (`JSON`, nullable) — Shopper cohort bid adjustment from campaign optimization settings. Same as JSON payload from Amazon Ads API.
- `ad_campaign_budget_caps` (`JSON`, nullable) — Same as JSON payload from Amazon Ads API.
- `ad_campaign_targeting_settings` (`TEXT`, nullable) — MANUAL or AUTO for Sponsored Products. Null when Amazon does not send it.
- `ad_campaign_cost_type` (`TEXT`, nullable) — How the campaign is priced: CPC or VCPM.
- `ad_campaign_tags` (`JSON`, nullable) — Same as JSON payload from Amazon Ads API.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
