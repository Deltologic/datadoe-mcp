# Sales, Traffic & Inventory by ASIN & Week

- BigQuery table name: `amazon_vendor_sales_traffic_and_inventory_by_child_and_date_weekly`
- Available in: Vendor Central
- Data scheme index: ../data-scheme.md

Weekly sales, traffic, and inventory per child ASIN. Weeks start on Sunday and end on Saturday. Rates and averages, including net PPM, vendor confirmation rate, received fill rate, sell-through, Ultra Fast Track, sourceable replenishment out-of-stock, and lost Featured Offer, are Amazon figures for this period. Do not average or sum ASIN or daily rows to recreate them. Shipped COGS, shipped revenue, contra-COGS, and Net PPM measure Amazon retail economics, not the vendor's own product margin. Inventory and open purchase-order units are end-of-period snapshots and are not additive across periods. Columns prefixed manufacturing_retail_ are Amazon manufacturing-view metrics for all ASINs the vendor manufactures. Columns prefixed sourcing_retail_ are Amazon sourcing-view metrics for ASINs this vendor sourced directly to Amazon (distributor view). DataDoe fetches both views and joins them onto one ASIN-day; the prefixes are overlapping views, not two independent facts and not additive — never sum them or revenue and units double-count. Shipped units/revenue often match because Amazon returns the same shippedOrders in both views; matching is expected, not a copied row. Ordered units/revenue exist only under manufacturing. Contra-COGS is typically populated only under sourcing. Use manufacturing_retail_ for glance views, customer-ordered units/revenue (retail demand, not purchase orders), and net PPM. Use sourcing_retail_ for purchase-order fill metrics (vendor_confirmation_rate, received_fill_rate) and contra-COGS. Amazon-to-vendor purchase-order quantity is amazon_vendor_purchase_orders.ordered_quantity. Either prefix alone is valid for shipped revenue/COGS — pick one view per analysis, not both. Amazon returns inventory for the current week and the previous seven weeks. Older weekly inventory stays empty. Sales and traffic history is about two years. For a stock balance, use the latest week, then add ASINs if you need a catalog figure. Prefer the weekly catalog total when Amazon has already calculated it.

- Source type: `VENDOR_CENTRAL`
- Source ID: `8991390d373226c66b05a77840a8ddf08798beaf5fc8da57dff4a731b946357b`
- Requires a date period: yes
- Contains PII: no
- Premium table: yes
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=VENDOR_CENTRAL&table=8991390d373226c66b05a77840a8ddf08798beaf5fc8da57dff4a731b946357b

## Fetch periods

- `INITIAL` (728 days, shifted by 3 days)
- `RECURRING_WEEKLY` (14 days, shifted by 3 days)

## Search aliases

- weekly vendor sales
- vendor week

