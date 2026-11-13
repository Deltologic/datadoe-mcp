# Branded Listing Content Changes

- BigQuery table name: `amazon_notifications_branded_item_content_change`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

Near real-time changes to title, bullet points, description or images for ASINs with an Amazon Brand Registry relationship.

- Source type: `SELLER_CENTRAL`
- Source ID: `aec3d5976911a7a80110c08801a741e4f0a25dd997d639f5d918284d905a4758`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=aec3d5976911a7a80110c08801a741e4f0a25dd997d639f5d918284d905a4758

## Fetch periods

- `CONTINUOUS`

## Data availability

- `REAL_TIME` — SP-API notifications are available within about 2 hours after Amazon publishes them.

## Columns (14)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `sp_api_notification_id` (`TEXT`, required) — Amazon SP-API notification identifier.
- `sp_api_notification_type` (`TEXT`, required) — Notification type. Expected value: BRANDED_ITEM_CONTENT_CHANGE.
- `event_time` (`DATE`, required) — Time when Amazon published the notification (ISO-8601 / UTC).
- `notification_metadata` (`JSON`, required) — Amazon SP-API notification metadata payload.
- `payload` (`JSON`, required) — Raw SP-API notification payload.
- `asin` (`TEXT`, nullable) — ASIN from the notification payload.
- `brand_name` (`TEXT`, nullable) — Brand name from the notification payload.
- `attributes_changed` (`TEXT`, required) — Changed listing attribute names. Empty when Amazon omits AttributesChanged. Known names are item_name, bullet_point, product_description, main_product_image_locator, other_product_image_locator_*, and swatch_product_image_locator. Each value is the name of a changed attribute, not the previous or new listing content. Elements are strings.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
