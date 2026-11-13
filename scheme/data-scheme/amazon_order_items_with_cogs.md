# Order Line Items

- BigQuery table name: `amazon_order_items_with_cogs`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

Order line items from Amazon order reports and recent ORDER_CHANGE updates, one row per order line. Marketplace orders belong to their marketplace connection. Off-Amazon Multi-Channel Fulfillment (MCF) lines belong to the seller account and appear once per account, with regional attribution and null marketplace columns. Exports include them for any selected marketplace of that account; combining separate marketplace exports can count them more than once. sales_channel preserves Amazon's value, such as Non-Amazon. A generic value does not identify an external store, and a missing value does not identify MCF. Off-Amazon item_price_value is a fulfillment or declared amount, not verified external sales revenue. COGS uses the kept connection's uploaded costs. Profit tables and marketplace-filtered app reports omit off-Amazon lines. Initial reports cover 105 weeks of last-update time. Recurring reports re-read 8 days daily and 1 day intraday.

- Source type: `SELLER_CENTRAL`
- Source ID: `89b27535d27c2a94db5ae39af4717f542624ff4df7802fd633e16c78674a1778`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: yes
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=89b27535d27c2a94db5ae39af4717f542624ff4df7802fd633e16c78674a1778

## Fetch periods

- `INITIAL` (730 days)
- `RECURRING_DAILY` (28 days)

## Data availability

- `REAL_TIME` — Orders are available up to 1 hour after being placed. Refresh: 10am, 1pm, 4pm, 7pm.

## Related actions

- `AMAZON_ORDERS_CANCEL` — writes: writes rows to this table
- `AMAZON_ORDERS_CONFIRM_SHIPMENT` — writes: writes rows to this table
- `AMAZON_ORDERS_CREATE_SHIPMENT` — writes: writes rows to this table
- `AMAZON_ORDERS_CANCEL_SHIPMENT` — writes: writes rows to this table
- `AMAZON_ORDERS_GET_SHIPPING_RATES` — live: reads a fresher live value
- `AMAZON_ORDERS_GET_SHIPPING_ADDITIONAL_INPUTS` — live: reads a fresher live value
- `AMAZON_ORDERS_GET_SHIPMENT_DOCS` — live: reads a fresher live value
- `AMAZON_ORDERS_FIND` — live: reads a fresher live value. When a FIND Action's entity is in the DataDoe data scheme, use an Export or a BigQuery query. Use FIND only when you need live Amazon data that the warehouse does not have yet. One standard Export costs 2 AI Tokens. One integrated BigQuery query costs 0.2 AI Tokens. Compare the total cost of repeated FIND Actions with one Export or query.
- `AMAZON_ORDERS_GET_METRICS` — live: reads a fresher live value

actions_details_schema_get reports whether each Action type is enabled for the Organization. An Organization owner enables a type in the DataDoe app under Settings > Actions.

## Search aliases

- orders
- order lines
- line items
- units sold

## Columns (50)

