# DataDoe Data Scheme

DataDoe syncs Amazon Seller Central, Vendor Central and Amazon Ads data into ready-to-query tables. This index lists every table available in DataDoe exports, the DataDoe MCP and BigQuery. Each entry links to its own Markdown page with all columns.

- Full JSON (large): https://api.datadoe.com/api/v1/spec/data-scheme — narrow it with `?sourceType=SELLER_CENTRAL|VENDOR_CENTRAL|AMAZON_ADS`, `?query=returns` or `?containsPii=true|false`. The same filters work on this Markdown index.
- Have a DataDoe account? Connect the DataDoe MCP and use `exports_sources_get` / `exports_source_get` — they return the tables available for your connected accounts.
- Interactive explorer: https://www.datadoe.com/hub/data-scheme

## Seller Central (102 tables)

### Profit by SKU & Date

- Table name: `amazon_profit_by_sku_and_date`
- Columns: 113
- Markdown: data-scheme/amazon_profit_by_sku_and_date.md

Daily profit and cost breakdown per SKU and child ASIN from shipped Amazon marketplace orders, settlement fees, COGS and ad spend. Off-Amazon Multi-Channel Fulfillment lines are excluded from sales, units, orders, tax, and COGS. Their order-report amounts are fulfillment or declared values, not verified external-channel revenue, and this table is not a complete MCF profit statement. Prefer this table for SKU and child-ASIN profit drill-down instead of calculating manually from other tables. Amazon Sales and Traffic provides child ASIN sessions, page views, buy box percentage, and unit session percentage. Those values repeat on every SKU row for that child ASIN and day. Read each traffic value once per child ASIN and day. Sponsored Products and Sponsored Display use reported advertised-product spend, sales and orders. Display units include all click-attributed purchases, not just the promoted product. Sponsored Brands contributes estimated spend but no same-SKU conversions. Amazon DSP (estimated spend) contributes promoted-ASIN sales, orders and units. Sponsored Brands spend uses eligible ad-creative ASINs, with same-day ad cost rescaled to campaign cost. Remaining spend uses campaign purchased-product shares. Without purchased-product data, it uses Seller Central sales, orders and sessions, or an even split among known campaign ASINs. Sales and orders allocate campaign totals by purchased-product shares, with the same fallback signals. ASIN spend and sales are split across available SKUs by same-day order-sales shares; orders use order-count shares. A zero total uses an even split for that measure. With no SKU rows, sku is null. Campaigns without any ASIN signal remain account-only. Amazon DSP line item spend is allocated by each ASIN's share of total product sales (including brand halo) on that day. Without positive sales, it uses purchases, then an even split among reported ASINs. Spend and promoted sales use same-day SKU order-sales shares; promoted orders and units use order-count shares. A zero total uses an even split for that measure. With no SKU rows, sku is null. Line items with no ASIN conversion rows remain account-only. Sponsored Television is account-only because its campaign report has no product allocation. Missing or delayed estimates can understate SKU ad spend and overstate SKU profit. Use amazon_profit_by_date for account-level P&L; SUM of SKU profit is not the account profit number.

### Profit by Date

- Table name: `amazon_profit_by_date`
- Columns: 156
- Markdown: data-scheme/amazon_profit_by_date.md

Daily profit and cost breakdown from shipped Amazon marketplace orders, settlement fees, COGS and ads spend. Off-Amazon Multi-Channel Fulfillment lines are excluded from sales, units, orders, tax, and COGS. Their order-report amounts are fulfillment or declared values, not verified external-channel revenue, and this table is not a complete MCF profit statement. Prefer this table for account-level P&L instead of calculating manually from other tables. Amazon Sales and Traffic provides account sessions, page views, buy box percentage, and unit session percentage. Target and search-term columns are separate Amazon Ads attribution summaries; their estimated profits are not included in account profit and must not be added together. Ads include Sponsored Products, Sponsored Brands, Sponsored Display, Sponsored Television and Amazon DSP. sponsored_tv_ad_spend isolates Television spend already included once in ad_spend and profit. Television has no SKU attribution. Amazon DSP spend is DSP totalCost and DSP ad sales, orders and units include promoted ASINs plus brand halo, consistent with Sponsored Brands and Sponsored Display sales. Unallocated and account-level fees and ads spend land here, including all DSP spend, so ad_spend can exceed SUM(amazon_profit_by_sku_and_date.ad_spend). Do not expect this profit to equal SUM(amazon_profit_by_sku_and_date.profit). Columns from average_sales_per_order_item through order_item_session_percentage_b2b are Amazon daily account totals from Sales and Traffic, filled for seller accounts only, and are not sums of per-ASIN rows. total_sessions, total_page_views, avg_buybox_percentage and their B2B and B2C variants also use the daily account totals, and fall back to child ASIN rows when the day has no account total. Columns starting with asin_ are per child ASIN Sales and Traffic values summed for the day.

### Sales & Traffic by ASIN & Date

- Table name: `amazon_sales_and_traffic_with_cogs`
- Columns: 41
- Markdown: data-scheme/amazon_sales_and_traffic_with_cogs.md

Deprecated: amazon_sales_and_traffic_with_cogs will be removed on November 16, 2026. Use amazon_profit_by_sku_and_date for SKU and child-ASIN analysis and amazon_profit_by_date for daily account summaries. These tables provide consistent sales and profitability definitions and more current sales data; Amazon traffic reports can still be delayed. SAT contains Sales and Traffic report metrics per child ASIN and date, including ordered sales and units. Read the SAT migration to profit tables guide at https://app.datadoe.com/hub/docs/datadoe-data/sat-migration-to-profit-tables or open a support ticket for help. The underlying report data remains available through the Raw BigQuery integration.

### Order Line Items

- Table name: `amazon_order_items_with_cogs`
- Columns: 50
- Markdown: data-scheme/amazon_order_items_with_cogs.md

Order line items from Amazon order reports and recent ORDER_CHANGE updates, one row per order line. Marketplace orders belong to their marketplace connection. Off-Amazon Multi-Channel Fulfillment (MCF) lines belong to the seller account and appear once per account, with regional attribution and null marketplace columns. Exports include them for any selected marketplace of that account; combining separate marketplace exports can count them more than once. sales_channel preserves Amazon's value, such as Non-Amazon. A generic value does not identify an external store, and a missing value does not identify MCF. Off-Amazon item_price_value is a fulfillment or declared amount, not verified external sales revenue. COGS uses the kept connection's uploaded costs. Profit tables and marketplace-filtered app reports omit off-Amazon lines. Initial reports cover 105 weeks of last-update time. Recurring reports re-read 8 days daily and 1 day intraday.

### Listings (Raw JSON)

- Table name: `amazon_listings_raw`
- Columns: 32
- Markdown: data-scheme/amazon_listings_raw.md

Raw listings payload per SKU and marketplace. Recommended for advanced use cases. For most use cases, use the "amazon_listings_with_cogs" table instead. For AI agents: each row from this table has a lot of data, consider downloading it to file and not directly to the context. item_name, product_description, and bullet points use the listing when Amazon returns them, then the catalog.

### Listing prices by audience

- Table name: `amazon_listings_audience_pricing`
- Columns: 14
- Markdown: data-scheme/amazon_listings_audience_pricing.md

One row per connection, marketplace, SKU, and price audience. Audiences include ALL for every buyer, B2B for Amazon Business, and industry audiences such as B2B_EDUCATION when the seller is enrolled. unit_price is the single-unit price. quantity_discount_tiers lists quantity discounts from the listing attributes. Prices come from listing attributes when Amazon sends them, and from the offers summary when the attribute price is missing. This view does not change prices.

### Promotions

- Table name: `amazon_promotions`
- Columns: 46
- Markdown: data-scheme/amazon_promotions.md

Promotion configuration per promotion, including schedule, benefit, budget, fees, and selection metadata. Complements amazon_promotion_performance, which contains historical performance metrics.

### Promotion Items

- Table name: `amazon_promotion_items`
- Columns: 22
- Markdown: data-scheme/amazon_promotion_items.md

Item-level promotion configuration for ITEMS selections, including per-ASIN/SKU benefits and budgets.

### Listings

- Table name: `amazon_listings_with_cogs`
- Columns: 50
- Markdown: data-scheme/amazon_listings_with_cogs.md

Current listing snapshot per SKU, including price, FBA inventory, and Amazon Warehousing and Distribution (AWD) inventory. FBA available, reserved, inbound, and pending-removal quantities are separate buckets; fba_inventory_supply_at_fba is the FBA total when Amazon sends it, so do not add the buckets to it. AWD quantities are not FBA. item_name, product_description, and bullet points use the listing when Amazon returns them, then the catalog.

### AWD Inbound Shipments

- Table name: `amazon_awd_inbound_shipments`
- Columns: 44
- Markdown: data-scheme/amazon_awd_inbound_shipments.md

AWD inbound shipments by shipment id.

### Replenishment Metrics by Date (SnS)

- Table name: `amazon_replenishment_metrics_by_date`
- Columns: 46
- Markdown: data-scheme/amazon_replenishment_metrics_by_date.md

Amazon Subscribe & Save PERFORMANCE metrics by calendar day. Date is the metric aggregation day, not order date or ship date. total_subscriptions_revenue is SnS program revenue for that day; Amazon does not label it as ordered or shipped sales. shipped_subscription_units is the shipped-units metric. revenue_penetration is SnS program revenue as a percentage of total product revenue.

### Replenishment Metrics by SKU & Date

- Table name: `amazon_replenishment_metrics_by_sku_and_date`
- Columns: 25
- Markdown: data-scheme/amazon_replenishment_metrics_by_sku_and_date.md

Amazon Subscribe & Save PERFORMANCE metrics by SKU and calendar day. Date is the metric aggregation day, not order date or ship date. total_subscriptions_revenue is SnS program revenue for that SKU and day; Amazon does not label it as ordered or shipped sales. shipped_subscription_units is the shipped-units metric. revenue_penetration is SnS program revenue as a percentage of total product revenue for that offer.

### Replenishment Offers

- Table name: `amazon_replenishment_offers`
- Columns: 21
- Markdown: data-scheme/amazon_replenishment_offers.md

Current Amazon Subscribe & Save offer snapshot by SKU (eligibility, configuration, inventory, subscriptions). Not a sales time series; use the replenishment metrics tables for SnS revenue and shipped units.

### Item Offers

- Table name: `amazon_item_offers`
- Columns: 13
- Markdown: data-scheme/amazon_item_offers.md

Competitive offers (Buy Box, seller offers, listing/shipping/landed price) by ASIN and item condition.

### Competitive Summaries

- Table name: `amazon_competitive_summaries`
- Columns: 12
- Markdown: data-scheme/amazon_competitive_summaries.md

Current competitive summary snapshot for each Seller Central ASIN. last_seen_at is the time of the latest successful fetch. It is the observation time. It is not a promotion start time or end time.

### Competitive Offer Promotions

- Table name: `amazon_competitive_offer_promotions`
- Columns: 30
- Markdown: data-scheme/amazon_competitive_offer_promotions.md

One row for each promotion Amazon returned on a featured or lowest-priced offer in the current competitive summary snapshot. The same offer can appear in both sections, so rows are not unique promotion IDs. An empty result does not show that the ASIN has no promotions. last_seen_at is the observation time of the parent snapshot.

### AWD Inbound Shipment Line Items

- Table name: `amazon_awd_inbound_shipment_line_items`
- Columns: 14
- Markdown: data-scheme/amazon_awd_inbound_shipment_line_items.md

AWD inbound shipment line items by shipment id and line item number.

### AWD Replenishment Orders

- Table name: `amazon_awd_replenishment_orders`
- Columns: 15
- Markdown: data-scheme/amazon_awd_replenishment_orders.md

AWD replenishment orders by order id.

### AWD Replenishment Order Line Items

- Table name: `amazon_awd_replenishment_order_line_items`
- Columns: 20
- Markdown: data-scheme/amazon_awd_replenishment_order_line_items.md

AWD replenishment order line items by order id and line item number.

### AWD Outbound Orders

- Table name: `amazon_awd_outbound_orders`
- Columns: 17
- Markdown: data-scheme/amazon_awd_outbound_orders.md

AWD outbound orders: inventory leaving AWD for a destination channel, one row per order id. Not amazon_awd_replenishment_orders (AWD to FBA) and not amazon_awd_inbound_shipments. Shipments are amazon_awd_outbound_shipments. Product arrays are separate stages; do not add them.

### AWD Outbound Shipments

- Table name: `amazon_awd_outbound_shipments`
- Columns: 35
- Markdown: data-scheme/amazon_awd_outbound_shipments.md

AWD outbound shipments for an amazon_awd_outbound_orders row, with origin and destination addresses. One row per shipment id. Quantities on this row are this shipment only.

### AWD Outbound Shipment Packages

- Table name: `amazon_awd_outbound_shipment_packages`
- Columns: 16
- Markdown: data-scheme/amazon_awd_outbound_shipment_packages.md

AWD outbound distribution packages exploded from the order and from each shipment. One row per package configuration. Filter package_source before summing; the same configuration can appear in more than one source array.

### FBA Inbound Shipments

- Table name: `amazon_fba_inbound_shipments`
- Columns: 67
- Markdown: data-scheme/amazon_fba_inbound_shipments.md

FBA inbound shipment line items from inbound plans with shipment status, destination and source addresses, carrier and tracking details, and plan metadata. quantity is the planned unit count. quantity_shipped, quantity_received, quantity_in_case, and release_date are filled when Amazon reports them.

### FBA Inbound Shipment Boxes

- Table name: `amazon_fba_inbound_shipment_boxes`
- Columns: 34
- Markdown: data-scheme/amazon_fba_inbound_shipment_boxes.md

Boxes in FBA inbound shipments. Each row is one SKU in one box, with the box size, weight, units in that box, and the Send to Amazon template name when Amazon provides one.

### FBA Shipments

- Table name: `amazon_fba_shipments`
- Columns: 59
- Markdown: data-scheme/amazon_fba_shipments.md

Amazon-fulfilled shipment line items with order, item, pricing, and shipping address details. Personal fields, including buyer email, street addresses, postal codes, and tracking numbers, become NULL after 30 days from the shipment date, or the reporting date when the shipment date is unavailable. Historical rows, item and financial details, and city, state, and country remain available.

### FBA Removal Orders

- Table name: `amazon_fba_removal_orders`
- Columns: 28
- Markdown: data-scheme/amazon_fba_removal_orders.md

FBA removal order line items with quantities, fees, and status.

### FBA Recommended Removals

- Table name: `amazon_fba_removal_recommended`
- Columns: 23
- Markdown: data-scheme/amazon_fba_removal_recommended.md

Recommended FBA removal quantities by SKU with sellable and unsellable inventory age buckets.

### FBA Stranded Inventory

- Table name: `amazon_fba_stranded_inventory`
- Columns: 24
- Markdown: data-scheme/amazon_fba_stranded_inventory.md

FBA stranded inventory that is in Amazon fulfillment centers but not available for sale, with recommended actions, status, and quantities. Updated daily by replacing the full snapshot.

### FBA Removal Shipments

- Table name: `amazon_fba_removal_shipments`
- Columns: 22
- Markdown: data-scheme/amazon_fba_removal_shipments.md

FBA removal shipment details linked to removal orders.

### FBA Replacement Shipments

- Table name: `amazon_fba_replacement_shipments`
- Columns: 21
- Markdown: data-scheme/amazon_fba_replacement_shipments.md

FBA replacement shipments with original and replacement order references.

### FBA Restock Recommendations

- Table name: `amazon_fba_restock_recommendations`
- Columns: 36
- Markdown: data-scheme/amazon_fba_restock_recommendations.md

FBA restock recommendations with inventory levels, sales velocity, and replenishment guidance stored as daily snapshots.

### Remote Fulfillment Eligibility

- Table name: `amazon_remote_fulfillment_eligibility`
- Columns: 22
- Markdown: data-scheme/amazon_remote_fulfillment_eligibility.md

Remote Fulfillment eligibility for each product and destination country. Offer status and more details are the reported eligibility. A blank inclusion request is an empty seller input, not proof the product is unenrolled. The current state is the latest complete report for the source marketplace.

### Pan-European FBA eligibility

- Table name: `amazon_pan_eu_fba_eligibility`
- Columns: 47
- Markdown: data-scheme/amazon_pan_eu_fba_eligibility.md

Pan-European programme offer status for one source marketplace. This is not FBA inbound eligibility, a listing restriction, or brand approval. Compare a product with Listings or FBA stranded inventory using the connection, SKU, and ASIN together. Every completed report is kept. A missing day stays empty.

### Pan-European MFN eligibility

- Table name: `amazon_pan_eu_mfn_eligibility`
- Columns: 22
- Markdown: data-scheme/amazon_pan_eu_mfn_eligibility.md

Pan-European programme offer status for one source marketplace. This is not FBA inbound eligibility, a listing restriction, or brand approval. Compare a product with Listings or FBA stranded inventory using the connection, SKU, and ASIN together. Every completed report is kept. A missing day stays empty.

### Pan-European FBA eligibility by country

- Table name: `amazon_pan_eu_fba_eligibility_by_country`
- Columns: 22
- Markdown: data-scheme/amazon_pan_eu_fba_eligibility_by_country.md

One row for each destination country group present in a Pan-European report. The source marketplace stays on marketplace_id. A present blank group is a row. A header that is absent from the file is not a row.

### Pan-European MFN eligibility by country

- Table name: `amazon_pan_eu_mfn_eligibility_by_country`
- Columns: 22
- Markdown: data-scheme/amazon_pan_eu_mfn_eligibility_by_country.md

