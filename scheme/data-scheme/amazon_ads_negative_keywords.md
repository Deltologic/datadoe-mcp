# Negative Keywords

- BigQuery table name: `amazon_ads_negative_keywords`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Negative keywords that block traffic. Weekly snapshots. These rows have no spend or sales.

- Source type: `AMAZON_ADS`
- Source ID: `36596ff85ecdded5d4b949bf7c0bbd9bc88398dc4a5ec8c3db88ab010fbe6f3c`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=36596ff85ecdded5d4b949bf7c0bbd9bc88398dc4a5ec8c3db88ab010fbe6f3c

## Fetch periods

- `CONTINUOUS`

## Related actions

- `AMAZON_ADS_TARGETS_ADD` — writes: writes rows to this table
- `AMAZON_ADS_TARGETS_UPDATE` — writes: writes rows to this table
- `AMAZON_ADS_TARGETS_REMOVE` — writes: writes rows to this table
- `AMAZON_ADS_TARGETS_FIND` — live: reads a fresher live value. When a FIND Action's entity is in the DataDoe data scheme, use an Export or a BigQuery query. Use FIND only when you need live Amazon data that the warehouse does not have yet. One standard Export costs 2 AI Tokens. One integrated BigQuery query costs 0.2 AI Tokens. Compare the total cost of repeated FIND Actions with one Export or query.

actions_details_schema_get reports whether each Action type is enabled for the Organization. An Organization owner enables a type in the DataDoe app under Settings > Actions.

## Search aliases

- negative keyword

## Columns (15)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `date` (`DATE`, required) — Snapshot date. Always the Monday of the week.
- `ad_campaign_id` (`TEXT`, required)
- `ad_campaign_type` (`TEXT`, required)
- `ad_group_id` (`TEXT`, nullable) — Null for SPONSORED_PRODUCTS campaigns before 2026-07-01.
- `ad_keyword_id` (`TEXT`, required)
- `ad_keyword_text` (`TEXT`, required) — Negative keyword text. This keyword is excluded from targeting.
- `ad_match_type` (`TEXT`, required) — Negative match type, such as NEGATIVE_EXACT or NEGATIVE_PHRASE. Not a positive BROAD, PHRASE, or EXACT target.
- `ad_keyword_state` (`TEXT`, required) — ENABLED, PAUSED, or ARCHIVED.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
