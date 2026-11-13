# Vendor Purchase Orders

- BigQuery table name: `amazon_vendor_purchase_orders`
- Available in: Vendor Central
- Data scheme index: ../data-scheme.md

Vendor Retail Procurement purchase order line items. One row per line item with purchase order header fields repeated. ordered_quantity is Amazon-to-vendor PO quantity, not customer retail demand (manufacturing_retail_ordered_units). Acknowledgement and Amazon fulfillment-center received quantity are on amazon_vendor_purchase_orders_status.

- Source type: `VENDOR_CENTRAL`
- Source ID: `6f9b8159d659a68c2274cdf881f4c18cdbf917e32a0b853f6b01ed7f106e4a06`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=VENDOR_CENTRAL&table=6f9b8159d659a68c2274cdf881f4c18cdbf917e32a0b853f6b01ed7f106e4a06

## Fetch periods

- `INITIAL` (30 days)
- `CONTINUOUS`

## Data availability

- `INTRADAY` — DataDoe checks for new and changed purchase orders every 2 hours. Availability depends on when Amazon provides the orders and on sync and export processing. Refresh: Every 2 hours.

## Search aliases

- purchase order
- po quantity

## Columns (54)

- `vendor_code` (`TEXT`, nullable) — Scoped Amazon source identifier or document detail for filtering and drilldown. JSON details retain unresolved rows and source links.
- `net_cost_unit_of_measure` (`TEXT`, nullable) — Amazon-reported price unit. EACH means a confirmed per-item price. Historical NULL or weight units cannot be treated as a per-item price.
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
- `date` (`DATE`, nullable) — Calendar day of purchase_order_date. Use for date filtering.
- `purchase_order_number` (`TEXT`, required)
- `item_sequence_number` (`TEXT`, required) — Line number within the purchase order. Grain key with purchase_order_number.
- `purchase_order_state` (`TEXT`, nullable) — Amazon purchaseOrderState: New, Acknowledged, or Closed.
- `purchase_order_type` (`TEXT`, nullable) — Amazon purchaseOrderType: RegularOrder, ConsignedOrder, NewProductIntroduction, or RushOrder.
- `payment_method` (`TEXT`, nullable) — Amazon paymentMethod: Invoice, Consignment, CreditCard, or Prepaid.
- `deal_code` (`TEXT`, nullable) — Deal code when the purchase order is tied to a special deal.
- `purchase_order_date` (`DATE`, nullable) — When Amazon created the purchase order.
- `purchase_order_changed_date` (`DATE`, nullable) — When Amazon last changed the purchase order.
- `purchase_order_state_changed_date` (`DATE`, nullable) — When purchase_order_state last changed.
- `ship_window` (`TEXT`, nullable) — Amazon ship window as start--end timestamps. The vendor must ship inside this window. Not a single date.
- `delivery_window` (`TEXT`, nullable) — Amazon delivery window as start--end timestamps. Not a single date and not ship_window.
- `selling_party_id` (`TEXT`, nullable) — Vendor party id.
- `buying_party_id` (`TEXT`, nullable) — Amazon buying party id.
- `ship_to_party_id` (`TEXT`, nullable) — Amazon fulfillment center the vendor ships to.
- `bill_to_party_id` (`TEXT`, nullable) — Amazon bill-to party id.
- `asin` (`TEXT`, nullable)
- `vendor_product_identifier` (`TEXT`, nullable)
- `ordered_quantity` (`NUMBER`, nullable) — Quantity Amazon ordered from the vendor on this purchase-order line. Not customer retail demand; that is manufacturing_retail_ordered_units. Read with ordered_quantity_unit_of_measure (often Cases) and ordered_quantity_unit_size.
- `ordered_quantity_unit_of_measure` (`TEXT`, nullable) — Unit of measure for ordered_quantity, such as Cases or Eaches. Do not sum Cases with customer-ordered units.
- `ordered_quantity_unit_size` (`NUMBER`, nullable) — Case size when ordered_quantity_unit_of_measure is Cases.
- `is_back_order_allowed` (`LOGIC`, nullable) — Amazon allows the vendor to backorder this line.
- `net_cost_amount` (`NUMBER`, nullable) — Cost Amazon pays the vendor per unit. Not list_price_amount.
- `net_cost_currency` (`TEXT`, nullable)
- `list_price_amount` (`NUMBER`, nullable) — List price on the purchase order. Not the net cost Amazon pays.
- `list_price_currency` (`TEXT`, nullable)
- `last_seen_at` (`DATE`, required) — Timestamp when DataDoe last received this row from the Vendor API.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
