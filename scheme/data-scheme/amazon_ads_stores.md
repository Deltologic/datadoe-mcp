# Ads Brand Stores

- BigQuery table name: `amazon_ads_stores`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Current Amazon Brand Stores for an Ads connection. One row per store. A store Amazon stops listing stays here, with its last known name and status. Refreshed daily.

- Source type: `AMAZON_ADS`
- Source ID: `61399195cbdacdb2f33c74281188117dea775e338fae68699a632141673d07f4`
- Requires a date period: no
- Contains PII: no
- Premium table: yes
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=61399195cbdacdb2f33c74281188117dea775e338fae68699a632141673d07f4

## Fetch periods

- `CONTINUOUS`

## Columns (12)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `brand_entity_id` (`TEXT`, required) — Amazon brand entity id used to request Store Insights.
- `brand_store_id` (`TEXT`, required) — Amazon Brand Store id. The DataDoe store id is store_id.
- `brand_store_name` (`TEXT`, nullable) — Amazon Brand Store name.
- `brand_store_status` (`TEXT`, nullable) — Store status returned by Amazon. Empty when Amazon does not provide one.
- `synced_at` (`DATE`, required) — When this fetch finished.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
