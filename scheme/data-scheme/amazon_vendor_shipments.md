# Vendor Shipments

- BigQuery table name: `amazon_vendor_shipments`
- Available in: Vendor Central
- Data scheme index: ../data-scheme.md

WePay/collect Vendor Retail Procurement shipments (submitted or requested for routing; does not include shipments created in Vendor Central). One row per shipment with nested purchase orders, containers, and status details. Amazon does not return shipments created only in Vendor Central (Orders > Shipments / appointments).

- Source type: `VENDOR_CENTRAL`
- Source ID: `01ad15aa5f4d263147296c1eea1d99e68ea655854b60d567423d921ab2875b42`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=VENDOR_CENTRAL&table=01ad15aa5f4d263147296c1eea1d99e68ea655854b60d567423d921ab2875b42

## Fetch periods

- `INITIAL` (30 days)
- `CONTINUOUS`

## Search aliases

- arn
- collect shipment
- wepay

## Columns (34)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `date` (`DATE`, required) — Calendar day used for from/to filtering. Earliest Created status date from shipment_status_details, else earliest status date, else current_shipment_status_date, else last_seen_at. Always populated.
- `vendor_shipment_identifier` (`TEXT`, required) — Vendor's shipment id. Grain of this table.
- `transaction_type` (`TEXT`, nullable) — Amazon transactionType: New or Cancel.
- `buyer_reference_number` (`TEXT`, nullable) — Amazon Reference Number (ARN) when Amazon assigned one.
- `transaction_date` (`DATE`, nullable) — When this shipment transaction was submitted.
- `current_shipment_status` (`TEXT`, nullable) — Amazon currentShipmentStatus: Created, TransportationRequested, CarrierAssigned, or Shipped.
- `current_shipment_status_date` (`DATE`, nullable) — When current_shipment_status was set.
- `shipment_create_date` (`DATE`, nullable)
- `shipment_confirm_date` (`DATE`, nullable)
- `package_label_create_date` (`DATE`, nullable)
- `shipment_freight_term` (`TEXT`, nullable) — Amazon shipmentFreightTerm: Collect (WePay) or Prepaid.
- `selling_party_id` (`TEXT`, nullable) — Vendor party id.
- `ship_from_party_id` (`TEXT`, nullable) — Warehouse party id the vendor ships from.
- `ship_to_party_id` (`TEXT`, nullable) — Amazon fulfillment center this shipment goes to.
- `ship_mode` (`TEXT`, nullable) — How the freight is packed: SmallParcel, LTL, or TL. Not transportation_mode.
- `transportation_mode` (`TEXT`, nullable) — How the freight moves: Road, Air, or Ocean. Not ship_mode.
- `shipped_date` (`DATE`, nullable)
- `estimated_delivery_date` (`DATE`, nullable)
- `shipment_delivery_date` (`DATE`, nullable)
- `bill_of_lading_number` (`TEXT`, nullable)
- `carrier_name` (`TEXT`, nullable)
- `carrier_code` (`TEXT`, nullable)
- `purchase_orders` (`JSON`, nullable) — Purchase orders on this shipment. Nested JSON, not one row per PO.
- `containers` (`JSON`, nullable) — Cartons and container contents. Nested JSON.
- `shipment_measurements` (`JSON`, nullable) — Weight and volume of the shipment. Nested JSON.
- `shipment_status_details` (`JSON`, nullable) — Status history and details. Nested JSON, not only current_shipment_status.
- `import_details` (`JSON`, nullable) — Import details when the shipment is international. Nested JSON.
- `last_seen_at` (`DATE`, required) — Timestamp when DataDoe last received this row from the Vendor API.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
