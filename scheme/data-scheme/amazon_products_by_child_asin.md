# Product Catalog by ASIN

- BigQuery table name: `amazon_products_by_child_asin`
- Available in: Seller Central, Vendor Central
- Data scheme index: ../data-scheme.md

This table exists in 2 source types. Each section below describes one of them.

## Seller Central

Catalog Items snapshot per child ASIN and marketplace: title, brand, bullets, description, browse node, and best seller rank. amazon_product_type is PARENT, CHILD, or SINGLE. For the catalog product type template and raw JSON attributes, classifications, images, and sales ranks, use amazon_products_raw.

- Source type: `SELLER_CENTRAL`
- Source ID: `68d2de238e8d1a47bc56a981a99d54558507b0bafb1e09f1b3e95fb7750a17a8`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: yes
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=68d2de238e8d1a47bc56a981a99d54558507b0bafb1e09f1b3e95fb7750a17a8

### Fetch periods

- `CONTINUOUS`

### Search aliases

- catalog
- bsr
- best seller rank
- browse node

### Columns (27)

- `observation_id` (`TEXT`, nullable) — Successful source observation identity. Null on legacy cache rows.
- `checked_at` (`DATE`, nullable) — Successful source-response observation time. Retry markers are not source checks.
- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `child_asin` (`TEXT`, required)
- `parent_asin` (`TEXT`, nullable) — First parent ASIN from Catalog Items relationships. Empty for parent and standalone ASINs.
- `amazon_product_type` (`TEXT`, required) — Variation role derived from the Catalog Items browse classification tree: PARENT, CHILD, or SINGLE. The Amazon product type template, such as LUGGAGE, is product_type on amazon_products_raw.
- `product_name` (`TEXT`, nullable)
- `product_root_category_name` (`TEXT`, nullable) — Display name of the top browse classification, walking parent nodes to the root.
- `product_node_category_name` (`TEXT`, nullable) — Display name of the ASIN browse node (the first catalog classification).
- `product_root_best_selling_rank` (`NUMBER`, nullable) — Best Seller Rank in the website display group (Catalog salesRanks displayGroupRanks). 1 is the top seller in that group. This rank is separate from the browse-node rank.
- `product_node_best_selling_rank` (`NUMBER`, nullable) — Best Seller Rank in the browse node that matches product_node_category_name. 1 is the top seller in that node.
- `product_brand` (`TEXT`, nullable)
- `product_color` (`TEXT`, nullable)
- `product_model_number` (`TEXT`, nullable)
- `product_release_date` (`DATE`, nullable) — Catalog release date from the item summary.
- `product_size` (`TEXT`, nullable)
- `product_style` (`TEXT`, nullable)
- `product_bullet_point_1` (`TEXT`, nullable) — First listing bullet from Catalog attributes.bullet_point. Only the first five bullets are stored.
- `product_bullet_point_2` (`TEXT`, nullable)
- `product_bullet_point_3` (`TEXT`, nullable)
- `product_bullet_point_4` (`TEXT`, nullable)
- `product_bullet_point_5` (`TEXT`, nullable)
- `product_description` (`TEXT`, nullable) — Catalog product_description attribute. A+ content and other enhanced content are not included.
- `product_image_url` (`TEXT`, nullable) — MAIN catalog image closest to 500 by 500 pixels.
- `product_url` (`TEXT`, nullable) — Marketplace product detail page URL for the child ASIN.

## Vendor Central

Catalog Items snapshot per child ASIN and marketplace: title, brand, bullets, description, browse node, and best seller rank. amazon_product_type is PARENT, CHILD, or SINGLE. For the catalog product type template and raw JSON attributes, classifications, images, and sales ranks, use amazon_products_raw.

- Source type: `VENDOR_CENTRAL`
- Source ID: `68d2de238e8d1a47bc56a981a99d54558507b0bafb1e09f1b3e95fb7750a17a8`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: yes
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=VENDOR_CENTRAL&table=68d2de238e8d1a47bc56a981a99d54558507b0bafb1e09f1b3e95fb7750a17a8

### Fetch periods

- `CONTINUOUS`

### Search aliases

- catalog
- bsr
- best seller rank
- browse node

### Columns (27)

- `observation_id` (`TEXT`, nullable) — Successful source observation identity. Null on legacy cache rows.
- `checked_at` (`DATE`, nullable) — Successful source-response observation time. Retry markers are not source checks.
- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `child_asin` (`TEXT`, required)
- `parent_asin` (`TEXT`, nullable) — First parent ASIN from Catalog Items relationships. Empty for parent and standalone ASINs.
- `amazon_product_type` (`TEXT`, required) — Variation role derived from the Catalog Items browse classification tree: PARENT, CHILD, or SINGLE. The Amazon product type template, such as LUGGAGE, is product_type on amazon_products_raw.
- `product_name` (`TEXT`, nullable)
- `product_root_category_name` (`TEXT`, nullable) — Display name of the top browse classification, walking parent nodes to the root.
- `product_node_category_name` (`TEXT`, nullable) — Display name of the ASIN browse node (the first catalog classification).
- `product_root_best_selling_rank` (`NUMBER`, nullable) — Best Seller Rank in the website display group (Catalog salesRanks displayGroupRanks). 1 is the top seller in that group. This rank is separate from the browse-node rank.
- `product_node_best_selling_rank` (`NUMBER`, nullable) — Best Seller Rank in the browse node that matches product_node_category_name. 1 is the top seller in that node.
- `product_brand` (`TEXT`, nullable)
- `product_color` (`TEXT`, nullable)
- `product_model_number` (`TEXT`, nullable)
- `product_release_date` (`DATE`, nullable) — Catalog release date from the item summary.
- `product_size` (`TEXT`, nullable)
- `product_style` (`TEXT`, nullable)
- `product_bullet_point_1` (`TEXT`, nullable) — First listing bullet from Catalog attributes.bullet_point. Only the first five bullets are stored.
- `product_bullet_point_2` (`TEXT`, nullable)
- `product_bullet_point_3` (`TEXT`, nullable)
- `product_bullet_point_4` (`TEXT`, nullable)
- `product_bullet_point_5` (`TEXT`, nullable)
- `product_description` (`TEXT`, nullable) — Catalog product_description attribute. A+ content and other enhanced content are not included.
- `product_image_url` (`TEXT`, nullable) — MAIN catalog image closest to 500 by 500 pixels.
- `product_url` (`TEXT`, nullable) — Marketplace product detail page URL for the child ASIN.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
