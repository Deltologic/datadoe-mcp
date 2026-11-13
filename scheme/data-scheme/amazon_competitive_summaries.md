# Competitive Summaries

- BigQuery table name: `amazon_competitive_summaries`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

Current competitive summary snapshot for each Seller Central ASIN. last_seen_at is the time of the latest successful fetch. It is the observation time. It is not a promotion start time or end time.

- Source type: `SELLER_CENTRAL`
- Source ID: `b7d2aaa9206c5d5dd880f8102264da9cef72f6cdab4d3a7cdc7030d94e8e4e71`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=b7d2aaa9206c5d5dd880f8102264da9cef72f6cdab4d3a7cdc7030d94e8e4e71

## Fetch periods

- `CONTINUOUS`

## Related actions

- `AMAZON_LISTINGS_COMPETITIVE_SUMMARY_FIND` — live: reads a fresher live value. When a FIND Action's entity is in the DataDoe data scheme, use an Export or a BigQuery query. Use FIND only when you need live Amazon data that the warehouse does not have yet. One standard Export costs 2 AI Tokens. One integrated BigQuery query costs 0.2 AI Tokens. Compare the total cost of repeated FIND Actions with one Export or query.

actions_details_schema_get reports whether each Action type is enabled for the Organization. An Organization owner enables a type in the DataDoe app under Settings > Actions.

## Columns (12)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `asin` (`TEXT`, required)
- `featured_buying_options` (`JSON`, nullable) — Amazon featuredBuyingOptions array from the latest successful competitive summary, including nested promotions.
- `lowest_priced_offers` (`JSON`, nullable) — Amazon lowestPricedOffers array from the latest successful competitive summary, including nested promotions.
- `reference_prices` (`JSON`, nullable) — Amazon referencePrices array from the latest successful competitive summary.
- `similar_items` (`JSON`, nullable) — Amazon similarItems array from the latest successful competitive summary.
- `last_seen_at` (`DATE`, required) — Time of the latest successful fetch. This is the observation time. It is not a promotion start time or end time.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
