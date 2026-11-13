# Transaction Update Notifications

- BigQuery table name: `amazon_notifications_transaction_update`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

Near real-time Amazon SP-API TRANSACTION_UPDATE notifications for financial transaction updates.

- Source type: `SELLER_CENTRAL`
- Source ID: `85c2c092ad2a1fdbe670b90e4729c418de0ca89e72019a21d6fc4072d4dba3c0`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=85c2c092ad2a1fdbe670b90e4729c418de0ca89e72019a21d6fc4072d4dba3c0

## Fetch periods

- `CONTINUOUS`

## Data availability

- `REAL_TIME` — SP-API notifications are available within about 2 hours after Amazon publishes them.

## Columns (11)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `sp_api_notification_id` (`TEXT`, required) — Amazon SP-API notification identifier.
- `sp_api_notification_type` (`TEXT`, required) — Notification type. Expected value: TRANSACTION_UPDATE.
- `event_time` (`DATE`, required) — Time when Amazon published the notification (ISO-8601 / UTC).
- `notification_metadata` (`JSON`, required) — Amazon SP-API notification metadata payload.
- `payload` (`JSON`, required) — Raw SP-API notification payload.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
