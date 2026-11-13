# Ads Author Brands

- BigQuery table name: `amazon_ads_author_brands`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Sponsored Brands author brands (bookAuthor) of KDP author Ads accounts. Refreshed weekly.

- Source type: `AMAZON_ADS`
- Source ID: `bd8c2384f1d4a4dc5f032c5ec1c01d3b93d8d12db92c43089f7d6b2e963978ce`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=bd8c2384f1d4a4dc5f032c5ec1c01d3b93d8d12db92c43089f7d6b2e963978ce

## Fetch periods

- `CONTINUOUS`

## Related actions

- `AMAZON_ADS_BRANDS_FIND` — live: reads a fresher live value. When a FIND Action's entity is in the DataDoe data scheme, use an Export or a BigQuery query. Use FIND only when you need live Amazon data that the warehouse does not have yet. One standard Export costs 2 AI Tokens. One integrated BigQuery query costs 0.2 AI Tokens. Compare the total cost of repeated FIND Actions with one Export or query.

actions_details_schema_get reports whether each Action type is enabled for the Organization. An Organization owner enables a type in the DataDoe app under Settings > Actions.

## Columns (12)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `author_brand_id` (`TEXT`, required) — Sponsored Brands brand ID of the author.
- `author_brand_entity_id` (`TEXT`, nullable)
- `author_brand_name` (`TEXT`, nullable) — Author name of the brand.
- `is_listed_in_last_fetch` (`LOGIC`, required) — False when the last fetch no longer returned this row. The row keeps its last fetched values.
- `observed_at_utc` (`DATE`, required) — Time DataDoe last fetched this row from Amazon Ads.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
