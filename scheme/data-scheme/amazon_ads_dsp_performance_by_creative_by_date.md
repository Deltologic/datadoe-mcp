# DSP Performance by Creative & Date

- BigQuery table name: `amazon_ads_dsp_performance_by_creative_by_date`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Amazon DSP performance per advertiser, date, order, line item, and creative. Amazon DSP only (DataDoe DSP slot of a seller or vendor), refreshed once a day, not intraday. Rows map to a seller or vendor through seller_or_vendor_id, which is null when the DSP advertiser is not mapped. DSP order = campaign and line item = ad group in the new Amazon DSP naming. Use this table for total Amazon DSP spend and sales; it is the DSP source of amazon_profit_by_date. ad_sales, ad_orders, and ad_units_sold include brand halo; the _promoted columns cover promoted ASINs only. Order and line item budgets repeat on every creative row, so do not sum them.

- Source type: `AMAZON_ADS`
- Source ID: `46b72faac2b2f5032bd49c71c94665218c2fd9ac0cb1e162bb3e890f2d216b43`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=46b72faac2b2f5032bd49c71c94665218c2fd9ac0cb1e162bb3e890f2d216b43

## Fetch periods

- `INITIAL` (56 days)
- `RECURRING_DAILY` (28 days)
- `RECURRING_MONTHLY` (56 days)

## Search aliases

- dsp
- amazon dsp
- programmatic
- display dsp
- dsp spend
- dsp creative
- subscribe and save
- new subscribe and save

## Columns (57)

