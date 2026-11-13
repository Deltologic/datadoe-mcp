# Product Catalog by ASIN History

- BigQuery table name: `amazon_products_by_child_asin_history`
- Available in: Seller Central, Vendor Central
- Data scheme index: ../data-scheme.md

This table exists in 2 source types. Each section below describes one of them.

## Seller Central

Successful Amazon Catalog Items observations per child ASIN and marketplace for items the Organization tracks. A later successful response is retained even when unchanged; a retry keeps the original observation_id and checked_at without adding a duplicate. History starts after the Organization enables it and tracks the item. A newly associated item receives its next successful observation, without older shared-cache history. The source stays off until a staged Connector rollout enables it. History follows the existing catalog refresh. DataDoe can request an item again one day after its last cache update. The catalog worker runs every 15 minutes in each region and stops at its time limit, so a tracked item can go more than one day without a new observation. A history delivery backlog does not stop current catalog refreshes. Failed, throttled, empty and hard-failed attempts and items Amazon omits create no history observation. Missing days and source values remain unknown: a missing item or rank does not mean deletion or a zero rank. Observations are per item, not an atomic snapshot of the whole catalog. Changes occurred between observations; checked_at is not the exact time Amazon edited the item. Use amazon_products_by_child_asin and amazon_products_raw for current-state joins to sales, inventory and profit. They keep one latest row per ASIN and marketplace and provide the cached onboarding baseline. Legacy rows can have null checked_at and observation_id; overwritten payloads are not recovered or assigned invented times. When Amazon omits an item, its current row is created or cleared without a new checked_at and without a history observation. Filter history by child_asin, marketplace_id and a date range; date and snapshot_date are the UTC date of checked_at. For rank trends, order by checked_at and observation_id and compare category names and raw category identifiers, which can change. To compare observations, join on child_asin and marketplace_id and filter the two observation_id values; an absent observation produces no comparison. For the last observed state at a chosen time, filter checked_at <= the chosen timestamp, then use QUALIFY ROW_NUMBER() OVER (PARTITION BY child_asin, marketplace_id ORDER BY checked_at DESC, observation_id DESC) = 1. This returns only items observed by that time and does not fill gaps with current content.

- Source type: `SELLER_CENTRAL`
- Source ID: `dcc0857a409fa1b40f544efca243912c6e5b8f64ac79addb8c9b2e9428a18289`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=dcc0857a409fa1b40f544efca243912c6e5b8f64ac79addb8c9b2e9428a18289

### Fetch periods

- `CONTINUOUS`

### Search aliases

- historical catalog observations
- rank trends

### Columns (31)

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
- `date` (`DATE`, required) — UTC date of the successful source observation. Same as snapshot_date.
- `observation_id` (`TEXT`, required) — Stable per-item observation identity. Replays retain this identity; unchanged later collections have a new identity.
- `checked_at` (`DATE`, required) — Successful source-response observation time, not the exact Amazon edit time.
- `imported_at` (`DATE`, required) — Time the observation entered durable Connector staging. Warehouse retries retain this value.
- `snapshot_date` (`DATE`, required) — UTC date of checked_at.
- `snapshot_kind` (`TEXT`, required) — OBSERVED. Legacy cache rows with unknown observation time are not copied into history.

## Vendor Central

Successful Amazon Catalog Items observations per child ASIN and marketplace for items the Organization tracks. A later successful response is retained even when unchanged; a retry keeps the original observation_id and checked_at without adding a duplicate. History starts after the Organization enables it and tracks the item. A newly associated item receives its next successful observation, without older shared-cache history. The source stays off until a staged Connector rollout enables it. History follows the existing catalog refresh. DataDoe can request an item again one day after its last cache update. The catalog worker runs every 15 minutes in each region and stops at its time limit, so a tracked item can go more than one day without a new observation. A history delivery backlog does not stop current catalog refreshes. Failed, throttled, empty and hard-failed attempts and items Amazon omits create no history observation. Missing days and source values remain unknown: a missing item or rank does not mean deletion or a zero rank. Observations are per item, not an atomic snapshot of the whole catalog. Changes occurred between observations; checked_at is not the exact time Amazon edited the item. Use amazon_products_by_child_asin and amazon_products_raw for current-state joins to sales, inventory and profit. They keep one latest row per ASIN and marketplace and provide the cached onboarding baseline. Legacy rows can have null checked_at and observation_id; overwritten payloads are not recovered or assigned invented times. When Amazon omits an item, its current row is created or cleared without a new checked_at and without a history observation. Filter history by child_asin, marketplace_id and a date range; date and snapshot_date are the UTC date of checked_at. For rank trends, order by checked_at and observation_id and compare category names and raw category identifiers, which can change. To compare observations, join on child_asin and marketplace_id and filter the two observation_id values; an absent observation produces no comparison. For the last observed state at a chosen time, filter checked_at <= the chosen timestamp, then use QUALIFY ROW_NUMBER() OVER (PARTITION BY child_asin, marketplace_id ORDER BY checked_at DESC, observation_id DESC) = 1. This returns only items observed by that time and does not fill gaps with current content.

- Source type: `VENDOR_CENTRAL`
- Source ID: `dcc0857a409fa1b40f544efca243912c6e5b8f64ac79addb8c9b2e9428a18289`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=VENDOR_CENTRAL&table=dcc0857a409fa1b40f544efca243912c6e5b8f64ac79addb8c9b2e9428a18289

### Fetch periods

- `CONTINUOUS`

### Search aliases

- historical catalog observations
- rank trends

### Columns (31)

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
- `date` (`DATE`, required) — UTC date of the successful source observation. Same as snapshot_date.
- `observation_id` (`TEXT`, required) — Stable per-item observation identity. Replays retain this identity; unchanged later collections have a new identity.
- `checked_at` (`DATE`, required) — Successful source-response observation time, not the exact Amazon edit time.
- `imported_at` (`DATE`, required) — Time the observation entered durable Connector staging. Warehouse retries retain this value.
- `snapshot_date` (`DATE`, required) — UTC date of checked_at.
- `snapshot_kind` (`TEXT`, required) — OBSERVED. Legacy cache rows with unknown observation time are not copied into history.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