One row for each destination country group present in a Pan-European report. The source marketplace stays on marketplace_id. A present blank group is a row. A header that is absent from the file is not a row.

### Pan-European FBA eligibility latest

- Table name: `amazon_pan_eu_fba_eligibility_latest`
- Columns: 47
- Markdown: data-scheme/amazon_pan_eu_fba_eligibility_latest.md

Every product row from the newest complete Pan-European report whose rows have already been exported for the source marketplace. A product absent from that report is absent here. Older reports remain in the history table.

### Pan-European MFN eligibility latest

- Table name: `amazon_pan_eu_mfn_eligibility_latest`
- Columns: 22
- Markdown: data-scheme/amazon_pan_eu_mfn_eligibility_latest.md

Every product row from the newest complete Pan-European report whose rows have already been exported for the source marketplace. A product absent from that report is absent here. Older reports remain in the history table.

### Pan-European eligibility snapshots

- Table name: `amazon_pan_eu_eligibility_snapshots`
- Columns: 16
- Markdown: data-scheme/amazon_pan_eu_eligibility_snapshots.md

One row for each accepted Pan-European report. row_count is the number of product rows. An empty valid file has row_count 0. A failed or unreadable file does not remove an earlier row.

### FBA Inventory by ASIN & Country

- Table name: `amazon_fba_inventory_by_asin_by_country`
- Columns: 17
- Markdown: data-scheme/amazon_fba_inventory_by_asin_by_country.md

Daily inventory data snapshot for all FBA listings per country.

### FBA Inventory Health

- Table name: `amazon_fba_inventory_health`
- Columns: 115
- Markdown: data-scheme/amazon_fba_inventory_health.md

Consolidated daily FBA inventory health snapshot across sales windows (7, 30, 60, and 90 days), inbound shipment statuses (working, received, and shipped), estimated storage and long-term storage fees, aged and excess units, and recommended actions. One row per SKU and date; not additive across dates. inv_age_0_to_90_days already includes inv_age_0_to_30_days, inv_age_31_to_60_days, and inv_age_61_to_90_days. The planning-report-sourced columns are not available in the MX marketplace.

### FBA Overage Fee Charges

- Table name: `amazon_fba_overage_fees`
- Columns: 16
- Markdown: data-scheme/amazon_fba_overage_fees.md

Daily overage fee charges based on FBA storage usage limits.

### FBA Ledger Summary

- Table name: `amazon_fba_ledger_summary`
- Columns: 31
- Markdown: data-scheme/amazon_fba_ledger_summary.md

Daily FBA ledger summary by fulfillment center. Quantities are signed: receipts and customer returns increase inventory, customer shipments and disposals decrease it. starting_warehouse_balance plus the movement columns equals ending_warehouse_balance for that location. Do not sum locations without grouping by fnsku.

### FBA Ledger Details

- Table name: `amazon_fba_ledger_details`
- Columns: 24
- Markdown: data-scheme/amazon_fba_ledger_details.md

Daily FBA ledger details with per-event inventory movements, references, and reconciliation quantities.

### FBA Fee Preview

- Table name: `amazon_fba_fee_preview`
- Columns: 56
- Markdown: data-scheme/amazon_fba_fee_preview.md

Estimated FBA fees for each active FBA offer, kept as a daily snapshot. snapshot_date is the UTC date Amazon finished the report. When a finish time is missing, it is the UTC date Amazon created the report. Amazon refreshes the estimates at least every 72 hours, so a later snapshot can repeat the same estimates. The report has no scheduled fee category and no effective date. A future fulfillment fee is a fulfillment estimate, not a scheduled referral fee category. Fees stay in the currency on the row. Dimensions and weight stay in the units on the row. A blank fee is unknown, not zero. A product missing from a snapshot had no active FBA offer in that snapshot. A snapshot for one marketplace is not copied to another marketplace. History starts when the first snapshot is collected.

### FBA Storage Fee Charges

- Table name: `amazon_fba_storage_fees`
- Columns: 37
- Markdown: data-scheme/amazon_fba_storage_fees.md

Daily FBA storage fee charges with historical data.

### FBA Long-Term Storage Fee Charges

- Table name: `amazon_fba_long_term_storage_fees`
- Columns: 25
- Markdown: data-scheme/amazon_fba_long_term_storage_fees.md

Long-term FBA storage fee charges for the previous 13 completed calendar months. The previous month is refreshed daily.

### FBA Reimbursements

- Table name: `amazon_fba_reimbursements`
- Columns: 29
- Markdown: data-scheme/amazon_fba_reimbursements.md

Daily FBA reimbursements with historical data.

### Returns (FBA & FBM)

- Table name: `amazon_returns`
- Columns: 40
- Markdown: data-scheme/amazon_returns.md

Physical return events, not payout refunds. FBA rows are items received at a fulfillment center; date is return/receipt date. FBM rows are return requests by return-request date. quantity is returned units. fnsku and fba_customer_comments are FBA only. product_name is the name on the returns report (FBA product-name, FBM item-name). amazon_return_detailed_disposition is FBA only (SELLABLE, CUSTOMER_DAMAGED, DEFECTIVE, etc.). cogs_* is unit cost as of the return date, times quantity. For payout refunds use amazon_settlements_with_cogs where settlement_type is REFUND.

### Account Status Changed Notifications

- Table name: `amazon_notifications_account_status_changed`
- Columns: 11
- Markdown: data-scheme/amazon_notifications_account_status_changed.md

Near real-time Amazon SP-API ACCOUNT_STATUS_CHANGED notifications for seller account health and performance status changes.

### Any Offer Changed Notifications

- Table name: `amazon_notifications_any_offer_changed`
- Columns: 11
- Markdown: data-scheme/amazon_notifications_any_offer_changed.md

Near real-time Amazon SP-API ANY_OFFER_CHANGED notifications for competitive offer and Buy Box changes.

### B2B Any Offer Changed Notifications

- Table name: `amazon_notifications_b2b_any_offer_changed`
- Columns: 11
- Markdown: data-scheme/amazon_notifications_b2b_any_offer_changed.md

Near real-time Amazon SP-API B2B_ANY_OFFER_CHANGED notifications for B2B competitive offer changes.

### Detail Page Traffic Event Notifications

- Table name: `amazon_notifications_detail_page_traffic_event`
- Columns: 11
- Markdown: data-scheme/amazon_notifications_detail_page_traffic_event.md

Near real-time Amazon SP-API DETAIL_PAGE_TRAFFIC_EVENT notifications for detail page traffic events.

### FBA Inventory Availability Changes Notifications

- Table name: `amazon_notifications_fba_inventory_availability_changes`
- Columns: 11
- Markdown: data-scheme/amazon_notifications_fba_inventory_availability_changes.md

Near real-time Amazon SP-API FBA_INVENTORY_AVAILABILITY_CHANGES notifications for FBA inventory availability changes.

### FBA Outbound Shipment Status Notifications

- Table name: `amazon_notifications_fba_outbound_shipment_status`
- Columns: 11
- Markdown: data-scheme/amazon_notifications_fba_outbound_shipment_status.md

Near real-time Amazon SP-API FBA_OUTBOUND_SHIPMENT_STATUS notifications for FBA outbound shipment status updates.

### MCF Fulfillment Order Status Notifications

- Table name: `amazon_notifications_fulfillment_order_status`
- Columns: 11
- Markdown: data-scheme/amazon_notifications_fulfillment_order_status.md

Near real-time Amazon SP-API FULFILLMENT_ORDER_STATUS notifications (payload version 2026-07-04) for Multi-Channel Fulfillment order, shipment, and package status changes. eventType is ORDER_STATUS_CHANGED, SHIPMENT_STATUS_CHANGED, or SHIPMENT_PACKAGE_STATUS_CHANGED. Tracking numbers and estimated delivery times are present only when Amazon sends them. Returns are not included. Seller Central only, for Amazon MCF marketplaces in North America, Europe, and the Far East. This is not the Brazil FBA Onsite notification and not the US-only Tracking API.

### Fee Promotion Notifications

- Table name: `amazon_notifications_fee_promotion`
- Columns: 11
- Markdown: data-scheme/amazon_notifications_fee_promotion.md

Near real-time Amazon SP-API FEE_PROMOTION notifications for Amazon fee promotion events.

### Item Inventory Event Change Notifications

- Table name: `amazon_notifications_item_inventory_event_change`
- Columns: 11
- Markdown: data-scheme/amazon_notifications_item_inventory_event_change.md

Near real-time Amazon SP-API ITEM_INVENTORY_EVENT_CHANGE notifications for item inventory event changes.

### Item Product Type Change Notifications

- Table name: `amazon_notifications_item_product_type_change`
- Columns: 11
- Markdown: data-scheme/amazon_notifications_item_product_type_change.md

Near real-time Amazon SP-API ITEM_PRODUCT_TYPE_CHANGE notifications for listing product type definition changes.

### Item Sales Event Change Notifications

- Table name: `amazon_notifications_item_sales_event_change`
- Columns: 11
- Markdown: data-scheme/amazon_notifications_item_sales_event_change.md

Near real-time Amazon SP-API ITEM_SALES_EVENT_CHANGE notifications for item sales event changes.

### Listings Item Issues Change Notifications

- Table name: `amazon_notifications_listings_item_issues_change`
- Columns: 11
- Markdown: data-scheme/amazon_notifications_listings_item_issues_change.md

Near real-time Amazon SP-API LISTINGS_ITEM_ISSUES_CHANGE notifications for listing quality and issue changes.

### Listings Item MFN Quantity Change Notifications

- Table name: `amazon_notifications_listings_item_mfn_quantity_change`
- Columns: 11
- Markdown: data-scheme/amazon_notifications_listings_item_mfn_quantity_change.md

Near real-time Amazon SP-API LISTINGS_ITEM_MFN_QUANTITY_CHANGE notifications for MFN listing quantity changes.

### Listings Item Status Change Notifications

- Table name: `amazon_notifications_listings_item_status_change`
- Columns: 11
- Markdown: data-scheme/amazon_notifications_listings_item_status_change.md

Near real-time Amazon SP-API LISTINGS_ITEM_STATUS_CHANGE notifications for listing status changes.

### Pricing Health Notifications

- Table name: `amazon_notifications_pricing_health`
- Columns: 11
- Markdown: data-scheme/amazon_notifications_pricing_health.md

Near real-time Amazon SP-API PRICING_HEALTH notifications for Featured Offer ineligibility caused by an uncompetitive price.

### Shipment Tracking Milestone Changed Notifications

- Table name: `amazon_notifications_shipment_tracking_milestone_changed`
- Columns: 11
- Markdown: data-scheme/amazon_notifications_shipment_tracking_milestone_changed.md

Near real-time Amazon SP-API SHIPMENT_TRACKING_MILESTONE_CHANGED notifications for Amazon Tracking API shipment milestone updates.

### Transaction Update Notifications

- Table name: `amazon_notifications_transaction_update`
- Columns: 11
- Markdown: data-scheme/amazon_notifications_transaction_update.md

Near real-time Amazon SP-API TRANSACTION_UPDATE notifications for financial transaction updates.

### Branded Listing Content Changes

- Table name: `amazon_notifications_branded_item_content_change`
- Columns: 14
- Markdown: data-scheme/amazon_notifications_branded_item_content_change.md

Near real-time changes to title, bullet points, description or images for ASINs with an Amazon Brand Registry relationship.

### MCF Fulfillment Coverage

- Table name: `amazon_mcf_fulfillment_coverage`
- Columns: 29
- Markdown: data-scheme/amazon_mcf_fulfillment_coverage.md

Confirmed Multi-Channel Fulfillment (MCF) units Amazon reported as shipped. One row is one shipment item on the latest SHIPMENT_STATUS_CHANGED notification whose shipment status is SHIPPED. Rows appear only after this table, or MCF Fulfillment Order Status Notifications, is enabled. Shipments reported before the first stored notification are absent. A row does not show the full life of an order that started earlier. This is not profit, margin, or return on investment (ROI). External store sales, shipping income, discounts, tax, and refunds are unavailable, not zero. Uploaded product cost is unavailable because the seller fulfillment order id is not linked to a purchase date. Amazon fees are omitted and may already be inside Profit by Date and Profit by SKU and Date, so do not add those tables to this one. An omitted cost is not zero. Uploaded shipping cost, shared Fulfillment by Amazon (FBA) storage, and inbound costs are excluded. A physical return does not change these units. A repeated notification does not add the same shipment item. A later notification replaces the earlier one. Package delivery events are not extra shipments. Declared order amounts are not sales.

### Order Change Notifications

- Table name: `amazon_notifications_order_change`
- Columns: 17
- Markdown: data-scheme/amazon_notifications_order_change.md

Near real-time Amazon order change notifications. Includes order status changes, buyer-requested changes, and UK Amazon Autos reservation status.

### Seller Feedback

- Table name: `amazon_seller_feedback`
- Columns: 12
- Markdown: data-scheme/amazon_seller_feedback.md

Negative and neutral feedback, with one to three stars, left for the seller by buyers. Buyer email, buyer comments, and seller responses become NULL after 30 days from the feedback date. Historical rows, order identifiers, dates, and ratings remain available.

### Seller Product Ratings and Reviews

- Table name: `amazon_seller_review_metrics`
- Columns: 19
- Markdown: data-scheme/amazon_seller_review_metrics.md

Product star ratings and review counts by child ASIN, marketplace, and period for a Seller Central account. This is not buyer feedback left for the seller, and it does not include review text. Review counts cover the returned period. Ratings are the product rating at the snapshot, not new reviews in that period. date is the start of the period Amazon returned. A week or month stays one row. An empty metric means Amazon did not return a value. It is not a confirmed zero. A stored review count of zero is a real zero. An empty total_rating_count with empty ratings means Amazon returned no rating snapshot for that ASIN and period, not that the product has no ratings. Initial collection covers 365 days of activity and 12 completed calendar months of rating snapshots. Activity refreshes cover seven days daily and 31 days every 30 days in batches of at most seven days with DAY output. Amazon returns the star rating for a completed calendar month. A single day does not include the star rating. Amazon returns rating snapshots for only some ASINs, and for some accounts a completed month has no products. Such a month adds no MONTH row. The latest completed month refreshes every day. Two completed months refresh every 30 days. Amazon does not return the calendar month that is still in progress.

### Seller Account Health Metrics

- Table name: `amazon_seller_performance`
- Columns: 102
- Markdown: data-scheme/amazon_seller_performance.md

Seller Central Account Health from GET_V2_SELLER_PERFORMANCE_REPORT. The latest date is the current snapshot; Amazon does not return history for older requested dates. Column windows are 7 days, 14 days, 30 days, 60 days, or 6 months. *_value and *_target_* columns are rates. *_count columns are counts. *_status is the health status. seller_account_health_rating_6m_score is the Account Health Rating score (0–1000), not a percentage. Amazon Account Health rate for the window in the column name. Same scale as the matching target column. A rate, not a count. Do not recompute it from the count columns.

### Search Engagement by ASIN (Monthly)

- Table name: `amazon_child_product_search_performance_per_month`
- Columns: 31
- Markdown: data-scheme/amazon_child_product_search_performance_per_month.md

Monthly Search Catalog Performance per child ASIN (GET_BRAND_ANALYTICS_SEARCH_CATALOG_PERFORMANCE_REPORT). Impressions, clicks, cart adds, and purchases from search results, including sponsored results. search_click_rate is clicks divided by impressions. search_conversion_rate is purchases divided by clicks. Both rates are 0-1 fractions (Amazon examples are 0.1 and 0.05). Not Search Query Performance; that is amazon_child_product_organic_search_ranks_per_week and amazon_child_product_organic_search_ranks_per_month. Weekly grain is amazon_child_product_search_performance_per_week.

### Search Engagement by ASIN (Weekly)

- Table name: `amazon_child_product_search_performance_per_week`
- Columns: 31
- Markdown: data-scheme/amazon_child_product_search_performance_per_week.md

Weekly Search Catalog Performance per child ASIN (GET_BRAND_ANALYTICS_SEARCH_CATALOG_PERFORMANCE_REPORT, reportPeriod WEEK). Each row is one Sunday–Saturday week. Impressions, clicks, cart adds, and purchases from search results, including sponsored results. search_click_rate is clicks divided by impressions. search_conversion_rate is purchases divided by clicks. Both rates are 0-1 fractions (Amazon examples are 0.1 and 0.05). Not Search Query Performance; that is amazon_child_product_organic_search_ranks_per_week and amazon_child_product_organic_search_ranks_per_month. Monthly grain is amazon_child_product_search_performance_per_month.

### Amazon Financial Transactions

- Table name: `amazon_financial_transactions`
- Columns: 34
- Markdown: data-scheme/amazon_financial_transactions.md

Seller Central finances transactions, one latest stored row per transaction id on a DataDoe connection. A hold and its release stay as separate rows when Amazon gives them separate ids. total_amount is the signed total Amazon sent, once per row, in the reported currency. Summing every row counts a hold and its release twice and mixes Transfers with sales. For a deferred forecast, use is_outstanding_deferred = TRUE, group by currency, and keep rows with an empty expected_release_at or total_amount. posted_at is the UTC posting time of this transaction id. date is that instant as a marketplace-local calendar date, with America/Los_Angeles for the US and Canada, and Export from and to filters use date. expected_release_at is the maturity time Amazon reported while the transaction is deferred. It can change and is not a bank deposit time. is_outstanding_deferred is true only for a stored DEFERRED status with no stored release. The first finances load reads 370 one-day posted windows, the daily load reads 8 one-day windows, and the 10am and 4pm loads read 2 posted days in the marketplace time zone. Those are start times, not a promise of when the row appears. Deferred rows outside those windows can keep an old status, reason, or maturity time. A later release row can clear a known hold. This table does not list every current hold at Amazon. Sums skip empty amounts.

