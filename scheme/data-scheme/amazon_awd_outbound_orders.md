# AWD Outbound Orders

- BigQuery table name: `amazon_awd_outbound_orders`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

AWD outbound orders: inventory leaving AWD for a destination channel, one row per order id. Not amazon_awd_replenishment_orders (AWD to FBA) and not amazon_awd_inbound_shipments. Shipments are amazon_awd_outbound_shipments. Product arrays are separate stages; do not add them.

- Source type: `SELLER_CENTRAL`
- Source ID: `d760539058fdb2a0cb8dd5c4a0eae7f37b88740e0ee42bffa2227bd9f47b4e18`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=d760539058fdb2a0cb8dd5c4a0eae7f37b88740e0ee42bffa2227bd9f47b4e18

## Fetch periods

- `CONTINUOUS`

## Search aliases

- awd outbound
- destination channel

## Columns (17)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `awd_outbound_order_id` (`TEXT`, required)
- `awd_outbound_order_status` (`TEXT`, nullable) — Amazon OutboundStatus: DRAFT, VALIDATING, ELIGIBLE, INELIGIBLE, CONFIRMED, EXECUTING, INVENTORY_OUTBOUND, SUCCESS, or FAILURE. ELIGIBLE is the only status that can be confirmed. Shipments appear at INVENTORY_OUTBOUND. SUCCESS means every shipment was received at the destination channel.
- `awd_outbound_order_confirmed_on` (`DATE`, nullable) — When the outbound order was confirmed. Empty until confirmation. Not the created timestamp.
- `awd_outbound_order_created_at_utc` (`DATE`, nullable)
- `awd_outbound_order_updated_at_utc` (`DATE`, nullable)
- `order_preferences` (`JSON`, nullable) — Array of orderPreference and orderPreferenceValue. The only preference is PARTIAL_ORDER, and its value is SET or UNSET.
- `execution_errors` (`JSON`, nullable) — Validation failures: failureCode, failureReasons (list of strings), and optional sku. Populated when the order failed validation (INELIGIBLE).
- `eligible_products_to_outbound` (`JSON`, nullable) — Each item has sku and quantity, plus optional attributes, expiration, and prepDetails. Amazon marked this list eligible to outbound. Not the requested list and not the shipped list.
- `products_to_outbound` (`JSON`, nullable) — Each item has sku and quantity, plus optional attributes, expiration, and prepDetails. Requested to outbound. Not eligible_products_to_outbound and not shipped_outbound_products.
- `shipped_outbound_products` (`JSON`, nullable) — Each item has sku and quantity, plus optional attributes, expiration, and prepDetails. Shipped after confirmation, once execution has completed. Not the requested quantity.
- `date` (`DATE`, required) — Date the outbound order was created.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
