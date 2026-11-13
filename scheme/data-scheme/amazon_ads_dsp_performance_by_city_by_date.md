# DSP Performance by City & Date

- BigQuery table name: `amazon_ads_dsp_performance_by_city_by_date`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Amazon DSP performance per advertiser, date, order, line item, and city. Amazon DSP only (DataDoe DSP slot of a seller or vendor), refreshed once a day, not intraday. Rows map to a seller or vendor through seller_or_vendor_id, which is null when the DSP advertiser is not mapped. DSP order = campaign and line item = ad group in the new Amazon DSP naming. city is a bare city name (for example Columbus) and is not unique across regions; the country is the marketplace country. Large table: always filter by date.

- Source type: `AMAZON_ADS`
- Source ID: `c5e669002482c32ecbaff6eb3410de72886a9fc46e02077e92b0867bbae514c7`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=c5e669002482c32ecbaff6eb3410de72886a9fc46e02077e92b0867bbae514c7

## Fetch periods

- `INITIAL` (28 days)
- `RECURRING_DAILY` (7 days)
- `RECURRING_MONTHLY` (28 days)

## Search aliases

- dsp
- amazon dsp
- dsp geo
- dsp city

## Columns (45)

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
- `dsp_line_item_id` (`TEXT`, required) — Amazon DSP line item identifier. A line item is an ad group in the new Amazon DSP naming.
- `dsp_line_item_name` (`TEXT`, nullable) — Amazon DSP line item (ad group) name.
- `city` (`TEXT`, nullable) — City name as reported by Amazon DSP, without region or country. Not unique across regions. Null when Amazon could not attribute the city.
- `ad_currency` (`TEXT`, nullable) — Currency of all monetary Amazon DSP values in the row (order currency).
- `ad_impressions` (`NUMBER`, required) — Amazon DSP impressions after Amazon removed invalid traffic. Gross impressions, including invalid traffic, are ad_gross_impressions.
- `ad_viewable_impressions` (`NUMBER`, required) — Impressions that met the Amazon DSP viewability standard.
- `ad_clicks` (`NUMBER`, required) — Amazon DSP click-throughs after Amazon removed invalid traffic.
- `ad_spend` (`NUMBER`, required) — Amazon DSP totalCost: supply cost plus Amazon fees (ad_supply_cost + ad_fees_total), excluding third-party fees paid by the agency. In ad_currency.
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
- `ad_kindle_detail_page_views` (`NUMBER`, nullable) — Attributed Kindle detail page views (DSP kindleDetailPageView). Amazon DSP reports no attribution window for Kindle metrics. Null when the report has no value.
- `ad_kindle_detail_page_views_from_clicks` (`NUMBER`, nullable) — Part of ad_kindle_detail_page_views attributed to ad clicks. Amazon DSP reports no attribution window for Kindle metrics. Null when the report has no value.
- `ad_kindle_detail_page_views_from_views` (`NUMBER`, nullable) — Part of ad_kindle_detail_page_views attributed to ad views. Amazon DSP reports no attribution window for Kindle metrics. Null when the report has no value.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
