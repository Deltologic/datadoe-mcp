# Invoice Items

- BigQuery table name: `amazon_invoice_items`
- Available in: Vendor Central
- Data scheme index: ../data-scheme.md

Invoice line items for Vendor Central. One row per line. Goods, services, and other charges, with matched quantity, price and quantity variances, and ASIN, SKU, UPC, EAN, or ISBN identifiers. Join amazon_invoices on invoice_identifier. date is the UTC day of the parent invoice issue date.

- Source type: `VENDOR_CENTRAL`
- Source ID: `225e7ddc71dc18c0eac1cc5c4ece2f974e0c737590d39ca89543d8566a0dfc5f`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=VENDOR_CENTRAL&table=225e7ddc71dc18c0eac1cc5c4ece2f974e0c737590d39ca89543d8566a0dfc5f

## Fetch periods

- `INITIAL` (90 days)
- `RECURRING_DAILY` (2 days)

## Prerequisites

Vendor Central only. Amazon does not offer the Invoices API to Seller Central accounts, so sellers get no rows. The Invoices API needs the Finance and Accounting role. If your Vendor Central account was added to DataDoe before October 1, 2026, this table has no data until you re-authorize the connection on the Sellers & Vendors page.

## Search aliases

- invoice lines
- price variance
- quantity variance

## Columns (61)

