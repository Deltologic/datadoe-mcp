# Ad Creative Assets

- BigQuery table name: `amazon_ads_creative_assets`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Amazon Ads Creative Asset Library assets and versions. Rows are identified by seller or vendor, connection, DSP advertiser, creative asset ID, and version. The same asset version can appear once per DSP advertiser that sees it, and once with an empty DSP advertiser ID for the Ads profile.

- Source type: `AMAZON_ADS`
- Source ID: `f5554500cded667a82762e9c8605fd548460a33f4474020f9d2959cbb8937138`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=f5554500cded667a82762e9c8605fd548460a33f4474020f9d2959cbb8937138

## Fetch periods

- `CONTINUOUS`

## Related actions

- `AMAZON_ADS_ASSETS_ADD` — writes: writes rows to this table
- `AMAZON_ADS_ASSETS_FIND` — live: reads a fresher live value. When a FIND Action's entity is in the DataDoe data scheme, use an Export or a BigQuery query. Use FIND only when you need live Amazon data that the warehouse does not have yet. One standard Export costs 2 AI Tokens. One integrated BigQuery query costs 0.2 AI Tokens. Compare the total cost of repeated FIND Actions with one Export or query.

actions_details_schema_get reports whether each Action type is enabled for the Organization. An Organization owner enables a type in the DataDoe app under Settings > Actions.

## Columns (40)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `dsp_advertiser_id` (`TEXT`, nullable) — Amazon DSP advertiser identifier. Empty for profile-scoped creative asset rows.
- `creative_asset_id` (`TEXT`, required)
- `creative_asset_version` (`TEXT`, required)
- `creative_asset_type` (`TEXT`, nullable) — Asset type from Amazon Ads Creative Asset Library.
- `creative_asset_status` (`TEXT`, nullable)
- `creative_asset_name` (`TEXT`, nullable)
- `creative_asset_created_by` (`TEXT`, nullable)
- `creative_asset_updated_by` (`TEXT`, nullable)
- `creative_asset_created_at_utc` (`DATE`, nullable)
- `creative_asset_updated_at_utc` (`DATE`, nullable)
- `creative_asset_version_notes` (`TEXT`, nullable)
- `creative_asset_default_url` (`TEXT`, nullable)
- `creative_asset_file_extension` (`TEXT`, nullable)
- `creative_asset_file_size` (`NUMBER`, nullable)
- `creative_asset_file_width` (`NUMBER`, nullable)
- `creative_asset_file_height` (`NUMBER`, nullable)
- `creative_asset_file_duration` (`NUMBER`, nullable)
- `creative_asset_file_aspect_ratio` (`TEXT`, nullable)
- `creative_asset_file_content_type` (`TEXT`, nullable)
- `creative_asset_sub_types` (`JSON`, nullable) — Same as JSON payload from Amazon Ads API.
- `creative_asset_tags` (`JSON`, nullable) — Same as JSON payload from Amazon Ads API.
- `creative_asset_account_ids` (`JSON`, nullable) — Same as JSON payload from Amazon Ads API.
- `creative_asset_marketplaces` (`JSON`, nullable) — Same as JSON payload from Amazon Ads API.
- `creative_asset_collections` (`JSON`, nullable) — Same as JSON payload from Amazon Ads API.
- `creative_asset_spec_check_approved_programs` (`JSON`, nullable) — Same as JSON payload from Amazon Ads API.
- `creative_asset_file_metadata` (`JSON`, nullable) — Same as JSON payload from Amazon Ads API.
- `creative_asset_storage_location_urls` (`JSON`, nullable) — Same as JSON payload from Amazon Ads API.
- `creative_asset_processed_files` (`JSON`, nullable) — Same as JSON payload from Amazon Ads API.
- `creative_asset_moderation_policy_map` (`JSON`, nullable) — Same as JSON payload from Amazon Ads API.
- `creative_asset_moderation_content_list` (`JSON`, nullable) — Same as JSON payload from Amazon Ads API.
- `creative_asset_associated_contexts` (`JSON`, nullable) — Same as JSON payload from Amazon Ads API.
- `creative_asset_failed_spec_checks` (`JSON`, nullable) — Same as JSON payload from Amazon Ads API.
- `creative_asset_other_metadata` (`JSON`, nullable) — Same as JSON payload from Amazon Ads API.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
