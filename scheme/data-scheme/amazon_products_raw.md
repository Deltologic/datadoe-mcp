# Product Catalog by ASIN (Raw JSON)

- BigQuery table name: `amazon_products_raw`
- Available in: Seller Central, Vendor Central
- Data scheme index: ../data-scheme.md

This table exists in 2 source types. Each section below describes one of them.

## Seller Central

Raw Catalog Items payload per child ASIN and marketplace: attributes, classifications, dimensions, identifiers, images, sales ranks, summaries, and relationships. amazon_product_type is PARENT, CHILD, or SINGLE; product_type is the Amazon product type template. Prefer amazon_products_by_child_asin for titles, bullets, and best seller rank. Rows are large; download them to a file instead of loading them into context.

- Source type: `SELLER_CENTRAL`
- Source ID: `0e1ea34395ebb2b2658f4636d7fbdb9381d985eabeaea87aafa49335a92ff551`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=0e1ea34395ebb2b2658f4636d7fbdb9381d985eabeaea87aafa49335a92ff551

### Fetch periods

- `CONTINUOUS`

### Search aliases

- catalog attributes
- product type

### Columns (17)

- `observation_id` (`TEXT`, nullable) — Successful source observation identity. Null on legacy cache rows.
- `checked_at` (`DATE`, nullable) — Successful source-response observation time. Retry markers are not source checks.
- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `child_asin` (`TEXT`, required)
- `parent_asin` (`TEXT`, nullable) — First parent ASIN from Catalog Items relationships. Empty for parent and standalone ASINs.
- `amazon_product_type` (`TEXT`, required) — Variation role derived from the Catalog Items browse classification tree: PARENT, CHILD, or SINGLE. The Amazon product type template, such as LUGGAGE, is product_type on amazon_products_raw.
- `attributes` (`JSON`, nullable) — Same as JSON payload from Amazon SP-API.
- `classifications` (`JSON`, nullable) — Same as JSON payload from Amazon SP-API.
- `dimensions` (`JSON`, nullable) — Same as JSON payload from Amazon SP-API.
- `identifiers` (`JSON`, nullable) — Same as JSON payload from Amazon SP-API.
- `images` (`JSON`, nullable) — Same as JSON payload from Amazon SP-API.
- `product_type` (`TEXT`, nullable) — Amazon catalog product type template for this marketplace, such as LUGGAGE. Distinct from amazon_product_type, which is PARENT, CHILD, or SINGLE.
- `sales_ranks` (`JSON`, nullable) — Same as JSON payload from Amazon SP-API.
- `summaries` (`JSON`, nullable) — Same as JSON payload from Amazon SP-API.
- `relationships` (`JSON`, nullable) — Same as JSON payload from Amazon SP-API.

## Vendor Central

Raw Catalog Items payload per child ASIN and marketplace: attributes, classifications, dimensions, identifiers, images, sales ranks, summaries, and relationships. amazon_product_type is PARENT, CHILD, or SINGLE; product_type is the Amazon product type template. Prefer amazon_products_by_child_asin for titles, bullets, and best seller rank. Rows are large; download them to a file instead of loading them into context.

- Source type: `VENDOR_CENTRAL`
- Source ID: `0e1ea34395ebb2b2658f4636d7fbdb9381d985eabeaea87aafa49335a92ff551`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=VENDOR_CENTRAL&table=0e1ea34395ebb2b2658f4636d7fbdb9381d985eabeaea87aafa49335a92ff551

### Fetch periods

- `CONTINUOUS`

### Search aliases

- catalog attributes
- product type

### Columns (17)

- `observation_id` (`TEXT`, nullable) — Successful source observation identity. Null on legacy cache rows.
- `checked_at` (`DATE`, nullable) — Successful source-response observation time. Retry markers are not source checks.
- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `child_asin` (`TEXT`, required)
- `parent_asin` (`TEXT`, nullable) — First parent ASIN from Catalog Items relationships. Empty for parent and standalone ASINs.
- `amazon_product_type` (`TEXT`, required) — Variation role derived from the Catalog Items browse classification tree: PARENT, CHILD, or SINGLE. The Amazon product type template, such as LUGGAGE, is product_type on amazon_products_raw.
- `attributes` (`JSON`, nullable) — Same as JSON payload from Amazon SP-API.
- `classifications` (`JSON`, nullable) — Same as JSON payload from Amazon SP-API.
- `dimensions` (`JSON`, nullable) — Same as JSON payload from Amazon SP-API.
- `identifiers` (`JSON`, nullable) — Same as JSON payload from Amazon SP-API.
- `images` (`JSON`, nullable) — Same as JSON payload from Amazon SP-API.
- `product_type` (`TEXT`, nullable) — Amazon catalog product type template for this marketplace, such as LUGGAGE. Distinct from amazon_product_type, which is PARENT, CHILD, or SINGLE.
- `sales_ranks` (`JSON`, nullable) — Same as JSON payload from Amazon SP-API.
- `summaries` (`JSON`, nullable) — Same as JSON payload from Amazon SP-API.
- `relationships` (`JSON`, nullable) — Same as JSON payload from Amazon SP-API.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
