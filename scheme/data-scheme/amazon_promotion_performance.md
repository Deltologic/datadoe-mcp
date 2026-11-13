# Promotion Performance

- BigQuery table name: `amazon_promotion_performance`
- Available in: Seller Central, Vendor Central
- Data scheme index: ../data-scheme.md

This table exists in 2 source types. Each section below describes one of them.

## Seller Central

Seller and vendor promotion performance for Best Deal, Lightning Deal, Price Discount, and related deal types. One row per promotion and ASIN. Glance views, units, funding, and revenue at promotion level repeat on every ASIN row; use the product_ columns for the ASIN. amount_spent is vendor funding. Seller revenue matches Seller Central sales. Configuration lives on amazon_promotions.

- Source type: `SELLER_CENTRAL`
- Source ID: `8a1c593aeb0211c8ded1c3d073639d15e6a0a88c63076d3894502f2d585a1eae`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=8a1c593aeb0211c8ded1c3d073639d15e6a0a88c63076d3894502f2d585a1eae

### Fetch periods

- `INITIAL` (714 days, shifted by 1 days)
- `RECURRING_DAILY` (714 days, shifted by 1 days)

### Search aliases

- lightning deal
- best deal
- price discount

### Columns (32)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `promotion_id` (`TEXT`, required)
- `promotion_name` (`TEXT`, nullable) — Customer-facing promotion name.
- `vendor_code` (`TEXT`, nullable) — Vendor code on the promotion funding agreement. Empty for sellers.
- `merchant_id` (`TEXT`, nullable) — Seller merchant customer id on the funding agreement. Empty for vendors.
- `promotions_api_mapping_id` (`TEXT`, nullable) — Identifier for joining this promotion to amazon_promotions.
- `promotion_type` (`TEXT`, nullable) — BEST_DEAL, LIGHTNING_DEAL, PRICE_DISCOUNT, DEAL_OF_THE_DAY, SALES_DISCOUNT, COUPON, or PROMO_CODE. Vendors commonly use Best Deal, Lightning Deal, and Price Discount. Sellers commonly use Best Deal and Lightning Deal.
- `promotion_status` (`TEXT`, nullable) — APPROVED, PENDING_APPROVAL, NEEDS_YOUR_ATTENTION, or CANCELED.
- `funding_agreement_id` (`TEXT`, nullable) — Vendor funding agreement id. Empty for sellers.
- `glance_views` (`NUMBER`, nullable) — Detail-page views across all ASINs in the promotion. Promotion-level value repeated on every ASIN row. Use the product_ columns for this ASIN, and aggregate by promotion_id before summing promotion totals.
- `units_sold` (`NUMBER`, nullable) — Units sold across all ASINs in the promotion. Promotion-level value repeated on every ASIN row. Use the product_ columns for this ASIN, and aggregate by promotion_id before summing promotion totals.
- `amount_spent` (`NUMBER`, nullable) — Vendor funding across the promotion. Empty for sellers. Promotion-level value repeated on every ASIN row. Use the product_ columns for this ASIN, and aggregate by promotion_id before summing promotion totals.
- `amount_spent_currency` (`TEXT`, nullable) — ISO 4217 currency of amount_spent.
- `revenue` (`NUMBER`, nullable) — Revenue across all ASINs in the promotion. For sellers this matches Seller Central sales. Promotion-level value repeated on every ASIN row. Use the product_ columns for this ASIN, and aggregate by promotion_id before summing promotion totals.
- `revenue_currency` (`TEXT`, nullable) — ISO 4217 currency of revenue.
- `start_date_time` (`DATE`, nullable) — Promotion start in UTC. Use this column for date filtering; the table has no date column.
- `end_date_time` (`DATE`, nullable) — Promotion end in UTC.
- `created_date_time` (`DATE`, nullable) — When the promotion was created, in UTC.
- `last_updated_date_time` (`DATE`, nullable) — When Amazon last updated the promotion, in UTC. Can lag the current time by about a day.
- `asin` (`TEXT`, required) — Child ASIN included in the promotion. One row per ASIN.
- `product_name` (`TEXT`, nullable)
- `product_glance_views` (`NUMBER`, nullable) — Detail-page views for this ASIN during the promotion.
- `product_units_sold` (`NUMBER`, nullable) — Units of this ASIN sold at the promotional price.
- `product_amount_spent` (`NUMBER`, nullable) — Vendor funding for this ASIN. Empty for sellers.
- `product_amount_spent_currency` (`TEXT`, nullable) — ISO 4217 currency of product_amount_spent.
- `product_revenue` (`NUMBER`, nullable) — Revenue for this ASIN. For sellers this matches Seller Central sales.
- `product_revenue_currency` (`TEXT`, nullable) — ISO 4217 currency of product_revenue.

