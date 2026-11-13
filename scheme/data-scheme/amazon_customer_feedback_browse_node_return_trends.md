# Customer Feedback Category Return Trends

- BigQuery table name: `amazon_customer_feedback_browse_node_return_trends`
- Available in: Seller Central, Vendor Central
- Data scheme index: ../data-scheme.md

This table exists in 2 source types. Each section below describes one of them.

## Seller Central

Customer Feedback monthly return topic trends for all products in a browse node. The percentage is the share of category return feedback that mentions the topic. It is not the share of sold units that were returned. The table has no sentiment. DataDoe fetches a new response about every 30 days. date is the UTC day of the fetch. period_start_at_utc and period_end_at_utc are the month Amazon returned.

- Source type: `SELLER_CENTRAL`
- Source ID: `4f40bfc6eaa96c4864b74465ebfbce9e6e97d686dd4066af7f87a43092959a26`
- Requires a date period: yes
- Contains PII: no
- Premium table: yes
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=4f40bfc6eaa96c4864b74465ebfbce9e6e97d686dd4066af7f87a43092959a26

### Fetch periods

- `CONTINUOUS`

### Search aliases

- return trends
- return reasons

### Columns (19)

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
- `node_category_id` (`TEXT`, required)
- `product_node_category_name` (`TEXT`, required)
- `topic_node_category_occurrence_percentage_all_products` (`NUMBER`, required) — Source percentage of category return feedback that mentions the topic. 10 means 10%.

## Vendor Central

Customer Feedback monthly return topic trends for all products in a browse node. The percentage is the share of category return feedback that mentions the topic. It is not the share of sold units that were returned. The table has no sentiment. DataDoe fetches a new response about every 30 days. date is the UTC day of the fetch. period_start_at_utc and period_end_at_utc are the month Amazon returned.

- Source type: `VENDOR_CENTRAL`
- Source ID: `4f40bfc6eaa96c4864b74465ebfbce9e6e97d686dd4066af7f87a43092959a26`
- Requires a date period: yes
- Contains PII: no
- Premium table: yes
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=VENDOR_CENTRAL&table=4f40bfc6eaa96c4864b74465ebfbce9e6e97d686dd4066af7f87a43092959a26

### Fetch periods

- `CONTINUOUS`

### Search aliases

- return trends
- return reasons

### Columns (19)

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
- `node_category_id` (`TEXT`, required)
- `product_node_category_name` (`TEXT`, required)
- `topic_node_category_occurrence_percentage_all_products` (`NUMBER`, required) — Source percentage of category return feedback that mentions the topic. 10 means 10%.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
