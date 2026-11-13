# FBA Removal Shipments

- BigQuery table name: `amazon_fba_removal_shipments`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

FBA removal shipment details linked to removal orders.

- Source type: `SELLER_CENTRAL`
- Source ID: `fd04a82a3af4ab17ca4fb9fd36516f332366f26a385e7af6ecaa38adfb96a337`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=fd04a82a3af4ab17ca4fb9fd36516f332366f26a385e7af6ecaa38adfb96a337

## Fetch periods

- `INITIAL` (730 days)
- `RECURRING_DAILY` (30 days)

## Columns (22)

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
- `fba_removal_order_id` (`TEXT`, required)
- `sku` (`TEXT`, required)
- `fnsku` (`TEXT`, required)
- `fba_removal_shipment_tracking_number` (`TEXT`, nullable)
- `shipment_date` (`DATE`, nullable)
- `request_date` (`DATE`, nullable)
- `removal_shipment_no` (`NUMBER`, nullable)
- `shipped_quantity` (`NUMBER`, nullable)
- `carrier` (`TEXT`, nullable)
- `removal_order_type` (`TEXT`, nullable)
- `disposition` (`TEXT`, nullable)

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