### Settlements & P&L Components

- Table name: `amazon_settlements_with_cogs`
- Columns: 227
- Markdown: data-scheme/amazon_settlements_with_cogs.md

Financial events from Amazon Finances. date is the marketplace-local date of the winning transaction posted time (America/Los_Angeles for US and CA). Once released it matches Transaction Release Date; while still deferred it is the local date of the deferred posting, and it can be one day earlier than the UTC posted timestamp near midnight. transaction_posted_date matches the Amazon Transaction report date/time column and is earlier than date for deferred orders. transaction_release_date matches Transaction Release Date and equals date once released. shipping_promotion_rebate is the order shipping promotion, a rebate to the customer and not an Amazon fee; promotion_fee holds the same values and is kept for backward compatibility. settlement_type REFUND is a money event, not a warehouse return. ORDER rows use order-date COGS; REFUND rows use return-receipt-date COGS (0 when no return). COGS is stored negative. All columns other than "total" express a single type of cost/fee/income. Expenses are negative values (standardize this when comparing with other tables). total_non_principal_amount is total minus item_price in the payout sign. total_fees holds the same value and will be removed on 2026-10-31. marketplace_facilitator_vat / refund_marketplace_facilitator_vat are MarketplaceFacilitatorVAT-* ItemWithheldTax lines (EU/UK); US MarketplaceFacilitatorTax-* stays in item_withheld_tax / refund_item_withheld_tax. fba_inbound_transportation_fee and fba_inbound_transportation_program_fee are the base fee amounts from Amazon Finances. When Amazon reports tax on those fees separately, that tax is in item_tax. DataDoe does not estimate this tax by dividing the fee. Settlement report base fee amounts stay on the fee column, and settlement report tax on fee lines map to item_tax. There is no dedicated Lightning Deal Fee column because Finances does not distinguish Lightning from Best Deal; those amounts are in deal_participation_fee. Refund Customer Return - Not Received is not available from Finances. Merchant-fulfilled Buy Shipping label fees (LabmanLabelPurchase / LabmanLabelReturn / LabmanLabelChargeBack) attach to the order SKU when that order has a single SKU in the Amazon order report. Amazon settlement start, settlement end, and deposit timestamps are not columns on this table. They are on the raw finances transactions table when a settlement report header matches the settlement ID. The deposit timestamp is the time Amazon starts the funds transfer, not the time the money arrives at the bank.

### Search Query Performance (SQP) by ASIN (Weekly)

- Table name: `amazon_child_product_organic_search_ranks_per_week`
- Columns: 44
- Markdown: data-scheme/amazon_child_product_organic_search_ranks_per_week.md

Weekly Search Query Performance (SQP) per child ASIN and search query (GET_BRAND_ANALYTICS_SEARCH_QUERY_PERFORMANCE_REPORT). child_asin_* columns are this ASIN. search_query_total_* and search_query_volume are the whole query and repeat on every ASIN row. Rates follow Amazon schema examples of 0–1. Only configured SQP ASINs are included.

### Search Query Performance (SQP) by ASIN (Monthly)

- Table name: `amazon_child_product_organic_search_ranks_per_month`
- Columns: 44
- Markdown: data-scheme/amazon_child_product_organic_search_ranks_per_month.md

Monthly Search Query Performance (SQP) per child ASIN and search query (GET_BRAND_ANALYTICS_SEARCH_QUERY_PERFORMANCE_REPORT). child_asin_* columns are this ASIN. search_query_total_* and search_query_volume are the whole query and repeat on every ASIN row. Rates follow Amazon schema examples of 0–1. Only configured SQP ASINs are included. Not amazon_child_product_search_performance_per_month (catalog-level search engagement).

### Repeat Purchase Performance

- Table name: `amazon_repeat_purchase_report`
- Columns: 14
- Markdown: data-scheme/amazon_repeat_purchase_report.md

Monthly Brand Analytics repeat purchase report per child ASIN for Brand Registry sellers and vendors. One row per child ASIN and month. repeat_customers_score_total and repeat_purchase_revenue_score_total are 0-1 rates. Repeat revenue is ordered revenue and excludes returns.

### Repeat Purchase Performance (Quarterly)

- Table name: `amazon_repeat_purchase_report_quarterly`
- Columns: 14
- Markdown: data-scheme/amazon_repeat_purchase_report_quarterly.md

Quarterly Brand Analytics repeat purchase report per child ASIN for Brand Registry sellers and vendors. One row per child ASIN, connection, marketplace and calendar quarter. repeat_customers_score_total and repeat_purchase_revenue_score_total are 0-1 rates calculated inside the quarter, not the sum or average of monthly rates. Repeat revenue is ordered revenue and excludes returns. Initial collection requests the last 4 complete calendar quarters. Weekly refresh requests the last 2 complete calendar quarters. The quarter in progress is excluded.

### Market Basket Co-Purchase (Monthly)

- Table name: `amazon_market_basket_by_child_asin`
- Columns: 11
- Markdown: data-scheme/amazon_market_basket_by_child_asin.md

Monthly Brand Analytics market basket report of products frequently bought together. One row per child ASIN and co-purchased ASIN. The co-purchased ASIN can belong to another brand. purchased_with_combination_score is a 0-1 share of multi-item orders.

### Brand Analytics Search Terms (Daily)

- Table name: `amazon_brand_analytics_search_terms_daily`
- Columns: 14
- Markdown: data-scheme/amazon_brand_analytics_search_terms_daily.md

Daily marketplace Brand Analytics search terms: top clicked ASINs by customer keyword and department, with search frequency rank, click share, and conversion share. Shares are 0-1 fractions. Marketplace-wide, so clicked ASINs are often competitors. For your own ASIN search query performance use amazon_child_product_organic_search_ranks_per_week or amazon_child_product_organic_search_ranks_per_month. Data can lag; use MAX(date).

### Brand Analytics Search Terms (Weekly)

- Table name: `amazon_brand_analytics_search_terms_weekly`
- Columns: 14
- Markdown: data-scheme/amazon_brand_analytics_search_terms_weekly.md

Weekly marketplace Brand Analytics search terms: top clicked ASINs by customer keyword and department, with search frequency rank, click share, and conversion share. Shares are 0-1 fractions. Marketplace-wide, so clicked ASINs are often competitors. For your own ASIN search query performance use amazon_child_product_organic_search_ranks_per_week or amazon_child_product_organic_search_ranks_per_month. Data can lag; use MAX(date).

### Brand Analytics Search Terms (Monthly)

- Table name: `amazon_brand_analytics_search_terms_monthly`
- Columns: 14
- Markdown: data-scheme/amazon_brand_analytics_search_terms_monthly.md

Monthly marketplace Brand Analytics search terms: top clicked ASINs by customer keyword and department, with search frequency rank, click share, and conversion share. Shares are 0-1 fractions. Marketplace-wide, so clicked ASINs are often competitors. For your own ASIN search query performance use amazon_child_product_organic_search_ranks_per_week or amazon_child_product_organic_search_ranks_per_month. Data can lag; use MAX(date).

### Product Catalog by ASIN

- Table name: `amazon_products_by_child_asin`
- Columns: 27
- Markdown: data-scheme/amazon_products_by_child_asin.md

Catalog Items snapshot per child ASIN and marketplace: title, brand, bullets, description, browse node, and best seller rank. amazon_product_type is PARENT, CHILD, or SINGLE. For the catalog product type template and raw JSON attributes, classifications, images, and sales ranks, use amazon_products_raw.

### Product Catalog by ASIN (Raw JSON)

- Table name: `amazon_products_raw`
- Columns: 17
- Markdown: data-scheme/amazon_products_raw.md

Raw Catalog Items payload per child ASIN and marketplace: attributes, classifications, dimensions, identifiers, images, sales ranks, summaries, and relationships. amazon_product_type is PARENT, CHILD, or SINGLE; product_type is the Amazon product type template. Prefer amazon_products_by_child_asin for titles, bullets, and best seller rank. Rows are large; download them to a file instead of loading them into context.

### Product Catalog by ASIN History

- Table name: `amazon_products_by_child_asin_history`
- Columns: 31
- Markdown: data-scheme/amazon_products_by_child_asin_history.md

Successful Amazon Catalog Items observations per child ASIN and marketplace for items the Organization tracks. A later successful response is retained even when unchanged; a retry keeps the original observation_id and checked_at without adding a duplicate. History starts after the Organization enables it and tracks the item. A newly associated item receives its next successful observation, without older shared-cache history. The source stays off until a staged Connector rollout enables it. History follows the existing catalog refresh. DataDoe can request an item again one day after its last cache update. The catalog worker runs every 15 minutes in each region and stops at its time limit, so a tracked item can go more than one day without a new observation. A history delivery backlog does not stop current catalog refreshes. Failed, throttled, empty and hard-failed attempts and items Amazon omits create no history observation. Missing days and source values remain unknown: a missing item or rank does not mean deletion or a zero rank. Observations are per item, not an atomic snapshot of the whole catalog. Changes occurred between observations; checked_at is not the exact time Amazon edited the item. Use amazon_products_by_child_asin and amazon_products_raw for current-state joins to sales, inventory and profit. They keep one latest row per ASIN and marketplace and provide the cached onboarding baseline. Legacy rows can have null checked_at and observation_id; overwritten payloads are not recovered or assigned invented times. When Amazon omits an item, its current row is created or cleared without a new checked_at and without a history observation. Filter history by child_asin, marketplace_id and a date range; date and snapshot_date are the UTC date of checked_at. For rank trends, order by checked_at and observation_id and compare category names and raw category identifiers, which can change. To compare observations, join on child_asin and marketplace_id and filter the two observation_id values; an absent observation produces no comparison. For the last observed state at a chosen time, filter checked_at <= the chosen timestamp, then use QUALIFY ROW_NUMBER() OVER (PARTITION BY child_asin, marketplace_id ORDER BY checked_at DESC, observation_id DESC) = 1. This returns only items observed by that time and does not fill gaps with current content.

### Product Catalog by ASIN History (Raw JSON)

- Table name: `amazon_products_raw_history`
- Columns: 22
- Markdown: data-scheme/amazon_products_raw_history.md

Successful Amazon Catalog Items observations per child ASIN and marketplace for items the Organization tracks. A later successful response is retained even when unchanged; a retry keeps the original observation_id and checked_at without adding a duplicate. History starts after the Organization enables it and tracks the item. A newly associated item receives its next successful observation, without older shared-cache history. The source stays off until a staged Connector rollout enables it. History follows the existing catalog refresh. DataDoe can request an item again one day after its last cache update. The catalog worker runs every 15 minutes in each region and stops at its time limit, so a tracked item can go more than one day without a new observation. A history delivery backlog does not stop current catalog refreshes. Failed, throttled, empty and hard-failed attempts and items Amazon omits create no history observation. Missing days and source values remain unknown: a missing item or rank does not mean deletion or a zero rank. Observations are per item, not an atomic snapshot of the whole catalog. Changes occurred between observations; checked_at is not the exact time Amazon edited the item. Use amazon_products_by_child_asin and amazon_products_raw for current-state joins to sales, inventory and profit. They keep one latest row per ASIN and marketplace and provide the cached onboarding baseline. Legacy rows can have null checked_at and observation_id; overwritten payloads are not recovered or assigned invented times. When Amazon omits an item, its current row is created or cleared without a new checked_at and without a history observation. Filter history by child_asin, marketplace_id and a date range; date and snapshot_date are the UTC date of checked_at. For rank trends, order by checked_at and observation_id and compare category names and raw category identifiers, which can change. To compare observations, join on child_asin and marketplace_id and filter the two observation_id values; an absent observation produces no comparison. For the last observed state at a chosen time, filter checked_at <= the chosen timestamp, then use QUALIFY ROW_NUMBER() OVER (PARTITION BY child_asin, marketplace_id ORDER BY checked_at DESC, observation_id DESC) = 1. This returns only items observed by that time and does not fill gaps with current content. Listing-specific prices, inventory, the advertising product catalog, Search Catalog Performance and A+ content are separate data sources. Matches amazon_products_by_child_asin_history by child_asin, marketplace_id and observation_id. Full product_data preserves the complete source JSON, including sales-rank arrays and category identifiers; missing values remain null. Rows are large; download payloads to a file. For MCP raw-history exports, paginate with limit and skip: at most 100 rows in JSON or 250 rows in CSV. REST file generation and direct BigQuery queries use their own policies.

### Coupon Performance

- Table name: `amazon_coupon_performance`
- Columns: 34
- Markdown: data-scheme/amazon_coupon_performance.md

Seller and vendor coupon performance, one row per coupon and ASIN. Includes clips, redemptions, budget, and the ASIN discount. Campaign and coupon totals repeat on every ASIN row. Vendor rows carry campaign, vendor code, and Subscribe and Save; sales is seller coupon revenue. Filter on start_date_time. Join amazon_promotions on promotions_api_mapping_id.

### Promotion Performance

- Table name: `amazon_promotion_performance`
- Columns: 32
- Markdown: data-scheme/amazon_promotion_performance.md

Seller and vendor promotion performance for Best Deal, Lightning Deal, Price Discount, and related deal types. One row per promotion and ASIN. Glance views, units, funding, and revenue at promotion level repeat on every ASIN row; use the product_ columns for the ASIN. amount_spent is vendor funding. Seller revenue matches Seller Central sales. Configuration lives on amazon_promotions.

### Customer Feedback ASIN Categories

- Table name: `amazon_customer_feedback_item_browse_nodes`
- Columns: 13
- Markdown: data-scheme/amazon_customer_feedback_item_browse_nodes.md

The browse node Amazon Customer Feedback associated with each child ASIN. One row is one associated node, not the full category path. DataDoe collects a new snapshot about every 30 days.

### Customer Feedback ASIN Review Topics

- Table name: `amazon_customer_feedback_item_review_topics`
- Columns: 29
- Markdown: data-scheme/amazon_customer_feedback_item_review_topics.md

Customer Feedback review topics for a child ASIN, sorted by mentions. DataDoe collects about every 30 days. Amazon may refresh the source weekly, so a row can be newer than the previous fetch. Topics are the ones Amazon returned, not a complete list. Snippets and topic names are the text Amazon returned, not full reviews. Amazon chooses the language. Sentiment is the positive or negative list, not a star rating. Percentages are the source values and are not additive. Category fields are empty when the ASIN has no category mapping.

### Customer Feedback ASIN Review Subtopics

- Table name: `amazon_customer_feedback_item_review_subtopics`
- Columns: 26
- Markdown: data-scheme/amazon_customer_feedback_item_review_subtopics.md

Customer Feedback review subtopics for a child ASIN. Subtopics stay under the topic Amazon returned. There is no extra subtopic for reviews that do not match a returned subtopic. Percentages are the source values and are not additive.

### Customer Feedback Category Review Topics

- Table name: `amazon_customer_feedback_browse_node_review_topics`
- Columns: 25
- Markdown: data-scheme/amazon_customer_feedback_browse_node_review_topics.md

Customer Feedback review topics for all products in a browse node. This is not an ASIN topic list. DataDoe collects about every 30 days. Topics are the ones Amazon returned, not a complete list. Percentages are the source values. Do not add them across products or connections.

### Customer Feedback Category Review Subtopics

- Table name: `amazon_customer_feedback_browse_node_review_subtopics`
- Columns: 23
- Markdown: data-scheme/amazon_customer_feedback_browse_node_review_subtopics.md

Customer Feedback review subtopics for all products in a browse node. A category subtopic has an occurrence percentage only. It has no mention count. There is no extra subtopic for reviews that do not match a returned subtopic.

### Customer Feedback Category Return Topics

- Table name: `amazon_customer_feedback_browse_node_return_topics`
- Columns: 17
- Markdown: data-scheme/amazon_customer_feedback_browse_node_return_topics.md

Customer Feedback return topics for all products in a browse node. The occurrence percentage is not an ASIN return rate. The table has no sentiment, snippets, or mention counts.

### Customer Feedback ASIN Review Trends

- Table name: `amazon_customer_feedback_item_review_trends`
- Columns: 24
- Markdown: data-scheme/amazon_customer_feedback_item_review_trends.md

Customer Feedback monthly review topic trends for a child ASIN. DataDoe fetches a new response about every 30 days. Amazon may refresh the source weekly. date is the UTC day of the fetch. period_start_at_utc and period_end_at_utc are the month Amazon returned for that point. Percentages are the source values on a 0 to 100 scale. A missing parent or category percentage means Amazon did not return that comparison. Category names stay empty when the ASIN has no category mapping.

### Customer Feedback Category Review Trends

- Table name: `amazon_customer_feedback_browse_node_review_trends`
- Columns: 21
- Markdown: data-scheme/amazon_customer_feedback_browse_node_review_trends.md

Customer Feedback monthly review topic trends for all products in a browse node. This is separate from ASIN trends. DataDoe fetches a new response about every 30 days. date is the UTC day of the fetch. period_start_at_utc and period_end_at_utc are the month Amazon returned. The top 25 percent column is the source percentage for the top 25 percent of products, not 25 percent of the all-products value. Percentages are the source values on a 0 to 100 scale.

### Customer Feedback Category Return Trends

- Table name: `amazon_customer_feedback_browse_node_return_trends`
- Columns: 19
- Markdown: data-scheme/amazon_customer_feedback_browse_node_return_trends.md

