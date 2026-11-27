# Conversion by ASIN & Date

- BigQuery table name: `amazon_conversion_by_asin_and_date`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

Daily child ASIN conversion for Amazon seller accounts. The BigQuery view grain is organization_id, store_id, sp_connection_id, marketplace, child ASIN and purchase date in the marketplace time zone. Exports, the REST API and MCP do not return organization_id, store_id or sp_connection_id. They identify the account with seller_or_vendor_id and marketplace_seller_id. True CVR counts each valid order once per child ASIN. Automatic Subscribe and Save renewals stay in recurring_subscription_orders. Amazon Unit Session Percentage counts units, including renewals and orders with several units. Sum the count columns, then divide, when you roll up a week, a month or several ASINs. Do not average the daily percentages. Include a day in both sums, or in neither. For example, 10 customer-initiated orders and 100 sessions on one day, then 10 orders on a day whose sessions are not published, is not a 20% rate. SQL skips empty sessions, so the summed orders would include both days while the sessions include only the first. Add orders and sessions for the same published days, or leave the period rate empty. When a period includes unknown orders, leave true_cvr empty for that period, or use true_cvr_lower and true_cvr_upper. The lower bound leaves unknown orders out. The upper bound counts them as customer-initiated. maturity_status uses the current date, so it can change when the data does not. Sales and Traffic usually arrives one or two days after the purchase date, so recent days can show orders with traffic_status not_published and blank rates. methodology_version is v1. This is a premium table.

- Source type: `SELLER_CENTRAL`
- Source ID: `8b30b1db5cb33ff5d18405ee8e7a6e335e6a1b974abf91cf8fbd2dc79931f9b5`
- Requires a date period: yes
- Contains PII: no
- Premium table: yes
- User-managed: no
- Default dataset: yes
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=8b30b1db5cb33ff5d18405ee8e7a6e335e6a1b974abf91cf8fbd2dc79931f9b5

## Fetch periods

- `CONTINUOUS`

## Data availability

- `REAL_TIME` — Orders are available up to 1 hour after being placed. Sales and Traffic usually arrives one or two days after the purchase date, so recent days can show orders without sessions. Refresh: Orders at 10am, 1pm, 4pm and 7pm. Sales and Traffic at 10am, 1pm and 4pm..

## Search aliases

- true cvr
- conversion rate
- unit session percentage
- subscribe and save
- subscription renewal

## Columns (39)

- `date` (`DATE`, required) — Purchase date in the marketplace time zone. This is also the Sales and Traffic report date.
- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `child_asin` (`TEXT`, required)
- `parent_asin` (`TEXT`, nullable) — Parent ASIN from Sales and Traffic. Empty when this child ASIN has no traffic row.
- `product_name` (`TEXT`, nullable) — Product name from Sales and Traffic when that row exists, otherwise the order line.
- `sessions` (`NUMBER`, nullable) — Sales and Traffic sessions. 0 when Amazon published traffic for the connection, marketplace and day but this ASIN has no row. Empty when traffic for that day is not published yet.
- `sessions_b2b` (`NUMBER`, nullable) — Amazon Business sessions. Same empty-versus-zero rule as sessions.
- `page_views` (`NUMBER`, nullable) — Sales and Traffic page views. Same empty-versus-zero rule as sessions.
- `units_ordered` (`NUMBER`, nullable) — Business Reports units ordered. Same empty-versus-zero rule as sessions. Kept separate from order_units.
- `amazon_total_order_items` (`NUMBER`, nullable) — Amazon Total Order Items from Sales and Traffic, kept so you can reconcile it with distinct_valid_orders.
- `traffic_status` (`TEXT`, required) — reported when this ASIN has a Sales and Traffic row. zero when Amazon published traffic for the connection, marketplace and day but this ASIN has no row. not_published when that day has no published traffic.
- `order_units` (`NUMBER`, required) — Sum of quantity on valid order lines. Kept separate from units_ordered.
- `distinct_valid_orders` (`NUMBER`, required) — Distinct valid orders for this child ASIN. An order with several units counts once. An order with several ASINs counts once per ASIN.
- `regular_orders` (`NUMBER`, required) — Valid orders whose lines are regular purchases.
- `initial_subscription_orders` (`NUMBER`, required) — Valid orders whose promotion IDs contain Subscribe and Save Promotion V2.
- `recurring_subscription_orders` (`NUMBER`, required) — Valid orders whose promotion IDs contain FBA Subscribe & Save Discount. These are automatic renewals.
- `top_off_orders` (`NUMBER`, required) — Valid orders whose promotion IDs contain top_off.
- `unknown_classification_orders` (`NUMBER`, required) — Valid orders with more than one Subscribe and Save marker, conflicting line classes, or a Pending line with an empty promotion string.
- `customer_initiated_orders` (`NUMBER`, required) — regular_orders plus initial_subscription_orders plus top_off_orders.
- `pending_orders` (`NUMBER`, required) — Valid orders with at least one Pending line.
- `pending_regular_orders` (`NUMBER`, required) — pending_orders classified regular.
- `pending_initial_subscription_orders` (`NUMBER`, required) — pending_orders classified initial_subscription.
- `pending_recurring_subscription_orders` (`NUMBER`, required) — pending_orders classified recurring.
- `pending_top_off_orders` (`NUMBER`, required) — pending_orders classified top_off.
- `pending_unknown_classification_orders` (`NUMBER`, required) — pending_orders classified unknown.
- `unit_session_percentage` (`NUMBER`, nullable) — 100 times units_ordered divided by sessions, rounded to two decimal places. Empty when sessions are empty or 0.
- `order_cvr` (`NUMBER`, nullable) — 100 times distinct_valid_orders divided by sessions, rounded to two decimal places. Empty when sessions are empty or 0.
- `true_cvr` (`NUMBER`, nullable) — 100 times customer_initiated_orders divided by sessions, rounded to two decimal places. Empty when unknown_classification_orders is not 0, or when sessions are empty or 0.
- `true_cvr_lower` (`NUMBER`, nullable) — 100 times customer_initiated_orders divided by sessions, rounded to two decimal places. Unknown orders stay out of the numerator. Empty when sessions are empty or 0.
- `true_cvr_upper` (`NUMBER`, nullable) — 100 times customer_initiated_orders plus unknown_classification_orders, divided by sessions, rounded to two decimal places. Empty when sessions are empty or 0.
- `recurring_order_share` (`NUMBER`, nullable) — 100 times recurring_subscription_orders divided by distinct_valid_orders, rounded to two decimal places. Empty when distinct_valid_orders is 0.
- `data_as_of` (`DATE`, nullable) — Latest order-line or Sales and Traffic update time for this row.
- `maturity_status` (`TEXT`, required) — provisional for 0 to 7 days, maturing for 8 to 14 days, mature for 15 to 30 days, and stable after 30 days. It uses the current date, so it can change when the data does not.
- `methodology_version` (`TEXT`, required) — Classification and metric rules version. v1 classifies Subscribe and Save from promotion IDs.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
