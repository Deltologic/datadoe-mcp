# Vendor Product Replenishment Details

- BigQuery table name: `amazon_vendor_product_details`
- Available in: Vendor Central
- Data scheme index: ../data-scheme.md

Current Vendor Central replenishment category for each child ASIN, read with the vendor connection that owns the row. One row per organization, store, connection, marketplace, and child ASIN. DataDoe refreshes each ASIN about once a day. This is a current snapshot, not a daily history. replenishment_category is Amazon's category string. It is not a reorder recommendation and it is not Subscribe & Save eligibility. vendor_details_available is false when the latest successful response had no vendor details for this marketplace. A missing category does not mean the ASIN is obsolete. manufacturer_code and brand_code come from Amazon's vendor catalog. They are not vendor codes uploaded in DataDoe.

- Source type: `VENDOR_CENTRAL`
- Source ID: `7f45dd2738d0b06f5fbcc26f2e6b11fb89d127f64fbddf100062cee837c86cca`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=VENDOR_CENTRAL&table=7f45dd2738d0b06f5fbcc26f2e6b11fb89d127f64fbddf100062cee837c86cca

## Fetch periods

- `CONTINUOUS`

## Prerequisites

Vendor Central only. Seller Central connections do not have this table.

## Search aliases

- replenishment category
- obsolete
- vendor catalog

## Columns (20)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `child_asin` (`TEXT`, required) — Child ASIN from Catalog Items for this vendor connection and marketplace.
- `replenishment_category` (`TEXT`, nullable) — Amazon replenishment category for this marketplace, such as OBSOLETE. Stored as Amazon sends it. Not a reorder flag and not Subscribe & Save eligibility.
- `product_group` (`TEXT`, nullable) — Amazon product group from vendor details.
- `product_category_code` (`TEXT`, nullable) — Amazon product category code from vendor details.
- `product_category_name` (`TEXT`, nullable) — Amazon display name for the vendor product category.
- `product_subcategory_code` (`TEXT`, nullable) — Amazon product subcategory code from vendor details.
- `product_subcategory_name` (`TEXT`, nullable) — Amazon display name for the vendor product subcategory.
- `manufacturer_code` (`TEXT`, nullable) — Manufacturer code from Amazon vendor catalog details. Not a vendor code uploaded in DataDoe.
- `manufacturer_code_parent` (`TEXT`, nullable) — Parent manufacturer code from Amazon vendor catalog details.
- `brand_code` (`TEXT`, nullable) — Brand code from Amazon vendor catalog details. Not a vendor code uploaded in DataDoe.
- `vendor_details_available` (`LOGIC`, required) — True when the latest successful catalog response included vendor details for this marketplace. False does not mean the ASIN is obsolete or that the connection lacks permission.
- `last_seen_at` (`DATE`, required) — When DataDoe last received a successful catalog item response for this ASIN on this connection.
- `dt_created` (`DATE`, required) — When DataDoe first stored this snapshot.
- `dt_updated` (`DATE`, required) — When DataDoe last updated this snapshot from a successful catalog response.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
