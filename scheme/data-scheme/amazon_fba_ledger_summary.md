# FBA Ledger Summary

- BigQuery table name: `amazon_fba_ledger_summary`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

Daily FBA ledger summary by fulfillment center. Quantities are signed: receipts and customer returns increase inventory, customer shipments and disposals decrease it. starting_warehouse_balance plus the movement columns equals ending_warehouse_balance for that location. Do not sum locations without grouping by fnsku.

- Source type: `SELLER_CENTRAL`
- Source ID: `829e34f54e72ade58cb032ae2db770cf70c863a5897fefda93c4dbae9bb38ad0`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=829e34f54e72ade58cb032ae2db770cf70c863a5897fefda93c4dbae9bb38ad0

## Fetch periods

- `INITIAL` (540 days)
- `RECURRING_DAILY` (7 days)

## Search aliases

- inventory ledger
- warehouse balance

## Columns (31)

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
- `fnsku` (`TEXT`, required)
- `child_asin` (`TEXT`, required)
- `msku` (`TEXT`, required)
- `title` (`TEXT`, required)
- `disposition` (`TEXT`, required) — DEFECTIVE / SELLABLE / CUSTOMER_DAMAGED
- `starting_warehouse_balance` (`NUMBER`, required)
- `in_transit_between_warehouses` (`NUMBER`, required)
- `receipts` (`NUMBER`, required)
- `customer_shipments` (`NUMBER`, required)
- `customer_returns` (`NUMBER`, required)
- `vendor_returns` (`NUMBER`, required)
- `warehouse_transfer_in_out` (`NUMBER`, required)
- `found` (`NUMBER`, required)
- `lost` (`NUMBER`, required)
- `damaged` (`NUMBER`, required)
- `disposed` (`NUMBER`, required)
- `other_events` (`NUMBER`, required)
- `ending_warehouse_balance` (`NUMBER`, required)
- `unknown_events` (`NUMBER`, required)
- `location` (`TEXT`, required) — Amazon warehouse code.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
