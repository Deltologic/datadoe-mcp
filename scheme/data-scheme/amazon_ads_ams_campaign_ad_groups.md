# AMS Campaign Ad Groups

- BigQuery table name: `amazon_ads_ams_campaign_ad_groups`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Amazon Marketing Stream ad group configuration events from dataset ads-campaign-management-adgroups.

- Source type: `AMAZON_ADS`
- Source ID: `d8a1eb98a80f6b9cdfb3a18290e20edc811f8e84c7f144c49b97e06d5e7cce45`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=d8a1eb98a80f6b9cdfb3a18290e20edc811f8e84c7f144c49b97e06d5e7cce45

## Fetch periods

- `CONTINUOUS`

## Related actions

- `AMAZON_ADS_AD_GROUPS_ADD` — writes: writes rows to this table
- `AMAZON_ADS_AD_GROUPS_UPDATE` — writes: writes rows to this table
- `AMAZON_ADS_AD_GROUPS_REMOVE` — writes: writes rows to this table
- `AMAZON_ADS_AD_GROUPS_FIND` — live: reads a fresher live value. When a FIND Action's entity is in the DataDoe data scheme, use an Export or a BigQuery query. Use FIND only when you need live Amazon data that the warehouse does not have yet. One standard Export costs 2 AI Tokens. One integrated BigQuery query costs 0.2 AI Tokens. Compare the total cost of repeated FIND Actions with one Export or query.

actions_details_schema_get reports whether each Action type is enabled for the Organization. An Organization owner enables a type in the DataDoe app under Settings > Actions.

## Columns (16)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `amazon_ads_advertiser_id` (`TEXT`, nullable) — Amazon Ads advertiser identifier from Amazon Marketing Stream.
- `received_at` (`DATE`, required) — Timestamp when the Amazon Marketing Stream event was received by DataDoe.
- `ad_group_id` (`TEXT`, required)
- `ad_group_name` (`TEXT`, nullable)
- `ad_campaign_id` (`TEXT`, required)
- `ad_campaign_type` (`TEXT`, nullable) — Advertising product type from Amazon Marketing Stream. Common values: SPONSORED_PRODUCTS / SPONSORED_BRANDS / AMAZON_DSP. Budget usage may use lowercase product codes such as sp / sb / sd.
- `ad_group_state` (`TEXT`, nullable) — Ad group state (for example ENABLED / PAUSED / ARCHIVED).
- `ad_group_bid_value` (`NUMBER`, nullable)
- `ad_group_bid_currency` (`TEXT`, nullable) — Currency code for the ad group bid.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
