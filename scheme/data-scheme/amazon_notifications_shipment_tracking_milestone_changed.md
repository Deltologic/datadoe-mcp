# Shipment Tracking Milestone Changed Notifications

- BigQuery table name: `amazon_notifications_shipment_tracking_milestone_changed`
- Available in: Seller Central, Vendor Central
- Data scheme index: ../data-scheme.md

This table exists in 2 source types. Each section below describes one of them.

## Seller Central

Near real-time Amazon SP-API SHIPMENT_TRACKING_MILESTONE_CHANGED notifications for Amazon Tracking API shipment milestone updates.

- Source type: `SELLER_CENTRAL`
- Source ID: `7b2b86a4e0742970ee831e78341826ea29b351b91ee0ba88b2f86fbb7a9c27cf`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=7b2b86a4e0742970ee831e78341826ea29b351b91ee0ba88b2f86fbb7a9c27cf

### Fetch periods

- `CONTINUOUS`

### Data availability

- `REAL_TIME` — SP-API notifications are available within about 2 hours after Amazon publishes them.

### Prerequisites

Amazon requires a subscription for each tracking identifier (US Tracking API). Use the AMAZON_SHIPMENT_TRACKING_SUBSCRIBE Action to send tracking IDs. DataDoe does not subscribe automatically.

### Related actions

- `AMAZON_SHIPMENT_TRACKING_SUBSCRIBE` — prerequisite: must run before rows appear

actions_details_schema_get reports whether each Action type is enabled for the Organization. An Organization owner enables a type in the DataDoe app under Settings > Actions.

### Columns (11)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `sp_api_notification_id` (`TEXT`, required) — Amazon SP-API notification identifier.
- `sp_api_notification_type` (`TEXT`, required) — Notification type. Expected value: SHIPMENT_TRACKING_MILESTONE_CHANGED.
- `event_time` (`DATE`, required) — Time when Amazon published the notification (ISO-8601 / UTC).
- `notification_metadata` (`JSON`, required) — Amazon SP-API notification metadata payload.
- `payload` (`JSON`, required) — Raw SP-API notification payload.

## Vendor Central

Near real-time Amazon SP-API SHIPMENT_TRACKING_MILESTONE_CHANGED notifications for Amazon Tracking API shipment milestone updates.

- Source type: `VENDOR_CENTRAL`
- Source ID: `7b2b86a4e0742970ee831e78341826ea29b351b91ee0ba88b2f86fbb7a9c27cf`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=VENDOR_CENTRAL&table=7b2b86a4e0742970ee831e78341826ea29b351b91ee0ba88b2f86fbb7a9c27cf

### Fetch periods

- `CONTINUOUS`

### Data availability

- `REAL_TIME` — SP-API notifications are available within about 2 hours after Amazon publishes them.

### Prerequisites

Amazon requires a subscription for each tracking identifier (US Tracking API). Use the AMAZON_SHIPMENT_TRACKING_SUBSCRIBE Action to send tracking IDs. DataDoe does not subscribe automatically.

### Related actions

- `AMAZON_SHIPMENT_TRACKING_SUBSCRIBE` — prerequisite: must run before rows appear

actions_details_schema_get reports whether each Action type is enabled for the Organization. An Organization owner enables a type in the DataDoe app under Settings > Actions.

### Columns (11)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `sp_api_notification_id` (`TEXT`, required) — Amazon SP-API notification identifier.
- `sp_api_notification_type` (`TEXT`, required) — Notification type. Expected value: SHIPMENT_TRACKING_MILESTONE_CHANGED.
- `event_time` (`DATE`, required) — Time when Amazon published the notification (ISO-8601 / UTC).
- `notification_metadata` (`JSON`, required) — Amazon SP-API notification metadata payload.
- `payload` (`JSON`, required) — Raw SP-API notification payload.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