## Columns (116)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `date` (`DATE`, required) — Sunday that starts this week.
- `period_end_date` (`DATE`, required) — Saturday that ends this week.
- `child_asin` (`TEXT`, required)
- `vendor_code` (`TEXT`, nullable) — Vendor code uploaded for this Vendor connection. ASIN-based tables prefer an ASIN upload. A SKU-only upload can match through Vendor Listings when the SKU maps to one ASIN and the inferred codes for that ASIN agree. Ambiguous matches stay null. Uploads label existing rows and do not identify stock location. To list ASINs sold in the last 30 days without a vendor code, use GET /api/v1/vendor-codes/missing or the MCP tool vendor_codes_missing_list.
- `glance_views` (`NUMBER`, nullable) — Glance views where Retail wins the Featured Offer (Buy Box). Manufacturing traffic only; the sourcing view has no glance views. Daily Retail Analytics, not amazon_vendor_real_time_traffic (all detail-page views).
- `net_pure_product_margin` (`NUMBER`, nullable) — Amazon Net Pure Product Margin on these products (Amazon's retail margin). Not the vendor's manufacturing or sourcing margin. Alias of manufacturing_retail_net_ppm — both columns read the same Data Kiosk manufacturing net_ppm value. Do not cross-check them as independent sources.
- `lost_featured_offer` (`NUMBER`, nullable) — Share of detail-page views where the vendor offer loses the Featured Offer (Buy Box): lost glance views / total glance views. Manufacturing traffic only.
- `manufacturing_retail_customer_returns` (`NUMBER`, nullable) — Manufacturing view. Units customers returned, from the Customer Returns transaction table. Not revenue and not units Amazon returned to the vendor.
- `manufacturing_retail_shipped_cogs` (`NUMBER`, nullable) — Manufacturing view. Price Amazon paid the vendor for shipped units. This is Amazon's COGS and the vendor's Amazon revenue, not the vendor's production cost.
- `manufacturing_retail_shipped_cogs_currency` (`TEXT`, nullable)
- `manufacturing_retail_shipped_revenue` (`NUMBER`, nullable) — Manufacturing view. Amazon customer retail revenue from shipped units. This is Amazon's top line, not the vendor's invoice to Amazon.
- `manufacturing_retail_shipped_revenue_currency` (`TEXT`, nullable)
- `manufacturing_retail_shipped_units` (`NUMBER`, nullable) — Manufacturing view. Units shipped to Amazon customers. Manufacturing and sourcing views often return the same shippedOrders; do not sum the prefixes.
- `manufacturing_retail_vendor_confirmation_rate` (`NUMBER`, nullable) — Manufacturing view. Amazon Data Kiosk Sourcing.vendorConfirmationRate stored as-is for procurable ASINs. FLOAT64 between 0 and 1 (often 0 or 1 on daily rows), not a yes/no flag. Amazon defines it as Confirmed Units / Submitted Units, but that identity does not hold on a daily row; do not recompute from confirmed_units / most_recent_submitted.
- `manufacturing_retail_net_received_inventory_cost` (`NUMBER`, nullable) — Manufacturing view. Cost of net purchase-order units received by Amazon in the selected time frame. Same grain as net_received_inventory_units, not confirmed_units.
- `manufacturing_retail_net_received_inventory_cost_currency` (`TEXT`, nullable)
- `manufacturing_retail_net_received_inventory_units` (`NUMBER`, nullable) — Manufacturing view. Net purchase-order units received by Amazon in the selected time frame after subtracting units returned to the supplier. Not the same grain as confirmed_units; do not divide by confirmed_units to recompute received_fill_rate.
- `manufacturing_retail_open_purchase_order_units` (`NUMBER`, nullable) — Manufacturing view. Confirmed purchase-order units Amazon has not received yet. End-of-period snapshot; not additive across days. Not unfilled customer orders (unfilled_customer_ordered_units).
- `manufacturing_retail_average_vendor_lead_time_days` (`NUMBER`, nullable) — Manufacturing view. Days from the vendor receiving a purchase order until Amazon receives the inventory at a fulfillment center (overallVendorLeadTime).
- `manufacturing_retail_sell_through_rate` (`NUMBER`, nullable) — Manufacturing view. Amazon sell-through rate: (shipped units − customer returns) / (sellable on-hand units + net received units). A rate, not a unit count.
- `manufacturing_retail_unfilled_customer_ordered_units` (`NUMBER`, nullable) — Customer-ordered units that have not shipped yet. Not open purchase-order units (open_purchase_order_units). Manufacturing view only.
- `manufacturing_retail_sellable_on_hand_inventory_cost` (`NUMBER`, nullable) — Manufacturing view. Cost of sellable units in Amazon fulfillment centers on the last day of the period. End-of-period snapshot in Amazon fulfillment centers. Not additive across days.
- `manufacturing_retail_sellable_on_hand_inventory_cost_currency` (`TEXT`, nullable)
- `manufacturing_retail_sellable_on_hand_inventory_units` (`NUMBER`, nullable) — Manufacturing view. Sellable units in Amazon fulfillment centers on the last day of the period. End-of-period snapshot in Amazon fulfillment centers. Not additive across days.
- `manufacturing_retail_unsellable_on_hand_inventory_cost` (`NUMBER`, nullable) — Manufacturing view. Cost of unsellable units in Amazon fulfillment centers on the last day of the period. End-of-period snapshot in Amazon fulfillment centers. Not additive across days.
- `manufacturing_retail_unsellable_on_hand_inventory_cost_currency` (`TEXT`, nullable)
- `manufacturing_retail_unsellable_on_hand_inventory_units` (`NUMBER`, nullable) — Manufacturing view. Unsellable units in Amazon fulfillment centers on the last day of the period. End-of-period snapshot in Amazon fulfillment centers. Not additive across days.
- `manufacturing_retail_aged_90_plus_days_sellable_inventory_cost` (`NUMBER`, nullable) — Manufacturing view. Cost of sellable units at least 90 days old on the last day of the period. End-of-period snapshot in Amazon fulfillment centers. Not additive across days.
- `manufacturing_retail_aged_90_plus_days_sellable_inventory_cost_currency` (`TEXT`, nullable)
- `manufacturing_retail_aged_90_plus_days_sellable_inventory_units` (`NUMBER`, nullable) — Manufacturing view. Sellable units at least 90 days old on the last day of the period. End-of-period snapshot in Amazon fulfillment centers. Not additive across days.
- `manufacturing_retail_unhealthy_inventory_cost` (`NUMBER`, nullable) — Manufacturing view. Cost of excess units versus forecasted demand on the last day of the period. Amazon does not provide this metric for daily selections, so daily rows are often null.
- `manufacturing_retail_unhealthy_inventory_cost_currency` (`TEXT`, nullable)
- `manufacturing_retail_unhealthy_inventory_units` (`NUMBER`, nullable) — Manufacturing view. Excess units versus forecasted demand on the last day of the period. Amazon does not provide this metric for daily selections, so daily rows are often null.
- `sourcing_retail_customer_returns` (`NUMBER`, nullable) — Sourcing view. Units customers returned, from the Customer Returns transaction table. Not revenue and not units Amazon returned to the vendor.
- `sourcing_retail_shipped_cogs` (`NUMBER`, nullable) — Sourcing view. Price Amazon paid the vendor for shipped units. This is Amazon's COGS and the vendor's Amazon revenue, not the vendor's production cost.
- `sourcing_retail_shipped_cogs_currency` (`TEXT`, nullable)
- `sourcing_retail_shipped_revenue` (`NUMBER`, nullable) — Sourcing view. Amazon customer retail revenue from shipped units. This is Amazon's top line, not the vendor's invoice to Amazon.
- `sourcing_retail_shipped_revenue_currency` (`TEXT`, nullable)
- `sourcing_retail_shipped_units` (`NUMBER`, nullable) — Sourcing view. Units shipped to Amazon customers. Manufacturing and sourcing views often return the same shippedOrders; do not sum the prefixes.
- `sourcing_retail_vendor_confirmation_rate` (`NUMBER`, nullable) — Sourcing view. Amazon Data Kiosk Sourcing.vendorConfirmationRate stored as-is for procurable ASINs. FLOAT64 between 0 and 1 (often 0 or 1 on daily rows), not a yes/no flag. Amazon defines it as Confirmed Units / Submitted Units, but that identity does not hold on a daily row; do not recompute from confirmed_units / most_recent_submitted.
- `sourcing_retail_net_received_inventory_cost` (`NUMBER`, nullable) — Sourcing view. Cost of net purchase-order units received by Amazon in the selected time frame. Same grain as net_received_inventory_units, not confirmed_units.
- `sourcing_retail_net_received_inventory_cost_currency` (`TEXT`, nullable)
- `sourcing_retail_net_received_inventory_units` (`NUMBER`, nullable) — Sourcing view. Net purchase-order units received by Amazon in the selected time frame after subtracting units returned to the supplier. Not the same grain as confirmed_units; do not divide by confirmed_units to recompute received_fill_rate.
- `sourcing_retail_open_purchase_order_units` (`NUMBER`, nullable) — Sourcing view. Confirmed purchase-order units Amazon has not received yet. End-of-period snapshot; not additive across days. Not unfilled customer orders (unfilled_customer_ordered_units).
- `sourcing_retail_average_vendor_lead_time_days` (`NUMBER`, nullable) — Sourcing view. Days from the vendor receiving a purchase order until Amazon receives the inventory at a fulfillment center (overallVendorLeadTime).
- `sourcing_retail_sell_through_rate` (`NUMBER`, nullable) — Sourcing view. Amazon sell-through rate: (shipped units − customer returns) / (sellable on-hand units + net received units). A rate, not a unit count.
- `sourcing_retail_sellable_on_hand_inventory_cost` (`NUMBER`, nullable) — Sourcing view. Cost of sellable units in Amazon fulfillment centers on the last day of the period. End-of-period snapshot in Amazon fulfillment centers. Not additive across days.
- `sourcing_retail_sellable_on_hand_inventory_cost_currency` (`TEXT`, nullable)
- `sourcing_retail_sellable_on_hand_inventory_units` (`NUMBER`, nullable) — Sourcing view. Sellable units in Amazon fulfillment centers on the last day of the period. End-of-period snapshot in Amazon fulfillment centers. Not additive across days.
- `sourcing_retail_unsellable_on_hand_inventory_cost` (`NUMBER`, nullable) — Sourcing view. Cost of unsellable units in Amazon fulfillment centers on the last day of the period. End-of-period snapshot in Amazon fulfillment centers. Not additive across days.
- `sourcing_retail_unsellable_on_hand_inventory_cost_currency` (`TEXT`, nullable)
- `sourcing_retail_unsellable_on_hand_inventory_units` (`NUMBER`, nullable) — Sourcing view. Unsellable units in Amazon fulfillment centers on the last day of the period. End-of-period snapshot in Amazon fulfillment centers. Not additive across days.
- `sourcing_retail_aged_90_plus_days_sellable_inventory_cost` (`NUMBER`, nullable) — Sourcing view. Cost of sellable units at least 90 days old on the last day of the period. End-of-period snapshot in Amazon fulfillment centers. Not additive across days.
- `sourcing_retail_aged_90_plus_days_sellable_inventory_cost_currency` (`TEXT`, nullable)
- `sourcing_retail_aged_90_plus_days_sellable_inventory_units` (`NUMBER`, nullable) — Sourcing view. Sellable units at least 90 days old on the last day of the period. End-of-period snapshot in Amazon fulfillment centers. Not additive across days.
- `sourcing_retail_unhealthy_inventory_cost` (`NUMBER`, nullable) — Sourcing view. Cost of excess units versus forecasted demand on the last day of the period. Amazon does not provide this metric for daily selections, so daily rows are often null.
- `sourcing_retail_unhealthy_inventory_cost_currency` (`TEXT`, nullable)
- `sourcing_retail_unhealthy_inventory_units` (`NUMBER`, nullable) — Sourcing view. Excess units versus forecasted demand on the last day of the period. Amazon does not provide this metric for daily selections, so daily rows are often null.
- `manufacturing_retail_average_selling_price_amount` (`NUMBER`, nullable) — Manufacturing view. Average selling price of shipped items excluding sales tax and VAT (shipped revenue / shipped units). Amazon customer price, not the price Amazon pays the vendor.
- `manufacturing_retail_average_selling_price_currency` (`TEXT`, nullable)
- `manufacturing_retail_sales_discount_amount` (`NUMBER`, nullable) — Manufacturing view. Amazon checkout promotions on shipped units (promo codes, gift cards, employee discount, bounceback, loyalty). Not amazon_coupon_performance or amazon_promotion_performance.
- `manufacturing_retail_sales_discount_currency` (`TEXT`, nullable)
- `manufacturing_retail_average_sales_discount_amount` (`NUMBER`, nullable) — Manufacturing view. Sales discount divided by shipped quantity. Same Amazon checkout promotions as sales_discount_amount.
- `manufacturing_retail_average_sales_discount_currency` (`TEXT`, nullable)
- `manufacturing_retail_contra_cogs_amount` (`NUMBER`, nullable) — Manufacturing view. Amazon Vendor-Funded Contra-COGS (vendor terms such as co-op). Retail Analytics reports this as an Amazon estimate, not actual remittance deductions.
- `manufacturing_retail_contra_cogs_currency` (`TEXT`, nullable)
- `manufacturing_retail_contra_cogs_per_unit_amount` (`NUMBER`, nullable) — Manufacturing view. Estimated contra-COGS per shipped unit. Amazon Retail Analytics estimate, not actual remittance deductions.
- `manufacturing_retail_contra_cogs_per_unit_currency` (`TEXT`, nullable)
- `manufacturing_retail_net_ppm` (`NUMBER`, nullable) — Manufacturing view. Amazon Net Pure Product Margin on these products, not the vendor's own margin. Net PPM = (shipped revenue - shipped COGS + contra-COGS - sales discount) / shipped revenue. Contra-COGS in this formula is an Amazon estimate. On this table, manufacturing_retail_net_ppm is identical to net_pure_product_margin.
- `manufacturing_retail_net_ordered_gms_amount` (`NUMBER`, nullable) — Net gross merchandise sales for customer orders on this day. Manufacturing orders view only.
- `manufacturing_retail_net_ordered_gms_currency` (`TEXT`, nullable)
- `manufacturing_retail_net_shipment_gms_amount` (`NUMBER`, nullable) — Net gross merchandise sales for units shipped on this day. Manufacturing orders view only.
- `manufacturing_retail_net_shipment_gms_currency` (`TEXT`, nullable)
- `manufacturing_retail_ordered_units` (`NUMBER`, nullable) — Units ordered by Amazon customers (retail demand), with return and cancellation adjustments. Not Amazon-to-vendor purchase-order quantity; that is amazon_vendor_purchase_orders.ordered_quantity. Manufacturing view only.
- `manufacturing_retail_ordered_revenue_amount` (`NUMBER`, nullable) — Revenue from units ordered by Amazon customers (OPS = product price × ordered units), with return and cancellation adjustments. Not purchase-order value. Manufacturing view only.
- `manufacturing_retail_ordered_revenue_currency` (`TEXT`, nullable)
- `manufacturing_retail_ultra_fast_track` (`NUMBER`, nullable) — Manufacturing view. Ultra Fast Track: share of time the ASIN was available to ship Prime from a fulfillment center versus the selection Amazon intended, weighted by customer importance. An availability rate, not a unit count.
- `manufacturing_retail_sourceable_roos` (`NUMBER`, nullable) — Manufacturing view. Sourceable replenishment out-of-stock (sourceableROOS). Amazon describes it as the percentage of retail available for ASINs with a sourceable retail vendor. A rate, not a unit count.
- `manufacturing_retail_sellable_in_transit_inventory` (`NUMBER`, nullable) — Manufacturing view. Sellable units in transit to Amazon at the end of the period. Snapshot, not additive across days.
- `manufacturing_retail_unsellable_in_transit_inventory` (`NUMBER`, nullable) — Manufacturing view. Unsellable units in transit to Amazon at the end of the period. Snapshot, not additive across days.
- `manufacturing_retail_received_fill_rate` (`NUMBER`, nullable) — Manufacturing view. Amazon Data Kiosk Sourcing.receivedFillRate stored as-is for procurable ASINs. Amazon defines Fill Rate as Net Received Units / Confirmed Units, but that identity does not hold on a daily row: net_received_inventory_units is receipts in the selected time frame, confirmed_units has no selected time frame, and this column is Amazon's own number — not same-row received/confirmed. Stored values can be above 1. Do not recompute from other columns.
- `manufacturing_retail_procurable_product_oos` (`NUMBER`, nullable) — Manufacturing view. Procurable product out-of-stock (procurableProductOOS): out-of-stock glance views on procurable ASINs divided by total glance views. Procurable means Amazon can promise delivery from known vendor supply. A rate, not a unit count.
- `manufacturing_retail_confirmed_units` (`NUMBER`, nullable) — Manufacturing view. Purchase-order units confirmed by the vendor. Amazon does not apply a selected time frame to this metric. Conceptual input to vendor_confirmation_rate and received_fill_rate; those rates are Amazon-provided and are not same-row arithmetic on a daily row.
- `manufacturing_retail_most_recent_submitted` (`NUMBER`, nullable) — Manufacturing view. Units Amazon ordered in the most recent purchase orders of the week (Data Kiosk mostRecentSubmitted). Conceptual denominator for vendor_confirmation_rate; do not treat vendor_confirmation_rate as same-row confirmed_units / most_recent_submitted.
- `sourcing_retail_average_selling_price_amount` (`NUMBER`, nullable) — Sourcing view. Average selling price of shipped items excluding sales tax and VAT (shipped revenue / shipped units). Amazon customer price, not the price Amazon pays the vendor.
- `sourcing_retail_average_selling_price_currency` (`TEXT`, nullable)
- `sourcing_retail_sales_discount_amount` (`NUMBER`, nullable) — Sourcing view. Amazon checkout promotions on shipped units (promo codes, gift cards, employee discount, bounceback, loyalty). Not amazon_coupon_performance or amazon_promotion_performance.
- `sourcing_retail_sales_discount_currency` (`TEXT`, nullable)
- `sourcing_retail_average_sales_discount_amount` (`NUMBER`, nullable) — Sourcing view. Sales discount divided by shipped quantity. Same Amazon checkout promotions as sales_discount_amount.
- `sourcing_retail_average_sales_discount_currency` (`TEXT`, nullable)
- `sourcing_retail_contra_cogs_amount` (`NUMBER`, nullable) — Sourcing view. Amazon Vendor-Funded Contra-COGS (vendor terms such as co-op). Retail Analytics reports this as an Amazon estimate, not actual remittance deductions.
- `sourcing_retail_contra_cogs_currency` (`TEXT`, nullable)
- `sourcing_retail_contra_cogs_per_unit_amount` (`NUMBER`, nullable) — Sourcing view. Estimated contra-COGS per shipped unit. Amazon Retail Analytics estimate, not actual remittance deductions.
- `sourcing_retail_contra_cogs_per_unit_currency` (`TEXT`, nullable)
- `sourcing_retail_net_ppm` (`NUMBER`, nullable) — Sourcing view. Amazon Net Pure Product Margin on these products, not the vendor's own margin. Net PPM = (shipped revenue - shipped COGS + contra-COGS - sales discount) / shipped revenue. Contra-COGS in this formula is an Amazon estimate. On this table, manufacturing_retail_net_ppm is identical to net_pure_product_margin.
- `sourcing_retail_ultra_fast_track` (`NUMBER`, nullable) — Sourcing view. Ultra Fast Track: share of time the ASIN was available to ship Prime from a fulfillment center versus the selection Amazon intended, weighted by customer importance. An availability rate, not a unit count.
- `sourcing_retail_sourceable_roos` (`NUMBER`, nullable) — Sourcing view. Sourceable replenishment out-of-stock (sourceableROOS). Amazon describes it as the percentage of retail available for ASINs with a sourceable retail vendor. A rate, not a unit count.
- `sourcing_retail_sellable_in_transit_inventory` (`NUMBER`, nullable) — Sourcing view. Sellable units in transit to Amazon at the end of the period. Snapshot, not additive across days.
- `sourcing_retail_unsellable_in_transit_inventory` (`NUMBER`, nullable) — Sourcing view. Unsellable units in transit to Amazon at the end of the period. Snapshot, not additive across days.
- `sourcing_retail_received_fill_rate` (`NUMBER`, nullable) — Sourcing view. Amazon Data Kiosk Sourcing.receivedFillRate stored as-is for procurable ASINs. Amazon defines Fill Rate as Net Received Units / Confirmed Units, but that identity does not hold on a daily row: net_received_inventory_units is receipts in the selected time frame, confirmed_units has no selected time frame, and this column is Amazon's own number — not same-row received/confirmed. Stored values can be above 1. Do not recompute from other columns.
- `sourcing_retail_procurable_product_oos` (`NUMBER`, nullable) — Sourcing view. Procurable product out-of-stock (procurableProductOOS): out-of-stock glance views on procurable ASINs divided by total glance views. Procurable means Amazon can promise delivery from known vendor supply. A rate, not a unit count.
- `sourcing_retail_confirmed_units` (`NUMBER`, nullable) — Sourcing view. Purchase-order units confirmed by the vendor. Amazon does not apply a selected time frame to this metric. Conceptual input to vendor_confirmation_rate and received_fill_rate; those rates are Amazon-provided and are not same-row arithmetic on a daily row.
- `sourcing_retail_most_recent_submitted` (`NUMBER`, nullable) — Sourcing view. Units Amazon ordered in the most recent purchase orders of the week (Data Kiosk mostRecentSubmitted). Conceptual denominator for vendor_confirmation_rate; do not treat vendor_confirmation_rate as same-row confirmed_units / most_recent_submitted.
- `uploaded_cogs_sourcing_retail_item_total_value` (`NUMBER`, nullable) — Your uploaded product cost estimate for Sourcing / Retail. Sum of daily shipped units times the uploaded cost effective on each day. NULL when daily coverage, currency or the shipment population cannot be reconciled with native Amazon totals. Not an Amazon-reported amount. Never apply a current unit cost to a whole period.
- `uploaded_cogs_sourcing_retail_shipping_total_value` (`NUMBER`, nullable) — Your uploaded product cost estimate for Sourcing / Retail. Sum of daily shipped units times the uploaded cost effective on each day. NULL when daily coverage, currency or the shipment population cannot be reconciled with native Amazon totals. Not an Amazon-reported amount. Never apply a current unit cost to a whole period.
- `uploaded_cogs_sourcing_retail_total_value` (`NUMBER`, nullable) — Your uploaded product cost estimate for Sourcing / Retail. Sum of daily shipped units times the uploaded cost effective on each day. NULL when daily coverage, currency or the shipment population cannot be reconciled with native Amazon totals. Not an Amazon-reported amount. Never apply a current unit cost to a whole period.
- `uploaded_cogs_currency` (`TEXT`, nullable) — Currency of your uploaded product cost. No FX conversion. Mixed currencies make the estimate incomplete.
- `uploaded_cogs_sourcing_retail_complete` (`LOGIC`, required) — True only with complete underlying daily cost history and currency, shipped units and shipped COGS consistent with the native Amazon Sourcing / Retail population. Missing days are not assumed to be zero.
- `uploaded_cogs_sourcing_retail_units_with_cost` (`NUMBER`, nullable) — Observed daily Sourcing / Retail shipped units with applicable uploaded product costs. This count does not prove complete daily history.
- `uploaded_cogs_sourcing_retail_units_missing_cost` (`NUMBER`, nullable) — Observed daily Sourcing / Retail shipped units without applicable uploaded product costs. Missing days are not counted as zero-cost or zero-unit days.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
