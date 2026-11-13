# Customer Feedback Category Review Topics

- BigQuery table name: `amazon_customer_feedback_browse_node_review_topics`
- Available in: Seller Central, Vendor Central
- Data scheme index: ../data-scheme.md

This table exists in 2 source types. Each section below describes one of them.

## Seller Central

Customer Feedback review topics for all products in a browse node. This is not an ASIN topic list. DataDoe collects about every 30 days. Topics are the ones Amazon returned, not a complete list. Percentages are the source values. Do not add them across products or connections.

- Source type: `SELLER_CENTRAL`
- Source ID: `d3aea65db06b6e3e1f9e395cae749e63571e3f555b3e514d10b6a9a1daa3f2be`
- Requires a date period: yes
- Contains PII: no
- Premium table: yes
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=d3aea65db06b6e3e1f9e395cae749e63571e3f555b3e514d10b6a9a1daa3f2be

### Fetch periods

- `CONTINUOUS`

### Columns (25)

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
- `sort_by` (`TEXT`, required)
- `topic_sentiment` (`TEXT`, required)
- `topic_rank` (`NUMBER`, required)
- `topic` (`TEXT`, required)
- `topic_node_category_star_rating_impact_all_products` (`NUMBER`, nullable)
- `topic_node_category_star_rating_impact_top_25_percent_products` (`NUMBER`, nullable)
- `topic_node_category_occurrence_percentage_all_products` (`NUMBER`, nullable)
- `topic_node_category_occurrence_percentage_top_25_percent_products` (`NUMBER`, nullable)
- `topic_review_snippet_1` (`TEXT`, nullable) — First review excerpt Amazon returned for the topic. Not the full review. Amazon chooses the language.
- `topic_review_snippet_2` (`TEXT`, nullable) — Second review excerpt Amazon returned for the topic. Empty when Amazon returned fewer than 2.
- `topic_review_snippet_3` (`TEXT`, nullable) — Third review excerpt Amazon returned for the topic. Empty when Amazon returned fewer than 3.

## Vendor Central

Customer Feedback review topics for all products in a browse node. This is not an ASIN topic list. DataDoe collects about every 30 days. Topics are the ones Amazon returned, not a complete list. Percentages are the source values. Do not add them across products or connections.

- Source type: `VENDOR_CENTRAL`
- Source ID: `d3aea65db06b6e3e1f9e395cae749e63571e3f555b3e514d10b6a9a1daa3f2be`
- Requires a date period: yes
- Contains PII: no
- Premium table: yes
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=VENDOR_CENTRAL&table=d3aea65db06b6e3e1f9e395cae749e63571e3f555b3e514d10b6a9a1daa3f2be

### Fetch periods

- `CONTINUOUS`

### Columns (25)

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
- `sort_by` (`TEXT`, required)
- `topic_sentiment` (`TEXT`, required)
- `topic_rank` (`NUMBER`, required)
- `topic` (`TEXT`, required)
- `topic_node_category_star_rating_impact_all_products` (`NUMBER`, nullable)
- `topic_node_category_star_rating_impact_top_25_percent_products` (`NUMBER`, nullable)
- `topic_node_category_occurrence_percentage_all_products` (`NUMBER`, nullable)
- `topic_node_category_occurrence_percentage_top_25_percent_products` (`NUMBER`, nullable)
- `topic_review_snippet_1` (`TEXT`, nullable) — First review excerpt Amazon returned for the topic. Not the full review. Amazon chooses the language.
- `topic_review_snippet_2` (`TEXT`, nullable) — Second review excerpt Amazon returned for the topic. Empty when Amazon returned fewer than 2.
- `topic_review_snippet_3` (`TEXT`, nullable) — Third review excerpt Amazon returned for the topic. Empty when Amazon returned fewer than 3.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