Customer Feedback monthly return topic trends for all products in a browse node. The percentage is the share of category return feedback that mentions the topic. It is not the share of sold units that were returned. The table has no sentiment. DataDoe fetches a new response about every 30 days. date is the UTC day of the fetch. period_start_at_utc and period_end_at_utc are the month Amazon returned.

### Sellers & Vendors Context

- Table name: `amazon_sellers_and_vendors_context`
- Columns: 18
- Markdown: data-scheme/amazon_sellers_and_vendors_context.md

Lookup of DataDoe Amazon accounts for Seller Central, Vendor Central, Amazon Ads, and Amazon DSP. One row per connection, plus one row per Amazon DSP advertiser mapped to a seller or vendor on a shared agency Ads account. A DSP-only agency seat is not its own seller. seller_or_vendor_id equals connection_context_id and is not unique: one context can have a Seller Central row, an Amazon Ads row, and one row per DSP advertiser. Join Seller Central and Vendor Central facts on sp_connection_id or vendor_connection_id. Attribute DSP facts on organization_id, store_id, ads_dsp_connection_id, and dsp_advertiser_id.

### Cost of Goods Sold (COGS)

- Table name: `amazon_cogs`
- Columns: 16
- Markdown: data-scheme/amazon_cogs.md

Your uploaded product cost ledger, maintained by the user. Seller costs are per SKU and ASIN; vendor costs are per account, marketplace, ASIN and effective date with empty SKU. Vendor rows can have optional vendor-code, fulfillment and exact-PO variant keys; an empty set of variant keys is the explicit ASIN default. The full variant key and effective date identify an upsert or edit. Uploaded costs stay separate from Amazon-reported costs. COGS are managed by the user via form in the Sellers & Vendors page. Every 5 days DataDoe checks sellers with at least one COGS row and emails organization owners when SKUs sold in the last 30 days have no COGS. To list SKUs sold in the last 30 days without COGS, use GET /api/v1/cogs/missing or the MCP tool cogs_missing_list.

### Order Details PII

- Table name: `amazon_orders_details`
- Columns: 31
- Markdown: data-scheme/amazon_orders_details.md

Order-level customer and shipping details that extend `amazon_order_items_with_cogs`, including shipping and delivery deadlines when Amazon provides them. Personal fields become NULL after 30 days from the purchase date. Historical rows, order identifiers, dates, and coarse geography remain available.

## Vendor Central (54 tables)

### Repeat Purchase Performance

- Table name: `amazon_repeat_purchase_report`
- Columns: 14
- Markdown: data-scheme/amazon_repeat_purchase_report.md

Monthly Brand Analytics repeat purchase report per child ASIN for Brand Registry sellers and vendors. One row per child ASIN and month. repeat_customers_score_total and repeat_purchase_revenue_score_total are 0-1 rates. Repeat revenue is ordered revenue and excludes returns.

### Repeat Purchase Performance (Quarterly)

- Table name: `amazon_repeat_purchase_report_quarterly`
- Columns: 14
- Markdown: data-scheme/amazon_repeat_purchase_report_quarterly.md

Quarterly Brand Analytics repeat purchase report per child ASIN for Brand Registry sellers and vendors. One row per child ASIN, connection, marketplace and calendar quarter. repeat_customers_score_total and repeat_purchase_revenue_score_total are 0-1 rates calculated inside the quarter, not the sum or average of monthly rates. Repeat revenue is ordered revenue and excludes returns. Initial collection requests the last 4 complete calendar quarters. Weekly refresh requests the last 2 complete calendar quarters. The quarter in progress is excluded.

### Market Basket Co-Purchase (Monthly)

- Table name: `amazon_market_basket_by_child_asin`
- Columns: 11
- Markdown: data-scheme/amazon_market_basket_by_child_asin.md

Monthly Brand Analytics market basket report of products frequently bought together. One row per child ASIN and co-purchased ASIN. The co-purchased ASIN can belong to another brand. purchased_with_combination_score is a 0-1 share of multi-item orders.

### Brand Analytics Search Terms (Daily)

- Table name: `amazon_brand_analytics_search_terms_daily`
- Columns: 14
- Markdown: data-scheme/amazon_brand_analytics_search_terms_daily.md

Daily marketplace Brand Analytics search terms: top clicked ASINs by customer keyword and department, with search frequency rank, click share, and conversion share. Shares are 0-1 fractions. Marketplace-wide, so clicked ASINs are often competitors. For your own ASIN search query performance use amazon_child_product_organic_search_ranks_per_week or amazon_child_product_organic_search_ranks_per_month. Data can lag; use MAX(date).

### Brand Analytics Search Terms (Weekly)

- Table name: `amazon_brand_analytics_search_terms_weekly`
- Columns: 14
- Markdown: data-scheme/amazon_brand_analytics_search_terms_weekly.md

Weekly marketplace Brand Analytics search terms: top clicked ASINs by customer keyword and department, with search frequency rank, click share, and conversion share. Shares are 0-1 fractions. Marketplace-wide, so clicked ASINs are often competitors. For your own ASIN search query performance use amazon_child_product_organic_search_ranks_per_week or amazon_child_product_organic_search_ranks_per_month. Data can lag; use MAX(date).

### Brand Analytics Search Terms (Monthly)

- Table name: `amazon_brand_analytics_search_terms_monthly`
- Columns: 14
- Markdown: data-scheme/amazon_brand_analytics_search_terms_monthly.md

Monthly marketplace Brand Analytics search terms: top clicked ASINs by customer keyword and department, with search frequency rank, click share, and conversion share. Shares are 0-1 fractions. Marketplace-wide, so clicked ASINs are often competitors. For your own ASIN search query performance use amazon_child_product_organic_search_ranks_per_week or amazon_child_product_organic_search_ranks_per_month. Data can lag; use MAX(date).

### Product Catalog by ASIN

- Table name: `amazon_products_by_child_asin`
- Columns: 27
- Markdown: data-scheme/amazon_products_by_child_asin.md

Catalog Items snapshot per child ASIN and marketplace: title, brand, bullets, description, browse node, and best seller rank. amazon_product_type is PARENT, CHILD, or SINGLE. For the catalog product type template and raw JSON attributes, classifications, images, and sales ranks, use amazon_products_raw.

### Product Catalog by ASIN (Raw JSON)

- Table name: `amazon_products_raw`
- Columns: 17
- Markdown: data-scheme/amazon_products_raw.md

Raw Catalog Items payload per child ASIN and marketplace: attributes, classifications, dimensions, identifiers, images, sales ranks, summaries, and relationships. amazon_product_type is PARENT, CHILD, or SINGLE; product_type is the Amazon product type template. Prefer amazon_products_by_child_asin for titles, bullets, and best seller rank. Rows are large; download them to a file instead of loading them into context.

### Product Catalog by ASIN History

- Table name: `amazon_products_by_child_asin_history`
- Columns: 31
- Markdown: data-scheme/amazon_products_by_child_asin_history.md

Successful Amazon Catalog Items observations per child ASIN and marketplace for items the Organization tracks. A later successful response is retained even when unchanged; a retry keeps the original observation_id and checked_at without adding a duplicate. History starts after the Organization enables it and tracks the item. A newly associated item receives its next successful observation, without older shared-cache history. The source stays off until a staged Connector rollout enables it. History follows the existing catalog refresh. DataDoe can request an item again one day after its last cache update. The catalog worker runs every 15 minutes in each region and stops at its time limit, so a tracked item can go more than one day without a new observation. A history delivery backlog does not stop current catalog refreshes. Failed, throttled, empty and hard-failed attempts and items Amazon omits create no history observation. Missing days and source values remain unknown: a missing item or rank does not mean deletion or a zero rank. Observations are per item, not an atomic snapshot of the whole catalog. Changes occurred between observations; checked_at is not the exact time Amazon edited the item. Use amazon_products_by_child_asin and amazon_products_raw for current-state joins to sales, inventory and profit. They keep one latest row per ASIN and marketplace and provide the cached onboarding baseline. Legacy rows can have null checked_at and observation_id; overwritten payloads are not recovered or assigned invented times. When Amazon omits an item, its current row is created or cleared without a new checked_at and without a history observation. Filter history by child_asin, marketplace_id and a date range; date and snapshot_date are the UTC date of checked_at. For rank trends, order by checked_at and observation_id and compare category names and raw category identifiers, which can change. To compare observations, join on child_asin and marketplace_id and filter the two observation_id values; an absent observation produces no comparison. For the last observed state at a chosen time, filter checked_at <= the chosen timestamp, then use QUALIFY ROW_NUMBER() OVER (PARTITION BY child_asin, marketplace_id ORDER BY checked_at DESC, observation_id DESC) = 1. This returns only items observed by that time and does not fill gaps with current content.

### Product Catalog by ASIN History (Raw JSON)

- Table name: `amazon_products_raw_history`
- Columns: 22
- Markdown: data-scheme/amazon_products_raw_history.md

Successful Amazon Catalog Items observations per child ASIN and marketplace for items the Organization tracks. A later successful response is retained even when unchanged; a retry keeps the original observation_id and checked_at without adding a duplicate. History starts after the Organization enables it and tracks the item. A newly associated item receives its next successful observation, without older shared-cache history. The source stays off until a staged Connector rollout enables it. History follows the existing catalog refresh. DataDoe can request an item again one day after its last cache update. The catalog worker runs every 15 minutes in each region and stops at its time limit, so a tracked item can go more than one day without a new observation. A history delivery backlog does not stop current catalog refreshes. Failed, throttled, empty and hard-failed attempts and items Amazon omits create no history observation. Missing days and source values remain unknown: a missing item or rank does not mean deletion or a zero rank. Observations are per item, not an atomic snapshot of the whole catalog. Changes occurred between observations; checked_at is not the exact time Amazon edited the item. Use amazon_products_by_child_asin and amazon_products_raw for current-state joins to sales, inventory and profit. They keep one latest row per ASIN and marketplace and provide the cached onboarding baseline. Legacy rows can have null checked_at and observation_id; overwritten payloads are not recovered or assigned invented times. When Amazon omits an item, its current row is created or cleared without a new checked_at and without a history observation. Filter history by child_asin, marketplace_id and a date range; date and snapshot_date are the UTC date of checked_at. For rank trends, order by checked_at and observation_id and compare category names and raw category identifiers, which can change. To compare observations, join on child_asin and marketplace_id and filter the two observation_id values; an absent observation produces no comparison. For the last observed state at a chosen time, filter checked_at <= the chosen timestamp, then use QUALIFY ROW_NUMBER() OVER (PARTITION BY child_asin, marketplace_id ORDER BY checked_at DESC, observation_id DESC) = 1. This returns only items observed by that time and does not fill gaps with current content. Listing-specific prices, inventory, the advertising product catalog, Search Catalog Performance and A+ content are separate data sources. Matches amazon_products_by_child_asin_history by child_asin, marketplace_id and observation_id. Full product_data preserves the complete source JSON, including sales-rank arrays and category identifiers; missing values remain null. Rows are large; download payloads to a file. For MCP raw-history exports, paginate with limit and skip: at most 100 rows in JSON or 250 rows in CSV. REST file generation and direct BigQuery queries use their own policies.

### Coupon Performance

- Table name: `amazon_coupon_performance`
- Columns: 34
- Markdown: data-scheme/amazon_coupon_performance.md

Seller and vendor coupon performance, one row per coupon and ASIN. Includes clips, redemptions, budget, and the ASIN discount. Campaign and coupon totals repeat on every ASIN row. Vendor rows carry campaign, vendor code, and Subscribe and Save; sales is seller coupon revenue. Filter on start_date_time. Join amazon_promotions on promotions_api_mapping_id.

### Promotion Performance

- Table name: `amazon_promotion_performance`
- Columns: 32
- Markdown: data-scheme/amazon_promotion_performance.md

Seller and vendor promotion performance for Best Deal, Lightning Deal, Price Discount, and related deal types. One row per promotion and ASIN. Glance views, units, funding, and revenue at promotion level repeat on every ASIN row; use the product_ columns for the ASIN. amount_spent is vendor funding. Seller revenue matches Seller Central sales. Configuration lives on amazon_promotions.

### Customer Feedback ASIN Categories

- Table name: `amazon_customer_feedback_item_browse_nodes`
- Columns: 13
- Markdown: data-scheme/amazon_customer_feedback_item_browse_nodes.md

The browse node Amazon Customer Feedback associated with each child ASIN. One row is one associated node, not the full category path. DataDoe collects a new snapshot about every 30 days.

### Customer Feedback ASIN Review Topics

- Table name: `amazon_customer_feedback_item_review_topics`
- Columns: 29
- Markdown: data-scheme/amazon_customer_feedback_item_review_topics.md

Customer Feedback review topics for a child ASIN, sorted by mentions. DataDoe collects about every 30 days. Amazon may refresh the source weekly, so a row can be newer than the previous fetch. Topics are the ones Amazon returned, not a complete list. Snippets and topic names are the text Amazon returned, not full reviews. Amazon chooses the language. Sentiment is the positive or negative list, not a star rating. Percentages are the source values and are not additive. Category fields are empty when the ASIN has no category mapping.

### Customer Feedback ASIN Review Subtopics

- Table name: `amazon_customer_feedback_item_review_subtopics`
- Columns: 26
- Markdown: data-scheme/amazon_customer_feedback_item_review_subtopics.md

Customer Feedback review subtopics for a child ASIN. Subtopics stay under the topic Amazon returned. There is no extra subtopic for reviews that do not match a returned subtopic. Percentages are the source values and are not additive.

### Customer Feedback Category Review Topics

- Table name: `amazon_customer_feedback_browse_node_review_topics`
- Columns: 25
- Markdown: data-scheme/amazon_customer_feedback_browse_node_review_topics.md

Customer Feedback review topics for all products in a browse node. This is not an ASIN topic list. DataDoe collects about every 30 days. Topics are the ones Amazon returned, not a complete list. Percentages are the source values. Do not add them across products or connections.

### Customer Feedback Category Review Subtopics

- Table name: `amazon_customer_feedback_browse_node_review_subtopics`
- Columns: 23
- Markdown: data-scheme/amazon_customer_feedback_browse_node_review_subtopics.md

Customer Feedback review subtopics for all products in a browse node. A category subtopic has an occurrence percentage only. It has no mention count. There is no extra subtopic for reviews that do not match a returned subtopic.

### Customer Feedback Category Return Topics

- Table name: `amazon_customer_feedback_browse_node_return_topics`
- Columns: 17
- Markdown: data-scheme/amazon_customer_feedback_browse_node_return_topics.md

Customer Feedback return topics for all products in a browse node. The occurrence percentage is not an ASIN return rate. The table has no sentiment, snippets, or mention counts.

### Customer Feedback ASIN Review Trends

- Table name: `amazon_customer_feedback_item_review_trends`
- Columns: 24
- Markdown: data-scheme/amazon_customer_feedback_item_review_trends.md

Customer Feedback monthly review topic trends for a child ASIN. DataDoe fetches a new response about every 30 days. Amazon may refresh the source weekly. date is the UTC day of the fetch. period_start_at_utc and period_end_at_utc are the month Amazon returned for that point. Percentages are the source values on a 0 to 100 scale. A missing parent or category percentage means Amazon did not return that comparison. Category names stay empty when the ASIN has no category mapping.

### Customer Feedback Category Review Trends

- Table name: `amazon_customer_feedback_browse_node_review_trends`
- Columns: 21
- Markdown: data-scheme/amazon_customer_feedback_browse_node_review_trends.md

Customer Feedback monthly review topic trends for all products in a browse node. This is separate from ASIN trends. DataDoe fetches a new response about every 30 days. date is the UTC day of the fetch. period_start_at_utc and period_end_at_utc are the month Amazon returned. The top 25 percent column is the source percentage for the top 25 percent of products, not 25 percent of the all-products value. Percentages are the source values on a 0 to 100 scale.

### Customer Feedback Category Return Trends

- Table name: `amazon_customer_feedback_browse_node_return_trends`
- Columns: 19
- Markdown: data-scheme/amazon_customer_feedback_browse_node_return_trends.md

Customer Feedback monthly return topic trends for all products in a browse node. The percentage is the share of category return feedback that mentions the topic. It is not the share of sold units that were returned. The table has no sentiment. DataDoe fetches a new response about every 30 days. date is the UTC day of the fetch. period_start_at_utc and period_end_at_utc are the month Amazon returned.

### Invoices

- Table name: `amazon_invoices`
- Columns: 50
- Markdown: data-scheme/amazon_invoices.md

Accounts payable invoice headers for Vendor Central. One row per invoice. invoice_status is IN_PROGRESS, REJECTED, PARTIALLY_PAID, PARTIALLY_DEDUCTED, PAID, or DEDUCTED. invoice_type is AP_INVENTORY or OTHER. Join amazon_invoice_items on invoice_identifier. date is the UTC day of issue_date.

### Invoice Items

- Table name: `amazon_invoice_items`
- Columns: 61
- Markdown: data-scheme/amazon_invoice_items.md

Invoice line items for Vendor Central. One row per line. Goods, services, and other charges, with matched quantity, price and quantity variances, and ASIN, SKU, UPC, EAN, or ISBN identifiers. Join amazon_invoices on invoice_identifier. date is the UTC day of the parent invoice issue date.

### Remittances

- Table name: `amazon_remittances`
- Columns: 23
- Markdown: data-scheme/amazon_remittances.md

