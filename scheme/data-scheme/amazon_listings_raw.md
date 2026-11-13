# Listings (Raw JSON)

- BigQuery table name: `amazon_listings_raw`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

Raw listings payload per SKU and marketplace. Recommended for advanced use cases. For most use cases, use the "amazon_listings_with_cogs" table instead. For AI agents: each row from this table has a lot of data, consider downloading it to file and not directly to the context. item_name, product_description, and bullet points use the listing when Amazon returns them, then the catalog.

- Source type: `SELLER_CENTRAL`
- Source ID: `6ea445cdc459f9fbb9517c5c009384da60ef31a1e70d4de9187ea3d4c28535c4`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=6ea445cdc459f9fbb9517c5c009384da60ef31a1e70d4de9187ea3d4c28535c4

## Fetch periods

- `CONTINUOUS`

## Related actions

- `AMAZON_LISTINGS_CREATE` — writes: writes rows to this table
- `AMAZON_LISTINGS_DELETE` — writes: writes rows to this table
- `AMAZON_LISTINGS_UPDATE` — writes: writes rows to this table
- `AMAZON_LISTINGS_PRICING_UPDATE` — writes: writes rows to this table
- `AMAZON_LISTINGS_DETAILS_UPDATE` — writes: writes rows to this table
- `AMAZON_LISTINGS_CREATE_VERIFY` — live: reads a fresher live value
- `AMAZON_LISTINGS_UPDATE_VERIFY` — live: reads a fresher live value
- `AMAZON_LISTINGS_PRICING_UPDATE_VERIFY` — live: reads a fresher live value
- `AMAZON_LISTINGS_DETAILS_UPDATE_VERIFY` — live: reads a fresher live value
- `AMAZON_LISTINGS_FIND` — live: reads a fresher live value. When a FIND Action's entity is in the DataDoe data scheme, use an Export or a BigQuery query. Use FIND only when you need live Amazon data that the warehouse does not have yet. One standard Export costs 2 AI Tokens. One integrated BigQuery query costs 0.2 AI Tokens. Compare the total cost of repeated FIND Actions with one Export or query.

actions_details_schema_get reports whether each Action type is enabled for the Organization. An Organization owner enables a type in the DataDoe app under Settings > Actions.

## Columns (32)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `child_asin` (`TEXT`, required)
- `parent_asin` (`TEXT`, required)
- `sku` (`TEXT`, required)
- `amazon_product_type` (`TEXT`, required)
- `product_type` (`TEXT`, required)
- `summaries` (`JSON`, nullable) — Same as JSON payload from Amazon SP-API.
- `attributes` (`JSON`, nullable) — Same as JSON payload from Amazon SP-API.
- `title_differentiation` (`TEXT`, nullable) — Item highlight shown in search results, extracted from the listing title_differentiation attribute.
- `item_name` (`TEXT`, nullable) — Listing title. Uses the listing item_name attribute, then the listing summary title, then the catalog product name.
- `product_description` (`TEXT`, nullable) — Listing description. Uses the listing product_description attribute, then the merchant listings report description when that report is joined, then the catalog product description. A+ content is not included.
- `generic_keyword` (`TEXT`, nullable) — Backend search terms from the listing generic_keyword attribute. The product catalog does not include this field. Null when Amazon omits it from the listing.
- `bullet_point_1` (`TEXT`, nullable) — First listing bullet. Uses the listing bullet_point attribute, then the catalog bullet. Only the first five bullets are stored.
- `bullet_point_2` (`TEXT`, nullable) — Second listing bullet. Uses the same sources as bullet_point_1.
- `bullet_point_3` (`TEXT`, nullable) — Third listing bullet. Uses the same sources as bullet_point_1.
- `bullet_point_4` (`TEXT`, nullable) — Fourth listing bullet. Uses the same sources as bullet_point_1.
- `bullet_point_5` (`TEXT`, nullable) — Fifth listing bullet. Uses the same sources as bullet_point_1.
- `classifications` (`JSON`, nullable) — Same as JSON payload from Amazon SP-API.
- `dimensions` (`JSON`, nullable) — Same as JSON payload from Amazon SP-API.
- `identifiers` (`JSON`, nullable) — Same as JSON payload from Amazon SP-API.
- `images` (`JSON`, nullable) — Same as JSON payload from Amazon SP-API.
- `sales_ranks` (`JSON`, nullable) — Same as JSON payload from Amazon SP-API.
- `offers` (`JSON`, nullable) — Same as JSON payload from Amazon SP-API.
- `fulfillment_availability` (`JSON`, nullable) — Same as JSON payload from Amazon SP-API.
- `issues` (`JSON`, nullable) — Same as JSON payload from Amazon SP-API.
- `relationships` (`JSON`, nullable) — Same as JSON payload from Amazon SP-API.
- `last_seen_at` (`DATE`, required)

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
