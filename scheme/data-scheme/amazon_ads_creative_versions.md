# Ad Creative Versions

- BigQuery table name: `amazon_ads_creative_versions`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Sponsored Brands ad creative versions with moderation results. One row per ad and creative version; is_latest_creative_version = TRUE is the current creative.

- Source type: `AMAZON_ADS`
- Source ID: `2f11a8603224c8424c7167ac1ac1e58ad9e85aa397a5031ddbbaaacc5eae761f`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=2f11a8603224c8424c7167ac1ac1e58ad9e85aa397a5031ddbbaaacc5eae761f

## Fetch periods

- `CONTINUOUS`

## Related actions

- `AMAZON_ADS_ADS_UPDATE` — writes: writes rows to this table
- `AMAZON_ADS_ADS_FIND` — live: reads a fresher live value. When a FIND Action's entity is in the DataDoe data scheme, use an Export or a BigQuery query. Use FIND only when you need live Amazon data that the warehouse does not have yet. One standard Export costs 2 AI Tokens. One integrated BigQuery query costs 0.2 AI Tokens. Compare the total cost of repeated FIND Actions with one Export or query.

actions_details_schema_get reports whether each Action type is enabled for the Organization. An Organization owner enables a type in the DataDoe app under Settings > Actions.

## Columns (34)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `ad_id` (`TEXT`, required)
- `ad_name` (`TEXT`, nullable)
- `ad_group_id` (`TEXT`, nullable)
- `ad_campaign_id` (`TEXT`, nullable)
- `ad_campaign_type` (`TEXT`, nullable) — SPONSORED_BRANDS.
- `creative_version` (`TEXT`, required) — Numeric version string.
- `is_latest_creative_version` (`LOGIC`, required)
- `creative_type` (`TEXT`, nullable) — PRODUCT_COLLECTION / STORE_SPOTLIGHT / VIDEO / BRAND_VIDEO.
- `creative_status` (`TEXT`, nullable) — SUBMITTED_FOR_MODERATION / PENDING_TRANSLATION / PENDING_MODERATION_REVIEW / APPROVED_BY_MODERATION / REJECTED_BY_MODERATION / PUBLISHED.
- `creative_created_at_utc` (`DATE`, nullable)
- `creative_updated_at_utc` (`DATE`, nullable)
- `creative_headline` (`TEXT`, nullable)
- `creative_original_headline` (`TEXT`, nullable) — Headline before translation.
- `creative_headlines` (`JSON`, nullable) — Same as JSON payload from Amazon Ads API.
- `creative_brand_name` (`TEXT`, nullable)
- `creative_asins` (`JSON`, nullable) — Same as JSON payload from Amazon Ads API.
- `creative_landing_page_type` (`TEXT`, nullable) — PRODUCT_LIST / STORE / CUSTOM_URL / DETAIL_PAGE.
- `creative_landing_page_value` (`TEXT`, nullable)
- `creative_landing_page_asins` (`JSON`, nullable) — Same as JSON payload from Amazon Ads API.
- `creative_consent_to_translate` (`LOGIC`, nullable)
- `creative_collection_type` (`TEXT`, nullable)
- `creative_properties` (`JSON`, nullable) — Same as JSON payload from Amazon Ads API.
- `moderation_ad_program_type` (`TEXT`, nullable) — SB_PRODUCT_COLLECTION / SB_VIDEO / SB_STORE_SPOTLIGHT.
- `moderation_status` (`TEXT`, nullable) — APPROVED / IN_PROGRESS / REJECTED / FAILED.
- `moderation_policy_violations` (`JSON`, nullable) — Same as JSON payload from Amazon Ads API.
- `moderation_eta` (`TEXT`, nullable) — Moderation ETA as returned by Amazon.
- `observed_at_utc` (`DATE`, required) — Time DataDoe last fetched this row from Amazon Ads.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
