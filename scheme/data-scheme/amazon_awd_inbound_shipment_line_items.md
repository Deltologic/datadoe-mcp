# AWD Inbound Shipment Line Items

- BigQuery table name: `amazon_awd_inbound_shipment_line_items`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

AWD inbound shipment line items by shipment id and line item number.

- Source type: `SELLER_CENTRAL`
- Source ID: `b7080fc32e526ffca1cb68908342409ce533b6ffd9c4b4bc2807dc56b98ec5a7`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=b7080fc32e526ffca1cb68908342409ce533b6ffd9c4b4bc2807dc56b98ec5a7

## Fetch periods

- `CONTINUOUS`

## Columns (14)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `awd_inbound_shipment_id` (`TEXT`, required)
- `line_item_no` (`NUMBER`, required)
- `sku` (`TEXT`, nullable)
- `expected_quantity` (`JSON`, nullable)
- `received_quantity` (`JSON`, nullable)
- `line_item_data` (`JSON`, nullable, BigQuery only) — available in BigQuery only — cannot be requested in exports / MCP `exports_create`
- `last_seen_at` (`DATE`, required)
- `date` (`DATE`, required) — Date the shipment line item was last seen.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
