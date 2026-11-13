# Ad Entity History

- BigQuery table name: `amazon_ads_entity_history`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Change history events for Sponsored Products and Sponsored Brands campaigns, ad groups, ads, and targets, such as state, bid, and budget changes. Amazon's change history API does not return Sponsored Display events.

- Source type: `AMAZON_ADS`
- Source ID: `26910458f6f12c38e9d2b3ac869902401d161a3892139879aa2f477219bdf0a3`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=26910458f6f12c38e9d2b3ac869902401d161a3892139879aa2f477219bdf0a3

## Fetch periods

- `INITIAL` (90 days)
- `RECURRING_DAILY` (1 days)

## Data availability

- `INTRADAY` — Intraday updates are available when source data changes during the day. Refresh: 1pm, 4pm.

## Columns (16)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `ad_entity_id` (`TEXT`, required)
- `ad_entity_type` (`TEXT`, required) — Type of entity changed. Common values: CAMPAIGN / AD_GROUP / AD / KEYWORD / PRODUCT_TARGETING / NEGATIVE_KEYWORD.
- `ad_change_type` (`TEXT`, required) — Type of change applied to the entity, as reported by Amazon Ads.
- `ad_change_at_utc` (`DATE`, required) — Time the change occurred, as reported by Amazon Ads.
- `ad_campaign_id` (`TEXT`, nullable)
- `ad_group_id` (`TEXT`, nullable)
- `ad_new_value` (`TEXT`, nullable) — Entity value after the change. Same as JSON payload from Amazon Ads API.
- `ad_previous_value` (`TEXT`, nullable) — Entity value before the change. Same as JSON payload from Amazon Ads API.
- `ad_change_metadata` (`JSON`, nullable) — Same as JSON payload from Amazon Ads API.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
