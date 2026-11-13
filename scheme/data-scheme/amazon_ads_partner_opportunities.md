# Partner Opportunities

- BigQuery table name: `amazon_ads_partner_opportunities`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Amazon Ads Partner Network rows for one Ads connection. One row per source row in the latest complete file for that opportunity. Rows without a matching advertiser in this connection are not included. can_apply is true only for current account-team recommendations with a Partner Network apply endpoint. Benefit columns and extra_fields stay as Amazon sent them. A saved Partner Network account ID is required before DataDoe collects this table. DataDoe refreshes it once a day.

- Source type: `AMAZON_ADS`
- Source ID: `45d9d2ea7fd38f830c1184ad93e1058e63622319ef1876a4bc56e3090074a5f1`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=45d9d2ea7fd38f830c1184ad93e1058e63622319ef1876a4bc56e3090074a5f1

## Fetch periods

- `CONTINUOUS`

## Related actions

- `AMAZON_ADS_PARTNER_OPPORTUNITIES_FIND` — live: reads a fresher live value. When a FIND Action's entity is in the DataDoe data scheme, use an Export or a BigQuery query. Use FIND only when you need live Amazon data that the warehouse does not have yet. One standard Export costs 2 AI Tokens. One integrated BigQuery query costs 0.2 AI Tokens. Compare the total cost of repeated FIND Actions with one Export or query.
- `AMAZON_ADS_PARTNER_RECOMMENDATIONS_APPLY` — writes: writes rows to this table
- `AMAZON_ADS_PARTNER_RECOMMENDATION_STATUS_FIND` — live: reads a fresher live value. When a FIND Action's entity is in the DataDoe data scheme, use an Export or a BigQuery query. Use FIND only when you need live Amazon data that the warehouse does not have yet. One standard Export costs 2 AI Tokens. One integrated BigQuery query costs 0.2 AI Tokens. Compare the total cost of repeated FIND Actions with one Export or query.

actions_details_schema_get reports whether each Action type is enabled for the Organization. An Organization owner enables a type in the DataDoe app under Settings > Actions.

## Columns (49)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `partner_opportunity_id` (`TEXT`, required) — Partner opportunity ID from the catalog. This is not a recommendation ID.
- `snapshot_id` (`TEXT`, required)
- `source_row_number` (`NUMBER`, required)
- `locale` (`TEXT`, nullable)
- `title` (`TEXT`, nullable)
- `description` (`TEXT`, nullable)
- `objective_type` (`TEXT`, nullable)
- `product` (`TEXT`, nullable)
- `audience` (`TEXT`, nullable)
- `call_to_action` (`TEXT`, nullable)
- `catalog_updated_at` (`TEXT`, nullable) — Catalog data timestamp from Amazon, kept as text.
- `first_published_at` (`DATE`, nullable) — First published time from the opportunity freshness context.
- `data_source_updated_at` (`DATE`, nullable) — Data source update time from the opportunity freshness context.
- `metadata_updated_at` (`DATE`, nullable) — Metadata update time from the opportunity freshness context.
- `profile_id` (`TEXT`, nullable)
- `advertiser_type` (`TEXT`, nullable)
- `encrypted_advertiser_id` (`TEXT`, nullable) — Advertiser ID from the recommendation file. This is not the Ads account ID.
- `entity_id` (`TEXT`, nullable)
- `entity_name` (`TEXT`, nullable)
- `source_marketplace` (`TEXT`, nullable)
- `recommendation_id` (`TEXT`, nullable)
- `recommendation_type` (`TEXT`, nullable)
- `recommendation_status` (`TEXT`, nullable)
- `apply_api_end_point` (`TEXT`, nullable)
- `explanation` (`JSON`, nullable)
- `campaign_id` (`TEXT`, nullable)
- `campaign_name` (`TEXT`, nullable)
- `ad_product` (`TEXT`, nullable) — Amazon ad product from adProduct or adProductType.
- `expiry_date` (`DATE`, nullable)
- `estimated_incremental_sales` (`TEXT`, nullable) — Benefit text from Amazon. DataDoe does not convert the unit.
- `estimated_incremental_clicks` (`TEXT`, nullable) — Benefit text from Amazon. DataDoe does not convert the unit.
- `current_settings` (`JSON`, nullable)
- `recommended_settings` (`JSON`, nullable) — Recommended settings from recommendedSettings or recommendedCampaignSettings.
- `metrics` (`JSON`, nullable)
- `attributes` (`JSON`, nullable)
- `extra_fields` (`JSON`, nullable) — Source fields that do not have their own column, kept as Amazon sent them.
- `raw_payload` (`JSON`, nullable)
- `can_apply` (`LOGIC`, required) — True when this row can be sent to the Partner Network apply Action. Checked again when the Action runs.
- `latest_application_status` (`TEXT`, nullable) — Latest DataDoe application status for this recommendation. Null when it has not been applied.
- `latest_amazon_status` (`TEXT`, nullable) — Latest status Amazon returned for this recommendation: PUBLISHED, IN_PROGRESS, SUCCESS, FAILED or REJECTED.
- `latest_application_checked_at` (`DATE`, nullable) — Time of the latest status read. A status read does not change the original submission time.
- `observed_at` (`DATE`, nullable)

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
