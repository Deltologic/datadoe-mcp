# Ads (raw)

- BigQuery table name: `amazon_ads_ads_raw`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Snapshots of Amazon Ads ad configuration and creative settings. Rows are identified by ad, ad product, and ad type. Includes archived, enabled, and paused ads. Snapshots are refreshed every 48 hours. Live entity state can be obtained using Actions.

- Source type: `AMAZON_ADS`
- Source ID: `d78c8d084a149700169a6acec6fc7c76c06849a4ee60e376eeb4b77e12c81595`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=d78c8d084a149700169a6acec6fc7c76c06849a4ee60e376eeb4b77e12c81595

## Fetch periods

- `CONTINUOUS`

## Related actions

- `AMAZON_ADS_ADS_ADD` — writes: writes rows to this table
- `AMAZON_ADS_ADS_UPDATE` — writes: writes rows to this table
- `AMAZON_ADS_ADS_REMOVE` — writes: writes rows to this table
- `AMAZON_ADS_ADS_FIND` — live: reads a fresher live value. When a FIND Action's entity is in the DataDoe data scheme, use an Export or a BigQuery query. Use FIND only when you need live Amazon data that the warehouse does not have yet. One standard Export costs 2 AI Tokens. One integrated BigQuery query costs 0.2 AI Tokens. Compare the total cost of repeated FIND Actions with one Export or query.

actions_details_schema_get reports whether each Action type is enabled for the Organization. An Organization owner enables a type in the DataDoe app under Settings > Actions.

## Columns (33)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `ad_id` (`TEXT`, required)
- `ad_name` (`TEXT`, nullable)
- `ad_group_id` (`TEXT`, required)
- `ad_campaign_id` (`TEXT`, required)
- `ad_type` (`TEXT`, required)
- `ad_campaign_type` (`TEXT`, required) — SPONSORED_DISPLAY / SPONSORED_PRODUCTS / SPONSORED_BRANDS
- `ad_version_id` (`TEXT`, nullable)
- `ad_updated_at_utc` (`DATE`, required)
- `ad_created_at_utc` (`DATE`, required)
- `ad_state` (`TEXT`, required) — Entity state from Amazon Ads Universal Exports API. Enum values: ARCHIVED / ENABLED / PAUSED.
- `ad_delivery_status` (`TEXT`, required) — Whether Amazon is delivering the ad. Not ad_state (ENABLED, PAUSED, ARCHIVED).
- `ad_delivery_reasons` (`JSON`, nullable) — Same as JSON payload from Amazon Ads API.
- `ad_creative_headline` (`TEXT`, nullable)
- `ad_creative_brand_name` (`TEXT`, nullable)
- `ad_creative_landing_page_type` (`TEXT`, nullable)
- `ad_creative_landing_page_url` (`TEXT`, nullable)
- `ad_creative_brand_logo_asset_id` (`TEXT`, nullable)
- `ad_creative_brand_logo_asset_version` (`TEXT`, nullable)
- `ad_creative_brand_logo_top` (`NUMBER`, nullable)
- `ad_creative_brand_logo_left` (`NUMBER`, nullable)
- `ad_creative_brand_logo_width` (`NUMBER`, nullable)
- `ad_creative_brand_logo_height` (`NUMBER`, nullable)
- `ad_creative_products` (`JSON`, nullable) — Same as JSON payload from Amazon Ads API.
- `ad_creative_custom_images` (`JSON`, nullable) — Same as JSON payload from Amazon Ads API.
- `ad_creative_videos` (`JSON`, nullable) — Same as JSON payload from Amazon Ads API.
- `ad_creative_cards` (`JSON`, nullable) — Same as JSON payload from Amazon Ads API.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
