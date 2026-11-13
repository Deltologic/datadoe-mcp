# Invoices

- BigQuery table name: `amazon_invoices`
- Available in: Vendor Central
- Data scheme index: ../data-scheme.md

Accounts payable invoice headers for Vendor Central. One row per invoice. invoice_status is IN_PROGRESS, REJECTED, PARTIALLY_PAID, PARTIALLY_DEDUCTED, PAID, or DEDUCTED. invoice_type is AP_INVENTORY or OTHER. Join amazon_invoice_items on invoice_identifier. date is the UTC day of issue_date.

- Source type: `VENDOR_CENTRAL`
- Source ID: `abafd926794c204dea3a7ff75f430f27a7285cabdb2651a34a4c2cdd89f531c6`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=VENDOR_CENTRAL&table=abafd926794c204dea3a7ff75f430f27a7285cabdb2651a34a4c2cdd89f531c6

## Fetch periods

- `INITIAL` (90 days)
- `RECURRING_DAILY` (2 days)

## Prerequisites

Vendor Central only. Amazon does not offer the Invoices API to Seller Central accounts, so sellers get no rows. The Invoices API needs the Finance and Accounting role. If your Vendor Central account was added to DataDoe before October 1, 2026, this table has no data until you re-authorize the connection on the Sellers & Vendors page.

## Search aliases

- accounts payable
- vendor invoice

## Columns (50)

