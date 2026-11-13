# Listing prices by audience

- BigQuery table name: `amazon_listings_audience_pricing`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

One row per connection, marketplace, SKU, and price audience. Audiences include ALL for every buyer, B2B for Amazon Business, and industry audiences such as B2B_EDUCATION when the seller is enrolled. unit_price is the single-unit price. quantity_discount_tiers lists quantity discounts from the listing attributes. Prices come from listing attributes when Amazon sends them, and from the offers summary when the attribute price is missing. This view does not change prices.

- Source type: `SELLER_CENTRAL`
- Source ID: `2dd9e60fba83da8ce54079c7df35d8d4da1aa50bea79e4cdc6274b3e149e379e`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=2dd9e60fba83da8ce54079c7df35d8d4da1aa50bea79e4cdc6274b3e149e379e

## Fetch periods

- `CONTINUOUS`

## Related actions

- `AMAZON_LISTINGS_PRICING_UPDATE` — writes: writes rows to this table
- `AMAZON_LISTINGS_PRICING_UPDATE_VERIFY` — live: reads a fresher live value

actions_details_schema_get reports whether each Action type is enabled for the Organization. An Organization owner enables a type in the DataDoe app under Settings > Actions.

## Search aliases

- b2b price
- audience price
- quantity discount
- ivp

## Columns (14)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `sku` (`TEXT`, required)
- `child_asin` (`TEXT`, nullable)
- `audience` (`TEXT`, required) — Buyer audience. ALL is every buyer. B2B is Amazon Business. Other values, such as B2B_EDUCATION, are industry audiences.
- `audience_display_name` (`TEXT`, nullable) — Audience name returned on the offers summary, when Amazon sends one.
- `currency` (`TEXT`, nullable) — Currency code for unit_price.
- `unit_price` (`NUMBER`, nullable) — Single-unit price for this audience. Taken from listing attributes when present, otherwise from the offers summary.
- `quantity_discount_tiers` (`JSON`, nullable) — Quantity discount tiers for this audience. Each item has discount_type, lower_bound, and value. Null when the listing attributes do not include a quantity discount plan. When discount_type is percent, value is the percentage points off the single-unit price. When discount_type is fixed, value is the unit price for that tier in the marketplace currency.
- `last_seen_at` (`DATE`, required)

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