- `marketplace_id` (`TEXT`, required) — Amazon marketplace of the DataDoe DSP slot the advertiser is fetched for.
- `marketplace_country_code` (`TEXT`, required) — ISO country code for the Amazon marketplace.
- `marketplace_country_name` (`TEXT`, required) — Human-readable country name for the marketplace (derived from marketplace_id).
- `seller_or_vendor_id` (`TEXT`, nullable) — DataDoe account identifier the DSP advertiser is mapped to, used by MCP/API calls (sellers_and_vendors_list, exports). Null when the advertiser is not mapped to a seller or vendor.
- `seller_or_vendor_name` (`TEXT`, nullable) — DataDoe connection context display name of the mapped seller or vendor. Null when the advertiser is not mapped.
- `marketplace_seller_id` (`TEXT`, nullable) — Amazon selling partner id of the mapped seller. Null for vendors, unmapped advertisers, and contexts without a seller id.
- `amazon_ads_profile_id` (`TEXT`, nullable) — Amazon Ads profile identifier.
- `dsp_advertiser_id` (`TEXT`, required) — Amazon DSP advertiser identifier. Join amazon_sellers_and_vendors_context on organization_id, store_id, ads_dsp_connection_id = ads_connection_id, and dsp_advertiser_id.
- `dsp_advertiser_name` (`TEXT`, nullable) — Amazon DSP advertiser name.
- `date` (`DATE`, required) — Report date (Amazon DSP daily report).
- `dt_created` (`DATE`, required) — Timestamp when DataDoe first stored this row.
- `dt_updated` (`DATE`, required) — Timestamp when DataDoe last updated this row.
- `dsp_order_id` (`TEXT`, required) — Amazon DSP order identifier. An order is a campaign in the new Amazon DSP naming.
- `dsp_order_name` (`TEXT`, nullable) — Amazon DSP order (campaign) name.
- `dsp_order_budget` (`NUMBER`, nullable) — Order budget repeated on every row of the order. Do not sum it across line items, creatives, or dates. In ad_currency.
- `dsp_order_start_date` (`TEXT`, nullable) — Order start date as delivered by Amazon DSP.
- `dsp_order_end_date` (`TEXT`, nullable) — Order end date as delivered by Amazon DSP.
- `dsp_order_external_id` (`TEXT`, nullable) — Advertiser-defined external identifier of the order.
- `dsp_line_item_id` (`TEXT`, required) — Amazon DSP line item identifier. A line item is an ad group in the new Amazon DSP naming.
- `dsp_line_item_name` (`TEXT`, nullable) — Amazon DSP line item (ad group) name.
- `dsp_line_item_type` (`TEXT`, nullable) — Amazon DSP line item type as reported by Amazon.
- `dsp_line_item_budget` (`NUMBER`, nullable) — Line item budget repeated on every row of the line item. Do not sum it across creatives or dates. In ad_currency.
- `dsp_line_item_start_date` (`TEXT`, nullable) — Line item start date as delivered by Amazon DSP.
- `dsp_line_item_end_date` (`TEXT`, nullable) — Line item end date as delivered by Amazon DSP.
- `dsp_creative_id` (`TEXT`, required) — Amazon DSP creative identifier.
- `dsp_creative_name` (`TEXT`, nullable) — Amazon DSP creative name.
- `dsp_creative_type` (`TEXT`, nullable) — Amazon DSP creative type as reported by Amazon.
- `dsp_creative_size` (`TEXT`, nullable) — Amazon DSP creative size as reported by Amazon.
- `ad_currency` (`TEXT`, nullable) — Currency of all monetary Amazon DSP values in the row (order currency).
- `ad_impressions` (`NUMBER`, required) — Amazon DSP impressions after Amazon removed invalid traffic. Gross impressions, including invalid traffic, are ad_gross_impressions.
- `ad_viewable_impressions` (`NUMBER`, required) — Impressions that met the Amazon DSP viewability standard.
- `ad_clicks` (`NUMBER`, required) — Amazon DSP click-throughs after Amazon removed invalid traffic.
- `ad_spend` (`NUMBER`, required) — Amazon DSP totalCost: supply cost plus Amazon fees (ad_supply_cost + ad_fees_total), excluding third-party fees paid by the agency. In ad_currency.
- `ad_supply_cost` (`NUMBER`, required) — Amazon DSP media supply (inventory) cost, without fees. Included in ad_spend. In ad_currency.
- `ad_fees_total` (`NUMBER`, required) — Sum of all Amazon DSP fees. Included in ad_spend. In ad_currency.
- `ad_agency_fee` (`NUMBER`, required) — Agency fee reported by Amazon DSP. In ad_currency.
- `ad_sales` (`NUMBER`, required) — Attributed sales (DSP totalSales). Promoted ASINs plus brand halo (non-promoted ASINs of the same brands). Amazon DSP 14-day attribution after an ad view or click. In ad_currency.
- `ad_sales_promoted` (`NUMBER`, required) — Attributed sales (DSP sales). Promoted ASINs of the line item only, excluding brand halo. Amazon DSP 14-day attribution after an ad view or click. In ad_currency.
- `ad_orders` (`NUMBER`, required) — Attributed purchases (DSP totalPurchases). Promoted ASINs plus brand halo (non-promoted ASINs of the same brands). Amazon DSP 14-day attribution after an ad view or click.
- `ad_orders_promoted` (`NUMBER`, required) — Attributed purchases (DSP purchases). Promoted ASINs of the line item only, excluding brand halo. Amazon DSP 14-day attribution after an ad view or click.
- `ad_units_sold` (`NUMBER`, required) — Attributed units sold (DSP totalUnitsSold). Promoted ASINs plus brand halo (non-promoted ASINs of the same brands). Amazon DSP 14-day attribution after an ad view or click.
- `ad_units_sold_promoted` (`NUMBER`, required) — Attributed units sold (DSP unitsSold). Promoted ASINs of the line item only, excluding brand halo. Amazon DSP 14-day attribution after an ad view or click.
- `ad_sales_new_to_brand` (`NUMBER`, required) — New-to-brand sales (DSP totalNewToBrandSales): sales to customers who did not buy the brand in the past 12 months. Promoted ASINs plus brand halo (non-promoted ASINs of the same brands). Amazon DSP 14-day attribution after an ad view or click. In ad_currency.
- `ad_sales_new_to_brand_promoted` (`NUMBER`, required) — New-to-brand sales (DSP newToBrandProductSales). Promoted ASINs of the line item only, excluding brand halo. Amazon DSP 14-day attribution after an ad view or click. In ad_currency.
- `ad_orders_new_to_brand` (`NUMBER`, required) — New-to-brand purchases (DSP totalNewToBrandPurchases). Promoted ASINs plus brand halo (non-promoted ASINs of the same brands). Amazon DSP 14-day attribution after an ad view or click.
- `ad_orders_new_to_brand_promoted` (`NUMBER`, required) — New-to-brand purchases (DSP newToBrandPurchases). Promoted ASINs of the line item only, excluding brand halo. Amazon DSP 14-day attribution after an ad view or click.
- `ad_detail_page_views` (`NUMBER`, required) — Attributed detail page views (DSP totalDetailPageView). Promoted ASINs plus brand halo (non-promoted ASINs of the same brands). Amazon DSP 14-day attribution after an ad view or click.
- `ad_detail_page_views_promoted` (`NUMBER`, required) — Attributed detail page views (DSP detailPageViews). Promoted ASINs of the line item only, excluding brand halo. Amazon DSP 14-day attribution after an ad view or click.
- `ad_add_to_cart` (`NUMBER`, required) — Attributed add-to-cart events (DSP totalAddToCart). Promoted ASINs plus brand halo (non-promoted ASINs of the same brands). Amazon DSP 14-day attribution after an ad view or click.
- `ad_add_to_cart_promoted` (`NUMBER`, required) — Attributed add-to-cart events (DSP addToCart). Promoted ASINs of the line item only, excluding brand halo. Amazon DSP 14-day attribution after an ad view or click.
- `ad_gross_impressions` (`NUMBER`, required) — Times the ad was displayed, including invalid traffic (fraudulent, non-human, and other illegitimate impressions). ad_impressions excludes that traffic.
- `ad_invalid_impressions` (`NUMBER`, required) — Impressions removed by the traffic quality filter. Not included in ad_impressions.
- `kindle_edition_normalized_pages_read` (`NUMBER`, nullable) — Kindle Edition Normalized Pages (KENP) read, attributed to the ad. A page count, not money. Amazon DSP reports no attribution window for Kindle metrics. Null when the report has no value.
- `kindle_edition_normalized_pages_read_from_clicks` (`NUMBER`, nullable) — Part of kindle_edition_normalized_pages_read attributed to ad clicks. Amazon DSP reports no attribution window for Kindle metrics. Null when the report has no value.
- `kindle_edition_normalized_pages_read_from_views` (`NUMBER`, nullable) — Part of kindle_edition_normalized_pages_read attributed to ad views. Amazon DSP reports no attribution window for Kindle metrics. Null when the report has no value.
- `ad_new_subscribe_and_save` (`NUMBER`, required) — New Subscribe & Save subscriptions (DSP totalSubscribeAndSave). Promoted ASINs plus brand halo (non-promoted ASINs of the same brands). Amazon DSP 14-day attribution after an ad view or click. Counts the first subscription for a product. Later replenishment orders are not included.
- `ad_new_subscribe_and_save_promoted` (`NUMBER`, required) — New Subscribe & Save subscriptions (DSP newSubscribeAndSave), the New Subscribe & Save metric in the Amazon DSP console. Promoted ASINs of the line item only, excluding brand halo. Amazon DSP 14-day attribution after an ad view or click. Counts the first subscription for a product. Later replenishment orders are not included.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