- `date` (`DATE`, required) — Purchase date in the connection country's time zone, including off-Amazon MCF lines.
- `order_purchased_at_utc` (`DATE`, required) — Date and time of purchase in UTC timezone. May be different than the timezone of the marketplace or of the user.
- `marketplace_id` (`TEXT`, nullable) — Amazon provided ID that represents a specific country where the Seller or Vendor operates. Null on regional rows (attribution_method = regional).
- `marketplace_country_code` (`TEXT`, nullable) — ISO country code for the Amazon marketplace. Null on regional rows (attribution_method = regional).
- `marketplace_country_name` (`TEXT`, nullable) — Human-readable country name for the marketplace (derived from marketplace_id). Null on regional rows (attribution_method = regional).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `regional_account_id` (`TEXT`, nullable) — Amazon seller account of the row: <organization_id>:<seller_id>:<region> (NA, EU or FE). One seller account serves all its marketplaces in an SP-API region. Null when the connection has no seller ID.
- `attribution_method` (`TEXT`, required) — How the row was tied to a marketplace. connection: the row belongs to its marketplace connection. order / sales_channel: tied to the marketplace from the order or sales channel. regional: the row belongs to the whole seller account (regional_account_id), not to one marketplace; it appears once per account in exports for any selected marketplace of that account, and marketplace columns are null. Summing separate per-marketplace exports counts regional rows once per export.
- `warehouse_country` (`TEXT`, nullable) — Warehouse or fulfillment center country (ISO code, GB for the United Kingdom) when the report has one. It is not the sales marketplace.
- `source_connection_id` (`TEXT`, required, BigQuery only) — Connection whose order-report copy holds this row. Off-Amazon MCF lines are kept once per seller account, from the latest Amazon update. — available in BigQuery only — cannot be requested in exports / MCP `exports_create`
- `amazon_order_id` (`TEXT`, required)
- `amazon_order_item_id` (`TEXT`, required)
- `child_asin` (`TEXT`, nullable) — May be null for orders placed in the last 4h.
- `sku` (`TEXT`, required)
- `product_name` (`TEXT`, nullable) — May be null for orders placed in the last 4h.
- `line_item_number` (`TEXT`, required)
- `merchant_order_id` (`TEXT`, nullable) — May be null for orders placed in the last 4h.
- `amazon_order_updated_at` (`DATE`, nullable)
- `amazon_order_status` (`TEXT`, required) — Pending/Unshipped/Shipped/Canceled; some Unshipped and Shipped statuses have marketplace specific values which have `Unshipped` or `Shipped` prefix.
- `fulfillment_channel` (`TEXT`, required) — 'Amazon' or 'Merchant'
- `sales_channel` (`TEXT`, nullable) — Sales channel Amazon supplied. Amazon marketplace orders use the marketplace domain, such as Amazon.com. Any other non-empty value, including generic Non-Amazon, is an off-Amazon Multi-Channel Fulfillment line. Amazon does not name the external store. May be null for orders placed in the last 4h.
- `amazon_order_channel` (`TEXT`, required) — Amazon order channel: MOBILEAPP maps from ClientAppOrderChannel, WEBSITE from WebsiteOrderChannel, and OTHER from any other or missing source value. OTHER is a fallback, not a separate marketplace or an off-Amazon sales channel. Use sales_channel to identify where the order was sold.
- `ship_service_level` (`TEXT`, nullable) — May be null for orders placed in the last 4h.
- `item_status` (`TEXT`, nullable) — Unshipped/Shipping/Shipped/Canceled; may be null for orders placed in the last 4h, for such orders amazon_order_status has current status
- `quantity` (`NUMBER`, required) — Units purchased on this order line item.
- `item_price_value` (`NUMBER`, nullable) — Line item price from the order report. Excludes buyer shipping. For an off-Amazon sales channel this is Amazon's reported amount, a fulfillment or declared value, not verified external-channel revenue. May be null for orders placed in the last 4h.
- `item_price_currency` (`TEXT`, nullable) — Currency code. May be null for orders placed in the last 4h.
- `item_tax_value` (`NUMBER`, nullable) — Item tax collected on this line item. Positive number or zero. When the order report omits tax, DataDoe uses the matching Amazon Finances amount only when the order item, currency, quantity, and item total reconcile. May be null for orders placed in the last 4h.
- `item_shipping_price_value` (`NUMBER`, nullable) — Buyer shipping charged on this line item. May be null for orders placed in the last 4h.
- `item_shipping_tax_value` (`NUMBER`, nullable) — Tax on buyer shipping for this line item. When the order report omits tax, DataDoe uses the matching Amazon Finances amount only when the order item, currency, quantity, and shipping total reconcile. May be null for orders placed in the last 4h.
- `promotion_ids` (`TEXT`, nullable) — Promotion identifiers or labels from Amazon's order report, preserved as raw text and potentially containing multiple values. These are not a verified link to amazon_promotions.promotion_id or tracking_id. May be null for orders placed in the last 4h.
- `item_promotion_discount_value` (`NUMBER`, nullable) — Item promotion discount on this order line in item_price_currency, separate from the shipping promotion discount. May be null for orders placed in the last 4h.
- `item_ship_promotion_discount_value` (`NUMBER`, nullable) — Shipping promotion discount on this line item. May be null for orders placed in the last 4h.
- `gift_wrap_price_value` (`NUMBER`, nullable) — May be null for orders placed in the last 4h.
- `gift_wrap_tax_value` (`NUMBER`, nullable) — May be null for orders placed in the last 4h.
- `address_city` (`TEXT`, nullable) — May be null for orders placed in the last 4h.
- `address_state` (`TEXT`, nullable) — May be null for orders placed in the last 4h.
- `address_country` (`TEXT`, nullable) — May be null for orders placed in the last 4h.
- `address_postal_code` (`TEXT`, required)
- `order_is_business` (`LOGIC`, required) — When TRUE, the order is a B2B order. When FALSE, the order is a B2C order.
- `purchase_order_number` (`TEXT`, nullable) — May be null for orders placed in the last 4h.
- `cogs_item_value` (`NUMBER`, nullable) — Item COGS for this order line: unit item cost from amazon_cogs as of the order date, times quantity. — definition: `(amazon_cogs.cost_item_value ?? 0) * (amazon_order_items_with_cogs.quantity ?? 0)`
- `cogs_shipping_value` (`NUMBER`, nullable) — Shipping COGS for this order line: unit shipping cost from amazon_cogs as of the order date, times quantity. — definition: `(amazon_cogs.cost_item_shipping_value ?? 0) * (amazon_order_items_with_cogs.quantity ?? 0)`
- `cogs_total_value` (`NUMBER`, nullable) — Sum of cogs_item_value and cogs_shipping_value. — definition: `((amazon_cogs.cost_item_value ?? 0) + (amazon_cogs.cost_item_shipping_value ?? 0)) * (amazon_order_items_with_cogs.quantity ?? 0)`
- `cogs_present` (`LOGIC`, required) — True when an uploaded COGS record applies to this row. Zero cost can still be valid. To list SKUs sold in the last 30 days without COGS, use GET /api/v1/cogs/missing or the MCP tool cogs_missing_list.
- `cogs_currency` (`TEXT`, nullable) — Currency code for COGS.
- `item_supplier_name` (`TEXT`, nullable) — Supplier name for the item COGS, if provided in COGS upload.
- `order_date` (`DATE`, required) — Duplicate of date column. Prefer to use date column for date filtering.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
