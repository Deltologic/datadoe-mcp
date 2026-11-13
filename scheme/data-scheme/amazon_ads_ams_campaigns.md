# AMS Campaigns

- BigQuery table name: `amazon_ads_ams_campaigns`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Amazon Marketing Stream campaign configuration events from dataset ads-campaign-management-campaigns.

- Source type: `AMAZON_ADS`
- Source ID: `edddc5144cb838c3088f9621eb23c372e7fea26fd983d1ed065b388dfc7907fa`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=edddc5144cb838c3088f9621eb23c372e7fea26fd983d1ed065b388dfc7907fa

## Fetch periods

- `CONTINUOUS`

## Related actions

- `AMAZON_ADS_CAMPAIGNS_ADD` — writes: writes rows to this table
- `AMAZON_ADS_CAMPAIGNS_UPDATE` — writes: writes rows to this table
- `AMAZON_ADS_CAMPAIGNS_REMOVE` — writes: writes rows to this table
- `AMAZON_ADS_CAMPAIGNS_FIND` — live: reads a fresher live value. When a FIND Action's entity is in the DataDoe data scheme, use an Export or a BigQuery query. Use FIND only when you need live Amazon data that the warehouse does not have yet. One standard Export costs 2 AI Tokens. One integrated BigQuery query costs 0.2 AI Tokens. Compare the total cost of repeated FIND Actions with one Export or query.

actions_details_schema_get reports whether each Action type is enabled for the Organization. An Organization owner enables a type in the DataDoe app under Settings > Actions.

## Columns (24)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `amazon_ads_advertiser_id` (`TEXT`, nullable) — Amazon Ads advertiser identifier from Amazon Marketing Stream.
- `received_at` (`DATE`, required) — Timestamp when the Amazon Marketing Stream event was received by DataDoe.
- `ad_campaign_id` (`TEXT`, required)
- `ad_campaign_type` (`TEXT`, nullable) — Advertising product type from Amazon Marketing Stream. Common values: SPONSORED_PRODUCTS / SPONSORED_BRANDS / AMAZON_DSP. Budget usage may use lowercase product codes such as sp / sb / sd.
- `ad_portfolio_id` (`TEXT`, nullable)
- `ad_campaign_name` (`TEXT`, nullable)
- `ad_campaign_starts_at` (`DATE`, nullable)
- `ad_campaign_ends_at` (`DATE`, nullable)
- `ad_campaign_status` (`TEXT`, nullable) — Campaign state from Amazon Marketing Stream (for example ENABLED / PAUSED / ARCHIVED).
- `ad_campaign_targeting_settings` (`JSON`, nullable) — Targeting / site restriction settings from campaign optimizations. Same as JSON payload from Amazon Marketing Stream.
- `ad_campaign_budget_cap_value` (`NUMBER`, nullable)
- `ad_campaign_budget_cap_currency` (`TEXT`, nullable) — Currency code for the budget cap.
- `ad_campaign_budget_cap_recurrence` (`TEXT`, nullable) — Budget recurrence period. Enum values: DAILY / MONTHLY / LIFETIME.
- `ad_campaign_bid_settings` (`JSON`, nullable) — Bid settings from campaign optimizations. Same as JSON payload from Amazon Marketing Stream.
- `is_multi_ad_groups_enabled` (`LOGIC`, nullable) — Whether the campaign can have multiple ad groups.
- `ad_campaign_created_at` (`DATE`, nullable) — Time Amazon created the campaign.
- `ad_campaign_updated_at` (`DATE`, nullable) — Time Amazon last updated the campaign.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
