# DSP Performance by Audience & Date

- BigQuery table name: `amazon_ads_dsp_performance_by_audience_by_date`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Amazon DSP performance per advertiser, date, order, line item, and audience segment. Amazon DSP only (DataDoe DSP slot of a seller or vendor), refreshed once a day, not intraday. Rows map to a seller or vendor through seller_or_vendor_id, which is null when the DSP advertiser is not mapped. DSP order = campaign and line item = ad group in the new Amazon DSP naming. Amazon does not report sales, units, or brand halo metrics in this report; conversion columns cover promoted ASINs only. A line item can target several segments, so do not sum segment rows to get line item totals; use amazon_ads_dsp_performance_by_creative_by_date for totals.

- Source type: `AMAZON_ADS`
- Source ID: `fced2c0c7c2b0182dae4267106841845d7546cdc64d8a73efc205977b0042aa2`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=fced2c0c7c2b0182dae4267106841845d7546cdc64d8a73efc205977b0042aa2

## Fetch periods

- `INITIAL` (56 days)
- `RECURRING_DAILY` (28 days)
- `RECURRING_MONTHLY` (56 days)

## Search aliases

- dsp
- amazon dsp
- dsp audience
- audience segment

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
- `dsp_line_item_type` (`TEXT`, nullable) — Amazon DSP line item type as reported by Amazon.
- `dsp_segment_id` (`TEXT`, nullable) — Amazon DSP audience segment identifier.
- `dsp_segment_name` (`TEXT`, nullable) — Amazon DSP audience segment name.
- `dsp_segment_type` (`TEXT`, nullable) — Audience segment type as reported by Amazon DSP.
- `dsp_segment_source` (`TEXT`, nullable) — Audience segment source as reported by Amazon DSP.
- `dsp_segment_class_code` (`TEXT`, nullable) — Audience segment class code as reported by Amazon DSP.
- `dsp_segment_marketplace_id` (`TEXT`, nullable) — Amazon marketplace id of the audience segment.
- `dsp_targeting_method` (`TEXT`, nullable) — How the line item targets the segment, as reported by Amazon DSP.
- `ad_currency` (`TEXT`, nullable) — Currency of all monetary Amazon DSP values in the row (order currency).
- `ad_impressions` (`NUMBER`, required) — Amazon DSP impressions after Amazon removed invalid traffic. Gross impressions, including invalid traffic, are ad_gross_impressions.
- `ad_clicks` (`NUMBER`, required) — Amazon DSP click-throughs after Amazon removed invalid traffic.
- `ad_spend` (`NUMBER`, required) — Amazon DSP totalCost: supply cost plus Amazon fees (ad_supply_cost + ad_fees_total), excluding third-party fees paid by the agency. In ad_currency.
- `ad_supply_cost` (`NUMBER`, required) — Amazon DSP media supply (inventory) cost, without fees. Included in ad_spend. In ad_currency.
- `ad_orders_promoted` (`NUMBER`, required) — Attributed purchases (DSP purchases). Promoted ASINs of the line item only, excluding brand halo. Amazon DSP 14-day attribution after an ad view or click.
- `ad_orders_new_to_brand_promoted` (`NUMBER`, required) — New-to-brand purchases (DSP newToBrandPurchases). Promoted ASINs of the line item only, excluding brand halo. Amazon DSP 14-day attribution after an ad view or click.
- `ad_detail_page_views_promoted` (`NUMBER`, required) — Attributed detail page views (DSP detailPageViews). Promoted ASINs of the line item only, excluding brand halo. Amazon DSP 14-day attribution after an ad view or click.
- `ad_add_to_cart_promoted` (`NUMBER`, required) — Attributed add-to-cart events (DSP addToCart). Promoted ASINs of the line item only, excluding brand halo. Amazon DSP 14-day attribution after an ad view or click.
- `ad_gross_impressions` (`NUMBER`, required) — Times the ad was displayed, including invalid traffic (fraudulent, non-human, and other illegitimate impressions). ad_impressions excludes that traffic.
- `ad_invalid_impressions` (`NUMBER`, required) — Impressions removed by the traffic quality filter. Not included in ad_impressions.
- `ad_kindle_detail_page_views` (`NUMBER`, nullable) — Attributed Kindle detail page views (DSP kindleDetailPageView). Amazon DSP reports no attribution window for Kindle metrics. Null when the report has no value.
- `ad_kindle_detail_page_views_from_clicks` (`NUMBER`, nullable) — Part of ad_kindle_detail_page_views attributed to ad clicks. Amazon DSP reports no attribution window for Kindle metrics. Null when the report has no value.
- `ad_kindle_detail_page_views_from_views` (`NUMBER`, nullable) — Part of ad_kindle_detail_page_views attributed to ad views. Amazon DSP reports no attribution window for Kindle metrics. Null when the report has no value.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
