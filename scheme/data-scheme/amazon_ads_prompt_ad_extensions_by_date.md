# Prompt Ad Extension Performance

- BigQuery table name: `amazon_ads_prompt_ad_extensions_by_date`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Performance for Sponsored Products and Sponsored Brands prompt ad extensions per extension, ad, and date. Grain is creativeExtensionId + adId. Do not sum these metrics with campaign, ASIN, or ad-level ads views (double-count). Canonical conversion metrics use 14-day attribution.

- Source type: `AMAZON_ADS`
- Source ID: `3d78ce25ee8eb3ce544ad7fb85c36382b52a88e89b49c61dc95b17c8dc332605`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=3d78ce25ee8eb3ce544ad7fb85c36382b52a88e89b49c61dc95b17c8dc332605

## Fetch periods

- `INITIAL` (56 days)
- `RECURRING_DAILY` (21 days)
- `RECURRING_MONTHLY` (49 days)

## Data availability

- `INTRADAY` — Intraday updates are available when source data changes during the day. Refresh: 10am, 1pm, 4pm.

## Columns (37)

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
- `ad_group_id` (`TEXT`, required)
- `ad_group_name` (`TEXT`, nullable)
- `ad_id` (`TEXT`, required)
- `ad_creative_extension_id` (`TEXT`, required)
- `ad_creative_extension_type` (`TEXT`, nullable)
- `ad_prompt_text` (`TEXT`, nullable)
- `ad_advertised_asin` (`TEXT`, nullable) — Null for SPONSORED_BRANDS.
- `ad_advertised_sku` (`TEXT`, nullable) — Null for SPONSORED_BRANDS.
- `ad_name` (`TEXT`, nullable) — Null for SPONSORED_PRODUCTS.
- `ad_portfolio_name` (`TEXT`, nullable)
- `currency_code` (`TEXT`, nullable)
- `ad_impressions` (`NUMBER`, required)
- `ad_clicks` (`NUMBER`, required)
- `ad_spend` (`NUMBER`, required)
- `ad_orders` (`NUMBER`, required) — Attributed ad orders (purchases14d).
- `ad_orders_same_sku` (`NUMBER`, required) — Attributed same-SKU ad orders (purchasesSameSku14d).
- `ad_sales` (`NUMBER`, required) — Attributed ad sales (sales14d).
- `ad_sales_same_sku` (`NUMBER`, required) — Attributed same-SKU ad sales (attributedSalesSameSku14d).
- `ad_units_sold` (`NUMBER`, required) — Attributed units sold (unitsSoldClicks14d).
- `ad_units_sold_same_sku` (`NUMBER`, required) — Attributed same-SKU units sold (unitsSoldSameSku14d).
- `ad_new_to_brand_purchases` (`NUMBER`, nullable) — First-time orders of the brand in a 12-month lookback, within 14 days of an ad click or view. A count, not a rate. Not available for book vendors. Null for SPONSORED_PRODUCTS.
- `ad_new_to_brand_purchases_percentage` (`NUMBER`, nullable) — Share of the matching total that is new-to-brand. Amazon reports this as a percentage, not a unit count. Not available for book vendors. Null for SPONSORED_PRODUCTS.
- `ad_new_to_brand_sales` (`NUMBER`, nullable) — Sales from first-time customers of the brand in a 12-month lookback, within 14 days of an ad click or view. A currency amount, not a rate. Not available for book vendors. Null for SPONSORED_PRODUCTS.
- `ad_new_to_brand_sales_percentage` (`NUMBER`, nullable) — Share of the matching total that is new-to-brand. Amazon reports this as a percentage, not a unit count. Not available for book vendors. Null for SPONSORED_PRODUCTS.
- `ad_new_to_brand_units_sold` (`NUMBER`, nullable) — Units in new-to-brand orders within 14 days of an ad click or view. A count, not a rate. Not available for book vendors. Null for SPONSORED_PRODUCTS.
- `ad_new_to_brand_units_sold_percentage` (`NUMBER`, nullable) — Share of the matching total that is new-to-brand. Amazon reports this as a percentage, not a unit count. Not available for book vendors. Null for SPONSORED_PRODUCTS.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
