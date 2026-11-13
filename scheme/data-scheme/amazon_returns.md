# Returns (FBA & FBM)

- BigQuery table name: `amazon_returns`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

Physical return events, not payout refunds. FBA rows are items received at a fulfillment center; date is return/receipt date. FBM rows are return requests by return-request date. quantity is returned units. fnsku and fba_customer_comments are FBA only. product_name is the name on the returns report (FBA product-name, FBM item-name). amazon_return_detailed_disposition is FBA only (SELLABLE, CUSTOMER_DAMAGED, DEFECTIVE, etc.). cogs_* is unit cost as of the return date, times quantity. For payout refunds use amazon_settlements_with_cogs where settlement_type is REFUND.

- Source type: `SELLER_CENTRAL`
- Source ID: `27c6fc0ec69648b5fed4612dbd9ccdfdeaaca6787f8f985c01266e4dc11f9038`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: yes
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=27c6fc0ec69648b5fed4612dbd9ccdfdeaaca6787f8f985c01266e4dc11f9038

## Fetch periods

- `INITIAL` (60 days)
- `RECURRING_DAILY` (60 days)

## Search aliases

- refunds
- customer returns

## Columns (40)

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
- `amazon_return_tracking_id` (`TEXT`, nullable) — Available only for FBM returns.
- `sku` (`TEXT`, required)
- `child_asin` (`TEXT`, required)
- `fnsku` (`TEXT`, nullable) — Fulfillment Network SKU. Available only for FBA returns.
- `product_name` (`TEXT`, nullable) — Product name from the returns report. FBA uses product-name. FBM uses item-name.
- `fba_customer_comments` (`TEXT`, nullable) — Customer comments. Available only for FBA returns.
- `amazon_order_id` (`TEXT`, required)
- `order_date` (`DATE`, nullable) — Available only for FBM returns.
- `date` (`DATE`, required) — FBA: return/receipt date at the fulfillment center (return-date). FBM: return request date.
- `amazon_return_request_status` (`TEXT`, required) — Return request status. FBM values: 'Approved', 'Closed', 'PendingApproval'. FBA values: 'Unit returned to inventory', 'Reimbursed', 'Repackaged Successfully', 'IMMEDIATE_DISPOSAL', 'IMMEDIATE_DONATION', 'IMMEDIATE_LIQUIDATION'.
- `amazon_return_rmaid` (`TEXT`, nullable) — Available only for FBM returns.
- `amazon_return_seller_rmaid` (`TEXT`, nullable) — Available only for FBM returns.
- `amazon_return_label_cost` (`NUMBER`, nullable) — Available only for FBM returns.
- `amazon_return_carrier` (`TEXT`, nullable) — Available only for FBM returns.
- `amazon_return_delivery_date` (`DATE`, nullable) — Available only for FBM returns. The date Amazon recorded that the return package was delivered, from Return delivery date on the FBM returns report. Null for FBA returns and when Amazon has not provided a date. This is a calendar date, not a time of day and not a carrier tracking status. The returns report refreshes daily.
- `amazon_return_label_to_be_paid_by` (`TEXT`, nullable) — 'Seller' or 'Customer'.
- `amazon_order_is_prime` (`LOGIC`, nullable) — Available only for FBM returns (is-prime on the FBM returns report).
- `amazon_return_refunded_amount` (`NUMBER`, nullable) — Available only for FBM returns.
- `amazon_return_reason` (`TEXT`, required) — Amazon return reason code. FBA uses the reason field from its customer returns report; common values include UNWANTED_ITEM and NOT_AS_DESCRIBED. FBM uses Return Reason from its returns report; common values include CR-UNWANTED_ITEM and AMZ-PG-BAD-DESC. These codes are not normalized: CR-UNWANTED_ITEM matches UNWANTED_ITEM, while AMZ-PG-BAD-DESC matches NOT_AS_DESCRIBED. Some codes do not follow these prefixes. Use amazon_fulfillment_channel and map equivalent codes before combining FBA and FBM reasons.
- `amazon_return_detailed_disposition` (`TEXT`, nullable) — FBA only: condition assigned to a returned item by Amazon, separate from the customer's return reason. Observed values include SELLABLE, CUSTOMER_DAMAGED, DEFECTIVE, CARRIER_DAMAGED, and DAMAGED. Null for FBM returns. Only SELLABLE is treated as sellable in profit-table refund_cost.
- `amazon_fulfillment_channel` (`TEXT`, required) — 'FBA' or 'FBM'
- `amazon_fulfillment_channel_id` (`TEXT`, nullable) — Available only for FBA returns.
- `amazon_license_plate_number` (`TEXT`, required)
- `quantity` (`NUMBER`, required) — Returned units on this event.
- `cogs_item_value` (`NUMBER`, nullable) — Item COGS for returned units: unit item cost from amazon_cogs as of the return date, times quantity. — definition: `(amazon_cogs.cost_item_value ?? 0) * (amazon_returns.quantity ?? 0)`
- `cogs_shipping_value` (`NUMBER`, nullable) — Shipping COGS for returned units: unit shipping cost from amazon_cogs as of the return date, times quantity. — definition: `(amazon_cogs.cost_item_shipping_value ?? 0) * (amazon_returns.quantity ?? 0)`
- `cogs_total_value` (`NUMBER`, nullable) — Sum of cogs_item_value and cogs_shipping_value. — definition: `((amazon_cogs.cost_item_value ?? 0) + (amazon_cogs.cost_item_shipping_value ?? 0)) * (amazon_returns.quantity ?? 0)`
- `cogs_present` (`LOGIC`, required) — True when an uploaded COGS record applies to this row. Zero cost can still be valid. To list SKUs sold in the last 30 days without COGS, use GET /api/v1/cogs/missing or the MCP tool cogs_missing_list.
- `cogs_currency` (`TEXT`, nullable) — Currency code for COGS.
- `item_supplier_name` (`TEXT`, nullable) — Supplier name for the item COGS, if provided in COGS upload.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
