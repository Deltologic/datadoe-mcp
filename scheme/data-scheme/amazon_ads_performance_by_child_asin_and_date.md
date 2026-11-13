# Ad Performance by ASIN & Date

- BigQuery table name: `amazon_ads_performance_by_child_asin_and_date`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Ads performance by product, ad or campaign, and date for Sponsored Products, Sponsored Display, and Sponsored Brands. Multiple rows can exist for the same ASIN, SKU and date. ad_sales and ad_orders are same-SKU click sales for Sponsored Products and promoted-product click sales for Sponsored Display. ad_attributed_sales, ad_attributed_orders and ad_attributed_units_sold are the advertised-product report totals, including other products. Sponsored Display totals include view-through sales. Display ad_units_sold_same_sku includes all click-attributed units. Brands ad_sales and ad_orders are estimated shares of campaign totals, including brand halo. Brands same-SKU columns, attributed columns, clicks and impressions are null. Sponsored Brands spend uses eligible ad-creative ASINs, with same-day ad cost rescaled to campaign cost. Remaining spend uses campaign purchased-product shares. Without purchased-product data, it uses Seller Central sales, orders and sessions, or an even split among known campaign ASINs. Sales and orders allocate campaign totals by purchased-product shares, with the same fallback signals. ASIN spend and sales are split across available SKUs by same-day order-sales shares; orders use order-count shares. A zero total uses an even split for that measure. With no SKU rows, sku is null. Campaigns without any ASIN signal remain account-only. Estimates can lag the campaign report and are revised as inputs arrive. Prefer amazon_ads_performance_by_campaign_by_date for total campaign data. Sponsored Television and Amazon DSP are not included here.

- Source type: `AMAZON_ADS`
- Source ID: `d0017e92fb089c2c8c3fe65f81d08666ecb4fe937ffbce9969ce2fc7d28c805c`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: yes
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=d0017e92fb089c2c8c3fe65f81d08666ecb4fe937ffbce9969ce2fc7d28c805c

## Fetch periods

- `INITIAL` (60 days)
- `RECURRING_DAILY` (21 days)
- `RECURRING_MONTHLY` (49 days)

## Data availability

- `INTRADAY` — Daily fetch starts at 2am and rereads 21 days. Intraday fetches start at 8am, 1pm and 4pm and reread 5 days. Times use the marketplace time zone. Data is available after processing and can change in later reports. Refresh: 2am, 8am, 1pm, 4pm.

## Related actions

- `AMAZON_ADS_ADS_ADD` — writes: writes rows to this table
- `AMAZON_ADS_ADS_UPDATE` — writes: writes rows to this table
- `AMAZON_ADS_ADS_REMOVE` — writes: writes rows to this table
- `AMAZON_ADS_ADS_FIND` — live: reads a fresher live value. When a FIND Action's entity is in the DataDoe data scheme, use an Export or a BigQuery query. Use FIND only when you need live Amazon data that the warehouse does not have yet. One standard Export costs 2 AI Tokens. One integrated BigQuery query costs 0.2 AI Tokens. Compare the total cost of repeated FIND Actions with one Export or query.

actions_details_schema_get reports whether each Action type is enabled for the Organization. An Organization owner enables a type in the DataDoe app under Settings > Actions.

## Search aliases

- ppc
- sponsored ads
- asin ads
- same sku

## Columns (42)

