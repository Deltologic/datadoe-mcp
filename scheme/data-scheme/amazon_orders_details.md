# Order Details PII

- BigQuery table name: `amazon_orders_details`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

Order-level customer and shipping details that extend `amazon_order_items_with_cogs`, including shipping and delivery deadlines when Amazon provides them. Personal fields become NULL after 30 days from the purchase date. Historical rows, order identifiers, dates, and coarse geography remain available.

- Source type: `SELLER_CENTRAL`
- Source ID: `88e554542fab92541ca2423f3a230813ad57bb3e156207038fb3f7169b9e879d`
- Requires a date period: yes
- Contains PII: yes
- Premium table: yes
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=88e554542fab92541ca2423f3a230813ad57bb3e156207038fb3f7169b9e879d

## Fetch periods

- `CONTINUOUS`

## Data availability

- `REAL_TIME` — Data is available up to 1 hour after the order is fetched.

## Columns (31)

- `date` (`DATE`, required)
- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_order_id` (`TEXT`, required)
- `latest_ship_date` (`DATE`, nullable) — Latest date and time in UTC by which the seller must ship the order. NULL when Amazon does not provide the deadline or the order has not been fetched with deadline support.
- `latest_delivery_date` (`DATE`, nullable) — Latest date and time in UTC by which the order must be delivered. NULL when Amazon does not provide the deadline or the order has not been fetched with deadline support.
- `buyer_email` (`TEXT`, nullable) — DataDoe stores the anonymized buyer email Amazon returns for up to 30 days from the purchase date. The value is NULL for Fulfillment by Amazon (FBA) orders. Amazon does not document this value as identifying the same buyer across orders.
- `buyer_name` (`TEXT`, nullable)
- `buyer_company_name` (`TEXT`, nullable)
- `buyer_purchase_order_number` (`TEXT`, nullable)
- `recipient_name` (`TEXT`, nullable)
- `recipient_company_name` (`TEXT`, nullable)
- `recipient_address_line1` (`TEXT`, nullable)
- `recipient_address_line2` (`TEXT`, nullable)
- `recipient_address_line3` (`TEXT`, nullable)
- `recipient_city` (`TEXT`, nullable)
- `recipient_district_or_county` (`TEXT`, nullable)
- `recipient_state_or_region` (`TEXT`, nullable)
- `recipient_municipality` (`TEXT`, nullable)
- `recipient_postal_code` (`TEXT`, nullable)
- `recipient_country_code` (`TEXT`, nullable)
- `recipient_phone` (`TEXT`, nullable)
- `recipient_address_type` (`TEXT`, nullable)
- `recipient_extended_fields` (`JSON`, nullable)
- `order_items_gift_messages` (`JSON`, nullable)
- `order_items_customized_urls` (`JSON`, nullable)
- `order_date` (`DATE`, required) — Duplicate of date column. Prefer to use date column for date filtering.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
