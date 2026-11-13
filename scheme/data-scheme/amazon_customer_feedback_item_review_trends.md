# Customer Feedback ASIN Review Trends

- BigQuery table name: `amazon_customer_feedback_item_review_trends`
- Available in: Seller Central, Vendor Central
- Data scheme index: ../data-scheme.md

This table exists in 2 source types. Each section below describes one of them.

## Seller Central

Customer Feedback monthly review topic trends for a child ASIN. DataDoe fetches a new response about every 30 days. Amazon may refresh the source weekly. date is the UTC day of the fetch. period_start_at_utc and period_end_at_utc are the month Amazon returned for that point. Percentages are the source values on a 0 to 100 scale. A missing parent or category percentage means Amazon did not return that comparison. Category names stay empty when the ASIN has no category mapping.

- Source type: `SELLER_CENTRAL`
- Source ID: `56c68b48499ae6ebd950fc47606e36bbf3b75635d3fa53503a7930122ed7cb7b`
- Requires a date period: yes
- Contains PII: no
- Premium table: yes
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=56c68b48499ae6ebd950fc47606e36bbf3b75635d3fa53503a7930122ed7cb7b

### Fetch periods

- `CONTINUOUS`

### Search aliases

- review trends
- customer feedback
- topic trends

### Columns (24)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, nullable) — DataDoe account identifier. Empty when the connection context cannot be resolved. The row is still returned.
- `seller_or_vendor_name` (`TEXT`, nullable) — DataDoe connection context display name. Empty when the connection context cannot be resolved.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `date` (`DATE`, required) — UTC day when DataDoe fetched the response.
- `snapshot_id` (`TEXT`, required) — Identifier of the promoted Customer Feedback snapshot.
- `observed_at_utc` (`DATE`, required) — UTC time when DataDoe fetched the response.
- `response_period_start_at_utc` (`DATE`, required) — Start of the overall date range on the Customer Feedback response, in UTC.
- `response_period_end_at_utc` (`DATE`, required) — End of the overall date range on the Customer Feedback response, in UTC.
- `period_start_at_utc` (`DATE`, required) — Start of the monthly point Amazon returned in trendMetrics, in UTC. Use this for trend analysis.
- `period_end_at_utc` (`DATE`, required) — End of the monthly point Amazon returned in trendMetrics, in UTC. Use this for trend analysis.
- `source_api` (`TEXT`, required) — Fixed value CUSTOMER_FEEDBACK_2024_06_01.
- `topic` (`TEXT`, required) — Topic text Amazon returned. The same words can change between fetches.
- `topic_rank` (`NUMBER`, required) — 1-based position of the topic in the Amazon list. The same rank is repeated on each monthly row for that topic.
- `child_asin` (`TEXT`, required)
- `product_name` (`TEXT`, required)
- `node_category_id` (`TEXT`, nullable) — Browse node from the Customer Feedback ASIN category mapping. Empty when that mapping is missing.
- `product_node_category_name` (`TEXT`, nullable) — Browse node name from the Customer Feedback ASIN category mapping. Empty when that mapping is missing.
- `topic_sentiment` (`TEXT`, required) — POSITIVE or NEGATIVE.
- `topic_child_asin_occurrence_percentage` (`NUMBER`, required) — Source percentage of this child ASIN reviews that mention the topic in the month. 10 means 10%.
- `topic_parent_asin_occurrence_percentage` (`NUMBER`, nullable) — Source percentage for the parent ASIN when Amazon returned it. Empty when parent data is unavailable. There is no parent ASIN id in this response.
- `topic_node_category_occurrence_percentage_all_products` (`NUMBER`, nullable) — Source percentage for all products in the browse node when Amazon returned it. Empty when the category comparison is unavailable.

## Vendor Central

Customer Feedback monthly review topic trends for a child ASIN. DataDoe fetches a new response about every 30 days. Amazon may refresh the source weekly. date is the UTC day of the fetch. period_start_at_utc and period_end_at_utc are the month Amazon returned for that point. Percentages are the source values on a 0 to 100 scale. A missing parent or category percentage means Amazon did not return that comparison. Category names stay empty when the ASIN has no category mapping.

- Source type: `VENDOR_CENTRAL`
- Source ID: `56c68b48499ae6ebd950fc47606e36bbf3b75635d3fa53503a7930122ed7cb7b`
- Requires a date period: yes
- Contains PII: no
- Premium table: yes
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=VENDOR_CENTRAL&table=56c68b48499ae6ebd950fc47606e36bbf3b75635d3fa53503a7930122ed7cb7b

### Fetch periods

- `CONTINUOUS`

### Search aliases

- review trends
- customer feedback
- topic trends

### Columns (24)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, nullable) — DataDoe account identifier. Empty when the connection context cannot be resolved. The row is still returned.
- `seller_or_vendor_name` (`TEXT`, nullable) — DataDoe connection context display name. Empty when the connection context cannot be resolved.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `date` (`DATE`, required) — UTC day when DataDoe fetched the response.
- `snapshot_id` (`TEXT`, required) — Identifier of the promoted Customer Feedback snapshot.
- `observed_at_utc` (`DATE`, required) — UTC time when DataDoe fetched the response.
- `response_period_start_at_utc` (`DATE`, required) — Start of the overall date range on the Customer Feedback response, in UTC.
- `response_period_end_at_utc` (`DATE`, required) — End of the overall date range on the Customer Feedback response, in UTC.
- `period_start_at_utc` (`DATE`, required) — Start of the monthly point Amazon returned in trendMetrics, in UTC. Use this for trend analysis.
- `period_end_at_utc` (`DATE`, required) — End of the monthly point Amazon returned in trendMetrics, in UTC. Use this for trend analysis.
- `source_api` (`TEXT`, required) — Fixed value CUSTOMER_FEEDBACK_2024_06_01.
- `topic` (`TEXT`, required) — Topic text Amazon returned. The same words can change between fetches.
- `topic_rank` (`NUMBER`, required) — 1-based position of the topic in the Amazon list. The same rank is repeated on each monthly row for that topic.
- `child_asin` (`TEXT`, required)
- `product_name` (`TEXT`, required)
- `node_category_id` (`TEXT`, nullable) — Browse node from the Customer Feedback ASIN category mapping. Empty when that mapping is missing.
- `product_node_category_name` (`TEXT`, nullable) — Browse node name from the Customer Feedback ASIN category mapping. Empty when that mapping is missing.
- `topic_sentiment` (`TEXT`, required) — POSITIVE or NEGATIVE.
- `topic_child_asin_occurrence_percentage` (`NUMBER`, required) — Source percentage of this child ASIN reviews that mention the topic in the month. 10 means 10%.
- `topic_parent_asin_occurrence_percentage` (`NUMBER`, nullable) — Source percentage for the parent ASIN when Amazon returned it. Empty when parent data is unavailable. There is no parent ASIN id in this response.
- `topic_node_category_occurrence_percentage_all_products` (`NUMBER`, nullable) — Source percentage for all products in the browse node when Amazon returned it. Empty when the category comparison is unavailable.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
