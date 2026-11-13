# Customer Feedback ASIN Review Subtopics

- BigQuery table name: `amazon_customer_feedback_item_review_subtopics`
- Available in: Seller Central, Vendor Central
- Data scheme index: ../data-scheme.md

This table exists in 2 source types. Each section below describes one of them.

## Seller Central

Customer Feedback review subtopics for a child ASIN. Subtopics stay under the topic Amazon returned. There is no extra subtopic for reviews that do not match a returned subtopic. Percentages are the source values and are not additive.

- Source type: `SELLER_CENTRAL`
- Source ID: `d3413c87b8b0b20213618c358f01c5ce3bc4fb8dae680bb7e04bbdf69986d819`
- Requires a date period: yes
- Contains PII: no
- Premium table: yes
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=d3413c87b8b0b20213618c358f01c5ce3bc4fb8dae680bb7e04bbdf69986d819

### Fetch periods

- `CONTINUOUS`

### Columns (26)

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
- `sort_by` (`TEXT`, required)
- `topic_sentiment` (`TEXT`, required)
- `topic` (`TEXT`, required)
- `subtopic_rank` (`NUMBER`, required)
- `subtopic` (`TEXT`, required)
- `subtopic_number_of_mentions` (`NUMBER`, nullable)
- `subtopic_occurrence_percentage` (`NUMBER`, nullable)
- `subtopic_review_snippet_1` (`TEXT`, nullable)
- `subtopic_review_snippet_2` (`TEXT`, nullable)
- `subtopic_review_snippet_3` (`TEXT`, nullable)

## Vendor Central

Customer Feedback review subtopics for a child ASIN. Subtopics stay under the topic Amazon returned. There is no extra subtopic for reviews that do not match a returned subtopic. Percentages are the source values and are not additive.

- Source type: `VENDOR_CENTRAL`
- Source ID: `d3413c87b8b0b20213618c358f01c5ce3bc4fb8dae680bb7e04bbdf69986d819`
- Requires a date period: yes
- Contains PII: no
- Premium table: yes
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=VENDOR_CENTRAL&table=d3413c87b8b0b20213618c358f01c5ce3bc4fb8dae680bb7e04bbdf69986d819

### Fetch periods

- `CONTINUOUS`

### Columns (26)

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
- `sort_by` (`TEXT`, required)
- `topic_sentiment` (`TEXT`, required)
- `topic` (`TEXT`, required)
- `subtopic_rank` (`NUMBER`, required)
- `subtopic` (`TEXT`, required)
- `subtopic_number_of_mentions` (`NUMBER`, nullable)
- `subtopic_occurrence_percentage` (`NUMBER`, nullable)
- `subtopic_review_snippet_1` (`TEXT`, nullable)
- `subtopic_review_snippet_2` (`TEXT`, nullable)
- `subtopic_review_snippet_3` (`TEXT`, nullable)

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
