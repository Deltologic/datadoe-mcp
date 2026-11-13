# Cost of Goods Sold (COGS)

- BigQuery table name: `amazon_cogs`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

Your uploaded product cost ledger, maintained by the user. Seller costs are per SKU and ASIN; vendor costs are per account, marketplace, ASIN and effective date with empty SKU. Vendor rows can have optional vendor-code, fulfillment and exact-PO variant keys; an empty set of variant keys is the explicit ASIN default. The full variant key and effective date identify an upsert or edit. Uploaded costs stay separate from Amazon-reported costs. COGS are managed by the user via form in the Sellers & Vendors page. Every 5 days DataDoe checks sellers with at least one COGS row and emails organization owners when SKUs sold in the last 30 days have no COGS. To list SKUs sold in the last 30 days without COGS, use GET /api/v1/cogs/missing or the MCP tool cogs_missing_list.

- Source type: `SELLER_CENTRAL`
- Source ID: `8dd5813be06d8679ce99c1e0b09a998c8332efda20a2abc9eaa8787f81c2a064`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: yes
- Default dataset: yes
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=8dd5813be06d8679ce99c1e0b09a998c8332efda20a2abc9eaa8787f81c2a064

## Search aliases

- landed cost
- product cost

## Columns (16)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `child_asin` (`TEXT`, required)
- `sku` (`TEXT`, required)
- `vendor_code` (`TEXT`, required) — Optional vendor code cost variant. Empty for the ASIN default.
- `fulfillment_method` (`TEXT`, required) — Optional explicit fulfillment cost variant.
- `purchase_order_number` (`TEXT`, required) — Optional exact purchase-order cost override. It requires unambiguous transaction linkage before use in a margin.
- `from` (`DATE`, required)
- `cost_item_value` (`NUMBER`, required)
- `cost_item_shipping_value` (`NUMBER`, required)
- `cost_currency` (`TEXT`, required)
- `item_supplier_name` (`TEXT`, nullable) — Supplier name for the item COGS, if provided in COGS upload.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
