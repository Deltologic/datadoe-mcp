# Ad Settings History

- BigQuery table name: `amazon_ads_ads_history`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Entity settings from complete published Universal Ads exports, including unchanged later observations. Each snapshot_id is one family/profile export, not a simultaneous account snapshot. Actual observation dates and gaps are authoritative. Portfolio names are null in campaign history; seller and account labels are current context. Absence from a later file does not imply deletion. Changes are known only between observations.  History follows existing collection, normally every 48 hours, with large targets on the weekly schedule. Source caps and failed or incomplete exports leave gaps. No complete daily coverage is guaranteed. Inspect checked_at and snapshot manifests for actual observations. Actions provide live entity state.

- Source type: `AMAZON_ADS`
- Source ID: `4523e9fe3739126b684fa292272fe8ee155428adf925980aeeb70545e4212676`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=4523e9fe3739126b684fa292272fe8ee155428adf925980aeeb70545e4212676

## Fetch periods

- `CONTINUOUS`

## Columns (43)

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