- `marketplace_id` (`TEXT`, nullable) — Amazon provided ID that represents a specific country where the Seller or Vendor operates.
- `marketplace_country_code` (`TEXT`, nullable) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, nullable) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, nullable) — DataDoe account identifier used by MCP/API calls (sellers_and_vendors_list, exports). Not unique in amazon_sellers_and_vendors_context when one account has multiple connection contexts — join that table on connection_context_id instead.
- `seller_or_vendor_name` (`TEXT`, nullable) — DataDoe connection context display name for the seller or vendor.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon Seller Central seller ID from the connection (connection_seller_id). Null when the connection has no seller ID.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `child_asin` (`TEXT`, nullable)
- `sku` (`TEXT`, nullable)
- `date` (`DATE`, required) — Single date may repeat.
- `product_name` (`TEXT`, nullable)
- `ad_campaign_type` (`TEXT`, required) — SPONSORED_DISPLAY / SPONSORED_PRODUCTS / SPONSORED_BRANDS
- `ad_portfolio_id` (`TEXT`, nullable) — Portfolio ID for SPONSORED_PRODUCTS campaigns. Null for SPONSORED_DISPLAY and SPONSORED_BRANDS.
- `ad_portfolio_name` (`TEXT`, nullable) — Portfolio name for SPONSORED_PRODUCTS campaigns. Null for SPONSORED_DISPLAY and SPONSORED_BRANDS.
- `ad_sales` (`NUMBER`, nullable) — Products: same-SKU click sales (7d). Display: promoted-product click sales (14d). Brands: estimated share of campaign sales (14d), including brand halo. Use ad_sales_same_sku for the product-only scope. The advertised-product total, including other products and Display view-through sales, is ad_attributed_sales. — definition: `amazon_ads_performance_by_child_asin_and_date.ad_campaign_type === 'SPONSORED_PRODUCTS' ? raw_ads_api_report_advertised_products_sp.attributedSalesSameSku7d : amazon_ads_performance_by_child_asin_and_date.ad_campaign_type === 'SPONSORED_DISPLAY' ? raw_ads_api_report_advertised_products_sd.salesPromotedClicks : amazon_ads_performance_by_child_asin_and_date.ad_campaign_type === 'SPONSORED_TELEVISION' ? null : refined_ads_estimated_sb_performance_by_asin.estimatedSales14d`
- `ad_orders` (`NUMBER`, nullable) — Products: same-SKU click orders (7d). Display: promoted-product click orders (14d). Brands: estimated share of campaign orders (14d), including brand halo. Use ad_orders_same_sku for the product-only scope. — definition: `amazon_ads_performance_by_child_asin_and_date.ad_campaign_type === 'SPONSORED_PRODUCTS' ? raw_ads_api_report_advertised_products_sp.purchasesSameSku7d : amazon_ads_performance_by_child_asin_and_date.ad_campaign_type === 'SPONSORED_DISPLAY' ? raw_ads_api_report_advertised_products_sd.purchasesPromotedClicks : amazon_ads_performance_by_child_asin_and_date.ad_campaign_type === 'SPONSORED_TELEVISION' ? null : refined_ads_estimated_sb_performance_by_asin.estimatedOrders14d`
- `ad_sales_same_sku` (`NUMBER`, nullable) — Attributed sales of the advertised SKU only (14d for SPONSORED_BRANDS and SPONSORED_DISPLAY, 7d for SPONSORED_PRODUCTS). Excludes brand-halo purchases of other SKUs. Not total ad sales; campaign totals are amazon_ads_performance_by_campaign_by_date.ad_sales. Null for Sponsored Brands. — definition: `amazon_ads_performance_by_child_asin_and_date.ad_campaign_type === 'SPONSORED_PRODUCTS' ? raw_ads_api_report_advertised_products_sp.attributedSalesSameSku7d : amazon_ads_performance_by_child_asin_and_date.ad_campaign_type === 'SPONSORED_DISPLAY' ? raw_ads_api_report_advertised_products_sd.salesPromotedClicks : amazon_ads_performance_by_child_asin_and_date.ad_campaign_type === 'SPONSORED_TELEVISION' ? null : null`
- `ad_clicks` (`NUMBER`, nullable) — Clicks after Amazon removed invalid traffic. Gross clicks, including invalid traffic, are ad_gross_click_throughs. Null for Sponsored Brands.
- `ad_impressions` (`NUMBER`, nullable) — Times the ad was displayed after Amazon removed invalid traffic. Gross impressions, including invalid traffic, are ad_gross_impressions. Null for Sponsored Brands.
- `ad_spend` (`NUMBER`, nullable) — Reported Products and Display spend, or estimated Brands spend allocated to this ASIN and SKU. Sponsored Brands spend uses eligible ad-creative ASINs, with same-day ad cost rescaled to campaign cost. Remaining spend uses campaign purchased-product shares. Without purchased-product data, it uses Seller Central sales, orders and sessions, or an even split among known campaign ASINs. Sales and orders allocate campaign totals by purchased-product shares, with the same fallback signals. ASIN spend and sales are split across available SKUs by same-day order-sales shares; orders use order-count shares. A zero total uses an even split for that measure. With no SKU rows, sku is null. Campaigns without any ASIN signal remain account-only. Attribution windows do not apply to spend.
- `ad_units_sold_same_sku` (`NUMBER`, nullable) — Products: same-SKU click-attributed units (7d), excluding brand halo. Display: total click-attributed units (14d), which can include purchases of other products despite the column name. Null for Brands. — definition: `amazon_ads_performance_by_child_asin_and_date.ad_campaign_type === 'SPONSORED_PRODUCTS' ? raw_ads_api_report_advertised_products_sp.unitsSoldSameSku7d : amazon_ads_performance_by_child_asin_and_date.ad_campaign_type === 'SPONSORED_DISPLAY' ? raw_ads_api_report_advertised_products_sd.unitsSoldClicks : amazon_ads_performance_by_child_asin_and_date.ad_campaign_type === 'SPONSORED_TELEVISION' ? null : null`
- `ad_orders_same_sku` (`NUMBER`, nullable) — Attributed orders of the advertised SKU only (14d for SPONSORED_BRANDS and SPONSORED_DISPLAY, 7d for SPONSORED_PRODUCTS). Excludes brand-halo orders of other SKUs. Null for Sponsored Brands. — definition: `amazon_ads_performance_by_child_asin_and_date.ad_campaign_type === 'SPONSORED_PRODUCTS' ? raw_ads_api_report_advertised_products_sp.purchasesSameSku7d : amazon_ads_performance_by_child_asin_and_date.ad_campaign_type === 'SPONSORED_DISPLAY' ? raw_ads_api_report_advertised_products_sd.purchasesPromotedClicks : amazon_ads_performance_by_child_asin_and_date.ad_campaign_type === 'SPONSORED_TELEVISION' ? null : null`
- `ad_attributed_sales` (`NUMBER`, nullable) — Sales attributed to this ad, including other products. Sponsored Products uses a 7-day click window. This is the Sales figure on Amazon's advertised-product report. Sponsored Display includes sales from clicks and views, so view-through sales are included. The value is null for Sponsored Brands. For Sponsored Products, ad_sales is only the same-SKU part. Do not add ad_sales to this column. — definition: `amazon_ads_performance_by_child_asin_and_date.ad_campaign_type === 'SPONSORED_PRODUCTS' ? raw_ads_api_report_advertised_products_sp.sales7d : amazon_ads_performance_by_child_asin_and_date.ad_campaign_type === 'SPONSORED_DISPLAY' ? raw_ads_api_report_advertised_products_sd.sales : amazon_ads_performance_by_child_asin_and_date.ad_campaign_type === 'SPONSORED_TELEVISION' ? null : null`
- `ad_attributed_orders` (`NUMBER`, nullable) — Orders attributed to this ad, including other products. Sponsored Products uses a 7-day click window. Sponsored Display includes orders from clicks and views, so view-through orders are included. The value is null for Sponsored Brands. For Sponsored Products, ad_orders is only the same-SKU part. Do not add ad_orders to this column. — definition: `amazon_ads_performance_by_child_asin_and_date.ad_campaign_type === 'SPONSORED_PRODUCTS' ? raw_ads_api_report_advertised_products_sp.purchases7d : amazon_ads_performance_by_child_asin_and_date.ad_campaign_type === 'SPONSORED_DISPLAY' ? raw_ads_api_report_advertised_products_sd.purchases : amazon_ads_performance_by_child_asin_and_date.ad_campaign_type === 'SPONSORED_TELEVISION' ? null : null`
- `ad_attributed_units_sold` (`NUMBER`, nullable) — Units attributed to this ad, including other products. Sponsored Products uses a 7-day click window. Sponsored Display includes units from clicks and views, so view-through units are included. The value is null for Sponsored Brands. — definition: `amazon_ads_performance_by_child_asin_and_date.ad_campaign_type === 'SPONSORED_PRODUCTS' ? raw_ads_api_report_advertised_products_sp.unitsSoldClicks7d : amazon_ads_performance_by_child_asin_and_date.ad_campaign_type === 'SPONSORED_DISPLAY' ? raw_ads_api_report_advertised_products_sd.unitsSold : amazon_ads_performance_by_child_asin_and_date.ad_campaign_type === 'SPONSORED_TELEVISION' ? null : null`
- `ad_campaign_budget_amount` (`NUMBER`, nullable) — Campaign budget repeated on every row of the campaign. Do not sum it across ASINs, keywords, placements, or dates. ad_campaign_budget_type is DAILY_BUDGET or LIFETIME_BUDGET. Available for Sponsored Products. Null for Sponsored Display and Sponsored Brands.
- `ad_campaign_budget_type` (`TEXT`, nullable) — DAILY_BUDGET / LIFETIME_BUDGET or NULL.
- `ad_campaign_budget_currency` (`TEXT`, nullable) — Currency code for Sponsored Products and Sponsored Display. Null for Sponsored Brands.
- `ad_id` (`TEXT`, nullable) — Ad ID for Sponsored Products and Sponsored Display. Null for Sponsored Brands.
- `ad_group_id` (`TEXT`, nullable) — Ad group ID for Sponsored Products and Sponsored Display. Null for Sponsored Brands.
- `ad_campaign_id` (`TEXT`, nullable) — Campaign ID for SPONSORED_PRODUCTS, SPONSORED_DISPLAY and SPONSORED_BRANDS.
- `ad_campaign_name` (`TEXT`, nullable) — Campaign name for SPONSORED_PRODUCTS, SPONSORED_DISPLAY and SPONSORED_BRANDS.
- `ad_campaign_status` (`TEXT`, nullable) — Campaign status for SPONSORED_PRODUCTS. Null for SPONSORED_DISPLAY and SPONSORED_BRANDS.
- `is_estimated` (`LOGIC`, required) — TRUE for SPONSORED_BRANDS rows, whose ASIN-level metrics are estimated by allocating campaign-level totals down to ASINs (Amazon does not expose true SB ASIN-level data). FALSE for SPONSORED_PRODUCTS / SPONSORED_DISPLAY rows, which are reported directly.
- `book_metric_assignment_method` (`TEXT`, required) — REPORTED when Amazon reports the metrics per ASIN (SPONSORED_PRODUCTS / SPONSORED_DISPLAY); ALLOCATED when SPONSORED_BRANDS campaign totals are split across ASINs (is_estimated = TRUE).
- `kindle_edition_normalized_pages_read_14d` (`NUMBER`, nullable) — Kindle Edition Normalized Pages (KENP) read by Kindle Unlimited readers within 14 days of an ad click. A page count, not money. Sponsored Products only; null for other campaign types and for books outside Kindle Unlimited.
- `kindle_edition_normalized_pages_royalties_14d` (`NUMBER`, nullable) — Amazon estimate of the royalties for kindle_edition_normalized_pages_read_14d, in the Ads profile currency. Money, not pages. Sponsored Products only; null for other campaign types and for books outside Kindle Unlimited.
- `kenp_per_click_14d` (`NUMBER`, nullable) — KENP read per ad click. Null when clicks are zero or unknown. — definition: `kindle_edition_normalized_pages_read_14d / ad_clicks`
- `estimated_kenp_royalty_per_click_14d` (`NUMBER`, nullable) — Estimated KENP royalties per ad click. Null when clicks are zero or unknown. — definition: `kindle_edition_normalized_pages_royalties_14d / ad_clicks`
- `ku_qualified_borrows` (`NUMBER`, nullable) — Kindle Unlimited borrows Amazon counts as qualified, attributed to the ad. A count, not money. Sponsored Products only; null for other campaign types.
- `estimated_ku_borrow_royalties` (`NUMBER`, nullable) — Amazon estimate of the royalties of ku_qualified_borrows. Money, not a count. Sponsored Products only; null for other campaign types.
- `ad_add_to_list` (`NUMBER`, nullable) — Times shoppers added the advertised product to a list, attributed to the ad. Sponsored Products only; null for other campaign types.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
