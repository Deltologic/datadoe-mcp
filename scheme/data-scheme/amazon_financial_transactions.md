# Amazon Financial Transactions

- BigQuery table name: `amazon_financial_transactions`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

Seller Central finances transactions, one latest stored row per transaction id on a DataDoe connection. A hold and its release stay as separate rows when Amazon gives them separate ids. total_amount is the signed total Amazon sent, once per row, in the reported currency. Summing every row counts a hold and its release twice and mixes Transfers with sales. For a deferred forecast, use is_outstanding_deferred = TRUE, group by currency, and keep rows with an empty expected_release_at or total_amount. posted_at is the UTC posting time of this transaction id. date is that instant as a marketplace-local calendar date, with America/Los_Angeles for the US and Canada, and Export from and to filters use date. expected_release_at is the maturity time Amazon reported while the transaction is deferred. It can change and is not a bank deposit time. is_outstanding_deferred is true only for a stored DEFERRED status with no stored release. The first finances load reads 370 one-day posted windows, the daily load reads 8 one-day windows, and the 10am and 4pm loads read 2 posted days in the marketplace time zone. Those are start times, not a promise of when the row appears. Deferred rows outside those windows can keep an old status, reason, or maturity time. A later release row can clear a known hold. This table does not list every current hold at Amazon. Sums skip empty amounts.

- Source type: `SELLER_CENTRAL`
- Source ID: `3f67a61127b23010777ff4b6656c02b498fe168fca652c6aa736540b269aa70e`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: yes
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=3f67a61127b23010777ff4b6656c02b498fe168fca652c6aa736540b269aa70e

## Fetch periods

- `INITIAL` (370 days)
- `RECURRING_DAILY` (8 days)

## Data availability

- `INTRADAY` — The daily fetch starts at 2am and rereads 8 days. Fetches also start at 10am and 4pm, including weekends, and reread 2 days, including the current day. US and Canada use Pacific time (America/Los_Angeles) for the 10am and 4pm fetches, including daylight saving. Other marketplaces use their local time zone. Amazon may leave out orders from the last 48 hours. These times are when the fetch starts. Rows appear after Amazon publishes them and after DataDoe finishes processing and export. Refresh: 2am, 10am, 4pm.

## Search aliases

- deferred
- cash flow
- finances
- transaction

## Columns (34)

