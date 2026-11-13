# FBA Inbound Shipment Boxes

- BigQuery table name: `amazon_fba_inbound_shipment_boxes`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

Boxes in FBA inbound shipments. Each row is one SKU in one box, with the box size, weight, units in that box, and the Send to Amazon template name when Amazon provides one.

- Source type: `SELLER_CENTRAL`
- Source ID: `04df29e50c6c19254d042f5a2cf35568b5f9ccdd11695b597b9781a8fd29f874`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=04df29e50c6c19254d042f5a2cf35568b5f9ccdd11695b597b9781a8fd29f874

## Fetch periods

- `CONTINUOUS`

## Columns (34)

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
- `inbound_plan_id` (`TEXT`, required)
- `fba_inbound_shipment_id` (`TEXT`, required)
- `package_id` (`TEXT`, required)
- `box_id` (`TEXT`, nullable)
- `box_quantity` (`NUMBER`, nullable) — Number of identical boxes this row stands for. Amazon groups boxes that share the same size, weight, and contents.
- `template_name` (`TEXT`, nullable) — Name of the Send to Amazon box template, when Amazon provides one.
- `content_information_source` (`TEXT`, nullable) — How Amazon received the box contents: BOX_CONTENT_PROVIDED, MANUAL_PROCESS, or BARCODE_2D.
- `length` (`NUMBER`, nullable) — Box length.
- `width` (`NUMBER`, nullable) — Box width.
- `height` (`NUMBER`, nullable) — Box height.
- `dimension_unit` (`TEXT`, nullable) — Unit for length, width, and height: IN or CM.
- `weight` (`NUMBER`, nullable) — Weight of one box.
- `weight_unit` (`TEXT`, nullable) — Unit for weight: LB or KG.
- `seller_sku` (`TEXT`, required)
- `fnsku` (`TEXT`, nullable)
- `child_asin` (`TEXT`, nullable)
- `quantity` (`NUMBER`, nullable) — Units of this SKU in one box.
- `items_in_box` (`NUMBER`, required) — Number of SKUs in the box.
- `is_single_sku_box` (`LOGIC`, required) — True when the box contains one SKU.
- `expiration` (`DATE`, nullable)
- `label_owner` (`TEXT`, nullable)
- `manufacturing_lot_code` (`TEXT`, nullable)
- `prep_instructions` (`JSON`, required)
- `last_seen_at` (`DATE`, required)

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
