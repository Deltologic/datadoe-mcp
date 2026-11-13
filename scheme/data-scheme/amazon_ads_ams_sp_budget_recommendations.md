# AMS SP Budget Recommendations

- BigQuery table name: `amazon_ads_ams_sp_budget_recommendations`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Amazon Marketing Stream Sponsored Products budget recommendations. Missed sales, clicks, and impressions are Amazon estimates of what the campaign might have gained if it had not run out of budget, as a lower and upper bound, not a guarantee.

- Source type: `AMAZON_ADS`
- Source ID: `4ab9033728531a195adb23ff56f7f75da811433beaa94a7d045d8c505394cf52`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=4ab9033728531a195adb23ff56f7f75da811433beaa94a7d045d8c505394cf52

## Fetch periods

- `CONTINUOUS`

## Columns (24)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `amazon_ads_advertiser_id` (`TEXT`, nullable) — Amazon Ads advertiser identifier from Amazon Marketing Stream.
- `received_at` (`DATE`, required) — Timestamp when the Amazon Marketing Stream event was received by DataDoe.
- `ad_campaign_id` (`TEXT`, required)
- `recommendation_at` (`DATE`, nullable)
- `suggested_budget_value` (`NUMBER`, nullable)
- `suggested_budget_currency` (`TEXT`, nullable) — Currency code for the suggested budget.
- `recommendation_reason` (`TEXT`, nullable)
- `estimated_missed_sales_lower` (`NUMBER`, nullable)
- `estimated_missed_sales_upper` (`NUMBER`, nullable)
- `estimated_missed_sales_currency` (`TEXT`, nullable) — Currency code for estimated missed sales.
- `estimated_missed_clicks_lower` (`NUMBER`, nullable)
- `estimated_missed_clicks_upper` (`NUMBER`, nullable)
- `estimated_missed_impressions_lower` (`NUMBER`, nullable)
- `estimated_missed_impressions_upper` (`NUMBER`, nullable)
- `recommendation_starts_on` (`DATE`, nullable)
- `recommendation_ends_on` (`DATE`, nullable)
- `percent_time_in_budget` (`NUMBER`, nullable) — Share of the recommendation window the campaign was in budget. A percentage, not hours.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