- `uploaded_cogs_unit_item_value` (`NUMBER`, nullable) — Your uploaded product cost per single ASIN item. Customer-maintained cost, separate from Amazon-reported wholesale prices, shipped COGS and Net PPM.
- `uploaded_cogs_unit_shipping_value` (`NUMBER`, nullable) — Your uploaded product cost per single ASIN item. Customer-maintained cost, separate from Amazon-reported wholesale prices, shipped COGS and Net PPM.
- `uploaded_cogs_unit_total_value` (`NUMBER`, nullable) — Your uploaded product cost per single ASIN item. Customer-maintained cost, separate from Amazon-reported wholesale prices, shipped COGS and Net PPM.
- `uploaded_cogs_currency` (`TEXT`, nullable) — Your uploaded product cost matching and coverage. Costs use the full scoped variant and effective date. Unknown values remain NULL; backdated corrections restate estimates.
- `uploaded_cogs_effective_from` (`DATE`, nullable) — Your uploaded product cost matching and coverage. Costs use the full scoped variant and effective date. Unknown values remain NULL; backdated corrections restate estimates.
- `uploaded_cogs_present` (`LOGIC`, nullable) — Your uploaded product cost matching and coverage. Costs use the full scoped variant and effective date. Unknown values remain NULL; backdated corrections restate estimates.
- `uploaded_cogs_match_status` (`TEXT`, nullable) — Your uploaded product cost. Reason an applicable cost or complete margin is unavailable. Missing identifiers and equally specific variants are unresolved.
- `uploaded_cogs_vendor_code` (`TEXT`, nullable) — Your uploaded product cost matching and coverage. Costs use the full scoped variant and effective date. Unknown values remain NULL; backdated corrections restate estimates.
- `uploaded_cogs_fulfillment_method` (`TEXT`, nullable) — Your uploaded product cost matching and coverage. Costs use the full scoped variant and effective date. Unknown values remain NULL; backdated corrections restate estimates.
- `uploaded_cogs_purchase_order_number` (`TEXT`, nullable) — Your uploaded product cost matching and coverage. Costs use the full scoped variant and effective date. Unknown values remain NULL; backdated corrections restate estimates.
- `uploaded_cogs_calculation_date` (`DATE`, nullable) — Your uploaded product cost selection date. PO date for projected margins; invoice issue date for invoice and settlement margins. Payment date never selects another cost.
- `uploaded_cogs_quantity_unit` (`TEXT`, nullable) — Your uploaded product cost matching and coverage. Costs use the full scoped variant and effective date. Unknown values remain NULL; backdated corrections restate estimates.
- `uploaded_cogs_item_units` (`NUMBER`, nullable) — Your uploaded product cost matching and coverage. Costs use the full scoped variant and effective date. Unknown values remain NULL; backdated corrections restate estimates.
- `uploaded_cogs_total_value` (`NUMBER`, nullable) — Your uploaded product cost matching and coverage. Costs use the full scoped variant and effective date. Unknown values remain NULL; backdated corrections restate estimates.
- `uploaded_cogs_complete` (`LOGIC`, nullable) — Your uploaded product cost coverage. True only when all relevant lines, units, currencies and source totals reconcile. Partial matched sums are not complete totals.
- `uploaded_cogs_missing_reason` (`TEXT`, nullable) — Your uploaded product cost. Reason an applicable cost or complete margin is unavailable. Missing identifiers and equally specific variants are unresolved.
- `invoiced_product_revenue_value` (`NUMBER`, nullable) — DataDoe calculation. Invoice issue-date goods amounts and uploaded costs. Unknown units, taxes, currencies or line coverage leave margin NULL. Available non-product adjustments remain separate.
- `invoiced_product_margin_value` (`NUMBER`, nullable) — DataDoe calculation. Invoice issue-date goods amounts and uploaded costs. Unknown units, taxes, currencies or line coverage leave margin NULL. Available non-product adjustments remain separate.
- `invoiced_product_margin_percentage` (`NUMBER`, nullable) — DataDoe calculation. Invoice issue-date goods amounts and uploaded costs. Unknown units, taxes, currencies or line coverage leave margin NULL. Available non-product adjustments remain separate.
- `uploaded_cogs_applicable` (`LOGIC`, nullable) — Your uploaded product cost matching and coverage. Costs use the full scoped variant and effective date. Unknown values remain NULL; backdated corrections restate estimates.
- `invoiced_product_tax_value` (`NUMBER`, nullable) — DataDoe calculation. Invoice issue-date goods amounts and uploaded costs. Unknown units, taxes, currencies or line coverage leave margin NULL. Available non-product adjustments remain separate.
- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `date` (`DATE`, required) — UTC calendar day of the parent invoice issue date. Use for date filtering.
- `invoice_identifier` (`TEXT`, required) — Parent invoice identifier. Join amazon_invoices on this column.
- `line_item_id` (`TEXT`, required)
- `unit_cost_amount` (`NUMBER`, nullable)
- `unit_cost_currency` (`TEXT`, nullable) — ISO 4217 currency of unit_cost_amount.
- `quantity` (`NUMBER`, nullable) — Invoiced units on the line.
- `tax_rate_codes` (`JSON`, nullable) — JSON list of country and tax rate strings, such as DE 19.
- `total_amount` (`NUMBER`, nullable)
- `total_amount_currency` (`TEXT`, nullable) — ISO 4217 currency of total_amount.
- `total_amount_breakdown` (`JSON`, nullable) — JSON line amount breakdowns. breakdownType values: ItemCostWithoutTax, ItemTaxAmount, Other.
- `line_item_type` (`TEXT`, nullable) — GOODS, SERVICES, or OTHERS.
- `item_description` (`TEXT`, nullable)
- `service_charge_type` (`TEXT`, nullable) — Service charge kind: DAMAGE_ALLOWANCE, PRICE_PROTECTION, FBA_INVENTORY_STORAGE_FEE, or OTHER. Set on service lines.
- `service_charge_period_start_date` (`DATE`, nullable)
- `service_charge_period_end_date` (`DATE`, nullable)
- `asin` (`TEXT`, nullable) — ASIN identifier when the line has one. Service lines often have no ASIN.
- `sku` (`TEXT`, nullable) — SKU identifier when the line has one.
- `external_id` (`TEXT`, nullable) — External identifier Amazon stores for the ASIN.
- `upc` (`TEXT`, nullable)
- `ean` (`TEXT`, nullable)
- `isbn` (`TEXT`, nullable)
- `item_identifiers` (`JSON`, nullable) — Full JSON identifier list. Flattened values are also in asin, sku, external_id, upc, ean, and isbn.
- `matched_quantity` (`NUMBER`, nullable) — Quantity Amazon matched against the expected purchase order or receipt.
- `matched_amount` (`NUMBER`, nullable) — Amount Amazon matched against the expected purchase order or receipt.
- `matched_amount_currency` (`TEXT`, nullable) — ISO 4217 currency of matched_amount.
- `paid_quantity` (`NUMBER`, nullable) — Quantity Amazon has paid.
- `paid_amount` (`NUMBER`, nullable) — Amount Amazon has paid.
- `paid_amount_currency` (`TEXT`, nullable) — ISO 4217 currency of paid_amount.
- `quantity_variance` (`NUMBER`, nullable) — Difference between expected and actual quantity (Amazon quantityVariance).
- `price_variance_amount` (`NUMBER`, nullable) — Difference between expected and invoiced price (Amazon priceVariance).
- `price_variance_currency` (`TEXT`, nullable) — ISO 4217 currency of price_variance_amount.
- `variance_reasons` (`JSON`, nullable) — JSON variance reasons. varianceType is PQV (purchase quantity variance), PPV (purchase price variance), or OTHER. defectTypes name the cause, such as SHORTAGES_IN_TRANSIT, OVERBILLING, DUPLICATE_INVOICE_DEFECT, PRODUCT_COST_NOT_ACTIVE, or DEALBUY.
- `related_item_identifiers` (`JSON`, nullable) — JSON related business identifiers. relatedIdentifierName values: PAYEE_CODE, PURCHASE_ORDER_IDS, SHORTAGE_INVOICE_IDS, ASN_IDS, RETURN_IDS, AGREEMENT_IDS, PRODUCT_LINE, VENDOR_CODE, UNIQUE_PAYMENT_IDS, WAREHOUSE_ID.
- `last_seen_at` (`DATE`, required) — Timestamp when DataDoe last received this row from the SP-API Invoices getInvoice operation.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
