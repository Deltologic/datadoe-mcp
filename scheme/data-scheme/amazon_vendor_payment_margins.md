# Vendor payment margins

- BigQuery table name: `amazon_vendor_payment_margins`
- Available in: Vendor Central
- Data scheme index: ../data-scheme.md

Amazon-reported payment-date cash activity and separate DataDoe settled-invoice margins. One row per scoped payment. Net receipts already include signed deductions; never subtract them twice. Invoice costs are inherited from the invoice date and counted once at its final settlement, never proportionally per payment. A period of settled-invoice margin includes those invoices complete payment histories and differs from cash received in that period. Invoice allocations, partial states and unresolved adjustments remain visible. Not complete net profit.

- Source type: `VENDOR_CENTRAL`
- Source ID: `880f7a6598f041da41ea145a2b90d4a96b018fdbbf2914a8ea67e8f236440f2e`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=VENDOR_CENTRAL&table=880f7a6598f041da41ea145a2b90d4a96b018fdbbf2914a8ea67e8f236440f2e

## Fetch periods

- `INITIAL` (30 days)
- `CONTINUOUS`

## Columns (43)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `date` (`DATE`, required) — UTC calendar day of the payment date. Use for date filtering.
- `unique_payment_id` (`TEXT`, required) — Unique payment identifier. Join amazon_remittance_items on this column. Differs from payment_number.
- `payment_number` (`TEXT`, nullable) — External payment reference, as shown on the bank statement and in Vendor Central. Not unique.
- `payment_date` (`DATE`, nullable) — Payment timestamp. date is the UTC calendar day of this value.
- `payment_amount` (`NUMBER`, nullable)
- `payment_currency` (`TEXT`, nullable) — ISO 4217 currency of payment_amount.
- `payment_amount_in_invoice_currency` (`NUMBER`, nullable) — Payment amount in the invoice currency, when it differs from payment_currency.
- `invoice_currency` (`TEXT`, nullable) — ISO 4217 currency of payment_amount_in_invoice_currency.
- `exchange_rate` (`NUMBER`, nullable) — Exchange rate applied to the payment.
- `payment_method` (`TEXT`, nullable) — Payment method, such as EFT.
- `remittance_status` (`TEXT`, nullable) — IN_PROGRESS, SUCCESSFUL, or FAILED.
- `line_item_count` (`NUMBER`, nullable) — Number of lines in amazon_remittance_items for this payment.
- `vendor_codes` (`JSON`, nullable) — JSON list of vendor codes the payment covers.
- `payee_codes` (`JSON`, nullable) — JSON list of payee codes the payment was made to.
- `related_identifiers` (`JSON`, nullable) — Raw JSON related business identifiers. relatedIdentifierName values: VENDOR_CODE, PAYEE_CODE.
- `country_code` (`TEXT`, nullable) — ISO 3166-1 alpha-2 country code of the remittance.
- `last_seen_at` (`DATE`, required) — Timestamp when DataDoe last received this row from the SP-API Finance Remittance API.
- `cash_net_receipts_value` (`NUMBER`, nullable) — Amazon-reported cash activity by payment date. Net receipts retain signed deductions; discount and withholding components are shown for reconciliation and are not subtracted twice.
- `cash_inventory_net_receipts_value` (`NUMBER`, nullable) — Amazon-reported cash activity by payment date. Net receipts retain signed deductions; discount and withholding components are shown for reconciliation and are not subtracted twice.
- `cash_other_net_receipts_value` (`NUMBER`, nullable) — Amazon-reported cash activity by payment date. Net receipts retain signed deductions; discount and withholding components are shown for reconciliation and are not subtracted twice.
- `cash_terms_discount_value` (`NUMBER`, nullable) — Amazon-reported cash activity by payment date. Net receipts retain signed deductions; discount and withholding components are shown for reconciliation and are not subtracted twice.
- `cash_withholding_value` (`NUMBER`, nullable) — Amazon-reported cash activity by payment date. Net receipts retain signed deductions; discount and withholding components are shown for reconciliation and are not subtracted twice.
- `cash_line_count` (`NUMBER`, nullable) — Amazon-reported cash activity by payment date. Net receipts retain signed deductions; discount and withholding components are shown for reconciliation and are not subtracted twice.
- `cash_complete` (`LOGIC`, nullable) — Amazon-reported cash activity by payment date. Net receipts retain signed deductions; discount and withholding components are shown for reconciliation and are not subtracted twice.
- `cash_missing_reason` (`TEXT`, nullable) — Amazon-reported cash activity by payment date. Net receipts retain signed deductions; discount and withholding components are shown for reconciliation and are not subtracted twice.
- `invoice_allocations` (`JSON`, nullable) — Scoped Amazon source identifier or document detail for filtering and drilldown. JSON details retain unresolved rows and source links.
- `settled_invoice_count` (`NUMBER`, nullable) — DataDoe calculation. Current invoice settlement state across its complete payment history. Final margin is available only after identity, balance, tax and history reconciliation. Attributed once to the final event; reopening recomputes it. This differs from cash received during the period.
- `partial_invoice_count` (`NUMBER`, nullable) — Scoped Amazon source identifier or document detail for filtering and drilldown. JSON details retain unresolved rows and source links.
- `unresolved_invoice_count` (`NUMBER`, nullable) — Scoped Amazon source identifier or document detail for filtering and drilldown. JSON details retain unresolved rows and source links.
- `uploaded_cogs_settled_invoice_total_value` (`NUMBER`, nullable) — Your uploaded product cost for invoices whose final settlement is attributed to this row. Counted once, never allocated proportionally to installments.
- `settled_invoice_revenue_value` (`NUMBER`, nullable) — DataDoe calculation. Current invoice settlement state across its complete payment history. Final margin is available only after identity, balance, tax and history reconciliation. Attributed once to the final event; reopening recomputes it. This differs from cash received during the period.
- `settled_invoice_margin_value` (`NUMBER`, nullable) — DataDoe calculation. Current invoice settlement state across its complete payment history. Final margin is available only after identity, balance, tax and history reconciliation. Attributed once to the final event; reopening recomputes it. This differs from cash received during the period.
- `settled_invoice_margin_percentage` (`NUMBER`, nullable) — DataDoe calculation. Current invoice settlement state across its complete payment history. Final margin is available only after identity, balance, tax and history reconciliation. Attributed once to the final event; reopening recomputes it. This differs from cash received during the period.
- `settlement_complete` (`LOGIC`, nullable) — DataDoe calculation. Current invoice settlement state across its complete payment history. Final margin is available only after identity, balance, tax and history reconciliation. Attributed once to the final event; reopening recomputes it. This differs from cash received during the period.
- `settlement_missing_reason` (`TEXT`, nullable) — DataDoe calculation. Current invoice settlement state across its complete payment history. Final margin is available only after identity, balance, tax and history reconciliation. Attributed once to the final event; reopening recomputes it. This differs from cash received during the period.
- `settled_invoice_ids` (`JSON`, nullable) — DataDoe calculation. Current invoice settlement state across its complete payment history. Final margin is available only after identity, balance, tax and history reconciliation. Attributed once to the final event; reopening recomputes it. This differs from cash received during the period.
- `invoice_coverage` (`JSON`, nullable) — Scoped Amazon source identifier or document detail for filtering and drilldown. JSON details retain unresolved rows and source links.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
