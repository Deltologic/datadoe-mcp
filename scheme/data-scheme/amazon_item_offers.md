# Item Offers

- BigQuery table name: `amazon_item_offers`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

Competitive offers (Buy Box, seller offers, listing/shipping/landed price) by ASIN and item condition.

- Source type: `SELLER_CENTRAL`
- Source ID: `6b7ef5513e5d6b0a846b8f1fad328fbc9b6f6b36c64ce1ae33ce4abad6171fe5`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=6b7ef5513e5d6b0a846b8f1fad328fbc9b6f6b36c64ce1ae33ce4abad6171fe5

## Fetch periods

- `CONTINUOUS`

## Columns (13)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `asin` (`TEXT`, required)
- `item_condition` (`TEXT`, required)
- `status` (`TEXT`, nullable)
- `sku` (`TEXT`, nullable)
- `summary` (`JSON`, nullable) — Amazon Summary object: TotalOfferCount, LowestPrices, BuyBoxPrices, etc. Same shape as SP-API.
- `offers` (`JSON`, nullable) — Amazon Offers array: per-seller offer, price, Buy Box/FBA flags, seller feedback, etc. Same shape as SP-API.
- `last_seen_at` (`DATE`, required)

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
