# Customer Feedback ASIN Review Topics

- BigQuery table name: `amazon_customer_feedback_item_review_topics`
- Available in: Seller Central, Vendor Central
- Data scheme index: ../data-scheme.md

This table exists in 2 source types. Each section below describes one of them.

## Seller Central

Customer Feedback review topics for a child ASIN, sorted by mentions. DataDoe collects about every 30 days. Amazon may refresh the source weekly, so a row can be newer than the previous fetch. Topics are the ones Amazon returned, not a complete list. Snippets and topic names are the text Amazon returned, not full reviews. Amazon chooses the language. Sentiment is the positive or negative list, not a star rating. Percentages are the source values and are not additive. Category fields are empty when the ASIN has no category mapping.

- Source type: `SELLER_CENTRAL`
- Source ID: `224df5a43c4a64a064c285c29fc2f4932d3fdd38f55493ada7f60b992550458d`
- Requires a date period: yes
- Contains PII: no
- Premium table: yes
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=224df5a43c4a64a064c285c29fc2f4932d3fdd38f55493ada7f60b992550458d

### Fetch periods

- `CONTINUOUS`

### Search aliases

- review topics
- customer feedback
- voice of the customer

### Columns (29)

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
- `child_asin` (`TEXT`, required)
- `product_name` (`TEXT`, required)
- `node_category_id` (`TEXT`, nullable)
- `product_node_category_name` (`TEXT`, nullable)
- `sort_by` (`TEXT`, required) — MENTIONS for this table.
- `topic_sentiment` (`TEXT`, required) — POSITIVE or NEGATIVE.
- `topic_rank` (`NUMBER`, required) — 1-based position in the Amazon list. A blank topic is skipped and does not renumber later topics.
- `topic` (`TEXT`, required)
- `topic_child_asin_number_of_mentions` (`NUMBER`, nullable)
- `topic_child_asin_occurrence_percentage` (`NUMBER`, nullable)
- `topic_child_asin_star_rating_impact` (`NUMBER`, nullable)
- `topic_parent_asin_number_of_mentions` (`NUMBER`, nullable)
- `topic_parent_asin_occurrence_percentage` (`NUMBER`, nullable)
- `topic_parent_asin_star_rating_impact` (`NUMBER`, nullable)
- `topic_review_snippet_1` (`TEXT`, nullable) — First review excerpt Amazon returned for the topic. Not the full review. Amazon chooses the language.
- `topic_review_snippet_2` (`TEXT`, nullable) — Second review excerpt Amazon returned for the topic. Empty when Amazon returned fewer than 2.
- `topic_review_snippet_3` (`TEXT`, nullable) — Third review excerpt Amazon returned for the topic. Empty when Amazon returned fewer than 3.

## Vendor Central

Customer Feedback review topics for a child ASIN, sorted by mentions. DataDoe collects about every 30 days. Amazon may refresh the source weekly, so a row can be newer than the previous fetch. Topics are the ones Amazon returned, not a complete list. Snippets and topic names are the text Amazon returned, not full reviews. Amazon chooses the language. Sentiment is the positive or negative list, not a star rating. Percentages are the source values and are not additive. Category fields are empty when the ASIN has no category mapping.

- Source type: `VENDOR_CENTRAL`
- Source ID: `224df5a43c4a64a064c285c29fc2f4932d3fdd38f55493ada7f60b992550458d`
- Requires a date period: yes
- Contains PII: no
- Premium table: yes
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=VENDOR_CENTRAL&table=224df5a43c4a64a064c285c29fc2f4932d3fdd38f55493ada7f60b992550458d

### Fetch periods

- `CONTINUOUS`

### Search aliases

- review topics
- customer feedback
- voice of the customer

### Columns (29)

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
- `child_asin` (`TEXT`, required)
- `product_name` (`TEXT`, required)
- `node_category_id` (`TEXT`, nullable)
- `product_node_category_name` (`TEXT`, nullable)
- `sort_by` (`TEXT`, required) — MENTIONS for this table.
- `topic_sentiment` (`TEXT`, required) — POSITIVE or NEGATIVE.
- `topic_rank` (`NUMBER`, required) — 1-based position in the Amazon list. A blank topic is skipped and does not renumber later topics.
- `topic` (`TEXT`, required)
- `topic_child_asin_number_of_mentions` (`NUMBER`, nullable)
- `topic_child_asin_occurrence_percentage` (`NUMBER`, nullable)
- `topic_child_asin_star_rating_impact` (`NUMBER`, nullable)
- `topic_parent_asin_number_of_mentions` (`NUMBER`, nullable)
- `topic_parent_asin_occurrence_percentage` (`NUMBER`, nullable)
- `topic_parent_asin_star_rating_impact` (`NUMBER`, nullable)
- `topic_review_snippet_1` (`TEXT`, nullable) — First review excerpt Amazon returned for the topic. Not the full review. Amazon chooses the language.
- `topic_review_snippet_2` (`TEXT`, nullable) — Second review excerpt Amazon returned for the topic. Empty when Amazon returned fewer than 2.
- `topic_review_snippet_3` (`TEXT`, nullable) — Third review excerpt Amazon returned for the topic. Empty when Amazon returned fewer than 3.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
