# Coupon Performance

- BigQuery table name: `amazon_coupon_performance`
- Available in: Seller Central, Vendor Central
- Data scheme index: ../data-scheme.md

This table exists in 2 source types. Each section below describes one of them.

## Seller Central

Seller and vendor coupon performance, one row per coupon and ASIN. Includes clips, redemptions, budget, and the ASIN discount. Campaign and coupon totals repeat on every ASIN row. Vendor rows carry campaign, vendor code, and Subscribe and Save; sales is seller coupon revenue. Filter on start_date_time. Join amazon_promotions on promotions_api_mapping_id.

- Source type: `SELLER_CENTRAL`
- Source ID: `7076aeafd23f0805afb91c4ecef994d7a0d2e796e06852391bc28de680e71aaa`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=7076aeafd23f0805afb91c4ecef994d7a0d2e796e06852391bc28de680e71aaa

### Fetch periods

- `INITIAL` (714 days, shifted by 1 days)
- `RECURRING_DAILY` (714 days, shifted by 1 days)

### Search aliases

- coupons
- clips
- redemptions

### Columns (34)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `campaign_id` (`TEXT`, required) — Vendor coupon campaign id. Empty string on seller coupons, which have no campaign.
- `campaign_name` (`TEXT`, nullable) — Vendor coupon campaign name. Empty on seller coupons.
- `vendor_code` (`TEXT`, nullable) — Amazon vendor code on the coupon campaign. Empty on seller coupons.
- `is_subscribe_and_save` (`LOGIC`, nullable) — Whether the vendor campaign is a Subscribe and Save offer. Empty on seller coupons.
- `budget_type` (`TEXT`, nullable) — Vendor campaign budget allocation: PER_INDIVIDUAL_COUPON or SHARED_BUDGET. Empty on seller coupons.
- `campaign_total_clips` (`NUMBER`, nullable) — Sum of clips across coupons in the vendor campaign. Campaign-level value repeated on every coupon and ASIN row. Aggregate by campaign_id before summing.
- `campaign_total_redemptions` (`NUMBER`, nullable) — Sum of redemptions across coupons in the vendor campaign. Campaign-level value repeated on every coupon and ASIN row. Aggregate by campaign_id before summing.
- `currency_code` (`TEXT`, nullable) — ISO 4217 currency of the coupon amounts.
- `coupon_id` (`TEXT`, required)
- `coupon_name` (`TEXT`, nullable)
- `website_message` (`TEXT`, nullable) — Message displayed with the coupon on the product page.
- `start_date_time` (`DATE`, nullable) — Coupon start in UTC. Use this column for date filtering; the table has no date column.
- `end_date_time` (`DATE`, nullable) — Coupon end in UTC.
- `is_once_per_customer` (`LOGIC`, nullable) — Whether a vendor coupon can be redeemed once per customer account. Empty on seller coupons.
- `customer_segment` (`TEXT`, nullable) — Customers who can clip the coupon. Examples: All (Default), Amazon Prime, Amazon Student.
- `clips` (`NUMBER`, nullable) — Times customers applied the coupon on the product page. Coupon-level value repeated on every ASIN row of the coupon. Aggregate by coupon_id before summing.
- `redemptions` (`NUMBER`, nullable) — Times the coupon was used for a purchase, including returned and cancelled orders. Coupon-level value repeated on every ASIN row of the coupon. Aggregate by coupon_id before summing.
- `budget` (`NUMBER`, nullable) — Budget allocated to the coupon for discounts and clip or redemption fees. Present for seller coupons and for vendor campaigns with PER_INDIVIDUAL_COUPON. Empty when the vendor campaign uses SHARED_BUDGET.
- `total_discount` (`NUMBER`, nullable) — Amount customers saved with the coupon, including returned and cancelled orders. Coupon-level value repeated on every ASIN row of the coupon. Aggregate by coupon_id before summing.
- `budget_spent` (`NUMBER`, nullable) — Amount spent on the coupon, including clip fees and redemption fees, and including returned and cancelled orders. Coupon-level value repeated on every ASIN row of the coupon. Aggregate by coupon_id before summing.
- `budget_remaining` (`NUMBER`, nullable) — budget minus budget_spent. Empty when the vendor campaign uses SHARED_BUDGET.
- `budget_percentage_used` (`NUMBER`, nullable) — Percent of allocated budget spent, on a 0-100 scale. A value of 0.4 means 0.4 percent. For a shared vendor budget this is versus the campaign budget.
- `sales` (`NUMBER`, nullable) — Seller coupon revenue after the discount, including returned and cancelled orders. Empty on vendor coupons. Coupon-level value repeated on every ASIN row of the coupon. Aggregate by coupon_id before summing.
- `merchant_id` (`TEXT`, nullable) — Seller merchant customer id. Empty on vendor coupons.
- `promotions_api_mapping_id` (`TEXT`, nullable) — Identifier for joining this coupon to amazon_promotions.
- `asin` (`TEXT`, required) — Child ASIN included in the coupon. One row per ASIN.
- `discount_type` (`TEXT`, nullable) — PERCENT_OFF_LIST_PRICE or AMOUNT_OFF_LIST_PRICE for this ASIN.
- `discount_amount` (`NUMBER`, nullable) — Customer discount on this ASIN. A percent of list price when discount_type is PERCENT_OFF_LIST_PRICE (10 means 10 percent). A currency amount when discount_type is AMOUNT_OFF_LIST_PRICE.

