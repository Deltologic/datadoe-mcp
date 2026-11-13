# Vendor Codes

- BigQuery table name: `amazon_vendor_codes`
- Available in: Vendor Central
- Data scheme index: ../data-scheme.md

Vendor codes assigned by Amazon, uploaded per ASIN or SKU. Each row has exactly one of child_asin or sku set. ASIN-based sales tables prefer an explicit ASIN upload and can resolve SKU uploads through an unambiguous Vendor Listings mapping. Every 5 days DataDoe checks vendors with at least one vendor code row and emails organization owners when ASINs sold in the last 30 days have no vendor code. To list ASINs sold in the last 30 days without a vendor code, use GET /api/v1/vendor-codes/missing or the MCP tool vendor_codes_missing_list.

- Source type: `VENDOR_CENTRAL`
- Source ID: `bf46cebb6096ccea5e10bf9348a70f5fe0c9d9fb4544b7e92f2dddb4924d9645`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: yes
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=VENDOR_CENTRAL&table=bf46cebb6096ccea5e10bf9348a70f5fe0c9d9fb4544b7e92f2dddb4924d9645

## Search aliases

- vendor code
- asin vendor code

## Columns (9)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `child_asin` (`TEXT`, nullable) — Child ASIN this vendor code was uploaded for. Exactly one of child_asin or sku is set.
- `sku` (`TEXT`, nullable) — SKU this vendor code was uploaded for. Exactly one of child_asin or sku is set.
- `vendor_code` (`TEXT`, required) — Vendor code assigned by Amazon for this ASIN or SKU.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
