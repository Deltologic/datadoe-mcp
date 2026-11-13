# Vendor Direct Fulfillment Orders

- BigQuery table name: `amazon_vendor_df_orders`
- Available in: Vendor Central
- Data scheme index: ../data-scheme.md

Vendor Direct Fulfillment order line items (vendor ships to the customer). One row per line item with order header fields repeated. purchase_order_number is the DF purchase order; customer_order_number is the shopper order.

- Source type: `VENDOR_CENTRAL`
- Source ID: `42ec2de94b0a2f37d37649cef2ce1c458d348cac50c76c1e1dc7011deba88c9e`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=VENDOR_CENTRAL&table=42ec2de94b0a2f37d37649cef2ce1c458d348cac50c76c1e1dc7011deba88c9e

## Fetch periods

- `INITIAL` (30 days)
- `CONTINUOUS`

## Data availability

- `REAL_TIME` — Orders are available up to 1 hour after being placed. Refresh: 10am, 1pm, 4pm, 7pm.

## Search aliases

- direct fulfillment
- df orders

## Columns (57)

- `uploaded_cogs_unit_item_value` (`NUMBER`, nullable) — Your uploaded product cost per single ASIN item. Customer-maintained cost, separate from Amazon-reported wholesale prices, shipped COGS and Net PPM.
- `uploaded_cogs_unit_shipping_value` (`NUMBER`, nullable) — Your uploaded product cost per single ASIN item. Customer-maintained cost, separate from Amazon-reported wholesale prices, shipped COGS and Net PPM.
- `uploaded_cogs_unit_total_value` (`NUMBER`, nullable) — Your uploaded product cost per single ASIN item. Customer-maintained cost, separate from Amazon-reported wholesale prices, shipped COGS and Net PPM.
- `uploaded_cogs_currency` (`TEXT`, nullable) — Your uploaded product cost matching and coverage. Costs use the full scoped variant and effective date. Unknown values remain NULL; backdated corrections restate estimates.
- `uploaded_cogs_effective_from` (`DATE`, nullable) — Your uploaded product cost matching and coverage. Costs use the full scoped variant and effective date. Unknown values remain NULL; backdated corrections restate estimates.
- `uploaded_cogs_present` (`LOGIC`, nullable) — Your uploaded product cost matching and coverage. Costs use the full scoped variant and effective date. Unknown values remain NULL; backdated corrections restate estimates.
- `uploaded_cogs_match_status` (`TEXT`, nullable) — Your uploaded product cost. Reason an applicable cost or complete margin is unavailable. Missing identifiers and equally specific variants are unresolved.
- `uploaded_cogs_vendor_code` (`TEXT`, nullable) — Your uploaded product cost matching and coverage. Costs use the full scoped variant and effective date. Unknown values remain NULL; backdated corrections restate estimates.
- `uploaded_cogs_fulfillment_method` (`TEXT`, nullable) — Your uploaded product cost matching and coverage. Costs use the full scoped variant and effective date. Unknown values remain NULL; backdated corrections restate estimates.
- `uploaded_cogs_purchase_order_number` (`TEXT`, nullable) — Your uploaded product cost matching and coverage. Costs use the full scoped variant and effective date. Unknown values remain NULL; backdated corrections restate estimates.
- `uploaded_cogs_calculation_date` (`DATE`, nullable) — Your uploaded product cost selection date. PO date for projected margins; invoice issue date for invoice and settlement margins. Payment date never selects another cost.
- `uploaded_cogs_quantity_unit` (`TEXT`, nullable) — Your uploaded product cost matching and coverage. Costs use the full scoped variant and effective date. Unknown values remain NULL; backdated corrections restate estimates.
- `uploaded_cogs_item_units` (`NUMBER`, nullable) — Your uploaded product cost matching and coverage. Costs use the full scoped variant and effective date. Unknown values remain NULL; backdated corrections restate estimates.
- `uploaded_cogs_total_value` (`NUMBER`, nullable) — Your uploaded product cost matching and coverage. Costs use the full scoped variant and effective date. Unknown values remain NULL; backdated corrections restate estimates.
- `uploaded_cogs_complete` (`LOGIC`, nullable) — Your uploaded product cost coverage. True only when all relevant lines, units, currencies and source totals reconcile. Partial matched sums are not complete totals.
- `uploaded_cogs_missing_reason` (`TEXT`, nullable) — Your uploaded product cost. Reason an applicable cost or complete margin is unavailable. Missing identifiers and equally specific variants are unresolved.
- `projected_product_revenue_value` (`NUMBER`, nullable) — DataDoe calculation. Projected product margin uses tax-exclusive wholesale revenue minus uploaded costs on the PO date. Cancelled orders are excluded. Not invoiced revenue, cash or complete net profit.
- `projected_product_margin_value` (`NUMBER`, nullable) — DataDoe calculation. Projected product margin uses tax-exclusive wholesale revenue minus uploaded costs on the PO date. Cancelled orders are excluded. Not invoiced revenue, cash or complete net profit.
- `projected_product_margin_percentage` (`NUMBER`, nullable) — DataDoe calculation. Projected product margin uses tax-exclusive wholesale revenue minus uploaded costs on the PO date. Cancelled orders are excluded. Not invoiced revenue, cash or complete net profit.
- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `date` (`DATE`, nullable) — Calendar day of the Direct Fulfillment order date (orderDate).
- `purchase_order_number` (`TEXT`, required) — Amazon Direct Fulfillment purchase order number.
- `item_sequence_number` (`TEXT`, required) — Line number within the purchase order. Grain key with purchase_order_number.
- `customer_order_number` (`TEXT`, nullable) — Shopper's Amazon order id. Not purchase_order_number.
- `order_status` (`TEXT`, nullable) — Amazon orderStatus: NEW, SHIPPED, ACCEPTED, or CANCELLED.
- `ship_method` (`TEXT`, nullable) — Ship method name Amazon assigned for this order.
- `is_priority_shipment` (`LOGIC`, nullable) — Amazon flagged this order as a priority shipment.
- `is_scheduled_delivery_shipment` (`LOGIC`, nullable) — Amazon flagged this order as a scheduled-delivery shipment.
- `is_pslip_required` (`LOGIC`, nullable) — A packing slip must ship with the order.
- `is_gift` (`LOGIC`, nullable) — The order contains a gift.
- `has_customizable_items` (`LOGIC`, nullable) — The order contains customizable items.
- `required_ship_date` (`DATE`, nullable) — Latest time the vendor must ship the order.
- `promised_delivery_date` (`DATE`, nullable) — Delivery time Amazon promised the customer.
- `selling_party_id` (`TEXT`, nullable) — Vendor party id Amazon assigned on the order.
- `ship_from_party_id` (`TEXT`, nullable) — Warehouse party id the vendor ships from.
- `bill_to_party_id` (`TEXT`, nullable) — Amazon bill-to party id.
- `order_tax_total_amount` (`NUMBER`, nullable)
- `order_tax_total_currency` (`TEXT`, nullable)
- `asin` (`TEXT`, nullable)
- `vendor_code` (`TEXT`, nullable) — Vendor code uploaded by ASIN for this Vendor connection. This table matches vendor codes by ASIN only. SKU-only uploads do not match. Uploads label existing rows and do not identify stock location. To list ASINs sold in the last 30 days without a vendor code, use GET /api/v1/vendor-codes/missing or the MCP tool vendor_codes_missing_list.
- `vendor_product_identifier` (`TEXT`, nullable)
- `title` (`TEXT`, nullable)
- `ordered_quantity` (`NUMBER`, nullable) — Units the customer ordered on this Direct Fulfillment line. Not amazon_vendor_purchase_orders.ordered_quantity (often Cases).
- `ordered_quantity_unit_of_measure` (`TEXT`, nullable) — Unit of measure for ordered_quantity, usually Each.
- `net_price_amount` (`NUMBER`, nullable) — Price Amazon pays the vendor per unit. Not the customer price.
- `net_price_currency` (`TEXT`, nullable)
- `total_price_amount` (`NUMBER`, nullable) — Amazon-reported price to Amazon per item. This is not a line total and must not be assumed to equal net_price_amount × ordered_quantity.
- `total_price_currency` (`TEXT`, nullable)
- `item_tax_amount` (`NUMBER`, nullable) — Amazon-reported tax based on the Amazon retail list price. Do not subtract it from the tax-exclusive net price paid to the vendor.
- `item_tax_currency` (`TEXT`, nullable)
- `gift_wrap_id` (`TEXT`, nullable)
- `last_seen_at` (`DATE`, required) — Timestamp when DataDoe last received this row from the Vendor API.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