## Vendor Central

Seller and vendor coupon performance, one row per coupon and ASIN. Includes clips, redemptions, budget, and the ASIN discount. Campaign and coupon totals repeat on every ASIN row. Vendor rows carry campaign, vendor code, and Subscribe and Save; sales is seller coupon revenue. Filter on start_date_time. Join amazon_promotions on promotions_api_mapping_id.

- Source type: `VENDOR_CENTRAL`
- Source ID: `7076aeafd23f0805afb91c4ecef994d7a0d2e796e06852391bc28de680e71aaa`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=VENDOR_CENTRAL&table=7076aeafd23f0805afb91c4ecef994d7a0d2e796e06852391bc28de680e71aaa

### Fetch periods

- `INITIAL` (714 days, shifted by 1 days)
- `RECURRING_DAILY` (714 days, shifted by 1 days)

### Search aliases

- coupons
- clips
- redemptions

### Columns (34)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `campaign_id` (`TEXT`, required) — Vendor coupon campaign id. Empty string on seller coupons, which have no campaign.
- `campaign_name` (`TEXT`, nullable) — Vendor coupon campaign name. Empty on seller coupons.
- `vendor_code` (`TEXT`, nullable) — Amazon vendor code on the coupon campaign. Empty on seller coupons.
- `is_subscribe_and_save` (`LOGIC`, nullable) — Whether the vendor campaign is a Subscribe and Save offer. Empty on seller coupons.
- `budget_type` (`TEXT`, nullable) — Vendor campaign budget allocation: PER_INDIVIDUAL_COUPON or SHARED_BUDGET. Empty on seller coupons.
- `campaign_total_clips` (`NUMBER`, nullable) — Sum of clips across coupons in the vendor campaign. Campaign-level value repeated on every coupon and ASIN row. Aggregate by campaign_id before summing.
- `campaign_total_redemptions` (`NUMBER`, nullable) — Sum of redemptions across coupons in the vendor campaign. Campaign-level value repeated on every coupon and ASIN row. Aggregate by campaign_id before summing.
- `currency_code` (`TEXT`, nullable) — ISO 4217 currency of the coupon amounts.
- `coupon_id` (`TEXT`, required)
- `coupon_name` (`TEXT`, nullable)
- `website_message` (`TEXT`, nullable) — Message displayed with the coupon on the product page.
- `start_date_time` (`DATE`, nullable) — Coupon start in UTC. Use this column for date filtering; the table has no date column.
- `end_date_time` (`DATE`, nullable) — Coupon end in UTC.
- `is_once_per_customer` (`LOGIC`, nullable) — Whether a vendor coupon can be redeemed once per customer account. Empty on seller coupons.
- `customer_segment` (`TEXT`, nullable) — Customers who can clip the coupon. Examples: All (Default), Amazon Prime, Amazon Student.
- `clips` (`NUMBER`, nullable) — Times customers applied the coupon on the product page. Coupon-level value repeated on every ASIN row of the coupon. Aggregate by coupon_id before summing.
- `redemptions` (`NUMBER`, nullable) — Times the coupon was used for a purchase, including returned and cancelled orders. Coupon-level value repeated on every ASIN row of the coupon. Aggregate by coupon_id before summing.
- `budget` (`NUMBER`, nullable) — Budget allocated to the coupon for discounts and clip or redemption fees. Present for seller coupons and for vendor campaigns with PER_INDIVIDUAL_COUPON. Empty when the vendor campaign uses SHARED_BUDGET.
- `total_discount` (`NUMBER`, nullable) — Amount customers saved with the coupon, including returned and cancelled orders. Coupon-level value repeated on every ASIN row of the coupon. Aggregate by coupon_id before summing.
- `budget_spent` (`NUMBER`, nullable) — Amount spent on the coupon, including clip fees and redemption fees, and including returned and cancelled orders. Coupon-level value repeated on every ASIN row of the coupon. Aggregate by coupon_id before summing.
- `budget_remaining` (`NUMBER`, nullable) — budget minus budget_spent. Empty when the vendor campaign uses SHARED_BUDGET.
- `budget_percentage_used` (`NUMBER`, nullable) — Percent of allocated budget spent, on a 0-100 scale. A value of 0.4 means 0.4 percent. For a shared vendor budget this is versus the campaign budget.
- `sales` (`NUMBER`, nullable) — Seller coupon revenue after the discount, including returned and cancelled orders. Empty on vendor coupons. Coupon-level value repeated on every ASIN row of the coupon. Aggregate by coupon_id before summing.
- `merchant_id` (`TEXT`, nullable) — Seller merchant customer id. Empty on vendor coupons.
- `promotions_api_mapping_id` (`TEXT`, nullable) — Identifier for joining this coupon to amazon_promotions.
- `asin` (`TEXT`, required) — Child ASIN included in the coupon. One row per ASIN.
- `discount_type` (`TEXT`, nullable) — PERCENT_OFF_LIST_PRICE or AMOUNT_OFF_LIST_PRICE for this ASIN.
- `discount_amount` (`NUMBER`, nullable) — Customer discount on this ASIN. A percent of list price when discount_type is PERCENT_OFF_LIST_PRICE (10 means 10 percent). A currency amount when discount_type is AMOUNT_OFF_LIST_PRICE.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
