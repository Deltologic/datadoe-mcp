# AMS Budget Usage

- BigQuery table name: `amazon_ads_ams_budget_usage`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Amazon Marketing Stream budget consumption events from dataset budget-usage.

- Source type: `AMAZON_ADS`
- Source ID: `79f84d1bbf3813d11d69cc42d2719cdff0b6a1c3854682568e900e8dddbdd101`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=79f84d1bbf3813d11d69cc42d2719cdff0b6a1c3854682568e900e8dddbdd101

## Fetch periods

- `CONTINUOUS`

## Columns (18)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `amazon_ads_advertiser_id` (`TEXT`, nullable) — Amazon Ads advertiser identifier from Amazon Marketing Stream.
- `received_at` (`DATE`, required) — Timestamp when the Amazon Marketing Stream event was received by DataDoe.
- `budget_scope_id` (`TEXT`, required) — Campaign or portfolio identifier the budget usage applies to.
- `budget_scope_type` (`TEXT`, nullable) — Budget scope type. Enum values: CAMPAIGN / PORTFOLIO.
- `budget_value` (`NUMBER`, nullable)
- `budget_currency` (`TEXT`, nullable) — Currency code derived from the marketplace.
- `budget_usage_percentage` (`NUMBER`, nullable) — Budget usage percentage (spend divided by budget).
- `budget_usage_updated_at` (`DATE`, nullable) — Last evaluation time for budget usage.
- `ad_campaign_type` (`TEXT`, nullable) — Advertising product type from Amazon Marketing Stream. Common values: SPONSORED_PRODUCTS / SPONSORED_BRANDS / AMAZON_DSP. Budget usage may use lowercase product codes such as sp / sb / sd.
- `ad_portfolio_id` (`TEXT`, nullable) — Portfolio of the budget: budget_scope_id for PORTFOLIO scope, or the portfolio of the campaign from amazon_ads_ams_campaigns for CAMPAIGN scope. Null when unknown.
- `budget_rule_ids` (`JSON`, nullable) — Sorted JSON array of budget rule IDs attached to the campaign, from amazon_ads_budget_rule_campaigns for Sponsored Products, Sponsored Brands and Sponsored Display. Null, never an empty array, for PORTFOLIO scope or when no rule is attached.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