- `invoiced_non_product_amount_value` (`NUMBER`, nullable) — DataDoe calculation. Invoice issue-date goods amounts and uploaded costs. Unknown units, taxes, currencies or line coverage leave margin NULL. Available non-product adjustments remain separate.
- `uploaded_cogs_total_value` (`NUMBER`, nullable) — Your uploaded product cost matching and coverage. Costs use the full scoped variant and effective date. Unknown values remain NULL; backdated corrections restate estimates.
- `uploaded_cogs_currency` (`TEXT`, nullable) — Your uploaded product cost matching and coverage. Costs use the full scoped variant and effective date. Unknown values remain NULL; backdated corrections restate estimates.
- `uploaded_cogs_complete` (`LOGIC`, nullable) — Your uploaded product cost coverage. True only when all relevant lines, units, currencies and source totals reconcile. Partial matched sums are not complete totals.
- `uploaded_cogs_missing_reason` (`TEXT`, nullable) — Your uploaded product cost. Reason an applicable cost or complete margin is unavailable. Missing identifiers and equally specific variants are unresolved.
- `uploaded_cogs_calculation_date` (`DATE`, nullable) — Your uploaded product cost selection date. PO date for projected margins; invoice issue date for invoice and settlement margins. Payment date never selects another cost.
- `uploaded_cogs_goods_line_count` (`NUMBER`, nullable) — Your uploaded product cost matching and coverage. Costs use the full scoped variant and effective date. Unknown values remain NULL; backdated corrections restate estimates.
- `uploaded_cogs_missing_line_count` (`NUMBER`, nullable) — Your uploaded product cost matching and coverage. Costs use the full scoped variant and effective date. Unknown values remain NULL; backdated corrections restate estimates.
- `invoiced_product_revenue_value` (`NUMBER`, nullable) — DataDoe calculation. Invoice issue-date goods amounts and uploaded costs. Unknown units, taxes, currencies or line coverage leave margin NULL. Available non-product adjustments remain separate.
- `invoiced_product_tax_value` (`NUMBER`, nullable) — DataDoe calculation. Invoice issue-date goods amounts and uploaded costs. Unknown units, taxes, currencies or line coverage leave margin NULL. Available non-product adjustments remain separate.
- `invoiced_product_margin_value` (`NUMBER`, nullable) — DataDoe calculation. Invoice issue-date goods amounts and uploaded costs. Unknown units, taxes, currencies or line coverage leave margin NULL. Available non-product adjustments remain separate.
- `invoiced_product_margin_percentage` (`NUMBER`, nullable) — DataDoe calculation. Invoice issue-date goods amounts and uploaded costs. Unknown units, taxes, currencies or line coverage leave margin NULL. Available non-product adjustments remain separate.
- `adjusted_invoiced_product_margin_value` (`NUMBER`, nullable) — DataDoe calculation. Invoice issue-date goods amounts and uploaded costs. Unknown units, taxes, currencies or line coverage leave margin NULL. Available non-product adjustments remain separate.
- `uploaded_cogs_adjustment_status` (`TEXT`, nullable) — Your uploaded product cost matching and coverage. Costs use the full scoped variant and effective date. Unknown values remain NULL; backdated corrections restate estimates.
- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `date` (`DATE`, required) — UTC calendar day of the invoice issue date. Use for date filtering.
- `invoice_identifier` (`TEXT`, required) — Unique invoice identifier. For AP-Inventory invoices this is InvoiceNumber~PayeeCode.
- `invoice_number` (`TEXT`, nullable)
- `invoice_status` (`TEXT`, nullable) — IN_PROGRESS, REJECTED, PARTIALLY_PAID, PARTIALLY_DEDUCTED, PAID, or DEDUCTED. PARTIALLY_DEDUCTED and DEDUCTED are accounts-receivable states.
- `invoice_type` (`TEXT`, nullable) — AP_INVENTORY (accounts payable inventory) or OTHER.
- `billing_period_start_date` (`DATE`, nullable)
- `billing_period_end_date` (`DATE`, nullable)
- `payee_partner_id` (`TEXT`, nullable) — Payee partner id. For a vendor this is the vendor group id.
- `payee_partner_type` (`TEXT`, nullable) — SELLER, VENDOR, or AMAZON.
- `payee_partner_name` (`TEXT`, nullable)
- `payee_partner_entities` (`JSON`, nullable) — JSON list of entity codes for the payee, such as vendor codes.
- `payee_partner_address` (`TEXT`, nullable)
- `payee_tax_registration_number` (`TEXT`, nullable)
- `payer_partner_id` (`TEXT`, nullable) — Payer partner id. AMAZON is the payer on an accounts-payable invoice.
- `payer_partner_type` (`TEXT`, nullable) — SELLER, VENDOR, or AMAZON.
- `payer_partner_name` (`TEXT`, nullable)
- `payer_partner_entities` (`JSON`, nullable) — JSON list of entity codes for the payer.
- `payer_partner_address` (`TEXT`, nullable)
- `payer_tax_registration_number` (`TEXT`, nullable)
- `issue_date` (`DATE`, nullable) — Invoice issue timestamp. date is the UTC calendar day of this value.
- `due_date` (`DATE`, nullable)
- `payment_terms` (`TEXT`, nullable) — Payment terms text from the invoice.
- `invoice_amount` (`NUMBER`, nullable)
- `invoice_amount_currency` (`TEXT`, nullable) — ISO 4217 currency of invoice_amount.
- `invoice_amount_breakdowns` (`JSON`, nullable) — JSON amount breakdowns. breakdownType values: Total, InvoiceAmountWithoutTax, TaxAmount, MiscCharges, Other.
- `invoice_settlement_breakdowns` (`JSON`, nullable) — JSON settlement breakdowns. breakdownType values: AmountPaid, QueuedForPayment, QuickPayDiscount, QuantityVarianceAmount, PriceVariance, Other.
- `related_identifiers` (`JSON`, nullable) — JSON related business identifiers. relatedIdentifierName values: PAYEE_CODE, PURCHASE_ORDER_IDS, SHORTAGE_INVOICE_IDS, ASN_IDS, RETURN_IDS, AGREEMENT_IDS, PRODUCT_LINE, VENDOR_CODE, UNIQUE_PAYMENT_IDS, WAREHOUSE_ID.
- `creation_date` (`DATE`, nullable)
- `last_updated_date` (`DATE`, nullable)
- `last_seen_at` (`DATE`, required) — Timestamp when DataDoe last received this row from the SP-API Invoices getInvoice operation.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
