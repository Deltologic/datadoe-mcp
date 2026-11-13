# Ads Profile Capabilities

- BigQuery table name: `amazon_ads_profile_capabilities`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Amazon Ads program eligibility and API access pauses per Ads connection and UTC check day. PROGRAM_ELIGIBILITY rows come from Amazon program eligibility; ACCESS_PAUSE rows are operations DataDoe paused after Amazon denied access. Use is_listed_in_last_fetch = TRUE for the current state. Checked about every 20 hours.

- Source type: `AMAZON_ADS`
- Source ID: `7d9b622db43e35c5cafcf36ae4212aa3e594f597e164dd93f7c10e65e344cbb3`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=7d9b622db43e35c5cafcf36ae4212aa3e594f597e164dd93f7c10e65e344cbb3

## Fetch periods

- `CONTINUOUS`

## Related actions

- `AMAZON_ADS_PROGRAM_ELIGIBILITY_FIND` — live: reads a fresher live value. When a FIND Action's entity is in the DataDoe data scheme, use an Export or a BigQuery query. Use FIND only when you need live Amazon data that the warehouse does not have yet. One standard Export costs 2 AI Tokens. One integrated BigQuery query costs 0.2 AI Tokens. Compare the total cost of repeated FIND Actions with one Export or query.

actions_details_schema_get reports whether each Action type is enabled for the Organization. An Organization owner enables a type in the DataDoe app under Settings > Actions.

## Columns (22)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `date` (`DATE`, required) — UTC day of the check.
- `capability_source` (`TEXT`, required) — PROGRAM_ELIGIBILITY / ACCESS_PAUSE.
- `ad_program` (`TEXT`, nullable) — Amazon Ads program code, such as SP, SB, SD, MAAS, SPOT or DTC. Null for access pauses.
- `ad_product` (`TEXT`, nullable) — SPONSORED_PRODUCTS / SPONSORED_BRANDS / SPONSORED_DISPLAY / AMAZON_ATTRIBUTION / STORES / DIRECT_TO_CONSUMER. Null for unknown programs and some pauses.
- `operation_family` (`TEXT`, required) — PROGRAM / REPORTS / BRAND_METRICS_REPORTS / ENTITY_HISTORY / RECOMMENDATIONS.
- `api_version` (`TEXT`, nullable) — API version of a paused operation, such as V2. Usually null.
- `capability_status` (`TEXT`, required) — VERIFIED_SUPPORTED / VERIFIED_DENIED / UNKNOWN.
- `reason_code` (`TEXT`, nullable) — Comma-separated reason codes, HTTP_<status> when the eligibility call failed, or ACCESS_PAUSED.
- `reason_message` (`TEXT`, nullable)
- `reason_level` (`TEXT`, nullable)
- `reasons` (`JSON`, nullable) — Same as JSON payload from Amazon Ads API.
- `verification_source` (`TEXT`, required) — API_RESPONSE / ACCESS_STATE.
- `is_listed_in_last_fetch` (`LOGIC`, required) — True for rows of the latest check. Capabilities that later checks stopped returning (eligibility regained, pause expired) keep their rows with false.
- `last_checked_at_utc` (`DATE`, required)
- `next_check_at_utc` (`DATE`, nullable) — For access pauses, when DataDoe retries the operation.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