Vendor Central payments from Amazon, as in Vendor Central Payments > Remittance. One row per payment. Join amazon_remittance_items on unique_payment_id for the invoices, deductions, vendor returns, and advertising lines the payment covers. The sum of amazon_remittance_items.amount_paid over a payment equals payment_amount. Use amazon_invoices for per-invoice status and settlement totals, and this table for when and how Amazon paid. Chargeback reason codes, disputes, and co-op agreements are not included. date is the UTC day of payment_date.

### Remittance Items

- Table name: `amazon_remittance_items`
- Columns: 27
- Markdown: data-scheme/amazon_remittance_items.md

Invoice-level lines of Vendor Central payments. One row per line of a payment: invoice payments, deductions, vendor returns, and advertising. A deduction shows only through description, invoice_type, and a negative amount; there is no reason code, dispute, or purchase order field. One invoice can be paid across several payments, so amount_paid is the part paid by this payment. Join amazon_remittances on unique_payment_id and amazon_invoices on invoice_number. date is the UTC day of the parent payment date.

### Vendor PO margins

- Table name: `amazon_vendor_po_margins`
- Columns: 20
- Markdown: data-scheme/amazon_vendor_po_margins.md

DataDoe projected product margins, one row per scoped PO and source. Regular and Direct Fulfillment orders remain separate. Costs use the PO date and validated item units; cancelled orders and incomplete lines have no active margin. Your uploaded product cost remains separate from Amazon-reported costs. Not invoiced revenue, cash or complete net profit.

### Vendor invoice settlements

- Table name: `amazon_vendor_invoice_settlement_margins`
- Columns: 67
- Markdown: data-scheme/amazon_vendor_invoice_settlement_margins.md

DataDoe invoice product costs and reconciled settlement margins. One row per scoped invoice. date remains the invoice issue date; final_settlement_date attributes the complete settlement history once. Partial payments show cash immediately but have no final margin. Costs use the invoice issue date. Unmatched identities, history or tax leave settlement margin unavailable. Nonzero deductions linked to the same invoice number or purchase order also withhold that invoice margin. Other payment-level deductions remain visible without blocking individual invoice margins. Backdated edits and reopening recompute this current view. Not complete net profit.

### Vendor payment margins

- Table name: `amazon_vendor_payment_margins`
- Columns: 43
- Markdown: data-scheme/amazon_vendor_payment_margins.md

Amazon-reported payment-date cash activity and separate DataDoe settled-invoice margins. One row per scoped payment. Net receipts already include signed deductions; never subtract them twice. Invoice costs are inherited from the invoice date and counted once at its final settlement, never proportionally per payment. A period of settled-invoice margin includes those invoices complete payment histories and differs from cash received in that period. Invoice allocations, partial states and unresolved adjustments remain visible. Not complete net profit.

### Detail Page Traffic Event Notifications

- Table name: `amazon_notifications_detail_page_traffic_event`
- Columns: 11
- Markdown: data-scheme/amazon_notifications_detail_page_traffic_event.md

Near real-time Amazon SP-API DETAIL_PAGE_TRAFFIC_EVENT notifications for detail page traffic events.

### Item Inventory Event Change Notifications

- Table name: `amazon_notifications_item_inventory_event_change`
- Columns: 11
- Markdown: data-scheme/amazon_notifications_item_inventory_event_change.md

Near real-time Amazon SP-API ITEM_INVENTORY_EVENT_CHANGE notifications for item inventory event changes.

### Item Sales Event Change Notifications

- Table name: `amazon_notifications_item_sales_event_change`
- Columns: 11
- Markdown: data-scheme/amazon_notifications_item_sales_event_change.md

Near real-time Amazon SP-API ITEM_SALES_EVENT_CHANGE notifications for item sales event changes.

### Listings Item Issues Change Notifications

- Table name: `amazon_notifications_listings_item_issues_change`
- Columns: 11
- Markdown: data-scheme/amazon_notifications_listings_item_issues_change.md

Near real-time Amazon SP-API LISTINGS_ITEM_ISSUES_CHANGE notifications for listing quality and issue changes.

### Shipment Tracking Milestone Changed Notifications

- Table name: `amazon_notifications_shipment_tracking_milestone_changed`
- Columns: 11
- Markdown: data-scheme/amazon_notifications_shipment_tracking_milestone_changed.md

Near real-time Amazon SP-API SHIPMENT_TRACKING_MILESTONE_CHANGED notifications for Amazon Tracking API shipment milestone updates.

### Vendor Codes

- Table name: `amazon_vendor_codes`
- Columns: 9
- Markdown: data-scheme/amazon_vendor_codes.md

Vendor codes assigned by Amazon, uploaded per ASIN or SKU. Each row has exactly one of child_asin or sku set. ASIN-based sales tables prefer an explicit ASIN upload and can resolve SKU uploads through an unambiguous Vendor Listings mapping. Every 5 days DataDoe checks vendors with at least one vendor code row and emails organization owners when ASINs sold in the last 30 days have no vendor code. To list ASINs sold in the last 30 days without a vendor code, use GET /api/v1/vendor-codes/missing or the MCP tool vendor_codes_missing_list.

### Vendor Listings

- Table name: `amazon_vendor_listings`
- Columns: 55
- Markdown: data-scheme/amazon_vendor_listings.md

Vendor Central listings from the Listings Items API, one row per connection, marketplace, vendor code, and SKU. Cost price is what Amazon pays the vendor. Offers and fulfillment availability are not published for vendors. item_name, product_description, and bullet points use the listing when Amazon returns them, then the catalog.

### Vendor Product Replenishment Details

- Table name: `amazon_vendor_product_details`
- Columns: 20
- Markdown: data-scheme/amazon_vendor_product_details.md

Current Vendor Central replenishment category for each child ASIN, read with the vendor connection that owns the row. One row per organization, store, connection, marketplace, and child ASIN. DataDoe refreshes each ASIN about once a day. This is a current snapshot, not a daily history. replenishment_category is Amazon's category string. It is not a reorder recommendation and it is not Subscribe & Save eligibility. vendor_details_available is false when the latest successful response had no vendor details for this marketplace. A missing category does not mean the ASIN is obsolete. manufacturer_code and brand_code come from Amazon's vendor catalog. They are not vendor codes uploaded in DataDoe.

### Weekly Customer Demand

- Table name: `amazon_vendor_forecasting`
- Columns: 16
- Markdown: data-scheme/amazon_vendor_forecasting.md

Weekly forward customer-demand forecast per child ASIN from the Amazon Vendor Forecasting report. Each request returns only the latest forecast. DataDoe stores each weekly fetch as a snapshot keyed by date (forecast generation date). Amazon forecasts week 0 through week 47 from that date, so each snapshot has 48 forward weeks (start_forecasting_date and end_forecasting_date). The same week can appear on later snapshots. Filter to MAX(date) per child_asin and week for the current forecast. Rows are not additive across date snapshots.

### Geo Sales by ASIN & Date

- Table name: `amazon_vendor_geo_sales_by_asin_and_date`
- Columns: 14
- Markdown: data-scheme/amazon_vendor_geo_sales_by_asin_and_date.md

Daily shipped sales by Vendor connection, view, child ASIN and customer country from Amazon Geo Sales. Shipped units are not ordered units. This dataset does not reproduce all-accounts, cross-marketplace Retail Analytics. Filter vendor_view to SOURCING or MANUFACTURING before summing. The views overlap and must not be added together. customer_country_code is the shipment destination. marketplace_country_code identifies the connection marketplace, not the customer or warehouse country. Use customer_country_code as a column filter for destination sales. Summing countries gives the same shipped sales already included in the equivalent connection totals, not additional sales. This table has no warehouse location, inventory or stock-by-store breakdown. Shipped revenue is Amazon customer revenue, not the vendor procurement price. Compare the same view, dates, metric and currency.

### Sales, Traffic & Inventory by ASIN & Date

- Table name: `amazon_vendor_sales_traffic_and_inventory_by_child_and_date`
- Columns: 136
- Markdown: data-scheme/amazon_vendor_sales_traffic_and_inventory_by_child_and_date.md

Daily sales, traffic and inventory metrics per child ASIN. Columns prefixed manufacturing_retail_ are Amazon manufacturing-view metrics for all ASINs the vendor manufactures. Columns prefixed sourcing_retail_ are Amazon sourcing-view metrics for ASINs this vendor sourced directly to Amazon (distributor view). DataDoe fetches both views and joins them onto one ASIN-day; the prefixes are overlapping views, not two independent facts and not additive — never sum them or revenue and units double-count. Shipped units/revenue often match because Amazon returns the same shippedOrders in both views; matching is expected, not a copied row. Ordered units/revenue exist only under manufacturing. Contra-COGS is typically populated only under sourcing. Use manufacturing_retail_ for glance views, customer-ordered units/revenue (retail demand, not purchase orders), and net PPM. Use sourcing_retail_ for purchase-order fill metrics (vendor_confirmation_rate, received_fill_rate) and contra-COGS. Amazon-to-vendor purchase-order quantity is amazon_vendor_purchase_orders.ordered_quantity. Either prefix alone is valid for shipped revenue/COGS — pick one view per analysis, not both. Shipped COGS, shipped revenue, contra-COGS, and Net PPM measure Amazon retail economics, not the vendor's own product margin. net_pure_product_margin is a convenience alias of manufacturing_retail_net_ppm (both read manufacturing net_ppm); do not cross-check them as independent series. On-hand, aged, unhealthy, in-transit, and open purchase-order units are end-of-period snapshots and are not additive across days. For a monthly balance, use the latest available date in the month, then aggregate across ASINs if needed. Columns prefixed manufacturing_business_ and sourcing_business_ are Amazon Business selling-program sales on the same ASIN-day. They come from GET_VENDOR_SALES_REPORT, not Retail Data Kiosk. Manufacturing and sourcing Business views overlap and are not additive. Do not subtract Business from Retail. Shipped COGS is the price Amazon paid the vendor. Shipped revenue is Amazon's customer revenue. Ordered revenue and units are customer demand and exist only on the manufacturing Business view. Customer returns are units customers returned. The Business report has no traffic, inventory, Net PPM, or vendor co-op. Dates stay on Amazon's Pacific reporting date.

### Sales, Traffic & Inventory by Date

- Table name: `amazon_vendor_sales_traffic_and_inventory_by_date`
- Columns: 114
- Markdown: data-scheme/amazon_vendor_sales_traffic_and_inventory_by_date.md

Daily catalog totals for one Vendor connection and marketplace. Amazon returns one total for the catalog. It is not the sum of ASIN rows. Rates and averages, including net PPM, vendor confirmation rate, received fill rate, sell-through, Ultra Fast Track, sourceable replenishment out-of-stock, and lost Featured Offer, are Amazon figures for this period. Do not average or sum ASIN or daily rows to recreate them. Shipped COGS, shipped revenue, contra-COGS, and Net PPM measure Amazon retail economics, not the vendor's own product margin. Inventory and open purchase-order units are end-of-period snapshots and are not additive across periods. Columns prefixed manufacturing_retail_ are Amazon manufacturing-view metrics for all ASINs the vendor manufactures. Columns prefixed sourcing_retail_ are Amazon sourcing-view metrics for ASINs this vendor sourced directly to Amazon (distributor view). DataDoe fetches both views and joins them onto one ASIN-day; the prefixes are overlapping views, not two independent facts and not additive — never sum them or revenue and units double-count. Shipped units/revenue often match because Amazon returns the same shippedOrders in both views; matching is expected, not a copied row. Ordered units/revenue exist only under manufacturing. Contra-COGS is typically populated only under sourcing. Use manufacturing_retail_ for glance views, customer-ordered units/revenue (retail demand, not purchase orders), and net PPM. Use sourcing_retail_ for purchase-order fill metrics (vendor_confirmation_rate, received_fill_rate) and contra-COGS. Amazon-to-vendor purchase-order quantity is amazon_vendor_purchase_orders.ordered_quantity. Either prefix alone is valid for shipped revenue/COGS — pick one view per analysis, not both. Amazon returns daily inventory only for the current common date, so older daily inventory stays empty. Sales and traffic history is about two years.

### Sales, Traffic & Inventory by ASIN & Week

- Table name: `amazon_vendor_sales_traffic_and_inventory_by_child_and_date_weekly`
- Columns: 116
- Markdown: data-scheme/amazon_vendor_sales_traffic_and_inventory_by_child_and_date_weekly.md

Weekly sales, traffic, and inventory per child ASIN. Weeks start on Sunday and end on Saturday. Rates and averages, including net PPM, vendor confirmation rate, received fill rate, sell-through, Ultra Fast Track, sourceable replenishment out-of-stock, and lost Featured Offer, are Amazon figures for this period. Do not average or sum ASIN or daily rows to recreate them. Shipped COGS, shipped revenue, contra-COGS, and Net PPM measure Amazon retail economics, not the vendor's own product margin. Inventory and open purchase-order units are end-of-period snapshots and are not additive across periods. Columns prefixed manufacturing_retail_ are Amazon manufacturing-view metrics for all ASINs the vendor manufactures. Columns prefixed sourcing_retail_ are Amazon sourcing-view metrics for ASINs this vendor sourced directly to Amazon (distributor view). DataDoe fetches both views and joins them onto one ASIN-day; the prefixes are overlapping views, not two independent facts and not additive — never sum them or revenue and units double-count. Shipped units/revenue often match because Amazon returns the same shippedOrders in both views; matching is expected, not a copied row. Ordered units/revenue exist only under manufacturing. Contra-COGS is typically populated only under sourcing. Use manufacturing_retail_ for glance views, customer-ordered units/revenue (retail demand, not purchase orders), and net PPM. Use sourcing_retail_ for purchase-order fill metrics (vendor_confirmation_rate, received_fill_rate) and contra-COGS. Amazon-to-vendor purchase-order quantity is amazon_vendor_purchase_orders.ordered_quantity. Either prefix alone is valid for shipped revenue/COGS — pick one view per analysis, not both. Amazon returns inventory for the current week and the previous seven weeks. Older weekly inventory stays empty. Sales and traffic history is about two years. For a stock balance, use the latest week, then add ASINs if you need a catalog figure. Prefer the weekly catalog total when Amazon has already calculated it.

### Sales, Traffic & Inventory by Week

- Table name: `amazon_vendor_sales_traffic_and_inventory_by_date_weekly`
- Columns: 114
- Markdown: data-scheme/amazon_vendor_sales_traffic_and_inventory_by_date_weekly.md

Weekly catalog totals for one Vendor connection and marketplace. Weeks start on Sunday and end on Saturday. Amazon returns one total for the catalog. It is not the sum of ASIN rows. Rates and averages, including net PPM, vendor confirmation rate, received fill rate, sell-through, Ultra Fast Track, sourceable replenishment out-of-stock, and lost Featured Offer, are Amazon figures for this period. Do not average or sum ASIN or daily rows to recreate them. Shipped COGS, shipped revenue, contra-COGS, and Net PPM measure Amazon retail economics, not the vendor's own product margin. Inventory and open purchase-order units are end-of-period snapshots and are not additive across periods. Columns prefixed manufacturing_retail_ are Amazon manufacturing-view metrics for all ASINs the vendor manufactures. Columns prefixed sourcing_retail_ are Amazon sourcing-view metrics for ASINs this vendor sourced directly to Amazon (distributor view). DataDoe fetches both views and joins them onto one ASIN-day; the prefixes are overlapping views, not two independent facts and not additive — never sum them or revenue and units double-count. Shipped units/revenue often match because Amazon returns the same shippedOrders in both views; matching is expected, not a copied row. Ordered units/revenue exist only under manufacturing. Contra-COGS is typically populated only under sourcing. Use manufacturing_retail_ for glance views, customer-ordered units/revenue (retail demand, not purchase orders), and net PPM. Use sourcing_retail_ for purchase-order fill metrics (vendor_confirmation_rate, received_fill_rate) and contra-COGS. Amazon-to-vendor purchase-order quantity is amazon_vendor_purchase_orders.ordered_quantity. Either prefix alone is valid for shipped revenue/COGS — pick one view per analysis, not both. Amazon returns inventory for the current week and the previous seven weeks. Older weekly inventory stays empty. Sales and traffic history is about two years.

### Sales, Traffic & Inventory by ASIN & Month

- Table name: `amazon_vendor_sales_traffic_and_inventory_by_child_and_date_monthly`
- Columns: 116
- Markdown: data-scheme/amazon_vendor_sales_traffic_and_inventory_by_child_and_date_monthly.md

Monthly sales, traffic, and inventory per child ASIN. Months start on day 1. Rates and averages, including net PPM, vendor confirmation rate, received fill rate, sell-through, Ultra Fast Track, sourceable replenishment out-of-stock, and lost Featured Offer, are Amazon figures for this period. Do not average or sum ASIN or daily rows to recreate them. Shipped COGS, shipped revenue, contra-COGS, and Net PPM measure Amazon retail economics, not the vendor's own product margin. Inventory and open purchase-order units are end-of-period snapshots and are not additive across periods. Columns prefixed manufacturing_retail_ are Amazon manufacturing-view metrics for all ASINs the vendor manufactures. Columns prefixed sourcing_retail_ are Amazon sourcing-view metrics for ASINs this vendor sourced directly to Amazon (distributor view). DataDoe fetches both views and joins them onto one ASIN-day; the prefixes are overlapping views, not two independent facts and not additive — never sum them or revenue and units double-count. Shipped units/revenue often match because Amazon returns the same shippedOrders in both views; matching is expected, not a copied row. Ordered units/revenue exist only under manufacturing. Contra-COGS is typically populated only under sourcing. Use manufacturing_retail_ for glance views, customer-ordered units/revenue (retail demand, not purchase orders), and net PPM. Use sourcing_retail_ for purchase-order fill metrics (vendor_confirmation_rate, received_fill_rate) and contra-COGS. Amazon-to-vendor purchase-order quantity is amazon_vendor_purchase_orders.ordered_quantity. Either prefix alone is valid for shipped revenue/COGS — pick one view per analysis, not both. Amazon returns inventory for the current month and the previous 23 months. Older monthly inventory stays empty. Sales and traffic history is about two years. For a stock balance, use the latest month, then add ASINs if you need a catalog figure. Prefer the monthly catalog total when Amazon has already calculated it.

