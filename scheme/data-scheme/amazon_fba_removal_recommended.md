# FBA Recommended Removals

- BigQuery table name: `amazon_fba_removal_recommended`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

Recommended FBA removal quantities by SKU with sellable and unsellable inventory age buckets.

- Source type: `SELLER_CENTRAL`
- Source ID: `23ed787fe0ac5ce848ae049fdcea14a0dc94d74792aa62ed49afe332ea6ed19e`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=23ed787fe0ac5ce848ae049fdcea14a0dc94d74792aa62ed49afe332ea6ed19e

## Fetch periods

- `INITIAL` (1 days)
- `RECURRING_DAILY` (1 days)

## Columns (23)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `date` (`DATE`, required)
- `snapshot_date` (`DATE`, nullable)
- `sku` (`TEXT`, required)
- `fnsku` (`TEXT`, required)
- `child_asin` (`TEXT`, required)
- `product_name` (`TEXT`, required)
- `condition` (`TEXT`, nullable)
- `sellable_quantity` (`NUMBER`, nullable)
- `sellable_121_180_days` (`NUMBER`, nullable)
- `sellable_181_270_days` (`NUMBER`, nullable)
- `sellable_271_365_days` (`NUMBER`, nullable)
- `sellable_365_plus_days` (`NUMBER`, nullable)
- `sellable_removal_quantity` (`NUMBER`, nullable)
- `unsellable_quantity` (`NUMBER`, nullable)
- `unsellable_0_7_days` (`NUMBER`, nullable)
- `unsellable_8_60_days` (`NUMBER`, nullable)
- `unsellable_61_90_days` (`NUMBER`, nullable)

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
