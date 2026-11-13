# Bid-Boost Audience Performance

- BigQuery table name: `amazon_ads_audiences_by_date`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Bid-boost audience segment performance for Sponsored Products and Sponsored Brands. Grain is campaign + audience segment + date. Do not sum these metrics with campaign or ASIN ads views (double-count). DSP Audience (order / lineItem / segment) is a different report and is not included here. Canonical conversion metrics use 14-day attribution for SPONSORED_PRODUCTS and the unwindowed purchases/sales/unitsSoldClicks fields for SPONSORED_BRANDS.

- Source type: `AMAZON_ADS`
- Source ID: `9c93aaa5e28bbad50fcf119577554250b0d676fffae9b808eceb181c9b8c4068`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=9c93aaa5e28bbad50fcf119577554250b0d676fffae9b808eceb181c9b8c4068

## Fetch periods

- `INITIAL` (56 days)
- `RECURRING_DAILY` (21 days)
- `RECURRING_MONTHLY` (49 days)

## Data availability

- `INTRADAY` — Intraday updates are available when source data changes during the day. Refresh: 10am, 1pm, 4pm.

## Columns (23)

- `marketplace_id` (`TEXT`, required) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, required) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, required) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `date` (`DATE`, required)
- `ad_campaign_type` (`TEXT`, required) — SPONSORED_PRODUCTS / SPONSORED_BRANDS
- `ad_campaign_id` (`TEXT`, required)
- `ad_campaign_name` (`TEXT`, required)
- `ad_audience_segment_name` (`TEXT`, required)
- `ad_audience_segment_class_code` (`TEXT`, required) — Amazon audience segment class code. The readable name is ad_audience_segment_name.
- `ad_impressions` (`NUMBER`, required)
- `ad_clicks` (`NUMBER`, required)
- `ad_spend` (`NUMBER`, required)
- `ad_orders` (`NUMBER`, required) — Attributed ad orders (purchases14d for SPONSORED_PRODUCTS, purchases for SPONSORED_BRANDS).
- `ad_orders_same_sku` (`NUMBER`, nullable) — Attributed same-SKU ad orders (purchasesSameSku14d). Null for SPONSORED_BRANDS.
- `ad_sales` (`NUMBER`, required) — Attributed ad sales (sales14d for SPONSORED_PRODUCTS, sales for SPONSORED_BRANDS).
- `ad_sales_same_sku` (`NUMBER`, nullable) — Attributed same-SKU ad sales (attributedSalesSameSku14d). Null for SPONSORED_BRANDS.
- `ad_sales_clicks` (`NUMBER`, nullable) — Click-attributed sales (salesClicks). Null for SPONSORED_PRODUCTS.
- `ad_units_sold` (`NUMBER`, required) — Attributed units sold (unitsSoldClicks14d for SPONSORED_PRODUCTS, unitsSoldClicks for SPONSORED_BRANDS).
- `ad_units_sold_same_sku` (`NUMBER`, nullable) — Attributed same-SKU units sold (unitsSoldSameSku14d). Null for SPONSORED_BRANDS.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
