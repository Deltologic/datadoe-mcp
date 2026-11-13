# AWD Inbound Shipments

- BigQuery table name: `amazon_awd_inbound_shipments`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

AWD inbound shipments by shipment id.

- Source type: `SELLER_CENTRAL`
- Source ID: `d190d57b0176fb9854685bb58b4cb2ef782c03000eec9d33d773721f74bf8dba`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=d190d57b0176fb9854685bb58b4cb2ef782c03000eec9d33d773721f74bf8dba

## Fetch periods

- `CONTINUOUS`

## Columns (44)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `awd_inbound_shipment_id` (`TEXT`, required)
- `awd_inbound_order_id` (`TEXT`, nullable)
- `external_reference_id` (`TEXT`, nullable)
- `awd_inbound_shipment_status` (`TEXT`, nullable)
- `carrier_code_type` (`TEXT`, nullable)
- `carrier_code_value` (`TEXT`, nullable)
- `awd_inbound_shipment_tracking_id` (`TEXT`, nullable)
- `ship_by` (`DATE`, nullable)
- `destination_region` (`TEXT`, nullable)
- `warehouse_reference_id` (`TEXT`, nullable)
- `shipment_container_quantities` (`JSON`, nullable)
- `received_quantity` (`JSON`, nullable)
- `destination_address_name` (`TEXT`, nullable)
- `destination_address_address_line1` (`TEXT`, nullable)
- `destination_address_address_line2` (`TEXT`, nullable)
- `destination_address_address_line3` (`TEXT`, nullable)
- `destination_address_city` (`TEXT`, nullable)
- `destination_address_county` (`TEXT`, nullable)
- `destination_address_district` (`TEXT`, nullable)
- `destination_address_state_or_region` (`TEXT`, nullable)
- `destination_address_postal_code` (`TEXT`, nullable)
- `destination_address_country_code` (`TEXT`, nullable)
- `destination_address_phone_number` (`TEXT`, nullable)
- `origin_address_name` (`TEXT`, nullable)
- `origin_address_address_line1` (`TEXT`, nullable)
- `origin_address_address_line2` (`TEXT`, nullable)
- `origin_address_address_line3` (`TEXT`, nullable)
- `origin_address_city` (`TEXT`, nullable)
- `origin_address_county` (`TEXT`, nullable)
- `origin_address_district` (`TEXT`, nullable)
- `origin_address_state_or_region` (`TEXT`, nullable)
- `origin_address_postal_code` (`TEXT`, nullable)
- `origin_address_country_code` (`TEXT`, nullable)
- `origin_address_phone_number` (`TEXT`, nullable)
- `created_at` (`DATE`, nullable)
- `updated_at` (`DATE`, nullable)
- `last_seen_at` (`DATE`, required)
- `date` (`DATE`, required) — Date the shipment was created.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
