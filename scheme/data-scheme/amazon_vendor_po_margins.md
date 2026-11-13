# Vendor PO margins

- BigQuery table name: `amazon_vendor_po_margins`
- Available in: Vendor Central
- Data scheme index: ../data-scheme.md

DataDoe projected product margins, one row per scoped PO and source. Regular and Direct Fulfillment orders remain separate. Costs use the PO date and validated item units; cancelled orders and incomplete lines have no active margin. Your uploaded product cost remains separate from Amazon-reported costs. Not invoiced revenue, cash or complete net profit.

- Source type: `VENDOR_CENTRAL`
- Source ID: `9847d8eaf96a6c44fe7c174ec787e09862ed875b844a77d648028765432c0f60`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=VENDOR_CENTRAL&table=9847d8eaf96a6c44fe7c174ec787e09862ed875b844a77d648028765432c0f60

## Fetch periods

- `INITIAL` (30 days)
- `CONTINUOUS`

## Columns (20)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `date` (`DATE`, nullable) — Scoped Amazon source identifier or document detail for filtering and drilldown. JSON details retain unresolved rows and source links.
- `source` (`TEXT`, nullable) — Scoped Amazon source identifier or document detail for filtering and drilldown. JSON details retain unresolved rows and source links.
- `purchase_order_number` (`TEXT`, nullable) — Scoped Amazon source identifier or document detail for filtering and drilldown. JSON details retain unresolved rows and source links.
- `uploaded_cogs_calculation_date` (`DATE`, nullable) — Your uploaded product cost selection date. PO date for projected margins; invoice issue date for invoice and settlement margins. Payment date never selects another cost.
- `uploaded_cogs_currency` (`TEXT`, nullable) — Your uploaded product cost matching and coverage. Costs use the full scoped variant and effective date. Unknown values remain NULL; backdated corrections restate estimates.
- `uploaded_cogs_total_value` (`NUMBER`, nullable) — Your uploaded product cost matching and coverage. Costs use the full scoped variant and effective date. Unknown values remain NULL; backdated corrections restate estimates.
- `uploaded_cogs_complete` (`LOGIC`, nullable) — Your uploaded product cost coverage. True only when all relevant lines, units, currencies and source totals reconcile. Partial matched sums are not complete totals.
- `uploaded_cogs_missing_reason` (`TEXT`, nullable) — Your uploaded product cost. Reason an applicable cost or complete margin is unavailable. Missing identifiers and equally specific variants are unresolved.
- `uploaded_cogs_line_count` (`NUMBER`, nullable) — Your uploaded product cost matching and coverage. Costs use the full scoped variant and effective date. Unknown values remain NULL; backdated corrections restate estimates.
- `uploaded_cogs_missing_line_count` (`NUMBER`, nullable) — Your uploaded product cost matching and coverage. Costs use the full scoped variant and effective date. Unknown values remain NULL; backdated corrections restate estimates.
- `projected_product_revenue_value` (`NUMBER`, nullable) — DataDoe calculation. Projected product margin uses tax-exclusive wholesale revenue minus uploaded costs on the PO date. Cancelled orders are excluded. Not invoiced revenue, cash or complete net profit.
- `projected_product_margin_value` (`NUMBER`, nullable) — DataDoe calculation. Projected product margin uses tax-exclusive wholesale revenue minus uploaded costs on the PO date. Cancelled orders are excluded. Not invoiced revenue, cash or complete net profit.
- `projected_product_margin_percentage` (`NUMBER`, nullable) — DataDoe calculation. Projected product margin uses tax-exclusive wholesale revenue minus uploaded costs on the PO date. Cancelled orders are excluded. Not invoiced revenue, cash or complete net profit.
- `source_lines` (`JSON`, nullable) — Scoped Amazon source identifier or document detail for filtering and drilldown. JSON details retain unresolved rows and source links.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
