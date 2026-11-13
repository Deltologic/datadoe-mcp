# Order Change Notifications

- BigQuery table name: `amazon_notifications_order_change`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

Near real-time Amazon order change notifications. Includes order status changes, buyer-requested changes, and UK Amazon Autos reservation status.

- Source type: `SELLER_CENTRAL`
- Source ID: `3119e997a14f1392c5e02cec402d98c45ed7c053f27db737bf97cf3f841e19fe`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=3119e997a14f1392c5e02cec402d98c45ed7c053f27db737bf97cf3f841e19fe

## Fetch periods

- `CONTINUOUS`

## Data availability

- `REAL_TIME` — Order change notifications are available shortly after Amazon publishes them.

## Columns (17)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `sp_api_notification_id` (`TEXT`, required) — Amazon SP-API notification identifier.
- `sp_api_notification_type` (`TEXT`, required) — Notification type. Expected value: ORDER_CHANGE.
- `event_time` (`DATE`, required) — Time when Amazon published the notification (ISO-8601 / UTC).
- `amazon_order_id` (`TEXT`, required)
- `order_status` (`TEXT`, nullable) — Current order status. Values: UpComing, Pending, Unshipped, PartiallyShipped, Shipped, Canceled, Unfulfillable, InvoiceUnconfirmed, PendingAvailability. This is not the UK Amazon Autos reservation status.
- `pre_fulfillment_status` (`TEXT`, nullable) — UK Amazon Autos reservation status. Separate from order status and fulfillment status. AWAITING_SELLER_ACTION means the reservation is waiting for the seller. ACKNOWLEDGED means the seller accepted it. REJECTED means the seller rejected it. Empty for other order changes. Use order_change_time_utc to keep the latest status for an order.
- `order_change_type` (`TEXT`, nullable) — Why Amazon sent this order change notification. BuyerRequestedChange means the buyer asked for a change. OrderStatusChange means the order status changed. PreFulfillmentStatusChange means the UK Amazon Autos reservation status changed.
- `order_change_time_utc` (`DATE`, nullable) — UTC time of the change that caused the notification (from order_change_trigger.TimeOfOrderChange).
- `order_purchased_at_utc` (`DATE`, nullable) — UTC purchase timestamp from the notification summary.
- `order_fulfillment_channel` (`TEXT`, nullable) — Fulfillment channel from the notification summary. Enum values: Amazon / Merchant.
- `order_items_raw` (`JSON`, nullable) — Raw order_items payload from the ORDER_CHANGE notification.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
