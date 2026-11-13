# Ad Targets (raw)

- BigQuery table name: `amazon_ads_targets_raw`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Snapshots of Amazon Ads targeting configuration (keywords, product targets, audiences). Rows are identified by target and ad product. Includes archived, enabled, and paused targets. Snapshots are refreshed every 48 hours. Live entity state can be obtained using Actions.

- Source type: `AMAZON_ADS`
- Source ID: `bd819066dbd89514f573530c0f1463fc6b37881a79b2fa010dcd1d9f5afdf213`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=bd819066dbd89514f573530c0f1463fc6b37881a79b2fa010dcd1d9f5afdf213

## Fetch periods

- `CONTINUOUS`

## Related actions

- `AMAZON_ADS_TARGETS_ADD` — writes: writes rows to this table
- `AMAZON_ADS_TARGETS_UPDATE` — writes: writes rows to this table
- `AMAZON_ADS_TARGETS_REMOVE` — writes: writes rows to this table
- `AMAZON_ADS_TARGETS_FIND` — live: reads a fresher live value. When a FIND Action's entity is in the DataDoe data scheme, use an Export or a BigQuery query. Use FIND only when you need live Amazon data that the warehouse does not have yet. One standard Export costs 2 AI Tokens. One integrated BigQuery query costs 0.2 AI Tokens. Compare the total cost of repeated FIND Actions with one Export or query.

actions_details_schema_get reports whether each Action type is enabled for the Organization. An Organization owner enables a type in the DataDoe app under Settings > Actions.

## Columns (40)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `ad_target_id` (`TEXT`, required)
- `ad_group_id` (`TEXT`, nullable)
- `ad_campaign_id` (`TEXT`, nullable)
- `ad_target_type` (`TEXT`, required)
- `ad_campaign_type` (`TEXT`, required) — SPONSORED_DISPLAY / SPONSORED_PRODUCTS / SPONSORED_BRANDS
- `ad_target_negative` (`LOGIC`, nullable) — TRUE when this target blocks traffic (negative keyword or negative product target).
- `ad_target_updated_at_utc` (`DATE`, required)
- `ad_target_created_at_utc` (`DATE`, required)
- `ad_target_state` (`TEXT`, required) — Entity state from Amazon Ads Universal Exports API. Enum values: ARCHIVED / ENABLED / PAUSED.
- `ad_target_delivery_status` (`TEXT`, required) — Whether Amazon is delivering the target. Not ad_target_state (ENABLED, PAUSED, ARCHIVED).
- `ad_target_delivery_reasons` (`TEXT`, nullable)
- `ad_target_bid` (`NUMBER`, nullable)
- `ad_target_currency_code` (`TEXT`, nullable)
- `ad_target_match_type` (`TEXT`, nullable)
- `ad_target_keyword` (`TEXT`, nullable)
- `ad_target_native_language_keyword` (`TEXT`, nullable)
- `ad_target_native_language_locale` (`TEXT`, nullable)
- `ad_target_product_category_id` (`TEXT`, nullable)
- `ad_target_product_category_resolved` (`TEXT`, nullable)
- `ad_target_product_brand` (`TEXT`, nullable)
- `ad_target_product_brand_resolved` (`TEXT`, nullable)
- `ad_target_product_genre` (`TEXT`, nullable)
- `ad_target_product_price_less_than` (`TEXT`, nullable)
- `ad_target_product_price_greater_than` (`TEXT`, nullable)
- `ad_target_product_rating_less_than` (`TEXT`, nullable)
- `ad_target_product_rating_greater_than` (`TEXT`, nullable)
- `ad_target_product_age_range` (`TEXT`, nullable)
- `ad_target_product_age_range_resolved` (`TEXT`, nullable)
- `ad_target_product_prime_shipping_eligible` (`TEXT`, nullable)
- `ad_target_asin` (`TEXT`, nullable)
- `ad_target_event` (`TEXT`, nullable)
- `ad_target_lookback` (`NUMBER`, nullable) — Audience lookback in days, such as views or purchases in the last N days. Not an ads attribution window.
- `ad_target_audience_id` (`TEXT`, nullable)

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
