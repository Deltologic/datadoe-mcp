# Ad Budget Rule Campaigns

- BigQuery table name: `amazon_ads_budget_rule_campaigns`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Campaigns attached to budget rules from the latest fetch. One row per ad product, rule and campaign for Sponsored Products, Sponsored Brands and Sponsored Display. Rule definitions are in amazon_ads_budget_rules. DataDoe refreshes this table every 3 hours.

- Source type: `AMAZON_ADS`
- Source ID: `1f6073ce44c732a7674a445d9890ae07f032c1484149181f527488b8fef25543`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=1f6073ce44c732a7674a445d9890ae07f032c1484149181f527488b8fef25543

## Fetch periods

- `CONTINUOUS`

## Related actions

- `AMAZON_ADS_SP_BUDGET_RULES_ASSOCIATE` — writes: writes rows to this table
- `AMAZON_ADS_SB_BUDGET_RULES_ASSOCIATE` — writes: writes rows to this table
- `AMAZON_ADS_SD_BUDGET_RULES_ASSOCIATE` — writes: writes rows to this table

actions_details_schema_get reports whether each Action type is enabled for the Organization. An Organization owner enables a type in the DataDoe app under Settings > Actions.

## Columns (12)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `ad_product` (`TEXT`, required) — SPONSORED_PRODUCTS / SPONSORED_BRANDS / SPONSORED_DISPLAY.
- `budget_rule_id` (`TEXT`, required)
- `ad_campaign_id` (`TEXT`, required)
- `ad_campaign_name` (`TEXT`, nullable)
- `budget_rule_campaign_status` (`TEXT`, nullable) — Amazon status of this rule on this campaign at the last fetch. ACTIVE means Amazon is applying the rule. PAUSED means the rule is paused. ON_HOLD means Amazon is not applying the rule at that time, including when an intraday rule is outside its time window. EXPIRED means the rule dates have ended. A query does not recompute this status.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
