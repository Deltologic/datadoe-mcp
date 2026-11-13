# AWD Outbound Shipment Packages

- BigQuery table name: `amazon_awd_outbound_shipment_packages`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

AWD outbound distribution packages exploded from the order and from each shipment. One row per package configuration. Filter package_source before summing; the same configuration can appear in more than one source array.

- Source type: `SELLER_CENTRAL`
- Source ID: `21f4ad2c83f8adcdeb969dd9bae51fdd1a88f7a34c474f14298d3c09a9814938`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=21f4ad2c83f8adcdeb969dd9bae51fdd1a88f7a34c474f14298d3c09a9814938

## Fetch periods

- `CONTINUOUS`

## Search aliases

- distribution package
- awd carton

## Columns (16)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `awd_outbound_order_id` (`TEXT`, required)
- `awd_outbound_shipment_id` (`TEXT`, required) — Shipment id for shipment_package_quantities. Order-level sources (eligible_packages_to_outbound, packages_to_outbound, shipped_outbound_packages) store __EMPTY__.
- `package_source` (`TEXT`, required) — Which Amazon array this row came from: eligible_packages_to_outbound, packages_to_outbound, shipped_outbound_packages, or shipment_package_quantities. Do not sum count across package_source.
- `line_item_no` (`NUMBER`, required)
- `count` (`NUMBER`, nullable) — Number of cases or pallets with this package configuration. Not the unit quantity. Units per package are in contents.
- `package_type` (`TEXT`, nullable) — Amazon DistributionPackageType: CASE or PALLET. PALLET is in the enum and is not supported.
- `contents` (`JSON`, nullable) — One package configuration. CASE rows use contents.products (sku, quantity, and optional attributes, expiration, and prepDetails). PALLET rows use nested contents.packages, and PALLET is not supported. Total units on a CASE row are count times the sum of contents.products[].quantity.
- `measurements` (`JSON`, nullable) — Weight of one package, plus optional dimensions and volume. Each measure includes its unit. Weight is required by Amazon.
- `line_item_data` (`JSON`, nullable, BigQuery only) — available in BigQuery only — cannot be requested in exports / MCP `exports_create`
- `date` (`DATE`, required) — Created date of the parent record: the outbound order for eligible_packages_to_outbound, packages_to_outbound, and shipped_outbound_packages; the shipment for shipment_package_quantities.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
