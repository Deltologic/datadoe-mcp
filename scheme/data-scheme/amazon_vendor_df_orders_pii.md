# Vendor Direct Fulfillment Orders PII

- BigQuery table name: `amazon_vendor_df_orders_pii`
- Available in: Vendor Central
- Data scheme index: ../data-scheme.md

Vendor Direct Fulfillment customer and shipping details. One row per purchase order. Join amazon_vendor_df_orders on purchase_order_number. Personal fields, customer notes, gift messages, and customization URLs become NULL after 30 days from the order date. Historical rows, order identifiers, dates, and coarse geography remain available. Restricted and off by default.

- Source type: `VENDOR_CENTRAL`
- Source ID: `792f66c5f986e44bdc7b530f98d1fc3ce3d7c62dcaa8f24b1c028620fdaed265`
- Requires a date period: yes
- Contains PII: yes
- Premium table: yes
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=VENDOR_CENTRAL&table=792f66c5f986e44bdc7b530f98d1fc3ce3d7c62dcaa8f24b1c028620fdaed265

## Fetch periods

- `INITIAL` (30 days)
- `CONTINUOUS`

## Data availability

- `REAL_TIME` — Data is available up to 1 hour after the order is fetched.

## Search aliases

- direct fulfillment pii
- shipping address

## Columns (24)

- `date` (`DATE`, required) — Calendar day of the Direct Fulfillment order date (orderDate).
- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `purchase_order_number` (`TEXT`, required) — Direct Fulfillment purchase order number. Join key to amazon_vendor_df_orders.
- `data_fetched_at` (`DATE`, nullable) — When DataDoe fetched this PII payload.
- `recipient_name` (`TEXT`, nullable)
- `recipient_attention` (`TEXT`, nullable)
- `recipient_address_line1` (`TEXT`, nullable)
- `recipient_address_line2` (`TEXT`, nullable)
- `recipient_address_line3` (`TEXT`, nullable)
- `recipient_city` (`TEXT`, nullable)
- `recipient_county` (`TEXT`, nullable)
- `recipient_district` (`TEXT`, nullable)
- `recipient_state_or_region` (`TEXT`, nullable)
- `recipient_postal_code` (`TEXT`, nullable)
- `recipient_country_code` (`TEXT`, nullable)
- `recipient_phone` (`TEXT`, nullable)
- `message_to_customer` (`TEXT`, nullable)
- `order_items_gift_messages` (`JSON`, nullable) — Gift messages keyed by line item. JSON, not a single string.
- `order_items_customized_urls` (`JSON`, nullable) — Customization URLs keyed by line item. JSON, not a single string.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
