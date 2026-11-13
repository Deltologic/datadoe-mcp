# Ads Brand Store Pages

- BigQuery table name: `amazon_ads_store_pages`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Current pages of Amazon Brand Stores. One row per store and page. A page that disappears stays here, with its last known name and URL. Refreshed daily.

- Source type: `AMAZON_ADS`
- Source ID: `8c44ddef424bbbb1ac0c08d43af324cb2b42643bb9397f9d3169dc630aabc3ef`
- Requires a date period: no
- Contains PII: no
- Premium table: yes
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=8c44ddef424bbbb1ac0c08d43af324cb2b42643bb9397f9d3169dc630aabc3ef

## Fetch periods

- `CONTINUOUS`

## Columns (15)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `brand_entity_id` (`TEXT`, required) — Amazon brand entity id used to request Store Insights.
- `brand_store_id` (`TEXT`, required) — Amazon Brand Store id. The DataDoe store id is store_id.
- `brand_store_name` (`TEXT`, nullable) — Amazon Brand Store name from the latest store list. Empty when Amazon no longer lists the store.
- `page_id` (`TEXT`, required) — Amazon Brand Store page id.
- `page_name` (`TEXT`, nullable) — Page name. Empty when Amazon does not provide one.
- `page_status` (`TEXT`, nullable) — Page status returned by Amazon. Empty when Amazon does not provide one.
- `page_url` (`TEXT`, nullable) — Page URL. Empty when Amazon does not provide one.
- `synced_at` (`DATE`, required) — When this fetch finished.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