## Vendor Central

Seller and vendor promotion performance for Best Deal, Lightning Deal, Price Discount, and related deal types. One row per promotion and ASIN. Glance views, units, funding, and revenue at promotion level repeat on every ASIN row; use the product_ columns for the ASIN. amount_spent is vendor funding. Seller revenue matches Seller Central sales. Configuration lives on amazon_promotions.

- Source type: `VENDOR_CENTRAL`
- Source ID: `8a1c593aeb0211c8ded1c3d073639d15e6a0a88c63076d3894502f2d585a1eae`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=VENDOR_CENTRAL&table=8a1c593aeb0211c8ded1c3d073639d15e6a0a88c63076d3894502f2d585a1eae

### Fetch periods

- `INITIAL` (714 days, shifted by 1 days)
- `RECURRING_DAILY` (714 days, shifted by 1 days)

### Search aliases

- lightning deal
- best deal
- price discount

### Columns (32)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `promotion_id` (`TEXT`, required)
- `promotion_name` (`TEXT`, nullable) — Customer-facing promotion name.
- `vendor_code` (`TEXT`, nullable) — Vendor code on the promotion funding agreement. Empty for sellers.
- `merchant_id` (`TEXT`, nullable) — Seller merchant customer id on the funding agreement. Empty for vendors.
- `promotions_api_mapping_id` (`TEXT`, nullable) — Identifier for joining this promotion to amazon_promotions.
- `promotion_type` (`TEXT`, nullable) — BEST_DEAL, LIGHTNING_DEAL, PRICE_DISCOUNT, DEAL_OF_THE_DAY, SALES_DISCOUNT, COUPON, or PROMO_CODE. Vendors commonly use Best Deal, Lightning Deal, and Price Discount. Sellers commonly use Best Deal and Lightning Deal.
- `promotion_status` (`TEXT`, nullable) — APPROVED, PENDING_APPROVAL, NEEDS_YOUR_ATTENTION, or CANCELED.
- `funding_agreement_id` (`TEXT`, nullable) — Vendor funding agreement id. Empty for sellers.
- `glance_views` (`NUMBER`, nullable) — Detail-page views across all ASINs in the promotion. Promotion-level value repeated on every ASIN row. Use the product_ columns for this ASIN, and aggregate by promotion_id before summing promotion totals.
- `units_sold` (`NUMBER`, nullable) — Units sold across all ASINs in the promotion. Promotion-level value repeated on every ASIN row. Use the product_ columns for this ASIN, and aggregate by promotion_id before summing promotion totals.
- `amount_spent` (`NUMBER`, nullable) — Vendor funding across the promotion. Empty for sellers. Promotion-level value repeated on every ASIN row. Use the product_ columns for this ASIN, and aggregate by promotion_id before summing promotion totals.
- `amount_spent_currency` (`TEXT`, nullable) — ISO 4217 currency of amount_spent.
- `revenue` (`NUMBER`, nullable) — Revenue across all ASINs in the promotion. For sellers this matches Seller Central sales. Promotion-level value repeated on every ASIN row. Use the product_ columns for this ASIN, and aggregate by promotion_id before summing promotion totals.
- `revenue_currency` (`TEXT`, nullable) — ISO 4217 currency of revenue.
- `start_date_time` (`DATE`, nullable) — Promotion start in UTC. Use this column for date filtering; the table has no date column.
- `end_date_time` (`DATE`, nullable) — Promotion end in UTC.
- `created_date_time` (`DATE`, nullable) — When the promotion was created, in UTC.
- `last_updated_date_time` (`DATE`, nullable) — When Amazon last updated the promotion, in UTC. Can lag the current time by about a day.
- `asin` (`TEXT`, required) — Child ASIN included in the promotion. One row per ASIN.
- `product_name` (`TEXT`, nullable)
- `product_glance_views` (`NUMBER`, nullable) — Detail-page views for this ASIN during the promotion.
- `product_units_sold` (`NUMBER`, nullable) — Units of this ASIN sold at the promotional price.
- `product_amount_spent` (`NUMBER`, nullable) — Vendor funding for this ASIN. Empty for sellers.
- `product_amount_spent_currency` (`TEXT`, nullable) — ISO 4217 currency of product_amount_spent.
- `product_revenue` (`NUMBER`, nullable) — Revenue for this ASIN. For sellers this matches Seller Central sales.
- `product_revenue_currency` (`TEXT`, nullable) — ISO 4217 currency of product_revenue.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
