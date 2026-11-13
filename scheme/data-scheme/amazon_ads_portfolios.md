# Ad Portfolios

- BigQuery table name: `amazon_ads_portfolios`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Amazon Ads portfolios with budget caps, serving status and budget usage. One row per portfolio. Portfolios Amazon stopped returning keep their last row with is_listed_in_last_fetch = FALSE. Refreshed daily.

- Source type: `AMAZON_ADS`
- Source ID: `8bf36701444f6d3172457c7191c8a191b3a09bc0f5dbdb8a329ee1a8ae9054f1`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=8bf36701444f6d3172457c7191c8a191b3a09bc0f5dbdb8a329ee1a8ae9054f1

## Fetch periods

- `CONTINUOUS`

## Related actions

- `AMAZON_ADS_PORTFOLIOS_ADD` — writes: writes rows to this table
- `AMAZON_ADS_PORTFOLIOS_UPDATE` — writes: writes rows to this table
- `AMAZON_ADS_PORTFOLIOS_FIND` — live: reads a fresher live value. When a FIND Action's entity is in the DataDoe data scheme, use an Export or a BigQuery query. Use FIND only when you need live Amazon data that the warehouse does not have yet. One standard Export costs 2 AI Tokens. One integrated BigQuery query costs 0.2 AI Tokens. Compare the total cost of repeated FIND Actions with one Export or query.

actions_details_schema_get reports whether each Action type is enabled for the Organization. An Organization owner enables a type in the DataDoe app under Settings > Actions.

## Columns (25)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `portfolio_id` (`TEXT`, required)
- `portfolio_name` (`TEXT`, nullable)
- `portfolio_state` (`TEXT`, nullable)
- `is_listed_in_last_fetch` (`LOGIC`, nullable) — False when the last fetch no longer returned this row. The row keeps its last fetched values.
- `budget_amount` (`NUMBER`, nullable) — Portfolio budget cap, in budget_currency.
- `budget_currency` (`TEXT`, nullable)
- `budget_policy` (`TEXT`, nullable) — DATE_RANGE / MONTHLY_RECURRING / NO_CAP / OTHER.
- `budget_start_date` (`TEXT`, nullable) — Budget start date as returned by Amazon.
- `budget_end_date` (`TEXT`, nullable) — Budget end date as returned by Amazon.
- `in_budget` (`LOGIC`, nullable) — Whether the portfolio is within its budget.
- `budget_controls` (`JSON`, nullable) — Same as JSON payload from Amazon Ads API.
- `serving_status` (`TEXT`, nullable) — Portfolio serving status, such as PORTFOLIO_STATUS_ENABLED, PORTFOLIO_OUT_OF_BUDGET, PORTFOLIO_ENDED or ADVERTISER_PAYMENT_FAILURE.
- `status_reasons` (`JSON`, nullable) — Same as JSON payload from Amazon Ads API.
- `portfolio_created_at_utc` (`DATE`, nullable)
- `portfolio_updated_at_utc` (`DATE`, nullable)
- `budget_usage_percent` (`NUMBER`, nullable) — Budget usage percentage reported by Amazon. A percentage, not money.
- `budget_usage_updated_at_utc` (`DATE`, nullable) — Time Amazon computed budget_usage_percent.
- `observed_at_utc` (`DATE`, nullable) — Time DataDoe last fetched this row from Amazon Ads.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
