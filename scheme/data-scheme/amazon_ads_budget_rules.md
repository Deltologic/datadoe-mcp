# Ad Budget Rules

- BigQuery table name: `amazon_ads_budget_rules`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Budget rules for Sponsored Products, Sponsored Brands and Sponsored Display, including rules created in the Amazon Ads console. One row per ad product and rule from the latest fetch. A schedule rule raises the budget on dates or during an Amazon event. A performance rule raises the budget when a metric crosses a threshold. DataDoe refreshes this table every 3 hours.

- Source type: `AMAZON_ADS`
- Source ID: `52ba79185ae807f4546f56a3ef0b8b836221403fe5e364f232792dc7daf879c9`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=52ba79185ae807f4546f56a3ef0b8b836221403fe5e364f232792dc7daf879c9

## Fetch periods

- `CONTINUOUS`

## Related actions

- `AMAZON_ADS_SP_BUDGET_RULES_ADD` — writes: writes rows to this table
- `AMAZON_ADS_SP_BUDGET_RULES_UPDATE` — writes: writes rows to this table
- `AMAZON_ADS_SP_BUDGET_RULES_REMOVE` — writes: writes rows to this table
- `AMAZON_ADS_SB_BUDGET_RULES_ADD` — writes: writes rows to this table
- `AMAZON_ADS_SB_BUDGET_RULES_UPDATE` — writes: writes rows to this table
- `AMAZON_ADS_SB_BUDGET_RULES_REMOVE` — writes: writes rows to this table
- `AMAZON_ADS_SD_BUDGET_RULES_ADD` — writes: writes rows to this table
- `AMAZON_ADS_SD_BUDGET_RULES_UPDATE` — writes: writes rows to this table
- `AMAZON_ADS_SD_BUDGET_RULES_REMOVE` — writes: writes rows to this table

actions_details_schema_get reports whether each Action type is enabled for the Organization. An Organization owner enables a type in the DataDoe app under Settings > Actions.

## Columns (27)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `ad_product` (`TEXT`, required) — SPONSORED_PRODUCTS / SPONSORED_BRANDS / SPONSORED_DISPLAY.
- `budget_rule_id` (`TEXT`, required)
- `budget_rule_name` (`TEXT`, nullable)
- `budget_rule_type` (`TEXT`, nullable) — SCHEDULE / PERFORMANCE.
- `budget_rule_state` (`TEXT`, nullable) — Rule state, such as ACTIVE or PAUSED.
- `budget_rule_status` (`TEXT`, nullable) — Rule status as returned by Amazon.
- `budget_rule_created_at_utc` (`DATE`, nullable)
- `budget_rule_updated_at_utc` (`DATE`, nullable)
- `budget_increase_type` (`TEXT`, nullable) — Budget increase type, such as PERCENT.
- `budget_increase_value` (`NUMBER`, nullable) — Budget increase in budget_increase_type units.
- `budget_rule_start_date` (`TEXT`, nullable) — Start day as Amazon YYYYMMDD string.
- `budget_rule_end_date` (`TEXT`, nullable) — End day as Amazon YYYYMMDD string.
- `budget_rule_event_id` (`TEXT`, nullable) — Event of an event-based schedule rule.
- `budget_rule_event_name` (`TEXT`, nullable)
- `budget_rule_metric_name` (`TEXT`, nullable) — Performance rule metric: ACOS / CTR / CVR / ROAS.
- `budget_rule_comparison_operator` (`TEXT`, nullable) — GREATER_THAN / LESS_THAN / EQUAL_TO / LESS_THAN_OR_EQUAL_TO / GREATER_THAN_OR_EQUAL_TO.
- `budget_rule_threshold` (`NUMBER`, nullable) — Performance rule metric threshold.
- `budget_rule_recurrence` (`JSON`, nullable) — Same as JSON payload from Amazon Ads API.
- `budget_rule_duration` (`JSON`, nullable) — Same as JSON payload from Amazon Ads API.
- `budget_rule_performance_measure_condition` (`JSON`, nullable) — Same as JSON payload from Amazon Ads API.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
