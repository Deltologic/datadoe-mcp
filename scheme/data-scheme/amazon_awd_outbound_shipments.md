# AWD Outbound Shipments

- BigQuery table name: `amazon_awd_outbound_shipments`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

AWD outbound shipments for an amazon_awd_outbound_orders row, with origin and destination addresses. One row per shipment id. Quantities on this row are this shipment only.

- Source type: `SELLER_CENTRAL`
- Source ID: `a0dfe9c7223026550b6aac49db39f93a611f80ec787cc738558ffc991195b0a5`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=a0dfe9c7223026550b6aac49db39f93a611f80ec787cc738558ffc991195b0a5

## Fetch periods

- `CONTINUOUS`

## Search aliases

- awd outbound shipment

## Columns (35)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `awd_outbound_shipment_id` (`TEXT`, required)
- `awd_outbound_order_id` (`TEXT`, nullable) — Parent AWD outbound order. Join key to amazon_awd_outbound_orders.
- `awd_outbound_shipment_status` (`TEXT`, nullable) — Amazon OutboundShipmentStatus: CREATED, IN_TRANSIT, DELIVERED, RECEIVING, RECEIVED, CLOSED, CANCELLED, or FAILED. DELIVERED means the carrier reported arrival and the destination has not acknowledged it. RECEIVING means the destination acknowledged arrival. CLOSED, CANCELLED, and FAILED are final.
- `shipment_product_quantities` (`JSON`, nullable) — Each item has sku and quantity, plus optional attributes, expiration, and prepDetails, for this shipment. Not the order-level products_to_outbound list.
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
- `awd_outbound_shipment_created_at_utc` (`DATE`, nullable)
- `awd_outbound_shipment_updated_at_utc` (`DATE`, nullable)
- `date` (`DATE`, required) — Date the outbound shipment was created.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
