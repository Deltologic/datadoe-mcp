# FBA Inventory Health

- BigQuery table name: `amazon_fba_inventory_health`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

Consolidated daily FBA inventory health snapshot across sales windows (7, 30, 60, and 90 days), inbound shipment statuses (working, received, and shipped), estimated storage and long-term storage fees, aged and excess units, and recommended actions. One row per SKU and date; not additive across dates. inv_age_0_to_90_days already includes inv_age_0_to_30_days, inv_age_31_to_60_days, and inv_age_61_to_90_days. The planning-report-sourced columns are not available in the MX marketplace.

- Source type: `SELLER_CENTRAL`
- Source ID: `44fc5ba0ce81a7807601f6d7a9b8b7aaec64be4c7e046ea30dc6864d1a4aa823`
- Requires a date period: yes
- Contains PII: no
- Premium table: yes
- User-managed: no
- Default dataset: yes
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=44fc5ba0ce81a7807601f6d7a9b8b7aaec64be4c7e046ea30dc6864d1a4aa823

## Fetch periods

- `INITIAL` (1 days)
- `RECURRING_DAILY` (1 days)

## Data availability

- `INTRADAY` — Intraday updates are available when source data changes during the day. Refresh: 10am, 1pm, 4pm.

## Search aliases

- fba stock
- inventory
- warehouse
- aged inventory

