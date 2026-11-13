# Customer Feedback Category Return Topics

- BigQuery table name: `amazon_customer_feedback_browse_node_return_topics`
- Available in: Seller Central, Vendor Central
- Data scheme index: ../data-scheme.md

This table exists in 2 source types. Each section below describes one of them.

## Seller Central

Customer Feedback return topics for all products in a browse node. The occurrence percentage is not an ASIN return rate. The table has no sentiment, snippets, or mention counts.

- Source type: `SELLER_CENTRAL`
- Source ID: `ae4696b6c71ccc9ba281a7e91c627d512a74c39853fe25c172c1d5d9b97be5c6`
- Requires a date period: yes
- Contains PII: no
- Premium table: yes
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=ae4696b6c71ccc9ba281a7e91c627d512a74c39853fe25c172c1d5d9b97be5c6

### Fetch periods

- `CONTINUOUS`

### Search aliases

- return topics
- return reasons

### Columns (17)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, nullable) — DataDoe account identifier. Empty when the connection context cannot be resolved. The row is still returned.
- `seller_or_vendor_name` (`TEXT`, nullable) — DataDoe connection context display name. Empty when the connection context cannot be resolved.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `date` (`DATE`, required) — UTC day when DataDoe fetched the response.
- `snapshot_id` (`TEXT`, required) — Identifier of the promoted Customer Feedback snapshot.
- `observed_at_utc` (`DATE`, required) — UTC time when DataDoe fetched the response.
- `period_start_at_utc` (`DATE`, required) — Start of the date range Amazon returned with the response, in UTC.
- `period_end_at_utc` (`DATE`, required) — End of the date range Amazon returned with the response, in UTC.
- `source_api` (`TEXT`, required) — Fixed value CUSTOMER_FEEDBACK_2024_06_01.
- `node_category_id` (`TEXT`, required)
- `product_node_category_name` (`TEXT`, required)
- `topic_rank` (`NUMBER`, required)
- `topic` (`TEXT`, required)
- `topic_node_category_occurrence_percentage_all_products` (`NUMBER`, nullable)

## Vendor Central

Customer Feedback return topics for all products in a browse node. The occurrence percentage is not an ASIN return rate. The table has no sentiment, snippets, or mention counts.

- Source type: `VENDOR_CENTRAL`
- Source ID: `ae4696b6c71ccc9ba281a7e91c627d512a74c39853fe25c172c1d5d9b97be5c6`
- Requires a date period: yes
- Contains PII: no
- Premium table: yes
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=VENDOR_CENTRAL&table=ae4696b6c71ccc9ba281a7e91c627d512a74c39853fe25c172c1d5d9b97be5c6

### Fetch periods

- `CONTINUOUS`

### Search aliases

- return topics
- return reasons

### Columns (17)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, nullable) — DataDoe account identifier. Empty when the connection context cannot be resolved. The row is still returned.
- `seller_or_vendor_name` (`TEXT`, nullable) — DataDoe connection context display name. Empty when the connection context cannot be resolved.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `date` (`DATE`, required) — UTC day when DataDoe fetched the response.
- `snapshot_id` (`TEXT`, required) — Identifier of the promoted Customer Feedback snapshot.
- `observed_at_utc` (`DATE`, required) — UTC time when DataDoe fetched the response.
- `period_start_at_utc` (`DATE`, required) — Start of the date range Amazon returned with the response, in UTC.
- `period_end_at_utc` (`DATE`, required) — End of the date range Amazon returned with the response, in UTC.
- `source_api` (`TEXT`, required) — Fixed value CUSTOMER_FEEDBACK_2024_06_01.
- `node_category_id` (`TEXT`, required)
- `product_node_category_name` (`TEXT`, required)
- `topic_rank` (`NUMBER`, required)
- `topic` (`TEXT`, required)
- `topic_node_category_occurrence_percentage_all_products` (`NUMBER`, nullable)

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
