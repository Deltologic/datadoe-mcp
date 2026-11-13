# Customer Feedback ASIN Categories

- BigQuery table name: `amazon_customer_feedback_item_browse_nodes`
- Available in: Seller Central, Vendor Central
- Data scheme index: ../data-scheme.md

This table exists in 2 source types. Each section below describes one of them.

## Seller Central

The browse node Amazon Customer Feedback associated with each child ASIN. One row is one associated node, not the full category path. DataDoe collects a new snapshot about every 30 days.

- Source type: `SELLER_CENTRAL`
- Source ID: `d56182eea515323d6a59cd58f5bdfdf7e5707e15a49a915e73a78381ab2a07b4`
- Requires a date period: yes
- Contains PII: no
- Premium table: yes
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=d56182eea515323d6a59cd58f5bdfdf7e5707e15a49a915e73a78381ab2a07b4

### Fetch periods

- `CONTINUOUS`

### Columns (13)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, nullable) — DataDoe account identifier. Empty when the connection context cannot be resolved. The row is still returned.
- `seller_or_vendor_name` (`TEXT`, nullable) — DataDoe connection context display name. Empty when the connection context cannot be resolved.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `date` (`DATE`, required) — UTC day when DataDoe fetched the response.
- `snapshot_id` (`TEXT`, required) — Identifier of the promoted Customer Feedback snapshot.
- `observed_at_utc` (`DATE`, required) — UTC time when DataDoe fetched the response.
- `child_asin` (`TEXT`, required)
- `node_category_id` (`TEXT`, required)
- `product_node_category_name` (`TEXT`, required)
- `source_api` (`TEXT`, required) — Fixed value CUSTOMER_FEEDBACK_2024_06_01.

## Vendor Central

The browse node Amazon Customer Feedback associated with each child ASIN. One row is one associated node, not the full category path. DataDoe collects a new snapshot about every 30 days.

- Source type: `VENDOR_CENTRAL`
- Source ID: `d56182eea515323d6a59cd58f5bdfdf7e5707e15a49a915e73a78381ab2a07b4`
- Requires a date period: yes
- Contains PII: no
- Premium table: yes
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=VENDOR_CENTRAL&table=d56182eea515323d6a59cd58f5bdfdf7e5707e15a49a915e73a78381ab2a07b4

### Fetch periods

- `CONTINUOUS`

### Columns (13)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, nullable) — DataDoe account identifier. Empty when the connection context cannot be resolved. The row is still returned.
- `seller_or_vendor_name` (`TEXT`, nullable) — DataDoe connection context display name. Empty when the connection context cannot be resolved.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `date` (`DATE`, required) — UTC day when DataDoe fetched the response.
- `snapshot_id` (`TEXT`, required) — Identifier of the promoted Customer Feedback snapshot.
- `observed_at_utc` (`DATE`, required) — UTC time when DataDoe fetched the response.
- `child_asin` (`TEXT`, required)
- `node_category_id` (`TEXT`, required)
- `product_node_category_name` (`TEXT`, required)
- `source_api` (`TEXT`, required) — Fixed value CUSTOMER_FEEDBACK_2024_06_01.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
