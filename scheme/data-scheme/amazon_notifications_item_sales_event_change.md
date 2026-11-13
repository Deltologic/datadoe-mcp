# Item Sales Event Change Notifications

- BigQuery table name: `amazon_notifications_item_sales_event_change`
- Available in: Seller Central, Vendor Central
- Data scheme index: ../data-scheme.md

This table exists in 2 source types. Each section below describes one of them.

## Seller Central

Near real-time Amazon SP-API ITEM_SALES_EVENT_CHANGE notifications for item sales event changes.

- Source type: `SELLER_CENTRAL`
- Source ID: `beccb6e0943f1044e2742864470769d8770186196fcd4f434c6d50e898ba2645`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=beccb6e0943f1044e2742864470769d8770186196fcd4f434c6d50e898ba2645

### Fetch periods

- `CONTINUOUS`

### Data availability

- `REAL_TIME` — SP-API notifications are available within about 2 hours after Amazon publishes them.

### Columns (11)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `sp_api_notification_id` (`TEXT`, required) — Amazon SP-API notification identifier.
- `sp_api_notification_type` (`TEXT`, required) — Notification type. Expected value: ITEM_SALES_EVENT_CHANGE.
- `event_time` (`DATE`, required) — Time when Amazon published the notification (ISO-8601 / UTC).
- `notification_metadata` (`JSON`, required) — Amazon SP-API notification metadata payload.
- `payload` (`JSON`, required) — Raw SP-API notification payload.

## Vendor Central

Near real-time Amazon SP-API ITEM_SALES_EVENT_CHANGE notifications for item sales event changes.

- Source type: `VENDOR_CENTRAL`
- Source ID: `beccb6e0943f1044e2742864470769d8770186196fcd4f434c6d50e898ba2645`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=VENDOR_CENTRAL&table=beccb6e0943f1044e2742864470769d8770186196fcd4f434c6d50e898ba2645

### Fetch periods

- `CONTINUOUS`

### Data availability

- `REAL_TIME` — SP-API notifications are available within about 2 hours after Amazon publishes them.

### Columns (11)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `sp_api_notification_id` (`TEXT`, required) — Amazon SP-API notification identifier.
- `sp_api_notification_type` (`TEXT`, required) — Notification type. Expected value: ITEM_SALES_EVENT_CHANGE.
- `event_time` (`DATE`, required) — Time when Amazon published the notification (ISO-8601 / UTC).
- `notification_metadata` (`JSON`, required) — Amazon SP-API notification metadata payload.
- `payload` (`JSON`, required) — Raw SP-API notification payload.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
