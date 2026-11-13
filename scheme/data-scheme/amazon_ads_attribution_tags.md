# Ads Attribution Tags

- BigQuery table name: `amazon_ads_attribution_tags`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Amazon Attribution tags (URL parameter templates) per Attribution advertiser and publisher. Use them to tag off-Amazon links; results are in the amazon_ads_attribution_* tables.

- Source type: `AMAZON_ADS`
- Source ID: `f61edae11640cffe6b35c6c7d88ccc46476cc9980daa3aee5a4e698794a041a7`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=f61edae11640cffe6b35c6c7d88ccc46476cc9980daa3aee5a4e698794a041a7

## Fetch periods

- `CONTINUOUS`

## Related actions

- `AMAZON_ADS_ATTRIBUTION_PUBLISHERS_FIND` — live: reads a fresher live value. When a FIND Action's entity is in the DataDoe data scheme, use an Export or a BigQuery query. Use FIND only when you need live Amazon data that the warehouse does not have yet. One standard Export costs 2 AI Tokens. One integrated BigQuery query costs 0.2 AI Tokens. Compare the total cost of repeated FIND Actions with one Export or query.
- `AMAZON_ADS_ATTRIBUTION_ADVERTISERS_FIND` — live: reads a fresher live value. When a FIND Action's entity is in the DataDoe data scheme, use an Export or a BigQuery query. Use FIND only when you need live Amazon data that the warehouse does not have yet. One standard Export costs 2 AI Tokens. One integrated BigQuery query costs 0.2 AI Tokens. Compare the total cost of repeated FIND Actions with one Export or query.
- `AMAZON_ADS_ATTRIBUTION_MACRO_TAGS_FIND` — writes: writes rows to this table. When a FIND Action's entity is in the DataDoe data scheme, use an Export or a BigQuery query. Use FIND only when you need live Amazon data that the warehouse does not have yet. One standard Export costs 2 AI Tokens. One integrated BigQuery query costs 0.2 AI Tokens. Compare the total cost of repeated FIND Actions with one Export or query.
- `AMAZON_ADS_ATTRIBUTION_NON_MACRO_TAG_TEMPLATES_FIND` — writes: writes rows to this table. When a FIND Action's entity is in the DataDoe data scheme, use an Export or a BigQuery query. Use FIND only when you need live Amazon data that the warehouse does not have yet. One standard Export costs 2 AI Tokens. One integrated BigQuery query costs 0.2 AI Tokens. Compare the total cost of repeated FIND Actions with one Export or query.
- `AMAZON_ADS_ATTRIBUTION_TAGS_GENERATE` — writes: writes rows to this table

actions_details_schema_get reports whether each Action type is enabled for the Organization. An Organization owner enables a type in the DataDoe app under Settings > Actions.

## Columns (15)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `attribution_advertiser_id` (`TEXT`, required)
- `attribution_advertiser_name` (`TEXT`, nullable)
- `publisher_id` (`TEXT`, required)
- `publisher_name` (`TEXT`, nullable)
- `tag_type` (`TEXT`, required) — MACRO / NON_MACRO_TEMPLATE.
- `tag_template` (`TEXT`, required) — Attribution tag template to append to the off-Amazon link.
- `is_listed_in_last_fetch` (`LOGIC`, required) — False when the last fetch no longer returned this row. The row keeps its last fetched values.
- `observed_at_utc` (`DATE`, required) — Time DataDoe last fetched this row from Amazon Ads.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
