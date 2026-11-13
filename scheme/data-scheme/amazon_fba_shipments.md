# FBA Shipments

- BigQuery table name: `amazon_fba_shipments`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

Amazon-fulfilled shipment line items with order, item, pricing, and shipping address details. Personal fields, including buyer email, street addresses, postal codes, and tracking numbers, become NULL after 30 days from the shipment date, or the reporting date when the shipment date is unavailable. Historical rows, item and financial details, and city, state, and country remain available.

- Source type: `SELLER_CENTRAL`
- Source ID: `705516b99d12eae4bbe684c371f9408595f6325b5e52ef3ae9c4d293d0da7dad`
- Requires a date period: yes
- Contains PII: yes
- Premium table: yes
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=705516b99d12eae4bbe684c371f9408595f6325b5e52ef3ae9c4d293d0da7dad

## Fetch periods

- `INITIAL` (28 days)
- `RECURRING_DAILY` (21 days)

## Columns (59)

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
- `date` (`DATE`, required)
- `shipment_item_id` (`TEXT`, required)
- `amazon_order_id` (`TEXT`, required)
- `merchant_order_id` (`TEXT`, nullable)
- `shipment_id` (`TEXT`, required)
- `amazon_order_item_id` (`TEXT`, required)
- `merchant_order_item_id` (`TEXT`, nullable)
- `purchase_date` (`DATE`, nullable)
- `payments_date` (`DATE`, nullable)
- `shipment_date` (`DATE`, nullable)
- `reporting_date` (`DATE`, nullable)
- `buyer_email` (`TEXT`, nullable)
- `buyer_name` (`TEXT`, nullable)
- `buyer_phone_number` (`TEXT`, nullable)
- `sku` (`TEXT`, required)
- `product_name` (`TEXT`, required)
- `quantity_shipped` (`NUMBER`, nullable)
- `currency` (`TEXT`, nullable)
- `item_price` (`NUMBER`, nullable)
- `item_tax` (`NUMBER`, nullable)
- `shipping_price` (`NUMBER`, nullable)
- `shipping_tax` (`NUMBER`, nullable)
- `gift_wrap_price` (`NUMBER`, nullable)
- `gift_wrap_tax` (`NUMBER`, nullable)
- `ship_service_level` (`TEXT`, nullable)
- `recipient_name` (`TEXT`, nullable)
- `ship_address_1` (`TEXT`, nullable)
- `ship_address_2` (`TEXT`, nullable)
- `ship_address_3` (`TEXT`, nullable)
- `ship_city` (`TEXT`, nullable)
- `ship_state` (`TEXT`, nullable)
- `ship_postal_code` (`TEXT`, nullable)
- `ship_country` (`TEXT`, nullable)
- `ship_phone_number` (`TEXT`, nullable)
- `bill_address_1` (`TEXT`, nullable)
- `bill_address_2` (`TEXT`, nullable)
- `bill_address_3` (`TEXT`, nullable)
- `bill_city` (`TEXT`, nullable)
- `bill_state` (`TEXT`, nullable)
- `bill_postal_code` (`TEXT`, nullable)
- `bill_country` (`TEXT`, nullable)
- `item_promotion_discount` (`NUMBER`, nullable)
- `ship_promotion_discount` (`NUMBER`, nullable)
- `carrier` (`TEXT`, nullable)
- `fba_shipment_tracking_number` (`TEXT`, nullable)
- `estimated_arrival_date` (`DATE`, nullable)
- `fulfillment_center_id` (`TEXT`, nullable)
- `fulfillment_channel` (`TEXT`, nullable)
- `sales_channel` (`TEXT`, nullable)

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
