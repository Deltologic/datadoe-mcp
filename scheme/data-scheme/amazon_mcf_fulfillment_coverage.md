# MCF Fulfillment Coverage

- BigQuery table name: `amazon_mcf_fulfillment_coverage`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

Confirmed Multi-Channel Fulfillment (MCF) units Amazon reported as shipped. One row is one shipment item on the latest SHIPMENT_STATUS_CHANGED notification whose shipment status is SHIPPED. Rows appear only after this table, or MCF Fulfillment Order Status Notifications, is enabled. Shipments reported before the first stored notification are absent. A row does not show the full life of an order that started earlier. This is not profit, margin, or return on investment (ROI). External store sales, shipping income, discounts, tax, and refunds are unavailable, not zero. Uploaded product cost is unavailable because the seller fulfillment order id is not linked to a purchase date. Amazon fees are omitted and may already be inside Profit by Date and Profit by SKU and Date, so do not add those tables to this one. An omitted cost is not zero. Uploaded shipping cost, shared Fulfillment by Amazon (FBA) storage, and inbound costs are excluded. A physical return does not change these units. A repeated notification does not add the same shipment item. A later notification replaces the earlier one. Package delivery events are not extra shipments. Declared order amounts are not sales.

- Source type: `SELLER_CENTRAL`
- Source ID: `be0983f979d7657c00f5b0b9d8db6c152625cb89eeba95578ad2b11edcead596`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=be0983f979d7657c00f5b0b9d8db6c152625cb89eeba95578ad2b11edcead596

## Fetch periods

- `CONTINUOUS`

## Data availability

- `REAL_TIME` — SP-API notifications are available within about 2 hours after Amazon publishes them.

## Prerequisites

Seller Central only, for Amazon Multi-Channel Fulfillment in North America, Europe, and the Far East. Enable this table to collect FULFILLMENT_ORDER_STATUS notifications from that point forward. A seller without the Amazon Fulfillment role cannot subscribe. There is no historical backfill.

## Search aliases

- mcf
- multi-channel fulfillment
- fulfillment coverage
- shipped units

## Columns (29)

- `marketplace_id` (`TEXT`, nullable) — Always empty. The notification belongs to the seller account. It does not name an Amazon marketplace or the external store.
- `marketplace_country_code` (`TEXT`, nullable) — Always empty. See marketplace_id.
- `marketplace_country_name` (`TEXT`, nullable) — Always empty. See marketplace_id.
- `seller_or_vendor_id` (`TEXT`, nullable) — DataDoe seller context that received the notification.
- `seller_or_vendor_name` (`TEXT`, nullable) — Display name of the seller context. Group by seller_or_vendor_id.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon seller id from the connection that stored the notification.
- `date` (`DATE`, required) — Coordinated Universal Time (UTC) calendar day of event_time. Use it for from and to filters. It is not the purchase date and not a confirmed carrier ship date.
- `fulfillment_order_id` (`TEXT`, required) — Seller fulfillment order id from the notification. The seller assigned this id. It is not an Amazon marketplace order id and it is not verified store revenue.
- `amazon_shipment_id` (`TEXT`, required) — Amazon shipment id on the kept snapshot.
- `shipment_item_id` (`TEXT`, required) — Amazon shipment item id. The same line can ship in more than one shipment item. Items without this id are omitted.
- `line_item_id` (`TEXT`, nullable) — Seller line id when Amazon sends it.
- `package_id` (`TEXT`, nullable) — Package id Amazon attached to the shipment item, when present.
- `sku` (`TEXT`, nullable) — Amazon SKU on the shipment item, when Amazon sends it.
- `facility_id` (`TEXT`, nullable) — Amazon facility id on the shipment, when Amazon sends it.
- `shipped_quantity` (`NUMBER`, required) — Units on this shipment item in the latest shipped snapshot, in EACHES. Repeated notifications are not added. A later snapshot replaces the quantity.
- `event_time` (`DATE`, required) — Amazon event time of the shipment-status notification kept for this shipment. This is not the purchase date and not a confirmed carrier ship date.
- `coverage_started_at` (`DATE`, required) — Earliest FULFILLMENT_ORDER_STATUS notification stored for this seller. Shipments before this time are absent.
- `sp_api_notification_id` (`TEXT`, required) — Amazon notification id of the snapshot kept for this shipment.
- `source_event_type` (`TEXT`, required) — Always SHIPMENT_STATUS_CHANGED. Package status events are not counted as additional shipments.
- `shipment_status` (`TEXT`, required) — Always SHIPPED. A later snapshot that is not shipped removes the shipment from this table.
- `product_cost_value` (`NUMBER`, nullable) — Always empty. Uploaded product cost is not applied, because this order is not linked to a purchase date. Empty is not a zero cost.
- `product_cost_currency` (`TEXT`, nullable) — Always empty. Currencies are not converted, and no cost amount is published.
- `external_revenue_status` (`TEXT`, required) — Always unavailable. External store sales, shipping income, discounts, tax, and refunds are not imported. Unavailable is not zero.
- `product_cost_status` (`TEXT`, required) — Always unavailable. See product_cost_value.
- `amazon_fee_status` (`TEXT`, required) — Always omitted. Amazon fee debits and credits are not matched to this row. Omitted is not zero. Fees that already sit in account profit are not repeated here.
- `uploaded_shipping_cost_status` (`TEXT`, required) — Always omitted. Uploaded shipping cost is not included. It is separate from Amazon outbound delivery fees.
- `shared_storage_and_inbound_status` (`TEXT`, required) — Always excluded. Shared Fulfillment by Amazon (FBA) storage and inbound costs stay in account profit and are not allocated to these units.
- `returns_and_refunds_status` (`TEXT`, required) — Always deferred. A physical return or an Amazon fee credit does not change shipped units or create a refund amount.
- `profit_status` (`TEXT`, required) — Always unavailable. Profit, margin, and ROI are not calculated.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
