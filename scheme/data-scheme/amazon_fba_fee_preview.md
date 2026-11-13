# FBA Fee Preview

- BigQuery table name: `amazon_fba_fee_preview`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

Estimated FBA fees for each active FBA offer, kept as a daily snapshot. snapshot_date is the UTC date Amazon finished the report. When a finish time is missing, it is the UTC date Amazon created the report. Amazon refreshes the estimates at least every 72 hours, so a later snapshot can repeat the same estimates. The report has no scheduled fee category and no effective date. A future fulfillment fee is a fulfillment estimate, not a scheduled referral fee category. Fees stay in the currency on the row. Dimensions and weight stay in the units on the row. A blank fee is unknown, not zero. A product missing from a snapshot had no active FBA offer in that snapshot. A snapshot for one marketplace is not copied to another marketplace. History starts when the first snapshot is collected.

- Source type: `SELLER_CENTRAL`
- Source ID: `9fbbf3da8eb87e9fdb21f62124a48e1b7d8176733f2d3960984d3e6bce1114d7`
- Requires a date period: no
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=9fbbf3da8eb87e9fdb21f62124a48e1b7d8176733f2d3960984d3e6bce1114d7

## Fetch periods

- `INITIAL` (4 days)
- `RECURRING_DAILY` (4 days)

## Search aliases

- fba fees
- fee preview
- estimated fees
- size tier

## Columns (56)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `snapshot_date` (`DATE`, required) — UTC date Amazon finished the report. When a finish time is missing, this is the UTC date Amazon created the report.
- `amazon_report_id` (`TEXT`, required)
- `report_created_at` (`DATE`, nullable)
- `processing_started_at` (`DATE`, nullable)
- `processing_ended_at` (`DATE`, nullable)
- `request_window_started_at` (`DATE`, nullable)
- `request_window_ended_at` (`DATE`, nullable)
- `source_row_number` (`NUMBER`, required)
- `sku` (`TEXT`, nullable)
- `fnsku` (`TEXT`, nullable)
- `child_asin` (`TEXT`, nullable)
- `amazon_store` (`TEXT`, nullable)
- `product_name` (`TEXT`, nullable)
- `product_group` (`TEXT`, nullable)
- `brand` (`TEXT`, nullable)
- `fulfilled_by` (`TEXT`, nullable)
- `your_price` (`NUMBER`, nullable)
- `sales_price` (`NUMBER`, nullable)
- `longest_side` (`NUMBER`, nullable)
- `median_side` (`NUMBER`, nullable)
- `shortest_side` (`NUMBER`, nullable)
- `length_and_girth` (`NUMBER`, nullable)
- `unit_of_dimension` (`TEXT`, nullable)
- `item_package_weight` (`NUMBER`, nullable)
- `unit_of_weight` (`TEXT`, nullable)
- `currency` (`TEXT`, nullable)
- `estimated_fee_total` (`NUMBER`, nullable) — Estimated fee total in the row currency. A blank fee is unknown, not zero.
- `estimated_referral_fee_per_unit` (`NUMBER`, nullable)
- `product_size_tier` (`TEXT`, nullable)
- `estimated_order_handling_fee_per_order` (`NUMBER`, nullable)
- `estimated_future_order_handling_fee_per_order` (`NUMBER`, nullable)
- `expected_fulfillment_fee_per_unit` (`NUMBER`, nullable)
- `expected_future_fulfillment_fee_per_unit` (`NUMBER`, nullable) — Future fulfillment estimate supplied by Amazon. This is not a scheduled referral fee category or an effective date.
- `estimated_variable_closing_fee` (`NUMBER`, nullable)
- `estimated_future_fee` (`NUMBER`, nullable)
- `estimated_pick_pack_fee_per_unit` (`NUMBER`, nullable)
- `estimated_future_pick_pack_fee_per_unit` (`NUMBER`, nullable)
- `estimated_weight_handling_fee_per_unit` (`NUMBER`, nullable)
- `estimated_future_weight_handling_fee_per_unit` (`NUMBER`, nullable)
- `estimated_fixed_closing_fee` (`NUMBER`, nullable)
- `has_local_inventory` (`LOGIC`, nullable)
- `product_size_weight_band` (`TEXT`, nullable)
- `expected_domestic_fulfilment_fee_per_unit` (`NUMBER`, nullable)
- `expected_efn_fulfilment_fee_per_unit_uk` (`NUMBER`, nullable)
- `expected_efn_fulfilment_fee_per_unit_de` (`NUMBER`, nullable)
- `expected_efn_fulfilment_fee_per_unit_fr` (`NUMBER`, nullable)
- `expected_efn_fulfilment_fee_per_unit_it` (`NUMBER`, nullable)
- `expected_efn_fulfilment_fee_per_unit_es` (`NUMBER`, nullable)
- `expected_efn_fulfilment_fee_per_unit_se` (`NUMBER`, nullable)
- `extras` (`JSON`, nullable) — Columns Amazon included that are outside the published fee preview catalog.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
