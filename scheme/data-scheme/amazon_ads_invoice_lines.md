# Ads Invoice Lines

- BigQuery table name: `amazon_ads_invoice_lines`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Exact Amazon Ads invoice lines. One row per invoice and line position in the latest complete invoice detail. line_index is that position, starting at 0. cost is the Amazon line cost and still includes fees. Do not add it to Ads Billing, which already publishes those fees as separate rows. Creator Connections counts stay in billed_event_count.

- Source type: `AMAZON_ADS`
- Source ID: `165d07b93d21248c7a96b2fb0d99b40affddf7e0270db597f71cfea98dc8062b`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=165d07b93d21248c7a96b2fb0d99b40affddf7e0270db597f71cfea98dc8062b

## Fetch periods

- `CONTINUOUS`

## Search aliases

- invoice lines
- ads invoice line
- campaign charge

## Columns (34)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `date` (`DATE`, required) — Invoice date.
- `invoice_id` (`TEXT`, required)
- `invoice_number` (`TEXT`, nullable)
- `invoice_status` (`TEXT`, nullable) — Amazon invoice status, such as ISSUED, PAID_IN_FULL or WRITTEN_OFF.
- `invoice_country_code` (`TEXT`, nullable) — Country on the invoice. Marketplace country comes from the Ads connection.
- `line_index` (`NUMBER`, required) — Zero-based position of the line in the latest complete invoice detail.
- `program_name` (`TEXT`, nullable)
- `line_name` (`TEXT`, nullable)
- `ad_campaign_id` (`TEXT`, nullable)
- `ad_campaign_aid` (`TEXT`, nullable)
- `ad_campaign_name` (`TEXT`, nullable)
- `campaign_tags` (`JSON`, nullable)
- `ad_portfolio_id` (`TEXT`, nullable)
- `cost` (`NUMBER`, nullable) — Amazon line cost. It still includes the line fees.
- `currency_code` (`TEXT`, nullable)
- `commission_amount` (`NUMBER`, nullable)
- `commission_rate` (`NUMBER`, nullable)
- `promotion_amount` (`NUMBER`, nullable)
- `supply_cost` (`NUMBER`, nullable)
- `cost_per_unit` (`NUMBER`, nullable)
- `cost_per_event_type` (`NUMBER`, nullable)
- `billed_event_type` (`TEXT`, nullable)
- `billed_event_count` (`NUMBER`, nullable) — Count of the billed event. For Creator Connections this is not a click count.
- `price_type` (`TEXT`, nullable)
- `purchase_order_number` (`TEXT`, nullable)
- `fees` (`JSON`, nullable) — Fee objects on the line. Ads Billing already publishes these as FEE rows.
- `observed_at_utc` (`DATE`, required) — When DataDoe last stored this invoice line.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
