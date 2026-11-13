# FBA Inbound Shipments

- BigQuery table name: `amazon_fba_inbound_shipments`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

FBA inbound shipment line items from inbound plans with shipment status, destination and source addresses, carrier and tracking details, and plan metadata. quantity is the planned unit count. quantity_shipped, quantity_received, quantity_in_case, and release_date are filled when Amazon reports them.

- Source type: `SELLER_CENTRAL`
- Source ID: `8bc6f4bd0931e728b80b9d18abd92bbc7dfe2aeb3c05f290c731d9fb195db3bf`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=8bc6f4bd0931e728b80b9d18abd92bbc7dfe2aeb3c05f290c731d9fb195db3bf

## Fetch periods

- `CONTINUOUS`

## Related actions

- `AMAZON_FBA_INBOUND_PLANS_FIND` — live: reads a fresher live value. When a FIND Action's entity is in the DataDoe data scheme, use an Export or a BigQuery query. Use FIND only when you need live Amazon data that the warehouse does not have yet. One standard Export costs 2 AI Tokens. One integrated BigQuery query costs 0.2 AI Tokens. Compare the total cost of repeated FIND Actions with one Export or query.
- `AMAZON_FBA_INBOUND_PLANS_GET` — live: reads a fresher live value
- `AMAZON_FBA_INBOUND_SHIPMENTS_GET` — live: reads a fresher live value
- `AMAZON_FBA_INBOUND_LEGACY_SHIPMENT_ITEMS_GET` — live: reads a fresher live value

actions_details_schema_get reports whether each Action type is enabled for the Organization. An Organization owner enables a type in the DataDoe app under Settings > Actions.

## Columns (67)

- `marketplace_id` (`TEXT`, nullable) — Amazon provided ID that represents a specific country where the Seller or Vendor operates. Null on regional rows (attribution_method = regional).
- `marketplace_country_code` (`TEXT`, nullable) — ISO country code for the Amazon marketplace. Null on regional rows (attribution_method = regional).
- `marketplace_country_name` (`TEXT`, nullable) — Human-readable country name for the marketplace (derived from marketplace_id). Null on regional rows (attribution_method = regional).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `regional_account_id` (`TEXT`, nullable) — Amazon seller account of the row: <organization_id>:<seller_id>:<region> (NA, EU or FE). One seller account serves all its marketplaces in an SP-API region. Null when the connection has no seller ID.
- `attribution_method` (`TEXT`, required) — How the row was tied to a marketplace. connection: the row belongs to its marketplace connection. order / sales_channel: tied to the marketplace from the order or sales channel. regional: the row belongs to the whole seller account (regional_account_id), not to one marketplace; it appears once per account in exports for any selected marketplace of that account, and marketplace columns are null. Summing separate per-marketplace exports counts regional rows once per export.
- `warehouse_country` (`TEXT`, nullable) — Warehouse or fulfillment center country (ISO code, GB for the United Kingdom) when the report has one. It is not the sales marketplace.
- `source_connection_id` (`TEXT`, required, BigQuery only) — Connection whose report copy holds the row. Every marketplace connection of a seller account downloads the same regional report; one copy is shown per account. — available in BigQuery only — cannot be requested in exports / MCP `exports_create`
- `inbound_plan_id` (`TEXT`, required)
- `fba_inbound_shipment_id` (`TEXT`, required)
- `seller_sku` (`TEXT`, required)
- `fnsku` (`TEXT`, required)
- `child_asin` (`TEXT`, required)
- `quantity` (`NUMBER`, required) — Planned units for this shipment and seller SKU. This is not the number of units Amazon has received.
- `quantity_shipped` (`NUMBER`, nullable) — Units Amazon reports shipped for this shipment and seller SKU. Empty until Amazon supplies the field. Distinct from planned quantity.
- `quantity_received` (`NUMBER`, nullable) — Cumulative units Amazon reports as received for this shipment and seller SKU. This can be higher than quantity. Zero means Amazon reported zero. Empty means Amazon did not send the field.
- `quantity_in_case` (`NUMBER`, nullable) — Units in each case. This is not the number of cases or the shipment total. Zero means Amazon reported zero. Empty means Amazon did not send the field.
- `release_date` (`DATE`, nullable) — Date a preorder item becomes available for sale. This is not the shipment, receipt, delivery, or expiration date. Empty means Amazon did not send the field.
- `expiration` (`DATE`, nullable)
- `label_owner` (`TEXT`, required)
- `manufacturing_lot_code` (`TEXT`, nullable)
- `prep_instructions` (`JSON`, required)
- `shipment_name` (`TEXT`, nullable)
- `fba_inbound_shipment_status` (`TEXT`, required)
- `shipment_confirmation_id` (`TEXT`, nullable)
- `amazon_reference_id` (`TEXT`, nullable)
- `destination_warehouse_id` (`TEXT`, nullable)
- `destination_type` (`TEXT`, nullable)
- `destination_address_name` (`TEXT`, nullable)
- `destination_address_address_line1` (`TEXT`, nullable)
- `destination_address_address_line2` (`TEXT`, nullable)
- `destination_address_city` (`TEXT`, nullable)
- `destination_address_company_name` (`TEXT`, nullable)
- `destination_address_country_code` (`TEXT`, nullable)
- `destination_address_district_or_county` (`TEXT`, nullable)
- `destination_address_email` (`TEXT`, nullable)
- `destination_address_phone_number` (`TEXT`, nullable)
- `destination_address_postal_code` (`TEXT`, nullable)
- `destination_address_state_or_province_code` (`TEXT`, nullable)
- `source_address_name` (`TEXT`, nullable)
- `source_address_address_line1` (`TEXT`, nullable)
- `source_address_address_line2` (`TEXT`, nullable)
- `source_address_city` (`TEXT`, nullable)
- `source_address_company_name` (`TEXT`, nullable)
- `source_address_country_code` (`TEXT`, nullable)
- `source_address_district_or_county` (`TEXT`, nullable)
- `source_address_email` (`TEXT`, nullable)
- `source_address_phone_number` (`TEXT`, nullable)
- `source_address_postal_code` (`TEXT`, nullable)
- `source_address_state_or_province_code` (`TEXT`, nullable)
- `ready_to_ship_window_start` (`DATE`, nullable)
- `ready_to_ship_window_end` (`DATE`, nullable)
- `selected_delivery_window_start` (`DATE`, nullable)
- `selected_delivery_window_end` (`DATE`, nullable)
- `placement_option_id` (`TEXT`, nullable)
- `carrier_name` (`TEXT`, nullable) — Name of the selected transportation carrier. Amazon may return Other when the seller uses their own carrier.
- `shipping_mode` (`TEXT`, nullable) — Selected transportation mode, such as GROUND_SMALL_PARCEL, FREIGHT_LTL, or FREIGHT_FTL_PALLET.
- `spd_tracking_items` (`JSON`, nullable) — Small-parcel boxes. Each item has box_id, tracking_id, and tracking_number_validation_status (VALIDATED, NOT_VALIDATED, or NOT_SUPPORTED). Repeated on every product row for the shipment.
- `bill_of_lading_number` (`TEXT`, nullable) — Less-than-truckload bill of lading number, when Amazon provides one.
- `freight_bill_numbers` (`JSON`, nullable) — Less-than-truckload freight bill (PRO) numbers. A JSON array of strings, repeated on every product row for the shipment.
- `plan_name` (`TEXT`, nullable)
- `plan_status` (`TEXT`, nullable)
- `plan_created_at` (`DATE`, nullable)
- `plan_last_updated_at` (`DATE`, nullable)
- `last_seen_at` (`DATE`, required)

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
