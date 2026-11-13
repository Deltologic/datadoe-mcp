# DSP Performance by Inventory & Date

- BigQuery table name: `amazon_ads_dsp_performance_by_inventory_by_date`
- Available in: Amazon Ads
- Data scheme index: ../data-scheme.md

Amazon DSP inventory performance per advertiser, date, order, line item, site or app, supply source, deal, and currency. Amazon DSP only (DataDoe DSP slot of a seller or vendor), refreshed once a day, not intraday. Rows map to a seller or vendor through seller_or_vendor_id, which is null when the DSP advertiser is not mapped. DSP order = campaign and line item = ad group in the new Amazon DSP naming. The table stays off until the Organization turns it on. Once enabled, it uses the DSP advertiser ID configured on each Seller or Vendor. No separate advertiser or connection selection is needed. Each Amazon request is one day and one DSP order. The first fetch covers 56 days, a daily refresh covers 14 days, and a monthly refresh covers 56 days so Amazon can restate conversions. ad_currency is budgetCurrency. Do not add monetary values across currencies. Site, supply source, and deal stay null when Amazon omits them, and deal can be Unallocated. There is no app or site classification. ad_sales, ad_orders, ad_detail_page_views, and ad_add_to_cart come from metric.sales, metric.purchases, metric.detailPageViews, and metric.addToCart and are the intended promoted-plus-halo totals. Columns ending in _promoted come from the matching Promoted fields. Amazon DSP 14-day attribution after an ad view or click.

- Source type: `AMAZON_ADS`
- Source ID: `135d3293a4d487d57c895305380af6259a3e7bceec0e727ddc27ea7348c1ef28`
- Requires a date period: yes
- Contains PII: no
- Premium table: no
- User-managed: no
- Default dataset: no
- Rows count towards billing: yes
- Hub: https://www.datadoe.com/hub/data-scheme?source=AMAZON_ADS&table=135d3293a4d487d57c895305380af6259a3e7bceec0e727ddc27ea7348c1ef28

## Fetch periods

- `INITIAL` (56 days)
- `RECURRING_DAILY` (14 days)
- `RECURRING_MONTHLY` (56 days)

## Search aliases

- dsp
- amazon dsp
- dsp inventory
- site
- app
- deal
- line item

## Columns (35)

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
- `amazon_ads_account_id` (`TEXT`, nullable) — Amazon Ads advertiser account id (advertiserAccount.id) used to request the report. The numeric DSP advertiser id is dsp_advertiser_id.
- `dsp_order_id` (`TEXT`, required) — Amazon DSP order identifier. An order is a campaign in the new Amazon DSP naming.
- `dsp_order_name` (`TEXT`, nullable) — Amazon DSP order (campaign) name.
- `dsp_line_item_id` (`TEXT`, required) — Amazon DSP line item identifier. A line item is an ad group in the new Amazon DSP naming.
- `dsp_line_item_name` (`TEXT`, nullable) — Amazon DSP line item (ad group) name.
- `dsp_site_or_app` (`TEXT`, nullable) — Site or app where the ad ran (siteApp). Amazon does not classify the value as an app or a site. Null when Amazon omits it.
- `dsp_supply_source` (`TEXT`, nullable) — Supply source (inventory exchange or publisher) as reported by Amazon DSP. Null when Amazon omits it.
- `dsp_deal_id` (`TEXT`, nullable) — Amazon DSP deal id. Null when the row has no deal. Unallocated when Amazon reports that label.
- `dsp_deal_name` (`TEXT`, nullable) — Amazon DSP deal name. Null when the row has no deal. Unallocated when Amazon reports that label.
- `ad_currency` (`TEXT`, nullable) — Currency of the monetary metrics (budgetCurrency). Do not add monetary values across currencies.
- `ad_spend` (`NUMBER`, required) — Amazon DSP totalCost: supply cost plus Amazon fees (ad_supply_cost + ad_fees_total), excluding third-party fees paid by the agency. In ad_currency.
- `ad_impressions` (`NUMBER`, required) — Amazon DSP impressions after Amazon removed invalid traffic. Gross impressions, including invalid traffic, are ad_gross_impressions.
- `ad_viewable_impressions` (`NUMBER`, required) — Impressions that met the Amazon DSP viewability standard.
- `ad_measurable_impressions` (`NUMBER`, required) — Impressions Amazon could measure for viewability (metric.measurableImpressions).
- `ad_clicks` (`NUMBER`, required) — Amazon DSP click-throughs after Amazon removed invalid traffic.
- `ad_detail_page_views` (`NUMBER`, required) — Attributed detail page views (metric.detailPageViews). Promoted ASINs plus brand halo (non-promoted ASINs of the same brands). Amazon DSP 14-day attribution after an ad view or click.
- `ad_detail_page_views_promoted` (`NUMBER`, required) — Attributed detail page views (metric.detailPageViewsPromoted). Promoted ASINs of the line item only, excluding brand halo. Amazon DSP 14-day attribution after an ad view or click.
- `ad_add_to_cart` (`NUMBER`, required) — Attributed add-to-cart events (metric.addToCart). Promoted ASINs plus brand halo (non-promoted ASINs of the same brands). Amazon DSP 14-day attribution after an ad view or click.
- `ad_add_to_cart_promoted` (`NUMBER`, required) — Attributed add-to-cart events (metric.addToCartPromoted). Promoted ASINs of the line item only, excluding brand halo. Amazon DSP 14-day attribution after an ad view or click.
- `ad_orders` (`NUMBER`, required) — Attributed purchases (metric.purchases). Promoted ASINs plus brand halo (non-promoted ASINs of the same brands). Amazon DSP 14-day attribution after an ad view or click.
- `ad_orders_promoted` (`NUMBER`, required) — Attributed purchases (metric.purchasesPromoted). Promoted ASINs of the line item only, excluding brand halo. Amazon DSP 14-day attribution after an ad view or click.
- `ad_sales` (`NUMBER`, required) — Attributed sales (metric.sales). Promoted ASINs plus brand halo (non-promoted ASINs of the same brands). Amazon DSP 14-day attribution after an ad view or click. In ad_currency.
- `ad_sales_promoted` (`NUMBER`, required) — Attributed sales (metric.salesPromoted). Promoted ASINs of the line item only, excluding brand halo. Amazon DSP 14-day attribution after an ad view or click. In ad_currency.

---

Query live via DataDoe MCP `exports_source_get` (connected accounts only), or request rows with `exports_create`.