### Sales, Traffic & Inventory by Month

- Table name: `amazon_vendor_sales_traffic_and_inventory_by_date_monthly`
- Columns: 114
- Markdown: data-scheme/amazon_vendor_sales_traffic_and_inventory_by_date_monthly.md

Monthly catalog totals for one Vendor connection and marketplace. Months start on day 1. Amazon returns one total for the catalog. It is not the sum of ASIN rows. Rates and averages, including net PPM, vendor confirmation rate, received fill rate, sell-through, Ultra Fast Track, sourceable replenishment out-of-stock, and lost Featured Offer, are Amazon figures for this period. Do not average or sum ASIN or daily rows to recreate them. Shipped COGS, shipped revenue, contra-COGS, and Net PPM measure Amazon retail economics, not the vendor's own product margin. Inventory and open purchase-order units are end-of-period snapshots and are not additive across periods. Columns prefixed manufacturing_retail_ are Amazon manufacturing-view metrics for all ASINs the vendor manufactures. Columns prefixed sourcing_retail_ are Amazon sourcing-view metrics for ASINs this vendor sourced directly to Amazon (distributor view). DataDoe fetches both views and joins them onto one ASIN-day; the prefixes are overlapping views, not two independent facts and not additive — never sum them or revenue and units double-count. Shipped units/revenue often match because Amazon returns the same shippedOrders in both views; matching is expected, not a copied row. Ordered units/revenue exist only under manufacturing. Contra-COGS is typically populated only under sourcing. Use manufacturing_retail_ for glance views, customer-ordered units/revenue (retail demand, not purchase orders), and net PPM. Use sourcing_retail_ for purchase-order fill metrics (vendor_confirmation_rate, received_fill_rate) and contra-COGS. Amazon-to-vendor purchase-order quantity is amazon_vendor_purchase_orders.ordered_quantity. Either prefix alone is valid for shipped revenue/COGS — pick one view per analysis, not both. Amazon returns inventory for the current month and the previous 23 months. Older monthly inventory stays empty. Sales and traffic history is about two years.

### Real-Time Sales by ASIN & Hour

- Table name: `amazon_vendor_real_time_sales`
- Columns: 14
- Markdown: data-scheme/amazon_vendor_real_time_sales.md

Hourly units and revenue ordered by Amazon customers per ASIN (GET_VENDOR_REAL_TIME_SALES_REPORT). Not Amazon-to-vendor purchase-order quantity. Not the daily manufacturing_retail_ordered_units series.

### Real-Time Traffic by ASIN & Hour

- Table name: `amazon_vendor_real_time_traffic`
- Columns: 12
- Markdown: data-scheme/amazon_vendor_real_time_traffic.md

Hourly detail-page views per ASIN (GET_VENDOR_REAL_TIME_TRAFFIC_REPORT). All customer views of the detail page, not the daily glance_views column (Featured Offer wins only).

### Real-Time Inventory by ASIN & Hour

- Table name: `amazon_vendor_real_time_inventory`
- Columns: 12
- Markdown: data-scheme/amazon_vendor_real_time_inventory.md

Hourly highly available inventory per ASIN (GET_VENDOR_REAL_TIME_INVENTORY_REPORT). Units Amazon can still sell, not on-hand sellable inventory from the daily table.

### Vendor Direct Fulfillment Orders

- Table name: `amazon_vendor_df_orders`
- Columns: 57
- Markdown: data-scheme/amazon_vendor_df_orders.md

Vendor Direct Fulfillment order line items (vendor ships to the customer). One row per line item with order header fields repeated. purchase_order_number is the DF purchase order; customer_order_number is the shopper order.

### Vendor Direct Fulfillment Shipping Labels

- Table name: `amazon_vendor_df_shipping_labels`
- Columns: 16
- Markdown: data-scheme/amazon_vendor_df_shipping_labels.md

Vendor Direct Fulfillment shipping label metadata. One row per package. No label file and no customer address. The label file is available from AMAZON_VENDOR_DF_SHIPPING_LABEL_GET.

### Vendor Direct Fulfillment Orders PII

- Table name: `amazon_vendor_df_orders_pii`
- Columns: 24
- Markdown: data-scheme/amazon_vendor_df_orders_pii.md

Vendor Direct Fulfillment customer and shipping details. One row per purchase order. Join amazon_vendor_df_orders on purchase_order_number. Personal fields, customer notes, gift messages, and customization URLs become NULL after 30 days from the order date. Historical rows, order identifiers, dates, and coarse geography remain available. Restricted and off by default.

### Vendor Purchase Orders

- Table name: `amazon_vendor_purchase_orders`
- Columns: 54
- Markdown: data-scheme/amazon_vendor_purchase_orders.md

Vendor Retail Procurement purchase order line items. One row per line item with purchase order header fields repeated. ordered_quantity is Amazon-to-vendor PO quantity, not customer retail demand (manufacturing_retail_ordered_units). Acknowledgement and Amazon fulfillment-center received quantity are on amazon_vendor_purchase_orders_status.

### Vendor Purchase Order Status

- Table name: `amazon_vendor_purchase_orders_status`
- Columns: 39
- Markdown: data-scheme/amazon_vendor_purchase_orders_status.md

Vendor Retail Procurement purchase order item status (getPurchaseOrdersStatus). One row per line item, same grain as amazon_vendor_purchase_orders (purchase_order_number and item_sequence_number). Holds vendor acknowledgement and Amazon fulfillment-center receiving. ordered_quantity is Amazon-to-vendor PO quantity, not customer retail demand (manufacturing_retail_ordered_units). Rows appear after the matching purchase order is synced.

### Vendor Shipments

- Table name: `amazon_vendor_shipments`
- Columns: 34
- Markdown: data-scheme/amazon_vendor_shipments.md

WePay/collect Vendor Retail Procurement shipments (submitted or requested for routing; does not include shipments created in Vendor Central). One row per shipment with nested purchase orders, containers, and status details. Amazon does not return shipments created only in Vendor Central (Orders > Shipments / appointments).

### Sellers & Vendors Context

- Table name: `amazon_sellers_and_vendors_context`
- Columns: 18
- Markdown: data-scheme/amazon_sellers_and_vendors_context.md

Lookup of DataDoe Amazon accounts for Seller Central, Vendor Central, Amazon Ads, and Amazon DSP. One row per connection, plus one row per Amazon DSP advertiser mapped to a seller or vendor on a shared agency Ads account. A DSP-only agency seat is not its own seller. seller_or_vendor_id equals connection_context_id and is not unique: one context can have a Seller Central row, an Amazon Ads row, and one row per DSP advertiser. Join Seller Central and Vendor Central facts on sp_connection_id or vendor_connection_id. Attribute DSP facts on organization_id, store_id, ads_dsp_connection_id, and dsp_advertiser_id.

## Amazon Ads (82 tables)

### Ad Performance by ASIN & Date

- Table name: `amazon_ads_performance_by_child_asin_and_date`
- Columns: 42
- Markdown: data-scheme/amazon_ads_performance_by_child_asin_and_date.md

Ads performance by product, ad or campaign, and date for Sponsored Products, Sponsored Display, and Sponsored Brands. Multiple rows can exist for the same ASIN, SKU and date. ad_sales and ad_orders are same-SKU click sales for Sponsored Products and promoted-product click sales for Sponsored Display. ad_attributed_sales, ad_attributed_orders and ad_attributed_units_sold are the advertised-product report totals, including other products. Sponsored Display totals include view-through sales. Display ad_units_sold_same_sku includes all click-attributed units. Brands ad_sales and ad_orders are estimated shares of campaign totals, including brand halo. Brands same-SKU columns, attributed columns, clicks and impressions are null. Sponsored Brands spend uses eligible ad-creative ASINs, with same-day ad cost rescaled to campaign cost. Remaining spend uses campaign purchased-product shares. Without purchased-product data, it uses Seller Central sales, orders and sessions, or an even split among known campaign ASINs. Sales and orders allocate campaign totals by purchased-product shares, with the same fallback signals. ASIN spend and sales are split across available SKUs by same-day order-sales shares; orders use order-count shares. A zero total uses an even split for that measure. With no SKU rows, sku is null. Campaigns without any ASIN signal remain account-only. Estimates can lag the campaign report and are revised as inputs arrive. Prefer amazon_ads_performance_by_campaign_by_date for total campaign data. Sponsored Television and Amazon DSP are not included here.

### Ad Performance by Campaign & Date

- Table name: `amazon_ads_performance_by_campaign_by_date`
- Columns: 37
- Markdown: data-scheme/amazon_ads_performance_by_campaign_by_date.md

Ads performance per campaign and date for Sponsored Products, Sponsored Brands, Sponsored Display, and Sponsored Television. Use this table for total sponsored ads campaign spend and sales. ad_impressions and ad_clicks exclude invalid traffic; gross and invalid columns are the traffic-quality reconciliation. Amazon DSP is not included; use amazon_ads_dsp_performance_by_creative_by_date for Amazon DSP.

### DSP Performance by Creative & Date

- Table name: `amazon_ads_dsp_performance_by_creative_by_date`
- Columns: 57
- Markdown: data-scheme/amazon_ads_dsp_performance_by_creative_by_date.md

Amazon DSP performance per advertiser, date, order, line item, and creative. Amazon DSP only (DataDoe DSP slot of a seller or vendor), refreshed once a day, not intraday. Rows map to a seller or vendor through seller_or_vendor_id, which is null when the DSP advertiser is not mapped. DSP order = campaign and line item = ad group in the new Amazon DSP naming. Use this table for total Amazon DSP spend and sales; it is the DSP source of amazon_profit_by_date. ad_sales, ad_orders, and ad_units_sold include brand halo; the _promoted columns cover promoted ASINs only. Order and line item budgets repeat on every creative row, so do not sum them.

### DSP Product Conversions by ASIN & Date

- Table name: `amazon_ads_dsp_performance_by_asin_by_date`
- Columns: 38
- Markdown: data-scheme/amazon_ads_dsp_performance_by_asin_by_date.md

Amazon DSP product conversions per advertiser, date, order, line item, child ASIN, and conversion type. Amazon DSP only (DataDoe DSP slot of a seller or vendor), refreshed once a day, not intraday. Rows map to a seller or vendor through seller_or_vendor_id, which is null when the DSP advertiser is not mapped. DSP order = campaign and line item = ad group in the new Amazon DSP naming. dsp_conversion_type PROMOTED rows are conversions of ASINs promoted by the line item; BRAND_HALO rows are conversions of other ASINs of the same brands. Sum PROMOTED and BRAND_HALO for total product sales as in the Amazon DSP console. Amazon reports no cost, impressions, or clicks at ASIN level; spend is in amazon_ads_dsp_performance_by_creative_by_date. Amazon limits the report to the top 500 ASINs of the past 65 days, so totals can be slightly below the creative table.

### DSP Performance by City & Date

- Table name: `amazon_ads_dsp_performance_by_city_by_date`
- Columns: 45
- Markdown: data-scheme/amazon_ads_dsp_performance_by_city_by_date.md

Amazon DSP performance per advertiser, date, order, line item, and city. Amazon DSP only (DataDoe DSP slot of a seller or vendor), refreshed once a day, not intraday. Rows map to a seller or vendor through seller_or_vendor_id, which is null when the DSP advertiser is not mapped. DSP order = campaign and line item = ad group in the new Amazon DSP naming. city is a bare city name (for example Columbus) and is not unique across regions; the country is the marketplace country. Large table: always filter by date.

### DSP Performance by Audience & Date

- Table name: `amazon_ads_dsp_performance_by_audience_by_date`
- Columns: 38
- Markdown: data-scheme/amazon_ads_dsp_performance_by_audience_by_date.md

Amazon DSP performance per advertiser, date, order, line item, and audience segment. Amazon DSP only (DataDoe DSP slot of a seller or vendor), refreshed once a day, not intraday. Rows map to a seller or vendor through seller_or_vendor_id, which is null when the DSP advertiser is not mapped. DSP order = campaign and line item = ad group in the new Amazon DSP naming. Amazon does not report sales, units, or brand halo metrics in this report; conversion columns cover promoted ASINs only. A line item can target several segments, so do not sum segment rows to get line item totals; use amazon_ads_dsp_performance_by_creative_by_date for totals.

### DSP Performance by Device & Date

- Table name: `amazon_ads_dsp_performance_by_device_by_date`
- Columns: 39
- Markdown: data-scheme/amazon_ads_dsp_performance_by_device_by_date.md

Amazon DSP performance per advertiser, date, order, line item, and device type. Amazon DSP only (DataDoe DSP slot of a seller or vendor), refreshed once a day, not intraday. Rows map to a seller or vendor through seller_or_vendor_id, which is null when the DSP advertiser is not mapped. DSP order = campaign and line item = ad group in the new Amazon DSP naming. ad_sales includes brand halo; all other conversion columns cover promoted ASINs only, because Amazon does not report their brand halo totals in this report.

### DSP Performance by Supply Source & Date

- Table name: `amazon_ads_dsp_performance_by_supply_source_by_date`
- Columns: 40
- Markdown: data-scheme/amazon_ads_dsp_performance_by_supply_source_by_date.md

Amazon DSP performance per advertiser, date, and supply source (inventory exchange or publisher). Amazon DSP only (DataDoe DSP slot of a seller or vendor), refreshed once a day, not intraday. Rows map to a seller or vendor through seller_or_vendor_id, which is null when the DSP advertiser is not mapped. Advertiser level: there is no order or line item breakdown. ad_currency is null because Amazon does not return a currency in this report; monetary values are in the currency of the marketplace.

### DSP Performance by Inventory & Date

- Table name: `amazon_ads_dsp_performance_by_inventory_by_date`
- Columns: 35
- Markdown: data-scheme/amazon_ads_dsp_performance_by_inventory_by_date.md

Amazon DSP inventory performance per advertiser, date, order, line item, site or app, supply source, deal, and currency. Amazon DSP only (DataDoe DSP slot of a seller or vendor), refreshed once a day, not intraday. Rows map to a seller or vendor through seller_or_vendor_id, which is null when the DSP advertiser is not mapped. DSP order = campaign and line item = ad group in the new Amazon DSP naming. The table stays off until the Organization turns it on. Once enabled, it uses the DSP advertiser ID configured on each Seller or Vendor. No separate advertiser or connection selection is needed. Each Amazon request is one day and one DSP order. The first fetch covers 56 days, a daily refresh covers 14 days, and a monthly refresh covers 56 days so Amazon can restate conversions. ad_currency is budgetCurrency. Do not add monetary values across currencies. Site, supply source, and deal stay null when Amazon omits them, and deal can be Unallocated. There is no app or site classification. ad_sales, ad_orders, ad_detail_page_views, and ad_add_to_cart come from metric.sales, metric.purchases, metric.detailPageViews, and metric.addToCart and are the intended promoted-plus-halo totals. Columns ending in _promoted come from the matching Promoted fields. Amazon DSP 14-day attribution after an ad view or click.

### DSP Reach & Frequency

- Table name: `amazon_ads_dsp_reach_and_frequency`
- Columns: 17
- Markdown: data-scheme/amazon_ads_dsp_reach_and_frequency.md

Amazon DSP reach and average frequency per advertiser and report period. Amazon DSP only (DataDoe DSP slot of a seller or vendor), refreshed once a day, not intraday. Rows map to a seller or vendor through seller_or_vendor_id, which is null when the DSP advertiser is not mapped. Each row summarizes one period (period_start_date to period_end_date): a 30-day window on the first fetch, then 1-day windows. Periods can overlap. Reach and frequency are not additive: never sum or average them across rows or periods; pick one period.

### DSP Brand Suitability

- Table name: `amazon_ads_dsp_brand_suitability`
- Columns: 25
- Markdown: data-scheme/amazon_ads_dsp_brand_suitability.md

Amazon DSP brand suitability: impressions per advertiser, order, line item, and report period, broken down by inventory tier, content category, or supply source. Amazon DSP only (DataDoe DSP slot of a seller or vendor), refreshed once a day, not intraday. Rows map to a seller or vendor through seller_or_vendor_id, which is null when the DSP advertiser is not mapped. DSP order = campaign and line item = ad group in the new Amazon DSP naming. Rows are rolling 7-day summaries starting every day: never sum across different periods (summing all dates overcounts about 7 times); pick one period and one dsp_brand_suitability_dimension.

### DSP Performance by Content

- Table name: `amazon_ads_dsp_performance_by_content`
- Columns: 33
- Markdown: data-scheme/amazon_ads_dsp_performance_by_content.md

Amazon DSP audio and video delivery (streaming TV, online video, audio) per advertiser, report period, order, line item, creative, supply source, and content (show title, rating, type, genre). Amazon DSP only (DataDoe DSP slot of a seller or vendor), refreshed once a day, not intraday. Rows map to a seller or vendor through seller_or_vendor_id, which is null when the DSP advertiser is not mapped. DSP order = campaign and line item = ad group in the new Amazon DSP naming. Impressions and cost per thousand impressions only: Amazon does not report cost totals or conversions in this report. Rows are rolling 7-day summaries starting every day: never sum across different periods (summing all dates overcounts about 7 times); pick one period.

