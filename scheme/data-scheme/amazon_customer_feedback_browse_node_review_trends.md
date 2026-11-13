# Customer Feedback Category Review Trends

- BigQuery table name: `amazon_customer_feedback_browse_node_review_trends`
- Available in: Seller Central, Vendor Central
- Data scheme index: ../data-scheme.md

This table exists in 2 source types. Each section below describes one of them.

## Seller Central

Customer Feedback monthly review topic trends for all products in a browse node. This is separate from ASIN trends. DataDoe fetches a new response about every 30 days. date is the UTC day of the fetch. period_start_at_utc and period_end_at_utc are the month Amazon returned. The top 25 percent column is the source percentage for the top 25 percent of products, not 25 percent of the all-products value. Percentages are the source values on a 0 to 100 scale.

- Source type: `SELLER_CENTRAL`
- Source ID: `711321083dbdaaa2eeb9d6cd3beb38ccf61a0821e7866f53791eca749ff5a8be`
- Requires a date period: yes
- Contains PII: no
- Premium table: yes
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=711321083dbdaaa2eeb9d6cd3beb38ccf61a0821e7866f53791eca749ff5a8be

### Fetch periods

- `CONTINUOUS`

### Search aliases

- category review trends
- review trends

### Columns (21)

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
- `node_category_id` (`TEXT`, required) — Browse node id Amazon returned. Kept as text.
- `product_node_category_name` (`TEXT`, required)
- `topic_sentiment` (`TEXT`, required) — POSITIVE or NEGATIVE.
- `topic_node_category_occurrence_percentage_all_products` (`NUMBER`, required) — Source percentage of review feedback for all products in the browse node that mentions the topic.
- `topic_node_category_occurrence_percentage_top_25_percent_products` (`NUMBER`, required) — Source percentage for the top 25 percent of products in the browse node.

## Vendor Central

Customer Feedback monthly review topic trends for all products in a browse node. This is separate from ASIN trends. DataDoe fetches a new response about every 30 days. date is the UTC day of the fetch. period_start_at_utc and period_end_at_utc are the month Amazon returned. The top 25 percent column is the source percentage for the top 25 percent of products, not 25 percent of the all-products value. Percentages are the source values on a 0 to 100 scale.

- Source type: `VENDOR_CENTRAL`
- Source ID: `711321083dbdaaa2eeb9d6cd3beb38ccf61a0821e7866f53791eca749ff5a8be`
- Requires a date period: yes
- Contains PII: no
- Premium table: yes
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=VENDOR_CENTRAL&table=711321083dbdaaa2eeb9d6cd3beb38ccf61a0821e7866f53791eca749ff5a8be

### Fetch periods

- `CONTINUOUS`

### Search aliases

- category review trends
- review trends

### Columns (21)

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
- `node_category_id` (`TEXT`, required) — Browse node id Amazon returned. Kept as text.
- `product_node_category_name` (`TEXT`, required)
- `topic_sentiment` (`TEXT`, required) — POSITIVE or NEGATIVE.
- `topic_node_category_occurrence_percentage_all_products` (`NUMBER`, required) — Source percentage of review feedback for all products in the browse node that mentions the topic.
- `topic_node_category_occurrence_percentage_top_25_percent_products` (`NUMBER`, required) — Source percentage for the top 25 percent of products in the browse node.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
