# Replenishment Metrics by Date (SnS)

- BigQuery table name: `amazon_replenishment_metrics_by_date`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

Amazon Subscribe & Save PERFORMANCE metrics by calendar day. Date is the metric aggregation day, not order date or ship date. total_subscriptions_revenue is SnS program revenue for that day; Amazon does not label it as ordered or shipped sales. shipped_subscription_units is the shipped-units metric. revenue_penetration is SnS program revenue as a percentage of total product revenue.

- Source type: `SELLER_CENTRAL`
- Source ID: `18bbce497127e8eecc6ab435fdbcaa72cf6dd66b313517749f4d33c0ad0169b1`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=18bbce497127e8eecc6ab435fdbcaa72cf6dd66b313517749f4d33c0ad0169b1

## Fetch periods

- `CONTINUOUS`

## Columns (46)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `date` (`DATE`, required) — ISO calendar day of the Subscribe & Save PERFORMANCE metric from SP-API Replenishment. Not order date or ship date.
- `period_start_date` (`DATE`, required) — Start of the Amazon metric time interval (same calendar day for DAY aggregation).
- `period_end_date` (`DATE`, required) — End of the Amazon metric time interval (same calendar day for DAY aggregation).
- `amazon_replenishment_program_type` (`TEXT`, required) — Always SUBSCRIBE_AND_SAVE.
- `amazon_replenishment_time_period_type` (`TEXT`, required) — Always PERFORMANCE (historical metrics, not forecast).
- `amazon_replenishment_aggregation_frequency` (`TEXT`, required) — Always DAY.
- `currency_code` (`TEXT`, required)
- `last_seen_at` (`DATE`, required)
- `not_delivered_due_to_oos` (`NUMBER`, required) — Share of Subscribe & Save items not shipped because of out of stock, relative to shipped subscription units for the metric day (Amazon notDeliveredDueToOOS).
- `total_subscriptions_revenue` (`NUMBER`, required) — Subscribe & Save subscription revenue for the metric day. Amazon does not label this as ordered or shipped sales; it is program revenue over the aggregation period. Use shipped_subscription_units for shipped units.
- `shipped_subscription_units` (`NUMBER`, required) — Subscribe & Save units shipped to subscribers during the metric day. This is the shipped-units metric; total_subscriptions_revenue is not documented as shipped dollars.
- `active_subscriptions` (`NUMBER`, required) — Number of active Subscribe & Save subscriptions at the end of the metric day.
- `subscriber_average_revenue` (`NUMBER`, required) — Average revenue per Subscribe & Save subscriber over the past 12 months for sellers and 6 months for vendors.
- `non_subscriber_average_revenue` (`NUMBER`, required) — Average revenue per non-subscriber over the past 12 months for sellers and 6 months for vendors.
- `lost_revenue_due_to_oos` (`NUMBER`, required) — Subscribe & Save revenue that would have been generated if the offer had not been out of stock.
- `subscriber_average_reorders` (`NUMBER`, required) — Average reorders per Subscribe & Save subscriber over the past 12 months.
- `non_subscriber_average_reorders` (`NUMBER`, required) — Average reorders per non-subscriber over the past 12 months.
- `coupons_revenue_penetration` (`NUMBER`, required) — Percentage of revenue from ASINs with coupons out of total revenue from all ASINs (0-100).
- `revenue_from_subscriptions_with_multiple_deliveries` (`NUMBER`, required) — Subscribe & Save revenue from subscriptions with more than two deliveries over the past 12 months.
- `revenue_from_active_subscriptions_with_single_delivery` (`NUMBER`, required) — Subscribe & Save revenue from active subscriptions with one delivery over the past 12 months.
- `revenue_from_cancelled_subscriptions_after_single_delivery` (`NUMBER`, required) — Subscribe & Save revenue from subscriptions cancelled after one delivery over the past 12 months.
- `subscriber_retention_for_30_days` (`NUMBER`, required) — Percentage of subscriptions retained 30 days after subscription creation (0-100).
- `subscriber_retention_for_90_days` (`NUMBER`, required) — Percentage of subscriptions retained 90 days after subscription creation (0-100).
- `revenue_penetration_for_0_percent_seller_funding` (`NUMBER`, required) — Percentage of Subscribe & Save revenue from offers with 0% seller-funded discount over the past 12 months (0-100).
- `revenue_penetration_for_5_percent_seller_funding` (`NUMBER`, required) — Seller-only. Percentage of Subscribe & Save revenue from offers with 5% seller-funded discount over the past 12 months (0-100).
- `revenue_penetration_for_10_percent_seller_funding` (`NUMBER`, required) — Seller-only. Percentage of Subscribe & Save revenue from offers with 10% seller-funded discount over the past 12 months (0-100).
- `revenue_penetration_for_5_plus_percent_seller_funding` (`NUMBER`, required) — Vendor-only. Percentage of Subscribe & Save revenue from offers with 5% or higher seller-funded discount over the past 12 months (0-100).
- `share_of_coupon_subscriptions` (`NUMBER`, required) — Percentage of new Subscribe & Save subscriptions that came from coupons (0-100).
- `non_subscriber_lifetime_value_from_otp` (`NUMBER`, required) — Revenue from one-time purchases by customers who have never subscribed to products in this catalog.
- `lost_subscriber_lifetime_value_from_otp` (`NUMBER`, required) — One-time purchase revenue from customers who previously subscribed but currently have no active subscriptions in this catalog.
- `lost_subscriber_lifetime_value_from_sns` (`NUMBER`, required) — Subscribe & Save revenue from customers who previously subscribed but currently have no active subscriptions in this catalog.
- `growing_subscriber_lifetime_value_from_otp` (`NUMBER`, required) — One-time purchase revenue from customers whose first subscription in this catalog started in the past 12 months.
- `growing_subscriber_lifetime_value_from_sns` (`NUMBER`, required) — Subscribe & Save revenue from customers whose first subscription in this catalog started in the past 12 months.
- `established_subscriber_lifetime_value_from_otp` (`NUMBER`, required) — One-time purchase revenue from customers with an active subscription in this catalog for more than 12 months.
- `established_subscriber_lifetime_value_from_sns` (`NUMBER`, required) — Subscribe & Save revenue from customers with an active subscription in this catalog for more than 12 months.
- `signup_conversion_for_0_percent_seller_funding` (`NUMBER`, required) — Percentage of new subscriptions from offers with 0% seller-funded discount out of new orders over the past 12 months (0-100).
- `signup_conversion_for_5_percent_seller_funding` (`NUMBER`, required) — Seller-only. Percentage of new subscriptions from offers with 5% seller-funded discount out of new orders over the past 12 months (0-100).
- `signup_conversion_for_10_percent_seller_funding` (`NUMBER`, required) — Seller-only. Percentage of new subscriptions from offers with 10% seller-funded discount out of new orders over the past 12 months (0-100).
- `signup_conversion_for_5_plus_percent_seller_funding` (`NUMBER`, required) — Vendor-only. Percentage of new subscriptions from offers with 5% or higher seller-funded discount out of new orders over the past 12 months (0-100).
- `revenue_penetration` (`NUMBER`, required) — Subscribe & Save program revenue as a percentage of total product revenue for the same grain and day (0-100). Denominator is total product revenue (SnS plus non-SnS), not total seller revenue.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