- `seller_or_vendor_id` (`TEXT`, nullable) — Public DataDoe account id for MCP, API, and Export account selection. Empty when the connection context cannot be resolved.
- `seller_or_vendor_name` (`TEXT`, nullable) — Display name of the DataDoe account. Empty when the context cannot be resolved.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon seller id from the connection. This is not the public DataDoe account id.
- `marketplace_id` (`TEXT`, nullable) — Amazon marketplace id stored for this transaction. The view does not change the collector attribution.
- `marketplace_country_code` (`TEXT`, nullable) — ISO country code from marketplace_id.
- `marketplace_country_name` (`TEXT`, nullable) — Country name from marketplace_id.
- `transaction_id` (`TEXT`, required) — Amazon transaction id. One row is the latest stored copy of this id on the connection.
- `transaction_type` (`TEXT`, nullable) — Amazon transaction type, including Transfer and types Amazon adds later. Blank becomes empty.
- `transaction_status` (`TEXT`, nullable) — Amazon status, including DEFERRED, RELEASED, DEFERRED_RELEASED, and later values. Blank stays empty. A missing status is not treated as RELEASED.
- `posted_at` (`DATE`, nullable) — UTC time Amazon posted this transaction id. This is not the order date, the expected release time, or the bank deposit time.
- `date` (`DATE`, nullable) — Marketplace-local calendar date of posted_at. US and Canada use America/Los_Angeles. Export from and to filters use this column. Empty when posted_at is missing.
- `total_amount` (`NUMBER`, nullable) — Signed transaction total from Amazon, once for the transaction. Zero stays zero. Empty when Amazon omits the amount. This is not a sum of nested breakdowns and it is not converted to another currency.
- `currency` (`TEXT`, nullable) — Currency Amazon reported on the transaction total. Empty when Amazon omits it.
- `business_store_name` (`TEXT`, nullable) — BusinessContext storeName, preserved verbatim. Known values include AMAZON_HAUL and AMAZON_FBA_FROM_ORIGIN. Later values are allowed. NULL when no nonempty string is present or distinct names conflict. Identical names count once. Empty or missing context does not establish a program. AmazonPayContext is excluded.
- `business_contexts` (`JSON`, required) — Full transaction BusinessContext entries in source order, including duplicates and unfamiliar fields or values. An empty JSON array when none were sent. Use this evidence when business_store_name is NULL or ambiguous. Other context types are excluded.
- `deferral_reason` (`TEXT`, nullable) — deferralReason from the only DeferredContext. Empty when there is not exactly one distinct DeferredContext, or when that context has no reason. Codes such as DD7 stay as Amazon sent them.
- `expected_release_at` (`DATE`, nullable) — maturityDate from the only DeferredContext, as a UTC instant. Empty when there is not exactly one context, or when the timestamp cannot be parsed. Amazon can change this time. It is not confirmation that the money was released or deposited.
- `deferred_contexts` (`JSON`, required) — DeferredContext entries from the transaction, with contextType, deferralReason, and maturityDate only. Duplicate entries are removed. An invalid maturityDate string is kept here. The array is empty when there is no DeferredContext.
- `deferred_context_count` (`NUMBER`, required) — Number of distinct DeferredContext entries. Zero when there are none. Use this to see when deferral_reason and expected_release_at were left empty because the contexts disagree.
- `related_identifiers` (`JSON`, required) — Related financial identifiers limited to the documented names and their values. The array is empty when there are none.
- `amazon_order_id` (`TEXT`, nullable) — ORDER_ID. Empty when the value is missing or more than one distinct value is stored.
- `shipment_id` (`TEXT`, nullable) — SHIPMENT_ID. Empty when the value is missing or more than one distinct value is stored.
- `financial_event_group_id` (`TEXT`, nullable) — FINANCIAL_EVENT_GROUP_ID. Empty when the value is missing or more than one distinct value is stored.
- `settlement_id` (`TEXT`, nullable) — SETTLEMENT_ID. Empty when the value is missing or more than one distinct value is stored.
- `refund_id` (`TEXT`, nullable) — REFUND_ID. Empty when the value is missing or more than one distinct value is stored.
- `invoice_id` (`TEXT`, nullable) — INVOICE_ID. Empty when the value is missing or more than one distinct value is stored.
- `disbursement_id` (`TEXT`, nullable) — DISBURSEMENT_ID. Empty when the value is missing or more than one distinct value is stored.
- `transfer_id` (`TEXT`, nullable) — TRANSFER_ID. Empty when the value is missing or more than one distinct value is stored.
- `deferred_transaction_id` (`TEXT`, nullable) — DEFERRED_TRANSACTION_ID of the linked hold. Empty when the value is missing or more than one distinct value is stored.
- `release_transaction_id` (`TEXT`, nullable) — RELEASE_TRANSACTION_ID of the linked release. Empty when the value is missing or more than one distinct value is stored.
- `transaction_chain_id` (`TEXT`, nullable) — Shared id for an unambiguous hold and release in this Organization, Store, and connection. Empty when the links conflict, cycle, or attach more than one hold or release. A link to the same transaction id is ignored.
- `is_outstanding_deferred` (`LOGIC`, required) — True only when the stored status is DEFERRED and the stored rows show no release. This is the latest stored observation, not a live Amazon balance. A release outside an Export date range still clears the hold.
- `dt_created` (`DATE`, nullable) — UTC time DataDoe first stored this row. This is not the Amazon posting time.
- `dt_updated` (`DATE`, nullable) — UTC time DataDoe last updated this stored row. A later import can move it. This is not proof of the last Amazon poll.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
