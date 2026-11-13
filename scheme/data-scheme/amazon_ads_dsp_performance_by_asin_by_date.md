# DSP Product Conversions by ASIN & Date

- BigQuery table name: `amazon_ads_dsp_performance_by_asin_by_date`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Amazon DSP product conversions per advertiser, date, order, line item, child ASIN, and conversion type. Amazon DSP only (DataDoe DSP slot of a seller or vendor), refreshed once a day, not intraday. Rows map to a seller or vendor through seller_or_vendor_id, which is null when the DSP advertiser is not mapped. DSP order = campaign and line item = ad group in the new Amazon DSP naming. dsp_conversion_type PROMOTED rows are conversions of ASINs promoted by the line item; BRAND_HALO rows are conversions of other ASINs of the same brands. Sum PROMOTED and BRAND_HALO for total product sales as in the Amazon DSP console. Amazon reports no cost, impressions, or clicks at ASIN level; spend is in amazon_ads_dsp_performance_by_creative_by_date. Amazon limits the report to the top 500 ASINs of the past 65 days, so totals can be slightly below the creative table.

- Source type: `AMAZON_ADS`
- Source ID: `be347b80ff1c743a2224a42354339da91db167b98871e7b75bc40e71a00fd6fe`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=be347b80ff1c743a2224a42354339da91db167b98871e7b75bc40e71a00fd6fe

## Fetch periods

- `INITIAL` (56 days)
- `RECURRING_DAILY` (28 days)
- `RECURRING_MONTHLY` (56 days)

## Search aliases

- dsp
- amazon dsp
- dsp product
- dsp brand halo
- subscribe and save
- new subscribe and save

## Columns (38)

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
- `child_asin` (`TEXT`, required) — ASIN that converted (child ASIN).
- `parent_asin` (`TEXT`, nullable) — Parent ASIN of child_asin.
- `featured_asin` (`TEXT`, nullable) — Featured ASIN reported by Amazon DSP for the conversion.
- `product_name` (`TEXT`, nullable)
- `brand_name` (`TEXT`, nullable)
- `product_group` (`TEXT`, nullable)
- `product_category` (`TEXT`, nullable)
- `product_subcategory` (`TEXT`, nullable)
- `book_title` (`TEXT`, nullable) — Latest book title from amazon_ads_book_catalog for this ASIN. Null when the catalog has no title.
- `book_format` (`TEXT`, nullable) — Edition format from the latest uploaded KDP royalty parameters of this ASIN: EBOOK / PAPERBACK / HARDCOVER / AUDIOBOOK. Latest upload, not effective for the row date. Null without royalty parameters.
- `book_work_id` (`TEXT`, nullable) — User-defined work ID that groups the editions of one book, from the latest uploaded KDP royalty parameters of this ASIN. Null without royalty parameters.
- `book_metadata_source` (`TEXT`, nullable) — USER when uploaded KDP royalty parameters supply book_format or book_work_id; API_METADATA when only the catalog title matched; null when neither matched.
- `dsp_conversion_type` (`TEXT`, required) — PROMOTED (ASIN promoted by the line item) or BRAND_HALO (other ASIN of the same brands).
- `ad_currency` (`TEXT`, nullable) — Currency of all monetary Amazon DSP values in the row (order currency).
- `ad_sales` (`NUMBER`, required) — Attributed sales of this ASIN within dsp_conversion_type. Amazon DSP 14-day attribution after an ad view or click. In ad_currency.
- `ad_orders` (`NUMBER`, required) — Attributed purchases of this ASIN within dsp_conversion_type. Amazon DSP 14-day attribution after an ad view or click.
- `ad_units_sold` (`NUMBER`, required) — Attributed units sold of this ASIN within dsp_conversion_type. Amazon DSP 14-day attribution after an ad view or click.
- `ad_sales_new_to_brand` (`NUMBER`, required) — New-to-brand sales of this ASIN within dsp_conversion_type: sales to customers who did not buy the brand in the past 12 months. Amazon DSP 14-day attribution after an ad view or click. In ad_currency.
- `ad_orders_new_to_brand` (`NUMBER`, required) — New-to-brand purchases of this ASIN within dsp_conversion_type. Amazon DSP 14-day attribution after an ad view or click.
- `ad_detail_page_views` (`NUMBER`, required) — Attributed detail page views of this ASIN within dsp_conversion_type. Amazon DSP 14-day attribution after an ad view or click.
- `ad_add_to_cart` (`NUMBER`, required) — Attributed add-to-cart events of this ASIN within dsp_conversion_type. Amazon DSP 14-day attribution after an ad view or click.
- `ad_new_subscribe_and_save` (`NUMBER`, required) — New Subscribe & Save subscriptions of this ASIN within dsp_conversion_type (DSP totalSubscribeAndSave). Counts the first subscription for a product. Later replenishment orders are not included. Sum PROMOTED and BRAND_HALO rows for the brand total. Amazon DSP 14-day attribution after an ad view or click.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
