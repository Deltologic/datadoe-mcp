# Vendor Purchase Order Status

- BigQuery table name: `amazon_vendor_purchase_orders_status`
- Available in: Vendor Central
- Data scheme index: ../data-scheme.md

Vendor Retail Procurement purchase order item status (getPurchaseOrdersStatus). One row per line item, same grain as amazon_vendor_purchase_orders (purchase_order_number and item_sequence_number). Holds vendor acknowledgement and Amazon fulfillment-center receiving. ordered_quantity is Amazon-to-vendor PO quantity, not customer retail demand (manufacturing_retail_ordered_units). Rows appear after the matching purchase order is synced.

- Source type: `VENDOR_CENTRAL`
- Source ID: `0da50243561a87284b103b3a527f88eed9048e306c86ed6a0114933717af9ad7`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=VENDOR_CENTRAL&table=0da50243561a87284b103b3a527f88eed9048e306c86ed6a0114933717af9ad7

## Fetch periods

- `INITIAL` (30 days)
- `CONTINUOUS`

## Search aliases

- po status
- received quantity
- acknowledgement

## Columns (39)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `date` (`DATE`, nullable) — Calendar day of purchase_order_date. Use for date filtering.
- `purchase_order_number` (`TEXT`, required) — Amazon Retail Procurement purchase order number. Join amazon_vendor_purchase_orders on purchase_order_number and item_sequence_number.
- `item_sequence_number` (`TEXT`, required) — Line number within the purchase order. The first line is 1. Grain key with purchase_order_number.
- `purchase_order_status` (`TEXT`, nullable) — Amazon purchaseOrderStatus: OPEN (Amazon has not received every unit) or CLOSED (Amazon has received every unit). Not purchase_order_state on amazon_vendor_purchase_orders.
- `purchase_order_date` (`DATE`, nullable) — When Amazon placed the purchase order.
- `last_updated_date` (`DATE`, nullable) — When Amazon last updated this purchase order status.
- `selling_party_id` (`TEXT`, nullable) — Vendor party id.
- `ship_to_party_id` (`TEXT`, nullable) — Amazon fulfillment center the vendor ships to.
- `asin` (`TEXT`, nullable) — Buyer product identifier (ASIN).
- `vendor_code` (`TEXT`, nullable) — Vendor code uploaded by ASIN for this Vendor connection. This table matches vendor codes by ASIN only. SKU-only uploads do not match. Uploads label existing rows and do not identify stock location. To list ASINs sold in the last 30 days without a vendor code, use GET /api/v1/vendor-codes/missing or the MCP tool vendor_codes_missing_list.
- `vendor_product_identifier` (`TEXT`, nullable) — Vendor-selected product identifier for the line.
- `net_cost_amount` (`NUMBER`, nullable) — Net cost Amazon pays the vendor per each or weight unit. Not list_price_amount.
- `net_cost_currency` (`TEXT`, nullable)
- `list_price_amount` (`NUMBER`, nullable) — List price per each or weight unit. Not the net cost Amazon pays.
- `list_price_currency` (`TEXT`, nullable)
- `ordered_quantity` (`NUMBER`, nullable) — Quantity Amazon ordered from the vendor on this line. Not customer retail demand; that is manufacturing_retail_ordered_units. Read with ordered_quantity_unit_of_measure (often Cases) and ordered_quantity_unit_size. Not received_quantity.
- `ordered_quantity_unit_of_measure` (`TEXT`, nullable) — Unit of measure for ordered_quantity, such as Cases or Eaches. Do not sum Cases with customer-ordered units.
- `ordered_quantity_unit_size` (`NUMBER`, nullable) — Case size when ordered_quantity_unit_of_measure is Cases.
- `ordered_quantity_details` (`JSON`, nullable) — History of ordered and cancelled quantity for this line. Nested JSON, not the current ordered_quantity.
- `confirmation_status` (`TEXT`, nullable) — Vendor acknowledgement confirmationStatus: ACCEPTED, PARTIALLY_ACCEPTED, REJECTED, or UNCONFIRMED. Not purchase_order_status.
- `accepted_quantity` (`NUMBER`, nullable) — Quantity the vendor accepted to ship. Read with accepted_quantity_unit_of_measure. Not ordered_quantity or received_quantity.
- `accepted_quantity_unit_of_measure` (`TEXT`, nullable) — Unit of measure for accepted_quantity, such as Cases or Eaches.
- `accepted_quantity_unit_size` (`NUMBER`, nullable) — Case size when accepted_quantity_unit_of_measure is Cases.
- `rejected_quantity` (`NUMBER`, nullable) — Quantity the vendor rejected. Read with rejected_quantity_unit_of_measure.
- `rejected_quantity_unit_of_measure` (`TEXT`, nullable) — Unit of measure for rejected_quantity, such as Cases or Eaches.
- `rejected_quantity_unit_size` (`NUMBER`, nullable) — Case size when rejected_quantity_unit_of_measure is Cases.
- `acknowledgement_status_details` (`JSON`, nullable) — History of confirmed quantity for this line. Nested JSON, not only confirmation_status.
- `receive_status` (`TEXT`, nullable) — Amazon fulfillment-center receiveStatus: NOT_RECEIVED, PARTIALLY_RECEIVED, or RECEIVED.
- `received_quantity` (`NUMBER`, nullable) — Total quantity the Amazon fulfillment center has received so far. Read with received_quantity_unit_of_measure. Not ordered_quantity, accepted_quantity, or Retail Analytics net_received_inventory_units.
- `received_quantity_unit_of_measure` (`TEXT`, nullable) — Unit of measure for received_quantity, such as Cases or Eaches.
- `received_quantity_unit_size` (`NUMBER`, nullable) — Case size when received_quantity_unit_of_measure is Cases.
- `last_receive_date` (`DATE`, nullable) — When the Amazon fulfillment center last received units for this line.
- `last_seen_at` (`DATE`, required) — Timestamp when DataDoe last received this row from the Vendor API.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
