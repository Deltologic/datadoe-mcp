# Ad Recommendation Snapshots

- BigQuery table name: `amazon_ads_recommendation_snapshots`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Daily snapshots of Amazon Ads budget, bid, keyword, product-target and budget-rule-event recommendations for Sponsored Products and Sponsored Brands. One row per request and UTC day; is_latest_snapshot = TRUE is the current answer of a request. Errors are stored as snapshots too.

- Source type: `AMAZON_ADS`
- Source ID: `b95e2fa1925efdea437f3dd29db33d4264e3361bdccc613e13c09c3914e2a185`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=b95e2fa1925efdea437f3dd29db33d4264e3361bdccc613e13c09c3914e2a185

## Fetch periods

- `CONTINUOUS`

## Related actions

- `AMAZON_ADS_SP_BID_RECOMMENDATIONS_FIND` — live: reads a fresher live value. When a FIND Action's entity is in the DataDoe data scheme, use an Export or a BigQuery query. Use FIND only when you need live Amazon data that the warehouse does not have yet. One standard Export costs 2 AI Tokens. One integrated BigQuery query costs 0.2 AI Tokens. Compare the total cost of repeated FIND Actions with one Export or query.
- `AMAZON_ADS_SP_TARGET_RECOMMENDATIONS_FIND` — live: reads a fresher live value. When a FIND Action's entity is in the DataDoe data scheme, use an Export or a BigQuery query. Use FIND only when you need live Amazon data that the warehouse does not have yet. One standard Export costs 2 AI Tokens. One integrated BigQuery query costs 0.2 AI Tokens. Compare the total cost of repeated FIND Actions with one Export or query.

actions_details_schema_get reports whether each Action type is enabled for the Organization. An Organization owner enables a type in the DataDoe app under Settings > Actions.

## Columns (24)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `date` (`DATE`, required) — UTC day of the snapshot.
- `recommendation_request_id` (`TEXT`, required) — request_fingerprint and date of the snapshot.
- `request_fingerprint` (`TEXT`, required) — Hash of the operation and request body. A changed request gets a new fingerprint.
- `operation` (`TEXT`, required) — SB_BUDGET_RECOMMENDATIONS / SP_BUDGET_RULE_EVENTS / SB_BUDGET_RULE_EVENTS / SP_BID_RECOMMENDATIONS / SP_KEYWORD_RECOMMENDATIONS / SB_BID_RECOMMENDATIONS / SP_PRODUCT_TARGET_RECOMMENDATIONS / SB_KEYWORD_RECOMMENDATIONS / SB_PRODUCT_TARGET_RECOMMENDATIONS.
- `ad_product` (`TEXT`, required) — SPONSORED_PRODUCTS / SPONSORED_BRANDS.
- `recommendation_type` (`TEXT`, required) — BUDGET / BUDGET_RULE_EVENT / BID / KEYWORD / PRODUCT_TARGET.
- `ad_campaign_id` (`TEXT`, nullable)
- `ad_group_id` (`TEXT`, nullable)
- `asin` (`TEXT`, nullable) — Set only when the request has exactly one ASIN.
- `request_parameters` (`JSON`, required) — Request body sent to Amazon Ads API.
- `recommendation_payload` (`JSON`, nullable) — Same as JSON payload from Amazon Ads API.
- `response_status` (`TEXT`, required) — SUCCESS / PARTIAL (some items failed) / ERROR.
- `http_status` (`NUMBER`, nullable)
- `failure_code` (`TEXT`, nullable) — Amazon error code or HTTP_<status>. Null on SUCCESS.
- `observed_at_utc` (`DATE`, required) — Time DataDoe called Amazon Ads API.
- `expires_at_utc` (`DATE`, nullable) — Recommendation expiry. Currently always null.
- `is_latest_snapshot` (`LOGIC`, required) — True for the newest day of each request_fingerprint.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
