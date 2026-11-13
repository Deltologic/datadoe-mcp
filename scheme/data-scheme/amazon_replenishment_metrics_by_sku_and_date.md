# Replenishment Metrics by SKU & Date

- BigQuery table name: `amazon_replenishment_metrics_by_sku_and_date`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

Amazon Subscribe & Save PERFORMANCE metrics by SKU and calendar day. Date is the metric aggregation day, not order date or ship date. total_subscriptions_revenue is SnS program revenue for that SKU and day; Amazon does not label it as ordered or shipped sales. shipped_subscription_units is the shipped-units metric. revenue_penetration is SnS program revenue as a percentage of total product revenue for that offer.

- Source type: `SELLER_CENTRAL`
- Source ID: `e00006360d84f9b881db981cb543cef7226448931a82d9641d88562edeafb214`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=e00006360d84f9b881db981cb543cef7226448931a82d9641d88562edeafb214

## Fetch periods

- `CONTINUOUS`

## Columns (25)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `date` (`DATE`, required) — ISO calendar day of the Subscribe & Save PERFORMANCE metric from SP-API Replenishment. Not order date or ship date.
- `period_start_date` (`DATE`, required) — Start of the Amazon metric time interval (same calendar day for DAY aggregation).
- `period_end_date` (`DATE`, required) — End of the Amazon metric time interval (same calendar day for DAY aggregation).
- `child_asin` (`TEXT`, required)
- `sku` (`TEXT`, required)
- `amazon_replenishment_program_type` (`TEXT`, required) — Always SUBSCRIBE_AND_SAVE.
- `amazon_replenishment_time_period_type` (`TEXT`, required) — Always PERFORMANCE (historical metrics, not forecast).
- `amazon_replenishment_aggregation_frequency` (`TEXT`, required) — Always DAY.
- `amazon_replenishment_fulfillment_channel_type` (`TEXT`, required) — Seller-only fulfillment channel for the offer: AMAZON (FBA) or MERCHANT (MFN). Not populated for vendors.
- `currency_code` (`TEXT`, required)
- `last_seen_at` (`DATE`, required)
- `not_delivered_due_to_oos` (`NUMBER`, required) — Share of Subscribe & Save items not shipped because of out of stock, relative to shipped subscription units for the metric day (Amazon notDeliveredDueToOOS).
- `total_subscriptions_revenue` (`NUMBER`, required) — Subscribe & Save subscription revenue for the metric day. Amazon does not label this as ordered or shipped sales; it is program revenue over the aggregation period. Use shipped_subscription_units for shipped units.
- `shipped_subscription_units` (`NUMBER`, required) — Subscribe & Save units shipped to subscribers during the metric day. This is the shipped-units metric; total_subscriptions_revenue is not documented as shipped dollars.
- `active_subscriptions` (`NUMBER`, required) — Number of active Subscribe & Save subscriptions at the end of the metric day.
- `revenue_penetration` (`NUMBER`, required) — Subscribe & Save program revenue as a percentage of total product revenue for the same grain and day (0-100). Denominator is total product revenue (SnS plus non-SnS), not total seller revenue.
- `lost_revenue_due_to_oos` (`NUMBER`, required) — Subscribe & Save revenue that would have been generated if the offer had not been out of stock.
- `coupons_revenue_penetration` (`NUMBER`, required) — Percentage of revenue from ASINs with coupons out of total revenue from all ASINs (0-100).
- `share_of_coupon_subscriptions` (`NUMBER`, required) — Percentage of new Subscribe & Save subscriptions that came from coupons (0-100).

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
