# Sales & Traffic by ASIN & Date

- BigQuery table name: `amazon_sales_and_traffic_with_cogs`
- Available in: Seller Central
- Data scheme index: ../data-scheme.md

Deprecated: amazon_sales_and_traffic_with_cogs will be removed on November 16, 2026. Use amazon_profit_by_sku_and_date for SKU and child-ASIN analysis and amazon_profit_by_date for daily account summaries. These tables provide consistent sales and profitability definitions and more current sales data; Amazon traffic reports can still be delayed. SAT contains Sales and Traffic report metrics per child ASIN and date, including ordered sales and units. Read the SAT migration to profit tables guide at https://app.datadoe.com/hub/docs/datadoe-data/sat-migration-to-profit-tables or open a support ticket for help. The underlying report data remains available through the Raw BigQuery integration.

- Source type: `SELLER_CENTRAL`
- Source ID: `401ffcd7e50c1ea9a18cacf221ddf99858db20a0f31eff65fc22a8e8140c7e1b`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: yes
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=SELLER_CENTRAL&table=401ffcd7e50c1ea9a18cacf221ddf99858db20a0f31eff65fc22a8e8140c7e1b

## Fetch periods

- `INITIAL` (35 days)
- `RECURRING_DAILY` (4 days)
- `RECURRING_MONTHLY` (30 days, shifted by 4 days)

## Known issues

- **Deprecated: removal on November 16, 2026** — The Sales & Traffic by ASIN & Date (SAT) table will be removed on November 16, 2026. Migrate reports, exports, schedules, and integrations to Profit by SKU & Date or Profit by Date before that date. Read the [SAT migration to profit tables guide](https://app.datadoe.com/hub/docs/datadoe-data/sat-migration-to-profit-tables) or [open a support ticket](https://forms.clickup.com/9015200219/f/8cnj2ev-38615/AOYF9I35QFOXWJQXIG?type=Form&source=hub-sat-migration-docs) for help. The underlying report data remains available through the Raw BigQuery integration.

## Search aliases

- revenue
- page views
- conversion

## Columns (41)

- `date` (`DATE`, required) — Single date may occur multiple times.
- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `child_asin` (`TEXT`, required)
- `parent_asin` (`TEXT`, required)
- `product_name` (`TEXT`, required)
- `buybox_percentage` (`NUMBER`, required) — Share of page views where this offer won the Featured Offer (Buy Box). Amazon percentage on a 0–100 scale (report examples are values such as 98.54, not 0.9854).
- `buybox_percentage_b2b` (`NUMBER`, required) — B2B buy box percentage. Amazon percentage on a 0–100 scale (report examples are values such as 98.54, not 0.9854). Amazon Business subset of the matching total. Included in that total; do not add the two columns.
- `units_session_percentage` (`NUMBER`, required) — Units ordered divided by sessions. Amazon percentage on a 0–100 scale (report examples are values such as 98.54, not 0.9854). Can exceed 100 when a session buys more than one unit.
- `page_views` (`NUMBER`, required) — Page views from a browser or the mobile app. A page view is a visit, not a session. browser_page_views and mobile_page_views can count the same visit on both devices, so they can sum to more than page_views. B2B page views are the Amazon Business subset.
- `page_views_b2b` (`NUMBER`, required) — B2B page views. Amazon Business subset of the matching total. Included in that total; do not add the two columns.
- `browser_page_views` (`NUMBER`, required) — Page views from a browser. The same visit can also appear in mobile_page_views, so the two columns can sum to more than page_views.
- `mobile_session` (`NUMBER`, required) — Mobile-app sessions. A session is all visits by one user within 24 hours. browser_session and mobile_session can both count the same user, so they can sum to more than session.
- `mobile_page_views` (`NUMBER`, required) — Page views from the mobile app.
- `session` (`NUMBER`, required) — Sessions from browser or mobile app. A session is all visits by one user within 24 hours. browser_session and mobile_session can both count the same user, so they can sum to more than session.
- `sessions_b2b` (`NUMBER`, required) — B2B sessions. Amazon Business subset of the matching total. Included in that total; do not add the two columns. A session is all visits by one user within 24 hours. browser_session and mobile_session can both count the same user, so they can sum to more than session.
- `browser_session` (`NUMBER`, required) — Browser sessions. A session is all visits by one user within 24 hours. browser_session and mobile_session can both count the same user, so they can sum to more than session.
- `total_sales` (`NUMBER`, required) — Ordered product sales (price × units ordered), not shipped sales. B2B sales are included.
- `total_units` (`NUMBER`, required) — Units ordered. One order of 2 copies is 2 units. B2B units are included. Not shipped units.
- `total_units_b2b` (`NUMBER`, required) — B2B units ordered. Amazon Business subset of the matching total. Included in that total; do not add the two columns.
- `total_orders` (`NUMBER`, required) — Order items ordered, not orders and not units. B2B order items are included.
- `shipped_product_sales` (`NUMBER`, required) — Product sales Amazon has shipped. Not ordered sales (total_sales). B2B shipped sales are included.
- `shipped_product_sales_b2b` (`NUMBER`, required) — B2B shipped product sales. Amazon Business subset of the matching total. Included in that total; do not add the two columns.
- `units_shipped` (`NUMBER`, required) — Units shipped from the Sales and Traffic report.
- `units_shipped_b2b` (`NUMBER`, required) — B2B units shipped from the Sales and Traffic report.
- `orders_shipped` (`NUMBER`, required) — Orders shipped from the Sales and Traffic report.
- `orders_shipped_b2b` (`NUMBER`, required) — B2B orders shipped from the Sales and Traffic report.
- `units_refunded` (`NUMBER`, required) — Units refunded from the Sales and Traffic report.
- `units_refunded_b2b` (`NUMBER`, required) — B2B units refunded from the Sales and Traffic report.
- `refund_rate` (`NUMBER`, required) — Amazon refundRate. Amazon percentage on a 0–100 scale (report examples are values such as 98.54, not 0.9854). Stored values can exceed 100 when refunded units exceed ordered units in the period. The schema text divides units ordered by units refunded, which is the inverse of a refund rate; use this column as Amazon sent it and do not recompute.
- `refund_rate_b2b` (`NUMBER`, required) — B2B refundRate. Amazon percentage on a 0–100 scale (report examples are values such as 98.54, not 0.9854). Amazon Business subset of the matching total. Included in that total; do not add the two columns. Stored values can exceed 100. Do not recompute it.
- `cogs_item_value` (`NUMBER`, nullable) — Unit item cost from amazon_cogs for this child ASIN on this date.
- `cogs_shipping_value` (`NUMBER`, nullable) — Unit shipping cost from amazon_cogs for this child ASIN on this date.
- `cogs_total_value` (`NUMBER`, nullable) — Unit item cost plus unit shipping cost, multiplied by units ordered (total_units). — definition: `((amazon_cogs.cost_item_value ?? 0) + (amazon_cogs.cost_item_shipping_value ?? 0)) * (amazon_sales_and_traffic_with_cogs.total_units ?? 0)`
- `cogs_present` (`LOGIC`, required) — True when an uploaded COGS record applies to this row. Zero cost can still be valid. To list SKUs sold in the last 30 days without COGS, use GET /api/v1/cogs/missing or the MCP tool cogs_missing_list.
- `cogs_currency` (`TEXT`, nullable) — Currency code for COGS.
- `item_supplier_name` (`TEXT`, nullable) — Supplier name for the item COGS, if provided in COGS upload.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
