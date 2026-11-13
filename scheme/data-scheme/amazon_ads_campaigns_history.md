# Ad Campaign Settings History

- BigQuery table name: `amazon_ads_campaigns_history`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Entity settings from complete published Universal Ads exports, including unchanged later observations. Each snapshot_id is one family/profile export, not a simultaneous account snapshot. Actual observation dates and gaps are authoritative. Portfolio names are null in campaign history; seller and account labels are current context. Absence from a later file does not imply deletion. Changes are known only between observations.  History follows existing collection, normally every 48 hours, with large targets on the weekly schedule. Source caps and failed or incomplete exports leave gaps. No complete daily coverage is guaranteed. Inspect checked_at and snapshot manifests for actual observations. Actions provide live entity state.

- Source type: `AMAZON_ADS`
- Source ID: `936f3f79f5ad2b076f4ffe1aeb672c92aaa57b27384050d7ccac963fef4e9f2a`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=936f3f79f5ad2b076f4ffe1aeb672c92aaa57b27384050d7ccac963fef4e9f2a

## Fetch periods

- `CONTINUOUS`

## Columns (38)

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
- `snapshot_id` (`TEXT`, required)
- `source_export_id` (`TEXT`, nullable)
- `source_requested_at` (`DATE`, nullable) — Original export request time. Use this to order source observations.
- `checked_at` (`DATE`, nullable) — Export completion observation, not the exact time an entity changed.
- `checked_at_source` (`TEXT`, nullable)
- `snapshot_date` (`DATE`, nullable) — Completion observation date in the verified Amazon Ads reporting time zone. Null when that time zone is unavailable; checked_at still retains the actual observation time.
- `profile_id` (`TEXT`, nullable)
- `snapshot_kind` (`TEXT`, required) — OBSERVED. Only observations captured after enablement are retained.
- `imported_at` (`DATE`, nullable)
- `date` (`DATE`, nullable) — Alias of snapshot_date for date-range exports.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
