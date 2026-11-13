# Ad Group Settings History

- BigQuery table name: `amazon_ads_ad_groups_history`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Entity settings from complete published Universal Ads exports, including unchanged later observations. Each snapshot_id is one family/profile export, not a simultaneous account snapshot. Actual observation dates and gaps are authoritative. Portfolio names are null in campaign history; seller and account labels are current context. Absence from a later file does not imply deletion. Changes are known only between observations.  History follows existing collection, normally every 48 hours, with large targets on the weekly schedule. Source caps and failed or incomplete exports leave gaps. No complete daily coverage is guaranteed. Inspect checked_at and snapshot manifests for actual observations. Actions provide live entity state.

- Source type: `AMAZON_ADS`
- Source ID: `ba08d5b48579a76160566107027a761c22ab5fe19544b64c00fe20aac2ddc983`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=ba08d5b48579a76160566107027a761c22ab5fe19544b64c00fe20aac2ddc983

## Fetch periods

- `CONTINUOUS`

## Columns (31)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `ad_group_id` (`TEXT`, required)
- `ad_group_name` (`TEXT`, nullable)
- `ad_campaign_id` (`TEXT`, required)
- `ad_group_type` (`TEXT`, required) — SPONSORED_DISPLAY / SPONSORED_PRODUCTS / SPONSORED_BRANDS
- `ad_group_creative_type` (`TEXT`, nullable)
- `ad_group_updated_at_utc` (`DATE`, required)
- `ad_group_created_at_utc` (`DATE`, required)
- `ad_group_state` (`TEXT`, required) — Entity state from Amazon Ads Universal Exports API. Enum values: ARCHIVED / ENABLED / PAUSED.
- `ad_group_delivery_status` (`TEXT`, required) — Whether Amazon is delivering the ad group. Not ad_group_state (ENABLED, PAUSED, ARCHIVED).
- `ad_group_delivery_reasons` (`JSON`, nullable) — Same as JSON payload from Amazon Ads API.
- `ad_group_default_bid` (`NUMBER`, nullable)
- `ad_group_bid_currency_code` (`TEXT`, nullable)
- `ad_group_optimization_goal` (`TEXT`, nullable)
- `ad_group_optimization_kpi` (`TEXT`, nullable)
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