### DSP Bid Adjustments by Date

- Table name: `amazon_ads_dsp_bid_adjustments_by_date`
- Columns: 25
- Markdown: data-scheme/amazon_ads_dsp_bid_adjustments_by_date.md

Amazon DSP bid adjustment rule activity per advertiser, date, line item, bid adjustment rule, and matched terms. Amazon DSP only (DataDoe DSP slot of a seller or vendor), refreshed once a day, not intraday. Rows map to a seller or vendor through seller_or_vendor_id, which is null when the DSP advertiser is not mapped. DSP order = campaign and line item = ad group in the new Amazon DSP naming. Only line items that use bid adjustment rules have rows; the table is empty for advertisers without bid adjustments. ad_win_rate and ad_match_rate are rates: never sum them across rows.

### Ads Brand Metrics

- Table name: `amazon_ads_brand_metrics`
- Columns: 67
- Markdown: data-scheme/amazon_ads_brand_metrics.md

Amazon Ads Brand Metrics: brand-level awareness, consideration, and sales indices plus the shopping funnel (branded searches, detail-page views, add-to-carts, brand customers, high-value customers, return on engagement), by brand, category node, computation date, and lookback. Indices are percentiles versus peers, not 0–1 rates. This is all on-Amazon shopping, not ad-attributed performance. Sparse — most metric columns are NULL for a given row. Columns ending in _category_median are the peer median. Columns ending in _category_top_performers or _category_performers are the average of the 95th–99th percentile of peers. Columns ending in _return_on_engagement, or containing _roe_, are return on engagement (currency), not rates.

### Ads Performance Benchmarks

- Table name: `amazon_ads_performance_benchmarks`
- Columns: 52
- Markdown: data-scheme/amazon_ads_performance_benchmarks.md

Sponsored Ads category benchmarks. One row compares a brand in a browse category with peer percentiles for one ad product, ad format, campaign goal, currency, and Amazon period. This is not Brand Metrics and not Amazon DSP. Amazon updates the figures about every 48 hours. DataDoe refreshes the latest 30 completed days, 4 completed weeks, and 2 completed months every 2 days. That refresh is a DataDoe choice, not an Amazon guarantee. The earliest period is the earliest one Amazon returned for the account. The account must represent the brand. Rates and percentiles are not additive. Do not average daily percentiles into a week or month.

### Ads Attribution Performance by Creative

- Table name: `amazon_ads_attribution_performance_by_creative_by_date`
- Columns: 27
- Markdown: data-scheme/amazon_ads_attribution_performance_by_creative_by_date.md

Amazon Attribution Performance by Creative: off-Amazon traffic measured by Amazon Attribution tags (14-day last-click), not Sponsored Ads conversion windows. One row per date, campaign, ad group, creative, and publisher. Use amazon_ads_attribution_performance_by_ad_group_by_date for totals and Brand Referral Bonus. Never sum creative rows up to ad-group or campaign level — Amazon masks rows with fewer than 10 lifetime clicks (metrics are 0) and creative totals will not match ad-group totals.

### Ads Attribution Performance by Ad Group

- Table name: `amazon_ads_attribution_performance_by_ad_group_by_date`
- Columns: 27
- Markdown: data-scheme/amazon_ads_attribution_performance_by_ad_group_by_date.md

Amazon Attribution Performance by Ad Group: off-Amazon traffic measured by Amazon Attribution tags (14-day last-click), not Sponsored Ads conversion windows. Use this table for ad-group or campaign totals and for Brand Referral Bonus (brb_bonus_amount). Do not sum amazon_ads_attribution_performance_by_creative_by_date to this grain. BRB is present only for enrolled sellers and only at ad-group level. Rows with fewer than 10 lifetime clicks are masked (metrics 0).

### Ads Attribution Products

- Table name: `amazon_ads_attribution_products_by_date`
- Columns: 38
- Markdown: data-scheme/amazon_ads_attribution_products_by_date.md

Amazon Attribution Products: off-Amazon traffic measured by Amazon Attribution tags (14-day last-click), not Sponsored Ads conversion windows. Top 100 products per campaign, always at ad-group grain. Use amazon_ads_attribution_performance_by_ad_group_by_date for totals and BRB. Rows with fewer than 10 lifetime clicks are masked (metrics 0). History is last 90 days.

### Keyword Targeting Performance

- Table name: `amazon_ads_targeting_by_campaign_by_date`
- Columns: 48
- Markdown: data-scheme/amazon_ads_targeting_by_campaign_by_date.md

Target performance by target and date. Sponsored Products includes keywords and product targets. Sponsored Brands includes product targets and broad, phrase and exact keywords. Keyword rows appear after the keyword report is collected. The first keyword load covers the latest 30 completed days. Keyword refreshes run every two days and replace the latest 14 completed days. Keyword rows have no monthly refresh. The table refresh periods apply to the other campaign types. The keyword report does not cover every Sponsored Brands campaign. A global Ads account keeps keyword rows for the connection marketplace only. Campaign status and budget on keyword rows come from the Sponsored Brands campaign report for the same connection, date and campaign. Sponsored Display includes product, category, and remarketing targets such as views and purchases. Display ad_match_type is blank, Amazon audience segments are not included, and Display spend and impressions can be lower than the campaign table for the same campaign. Sponsored Television is included. ad_keyword is the target. The shopper query is amazon_ads_search_terms_by_campaign_by_date.ad_search_term. Do not sum this table into campaign totals.

### Search Term Performance (Ads)

- Table name: `amazon_ads_search_terms_by_campaign_by_date`
- Columns: 42
- Markdown: data-scheme/amazon_ads_search_terms_by_campaign_by_date.md

Customer search queries that matched an advertised keyword or product target, for Sponsored Products and Sponsored Brands. ad_search_term is the shopper query; ad_keyword is the target it matched. Not Brand Analytics search terms and not Search Query Performance.

### Search Term Impression Share

- Table name: `amazon_ads_search_term_impression_share_by_date`
- Columns: 17
- Markdown: data-scheme/amazon_ads_search_term_impression_share_by_date.md

Daily account-wide search impression share and rank for Sponsored Products and Sponsored Brands. One row is one Ads connection, advertiser account, ad product, search term, date, and occurrence. A global advertiser account covers several marketplaces, and Amazon reports a search term once per marketplace without saying which one: a term with search_term_occurrences above 1 ran in several marketplaces of the account. Every Ads connection of the same advertiser account holds a copy of the account's rows; to count an account once across all sellers and vendors of the Organization, filter is_account_primary_copy = TRUE. Do not use that filter for one seller or vendor or a subset of them: the marked copy can belong to a connection outside the selection. marketplace_id is the marketplace of the connection that fetched the account's report, not of the row. impression_share is Amazon's percentage from 0% to 100%, not a ratio from 0 to 1. impression_share_rank is a positive whole number when Amazon sends it. Do not add shares or average ranks across dates, accounts, or search terms. This is not ad_top_of_search_impression_share on a keyword, and it is not amazon_ads_recommendation_snapshots. Sponsored Display, Sponsored Television, and Full-Funnel are not included. A product with no rows does not have 0% share. The first fetch covers the latest 30 completed days in the advertiser account's Ads reporting time zone. A refresh every two days covers the latest 21 completed days and replaces those days, including search terms that are no longer in the file and dates with no rows. Today is not included. The marketplace time zone is used only when the reporting time zone is not stored.

### Ad Profit by Target and Date

- Table name: `amazon_ads_profit_by_target_and_date`
- Columns: 64
- Markdown: data-scheme/amazon_ads_profit_by_target_and_date.md

One row per target present in the collected reports and click date. Includes Sponsored Products keywords and product or automatic targets, Sponsored Brands product targets and broad, phrase and exact keywords after the keyword report is collected, and reported Display and Television targets. This is partial report coverage, not all account advertising. Spend and attributed sales are reported metrics. Sponsored Products COGS and fees are estimates from uploaded COGS, purchased ASINs, advertised-product mix and preceding 90 days of Seller Central ORDER settlements. For purchased ASINs with several SKUs, use shared unit costs or recent order quantities as weights within the seller connection. Accept purchased sales and units within max(2% of the target value, 0.01), and scale costs by target other-SKU sales / purchased sales. Other campaign types keep reported metrics but have null profit estimates. Refund costs are excluded and recent profit is provisional. This is an ad decision view; its profit does not add to amazon_profit_by_date.profit.

### Ad Profit by Search Term and Date

- Table name: `amazon_ads_profit_by_search_term_and_date`
- Columns: 68
- Markdown: data-scheme/amazon_ads_profit_by_search_term_and_date.md

One row per reported shopper search term, parent target and click date for Sponsored Products and Brands. The report identifies the query and parent keyword or target but not the ASIN purchased for that query. Sponsored Products profit estimates inherit the parent target product mix and cost per same- or other-SKU sale. Sponsored Brands keeps spend, sales and keyword identity with null profit. Recent estimates are provisional and all estimates exclude refunds. Search-term totals overlap target totals and are not account P&L.

### Ad Placement Performance (Sponsored Brands and Sponsored Products)

- Table name: `amazon_ads_placement_by_campaign_by_date`
- Columns: 56
- Markdown: data-scheme/amazon_ads_placement_by_campaign_by_date.md

Placement performance for SPONSORED_BRANDS and SPONSORED_PRODUCTS campaigns, including Amazon Business placement breakdown for Sponsored Products.

### Sponsored Brands Ad Performance

- Table name: `amazon_ads_sponsored_brands_by_ad_by_date`
- Columns: 44
- Markdown: data-scheme/amazon_ads_sponsored_brands_by_ad_by_date.md

Sponsored Brands performance per ad and date. Attribution is 14 days. Same-SKU columns exclude brand halo. New-to-brand columns use a 12-month first-purchase lookback. Do not sum this table into campaign totals.

### Video Ad Extension Performance

- Table name: `amazon_ads_video_ad_extensions_by_date`
- Columns: 37
- Markdown: data-scheme/amazon_ads_video_ad_extensions_by_date.md

Performance for Sponsored Products video ad extensions per extension, ad, and date. Grain is creativeExtensionId + adId. Do not sum these metrics with campaign, ASIN, or ad-level ads views (double-count). Canonical conversion metrics use 14-day attribution.

### Prompt Ad Extension Performance

- Table name: `amazon_ads_prompt_ad_extensions_by_date`
- Columns: 37
- Markdown: data-scheme/amazon_ads_prompt_ad_extensions_by_date.md

Performance for Sponsored Products and Sponsored Brands prompt ad extensions per extension, ad, and date. Grain is creativeExtensionId + adId. Do not sum these metrics with campaign, ASIN, or ad-level ads views (double-count). Canonical conversion metrics use 14-day attribution.

### Bid-Boost Audience Performance

- Table name: `amazon_ads_audiences_by_date`
- Columns: 23
- Markdown: data-scheme/amazon_ads_audiences_by_date.md

Bid-boost audience segment performance for Sponsored Products and Sponsored Brands. Grain is campaign + audience segment + date. Do not sum these metrics with campaign or ASIN ads views (double-count). DSP Audience (order / lineItem / segment) is a different report and is not included here. Canonical conversion metrics use 14-day attribution for SPONSORED_PRODUCTS and the unwindowed purchases/sales/unitsSoldClicks fields for SPONSORED_BRANDS.

### Ad Group Performance

- Table name: `amazon_ads_by_ad_group_by_date`
- Columns: 50
- Markdown: data-scheme/amazon_ads_by_ad_group_by_date.md

Performance for ad groups in SPONSORED_PRODUCTS, SPONSORED_BRANDS and SPONSORED_DISPLAY campaigns. Attribution windows differ by campaign type: Sponsored Products ad_sales, ad_orders and ad_units_sold use 7-day click attribution, Sponsored Brands 14 days and Sponsored Display its default window. Sponsored Products rows have null budget, new-to-brand, video, viewability, detail-page-view and branded-search columns.

### Ad Campaigns (raw)

- Table name: `amazon_ads_campaigns_raw`
- Columns: 28
- Markdown: data-scheme/amazon_ads_campaigns_raw.md

Snapshots of Amazon Ads campaign configuration and settings. Rows are identified by campaign and ad product within each Organization, Store, and Ads Connection. State changes update the existing row. Includes archived, enabled, and paused campaigns. Snapshots are refreshed every 48 hours. Live entity state can be obtained using Actions.

### Ad Groups (raw)

- Table name: `amazon_ads_ad_groups_raw`
- Columns: 21
- Markdown: data-scheme/amazon_ads_ad_groups_raw.md

Snapshots of Amazon Ads ad group configuration and settings. Rows are identified by ad group and ad product. Includes archived, enabled, and paused ad groups. Snapshots are refreshed every 48 hours. Live entity state can be obtained using Actions.

### Ads (raw)

- Table name: `amazon_ads_ads_raw`
- Columns: 33
- Markdown: data-scheme/amazon_ads_ads_raw.md

Snapshots of Amazon Ads ad configuration and creative settings. Rows are identified by ad, ad product, and ad type. Includes archived, enabled, and paused ads. Snapshots are refreshed every 48 hours. Live entity state can be obtained using Actions.

### Ad Targets (raw)

- Table name: `amazon_ads_targets_raw`
- Columns: 40
- Markdown: data-scheme/amazon_ads_targets_raw.md

Snapshots of Amazon Ads targeting configuration (keywords, product targets, audiences). Rows are identified by target and ad product. Includes archived, enabled, and paused targets. Snapshots are refreshed every 48 hours. Live entity state can be obtained using Actions.

### Ad Campaign Settings History

- Table name: `amazon_ads_campaigns_history`
- Columns: 38
- Markdown: data-scheme/amazon_ads_campaigns_history.md

Entity settings from complete published Universal Ads exports, including unchanged later observations. Each snapshot_id is one family/profile export, not a simultaneous account snapshot. Actual observation dates and gaps are authoritative. Portfolio names are null in campaign history; seller and account labels are current context. Absence from a later file does not imply deletion. Changes are known only between observations.  History follows existing collection, normally every 48 hours, with large targets on the weekly schedule. Source caps and failed or incomplete exports leave gaps. No complete daily coverage is guaranteed. Inspect checked_at and snapshot manifests for actual observations. Actions provide live entity state.

### Ad Group Settings History

- Table name: `amazon_ads_ad_groups_history`
- Columns: 31
- Markdown: data-scheme/amazon_ads_ad_groups_history.md

Entity settings from complete published Universal Ads exports, including unchanged later observations. Each snapshot_id is one family/profile export, not a simultaneous account snapshot. Actual observation dates and gaps are authoritative. Portfolio names are null in campaign history; seller and account labels are current context. Absence from a later file does not imply deletion. Changes are known only between observations.  History follows existing collection, normally every 48 hours, with large targets on the weekly schedule. Source caps and failed or incomplete exports leave gaps. No complete daily coverage is guaranteed. Inspect checked_at and snapshot manifests for actual observations. Actions provide live entity state.

### Ad Settings History

- Table name: `amazon_ads_ads_history`
- Columns: 43
- Markdown: data-scheme/amazon_ads_ads_history.md

Entity settings from complete published Universal Ads exports, including unchanged later observations. Each snapshot_id is one family/profile export, not a simultaneous account snapshot. Actual observation dates and gaps are authoritative. Portfolio names are null in campaign history; seller and account labels are current context. Absence from a later file does not imply deletion. Changes are known only between observations.  History follows existing collection, normally every 48 hours, with large targets on the weekly schedule. Source caps and failed or incomplete exports leave gaps. No complete daily coverage is guaranteed. Inspect checked_at and snapshot manifests for actual observations. Actions provide live entity state.

### Target Settings History

- Table name: `amazon_ads_targets_history`
- Columns: 50
- Markdown: data-scheme/amazon_ads_targets_history.md

Entity settings from complete published Universal Ads exports, including unchanged later observations. Each snapshot_id is one family/profile export, not a simultaneous account snapshot. Actual observation dates and gaps are authoritative. Portfolio names are null in campaign history; seller and account labels are current context. Absence from a later file does not imply deletion. Changes are known only between observations.  History follows existing collection, normally every 48 hours, with large targets on the weekly schedule. Source caps and failed or incomplete exports leave gaps. No complete daily coverage is guaranteed. Inspect checked_at and snapshot manifests for actual observations. Actions provide live entity state.

### Ads Entity Export Snapshots

- Table name: `amazon_ads_entity_export_snapshots`
- Columns: 22
- Markdown: data-scheme/amazon_ads_entity_export_snapshots.md

One manifest per Ads family/profile export. Only COMPLETE, is_complete observations whose rows reached the warehouse appear in entity history. Empty complete files have zero rows. PARTIAL and FAILED files explain gaps.

### Ad Creative Assets

- Table name: `amazon_ads_creative_assets`
- Columns: 40
- Markdown: data-scheme/amazon_ads_creative_assets.md

Amazon Ads Creative Asset Library assets and versions. Rows are identified by seller or vendor, connection, DSP advertiser, creative asset ID, and version. The same asset version can appear once per DSP advertiser that sees it, and once with an empty DSP advertiser ID for the Ads profile.

### Ad Entity History

- Table name: `amazon_ads_entity_history`
- Columns: 16
- Markdown: data-scheme/amazon_ads_entity_history.md

Change history events for Sponsored Products and Sponsored Brands campaigns, ad groups, ads, and targets, such as state, bid, and budget changes. Amazon's change history API does not return Sponsored Display events.

### Ad Purchased Products

- Table name: `amazon_ads_purchased_products`
- Columns: 44
- Markdown: data-scheme/amazon_ads_purchased_products.md