## Columns (115)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `date` (`DATE`, required) — Daily snapshot. Not additive across dates.
- `sku` (`TEXT`, required)
- `fnsku` (`TEXT`, required)
- `child_asin` (`TEXT`, required)
- `product_name` (`TEXT`, required)
- `condition` (`TEXT`, required) — New / Used / or empty
- `available` (`NUMBER`, required)
- `pending_removal_quantity` (`NUMBER`, required)
- `inv_age_0_to_90_days` (`NUMBER`, required) — Sellable units aged 0–90 days. Already includes inv_age_0_to_30_days, inv_age_31_to_60_days, and inv_age_61_to_90_days. Do not add those columns to this one.
- `inv_age_91_to_180_days` (`NUMBER`, required)
- `inv_age_181_to_270_days` (`NUMBER`, required)
- `inv_age_271_to_365_days` (`NUMBER`, required)
- `currency` (`TEXT`, required)
- `units_shipped_t7` (`NUMBER`, required)
- `units_shipped_t30` (`NUMBER`, required)
- `units_shipped_t60` (`NUMBER`, required)
- `units_shipped_t90` (`NUMBER`, required)
- `alert` (`TEXT`, required)
- `your_price` (`NUMBER`, nullable)
- `sales_price` (`NUMBER`, nullable)
- `lowest_price_new_plus_shipping` (`NUMBER`, nullable)
- `lowest_price_used` (`NUMBER`, nullable)
- `recommended_action` (`TEXT`, nullable)
- `recommended_sales_price` (`NUMBER`, required)
- `recommended_sale_duration_days` (`NUMBER`, required)
- `recommended_removal_quantity` (`NUMBER`, required)
- `estimated_cost_savings_of_recommended_actions` (`NUMBER`, required)
- `sell_through` (`NUMBER`, nullable) — Units shipped in the trailing 90 days divided by average on-hand units. Not a 0–1 or 0–100 percentage.
- `item_volume` (`NUMBER`, required)
- `volume_unit_measurement` (`TEXT`, nullable) — cubic feet / or empty
- `storage_type` (`TEXT`, required) — Other / Footwear / Apparel / Standard / or empty
- `storage_volume` (`NUMBER`, required)
- `marketplace` (`TEXT`, required) — Marketplace enum values.
- `product_group` (`TEXT`, required) — gl_home_improvement / gl_drugstore / gl_home / gl_personal_care_appliances / gl_biss / gl_beauty / gl_sports / gl_apparel / gl_pet_products / gl_office_product / gl_kitchen / gl_toy / gl_shoes / gl_electronics
- `sales_rank` (`NUMBER`, required)
- `days_of_supply` (`NUMBER`, required) — Estimated days the current FBA inventory will last at recent sales. A snapshot, not a unit count to sum across dates.
- `estimated_excess_quantity` (`NUMBER`, required)
- `weeks_of_cover_t30` (`NUMBER`, required)
- `weeks_of_cover_t90` (`NUMBER`, required)
- `featuredoffer_price` (`NUMBER`, required)
- `sales_shipped_last_7_days` (`NUMBER`, required)
- `sales_shipped_last_30_days` (`NUMBER`, required)
- `sales_shipped_last_60_days` (`NUMBER`, required)
- `sales_shipped_last_90_days` (`NUMBER`, required)
- `inv_age_0_to_30_days` (`NUMBER`, required)
- `inv_age_31_to_60_days` (`NUMBER`, required)
- `inv_age_61_to_90_days` (`NUMBER`, required)
- `inv_age_181_to_330_days` (`NUMBER`, required)
- `inv_age_331_to_365_days` (`NUMBER`, required)
- `estimated_storage_cost_next_month` (`NUMBER`, required)
- `inbound_quantity` (`NUMBER`, required) — Total quantity of units in inbound shipments. Sum of inbound_working, inbound_shipped, and inbound_received.
- `inbound_working` (`NUMBER`, required)
- `inbound_shipped` (`NUMBER`, required)
- `inbound_received` (`NUMBER`, required)
- `no_sale_last_6_months` (`NUMBER`, required)
- `total_reserved_quantity` (`NUMBER`, required)
- `unfulfillable_quantity` (`NUMBER`, required)
- `quantity_to_be_charged_ais_181_210_days` (`NUMBER`, required)
- `estimated_ais_181_210_days` (`NUMBER`, required)
- `quantity_to_be_charged_ais_211_240_days` (`NUMBER`, required)
- `estimated_ais_211_240_days` (`NUMBER`, required)
- `quantity_to_be_charged_ais_241_270_days` (`NUMBER`, required)
- `estimated_ais_241_270_days` (`NUMBER`, required)
- `quantity_to_be_charged_ais_271_300_days` (`NUMBER`, required)
- `estimated_ais_271_300_days` (`NUMBER`, required)
- `quantity_to_be_charged_ais_301_330_days` (`NUMBER`, required)
- `estimated_ais_301_330_days` (`NUMBER`, required)
- `quantity_to_be_charged_ais_331_365_days` (`NUMBER`, required)
- `estimated_ais_331_365_days` (`NUMBER`, required)
- `historical_days_of_supply` (`NUMBER`, required)
- `fba_minimum_inventory_level` (`NUMBER`, required)
- `fba_inventory_level_health_status` (`TEXT`, required) — FBA inventory level health status enum values.
- `recommended_ship_in_quantity` (`NUMBER`, required)
- `recommended_ship_in_date` (`DATE`, required)
- `last_updated_date_for_historical_days_of_supply` (`DATE`, required)
- `exempted_from_low_inventory_level_fee` (`LOGIC`, required)
- `low_inventory_level_fee_applied_in_current_week` (`LOGIC`, required)
- `short_term_historical_days_of_supply` (`NUMBER`, required)
- `long_term_historical_days_of_supply` (`NUMBER`, required)
- `inventory_age_snapshot_date` (`DATE`, required)
- `inventory_supply_at_fba` (`NUMBER`, required) — Total on-hand inventory at FBA fulfillment centers, including available and FC transfer units.
- `reserved_fc_transfer` (`NUMBER`, nullable)
- `reserved_fc_processing` (`NUMBER`, required)
- `reserved_customer_order` (`NUMBER`, required)
- `reserved_staging` (`NUMBER`, nullable) — Reserved staging units from the Reserved Inventory snapshot for the same date and product. NULL when the snapshot or a valid quantity is unavailable.
- `total_days_of_supply_including_units_from_open_shipments` (`NUMBER`, required)
- `supplier` (`TEXT`, required)
- `inv_age_366_to_455_days` (`NUMBER`, nullable) — Units of inventory that have been in an Amazon fulfillment center for 366 to 455 days.
- `inv_age_456_plus_days` (`NUMBER`, nullable) — Units of inventory that have been in an Amazon fulfillment center for 456 days or more.
- `quantity_to_be_charged_ais_366_455_days` (`NUMBER`, nullable) — Units subject to the aged inventory surcharge for the 366-455 day aging bucket.
- `estimated_ais_366_455_days` (`NUMBER`, nullable) — Estimated aged inventory surcharge for units in the 366-455 day aging bucket.
- `quantity_to_be_charged_ais_456_plus_days` (`NUMBER`, nullable) — Units subject to the aged inventory surcharge for the 456+ day aging bucket.
- `estimated_ais_456_plus_days` (`NUMBER`, nullable) — Estimated aged inventory surcharge for units in the 456+ day aging bucket.
- `mfn_listing_exists` (`LOGIC`, nullable) — Whether a merchant-fulfilled listing exists for this SKU.
- `mfn_fulfillable_quantity` (`NUMBER`, nullable) — Units in the merchant-fulfilled (non-FBA) network that are ready for picking and shipping.
- `afn_listing_exists` (`LOGIC`, nullable) — Whether an FBA (Amazon-fulfilled) listing exists for this SKU.
- `afn_warehouse_quantity` (`NUMBER`, nullable) — Units for this SKU in Amazon fulfillment centers, combining fulfillable, unsellable, and reserved quantities.
- `afn_fulfillable_quantity` (`NUMBER`, nullable) — Units for this SKU in Amazon fulfillment centers that are pickable and available to sell.
- `afn_unsellable_quantity` (`NUMBER`, nullable) — Units for this SKU in Amazon fulfillment centers that are damaged or otherwise not sellable.
- `afn_reserved_quantity` (`NUMBER`, nullable) — Units for this SKU in Amazon fulfillment centers reserved for pending orders, inbound transfers, or processing.
- `afn_total_quantity` (`NUMBER`, nullable) — Total units for this SKU across all Amazon fulfillment center statuses.
- `per_unit_volume` (`NUMBER`, nullable) — Volume of a single unit, in cubic feet.
- `afn_inbound_working_quantity` (`NUMBER`, nullable) — Units in an inbound shipment to Amazon that are still being prepared for shipping.
- `afn_inbound_shipped_quantity` (`NUMBER`, nullable) — Units in an inbound shipment to Amazon that have been shipped but not yet received.
- `afn_inbound_receiving_quantity` (`NUMBER`, nullable) — Units in an inbound shipment to Amazon that have arrived and are being checked in.
- `afn_researching_quantity` (`NUMBER`, nullable) — Units at Amazon fulfillment centers under investigation for an inventory discrepancy.
- `afn_reserved_future_supply` (`NUMBER`, nullable) — Units reserved for future customer orders not yet ready to ship.
- `afn_future_supply_buyable` (`NUMBER`, nullable) — Units of future inbound supply that are currently buyable.
- `afn_onhand_buyable_quantity` (`NUMBER`, nullable) — Units in Amazon fulfillment centers that are processed, available, and actively buyable by customers. Distinct from in-transit FC transfer units.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
