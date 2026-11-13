# Ads Billing

- BigQuery table name: `amazon_ads_billing`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Amazon Ads Billing invoices, as in the Ads console billing history. Not the SP-API Vendor amazon_invoices. One row per issued invoice and billing_type: CAMPAIGN (one campaign and program, lines of the same campaign summed, Amazon sign kept), PROMOTION, ADJUSTMENT, FEE (per fee type and country) and TAX. date is the invoice date. SUM(total) over an invoice without TAX rows equals invoice_amount_due. The current, not yet issued period is not included. Empty when the Ads account has no Billing history permission. Fetched daily, 2 years back.

- Source type: `AMAZON_ADS`
- Source ID: `ba41ad8515047fbd0db08e11f5f1bbc91569e978ea3a44cddd2c76c9e6604fe3`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=ba41ad8515047fbd0db08e11f5f1bbc91569e978ea3a44cddd2c76c9e6604fe3

## Fetch periods

- `CONTINUOUS`

## Search aliases

- billing history
- invoice
- creator connections
- regulatory fee

## Columns (50)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `date` (`DATE`, required) — Invoice date.
- `billing_type` (`TEXT`, required) — CAMPAIGN / PROMOTION / ADJUSTMENT / FEE / TAX.
- `invoice_id` (`TEXT`, required)
- `invoice_number` (`TEXT`, nullable)
- `invoice_status` (`TEXT`, required) — Amazon invoice status, such as ISSUED, PAID_IN_FULL or WRITTEN_OFF. Open invoices are refetched until paid or written off.
- `invoice_country_code` (`TEXT`, nullable) — Country of the invoice. One Ads account can bill several countries with separate invoices and currencies.
- `ad_product_group` (`TEXT`, nullable)
- `billing_period_start_date` (`DATE`, nullable)
- `billing_period_end_date` (`DATE`, nullable)
- `invoice_due_date` (`DATE`, nullable)
- `payment_method` (`TEXT`, nullable)
- `invoice_amount_due` (`NUMBER`, nullable) — Amount due of the whole invoice, repeated on each of its rows.
- `invoice_tax_amount_due` (`NUMBER`, nullable) — Tax due of the whole invoice, repeated on each of its rows.
- `invoice_remaining_amount_due` (`NUMBER`, nullable) — Unpaid amount of the whole invoice, repeated on each of its rows.
- `currency_code` (`TEXT`, nullable)
- `program_name` (`TEXT`, nullable) — Ad program of a CAMPAIGN row as Amazon bills it, such as SPONSORED PRODUCTS, SPONSORED BRANDS, SPONSORED DISPLAY or CREATOR CONNECTIONS.
- `is_creator_connections` (`LOGIC`, required) — True for Creator Connections charges: program CREATOR CONNECTIONS or a line with a commission. Their counts are in billed_event_count, never in clicks.
- `ad_campaign_id` (`TEXT`, nullable)
- `ad_campaign_name` (`TEXT`, nullable)
- `ad_portfolio_id` (`TEXT`, nullable)
- `ad_portfolio_name` (`TEXT`, nullable)
- `invoice_line_count` (`NUMBER`, nullable) — Invoice lines summed into this row.
- `billed_event_type` (`TEXT`, nullable) — What Amazon counted for the charge, such as CLICKS or IMPRESSIONS.
- `billed_event_count` (`NUMBER`, nullable)
- `clicks` (`NUMBER`, nullable) — Billed clicks. Null for Creator Connections rows.
- `impressions` (`NUMBER`, nullable) — Billed impressions. Null for Creator Connections rows.
- `sponsored_products_cost` (`NUMBER`, nullable) — Sponsored Products charges, without fees.
- `sponsored_brands_cost` (`NUMBER`, nullable) — Sponsored Brands charges, without fees.
- `sponsored_display_cost` (`NUMBER`, nullable) — Sponsored Display charges, without fees and without Creator Connections.
- `creator_connections_cost` (`NUMBER`, nullable) — Creator Connections charges, without fees.
- `other_ads_cost` (`NUMBER`, nullable) — Charges of other ad programs, without fees.
- `creator_connections_commission` (`NUMBER`, nullable) — Commission amount when Amazon reports it on the line. Informational, already part of creator_connections_cost.
- `promotion_amount` (`NUMBER`, nullable) — Promotion credit, negative.
- `adjustment_amount` (`NUMBER`, nullable) — Adjustment, with Amazon sign.
- `fee_type` (`TEXT`, nullable) — Fee type, such as REGULATORY_ADVERTISING_FEE.
- `fee_country_code` (`TEXT`, nullable) — Country (jurisdiction) of the fee.
- `fee_amount` (`NUMBER`, nullable) — Fee amount for the fee type and country. Can be negative.
- `tax_name` (`TEXT`, nullable)
- `tax_jurisdiction` (`TEXT`, nullable)
- `tax_rate` (`NUMBER`, nullable) — Tax rate as returned by Amazon. A rate, not money.
- `tax_amount` (`NUMBER`, nullable) — Tax amount of the jurisdiction.
- `total` (`NUMBER`, required) — Amount of the row. SUM(total) over an invoice without TAX rows equals invoice_amount_due.
- `billing_description` (`TEXT`, nullable) — Promotion or adjustment description from Amazon.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