ASINs purchased after an ad click or view, including brand-halo ASINs that differ from the promoted ASIN. Sponsored Products, Sponsored Display, and Sponsored Brands. Not the advertised-product performance table (amazon_ads_performance_by_child_asin_and_date).

### AMS Campaigns

- Table name: `amazon_ads_ams_campaigns`
- Columns: 24
- Markdown: data-scheme/amazon_ads_ams_campaigns.md

Amazon Marketing Stream campaign configuration events from dataset ads-campaign-management-campaigns.

### AMS Campaign Ad Groups

- Table name: `amazon_ads_ams_campaign_ad_groups`
- Columns: 16
- Markdown: data-scheme/amazon_ads_ams_campaign_ad_groups.md

Amazon Marketing Stream ad group configuration events from dataset ads-campaign-management-adgroups.

### AMS Campaign Ads

- Table name: `amazon_ads_ams_campaign_ads`
- Columns: 23
- Markdown: data-scheme/amazon_ads_ams_campaign_ads.md

Amazon Marketing Stream ad configuration events from dataset ads-campaign-management-ads.

### AMS Budget Usage

- Table name: `amazon_ads_ams_budget_usage`
- Columns: 18
- Markdown: data-scheme/amazon_ads_ams_budget_usage.md

Amazon Marketing Stream budget consumption events from dataset budget-usage.

### AMS Campaign Diagnostics

- Table name: `amazon_ads_ams_campaign_diagnostics`
- Columns: 26
- Markdown: data-scheme/amazon_ads_ams_campaign_diagnostics.md

Amazon Marketing Stream campaign diagnostics recommendations from dataset sponsored-ads-campaign-diagnostics-recommendations.

### AMS Campaign Targets

- Table name: `amazon_ads_ams_campaign_targets`
- Columns: 30
- Markdown: data-scheme/amazon_ads_ams_campaign_targets.md

Amazon Marketing Stream targeting configuration events from dataset ads-campaign-management-targets.

### AMS Traffic

- Table name: `amazon_ads_ams_traffic`
- Columns: 29
- Markdown: data-scheme/amazon_ads_ams_traffic.md

Amazon Marketing Stream near real-time traffic metrics unified across Sponsored Products, Sponsored Brands, and Sponsored Display.

### AMS Conversion

- Table name: `amazon_ads_ams_conversion`
- Columns: 55
- Markdown: data-scheme/amazon_ads_ams_conversion.md

Amazon Marketing Stream near real-time conversion metrics for Sponsored Products, Sponsored Brands, and Sponsored Display. Click-attributed columns are named ad_attributed_*; view-through columns start with ad_view_attributed_. Same-SKU columns exclude brand halo. Windows are 1, 7, 14, and 30 days. The daily campaign table uses 7 days for Sponsored Products and 14 days for Sponsored Brands and Sponsored Display — do not add these hourly rows to that table.

### Ads performance by campaign by hour

- Table name: `amazon_ads_performance_by_campaign_by_hour`
- Columns: 107
- Markdown: data-scheme/amazon_ads_performance_by_campaign_by_hour.md

Advertising performance for each campaign and each Amazon activity hour. Filter on the local date, then group by weekday and local hour and recompute ratios from the summed measures. Hours use the advertiser's Amazon Ads profile timezone, including daylight saving. If that timezone is unknown, the local date, hour, and weekday are null. A null measure is unavailable, not zero. A missing traffic or conversion side stays null. Turning this table on does not mean the stream is subscribed, receiving, or complete for every past hour. This is not the shopper's purchase hour, and it is not hourly profit, fees, or total advertising cost of sales.

### AMS SB Clickstream

- Table name: `amazon_ads_ams_sb_clickstream`
- Columns: 22
- Markdown: data-scheme/amazon_ads_ams_sb_clickstream.md

Amazon Marketing Stream Sponsored Brands clickstream engagement metrics from dataset sb-clickstream.

### AMS SB Rich Media

- Table name: `amazon_ads_ams_sb_rich_media`
- Columns: 24
- Markdown: data-scheme/amazon_ads_ams_sb_rich_media.md

Amazon Marketing Stream Sponsored Brands rich media / video engagement metrics.

### AMS SP Budget Recommendations

- Table name: `amazon_ads_ams_sp_budget_recommendations`
- Columns: 24
- Markdown: data-scheme/amazon_ads_ams_sp_budget_recommendations.md

Amazon Marketing Stream Sponsored Products budget recommendations. Missed sales, clicks, and impressions are Amazon estimates of what the campaign might have gained if it had not run out of budget, as a lower and upper bound, not a guarantee.

### Negative Keywords

- Table name: `amazon_ads_negative_keywords`
- Columns: 15
- Markdown: data-scheme/amazon_ads_negative_keywords.md

Negative keywords that block traffic. Weekly snapshots. These rows have no spend or sales.

### Ads Profiles

- Table name: `amazon_ads_profiles`
- Columns: 17
- Markdown: data-scheme/amazon_ads_profiles.md

One row per Amazon Ads connection with its Amazon Ads profile: account type and subtype (for example KDP_AUTHOR), country, currency, timezone and payment status. Profile columns are null until DataDoe captured the profile.

### Ads Profile Capabilities

- Table name: `amazon_ads_profile_capabilities`
- Columns: 22
- Markdown: data-scheme/amazon_ads_profile_capabilities.md

Amazon Ads program eligibility and API access pauses per Ads connection and UTC check day. PROGRAM_ELIGIBILITY rows come from Amazon program eligibility; ACCESS_PAUSE rows are operations DataDoe paused after Amazon denied access. Use is_listed_in_last_fetch = TRUE for the current state. Checked about every 20 hours.

### Ads Billing

- Table name: `amazon_ads_billing`
- Columns: 50
- Markdown: data-scheme/amazon_ads_billing.md

Amazon Ads Billing invoices, as in the Ads console billing history. Not the SP-API Vendor amazon_invoices. One row per issued invoice and billing_type: CAMPAIGN (one campaign and program, lines of the same campaign summed, Amazon sign kept), PROMOTION, ADJUSTMENT, FEE (per fee type and country) and TAX. date is the invoice date. SUM(total) over an invoice without TAX rows equals invoice_amount_due. The current, not yet issued period is not included. Empty when the Ads account has no Billing history permission. Fetched daily, 2 years back.

### Ads Invoice Lines

- Table name: `amazon_ads_invoice_lines`
- Columns: 34
- Markdown: data-scheme/amazon_ads_invoice_lines.md

Exact Amazon Ads invoice lines. One row per invoice and line position in the latest complete invoice detail. line_index is that position, starting at 0. cost is the Amazon line cost and still includes fees. Do not add it to Ads Billing, which already publishes those fees as separate rows. Creator Connections counts stay in billed_event_count.

### Ads Invoice Payments

- Table name: `amazon_ads_invoice_payments`
- Columns: 24
- Markdown: data-scheme/amazon_ads_invoice_payments.md

Amazon Ads invoice payments. One row per invoice and payment. date is the invoice date. invoice_status is the invoice and payment_status is the payment. payment_method keeps Amazon values such as DEDUCT_FROM_PAYMENT. Amounts keep Amazon's sign, and each amount keeps its own currency. A missing payment list produces no rows.

### Ads Billing Statements

- Table name: `amazon_ads_billing_statements`
- Columns: 26
- Markdown: data-scheme/amazon_ads_billing_statements.md

Amazon Ads billing statement requests. One row per statement. Each statement covers the previous 30 complete UTC days, so the next statement repeats invoices. date is the day DataDoe requested the statement. Use the row where is_current is true. This is request metadata, not a list of charges. The download link from Amazon is not stored. is_provisional is false when the verified German statement columns were read.

### Ads Billing Statement Rows

- Table name: `amazon_ads_billing_statement_rows`
- Columns: 35
- Markdown: data-scheme/amazon_ads_billing_statement_rows.md

Rows from an Amazon Ads billing statement. One row per statement and source row. Each statement covers the previous 30 complete UTC days, so later statements repeat invoices. Sum billed_amount only where is_current is true and is_provisional is false. That total counts each invoice once. Skip is_provisional rows because an amount that could not be read is missing. When the file uses the verified German column names, the invoice, amount, date and payment columns are filled. source_values keeps every cell as text, in the same order as source_headers on Ads Billing Statements. A file with other column names leaves the mapped columns empty. These rows do not identify a vendor remittance. The invoice id can match an Ads invoice.

### Ad Portfolios

- Table name: `amazon_ads_portfolios`
- Columns: 25
- Markdown: data-scheme/amazon_ads_portfolios.md

Amazon Ads portfolios with budget caps, serving status and budget usage. One row per portfolio. Portfolios Amazon stopped returning keep their last row with is_listed_in_last_fetch = FALSE. Refreshed daily.

### Partner Opportunities

- Table name: `amazon_ads_partner_opportunities`
- Columns: 49
- Markdown: data-scheme/amazon_ads_partner_opportunities.md

Amazon Ads Partner Network rows for one Ads connection. One row per source row in the latest complete file for that opportunity. Rows without a matching advertiser in this connection are not included. can_apply is true only for current account-team recommendations with a Partner Network apply endpoint. Benefit columns and extra_fields stay as Amazon sent them. A saved Partner Network account ID is required before DataDoe collects this table. DataDoe refreshes it once a day.

### Ad Budget Rules

- Table name: `amazon_ads_budget_rules`
- Columns: 27
- Markdown: data-scheme/amazon_ads_budget_rules.md

Budget rules for Sponsored Products, Sponsored Brands and Sponsored Display, including rules created in the Amazon Ads console. One row per ad product and rule from the latest fetch. A schedule rule raises the budget on dates or during an Amazon event. A performance rule raises the budget when a metric crosses a threshold. DataDoe refreshes this table every 3 hours.

### Ad Budget Rule Campaigns

- Table name: `amazon_ads_budget_rule_campaigns`
- Columns: 12
- Markdown: data-scheme/amazon_ads_budget_rule_campaigns.md

Campaigns attached to budget rules from the latest fetch. One row per ad product, rule and campaign for Sponsored Products, Sponsored Brands and Sponsored Display. Rule definitions are in amazon_ads_budget_rules. DataDoe refreshes this table every 3 hours.

### Ad Recommendation Snapshots

- Table name: `amazon_ads_recommendation_snapshots`
- Columns: 24
- Markdown: data-scheme/amazon_ads_recommendation_snapshots.md

Daily snapshots of Amazon Ads budget, bid, keyword, product-target and budget-rule-event recommendations for Sponsored Products and Sponsored Brands. One row per request and UTC day; is_latest_snapshot = TRUE is the current answer of a request. Errors are stored as snapshots too.

### Ad Creative Versions

- Table name: `amazon_ads_creative_versions`
- Columns: 34
- Markdown: data-scheme/amazon_ads_creative_versions.md

Sponsored Brands ad creative versions with moderation results. One row per ad and creative version; is_latest_creative_version = TRUE is the current creative.

### Ads Attribution Tags

- Table name: `amazon_ads_attribution_tags`
- Columns: 15
- Markdown: data-scheme/amazon_ads_attribution_tags.md

Amazon Attribution tags (URL parameter templates) per Attribution advertiser and publisher. Use them to tag off-Amazon links; results are in the amazon_ads_attribution_* tables.

### Ads Author Brands

- Table name: `amazon_ads_author_brands`
- Columns: 12
- Markdown: data-scheme/amazon_ads_author_brands.md

Sponsored Brands author brands (bookAuthor) of KDP author Ads accounts. Refreshed weekly.

### Ads Brand Stores

- Table name: `amazon_ads_stores`
- Columns: 12
- Markdown: data-scheme/amazon_ads_stores.md

Current Amazon Brand Stores for an Ads connection. One row per store. A store Amazon stops listing stays here, with its last known name and status. Refreshed daily.

### Ads Brand Store Pages

- Table name: `amazon_ads_store_pages`
- Columns: 15
- Markdown: data-scheme/amazon_ads_store_pages.md

Current pages of Amazon Brand Stores. One row per store and page. A page that disappears stays here, with its last known name and URL. Refreshed daily.

### Ads Brand Store Insights by Date

- Table name: `amazon_ads_store_insights_by_date`
- Columns: 20
- Markdown: data-scheme/amazon_ads_store_insights_by_date.md

Daily Brand Store totals: page views, visits, unique visitors, and estimated orders, units and sales within 14 days of a store visit. Visitors are unique for that day only. A total across days counts the same person again on each day they visit. views_per_visit is views divided by visits. Sales stay in the Ads profile currency. The first load covers 418 days. Later loads refresh the latest 30 days. Collection runs daily. Amazon decides how fresh the figures are.

### Ads Brand Store Insights by Page

- Table name: `amazon_ads_store_insights_by_page_by_date`
- Columns: 23
- Markdown: data-scheme/amazon_ads_store_insights_by_page_by_date.md

Daily page performance for Amazon Brand Stores. One row per store, date and page. Visitor counts stay on the daily store total. Page name and URL come from the latest page list and are empty when the page is no longer listed. These rows are separate from daily store totals.

### Ads Brand Store Insights by Source

- Table name: `amazon_ads_store_insights_by_source_by_date`
- Columns: 20
- Markdown: data-scheme/amazon_ads_store_insights_by_source_by_date.md

Daily Brand Store traffic by the source category Amazon returned. Amazon chooses the categories, and they can change. Social traffic stays as the category Amazon sent. Visitor counts stay on the daily store total. These rows are separate from page rows and daily store totals.

### Ads Brand Store Insights by Tag

- Table name: `amazon_ads_store_insights_by_tag_by_date`
- Columns: 20
- Markdown: data-scheme/amazon_ads_store_insights_by_tag_by_date.md

Daily Brand Store traffic by store source tag. Amazon Attribution tags are a different field. Visitor counts stay on the daily store total. These rows are separate from the other store insight tables.

### Ads Brand Store Insights by Page and Source

- Table name: `amazon_ads_store_insights_by_page_by_source_by_date`
- Columns: 24
- Markdown: data-scheme/amazon_ads_store_insights_by_page_by_source_by_date.md

Daily Brand Store traffic by page and the source category Amazon returned for that page. One row per store, date, page and source. Amazon returns these figures for that page only. They are separate from page totals and from source totals for the whole store. Visitor counts stay on the daily store total. Page name and URL come from the latest page list and are empty when the page is no longer listed. Sales stay in the Ads profile currency.

### Ads Product Catalog

- Table name: `amazon_ads_product_catalog`
- Columns: 34
- Markdown: data-scheme/amazon_ads_product_catalog.md

Products you can advertise in Amazon Ads, for sellers, vendors, and books, with Sponsored Products, Sponsored Brands, and Sponsored Display eligibility. One row per Organization, DataDoe Store, Ads connection, marketplace, ASIN, and SKU. A missing SKU is null. Eligibility belongs to that Ads account, not to the ASIN in every account. A missing program status is unknown, not a denial. Amazon DSP is not included. Each Ads connection refreshes every three days, with at most 10,000 products per program. Account permissions and Amazon API availability apply. observed_at_utc is the time of the latest product observation. Existing exports stay on amazon_ads_book_catalog until you select this table. Migration examples: https://app.datadoe.com/hub/docs/datadoe-data/ads-product-catalog.

### Ads Book Catalog

- Table name: `amazon_ads_book_catalog`
- Columns: 32
- Markdown: data-scheme/amazon_ads_book_catalog.md

Deprecated. Use amazon_ads_product_catalog (Ads Product Catalog). It covers the same seller, vendor and book products and eligibility data. Replace book_title with product_title when migrating. This view remains available for compatibility.

### Ads Book Associations

- Table name: `amazon_ads_book_ad_associations`
- Columns: 17
- Markdown: data-scheme/amazon_ads_book_ad_associations.md

Products (books) associated with each ad: advertised products, Store Spotlight cards and Sponsored Brands landing-page products. One row per ad, product and association role.

### KDP Royalty Parameters

- Table name: `amazon_kdp_royalty_parameters`
- Columns: 29
- Markdown: data-scheme/amazon_kdp_royalty_parameters.md

KDP royalty parameters per book edition, Ads connection and effective period, managed by the user in the DataDoe app, API or MCP. Used to estimate author royalties in amazon_ads_book_economics_by_entity_and_date.

### KDP Book Economics

- Table name: `amazon_ads_book_economics_by_entity_and_date`
- Columns: 45
- Markdown: data-scheme/amazon_ads_book_economics_by_entity_and_date.md

Estimated KDP author earnings and profit after ads for Sponsored Products ads, ad groups and campaigns by date, using 14-day attribution. Only Ads connections with KDP royalty parameters for the AMAZON channel. Units are costed per purchased edition with the parameters effective on the date; KENP royalties are Amazon estimates. Estimates are provisional until is_attribution_mature_14d. Do not sum AD, AD_GROUP and CAMPAIGN rows together; filter one entity_type.

### Sellers & Vendors Context

- Table name: `amazon_sellers_and_vendors_context`
- Columns: 18
- Markdown: data-scheme/amazon_sellers_and_vendors_context.md

Lookup of DataDoe Amazon accounts for Seller Central, Vendor Central, Amazon Ads, and Amazon DSP. One row per connection, plus one row per Amazon DSP advertiser mapped to a seller or vendor on a shared agency Ads account. A DSP-only agency seat is not its own seller. seller_or_vendor_id equals connection_context_id and is not unique: one context can have a Seller Central row, an Amazon Ads row, and one row per DSP advertiser. Join Seller Central and Vendor Central facts on sp_connection_id or vendor_connection_id. Attribute DSP facts on organization_id, store_id, ads_dsp_connection_id, and dsp_advertiser_id.
